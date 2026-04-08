/**
 * 支付宝支付配置
 * 
 * 使用前请按以下步骤配置：
 * 1. 前往 https://open.alipay.com 注册开发者账号
 * 2. 创建应用获取 AppId
 * 3. 配置 RSA2 密钥（推荐用支付宝密钥生成工具）
 * 4. 将对应值填入下方配置
 * 
 * 测试阶段建议使用沙箱环境（sandbox = true）
 */

module.exports = {
  // ========== 基础配置 ==========
  
  // 是否使用沙箱环境（测试阶段设为 true，上线时改为 false）
  sandbox: true,

  // 支付宝 AppId（在开放平台创建应用后获取）
  appId: 'YOUR_APP_ID',

  // 应用私钥（RSA2 格式，不含头尾标记）
  privateKey: 'YOUR_PRIVATE_KEY',

  // 支付宝公钥（在开放平台应用设置中获取，不含头尾标记）
  alipayPublicKey: 'YOUR_ALIPAY_PUBLIC_KEY',

  // ========== 回调地址 ==========
  // 部署后需改为你的真实域名

  // 支付成功后前端跳转地址
  returnUrl: 'http://127.0.0.1:4173/pay-success.html',

  // 支付宝异步通知地址（必须是公网可访问的地址）
  notifyUrl: 'http://YOUR_DOMAIN:3000/api/pay/notify',

  // ========== 服务配置 ==========
  
  // 后端服务端口
  port: 3000,

  // 前端页面地址（用于 CORS）
  frontendUrl: 'http://127.0.0.1:4173',
};
