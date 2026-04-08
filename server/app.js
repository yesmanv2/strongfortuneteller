const express = require('express');
const cors = require('cors');
const AlipaySdk = require('alipay-sdk').default;
const config = require('./config');

const app = express();

// 中间件
app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 初始化支付宝 SDK
const alipaySdk = new AlipaySdk({
  appId: config.appId,
  privateKey: config.privateKey,
  alipayPublicKey: config.alipayPublicKey,
  gateway: config.sandbox
    ? 'https://openapi-sandbox.dl.alipaydev.com/gateway.do'
    : 'https://openapi.alipay.com/gateway.do',
  signType: 'RSA2',
  charset: 'utf-8',
});

// 简易订单存储（生产环境应使用数据库）
const orders = new Map();

// 生成唯一订单号
function generateOrderNo() {
  const now = new Date();
  const ts = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FT${ts}${rand}`;
}

/**
 * POST /api/pay/create
 * 创建支付订单
 * 
 * Body: { plan: "single" | "annual", device: "mobile" | "pc" }
 * 
 * - mobile → 手机网站支付 (alipay.trade.wap.pay)
 * - pc → 电脑网站支付 (alipay.trade.page.pay)
 */
app.post('/api/pay/create', async (req, res) => {
  try {
    const { plan, device } = req.body;

    // 套餐定义
    const plans = {
      single: { amount: '1.00', subject: '五行紫微算命 · 单次深度测算', body: '包含紫微斗数十二宫详解、四化飞星、大运流年全分析' },
      annual: { amount: '10.00', subject: '五行紫微算命 · 年度会员', body: '全年无限次深度测算 + AI命理问答 + 专属流年报告' },
    };

    const planInfo = plans[plan];
    if (!planInfo) {
      return res.status(400).json({ success: false, message: '无效的套餐类型' });
    }

    const outTradeNo = generateOrderNo();

    // 保存订单
    orders.set(outTradeNo, {
      outTradeNo,
      plan,
      amount: planInfo.amount,
      subject: planInfo.subject,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    // 判断使用哪种支付方式
    const isMobile = device === 'mobile';
    const method = isMobile ? 'alipay.trade.wap.pay' : 'alipay.trade.page.pay';

    const bizContent = {
      out_trade_no: outTradeNo,
      total_amount: planInfo.amount,
      subject: planInfo.subject,
      body: planInfo.body,
      product_code: isMobile ? 'QUICK_WAP_WAY' : 'FAST_INSTANT_TRADE_PAY',
      // 订单15分钟超时
      timeout_express: '15m',
    };

    // 使用 pageExec 生成表单（前端直接渲染提交即可跳转支付宝）
    const formData = alipaySdk.pageExec(method, {
      method: 'GET',
      bizContent,
      returnUrl: config.returnUrl,
      notifyUrl: config.notifyUrl,
    });

    console.log(`[订单创建] ${outTradeNo} | ${plan} | ¥${planInfo.amount} | ${isMobile ? '手机' : 'PC'}`);

    res.json({
      success: true,
      data: {
        orderNo: outTradeNo,
        payUrl: formData,  // 支付宝跳转 URL
        amount: planInfo.amount,
        subject: planInfo.subject,
      },
    });
  } catch (err) {
    console.error('[创建订单失败]', err);
    res.status(500).json({ success: false, message: '创建订单失败: ' + err.message });
  }
});

/**
 * POST /api/pay/notify
 * 支付宝异步通知回调
 * 
 * 支付宝会在交易成功后 POST 通知到此地址
 * 必须返回 "success" 字符串表示收到
 */
app.post('/api/pay/notify', async (req, res) => {
  try {
    const params = req.body;
    console.log('[异步通知]', JSON.stringify(params));

    // 验签
    const signVerified = alipaySdk.checkNotifySign(params);
    if (!signVerified) {
      console.error('[验签失败]');
      return res.send('failure');
    }

    const outTradeNo = params.out_trade_no;
    const tradeStatus = params.trade_status;
    const totalAmount = params.total_amount;

    // 校验订单
    const order = orders.get(outTradeNo);
    if (!order) {
      console.error(`[订单不存在] ${outTradeNo}`);
      return res.send('failure');
    }

    // 校验金额
    if (order.amount !== totalAmount) {
      console.error(`[金额不匹配] 订单:${order.amount} 通知:${totalAmount}`);
      return res.send('failure');
    }

    // 更新订单状态
    if (tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED') {
      order.status = 'paid';
      order.paidAt = new Date().toISOString();
      order.tradeNo = params.trade_no;
      console.log(`[支付成功] ${outTradeNo} | ¥${totalAmount}`);
    }

    res.send('success');
  } catch (err) {
    console.error('[通知处理失败]', err);
    res.send('failure');
  }
});

/**
 * GET /api/pay/query?orderNo=xxx
 * 查询订单状态
 */
app.get('/api/pay/query', async (req, res) => {
  try {
    const { orderNo } = req.query;
    if (!orderNo) {
      return res.status(400).json({ success: false, message: '缺少订单号' });
    }

    const order = orders.get(orderNo);
    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' });
    }

    // 同时查询支付宝侧状态
    try {
      const result = await alipaySdk.exec('alipay.trade.query', {
        bizContent: { out_trade_no: orderNo },
      });

      if (result.tradeStatus === 'TRADE_SUCCESS' || result.tradeStatus === 'TRADE_FINISHED') {
        order.status = 'paid';
        order.tradeNo = result.tradeNo;
      }
    } catch (queryErr) {
      // 查询失败不影响返回本地状态
      console.log('[查询支付宝失败]', queryErr.message);
    }

    res.json({
      success: true,
      data: {
        orderNo: order.outTradeNo,
        plan: order.plan,
        amount: order.amount,
        status: order.status,
        paidAt: order.paidAt || null,
      },
    });
  } catch (err) {
    console.error('[查询订单失败]', err);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

/**
 * GET /api/health
 * 健康检查
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    sandbox: config.sandbox,
    appId: config.appId === 'YOUR_APP_ID' ? '未配置' : config.appId.substring(0, 6) + '...',
    time: new Date().toISOString(),
  });
});

// 启动服务
app.listen(config.port, () => {
  console.log('');
  console.log('🔮 五行算命支付服务已启动');
  console.log(`   端口: ${config.port}`);
  console.log(`   环境: ${config.sandbox ? '沙箱（测试）' : '正式（生产）'}`);
  console.log(`   AppId: ${config.appId === 'YOUR_APP_ID' ? '⚠️ 未配置' : config.appId}`);
  console.log(`   健康检查: http://127.0.0.1:${config.port}/api/health`);
  console.log('');
  if (config.appId === 'YOUR_APP_ID') {
    console.log('⚠️  请先在 server/config.js 中配置支付宝 AppId 和密钥！');
    console.log('   参考文档: https://open.alipay.com');
    console.log('');
  }
});
