/* ===== 基础数据 ===== */
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ELEMENTS = ["木", "火", "土", "金", "水"];

const STEM_ELEMENTS = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
  己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水",
};

const BRANCH_ELEMENTS = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水",
};

const ELEMENT_STYLES = {
  木: ["#75e0a7", "#2f9d63"],
  火: ["#ff9b6f", "#ff5d5d"],
  土: ["#f4c978", "#bc8d42"],
  金: ["#d8e4ff", "#89a6ff"],
  水: ["#7fd9ff", "#3f84ff"],
};

/* ===== 紫微斗数数据 ===== */
const ZIWEI_PALACES = [
  "命宫", "兄弟宫", "夫妻宫", "子女宫", "财帛宫", "疾厄宫",
  "迁移宫", "交友宫", "事业宫", "田宅宫", "福德宫", "父母宫"
];

const ZIWEI_STARS = {
  主星: ["紫微", "天机", "太阳", "武曲", "天同", "廉贞", "天府", "太阴", "贪狼", "巨门", "天相", "天梁", "七杀", "破军"],
  吉星: ["文昌", "文曲", "左辅", "右弼", "天魁", "天钺"],
  煞星: ["擎羊", "陀罗", "火星", "铃星", "地空", "地劫"],
};

const ZIWEI_STAR_MEANINGS = {
  紫微: { icon: "👑", nature: "尊贵之星", desc: "领导力强，有帝王之气，主高贵权威，善于统御" },
  天机: { icon: "🧠", nature: "智慧之星", desc: "思维敏捷，擅长策划，主聪明机变，善于分析" },
  太阳: { icon: "☀️", nature: "光明之星", desc: "热情大方，乐于助人，主光明磊落，贵人运强" },
  武曲: { icon: "⚔️", nature: "财星", desc: "刚毅果断，理财有方，主财运亨通，事业心强" },
  天同: { icon: "😊", nature: "福星", desc: "温和善良，人缘极好，主福气深厚，生活安逸" },
  廉贞: { icon: "🔥", nature: "桃花星", desc: "聪明能干，感情丰富，主才华出众，有艺术天分" },
  天府: { icon: "🏛️", nature: "南斗主星", desc: "稳重大器，包容力强，主富贵安稳，守成有道" },
  太阴: { icon: "🌙", nature: "财星", desc: "温柔细腻，直觉敏锐，主暗财运佳，内心丰富" },
  贪狼: { icon: "🎭", nature: "桃花星", desc: "多才多艺，交际广泛，主欲望与才华并存" },
  巨门: { icon: "👄", nature: "暗星", desc: "口才极佳，分析力强，主言语表达，适合口才行业" },
  天相: { icon: "📋", nature: "印星", desc: "正直守信，协调能力强，主辅佐之才，适合管理" },
  天梁: { icon: "🛡️", nature: "荫星", desc: "正义感强，有化解力，主逢凶化吉，长辈缘好" },
  七杀: { icon: "🗡️", nature: "将星", desc: "勇猛果敢，开拓力强，主独立奋斗，事业有成" },
  破军: { icon: "💥", nature: "耗星", desc: "敢于变革，不安现状，主先破后立，创新突破" },
  文昌: { icon: "📖", nature: "文星", desc: "学业优秀，考试运好" },
  文曲: { icon: "🎵", nature: "才艺星", desc: "艺术天赋高，感性细腻" },
  左辅: { icon: "🤝", nature: "助星", desc: "贵人相助，人缘和善" },
  右弼: { icon: "🫱", nature: "助星", desc: "暗中有助，默默支持" },
  天魁: { icon: "⭐", nature: "贵人星", desc: "阳贵人，白天得助" },
  天钺: { icon: "🌟", nature: "贵人星", desc: "阴贵人，暗中提携" },
  擎羊: { icon: "🐏", nature: "煞星", desc: "刚强直冲，有冲劲但需防冲动" },
  陀罗: { icon: "🌀", nature: "煞星", desc: "纠缠拖延，需培养果断力" },
  火星: { icon: "🔥", nature: "煞星", desc: "急躁冲动，但有爆发力" },
  铃星: { icon: "🔔", nature: "煞星", desc: "内心焦虑，但有持久力" },
  地空: { icon: "🕳️", nature: "煞星", desc: "想法超前，不走寻常路" },
  地劫: { icon: "💫", nature: "煞星", desc: "意外变动，但有特殊才华" },
};

const ZIWEI_PALACE_MEANINGS = {
  命宫: "个人本质、性格与一生总体格局",
  兄弟宫: "手足缘分、同事关系与合作运势",
  夫妻宫: "婚姻感情、配偶特质与感情走向",
  子女宫: "子女缘分、后代运势与创造力",
  财帛宫: "财运格局、理财方式与收入来源",
  疾厄宫: "健康状况、体质特点与需注意的部位",
  迁移宫: "外出运势、人际交往与发展方向",
  交友宫: "朋友缘分、下属运与社交圈特质",
  事业宫: "事业方向、职业适性与成就高度",
  田宅宫: "房产运势、家庭环境与不动产投资",
  福德宫: "精神世界、兴趣爱好与晚年运势",
  父母宫: "与长辈关系、家学渊源与早年运势",
};

/* 简化的紫微斗数排盘 */
function calculateZiwei(birth) {
  const year = birth.getFullYear();
  const month = birth.getMonth() + 1;
  const day = birth.getDate();
  const hour = birth.getHours();

  // 基于出生数据生成确定性的排盘
  const seed = year * 10000 + month * 100 + day;
  const hourBranch = getHourBranchIndex(hour);

  // 命宫位置计算（简化版）
  const mingGong = safeMod(month + hourBranch, 12);

  // 主星排列（基于紫微星起始位置）
  const ziweiPos = safeMod(seed + day * 3, 12);
  
  const palaces = ZIWEI_PALACES.map((name, i) => {
    const pos = safeMod(mingGong + i, 12);
    
    // 确定性地分配主星
    const mainStarIndex = safeMod(ziweiPos + i * 2 + Math.floor(seed / 100), 14);
    const mainStar = ZIWEI_STARS["主星"][mainStarIndex];
    
    // 分配辅星
    const stars = [mainStar];
    const auxSeed = seed + i * 7;
    
    // 有概率加入吉星
    if (safeMod(auxSeed * 3, 10) < 3) {
      const jIdx = safeMod(auxSeed, ZIWEI_STARS["吉星"].length);
      stars.push(ZIWEI_STARS["吉星"][jIdx]);
    }
    
    // 有概率加入煞星
    if (safeMod(auxSeed * 7, 10) < 2) {
      const sIdx = safeMod(auxSeed + 3, ZIWEI_STARS["煞星"].length);
      stars.push(ZIWEI_STARS["煞星"][sIdx]);
    }

    // 宫位评分
    const mainStarInfo = ZIWEI_STAR_MEANINGS[mainStar];
    let score = 70;
    if (["紫微", "天府", "太阳", "太阴", "天同", "武曲"].includes(mainStar)) score += 10;
    if (stars.some(s => ZIWEI_STARS["吉星"].includes(s))) score += 8;
    if (stars.some(s => ZIWEI_STARS["煞星"].includes(s))) score -= 5;
    score = Math.min(95, Math.max(45, score + safeMod(auxSeed, 11) - 5));

    return {
      name,
      meaning: ZIWEI_PALACE_MEANINGS[name],
      stars,
      mainStar,
      score,
      branch: BRANCHES[pos],
    };
  });

  // 命宫主星
  const mingMainStar = palaces[0].mainStar;
  const mingStarInfo = ZIWEI_STAR_MEANINGS[mingMainStar];

  return {
    palaces,
    mingMainStar,
    mingStarInfo,
    summary: `紫微斗数命盘以${mingMainStar}坐命，${mingStarInfo.nature}入命宫，${mingStarInfo.desc}。结合十二宫星曜分布，可以更全面地了解一生的格局与机遇。`,
  };
}

/* ===== 五行生克关系 ===== */
const ELEMENT_GENERATE = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const ELEMENT_OVERCOME = { 木: "土", 火: "金", 土: "水", 金: "木", 水: "火" };
const ELEMENT_GENERATED_BY = { 木: "水", 火: "木", 土: "火", 金: "土", 水: "金" };
const ELEMENT_OVERCOME_BY = { 木: "金", 火: "水", 土: "木", 金: "火", 水: "土" };

/* ===== 十神映射 ===== */
const STEM_YIN_YANG = {
  甲: "阳", 乙: "阴", 丙: "阳", 丁: "阴", 戊: "阳",
  己: "阴", 庚: "阳", 辛: "阴", 壬: "阳", 癸: "阴",
};

function getTenGod(dayStem, otherStem) {
  const dayEl = STEM_ELEMENTS[dayStem];
  const otherEl = STEM_ELEMENTS[otherStem];
  const dayYY = STEM_YIN_YANG[dayStem];
  const otherYY = STEM_YIN_YANG[otherStem];
  const same = dayYY === otherYY;

  if (dayEl === otherEl) return same ? "比肩" : "劫财";
  if (ELEMENT_GENERATE[dayEl] === otherEl) return same ? "食神" : "伤官";
  if (ELEMENT_OVERCOME[dayEl] === otherEl) return same ? "偏财" : "正财";
  if (ELEMENT_OVERCOME_BY[dayEl] === otherEl) return same ? "七杀" : "正官";
  if (ELEMENT_GENERATED_BY[dayEl] === otherEl) return same ? "偏印" : "正印";
  return "";
}

const TEN_GOD_MEANINGS = {
  比肩: { icon: "🤝", brief: "同类相助", detail: "代表兄弟朋友、竞争伙伴，主独立自主、意志坚定，旺则人脉广但主观强" },
  劫财: { icon: "⚔️", brief: "争夺竞争", detail: "代表竞争对手、破财因素，主果敢冒险，旺则行动力强但易冲动耗财" },
  食神: { icon: "🎨", brief: "才华表达", detail: "代表才艺灵感、口福享受，主温和聪慧，旺则创造力强、生活有品味" },
  伤官: { icon: "💡", brief: "创新突破", detail: "代表叛逆创新、技术才能，主聪明犀利，旺则才华横溢但个性尖锐" },
  偏财: { icon: "💰", brief: "意外之财", detail: "代表横财投资、父亲缘分，主慷慨大方，旺则财运亨通、社交能力强" },
  正财: { icon: "🏦", brief: "稳定收入", detail: "代表工薪收入、妻缘（男命），主勤俭踏实，旺则收入稳定、理财有方" },
  七杀: { icon: "🗡️", brief: "权威压力", detail: "代表压力挑战、权威贵人，主刚毅果断，旺则事业心强但压力大" },
  正官: { icon: "👔", brief: "规矩地位", detail: "代表职位名誉、丈夫缘（女命），主端正守规，旺则有贵人提携、社会地位高" },
  偏印: { icon: "📚", brief: "偏门学问", detail: "代表特殊技能、非主流知识，主思维独特，旺则悟性高但性格孤僻" },
  正印: { icon: "🎓", brief: "学历庇护", detail: "代表学业文凭、母亲庇护，主仁慈博学，旺则学业有成、贵人运好" },
};

/* ===== 纳音五行 ===== */
const NAYIN_TABLE = [
  "海中金", "海中金", "炉中火", "炉中火", "大林木", "大林木",
  "路旁土", "路旁土", "剑锋金", "剑锋金", "山头火", "山头火",
  "涧下水", "涧下水", "城头土", "城头土", "白蜡金", "白蜡金",
  "杨柳木", "杨柳木", "泉中水", "泉中水", "屋上土", "屋上土",
  "霹雳火", "霹雳火", "松柏木", "松柏木", "长流水", "长流水",
  "砂石金", "砂石金", "山下火", "山下火", "平地木", "平地木",
  "壁上土", "壁上土", "金箔金", "金箔金", "覆灯火", "覆灯火",
  "天河水", "天河水", "大驿土", "大驿土", "钗钏金", "钗钏金",
  "桑柘木", "桑柘木", "大溪水", "大溪水", "沙中土", "沙中土",
  "天上火", "天上火", "石榴木", "石榴木", "大海水", "大海水",
];

const NAYIN_DESCRIPTIONS = {
  海中金: "如珠藏海底，含蓄内敛，潜力深厚，大器晚成之象",
  炉中火: "如洪炉烈焰，热情奔放，行事果断，光芒万丈之象",
  大林木: "如森林参天，根基深厚，格局宏大，栋梁之材之象",
  路旁土: "如大道通途，包容厚重，务实稳健，承载万物之象",
  剑锋金: "如利剑出鞘，锐利果决，才华出众，锋芒毕露之象",
  山头火: "如日照山巅，光明正大，志向高远，照耀四方之象",
  涧下水: "如山涧清泉，清澈灵动，聪慧敏捷，润物无声之象",
  城头土: "如城墙坚固，稳重可靠，有担当有责任，守护之象",
  白蜡金: "如珠玉温润，外柔内刚，品性高洁，气质不凡之象",
  杨柳木: "如柳枝随风，柔韧灵活，适应力强，随遇而安之象",
  泉中水: "如泉涌不竭，智慧丰沛，思维活跃，源源不断之象",
  屋上土: "如屋顶覆盖，安稳庇护，居家有道，安居乐业之象",
  霹雳火: "如雷电交加，爆发力强，出手不凡，一鸣惊人之象",
  松柏木: "如松柏常青，坚毅不屈，经冬不凋，长寿吉祥之象",
  长流水: "如江河奔涌，气势磅礴，志在远方，奔流不息之象",
  砂石金: "如沙中淘金，经磨历练，越挫越勇，终成大器之象",
  山下火: "如夕阳暖照，温和明亮，不争不抢，光而不耀之象",
  平地木: "如平原绿洲，生机盎然，亲和包容，欣欣向荣之象",
  壁上土: "如墙壁粉饰，外表光鲜，注重面子，装点门面之象",
  金箔金: "如金箔闪耀，精致华丽，审美出众，点缀人生之象",
  覆灯火: "如灯烛微明，温暖柔和，默默付出，照亮身边之象",
  天河水: "如银河璀璨，眼界开阔，不拘小节，胸怀天下之象",
  大驿土: "如通衢大道，四通八达，人缘广阔，行走四方之象",
  钗钏金: "如首饰精美，品味高雅，注重细节，精致生活之象",
  桑柘木: "如蚕桑织锦，勤勉实干，默默耕耘，终有收获之象",
  大溪水: "如溪流汇聚，灵活变通，善于整合，汇集成河之象",
  沙中土: "如沙中含玉，看似平凡，内藏珍宝，不可小觑之象",
  天上火: "如日月高悬，光明磊落，正气凛然，普照万方之象",
  石榴木: "如石榴多籽，多才多艺，热情饱满，硕果累累之象",
  大海水: "如大海汪洋，心胸浩瀚，包容万象，深不可测之象",
};

/* ===== 性格与建议文案 ===== */
const DOMINANT_PROFILE = {
  木: {
    title: "木气偏盛 · 思路生发型",
    copy: "木旺的人通常重视成长与原则，反应快，愿意为理想投入行动。优点是有规划感、有韧性；需要注意的是别把高标准变成对自己和他人的压力。",
    career: "适合教育培训、策划设计、文化创意、园林环保等需要创造力和成长性的领域。",
    health: "木主肝胆，注意疏肝理气，避免长期情绪压抑，宜多运动、少熬夜。",
    lucky: { color: "绿色、青色", number: "3、8", direction: "东方", season: "春季" },
  },
  火: {
    title: "火气偏盛 · 表达驱动型",
    copy: "火旺的人感染力强、行动果断，容易带动氛围与节奏。优点是热情、执行快；需要留意情绪上头、节奏过快或消耗过度。",
    career: "适合销售市场、演艺传媒、餐饮烹饪、能源电力等需要热情和表现力的领域。",
    health: "火主心脏小肠，注意养心安神，避免过度兴奋劳累，宜静心冥想。",
    lucky: { color: "红色、紫色", number: "2、7", direction: "南方", season: "夏季" },
  },
  土: {
    title: "土气偏盛 · 稳定承载型",
    copy: "土旺的人重视安全感与责任边界，做事踏实、讲究结果。优点是耐心与稳健；要避免的是过度保守，或者背负过多压力。",
    career: "适合房地产、农业、建筑工程、人力资源等需要稳定和耐心的领域。",
    health: "土主脾胃，注意饮食规律，避免思虑过度，宜调理消化系统。",
    lucky: { color: "黄色、棕色", number: "5、0", direction: "中央", season: "四季交替之际" },
  },
  金: {
    title: "金气偏盛 · 判断秩序型",
    copy: "金旺的人通常逻辑清楚、标准明确，擅长取舍与判断。优点是效率高、边界感强；提醒是避免过于苛刻，留一点弹性更顺。",
    career: "适合金融法律、机械制造、医疗手术、科技研发等需要精准和判断力的领域。",
    health: "金主肺与大肠，注意呼吸系统保养，避免悲伤过度，宜呼吸锻炼。",
    lucky: { color: "白色、金色", number: "4、9", direction: "西方", season: "秋季" },
  },
  水: {
    title: "水气偏盛 · 感知流动型",
    copy: "水旺的人感受力强、适应变化快，也更擅长洞察趋势。优点是思维灵活、共情力好；需要注意犹豫摇摆，别让想法淹没行动。",
    career: "适合航运物流、旅游服务、咨询策划、互联网科技等需要灵活和流动性的领域。",
    health: "水主肾与膀胱，注意泌尿系统健康，避免恐惧担忧过度，宜温补养肾。",
    lucky: { color: "黑色、深蓝", number: "1、6", direction: "北方", season: "冬季" },
  },
};

const WEAK_ELEMENT_ADVICE = {
  木: {
    brief: "木偏弱，适合多接触自然、清晨活动、学习新技能，用稳定成长感补足能量。",
    detail: "建议：多穿青绿色衣物，在居所东方摆放绿植，饮食多吃蔬菜水果。工作中培养规划能力，清晨起床有助补木气。",
  },
  火: {
    brief: "火偏弱，适合增加表达、社交、运动与日照，让生活更有热度。",
    detail: "建议：多穿红色暖色系衣物，增加户外运动和阳光接触时间，培养演讲表达能力。在居所南方可放红色装饰物。",
  },
  土: {
    brief: "土偏弱，适合建立规律作息、整理空间、做好储蓄与计划，用秩序感稳住节奏。",
    detail: "建议：注意饮食规律，建立稳定的作息习惯，居住环境保持整洁。可在居所中央区域放置陶瓷摆件，穿黄棕色衣物。",
  },
  金: {
    brief: "金偏弱，适合练习决策、断舍离和执行清单，把目标收束得更明确。",
    detail: "建议：培养果断的决策习惯，练习列清单和执行力。可佩戴金属饰品，穿白色金色衣物，居所西方放金属装饰。",
  },
  水: {
    brief: "水偏弱，适合留出独处、阅读、复盘与思考的时间，让判断更从容。",
    detail: "建议：增加阅读和独处思考时间，多饮水，居所北方可放小型水景。穿黑色深蓝色衣物，培养冷静深思的习惯。",
  },
};

/* ===== 出生地五行与风水数据 ===== */
const REGION_ELEMENT_MAP = {
  // 华北
  北京: { element: "火", direction: "北方偏东", terrain: "平原", desc: "京畿之地，龙脉汇聚，帝王之气深厚，火土并旺", feature: "故都紫气，利权贵仕途，适合从政经商", advice: "北京属火中带金，适合果断有魄力之人发展" },
  天津: { element: "水", direction: "北方沿海", terrain: "滨海平原", desc: "河海交汇，水运亨通，商贾之气旺盛", feature: "九河下梢，水旺利财运，商业气息浓", advice: "天津水气充沛，宜从事贸易流通行业" },
  石家庄: { element: "土", direction: "北方", terrain: "平原", desc: "华北腹地，土气厚实，稳健务实", feature: "沃野千里，土气厚载，适合稳扎稳打", advice: "石家庄土气深厚，利房产基建行业" },
  太原: { element: "金", direction: "北方偏西", terrain: "盆地", desc: "表里山河，金气凝聚，坚韧刚毅", feature: "龙城宝地，金气刚健，利制造和矿业", advice: "太原金气旺盛，适合技术和实业发展" },
  呼和浩特: { element: "土", direction: "北方", terrain: "高原", desc: "塞外草原，天阔地广，土气浩瀚", feature: "草原沃土，胸襟开阔利格局宏大之事", advice: "呼和浩特土木并旺，宜牧业、旅游相关" },
  // 东北
  沈阳: { element: "金", direction: "东北", terrain: "平原", desc: "清朝龙兴之地，金气凌厉，有肃杀之威", feature: "龙兴故都，金水相生，利军工制造", advice: "沈阳金气凛冽，适合重工业、装备制造" },
  大连: { element: "水", direction: "东北沿海", terrain: "半岛", desc: "三面环海，水气旺盛，灵活通达", feature: "明珠港城，水木相生，利贸易旅游", advice: "大连水气充沛，适合外贸、航运、旅游" },
  长春: { element: "木", direction: "东北", terrain: "平原", desc: "北国春城，木气初生，蓄势待发", feature: "春城之名，木气向上，利汽车教育", advice: "长春木气渐旺，适合制造业和教育行业" },
  哈尔滨: { element: "水", direction: "东北", terrain: "平原", desc: "冰城水韵，寒水凝结，坚毅深沉", feature: "冰雪之都，水气极旺，利冷链物流", advice: "哈尔滨水气极强，宜从事与水相关行业" },
  // 华东
  上海: { element: "水", direction: "东方沿海", terrain: "滨海平原", desc: "十里洋场，水木交汇，财气鼎盛，国际化气场极强", feature: "东方明珠，水旺生财，金融之都", advice: "上海水金并旺，极利金融贸易、时尚创意" },
  南京: { element: "火", direction: "东方", terrain: "丘陵", desc: "六朝古都，虎踞龙蟠，王气沉厚，文脉昌隆", feature: "十朝都会，火土相生，利学术仕途", advice: "南京火气深蕴，适合学术研究、文化教育" },
  杭州: { element: "水", direction: "东南", terrain: "丘陵与平原", desc: "上有天堂下有苏杭，水秀山明，灵气萦绕，文旺财丰", feature: "人间天堂，水木清华，利电商创业", advice: "杭州水木交融，极利互联网和创新创业" },
  苏州: { element: "水", direction: "东方", terrain: "水乡平原", desc: "江南水乡，水木并茂，温润灵秀", feature: "园林之城，水气蕴秀，利制造科技", advice: "苏州水土相融，适合精密制造和科技产业" },
  合肥: { element: "土", direction: "东方偏中", terrain: "平原", desc: "淝水之畔，土气稳健，后发潜力大", feature: "创新之都，土火相生，利科技制造", advice: "合肥土气渐旺，适合科技创新和高端制造" },
  济南: { element: "水", direction: "东方偏北", terrain: "丘陵", desc: "泉城灵韵，水脉丰沛，灵动秀雅", feature: "泉水之都，水土并济，利文教商贸", advice: "济南水气灵动，适合文化教育和服务业" },
  青岛: { element: "水", direction: "东方沿海", terrain: "丘陵沿海", desc: "山海相依，水木交融，清朗大气", feature: "海滨名城，水气开阔，利航运外贸", advice: "青岛水气宽广，适合海洋经济和旅游" },
  福州: { element: "木", direction: "东南沿海", terrain: "盆地", desc: "有福之州，木气繁荣，温暖舒适", feature: "榕城绿韵，木气旺盛，利软件外贸", advice: "福州木气充盈，适合软件开发和对外贸易" },
  厦门: { element: "水", direction: "东南沿海", terrain: "海岛", desc: "海上花园，水气清灵，文艺浪漫", feature: "鹭岛灵秀，水火既济，利旅游文创", advice: "厦门水气秀美，适合旅游、文创、服务业" },
  宁波: { element: "水", direction: "东方沿海", terrain: "沿海丘陵", desc: "港通天下，水运亨通，实业兴旺", feature: "东海名港，水金相生，利航运贸易", advice: "宁波水气汹涌，适合港口贸易和制造业" },
  无锡: { element: "水", direction: "东方", terrain: "水乡", desc: "太湖明珠，水润物丰，富甲一方", feature: "太湖灵秀，水旺生财，利物联科技", advice: "无锡水气丰润，适合科技产业和现代制造" },
  温州: { element: "火", direction: "东南沿海", terrain: "沿海丘陵", desc: "商人之乡，火气旺盛，开拓进取", feature: "商都火气，敢拼敢闯，利创业经商", advice: "温州火气刚烈，极利自主创业和商贸" },
  // 华中
  武汉: { element: "水", direction: "中部", terrain: "江湖平原", desc: "九省通衢，长江汉水交汇，水运极盛，大气磅礴", feature: "江城水韵，水木交融，利教育科技", advice: "武汉水气浩荡，适合教育科研和光电产业" },
  长沙: { element: "火", direction: "中南", terrain: "丘陵", desc: "楚汉名城，火气旺盛，热情奔放，创新活力足", feature: "星城热土，火旺利文娱科技", advice: "长沙火气充盈，极利文娱传媒和消费产业" },
  郑州: { element: "土", direction: "中原", terrain: "平原", desc: "中原腹地，天地之中，土气最厚，四通八达", feature: "天下之中，土气浩厚，利物流交通", advice: "郑州土气中正，适合物流枢纽和商贸流通" },
  南昌: { element: "火", direction: "中部偏南", terrain: "盆地", desc: "英雄城池，火气昂扬，正义勇毅", feature: "军旗升起处，火气刚正，利军工科技", advice: "南昌火土相生，适合制造业和科技创新" },
  // 华南
  广州: { element: "火", direction: "南方", terrain: "三角洲", desc: "南国商都，火气炽盛，商业气场极强，包容开放", feature: "千年商都，火旺生土利财运", advice: "广州火气鼎盛，极利贸易批发、餐饮服务" },
  深圳: { element: "火", direction: "南方沿海", terrain: "沿海丘陵", desc: "改革前沿，火木交融，创新之气蓬勃，年轻有活力", feature: "创新之城，火木相生，利科技创业", advice: "深圳火气创新，极利高科技和互联网创业" },
  珠海: { element: "水", direction: "南方沿海", terrain: "沿海", desc: "百岛之市，水气清雅，宜居宜业", feature: "海滨花园，水气宜人，利旅游休闲", advice: "珠海水气清新，适合休闲旅游和高端制造" },
  东莞: { element: "火", direction: "南方", terrain: "丘陵", desc: "制造名城，火土并旺，实干苦干", feature: "世界工厂，火土相生，利制造加工", advice: "东莞火土气旺，适合制造业和产业升级" },
  佛山: { element: "金", direction: "南方", terrain: "三角洲", desc: "武术之乡，金气凛然，制造业发达", feature: "铸造名城，金火淬炼，利陶瓷建材", advice: "佛山金气铸就，适合建材家居和先进制造" },
  海口: { element: "水", direction: "南方岛屿", terrain: "沿海", desc: "椰城海韵，水气充沛，热带风情", feature: "自贸港口，水火交融，利旅游外贸", advice: "海口水气温暖，适合自由贸易和旅游开发" },
  南宁: { element: "木", direction: "南方偏西", terrain: "盆地", desc: "绿城风光，木气盎然，亚热带气候温和", feature: "绿城木韵，木火相生，利东盟贸易", advice: "南宁木气繁茂，适合东盟贸易和特色农业" },
  // 西南
  成都: { element: "土", direction: "西南", terrain: "盆地", desc: "天府之国，土气丰饶，安逸富足，文化底蕴深厚", feature: "天府沃土，土金相生，利美食科技", advice: "成都土气丰厚，极利游戏科技、文创美食" },
  重庆: { element: "火", direction: "西南", terrain: "山地", desc: "山城雾都，火土交汇，刚毅热烈，性格豪爽", feature: "巴渝火气，刚烈直爽，利制造汽车", advice: "重庆火气刚烈，适合汽车制造和重工业" },
  昆明: { element: "木", direction: "西南", terrain: "高原", desc: "春城花都，四季如春，木气长青，灵气汇聚", feature: "春城木韵，木水相涵，利旅游花卉", advice: "昆明木气常青，适合旅游和生态产业" },
  贵阳: { element: "木", direction: "西南", terrain: "高原山地", desc: "爽爽贵阳，山木并秀，空气清新", feature: "林城木气，水木相滋，利大数据旅游", advice: "贵阳木水相生，适合大数据和生态旅游" },
  拉萨: { element: "金", direction: "西南高原", terrain: "高原", desc: "日光之城，金气纯净，灵性至高", feature: "雪域净土，金水相映，利灵修文旅", advice: "拉萨金气至纯，适合文化旅游和心灵产业" },
  // 西北
  西安: { element: "金", direction: "西北", terrain: "关中平原", desc: "千年帝都，金气凝厚，皇家气象，文脉绵长", feature: "十三朝古都，金土相生，利军工科教", advice: "西安金气庄重，极利军工科技和文化教育" },
  兰州: { element: "金", direction: "西北", terrain: "河谷", desc: "金城玉关，黄河穿城，金水相生", feature: "金城汤池，金水并济，利石化能源", advice: "兰州金水交融，适合能源化工行业" },
  银川: { element: "金", direction: "西北", terrain: "平原", desc: "塞上江南，金土相映，富饶宜居", feature: "塞上明珠，金水灌溉，利枸杞葡萄", advice: "银川金水并旺，适合特色农业和新能源" },
  西宁: { element: "水", direction: "西北高原", terrain: "河谷", desc: "西海锁钥，水气清冽，纯净高远", feature: "高原水韵，水金相生，利盐湖能源", advice: "西宁水气纯净，适合新能源和高原生态" },
  乌鲁木齐: { element: "土", direction: "西北", terrain: "盆地", desc: "丝路明珠，土气广袤，连通东西", feature: "丝路要冲，土金并旺，利能源贸易", advice: "乌鲁木齐土气辽阔，适合能源和中亚贸易" },
  // 特别行政区/台湾
  香港: { element: "水", direction: "南方沿海", terrain: "半岛与岛屿", desc: "东方之珠，水气汇聚全球财运，金融中心", feature: "港岛水气，水金相生，利金融贸易", advice: "香港水气旺财，极利国际金融和贸易" },
  澳门: { element: "水", direction: "南方沿海", terrain: "半岛", desc: "莲花宝地，水气灵秀，小而精致", feature: "莲城水韵，水火交映，利旅游博彩", advice: "澳门水气灵巧，适合旅游娱乐和服务业" },
  台北: { element: "水", direction: "东方沿海", terrain: "盆地", desc: "宝岛明珠，水木交融，科技文创发达", feature: "科技之都，水木相滋，利半导体文创", advice: "台北水木并旺，适合高科技和文化创意" },
};

/* 模糊匹配出生地 */
function matchBirthplace(input) {
  if (!input) return null;
  const clean = input.trim().replace(/[市省区县镇乡村]/g, "");
  
  // 精确匹配
  if (REGION_ELEMENT_MAP[clean]) return { city: clean, ...REGION_ELEMENT_MAP[clean] };
  
  // 模糊匹配（包含关系）
  for (const [city, data] of Object.entries(REGION_ELEMENT_MAP)) {
    if (clean.includes(city) || city.includes(clean)) {
      return { city, ...data };
    }
  }
  
  // 省份匹配
  const PROVINCE_CITY = {
    广东: "广州", 浙江: "杭州", 江苏: "南京", 山东: "济南", 河南: "郑州",
    四川: "成都", 湖北: "武汉", 湖南: "长沙", 福建: "福州", 安徽: "合肥",
    江西: "南昌", 河北: "石家庄", 辽宁: "沈阳", 吉林: "长春", 黑龙江: "哈尔滨",
    陕西: "西安", 山西: "太原", 甘肃: "兰州", 云南: "昆明", 贵州: "贵阳",
    广西: "南宁", 海南: "海口", 内蒙古: "呼和浩特", 宁夏: "银川",
    青海: "西宁", 新疆: "乌鲁木齐", 西藏: "拉萨", 台湾: "台北",
  };
  
  for (const [prov, city] of Object.entries(PROVINCE_CITY)) {
    if (clean.includes(prov) || prov.includes(clean)) {
      return { city, ...REGION_ELEMENT_MAP[city] };
    }
  }
  
  return null;
}

/* 分析出生地对命格的影响 */
function analyzeBirthplaceInfluence(regionInfo, dayElement, dominant, weak, counts) {
  const regionEl = regionInfo.element;
  
  // 地域五行与日主的关系
  let relation = "";
  let harmony = 0; // -2 到 2 的和谐度
  
  if (regionEl === dayElement) {
    relation = "比助";
    harmony = 1;
  } else if (ELEMENT_GENERATE[regionEl] === dayElement) {
    relation = "生助";
    harmony = 2;
  } else if (ELEMENT_GENERATED_BY[regionEl] === dayElement) {
    relation = "泄气";
    harmony = -1;
  } else if (ELEMENT_OVERCOME[regionEl] === dayElement) {
    relation = "克制";
    harmony = -2;
  } else if (ELEMENT_OVERCOME_BY[regionEl] === dayElement) {
    relation = "受克";
    harmony = 0;
  }
  
  // 是否补足了弱元素
  const fillWeak = regionEl === weak;
  
  // 综合评语
  let summary = "";
  if (harmony >= 2) {
    summary = `你的出生地${regionInfo.city}五行属${regionEl}，与你的日主${dayElement}形成"${relation}"关系，这是非常吉利的格局！${regionEl}生${dayElement}，如同大地滋养根苗，出生地为你的命格注入了天然的能量加持。`;
  } else if (harmony === 1) {
    summary = `出生地${regionInfo.city}五行属${regionEl}，与你的日主${dayElement}同属一气，形成"${relation}"关系。同气相求，出生地加强了你的本命气场，让你的${dayElement}属性更加鲜明有力。`;
  } else if (harmony === 0) {
    summary = `出生地${regionInfo.city}五行属${regionEl}，与你的日主${dayElement}之间存在张力。这种紧张感反而能激发潜能，让你在挑战中成长，历练出更强的适应力。`;
  } else if (harmony === -1) {
    summary = `出生地${regionInfo.city}五行属${regionEl}，你的日主${dayElement}生${regionEl}，有一定的能量外泄。不过这也意味着你天生愿意付出，容易获得他人认可和回报。`;
  } else {
    summary = `出生地${regionInfo.city}五行属${regionEl}，对你的日主${dayElement}有一定的克制作用。但古语说"玉不琢不成器"，适当的约束反而能让你更加沉稳内敛，大器晚成。`;
  }
  
  if (fillWeak) {
    summary += `\n\n特别有利的是：${regionInfo.city}的${regionEl}气恰好补足了你八字中偏弱的${weak}，这是天时地利的好配置，出生地为你的命格形成了天然的调和！`;
  }
  
  // 发展建议
  let devAdvice = "";
  if (harmony >= 1) {
    devAdvice = `出生地对你的加持很强，在${regionInfo.city}及${regionInfo.direction}发展会如鱼得水。${regionInfo.advice}`;
  } else {
    const goodDir = DOMINANT_PROFILE[dayElement]?.lucky?.direction || "本命有利方位";
    devAdvice = `虽然出生地气场与日主有些张力，但这锻炼了你的适应力。建议在${goodDir}方向寻找发展机会，也可以考虑前往五行属${ELEMENT_GENERATED_BY[dayElement]}的城市发展。${regionInfo.advice}`;
  }
  
  return {
    regionEl,
    relation,
    harmony,
    fillWeak,
    summary,
    devAdvice,
    harmonyStar: harmony >= 2 ? "★★★★★" : harmony >= 1 ? "★★★★☆" : harmony >= 0 ? "★★★☆☆" : harmony >= -1 ? "★★☆☆☆" : "★☆☆☆☆",
    harmonyLabel: harmony >= 2 ? "极佳" : harmony >= 1 ? "良好" : harmony >= 0 ? "中等" : harmony >= -1 ? "偏弱" : "需调和",
  };
}


const YEARLY_RANGE_START = 2015;
const YEARLY_RANGE_END = 2030;

const YEARLY_ELEMENT_INFLUENCE = {
  木: {
    木: { score: 75, desc: "比劫之年，同类相助，人脉扩展但需防竞争加剧" },
    火: { score: 85, desc: "食伤之年，才华绽放，创意与表达的黄金期" },
    土: { score: 70, desc: "财星之年，求财有道，适合投资理财和拓展收入" },
    金: { score: 55, desc: "官杀之年，压力与机遇并存，事业有挑战亦有突破" },
    水: { score: 80, desc: "印星之年，学业有成，贵人运旺，适合进修充电" },
  },
  火: {
    木: { score: 80, desc: "印星之年，获得支持与庇护，学业事业有贵人" },
    火: { score: 75, desc: "比劫之年，行动力旺盛但要防过度消耗" },
    土: { score: 85, desc: "食伤之年，表达力强，艺术创造的高光时刻" },
    金: { score: 70, desc: "财星之年，正财偏财均有机会，把握时机" },
    水: { score: 55, desc: "官杀之年，外在压力大但有助于成长突破" },
  },
  土: {
    木: { score: 55, desc: "官杀之年，有管束和考验，也有贵人提携" },
    火: { score: 80, desc: "印星之年，长辈庇护，适合沉淀积累" },
    土: { score: 75, desc: "比劫之年，稳固根基的一年，守成为主" },
    金: { score: 85, desc: "食伤之年，技能输出期，适合展示实力" },
    水: { score: 70, desc: "财星之年，财运渐好，但需稳健理财" },
  },
  金: {
    木: { score: 70, desc: "财星之年，收入有增，适合拓展财源" },
    火: { score: 55, desc: "官杀之年，职场压力大但有晋升机会" },
    土: { score: 80, desc: "印星之年，有长辈贵人支持，适合深造" },
    金: { score: 75, desc: "比劫之年，同行相助但注意竞争" },
    水: { score: 85, desc: "食伤之年，灵感迸发，创新创业的好时机" },
  },
  水: {
    木: { score: 85, desc: "食伤之年，思维活跃，表达与创造力达到巅峰" },
    火: { score: 70, desc: "财星之年，财来财往，注意把握赚钱节奏" },
    土: { score: 55, desc: "官杀之年，有约束和压力，也有成长机遇" },
    金: { score: 80, desc: "印星之年，学业运佳，容易获得提携和指导" },
    水: { score: 75, desc: "比劫之年，人缘广但需防小人，合作共赢" },
  },
};

/* ===== 流年财运评分 ===== */
const YEARLY_WEALTH_INFLUENCE = {
  木: {
    木: { score: 60, desc: "同类之年，财运平稳，不宜激进投资" },
    火: { score: 70, desc: "食伤生财，创意变现机会多" },
    土: { score: 88, desc: "财星当令，正财偏财两旺，把握良机" },
    金: { score: 55, desc: "官星制身，花销增大，量入为出" },
    水: { score: 65, desc: "印星护身，财运稳健但增长有限" },
  },
  火: {
    木: { score: 65, desc: "印星之年，财运平稳，宜守不宜攻" },
    火: { score: 60, desc: "比劫争财，防合作纠纷和破财" },
    土: { score: 70, desc: "食伤生财，才华转化财富的好时机" },
    金: { score: 88, desc: "财星大旺，收入丰厚，投资有利" },
    水: { score: 55, desc: "官杀耗财，需谨慎理财防意外支出" },
  },
  土: {
    木: { score: 55, desc: "官杀克身，财运受压，守成为上" },
    火: { score: 65, desc: "印星之年，财运平稳，贵人助财" },
    土: { score: 60, desc: "比劫之年，同行竞争激烈，防破财" },
    金: { score: 70, desc: "食伤泄秀，技能变现收入增加" },
    水: { score: 88, desc: "财星当旺，求财顺利，偏财运尤佳" },
  },
  金: {
    木: { score: 88, desc: "财星大利，正偏财运双旺，大胆求财" },
    火: { score: 55, desc: "官杀克身，花费增多，控制开支" },
    土: { score: 65, desc: "印星之年，财运尚可，稳中有升" },
    金: { score: 60, desc: "比劫争财，投资需谨慎防亏损" },
    水: { score: 70, desc: "食伤生财，灵感变现能力强" },
  },
  水: {
    木: { score: 70, desc: "食伤旺盛，创意创业带来收入" },
    火: { score: 88, desc: "财星当令，财运亨通，投资理财旺季" },
    土: { score: 55, desc: "官杀制身，破财风险高，保守为佳" },
    金: { score: 65, desc: "印星护财，收入平稳，贵人助财" },
    水: { score: 60, desc: "比劫之年，钱财易散，合作需谨慎" },
  },
};

/* ===== 流年事业评分 ===== */
const YEARLY_CAREER_INFLUENCE = {
  木: {
    木: { score: 72, desc: "比肩之年，同行助力但竞争也大" },
    火: { score: 80, desc: "食伤泄秀，才华展示期，利创新创业" },
    土: { score: 65, desc: "财星耗身，工作忙碌收效一般" },
    金: { score: 85, desc: "官星当权，升职加薪良机，贵人提拔" },
    水: { score: 78, desc: "印星助力，学业进修利，资质认证好时机" },
  },
  火: {
    木: { score: 78, desc: "印星助力，获得上级支持和资源" },
    火: { score: 72, desc: "比劫之年，团队合作但主导权需争取" },
    土: { score: 80, desc: "食伤泄秀，创新表现突出利晋升" },
    金: { score: 65, desc: "财星耗身，事业进展平缓需耐心" },
    水: { score: 85, desc: "官杀当权，职场突破大好时机" },
  },
  土: {
    木: { score: 85, desc: "官星高照，仕途顺利，领导赏识" },
    火: { score: 78, desc: "印星加持，专业提升期，利考证进修" },
    土: { score: 72, desc: "比肩之年，稳固现有地位为主" },
    金: { score: 80, desc: "食伤生辉，展现实力的好机会" },
    水: { score: 65, desc: "财星耗身，工作量大但成效有限" },
  },
  金: {
    木: { score: 65, desc: "财星分心，事业发展受限需专注" },
    火: { score: 85, desc: "官杀当令，事业大跃升之年，抓住机遇" },
    土: { score: 78, desc: "印星扶持，深造充电利长远发展" },
    金: { score: 72, desc: "比肩并肩，同事助力但竞争同在" },
    水: { score: 80, desc: "食伤展才，创新项目获认可" },
  },
  水: {
    木: { score: 80, desc: "食伤得力，创新突破获成就" },
    火: { score: 65, desc: "财星分神，事业节奏放缓需沉淀" },
    土: { score: 85, desc: "官杀主事，职场大好机遇，高层关注" },
    金: { score: 78, desc: "印星庇护，领导培养重用之年" },
    水: { score: 72, desc: "比肩之年，人脉拓展利合作发展" },
  },
};

/* ===== 流月运势关键词 ===== */
const MONTHLY_KEYWORDS = {
  比肩: { keyword: "合作", advice: "适合团队协作，但要注意利益分配" },
  劫财: { keyword: "竞争", advice: "有竞争压力，守住底线不冒进" },
  食神: { keyword: "创造", advice: "灵感充沛，适合创作和社交" },
  伤官: { keyword: "突破", advice: "有创新想法，注意控制情绪和言辞" },
  偏财: { keyword: "机遇", advice: "意外收获可能出现，但不可贪多" },
  正财: { keyword: "收获", advice: "正财稳定进账，适合理财规划" },
  七杀: { keyword: "挑战", advice: "压力较大，迎难而上反能成长" },
  正官: { keyword: "规矩", advice: "贵人运好，遵循规则做事" },
  偏印: { keyword: "学习", advice: "适合研究新知，留意非主流机会" },
  正印: { keyword: "贵人", advice: "有人帮扶，适合求学和考试" },
};

/* ===== 十神柱位差异化含义 ===== */
const TEN_GOD_PILLAR_MEANINGS = {
  比肩: {
    年柱: { meaning: "祖辈多兄弟姐妹，童年独立性强，早年靠自己打拼", tag: "自立" },
    月柱: { meaning: "朋友多、社交广，事业上多竞争伙伴，适合合伙经营", tag: "社交" },
    日支: { meaning: "配偶性格独立、有主见，婚姻中双方势均力敌", tag: "平等" },
    时柱: { meaning: "子女独立能干，晚年朋友多但经济上需自力更生", tag: "自强" },
  },
  劫财: {
    年柱: { meaning: "祖业难守或早年破财，兄弟姐妹间有竞争", tag: "争夺" },
    月柱: { meaning: "事业竞争激烈，易因朋友破财，合作需慎选对象", tag: "防损" },
    日支: { meaning: "配偶个性强势或花钱大方，婚姻中财务需协商", tag: "磨合" },
    时柱: { meaning: "晚年花销较大，子女有魄力但可能让你操心经济", tag: "耗散" },
  },
  食神: {
    年柱: { meaning: "祖辈福泽深厚，童年生活优渥，自幼才思敏捷", tag: "福泽" },
    月柱: { meaning: "才华横溢、表达力强，适合创意、文化、餐饮行业", tag: "才华" },
    日支: { meaning: "配偶温厚善良、懂生活情趣，家庭和睦有口福", tag: "温馨" },
    时柱: { meaning: "子女聪慧有才艺，晚年安逸享福、生活有品质", tag: "安逸" },
  },
  伤官: {
    年柱: { meaning: "少年叛逆、不服管教，与长辈有代沟但思维超前", tag: "叛逆" },
    月柱: { meaning: "技术出众、创新力强，适合专业技术或自由职业领域", tag: "专精" },
    日支: { meaning: "配偶才华横溢但个性尖锐，婚姻中需要包容与沟通", tag: "才子" },
    时柱: { meaning: "子女有才但个性强，晚年追求精神层面的满足", tag: "求新" },
  },
  偏财: {
    年柱: { meaning: "祖上经商或家境殷实，早年有意外财运或长辈馈赠", tag: "家底" },
    月柱: { meaning: "人缘极佳、社交生财，适合销售、投资、商贸行业", tag: "人脉" },
    日支: { meaning: "（男命）配偶温柔大方、会持家；异性缘佳但需守分寸", tag: "桃花" },
    时柱: { meaning: "晚年财运亨通，子女孝顺且经济条件好", tag: "晚福" },
  },
  正财: {
    年柱: { meaning: "家境务实稳定，自幼受勤俭家风熏陶，理财意识早", tag: "勤俭" },
    月柱: { meaning: "事业稳健、收入稳定，适合金融、财务、实业等领域", tag: "稳健" },
    日支: { meaning: "（男命）配偶贤惠持家、踏实可靠，家庭经济有保障", tag: "贤内" },
    时柱: { meaning: "晚年积蓄丰厚，子女务实孝顺、经济独立", tag: "积蓄" },
  },
  七杀: {
    年柱: { meaning: "童年管教严格或祖辈有军政背景，早年压力大但磨砺意志", tag: "磨砺" },
    月柱: { meaning: "事业心极强、有领导力和魄力，适合管理、军警、法律", tag: "权威" },
    日支: { meaning: "配偶能力强、有压迫感，婚姻中需互相尊重避免冲突", tag: "强势" },
    时柱: { meaning: "子女有出息但管不住，晚年仍有事业追求和挑战", tag: "不歇" },
  },
  正官: {
    年柱: { meaning: "家风端正、祖辈有社会地位，自幼受良好教育", tag: "家教" },
    月柱: { meaning: "仕途光明、贵人多助，适合公务员、管理层、大企业", tag: "仕途" },
    日支: { meaning: "（女命）丈夫正派有担当；（男命）自律性强、重视规矩", tag: "正派" },
    时柱: { meaning: "子女品学兼优、有出息，晚年受人尊敬、名声好", tag: "声望" },
  },
  偏印: {
    年柱: { meaning: "祖辈有特殊才能或非常规经历，童年环境较特殊", tag: "独特" },
    月柱: { meaning: "悟性极高、直觉灵敏，适合研究、IT、玄学、中医", tag: "悟性" },
    日支: { meaning: "配偶有独特才华但性格内敛，精神世界丰富", tag: "内秀" },
    时柱: { meaning: "子女有特殊天赋，晚年转向修身养性、追求精神价值", tag: "修行" },
  },
  正印: {
    年柱: { meaning: "家庭教育优良、母亲影响深远，自幼受呵护", tag: "庇荫" },
    月柱: { meaning: "学业运佳、有贵人提携，适合教育、学术、文化行业", tag: "学术" },
    日支: { meaning: "配偶仁慈包容、善解人意，家庭温馨和谐", tag: "慈爱" },
    时柱: { meaning: "子女孝顺、学业好，晚年安享清福、衣食无忧", tag: "清福" },
  },
};

/* ===== 十神组合解读 ===== */
const TEN_GOD_COMBOS = [
  { name: "官印相生", gods: ["正官", "正印"], quality: "吉",
    desc: "官星生印星，官得印护、印得官引，仕途文凭两得意。命主既有管理能力又有学识修养，适合体制内或大企业担任要职。" },
  { name: "杀印相生", gods: ["七杀", "正印"], quality: "吉",
    desc: "七杀配印星，化压力为动力。命主在高压环境中反而能超常发挥，适合竞争激烈的高端领域，如法律、金融、军事。" },
  { name: "食伤生财", gods: ["食神", "正财"], altGods: [["食神", "偏财"], ["伤官", "正财"], ["伤官", "偏财"]], quality: "吉",
    desc: "才华转化为财富的黄金组合。命主靠技艺、创意、口才赚钱，事业与财运相辅相成，是自由职业者和创业者的最佳格局。" },
  { name: "财官相生", gods: ["正财", "正官"], altGods: [["偏财", "正官"], ["正财", "七杀"]], quality: "吉",
    desc: "以财养官、以官护财，财权兼得。命主既有经济基础又有社会地位，事业步步高升，适合经商从政两手发展。" },
  { name: "伤官配印", gods: ["伤官", "正印"], quality: "吉",
    desc: "才华配修养，刚柔并济。命主有过人才气又不失沉稳，在学术、艺术、技术领域能达到很高成就。" },
  { name: "伤官见官", gods: ["伤官", "正官"], quality: "凶",
    desc: "伤官克官，口舌是非之象。命主才高气傲容易得罪上司权贵，事业上需收敛锋芒、低调做人，否则招祸。" },
  { name: "枭神夺食", gods: ["偏印", "食神"], quality: "凶",
    desc: "偏印克食神，创意受阻。命主有才华却施展不开，容易起步后又中途而废。须防投资被骗、合作翻脸。" },
  { name: "比劫夺财", gods: ["比肩", "正财"], altGods: [["劫财", "正财"], ["比肩", "偏财"], ["劫财", "偏财"]], quality: "凶",
    desc: "兄弟争财之象，人际关系带来经济损失。命主不宜与人合伙经营、不宜借贷担保，理财需独立自主。" },
  { name: "食神制杀", gods: ["食神", "七杀"], quality: "吉",
    desc: "以食制杀、化敌为友。命主能巧妙化解压力和竞争，以智慧和才华征服对手。属于高层次的命格配置。" },
  { name: "官杀混杂", gods: ["正官", "七杀"], quality: "凶",
    desc: "正官与七杀齐现，号令不一、立场矛盾。命主在事业上容易左右为难、受多方牵制。需要合杀留官或合官留杀来化解。" },
];

/* ===== 十神五分类映射 ===== */
const TEN_GOD_CATEGORIES = {
  比肩: "比劫", 劫财: "比劫",
  食神: "食伤", 伤官: "食伤",
  偏财: "财星", 正财: "财星",
  七杀: "官杀", 正官: "官杀",
  偏印: "印星", 正印: "印星",
};

const CATEGORY_MEANINGS = {
  比劫: { icon: "🤝", label: "比劫（自我·竞争）", desc: "代表自身力量、兄弟朋友和竞争能力。旺则人脉广、行动力强；过旺则刚愎自用、争财夺利。" },
  食伤: { icon: "🎨", label: "食伤（才华·表达）", desc: "代表才华输出、创造力和口才。旺则才思敏捷、创意丰富；过旺则恃才傲物、桀骜不驯。" },
  财星: { icon: "💰", label: "财星（财富·欲望）", desc: "代表财运、物质追求和异性缘（男命）。旺则财运亨通、生活富足；过旺则物欲重、劳碌奔波。" },
  官杀: { icon: "👔", label: "官杀（事业·权力）", desc: "代表事业地位、管理能力和约束力。旺则有权有势、受人尊重；过旺则压力大、是非多。" },
  印星: { icon: "🎓", label: "印星（学识·庇护）", desc: "代表学历、贵人、母亲和保护力量。旺则学识渊博、贵人运好；过旺则依赖心重、缺乏行动力。" },
};

/* ===== 十神深度分析生成 ===== */
function generateTenGodAnalysis(ctx) {
  const { completeTenGods, tenGods, pillars, dayStem, gender, strengthResult, usefulGod } = ctx;

  // ① 四柱十神明细表（天干+藏干）
  const pillarDetails = [];
  const pillarNames = ["年柱", "月柱", "日柱", "时柱"];
  pillars.forEach((p, i) => {
    const name = pillarNames[i];
    // 天干十神（日柱天干是日主本身）
    let stemGod = null, stemMeaning = null;
    if (i !== 2) {
      stemGod = getTenGod(dayStem, p.stem);
      const pillarKey = i === 0 ? "年柱" : i === 1 ? "月柱" : "时柱";
      stemMeaning = TEN_GOD_PILLAR_MEANINGS[stemGod]?.[pillarKey] || null;
    }
    // 地支藏干十神
    const hiddenGods = [];
    if (BRANCH_HIDDEN_STEMS[p.branch]) {
      BRANCH_HIDDEN_STEMS[p.branch].forEach((h, hIdx) => {
        const god = getTenGod(dayStem, h.stem);
        const label = hIdx === 0 ? "本气" : hIdx === 1 ? "中气" : "余气";
        const pillarKey = i === 0 ? "年柱" : i === 1 ? "月柱" : i === 2 ? "日支" : "时柱";
        const meaning = TEN_GOD_PILLAR_MEANINGS[god]?.[pillarKey] || null;
        hiddenGods.push({ stem: h.stem, weight: h.weight, label, god, meaning, element: STEM_ELEMENTS[h.stem] });
      });
    }
    pillarDetails.push({
      name, stem: p.stem, branch: p.branch,
      stemElement: p.stemElement, branchElement: p.branchElement,
      stemGod, stemMeaning, hiddenGods, isDayPillar: i === 2,
    });
  });

  // ② 十神能量分布（五大类统计）
  const catScores = { 比劫: 0, 食伤: 0, 财星: 0, 官杀: 0, 印星: 0 };
  const catGodDetails = { 比劫: [], 食伤: [], 财星: [], 官杀: [], 印星: [] };
  completeTenGods.all.forEach(g => {
    const cat = TEN_GOD_CATEGORIES[g.god];
    if (cat) {
      // 用权重：天干算1.0，本气0.6，中气0.3，余气0.1
      const w = g.isHidden ? (g.hiddenLabel === "本气" ? 0.6 : g.hiddenLabel === "中气" ? 0.3 : 0.1) : 1.0;
      catScores[cat] += w;
      catGodDetails[cat].push(g);
    }
  });
  const totalCatScore = Object.values(catScores).reduce((s, v) => s + v, 0);
  const catDistribution = Object.entries(catScores)
    .map(([cat, score]) => ({
      cat, score: Math.round(score * 100) / 100,
      pct: totalCatScore > 0 ? Math.round((score / totalCatScore) * 100) : 0,
      info: CATEGORY_MEANINGS[cat],
      gods: catGodDetails[cat],
    }))
    .sort((a, b) => b.score - a.score);

  // ③ 十神组合检测
  const presentGods = new Set(completeTenGods.all.map(g => g.god));
  const detectedCombos = [];
  TEN_GOD_COMBOS.forEach(combo => {
    const mainMatch = combo.gods.every(g => presentGods.has(g));
    if (mainMatch) {
      detectedCombos.push(combo);
      return;
    }
    if (combo.altGods) {
      for (const alt of combo.altGods) {
        if (alt.every(g => presentGods.has(g))) {
          detectedCombos.push({ ...combo, matchedGods: alt });
          return;
        }
      }
    }
  });

  // ④ 十神总评文字
  const dominantCat = catDistribution[0];
  const weakestCat = catDistribution[catDistribution.length - 1];
  let conclusion = "";
  conclusion += `命盘十神以「${dominantCat.info.label.split("（")[0]}」为主导（占${dominantCat.pct}%），`;
  conclusion += `${dominantCat.info.desc.split("。")[0]}。`;
  if (weakestCat.pct <= 5) {
    conclusion += `「${weakestCat.info.label.split("（")[0]}」几乎缺失（仅${weakestCat.pct}%），`;
    conclusion += `${weakestCat.info.desc.split("；")[1]?.replace("过旺则", "不足则易") || "需后天补足"}。`;
  }
  if (detectedCombos.length > 0) {
    const goodCombos = detectedCombos.filter(c => c.quality === "吉");
    const badCombos = detectedCombos.filter(c => c.quality === "凶");
    if (goodCombos.length > 0) {
      conclusion += ` 命局形成「${goodCombos.map(c => c.name).join("」「")}」的吉利组合，${goodCombos[0].desc.split("。")[0]}。`;
    }
    if (badCombos.length > 0) {
      conclusion += ` 同时需注意「${badCombos.map(c => c.name).join("」「")}」的不利组合，${badCombos[0].desc.split("。").slice(-2, -1)[0]}。`;
    }
  }
  // 缺失十神提示
  if (completeTenGods.absentGods.length > 0 && completeTenGods.absentGods.length <= 3) {
    conclusion += ` 命局缺少${completeTenGods.absentGods.join("、")}，`;
    const absentCats = [...new Set(completeTenGods.absentGods.map(g => TEN_GOD_CATEGORIES[g]))];
    conclusion += `${absentCats.join("、")}能量需通过大运流年或后天努力来补充。`;
  }

  return { pillarDetails, catDistribution, detectedCombos, conclusion, absentGods: completeTenGods.absentGods, dominantGod: completeTenGods.dominantGod };
}

/* ===== 综合命格总评生成 ===== */
function generateOverallConclusion(ctx) {
  const {
    name, gender, zodiac, dayElement, dominant, weak, balance,
    strengthResult, usefulGod, pattern, shensha, interactions,
    marriage, birthplaceAnalysis, regionInfo, profile,
    weightedCounts, yearlyFortunes, currentYear,
  } = ctx;

  const sections = [];
  const genderWord = gender === "male" ? "男" : "女";
  const strengthWord = strengthResult.isStrong ? "偏旺" : "偏弱";

  // ① 命格总论
  let overviewText = `${name}命属${dayElement}，日主${strengthResult.label}（${strengthResult.strengthScore}分），`;
  overviewText += `${strengthResult.monthStatus}。`;
  overviewText += `八字中${dominant}气最旺（${Math.round(weightedCounts[dominant])}分），${weak}气最弱（${Math.round(weightedCounts[weak])}分）`;
  const zeroElements = ELEMENTS.filter(e => weightedCounts[e] < 2);
  if (zeroElements.length > 0) {
    overviewText += `，${zeroElements.join("、")}几近缺失`;
  }
  overviewText += `。格局为${pattern.mainPattern.name}`;
  if (pattern.hasSpecial) {
    overviewText += `，兼有${pattern.specialPatterns.map(s => s.name).join("、")}`;
  }
  overviewText += `——${pattern.mainPattern.brief}。`;
  overviewText += `整体来看，此命${strengthResult.isStrong ? "精力充沛、主观意识强，适合主导型角色" : "性情温润、善于协作，适合借力借势发展"}。`;
  sections.push({ heading: "🔮 命格总论", text: overviewText });

  // ② 核心优势与短板
  let strengthText = "";
  // 优势
  const goodShensha = shensha.filter(s => s.type === "吉");
  const goodInteractions = (interactions.stemCombines.length + interactions.branchCombines.length + interactions.branchThreeCombines.length);
  strengthText += `【天赋优势】`;
  strengthText += `${dominant}气充沛赋予${name}${profile.copy.split("。")[0]}。`;
  if (goodShensha.length > 0) {
    strengthText += `命带${goodShensha.map(s => s.name).join("、")}，${goodShensha[0].desc}。`;
  }
  if (goodInteractions > 0) {
    strengthText += `四柱合局${goodInteractions > 2 ? "丰富" : "有利"}，人际贵人运${goodInteractions > 2 ? "极佳" : "不错"}。`;
  }
  // 短板
  strengthText += ` 【需要注意】`;
  strengthText += `${weak}偏弱提示在${WEAK_ELEMENT_ADVICE[weak].brief.split("，")[0]}方面需要后天补足。`;
  const badInteractions = (interactions.branchClashes.length + interactions.branchPunishes.length + interactions.branchHarms.length);
  if (badInteractions > 0) {
    strengthText += `四柱存在${interactions.branchClashes.length ? "六冲" : ""}${interactions.branchPunishes.length ? "三刑" : ""}${interactions.branchHarms.length ? "六害" : ""}，`;
    strengthText += `人生中可能有阶段性波动，但只要把握好节奏，波动反而是跃升的契机。`;
  }
  sections.push({ heading: "⚡ 核心优势与短板", text: strengthText });

  // ③ 用神与人生策略
  let strategyText = `此命取"${usefulGod.useGod}（${usefulGod.useGodElement}）"为用神，核心策略为「${usefulGod.strategy}」。`;
  strategyText += `喜${usefulGod.likeElements.join("、")}，忌${usefulGod.dislikeElements.join("、")}。`;
  strategyText += `在职业选择上宜向${usefulGod.useGodElement}相关行业靠拢——${profile.career}`;
  strategyText += ` 日常生活中，多接触${usefulGod.useGodElement}属性的颜色（${DOMINANT_PROFILE[usefulGod.useGodElement]?.lucky?.color || profile.lucky.color}）、方位（${DOMINANT_PROFILE[usefulGod.useGodElement]?.lucky?.direction || profile.lucky.direction}），`;
  strategyText += `能持续为命格注入正向能量。`;
  sections.push({ heading: "🎯 用神与人生策略", text: strategyText });

  // ④ 感情与婚姻概览
  if (marriage) {
    let marriageText = `婚姻格局评分 ${marriage.score} 分（${marriage.rating}）。`;
    marriageText += marriage.factors.slice(0, 3).join("；") + "。";
    marriageText += ` ${marriage.conclusion.split("。").slice(0, 2).join("。")}。`;
    sections.push({ heading: "💕 感情与婚姻", text: marriageText });
  }

  // ⑤ 流年走势概览
  const thisYearFortune = yearlyFortunes.find(yf => yf.year === currentYear);
  const nextYearFortune = yearlyFortunes.find(yf => yf.year === currentYear + 1);
  const bestYears = [...yearlyFortunes].sort((a, b) => b.score - a.score).slice(0, 3);
  const worstYears = [...yearlyFortunes].sort((a, b) => a.score - b.score).slice(0, 2);
  let yearlyText = "";
  if (thisYearFortune) {
    yearlyText += `${currentYear}年为${thisYearFortune.god}之年（综合${thisYearFortune.score}分），${thisYearFortune.desc}`;
  }
  if (nextYearFortune) {
    yearlyText += ` ${currentYear + 1}年转入${nextYearFortune.god}（${nextYearFortune.score}分），${nextYearFortune.desc}`;
  }
  yearlyText += ` 在2015-2030年间，最旺的年份为${bestYears.map(y => `${y.year}年（${y.score}分）`).join("、")}，`;
  yearlyText += `需多加留意的年份为${worstYears.map(y => `${y.year}年（${y.score}分）`).join("、")}。`;
  yearlyText += `总体节奏：${bestYears[0].score - worstYears[0].score > 25 ? "起伏较大，要善用高峰期、稳过低谷期" : "波动适中，稳步前进即可"}。`;
  sections.push({ heading: "📅 流年走势概览", text: yearlyText });

  // ⑥ 综合寄语
  let closingText = `综合而言，${name}的命盘${balance <= 5 ? "五行较为均衡，是难得的稳健格局" : `${dominant}旺${weak}弱，特长鲜明`}。`;
  closingText += `${pattern.mainPattern.name}${pattern.hasSpecial ? "配合" + pattern.specialPatterns[0].name : ""}的格局，`;
  closingText += `${strengthResult.isStrong
    ? "赋予了命主充沛的行动力和主导权，事业上宜大胆开拓，但也要学会倾听和退让"
    : "决定了命主需要善借外力、以柔克刚，在合适的平台和团队中更能绽放光芒"}。`;
  closingText += ` 命理是参考而非定论——善用天赋、补足短板、顺应时势，方能行稳致远。`;
  sections.push({ heading: "✨ 总评寄语", text: closingText });

  return sections;
}

/* ===== 五行分布文字总结生成 ===== */
function generateElementSummary(ctx) {
  const { weightedCounts, dominant, weak, dayElement, strengthResult, usefulGod } = ctx;

  const items = [];
  const total = Object.values(weightedCounts).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(weightedCounts).sort((a, b) => b[1] - a[1]);

  // 偏旺分析
  const strongEl = sorted[0];
  const pct = total > 0 ? Math.round((strongEl[1] / total) * 100) : 0;
  if (pct >= 40) {
    items.push({ type: "warn", icon: "🔥", text: `${strongEl[0]}气独大（占${pct}%），能量过于集中，需要${ELEMENT_GENERATE[strongEl[0]]}（泄）或${ELEMENT_OVERCOME_BY[strongEl[0]]}（克）来制衡。` });
  } else if (pct >= 30) {
    items.push({ type: "info", icon: "📊", text: `${strongEl[0]}气偏旺（占${pct}%），是命盘的主导力量，${DOMINANT_PROFILE[strongEl[0]]?.copy.split("。")[0] || ""}。` });
  } else {
    items.push({ type: "good", icon: "✅", text: `五行分布相对均匀，最旺的${strongEl[0]}也仅占${pct}%，属于难得的均衡格局。` });
  }

  // 偏弱/缺失分析
  const weakElements = sorted.filter(([el, score]) => score < 5);
  if (weakElements.length > 0) {
    const weakNames = weakElements.map(([el, score]) => `${el}（${Math.round(score)}分）`).join("、");
    items.push({ type: "warn", icon: "⚠️", text: `${weakNames}严重偏弱${weakElements.some(([_, s]) => s < 1) ? "甚至近乎缺失" : ""}，对应的身体和运势领域需重点关注和后天补足。` });
  }

  // 日主与五行关系
  const dayScore = weightedCounts[dayElement];
  const dayPct = total > 0 ? Math.round((dayScore / total) * 100) : 0;
  if (dayPct >= 25) {
    items.push({ type: "good", icon: "💪", text: `日主${dayElement}在五行中占比${dayPct}%，${strengthResult.label}，自身能量充足，行事有主见、有底气。` });
  } else if (dayPct >= 15) {
    items.push({ type: "info", icon: "⚖️", text: `日主${dayElement}占比${dayPct}%，${strengthResult.label}，需借助${ELEMENT_GENERATED_BY[dayElement]}（印星）来增强自身气场。` });
  } else {
    items.push({ type: "warn", icon: "🛡️", text: `日主${dayElement}仅占${dayPct}%，自身能量薄弱，宜找靠山、入大平台，避免独自扛压。` });
  }

  // 喜忌对照
  const likeScore = usefulGod.likeElements.reduce((s, el) => s + (weightedCounts[el] || 0), 0);
  const dislikeScore = usefulGod.dislikeElements.reduce((s, el) => s + (weightedCounts[el] || 0), 0);
  if (likeScore >= dislikeScore) {
    items.push({ type: "good", icon: "🎉", text: `喜用神五行（${usefulGod.likeElements.join("、")}）总能量${Math.round(likeScore)}分 ≥ 忌神（${usefulGod.dislikeElements.join("、")}）${Math.round(dislikeScore)}分，先天格局对你有利。` });
  } else {
    items.push({ type: "info", icon: "🔄", text: `忌神五行（${usefulGod.dislikeElements.join("、")}）能量${Math.round(dislikeScore)}分偏强于喜用（${usefulGod.likeElements.join("、")}）${Math.round(likeScore)}分，后天补足更为关键。` });
  }

  return items;
}

/* ===== 重点关注模块 ===== */
const FOCUS_GUIDE = {
  overall: {
    title: "综合运势深度解析",
    template: (dominant, weak, balance, counts) => {
      const lines = [];
      if (balance <= 1) {
        lines.push(`你的五行分布相对均衡，这是非常难得的格局。主线气质偏向"${dominant}"，表明你有自己鲜明的优势，同时各方面发展较为平衡。`);
        lines.push(`建议在保持 ${dominant} 优势的同时，适当补足 ${weak} 的能量，做到攻守兼备、进退有度。`);
      } else {
        lines.push(`当前命盘呈现"${dominant}强${weak}弱"的格局，这种偏向性格鲜明，优势突出。`);
        lines.push(`核心策略：先充分发挥 ${dominant} 的天赋优势，在此基础上有意识地用环境、习惯和选择来补足 ${weak}，让整体运势更加顺畅。`);
      }
      const zeroElements = ELEMENTS.filter(e => counts[e] === 0);
      if (zeroElements.length > 0) {
        lines.push(`特别注意：八字中完全缺少"${zeroElements.join("、")}"，需要通过后天努力重点补足。`);
      }
      return lines.join("\n");
    },
  },
  career: {
    title: "事业发展深度解析",
    template: (dominant, weak) =>
      `${dominant} 是你职场上最大的天赋武器，适合发挥在核心竞争力和个人品牌建设上。\n${weak} 较弱提醒你：在团队协作、资源整合或执行收尾方面需要有意识地补强，可以通过找互补型搭档来弥补。\n事业建议：选择与 ${dominant} 属性匹配的行业，同时有意识地培养 ${weak} 相关的能力，做到扬长补短。`,
  },
  love: {
    title: "情感关系深度解析",
    template: (dominant, weak) =>
      `在感情中你更自然地展现 ${dominant} 的特质——这是你的魅力核心，也决定了你的沟通风格和爱情观。\n${weak} 较弱时，容易在某些维度上缺乏敏感度。建议在表达与倾听之间找到平衡，关系才能走得更远。\n感情建议：找能量互补的伴侣会更加和谐，同时注意在关系中补足 ${weak} 的特质。`,
  },
  wealth: {
    title: "财运节奏深度解析",
    template: (dominant, weak) =>
      `财运格局与你的五行能量密切相关：${dominant} 强说明你擅长用自身优势吸引财富，天赋赚钱能力不错。\n${weak} 弱则提醒在风险控制、储备意识或出手时机上需要更加审慎。\n理财建议：在 ${dominant} 对应的行业求财更顺利，同时用 ${weak} 的能量特质来做风控，两者配合效果最佳。`,
  },
};

/* ===== DOM 节点缓存 ===== */
const form = document.querySelector("#fortune-form");
const fillDemoButton = document.querySelector("#fill-demo");
const emptyState = document.querySelector("#empty-state");
const resultContent = document.querySelector("#result-content");

const titleNode = document.querySelector("#summary-title");
const summaryCopyNode = document.querySelector("#summary-copy");
const dominantNode = document.querySelector("#dominant-pill");
const weakNode = document.querySelector("#weak-pill");
const pillarGrid = document.querySelector("#pillar-grid");
const elementBars = document.querySelector("#element-bars");
const personalityTitle = document.querySelector("#personality-title");
const personalityCopy = document.querySelector("#personality-copy");
const balanceTitle = document.querySelector("#balance-title");
const balanceCopy = document.querySelector("#balance-copy");
const focusTitle = document.querySelector("#focus-title");
const focusCopy = document.querySelector("#focus-copy");

/* 启动检查：确保核心 DOM 节点存在 */
if (!form) {
  console.error("严重错误：找不到 #fortune-form 表单元素！");
}
if (!resultContent) {
  console.error("严重错误：找不到 #result-content 结果容器！");
}

/* ===== 事件绑定 ===== */
if (fillDemoButton) {
  fillDemoButton.addEventListener("click", () => {
    document.querySelector("#name").value = "小满";
    document.querySelector("#gender").value = "female";
    document.querySelector("#birth-date").value = "1998-11-16";
    document.querySelector("#birth-time").value = "09:20";
    document.querySelector("#birthplace").value = "杭州";
    document.querySelector("#focus").value = "overall";
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const name = document.querySelector("#name").value.trim() || "你";
    const gender = document.querySelector("#gender").value;
    const birthDate = document.querySelector("#birth-date").value;
    const birthTime = document.querySelector("#birth-time").value;
    const birthplace = document.querySelector("#birthplace").value.trim();
    const focus = document.querySelector("#focus").value;

    if (!birthDate || !birthTime) {
      window.alert("请先填写完整的出生日期和时刻。");
      return;
    }

    // 兼容不同浏览器日期格式：yyyy-MM-dd / yyyy/MM/dd / dd/MM/yyyy 等
    const dateParts = birthDate.replace(/\//g, "-").split("-").map(Number);
    let year, month, day;
    if (dateParts[0] > 31) {
      // yyyy-MM-dd 格式
      [year, month, day] = dateParts;
    } else if (dateParts[2] > 31) {
      // dd-MM-yyyy 格式
      [day, month, year] = dateParts;
    } else {
      // 默认按 yyyy-MM-dd
      [year, month, day] = dateParts;
    }

    const timeParts = birthTime.replace(/\//g, ":").split(":").map(Number);
    const hour = timeParts[0] || 0;
    const minute = timeParts[1] || 0;

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour)) {
      window.alert("日期或时间格式不正确，请重新输入。\n当前读取到：" + birthDate + " " + birthTime);
      return;
    }

    const birth = new Date(year, month - 1, day, hour, minute, 0);

    if (isNaN(birth.getTime())) {
      window.alert("无法解析日期，请检查输入。\n解析结果：" + year + "年" + month + "月" + day + "日 " + hour + ":" + minute);
      return;
    }

    const result = calculateFortune({ name, gender, birth, focus, birthplace });
    window.__lastResult = result; // 保存结果供占卜使用
    renderResult(result);
  } catch (err) {
    console.error("测算出错：", err);
    window.alert("测算出错：" + err.message + "\n请检查输入信息后重试。");
  }
});

/* ===== 首页占卜模块（独立运行） ===== */
(function initHomeDivination() {
  // 获取当前五行参数：优先用测算结果，否则随机
  function getDivinationParams() {
    const r = window.__lastResult;
    if (r && r.dayElement && r.dominant && r.weak) {
      return { dayElement: r.dayElement, dominant: r.dominant, weak: r.weak, birth: r.birth, hasResult: true };
    }
    // 没有测算结果时，用当天日期生成默认五行
    const today = new Date();
    const seed = today.getFullYear() * 100 + today.getMonth() + today.getDate();
    const dayEl = ELEMENTS[seed % 5];
    const domEl = ELEMENTS[(seed * 3 + 1) % 5];
    let weakEl = ELEMENTS[(seed * 7 + 2) % 5];
    if (weakEl === domEl) weakEl = ELEMENTS[(ELEMENTS.indexOf(domEl) + 2) % 5];
    return { dayElement: dayEl, dominant: domEl, weak: weakEl, birth: today, hasResult: false };
  }

  const drawFortuneBtn = document.querySelector("#draw-fortune-btn");
  const dailyFortuneResult = document.querySelector("#daily-fortune-result");
  const fortuneStickContainer = document.querySelector("#fortune-stick-container");

  if (drawFortuneBtn) {
    drawFortuneBtn.addEventListener("click", () => {
      const params = getDivinationParams();
      if (fortuneStickContainer) fortuneStickContainer.classList.add("shaking");
      drawFortuneBtn.disabled = true;
      drawFortuneBtn.textContent = "摇签中...";

      setTimeout(() => {
        if (fortuneStickContainer) fortuneStickContainer.classList.remove("shaking");
        const fortune = drawDailyFortune(params.dayElement, params.dominant, params.weak);

        const rankClass = fortune.rank.includes("上上") ? "rank-best" : fortune.rank.includes("上签") ? "rank-good" : fortune.rank.includes("中上") ? "rank-mid-good" : fortune.rank.includes("下") ? "rank-bad" : "rank-mid";

        const bazi_note = params.hasResult
          ? `<p><strong>五行解读：</strong>${fortune.elementReading}</p>`
          : `<p class="divination-no-bazi">完成深度测算后，将结合你的八字五行给出专属五行解读</p>`;

        dailyFortuneResult.innerHTML = `
          <div class="fortune-card">
            <div class="fortune-header">
              <span class="fortune-rank ${rankClass}">${fortune.rank}</span>
              <span class="fortune-date">${fortune.drawDate}</span>
            </div>
            <h4 class="fortune-title">第${safeMod(Date.now(), 99) + 1}签 · ${fortune.title}</h4>
            <div class="fortune-poem">${fortune.poem.replace(/\n/g, "<br>")}</div>
            <div class="fortune-divider"></div>
            <div class="fortune-advice">
              <p><strong>签文解读：</strong>${fortune.advice}</p>
              ${bazi_note}
            </div>
          </div>
        `;
        dailyFortuneResult.classList.remove("hidden");
        drawFortuneBtn.textContent = "再摇一签";
        drawFortuneBtn.disabled = false;
      }, 1500);
    });
  }

  const drawTarotBtn = document.querySelector("#draw-tarot-btn");
  const tarotResult = document.querySelector("#tarot-result");

  if (drawTarotBtn) {
    drawTarotBtn.addEventListener("click", () => {
      const params = getDivinationParams();
      drawTarotBtn.disabled = true;
      drawTarotBtn.textContent = "占卜中...";

      const deckDisplay = document.querySelector(".tarot-deck-display");
      if (deckDisplay) deckDisplay.classList.add("flipping");

      setTimeout(() => {
        if (deckDisplay) deckDisplay.classList.remove("flipping");
        const tarot = drawTarot(params.dayElement, params.dominant, params.weak, params.birth);

        let cardsHtml = tarot.drawn.map(d => `
          <div class="tarot-drawn-card ${d.isReversed ? "reversed" : ""} ${d.isElementMatch ? "element-match" : ""}">
            <div class="tarot-card-position">${d.position}</div>
            <div class="tarot-card-face">
              <span class="tarot-emoji">${d.card.emoji}</span>
              <h4>${d.card.name}${d.isReversed ? "（逆位）" : ""}</h4>
            </div>
            <p class="tarot-reading">${d.reading}</p>
            <p class="tarot-element-note">${params.hasResult ? d.elementNote : ""}</p>
          </div>
        `).join("");

        const baziTip = params.hasResult
          ? ""
          : `<p class="divination-no-bazi">完成深度测算后，将结合你的八字五行给出更精准的牌面解读</p>`;

        tarotResult.innerHTML = `
          <div class="tarot-spread">
            ${cardsHtml}
          </div>
          <div class="tarot-overall">
            <h4>综合解读</h4>
            <p>${tarot.overallReading}</p>
            ${baziTip}
            <span class="tarot-date">${tarot.drawDate}</span>
          </div>
        `;
        tarotResult.classList.remove("hidden");
        drawTarotBtn.textContent = "再次占卜";
        drawTarotBtn.disabled = false;
      }, 2000);
    });
  }
})();

/* ===== 核心计算 ===== */
function calculateFortune({ name, gender, birth, focus, birthplace }) {
  const yearPillar = getYearPillar(birth);
  const monthPillar = getMonthPillar(birth, yearPillar.stem);
  const dayPillar = getDayPillar(birth);
  const hourPillar = getHourPillar(birth, dayPillar.stem);

  const pillars = [
    { label: "年柱", meaning: "根基与外在印象", ...yearPillar },
    { label: "月柱", meaning: "成长环境与行动方式", ...monthPillar },
    { label: "日柱", meaning: "核心性格与自我感", ...dayPillar },
    { label: "时柱", meaning: "晚近追求与潜在愿景", ...hourPillar },
  ];

  // 【升级】五行加权计数（替代旧的简单8份计数）
  const weightedCounts = getWeightedElementCounts(pillars);
  // 保留旧的简单计数用于向后兼容
  const counts = ELEMENTS.reduce((acc, el) => { acc[el] = 0; return acc; }, {});
  pillars.forEach((p) => { counts[p.stemElement] += 1; counts[p.branchElement] += 1; });

  const ranked = ELEMENTS.map((el) => ({ element: el, count: weightedCounts[el] }))
    .sort((a, b) => b.count - a.count);
  const dominant = ranked[0].element;
  const weak = ranked[ranked.length - 1].element;
  const balance = Math.round(ranked[0].count - ranked[ranked.length - 1].count);

  // 纳音
  const yearNayinIndex = getGanzhiIndex(yearPillar.stem, yearPillar.branch);
  const dayNayinIndex = getGanzhiIndex(dayPillar.stem, dayPillar.branch);
  const yearNayin = NAYIN_TABLE[yearNayinIndex];
  const dayNayin = NAYIN_TABLE[dayNayinIndex];

  // 【升级】身强身弱判断
  const dayElement = STEM_ELEMENTS[dayPillar.stem];
  const strengthResult = calculateDayMasterStrength(pillars, dayPillar.stem);

  // 【升级】用神取法
  const usefulGod = determineUsefulGod(strengthResult, dayPillar.stem);

  // 【升级】完整十神（含地支藏干）
  const completeTenGods = getCompleteTenGods(pillars, dayPillar.stem);

  // 旧十神保留向后兼容
  const tenGods = [
    { pillar: "年柱", stem: yearPillar.stem, god: getTenGod(dayPillar.stem, yearPillar.stem) },
    { pillar: "月柱", stem: monthPillar.stem, god: getTenGod(dayPillar.stem, monthPillar.stem) },
    { pillar: "时柱", stem: hourPillar.stem, god: getTenGod(dayPillar.stem, hourPillar.stem) },
  ];

  // 【升级】十神深度分析
  const tenGodAnalysis = generateTenGodAnalysis({
    completeTenGods, tenGods, pillars, dayStem: dayPillar.stem, gender, strengthResult, usefulGod,
  });

  // 【升级】格局判断
  const pattern = determinePattern(pillars, dayPillar.stem, strengthResult, completeTenGods);

  // 【升级】合冲刑害分析
  const interactions = analyzeInteractions(pillars);

  // 【升级】神煞系统
  const shensha = analyzeShensha(pillars, dayPillar.stem);

  // 【升级】空亡分析
  const kongwang = analyzeKongWang(pillars);

  // 【升级】称骨算命
  const chenggu = calculateChenggu(pillars, birth, gender);

  // 【升级】婚姻分析
  const marriage = analyzeMarriage(pillars, dayPillar.stem, gender, strengthResult);

  // 【升级】健康诊断
  const health = analyzeHealth(weightedCounts, usefulGod);

  // 五行生克分析
  const wuxingRelations = {
    generates: ELEMENT_GENERATE[dayElement],
    overcomes: ELEMENT_OVERCOME[dayElement],
    generatedBy: ELEMENT_GENERATED_BY[dayElement],
    overcomeBy: ELEMENT_OVERCOME_BY[dayElement],
  };

  // 流年分析
  const currentYear = new Date().getFullYear();
  const yearlyFocusYear = Math.min(Math.max(currentYear, YEARLY_RANGE_START), YEARLY_RANGE_END);
  const yearlyBadgeText = currentYear < YEARLY_RANGE_START ? "起始" : currentYear > YEARLY_RANGE_END ? "最近" : "当前";
  const yearlyFortunes = [];
  for (let y = YEARLY_RANGE_START; y <= YEARLY_RANGE_END; y++) {
    const yPillar = getYearPillarByYear(y);
    const yElement = STEM_ELEMENTS[yPillar.stem];
    const influence = YEARLY_ELEMENT_INFLUENCE[dayElement]?.[yElement] || { score: 65, desc: "平稳过渡之年" };
    const wealthInfluence = YEARLY_WEALTH_INFLUENCE[dayElement]?.[yElement] || { score: 60, desc: "财运平稳" };
    const careerInfluence = YEARLY_CAREER_INFLUENCE[dayElement]?.[yElement] || { score: 65, desc: "事业平稳" };
    const yNayinIdx = getGanzhiIndex(yPillar.stem, yPillar.branch);
    yearlyFortunes.push({
      year: y, stem: yPillar.stem, branch: yPillar.branch, element: yElement, nayin: NAYIN_TABLE[yNayinIdx],
      score: influence.score, desc: influence.desc, wealthScore: wealthInfluence.score, wealthDesc: wealthInfluence.desc,
      careerScore: careerInfluence.score, careerDesc: careerInfluence.desc,
      god: getTenGod(dayPillar.stem, yPillar.stem), isCurrent: y === yearlyFocusYear,
    });
  }

  // 流月分析
  const monthlyFortunes = [];
  const monthNames = ["寅月·立春", "卯月·惊蛰", "辰月·清明", "巳月·立夏", "午月·芒种", "未月·小暑",
    "申月·立秋", "酉月·白露", "戌月·寒露", "亥月·立冬", "子月·大雪", "丑月·小寒"];
  const currentYearPillar = getYearPillarByYear(currentYear);
  for (let m = 0; m < 12; m++) {
    const mStem = getMonthStem(currentYearPillar.stem, m);
    const mBranch = BRANCHES[(2 + m) % 12];
    const god = getTenGod(dayPillar.stem, mStem);
    const info = MONTHLY_KEYWORDS[god] || { keyword: "平稳", advice: "顺其自然，保持平常心" };
    monthlyFortunes.push({ month: m + 1, name: monthNames[m], stem: mStem, branch: mBranch, element: STEM_ELEMENTS[mStem], god, keyword: info.keyword, advice: info.advice });
  }

  // 出生地分析
  const regionInfo = matchBirthplace(birthplace);
  let birthplaceAnalysis = null;
  if (regionInfo) birthplaceAnalysis = analyzeBirthplaceInfluence(regionInfo, dayElement, dominant, weak, counts);

  // 【升级】总览文案
  const birthTimeStr = `${birth.getFullYear()}年${birth.getMonth() + 1}月${birth.getDate()}日${birth.getHours()}时`;
  const zodiacMap = { 子: "鼠", 丑: "牛", 寅: "虎", 卯: "兔", 辰: "龙", 巳: "蛇", 午: "马", 未: "羊", 申: "猴", 酉: "鸡", 戌: "狗", 亥: "猪" };
  const zodiac = zodiacMap[yearPillar.branch] || "";

  let summaryCopy = `${name}，${birthTimeStr}生人，属${zodiac}，日主${dayPillar.stem}${dayPillar.branch}（${dayElement}），纳音"${dayNayin}"——${NAYIN_DESCRIPTIONS[dayNayin] || ""}。`;
  summaryCopy += `\n\n【身强身弱】日主${strengthResult.label}（${strengthResult.strengthScore}分），${strengthResult.monthStatus}。${strengthResult.desc}`;
  summaryCopy += `\n【用神】${usefulGod.strategy}——喜${usefulGod.likeElements.join("、")}，忌${usefulGod.dislikeElements.join("、")}。`;
  summaryCopy += `\n【格局】${pattern.mainPattern.name}——${pattern.mainPattern.desc}`;
  if (pattern.hasSpecial) summaryCopy += `，兼有${pattern.specialPatterns.map(s => s.name).join("、")}`;
  summaryCopy += `。`;
  if (shensha.length > 0) summaryCopy += `\n【神煞】命带${shensha.map(s => s.name).join("、")}。`;
  if (birthplaceAnalysis) summaryCopy += `\n出生于${regionInfo.city}（${regionInfo.element}），地域气场${birthplaceAnalysis.harmonyLabel}。`;

  const summaryTitle = `${name}的命盘深度解析`;
  const focusSection = FOCUS_GUIDE[focus] || FOCUS_GUIDE.overall;
  const profile = DOMINANT_PROFILE[dominant];
  const weakAdvice = WEAK_ELEMENT_ADVICE[weak];

  // 【新增】综合命格总评（多段落深度评语）
  const overallConclusion = generateOverallConclusion({
    name, gender, zodiac, dayElement, dominant, weak, balance,
    strengthResult, usefulGod, pattern, shensha, interactions,
    marriage, birthplaceAnalysis, regionInfo, profile,
    weightedCounts, yearlyFortunes, currentYear: new Date().getFullYear(),
  });

  // 【新增】五行分布文字总结
  const elementSummary = generateElementSummary({
    weightedCounts, dominant, weak, dayElement, strengthResult, usefulGod,
  });
  const ziwei = calculateZiwei(birth);

  return {
    name, birth, gender, birthplace, birthplaceAnalysis, regionInfo,
    pillars, counts, weightedCounts, dominant, weak, balance, dayElement,
    dayStem: dayPillar.stem, dayBranch: dayPillar.branch, yearNayin, dayNayin,
    summaryTitle, summaryCopy, overallConclusion, elementSummary,
    // 新增数据
    strengthResult, usefulGod, completeTenGods, tenGodAnalysis, pattern, interactions,
    shensha, kongwang, marriage, health,
    // 兼容旧数据
    personality: profile,
    balanceTitle: `${weak}元素补足方案`,
    balanceCopy: weakAdvice.brief + "\n" + weakAdvice.detail,
    focusTitle: focusSection.title,
    focusCopy: focusSection.template(dominant, weak, balance, counts),
    tenGods, wuxingRelations, yearlyFortunes, yearlyBadgeText, monthlyFortunes, currentYear, ziwei, zodiac,
  };
}

/* ===== 渲染结果 ===== */
function renderResult(result) {
  try {
    if (emptyState) emptyState.classList.add("hidden");
    if (resultContent) resultContent.classList.remove("hidden");

    if (titleNode) titleNode.textContent = result.summaryTitle;
    if (summaryCopyNode) summaryCopyNode.textContent = result.summaryCopy;
    if (dominantNode) dominantNode.textContent = `主导：${result.dominant}`;
    if (weakNode) weakNode.textContent = `待补：${result.weak}`;

    // 【新增】综合命格总评
    const overallConclusionNode = document.querySelector("#overall-conclusion");
    if (overallConclusionNode && result.overallConclusion) {
      overallConclusionNode.innerHTML = result.overallConclusion.map(section => `
        <div class="conclusion-block">
          <h4 class="conclusion-heading">${section.heading}</h4>
          <p class="conclusion-text">${section.text}</p>
        </div>
      `).join("");
    }

    if (personalityTitle) personalityTitle.textContent = result.personality.title;
    if (personalityCopy) personalityCopy.textContent = result.personality.copy;
    if (balanceTitle) balanceTitle.textContent = result.balanceTitle;
    if (balanceCopy) balanceCopy.textContent = result.balanceCopy;
    if (focusTitle) focusTitle.textContent = result.focusTitle;
    if (focusCopy) focusCopy.textContent = result.focusCopy;

  // 四柱
  if (pillarGrid) {
    pillarGrid.innerHTML = result.pillars.map((p) => `
      <article class="pillar-card">
        <h4>${p.label} · ${p.meaning}</h4>
        <div class="pillar-symbol">
          <strong>${p.stem}${p.branch}</strong>
          <span>${p.stemElement} / ${p.branchElement}</span>
        </div>
        <div class="pillar-tags">
          <span class="pillar-tag">天干：${p.stem}（${p.stemElement}）</span>
          <span class="pillar-tag">地支：${p.branch}（${p.branchElement}）</span>
        </div>
      </article>
    `).join("");
  }

  // 五行分布（使用加权数据）
  if (elementBars) {
    const maxW = Math.max(...ELEMENTS.map(el => result.weightedCounts[el]));
    elementBars.innerHTML = ELEMENTS.map((el) => {
      const wScore = Math.round(result.weightedCounts[el]);
      const [fillStart, fillEnd] = ELEMENT_STYLES[el];
      const width = `${Math.max((wScore / (maxW || 1)) * 100, 8)}%`;
      const tag = el === result.dominant ? " ▲" : el === result.weak ? " ▽" : "";
      return `
        <div class="element-row">
          <span class="element-label">${el}${tag}</span>
          <div class="element-track">
            <div class="element-fill" style="--fill-width: ${width}; --fill-start: ${fillStart}; --fill-end: ${fillEnd};"></div>
          </div>
          <span class="element-count">${wScore}分</span>
        </div>`;
    }).join("");
  }

  // 【新增】五行分布文字总结
  const elementSummaryNode = document.querySelector("#element-summary");
  if (elementSummaryNode && result.elementSummary) {
    elementSummaryNode.innerHTML = `
      <div class="element-summary-content">
        ${result.elementSummary.map(item => `
          <div class="element-summary-item ${item.type}">
            <span class="es-icon">${item.icon}</span>
            <span class="es-text">${item.text}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 纳音显示
  const nayinSection = document.querySelector("#nayin-section");
  if (nayinSection) {
    nayinSection.innerHTML = `
      <div class="nayin-cards">
        <div class="nayin-card">
          <span class="nayin-label">年柱纳音</span>
          <span class="nayin-value">${result.yearNayin}</span>
          <p class="nayin-desc">${NAYIN_DESCRIPTIONS[result.yearNayin] || ""}</p>
        </div>
        <div class="nayin-card">
          <span class="nayin-label">日柱纳音</span>
          <span class="nayin-value">${result.dayNayin}</span>
          <p class="nayin-desc">${NAYIN_DESCRIPTIONS[result.dayNayin] || ""}</p>
        </div>
      </div>
    `;
  }

  // 【新增】身强身弱
  const strengthSection = document.querySelector("#strength-section");
  if (strengthSection && result.strengthResult) {
    const s = result.strengthResult;
    const pct = s.strengthScore;
    const barColor = pct >= 50 ? "var(--accent-primary, #6366f1)" : "var(--accent-secondary, #f59e0b)";
    strengthSection.innerHTML = `
      <div class="strength-card">
        <div class="strength-meter">
          <div class="strength-labels"><span>从弱</span><span>均衡</span><span>从强</span></div>
          <div class="strength-track"><div class="strength-fill" style="width:${pct}%;background:${barColor}"></div><div class="strength-pointer" style="left:${pct}%"><span class="strength-score">${pct}</span></div></div>
        </div>
        <div class="strength-info">
          <div class="strength-badge ${s.isStrong ? 'strong' : 'weak'}">${s.label}</div>
          <span class="strength-month">${s.monthStatus}</span>
        </div>
        <p class="strength-desc">${s.desc}</p>
        <div class="strength-detail"><span>帮扶力量 ${s.helpScore}分</span><span>耗泄力量 ${s.drainScore}分</span></div>
        <div class="module-conclusion"><p>${s.conclusion}</p></div>
      </div>`;
  }

  // 【新增】用神取法
  const usegodSection = document.querySelector("#usegod-section");
  if (usegodSection && result.usefulGod) {
    const u = result.usefulGod;
    usegodSection.innerHTML = `
      <div class="usegod-card">
        <div class="usegod-header">
          <div class="usegod-main"><span class="usegod-label">用神</span><span class="usegod-value">${u.useGod}（${u.useGodElement}）</span></div>
          <div class="usegod-strategy">${u.strategy}</div>
        </div>
        <p class="usegod-desc">${u.useGodDesc}</p>
        <div class="usegod-elements">
          <div class="usegod-like"><strong>喜：</strong>${u.likeElements.map(e=>`<span class="el-tag like">${e}</span>`).join("")}</div>
          <div class="usegod-dislike"><strong>忌：</strong>${u.dislikeElements.map(e=>`<span class="el-tag dislike">${e}</span>`).join("")}</div>
        </div>
        <div class="module-conclusion"><p>${u.advice}</p></div>
      </div>`;
  }

  // 【新增】合冲刑害
  const interactionSection = document.querySelector("#interaction-section");
  if (interactionSection && result.interactions) {
    const it = result.interactions;
    let items = "";
    if (it.stemCombines.length) items += it.stemCombines.map(c => `<div class="ix-item combine"><span class="ix-icon">🤝</span><span class="ix-pair">${c.pair}</span><span class="ix-name">${c.name}→化${c.result}</span></div>`).join("");
    if (it.stemClashes.length) items += it.stemClashes.map(c => `<div class="ix-item clash"><span class="ix-icon">⚡</span><span class="ix-pair">${c.pair}</span><span class="ix-name">${c.desc}</span></div>`).join("");
    if (it.branchCombines.length) items += it.branchCombines.map(c => `<div class="ix-item combine"><span class="ix-icon">💫</span><span class="ix-pair">${c.pair}</span><span class="ix-name">${c.name}</span></div>`).join("");
    if (it.branchThreeCombines.length) items += it.branchThreeCombines.map(c => `<div class="ix-item three-combine"><span class="ix-icon">🔮</span><span class="ix-name">${c.label}：${c.name}</span></div>`).join("");
    if (it.branchThreeMeets.length) items += it.branchThreeMeets.map(c => `<div class="ix-item three-meet"><span class="ix-icon">🌐</span><span class="ix-name">${c.name}</span></div>`).join("");
    if (it.branchClashes.length) items += it.branchClashes.map(c => `<div class="ix-item clash"><span class="ix-icon">💥</span><span class="ix-pair">${c.pair}</span><span class="ix-name">${c.name}</span></div>`).join("");
    if (it.branchPunishes.length) items += it.branchPunishes.map(p => `<div class="ix-item punish"><span class="ix-icon">⚠️</span><span class="ix-name">${p.name}</span><span class="ix-desc">${p.desc}</span></div>`).join("");
    if (it.branchHarms.length) items += it.branchHarms.map(h => `<div class="ix-item harm"><span class="ix-icon">🔻</span><span class="ix-pair">${h.pair}</span><span class="ix-name">${h.name}</span></div>`).join("");
    if (!items) items = `<div class="ix-item none"><span class="ix-icon">✅</span><span class="ix-name">四柱无明显合冲刑害</span></div>`;
    let summaryHtml = it.summary.length ? `<div class="ix-summary">${it.summary.join("。")}。</div>` : "";
    interactionSection.innerHTML = `<div class="ix-grid">${items}</div>${summaryHtml}`;
  }

  // 【新增】格局判断
  const patternSection = document.querySelector("#pattern-section");
  if (patternSection && result.pattern) {
    const pt = result.pattern;
    let specialsHtml = "";
    if (pt.hasSpecial) specialsHtml = `<div class="pattern-specials"><h4>特殊格局</h4>${pt.specialPatterns.map(s => `<div class="pattern-sp-item"><span class="pattern-sp-name">${s.name}</span><span class="pattern-sp-desc">${s.desc}</span></div>`).join("")}</div>`;
    patternSection.innerHTML = `
      <div class="pattern-card">
        <div class="pattern-main">
          <div class="pattern-name">${pt.mainPattern.name}</div>
          <div class="pattern-god">月令本气十神：${pt.monthMainGod}</div>
        </div>
        <p class="pattern-brief">${pt.mainPattern.brief}</p>
        <p class="pattern-desc">${pt.mainPattern.desc}</p>
        ${specialsHtml}
        <div class="module-conclusion"><p>${pt.patternConclusion}</p></div>
      </div>`;
  }

  // 称骨算命已移除展示
  // const chengguSection = document.querySelector("#chenggu-section");

  // 【新增】神煞系统
  const shenshaSection = document.querySelector("#shensha-section");
  if (shenshaSection && result.shensha) {
    const ss = result.shensha;
    if (ss.length > 0) {
      shenshaSection.innerHTML = `<div class="shensha-grid">${ss.map(s => `
        <div class="shensha-badge ${s.type}">
          <span class="shensha-icon">${s.icon}</span>
          <span class="shensha-name">${s.name}</span>
          <span class="shensha-type">${s.type}</span>
          <p class="shensha-desc">${s.desc}</p>
        </div>`).join("")}</div>`;
    } else {
      shenshaSection.innerHTML = `<div class="shensha-empty">四柱未见明显神煞</div>`;
    }
  }

  // 【新增】空亡分析
  const kongwangSection = document.querySelector("#kongwang-section");
  if (kongwangSection && result.kongwang) {
    const kw = result.kongwang;
    let posHtml = "";
    if (kw.hasKongWang) {
      posHtml = kw.kongPositions.map(k => `<div class="kw-pos"><span class="kw-pillar">${k.pillar}</span><span class="kw-branch">${k.branch}</span><span class="kw-meaning">${k.meaning}</span></div>`).join("");
    }
    kongwangSection.innerHTML = `
      <div class="kongwang-card">
        <div class="kw-header"><span class="kw-label">空亡</span><span class="kw-value">${kw.kongWang.join("、")}</span></div>
        ${posHtml ? `<div class="kw-positions">${posHtml}</div>` : ""}
        <p class="kw-desc">${kw.desc}</p>
      </div>`;
  }

  // 【新增】婚姻分析
  const marriageSection = document.querySelector("#marriage-section");
  if (marriageSection && result.marriage) {
    const mg = result.marriage;
    const scoreColor = mg.score >= 75 ? "#22c55e" : mg.score >= 55 ? "#f59e0b" : "#ef4444";
    marriageSection.innerHTML = `
      <div class="marriage-card">
        <div class="marriage-header">
          <div class="marriage-score-circle" style="--score-color:${scoreColor}">
            <span class="marriage-score-num">${mg.score}</span>
            <span class="marriage-score-label">分</span>
          </div>
          <div class="marriage-rating">${mg.rating}</div>
        </div>
        <div class="marriage-factors">${mg.factors.map(f => `<div class="marriage-factor"><span class="mf-dot"></span>${f}</div>`).join("")}</div>
        <div class="module-conclusion"><p>${mg.conclusion}</p></div>
      </div>`;
  }

  // 【新增】健康诊断
  const healthSection = document.querySelector("#health-section");
  if (healthSection && result.health) {
    const hl = result.health;
    if (hl.warnings.length > 0) {
      healthSection.innerHTML = `<div class="health-warnings">${hl.warnings.map(w => `
        <div class="health-warn-item">
          <div class="hw-header"><span class="hw-element">${w.element}</span><span class="hw-organ">${w.organ}</span></div>
          <p class="hw-desc">${w.desc}</p>
          <p class="hw-illness">注意：${w.illness}</p>
          <p class="hw-nurture">${w.nurture}</p>
        </div>`).join("")}</div>
        <div class="module-conclusion"><p>${hl.summary}</p></div>`;
    } else {
      healthSection.innerHTML = `<div class="health-good"><span>✅</span> ${hl.summary}</div>`;
    }
  }

  // 十神分析（升级版）
  const tenGodSection = document.querySelector("#tengod-section");
  if (tenGodSection && result.tenGodAnalysis) {
    const tga = result.tenGodAnalysis;
    const elStyles = ELEMENT_STYLES;

    // ① 四柱十神明细表
    const pillarTableHTML = tga.pillarDetails.map(pd => {
      const stemGodInfo = pd.stemGod ? (TEN_GOD_MEANINGS[pd.stemGod] || {}) : {};
      return `
        <div class="tga-pillar-card${pd.isDayPillar ? " tga-day-pillar" : ""}">
          <div class="tga-pillar-head">
            <span class="tga-pillar-name">${pd.name}</span>
            <span class="tga-ganzhi" style="color:${elStyles[pd.stemElement]?.[0] || "var(--text-primary)"}">${pd.stem}</span><span class="tga-ganzhi" style="color:${elStyles[pd.branchElement]?.[0] || "var(--text-primary)"}">${pd.branch}</span>
          </div>
          ${pd.isDayPillar ? `<div class="tga-stem-god tga-day-master"><span class="tga-god-badge">日主</span><span class="tga-god-meaning">命主本人 · ${pd.stemElement}</span></div>` : `
          <div class="tga-stem-god">
            <span class="tga-god-badge ${stemGodInfo.icon ? "" : "no-icon"}">${stemGodInfo.icon || ""} ${pd.stemGod}</span>
            <span class="tga-god-brief">${stemGodInfo.brief || ""}</span>
          </div>
          ${pd.stemMeaning ? `<p class="tga-pillar-meaning"><span class="tga-tag">${pd.stemMeaning.tag}</span>${pd.stemMeaning.meaning}</p>` : ""}
          `}
          <div class="tga-hidden-gods">
            ${pd.hiddenGods.map(hg => {
              const hInfo = TEN_GOD_MEANINGS[hg.god] || {};
              return `
                <div class="tga-hidden-item">
                  <span class="tga-hidden-label">${hg.label}</span>
                  <span class="tga-hidden-stem" style="color:${elStyles[hg.element]?.[0] || "var(--text-primary)"}">${hg.stem}(${hg.element})</span>
                  <span class="tga-hidden-god">${hg.god}</span>
                  ${hg.meaning ? `<span class="tga-hidden-meaning">${hg.meaning.tag}</span>` : ""}
                </div>`;
            }).join("")}
          </div>
        </div>`;
    }).join("");

    // ② 十神能量分布（五类柱状图）
    const maxCatPct = Math.max(...tga.catDistribution.map(c => c.pct), 1);
    const catBarsHTML = tga.catDistribution.map(c => {
      const barW = Math.max((c.pct / maxCatPct) * 100, 4);
      const catColors = { 比劫: "#e8a87c", 食伤: "#7ec8e3", 财星: "#f0c75e", 官杀: "#c49bbb", 印星: "#82c99a" };
      const color = catColors[c.cat] || "var(--accent)";
      return `
        <div class="tga-cat-row">
          <div class="tga-cat-label">${c.info.icon} ${c.cat}</div>
          <div class="tga-cat-bar-wrap">
            <div class="tga-cat-bar" style="width:${barW}%;background:${color}"></div>
          </div>
          <div class="tga-cat-pct">${c.pct}%</div>
        </div>`;
    }).join("");

    // 能量分布文字分析
    const catAnalysisItems = [];
    const topCat = tga.catDistribution[0];
    const btmCat = tga.catDistribution[tga.catDistribution.length - 1];
    if (topCat.pct >= 35) {
      catAnalysisItems.push({ type: "info", icon: topCat.info.icon, text: `${topCat.cat}（${topCat.pct}%）占主导地位：${topCat.info.desc}` });
    }
    if (btmCat.pct <= 8) {
      catAnalysisItems.push({ type: "warn", icon: "⚠️", text: `${btmCat.cat}（${btmCat.pct}%）严重不足：${btmCat.info.desc.split("；")[1]?.replace("过旺则", "不足则") || "需要后天补足。"}` });
    }
    if (tga.absentGods.length > 0) {
      catAnalysisItems.push({ type: "warn", icon: "🔍", text: `命局缺少${tga.absentGods.join("、")}，相关领域的能量需通过大运流年来激活。` });
    }
    const catAnalysisHTML = catAnalysisItems.length > 0 ? `
      <div class="tga-cat-analysis">
        ${catAnalysisItems.map(item => `
          <div class="tga-cat-analysis-item ${item.type}">
            <span class="tga-cai-icon">${item.icon}</span>
            <span class="tga-cai-text">${item.text}</span>
          </div>`).join("")}
      </div>` : "";

    // ③ 十神组合解读
    let combosHTML = "";
    if (tga.detectedCombos.length > 0) {
      combosHTML = `
        <div class="tga-combos">
          <h4 class="tga-sub-title">⚡ 十神组合</h4>
          <div class="tga-combo-grid">
            ${tga.detectedCombos.map(c => `
              <div class="tga-combo-card ${c.quality === "吉" ? "combo-good" : "combo-bad"}">
                <div class="tga-combo-head">
                  <span class="tga-combo-name">${c.name}</span>
                  <span class="tga-combo-quality ${c.quality === "吉" ? "q-good" : "q-bad"}">${c.quality}</span>
                </div>
                <p class="tga-combo-desc">${c.desc}</p>
              </div>`).join("")}
          </div>
        </div>`;
    }

    // ④ 综合总评
    const conclusionHTML = `
      <div class="tga-conclusion">
        <h4 class="tga-sub-title">📝 十神总评</h4>
        <p class="tga-conclusion-text">${tga.conclusion}</p>
      </div>`;

    // 组装完整 HTML
    tenGodSection.innerHTML = `
      <div class="tga-wrapper">
        <h4 class="tga-sub-title">📋 四柱十神明细</h4>
        <p class="tga-sub-desc">天干为外在表现，地支藏干为内在潜能。日柱天干为日主本身。</p>
        <div class="tga-pillar-grid">${pillarTableHTML}</div>

        <h4 class="tga-sub-title">📊 十神能量分布</h4>
        <p class="tga-sub-desc">十神归为比劫、食伤、财星、官杀、印星五大类，反映命格核心特质。</p>
        <div class="tga-cat-bars">${catBarsHTML}</div>
        ${catAnalysisHTML}

        ${combosHTML}
        ${conclusionHTML}
      </div>`;
  }

  // 五行生克
  const wuxingSection = document.querySelector("#wuxing-relation-section");

  // 出生地风水渲染
  const birthplaceSectionWrap = document.querySelector("#birthplace-section-wrap");
  const birthplaceSection = document.querySelector("#birthplace-section");
  if (birthplaceSection && birthplaceSectionWrap && result.birthplaceAnalysis && result.regionInfo) {
    try {
      const bp = result.birthplaceAnalysis;
      const ri = result.regionInfo;
      birthplaceSectionWrap.classList.remove("hidden");
      const harmonyColor = bp.harmony >= 2 ? "#75e0a7" : bp.harmony >= 1 ? "#a8d8ff" : bp.harmony >= 0 ? "#f4c978" : "#ff9b6f";
      birthplaceSection.innerHTML = `
        <div class="birthplace-card">
          <div class="birthplace-header">
            <div class="birthplace-city">
              <div>
                <h4>${ri.city}</h4>
                <span class="birthplace-terrain">${ri.direction} · ${ri.terrain}</span>
              </div>
            </div>
            <div class="birthplace-element-badge" style="--bp-color: ${ELEMENT_STYLES[ri.element][0]}">
              ${ri.element}
            </div>
          </div>
          <p class="birthplace-desc">${ri.desc}</p>
          <div class="birthplace-feature">
            <span>${ri.feature}</span>
          </div>
          <div class="birthplace-grid">
            <div class="birthplace-stat">
              <span class="stat-label">地域五行</span>
              <span class="stat-value" style="color: ${ELEMENT_STYLES[ri.element][0]}">${ri.element}</span>
            </div>
            <div class="birthplace-stat">
              <span class="stat-label">与日主关系</span>
              <span class="stat-value">${bp.relation}</span>
            </div>
            <div class="birthplace-stat">
              <span class="stat-label">和谐度</span>
              <span class="stat-value" style="color: ${harmonyColor}">${bp.harmonyLabel}</span>
            </div>
            <div class="birthplace-stat">
              <span class="stat-label">星级评分</span>
              <span class="stat-value">${bp.harmonyStar}</span>
            </div>
          </div>
          ${bp.fillWeak ? `<div class="birthplace-bonus">出生地${ri.element}气恰好补足了你偏弱的${result.weak}元素，天时地利。</div>` : ""}
          <div class="birthplace-analysis">
            <h5>命格影响分析</h5>
            <p>${bp.summary}</p>
          </div>
          <div class="birthplace-analysis">
            <h5>发展方向建议</h5>
            <p>${bp.devAdvice}</p>
          </div>
        </div>
      `;
    } catch (bpErr) {
      console.error("出生地渲染出错：", bpErr);
      if (birthplaceSectionWrap) birthplaceSectionWrap.classList.add("hidden");
    }
  } else if (birthplaceSectionWrap) {
    birthplaceSectionWrap.classList.add("hidden");
  }

  // 紫微斗数渲染
  const ziweiSection = document.querySelector("#ziwei-section");
  if (ziweiSection && result.ziwei) {
    const zw = result.ziwei;
    ziweiSection.innerHTML = `
      <div class="ziwei-summary">
        <p>${zw.summary}</p>
      </div>
      <div class="ziwei-grid">
        ${zw.palaces.map((p) => {
          const mainInfo = ZIWEI_STAR_MEANINGS[p.mainStar] || {};
          const scoreClass = p.score >= 80 ? "score-high" : p.score >= 65 ? "score-mid" : "score-low";
          return `
            <div class="ziwei-card">
              <div class="ziwei-card-header">
                <span class="ziwei-palace-name">${p.name}</span>
                <span class="ziwei-branch">${p.branch}</span>
              </div>
              <div class="ziwei-stars">
                ${p.stars.map(s => {
                  const sInfo = ZIWEI_STAR_MEANINGS[s] || {};
                  const isMain = ZIWEI_STARS["主星"].includes(s);
                  const isSha = ZIWEI_STARS["煞星"].includes(s);
                  return `<span class="ziwei-star ${isMain ? 'star-main' : ''} ${isSha ? 'star-sha' : ''}">${s}</span>`;
                }).join("")}
              </div>
              <div class="ziwei-score-row">
                <div class="ziwei-score-bar">
                  <div class="ziwei-score-fill ${scoreClass}" style="width: ${p.score}%"></div>
                </div>
                <span class="ziwei-score-num">${p.score}</span>
              </div>
              <p class="ziwei-meaning">${p.meaning}</p>
              ${mainInfo.desc ? `<p class="ziwei-star-desc">${p.mainStar}：${mainInfo.desc}</p>` : ''}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
  if (wuxingSection) {
    const r = result.wuxingRelations;
    wuxingSection.innerHTML = `
      <div class="wuxing-relation-grid">
        <div class="wuxing-rel-card rel-self">
          <div class="rel-info">
            <h4>日主五行</h4>
            <p>${result.dayElement}（${result.dayStem}${result.dayBranch}）</p>
          </div>
        </div>
        <div class="wuxing-rel-card rel-generate">
          <div class="rel-info">
            <h4>我生 → ${r.generates}</h4>
            <p>${result.dayElement}生${r.generates}：付出、表达、子女运</p>
          </div>
        </div>
        <div class="wuxing-rel-card rel-overcome">
          <div class="rel-info">
            <h4>我克 → ${r.overcomes}</h4>
            <p>${result.dayElement}克${r.overcomes}：掌控、财运、管理力</p>
          </div>
        </div>
        <div class="wuxing-rel-card rel-generated-by">
          <div class="rel-info">
            <h4>${r.generatedBy} → 生我</h4>
            <p>${r.generatedBy}生${result.dayElement}：庇护、学业、贵人</p>
          </div>
        </div>
        <div class="wuxing-rel-card rel-overcome-by">
          <div class="rel-info">
            <h4>${r.overcomeBy} → 克我</h4>
            <p>${r.overcomeBy}克${result.dayElement}：压力、考验、成长</p>
          </div>
        </div>
      </div>
    `;
  }


  // 流年运势
  const yearlySection = document.querySelector("#yearly-section");
  if (yearlySection) {
    yearlySection.innerHTML = `
      <div class="yearly-timeline">
        ${result.yearlyFortunes.map((yf) => {
          const godInfo = TEN_GOD_MEANINGS[yf.god] || { icon: "" };
          const scoreClass = yf.score >= 80 ? "score-high" : yf.score >= 65 ? "score-mid" : "score-low";
          const wealthClass = yf.wealthScore >= 80 ? "score-high" : yf.wealthScore >= 65 ? "score-mid" : "score-low";
          const careerClass = yf.careerScore >= 80 ? "score-high" : yf.careerScore >= 65 ? "score-mid" : "score-low";
          return `
            <div class="yearly-card ${yf.isCurrent ? 'yearly-current' : ''}">
              <div class="yearly-header">
                <span class="yearly-year">${yf.year}年</span>
                <span class="yearly-gz">${yf.stem}${yf.branch}年</span>
                ${yf.isCurrent ? `<span class="yearly-now-badge">${result.yearlyBadgeText}</span>` : ''}
              </div>
              <div class="yearly-body">
                <div class="yearly-scores-group">
                  <div class="yearly-score-row">
                    <span class="yearly-score-label">综合</span>
                    <div class="yearly-score-bar">
                      <div class="yearly-score-fill ${scoreClass}" style="width: ${yf.score}%"></div>
                    </div>
                    <span class="yearly-score-num">${yf.score}</span>
                  </div>
                  <div class="yearly-score-row">
                    <span class="yearly-score-label">财运</span>
                    <div class="yearly-score-bar">
                      <div class="yearly-score-fill ${wealthClass}" style="width: ${yf.wealthScore}%"></div>
                    </div>
                    <span class="yearly-score-num">${yf.wealthScore}</span>
                  </div>
                  <div class="yearly-score-row">
                    <span class="yearly-score-label">事业</span>
                    <div class="yearly-score-bar">
                      <div class="yearly-score-fill ${careerClass}" style="width: ${yf.careerScore}%"></div>
                    </div>
                    <span class="yearly-score-num">${yf.careerScore}</span>
                  </div>
                </div>
                <div class="yearly-meta">
                  <span class="yearly-element-badge" style="--el-color: ${ELEMENT_STYLES[yf.element][0]}">${yf.element}年</span>
                  <span class="yearly-nayin">${yf.nayin}</span>
                  <span class="yearly-god">${yf.god}</span>
                </div>
                <p class="yearly-desc">${yf.desc}</p>
                <div class="yearly-sub-descs">
                  <p class="yearly-sub-desc"><span class="sub-desc-tag wealth-tag">财</span>${yf.wealthDesc}</p>
                  <p class="yearly-sub-desc"><span class="sub-desc-tag career-tag">业</span>${yf.careerDesc}</p>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // 流月运势
  const monthlySection = document.querySelector("#monthly-section");
  if (monthlySection) {
    monthlySection.innerHTML = `
      <div class="monthly-grid">
        ${result.monthlyFortunes.map((mf) => {
          const godInfo = TEN_GOD_MEANINGS[mf.god] || { icon: "" };
          return `
            <div class="monthly-card">
              <div class="monthly-header">
                <span class="monthly-num">${mf.month}月</span>
                <span class="monthly-name">${mf.name}</span>
              </div>
              <div class="monthly-body">
                <div class="monthly-gz">${mf.stem}${mf.branch}</div>
                <span class="monthly-keyword" style="--el-color: ${ELEMENT_STYLES[mf.element][0]}">${mf.keyword}</span>
                <span class="monthly-god">${mf.god}</span>
                <p class="monthly-advice">${mf.advice}</p>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // 开运指导
  const luckySection = document.querySelector("#lucky-section");
  if (luckySection) {
    const lucky = result.personality.lucky;
    const profile = result.personality;
    let extraCards = "";
    if (result.birthplaceAnalysis && result.regionInfo) {
      extraCards = `
        <div class="lucky-card wide">
          <h4>出生地发展</h4>
          <p>${result.regionInfo.city}属${result.regionInfo.element}，${result.birthplaceAnalysis.devAdvice}</p>
        </div>
      `;
    }
    luckySection.innerHTML = `
      <div class="lucky-grid">
        <div class="lucky-card">
          <h4>开运颜色</h4>
          <p>${lucky.color}</p>
        </div>
        <div class="lucky-card">
          <h4>幸运数字</h4>
          <p>${lucky.number}</p>
        </div>
        <div class="lucky-card">
          <h4>有利方位</h4>
          <p>${lucky.direction}</p>
        </div>
        <div class="lucky-card">
          <h4>旺运季节</h4>
          <p>${lucky.season}</p>
        </div>
        <div class="lucky-card wide">
          <h4>事业方向</h4>
          <p>${profile.career}</p>
        </div>
        <div class="lucky-card wide">
          <h4>健康提醒</h4>
          <p>${profile.health}</p>
        </div>
        ${extraCards}
      </div>
    `;
  }

  // 滚动到结果
  if (resultContent) resultContent.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (renderErr) {
    console.error("渲染结果出错：", renderErr);
    // 即使部分渲染失败，仍然显示结果区域
    if (emptyState) emptyState.classList.add("hidden");
    if (resultContent) resultContent.classList.remove("hidden");
  }
}

/* ===== 每日运势签数据 ===== */
const FORTUNE_STICKS = [
  { rank: "上上签", title: "鹏程万里", poem: "大鹏展翅九天上，风起云涌正当时。\n贵人指路前途明，万事亨通无忧疑。", advice: "今日大吉！适合启动重要项目、签约合作，贵人运极旺。" },
  { rank: "上上签", title: "紫气东来", poem: "紫气东来满庭芳，春风得意马蹄忙。\n天时地利人和备，一朝功成名四方。", advice: "运势极佳，事业财运双收，抓住今日机遇！" },
  { rank: "上签", title: "风调雨顺", poem: "春来花开满园香，和风细雨润心房。\n但行好事莫问果，自有天公来奖赏。", advice: "今日平顺吉祥，适合社交、洽谈，保持积极心态。" },
  { rank: "上签", title: "锦绣前程", poem: "锦绣文章天下知，才高八斗展宏志。\n耐心等待花开日，一飞冲天不需疑。", advice: "学习进修的好时机，脚踏实地终有回报。" },
  { rank: "上签", title: "金玉满堂", poem: "财源广进福星照，金玉满堂乐逍遥。\n勤俭持家添好运，一年更比一年高。", advice: "财运亨通，适合理财投资，但需量力而行。" },
  { rank: "上签", title: "否极泰来", poem: "乌云散尽见天日，否极泰来运自通。\n莫道前路多险阻，柳暗花明又一村。", advice: "困难即将过去，坚持就是胜利，转机已在眼前。" },
  { rank: "中上签", title: "步步高升", poem: "拾级而上步步高，稳扎稳打基石牢。\n虽无一步登天路，积少成多自逍遥。", advice: "稳健前进的一天，不急于求成，循序渐进为佳。" },
  { rank: "中上签", title: "贵人相助", poem: "途中偶遇贵人行，指点迷津豁然明。\n虚心请教多学习，借力使力事必成。", advice: "今日有贵人出现，多与人交流，虚心求教。" },
  { rank: "中签", title: "守正待时", poem: "万物静观皆自得，守正待时运自来。\n急流勇退藏锋芒，蓄势而发非等闲。", advice: "今日宜静不宜动，做好准备等待时机。" },
  { rank: "中签", title: "平安是福", poem: "世间百态看分明，平安二字值千金。\n不羡他人风光事，知足常乐享太平。", advice: "平淡但安稳的一天，珍惜身边人，享受当下。" },
  { rank: "中签", title: "韬光养晦", poem: "深藏不露有乾坤，韬光养晦待时辰。\n莫把锋芒轻示人，一鸣惊人在明朝。", advice: "低调行事，默默积累实力，不宜高调张扬。" },
  { rank: "中签", title: "随遇而安", poem: "水到渠成花自开，随遇而安心自在。\n不必强求天注定，顺势而为福自来。", advice: "顺其自然的一天，不必强求，随缘即安。" },
  { rank: "中下签", title: "雾里看花", poem: "雾里看花花不真，水中望月月非明。\n当局者迷须自醒，退一步来海阔天。", advice: "今日判断力稍弱，重大决定建议推迟，多听他人意见。" },
  { rank: "中下签", title: "逆水行舟", poem: "逆水行舟用力撑，一篙不慎退千寻。\n咬定青山不放松，风雨过后见彩虹。", advice: "会有些阻力和挑战，但只要坚持就能渡过。" },
  { rank: "下签", title: "风雨欲来", poem: "乌云压城城欲摧，风雨欲来雁先回。\n暂且收帆避风浪，待到雨过天自晴。", advice: "今日多有波折，宜守不宜攻，避开冲突和争执。" },
  { rank: "下签", title: "暗潮涌动", poem: "海面平静暗潮涌，表面风光内忧重。\n小心行事防暗箭，安分守己度此关。", advice: "注意防范小人，低调行事，守住本分为上策。" },
];

const ELEMENT_FORTUNE_BONUS = {
  木: { best: [0, 1, 3], good: [4, 5, 7], warn: [14, 15] },
  火: { best: [1, 2, 4], good: [0, 5, 6], warn: [13, 15] },
  土: { best: [2, 4, 6], good: [3, 7, 9], warn: [14, 12] },
  金: { best: [0, 4, 5], good: [6, 7, 8], warn: [13, 15] },
  水: { best: [1, 3, 5], good: [0, 8, 9], warn: [12, 14] },
};

function drawDailyFortune(dayElement, dominant, weak) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const elSeed = ELEMENTS.indexOf(dayElement) * 7 + ELEMENTS.indexOf(dominant) * 3 + ELEMENTS.indexOf(weak);
  const combinedSeed = seed + elSeed;

  const bonus = ELEMENT_FORTUNE_BONUS[dayElement] || ELEMENT_FORTUNE_BONUS["木"];
  const pool = [];

  // 根据五行加权抽签
  bonus.best.forEach(i => { pool.push(i, i, i); });
  bonus.good.forEach(i => { pool.push(i, i); });
  for (let i = 0; i < FORTUNE_STICKS.length; i++) pool.push(i);
  // 弱元素对应的签加权较低
  bonus.warn.forEach(i => { pool.push(i); });

  const idx = pool[safeMod(combinedSeed * 13 + 7, pool.length)];
  const stick = FORTUNE_STICKS[idx];

  // 五行解读
  let elementReading = "";
  if (stick.rank.includes("上上") || stick.rank.includes("上签")) {
    elementReading = `今日${dayElement}气旺盛，与签文吉运共振，${dominant}属性加持下运势更佳。`;
  } else if (stick.rank.includes("中")) {
    elementReading = `今日${dayElement}气平稳，宜用${weak}属性之物调和（${WEAK_ELEMENT_ADVICE[weak]?.brief || "调和身心"}），可提升整体运势。`;
  } else {
    elementReading = `今日${dayElement}气偏弱，建议多接触${ELEMENT_GENERATED_BY[dayElement]}属性的事物来补充能量，化解不利。`;
  }

  return { ...stick, elementReading, drawDate: `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日` };
}

/* ===== 塔罗牌数据 ===== */
const TAROT_MAJOR = [
  { name: "愚者", emoji: "🃏", num: 0, meaning: "新的开始、无限可能、自由冒险", reverse: "鲁莽冲动、缺乏计划、盲目乐观", element: "风" },
  { name: "魔术师", emoji: "🎩", num: 1, meaning: "创造力、意志力、新的行动", reverse: "欺骗、犹豫不决、能力不足", element: "水" },
  { name: "女祭司", emoji: "🌙", num: 2, meaning: "直觉、智慧、内在声音", reverse: "忽视直觉、表面思考、秘密暴露", element: "水" },
  { name: "女皇", emoji: "👑", num: 3, meaning: "丰收、滋养、富饶与美", reverse: "匮乏、过度溺爱、创造力阻塞", element: "土" },
  { name: "皇帝", emoji: "🏛️", num: 4, meaning: "权威、秩序、稳定的领导力", reverse: "专制、僵化、失去控制", element: "火" },
  { name: "教皇", emoji: "📿", num: 5, meaning: "传统智慧、精神指引、信仰", reverse: "教条、叛逆、虚伪的权威", element: "土" },
  { name: "恋人", emoji: "💕", num: 6, meaning: "爱情、选择、和谐关系", reverse: "不和谐、错误选择、价值观冲突", element: "风" },
  { name: "战车", emoji: "⚔️", num: 7, meaning: "胜利、决心、克服困难", reverse: "失控、方向不明、受挫", element: "水" },
  { name: "力量", emoji: "🦁", num: 8, meaning: "内在力量、勇气、温柔的坚强", reverse: "软弱、自我怀疑、缺乏信心", element: "火" },
  { name: "隐士", emoji: "🏔️", num: 9, meaning: "内省、独处、寻找内在真理", reverse: "孤僻、逃避、过度封闭", element: "土" },
  { name: "命运之轮", emoji: "🎡", num: 10, meaning: "命运转折、机遇来临、变化", reverse: "厄运、抗拒改变、错失良机", element: "火" },
  { name: "正义", emoji: "⚖️", num: 11, meaning: "公平、因果、做出正确决定", reverse: "不公正、推卸责任、偏见", element: "风" },
  { name: "倒吊人", emoji: "🔮", num: 12, meaning: "牺牲、换位思考、新视角", reverse: "无谓牺牲、固执己见、拖延", element: "水" },
  { name: "死神", emoji: "🦋", num: 13, meaning: "结束与新生、转化、放下过去", reverse: "恐惧变化、停滞不前、拒绝放手", element: "水" },
  { name: "节制", emoji: "☯️", num: 14, meaning: "平衡、耐心、调和", reverse: "失衡、过度、缺乏耐心", element: "火" },
  { name: "恶魔", emoji: "🔗", num: 15, meaning: "诱惑、物质束缚、面对阴影", reverse: "挣脱束缚、觉醒、重获自由", element: "土" },
  { name: "塔", emoji: "⚡", num: 16, meaning: "突变、打破旧局、重建", reverse: "恐惧改变、苦苦支撑、逃避现实", element: "火" },
  { name: "星星", emoji: "⭐", num: 17, meaning: "希望、灵感、心灵治愈", reverse: "失望、缺乏信念、断开连接", element: "风" },
  { name: "月亮", emoji: "🌕", num: 18, meaning: "幻象、直觉、潜意识探索", reverse: "困惑、欺骗、恐惧", element: "水" },
  { name: "太阳", emoji: "☀️", num: 19, meaning: "成功、喜悦、生命力", reverse: "短暂快乐、过度乐观、倦怠", element: "火" },
  { name: "审判", emoji: "📯", num: 20, meaning: "觉醒、重生、更高的召唤", reverse: "自我怀疑、拒绝成长、旧事重提", element: "火" },
  { name: "世界", emoji: "🌍", num: 21, meaning: "完成、圆满、达成目标", reverse: "未完成、半途而废、缺乏收尾", element: "土" },
];

const WUXING_TAROT_MAP = {
  木: "风", 火: "火", 土: "土", 金: "风", 水: "水",
};

function drawTarot(dayElement, dominant, weak, birth) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const birthSeed = birth.getFullYear() + birth.getMonth() * 31 + birth.getDate();
  const elSeed = ELEMENTS.indexOf(dayElement) * 11 + ELEMENTS.indexOf(dominant) * 5;
  const combinedSeed = seed + birthSeed + elSeed;

  const matchElement = WUXING_TAROT_MAP[dayElement] || "火";

  // 抽三张不重复的牌
  const drawn = [];
  const used = new Set();
  const positions = ["过去", "现在", "未来"];

  for (let i = 0; i < 3; i++) {
    let attempt = 0;
    let cardIdx;
    do {
      cardIdx = safeMod(combinedSeed * (i + 1) * 17 + i * 31 + attempt * 13, TAROT_MAJOR.length);
      attempt++;
    } while (used.has(cardIdx) && attempt < 100);
    used.add(cardIdx);

    const card = TAROT_MAJOR[cardIdx];
    const isReversed = safeMod(combinedSeed * (i + 3) * 7, 10) < 3; // 30% 概率逆位
    const isElementMatch = card.element === matchElement;

    // 五行解读
    let elementNote = "";
    if (isElementMatch) {
      elementNote = `此牌属性与你的${dayElement}命格高度共鸣，能量加倍！`;
    } else if (card.element === WUXING_TAROT_MAP[weak]) {
      elementNote = `此牌恰好补足你命格中偏弱的${weak}能量，是难得的调和之牌。`;
    } else {
      elementNote = `此牌带来${card.element}属性的能量，为你的命格增添新的维度。`;
    }

    drawn.push({
      position: positions[i],
      card,
      isReversed,
      isElementMatch,
      elementNote,
      reading: isReversed ? card.reverse : card.meaning,
    });
  }

  // 综合解读
  const upright = drawn.filter(d => !d.isReversed).length;
  let overallReading = "";
  if (upright === 3) {
    overallReading = `三牌全部正位，整体能量流动顺畅。结合你${dominant}旺${weak}弱的格局，当前是稳步前进、积极行动的好时期。`;
  } else if (upright === 2) {
    overallReading = `两正一逆，整体运势偏好但有一处需要注意。结合你的${dayElement}日主，建议在逆位牌所指领域多加留意和调整。`;
  } else if (upright === 1) {
    overallReading = `一正两逆，当前可能面临一些内在挑战。你的${dominant}优势可以帮助你度过这段时期，同时注意补足${weak}方面的能量。`;
  } else {
    overallReading = `三牌均为逆位，提示当前处于能量调整期。不必过于担心，你命格中${dominant}的力量足以支撑，建议多内省、少冲动，等待转机。`;
  }

  return { drawn, overallReading, drawDate: `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日` };
}

/* ===== 干支计算辅助 ===== */
function getYearPillar(date) {
  const yearBoundary = new Date(date.getFullYear(), 1, 4);
  const adjustedYear = date < yearBoundary ? date.getFullYear() - 1 : date.getFullYear();
  const offset = safeMod(adjustedYear - 1984, 60);
  return pillarFromIndex(offset);
}

function getYearPillarByYear(year) {
  const offset = safeMod(year - 1984, 60);
  return pillarFromIndex(offset);
}

function getMonthPillar(date, yearStem) {
  const monthOffset = getSolarMonthOffset(date);
  const firstStemIndex = STEMS.indexOf(getMonthStartStem(yearStem));
  const stemIndex = safeMod(firstStemIndex + monthOffset, 10);
  const branchIndex = safeMod(2 + monthOffset, 12);
  return buildPillar(STEMS[stemIndex], BRANCHES[branchIndex]);
}

function getMonthStartStem(yearStem) {
  const map = {
    甲: "丙", 己: "丙", 乙: "戊", 庚: "戊", 丙: "庚",
    辛: "庚", 丁: "壬", 壬: "壬", 戊: "甲", 癸: "甲",
  };
  return map[yearStem];
}

function getMonthStem(yearStem, monthIndex) {
  const firstStemIndex = STEMS.indexOf(getMonthStartStem(yearStem));
  return STEMS[safeMod(firstStemIndex + monthIndex, 10)];
}

function getDayPillar(date) {
  const baseDate = Date.UTC(1984, 0, 31);
  const targetDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((targetDate - baseDate) / 86400000);
  return pillarFromIndex(diffDays);
}

function getHourPillar(date, dayStem) {
  const branchIndex = getHourBranchIndex(date.getHours());
  const startStemIndexMap = {
    甲: 0, 己: 0, 乙: 2, 庚: 2, 丙: 4,
    辛: 4, 丁: 6, 壬: 6, 戊: 8, 癸: 8,
  };
  const stemIndex = safeMod(startStemIndexMap[dayStem] + branchIndex, 10);
  return buildPillar(STEMS[stemIndex], BRANCHES[branchIndex]);
}

function pillarFromIndex(index) {
  const safeIndex = safeMod(index, 60);
  return buildPillar(STEMS[safeIndex % 10], BRANCHES[safeIndex % 12]);
}

function buildPillar(stem, branch) {
  return {
    stem,
    branch,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
  };
}

function getGanzhiIndex(stem, branch) {
  const sIdx = STEMS.indexOf(stem);
  const bIdx = BRANCHES.indexOf(branch);
  for (let i = 0; i < 60; i++) {
    if (i % 10 === sIdx && i % 12 === bIdx) return i;
  }
  return 0;
}

function getSolarMonthOffset(date) {
  const key = (date.getMonth() + 1) * 100 + date.getDate();
  if (key >= 204 && key < 306) return 0;
  if (key >= 306 && key < 405) return 1;
  if (key >= 405 && key < 506) return 2;
  if (key >= 506 && key < 606) return 3;
  if (key >= 606 && key < 707) return 4;
  if (key >= 707 && key < 808) return 5;
  if (key >= 808 && key < 908) return 6;
  if (key >= 908 && key < 1008) return 7;
  if (key >= 1008 && key < 1107) return 8;
  if (key >= 1107 && key < 1207) return 9;
  if (key >= 1207 || key < 106) return 10;
  return 11;
}

function getHourBranchIndex(hour) {
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

function safeMod(value, base) {
  return ((value % base) + base) % base;
}

/* ================================================================
   AI 问答对话模块 — 接入 CodeBuddy API (OpenAI 兼容格式)
   ================================================================ */

const CHAT_API_KEY = "ck_ffrdj75n2ebk.fw9UhRxUcEvcuTXyyiTt7R59u-ePTSQyQWPmxZGJk6Y";

// CodeBuddy API 端点列表（按优先级尝试）
const API_ENDPOINTS = [
  "https://api.codebuddy.cn/v1/chat/completions",
  "https://copilot.tencent.com/v1/chat/completions",
  "https://api.copilot.tencent.com/v1/chat/completions",
];

let chatHistory = [];
let lastFortuneResult = null;
let currentEndpoint = API_ENDPOINTS[0];

// 保存最新测算结果供 AI 使用
const originalRenderResult = renderResult;
renderResult = function (result) {
  lastFortuneResult = result;
  originalRenderResult(result);
};

// 构建命理上下文
function buildFortuneContext() {
  if (!lastFortuneResult) return "";
  const r = lastFortuneResult;
  const pillarsStr = r.pillars.map(p => `${p.label}:${p.stem}${p.branch}(${p.stemElement}/${p.branchElement})`).join("，");
  const countsStr = ELEMENTS.map(el => `${el}:${r.counts[el]}/8`).join("，");
  const yearlyStr = r.yearlyFortunes.map(yf => `${yf.year}年(${yf.stem}${yf.branch}，${yf.element}年，${yf.god}，${yf.score}分)：${yf.desc}`).join("\n");
  const monthlyStr = r.monthlyFortunes.map(mf => `${mf.month}月(${mf.stem}${mf.branch}，${mf.god})：${mf.keyword}—${mf.advice}`).join("\n");
  
  return `用户"${r.name}"的八字命盘信息：
- 四柱：${pillarsStr}
- 日主：${r.dayStem}${r.dayBranch}（${r.dayElement}）
- 生肖：${r.zodiac || "未知"}
- 出生地：${r.birthplace || "未填写"}${r.regionInfo ? `（五行属${r.regionInfo.element}，${r.regionInfo.desc}）` : ""}
- 年纳音：${r.yearNayin}，日纳音：${r.dayNayin}
- 五行分布：${countsStr}
- 主导五行：${r.dominant}，偏弱五行：${r.weak}，强弱差：${r.balance}
- 十神：${r.tenGods.map(tg => `${tg.pillar}→${tg.god}`).join("，")}
- 性格：${r.personality.title}
- 开运色：${r.personality.lucky.color}，幸运数字：${r.personality.lucky.number}，方位：${r.personality.lucky.direction}
- 适合行业：${r.personality.career}
- 健康提醒：${r.personality.health}${r.birthplaceAnalysis ? `\n- 出生地风水：${r.regionInfo.city}属${r.regionInfo.element}，与日主${r.dayElement}关系为"${r.birthplaceAnalysis.relation}"，和谐度${r.birthplaceAnalysis.harmonyLabel}` : ""}

流年运势（${r.currentYear}-${r.currentYear + 4}）：
${yearlyStr}

流月运势（${r.currentYear}年）：
${monthlyStr}`;
}

// 系统提示词
const SYSTEM_PROMPT = `你是一位精通中国传统命理学的AI大师。你深谙八字（四柱）命理、五行生克、十神关系、纳音五行、流年流月运势等知识。

你的职责：
1. 根据用户的八字命盘数据，给出详细、个性化的命理解读
2. 结合流年流月运势，给出具体的时间节点建议
3. 语言要通俗易懂但不失专业感，像一位亲切的命理老师
4. 回答要具体，给出可操作的建议（比如具体的颜色、方位、时间段等）
5. 适当引用八字中的具体干支来增加说服力
6. 每次回答控制在 200-400 字左右

重要提醒：
- 不要做出健康诊断或投资理财的具体建议
- 保持积极正面的语气，即使遇到不太好的格局也要给出化解方法
- 回答要专业自信，体现命理学的深厚底蕴`;

// DOM
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");
const chatSendBtn = document.querySelector("#chat-send-btn");
const clearChatBtn = document.querySelector("#clear-chat");
const chatSuggestions = document.querySelector("#chat-suggestions");

// 初始化事件
if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;
    sendMessage(msg);
  });
}

if (clearChatBtn) {
  clearChatBtn.addEventListener("click", () => {
    chatHistory = [];
    chatMessages.innerHTML = `
      <div class="chat-welcome">
        <div class="chat-welcome-icon">—</div>
        <p>对话已清空。输入新问题继续提问。</p>
        <div class="chat-suggestions" id="chat-suggestions">
          <button class="chat-suggest-btn" type="button">我今年的事业运势怎么样？</button>
          <button class="chat-suggest-btn" type="button">我的财运什么时候最好？</button>
          <button class="chat-suggest-btn" type="button">我适合做什么行业？</button>
          <button class="chat-suggest-btn" type="button">我和哪种五行的人最配？</button>
        </div>
      </div>
    `;
    bindSuggestions();
  });
}

function bindSuggestions() {
  document.querySelectorAll(".chat-suggest-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.textContent;
      chatInput.value = text;
      sendMessage(text);
    });
  });
}

// 初始绑定
bindSuggestions();

function appendMessage(role, content) {
  // 移除欢迎信息
  const welcome = chatMessages.querySelector(".chat-welcome");
  if (welcome) welcome.remove();

  const div = document.createElement("div");
  div.className = `chat-msg ${role}`;
  const avatarEmoji = role === "user" ? "U" : "AI";
  div.innerHTML = `
    <div class="chat-avatar">${avatarEmoji}</div>
    <div class="chat-bubble">${escapeHtml(content)}</div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function appendTypingIndicator() {
  const welcome = chatMessages.querySelector(".chat-welcome");
  if (welcome) welcome.remove();

  const div = document.createElement("div");
  div.className = "chat-msg assistant";
  div.id = "typing-msg";
  div.innerHTML = `
    <div class="chat-avatar">AI</div>
    <div class="chat-bubble typing"></div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function sendMessage(userMsg) {
  if (!lastFortuneResult) {
    appendMessage("assistant", "请先在上方完成八字测算，我才能根据你的命盘来回答问题。");
    chatInput.value = "";
    return;
  }

  // 显示用户消息
  appendMessage("user", userMsg);
  chatInput.value = "";
  chatSendBtn.disabled = true;

  // 显示typing
  const typingDiv = appendTypingIndicator();

  // 模拟思考延迟，让体验更自然
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

  // 先尝试 API，失败则用本地回答
  let reply = "";
  try {
    const fortuneContext = buildFortuneContext();
    const messages = [
      { role: "system", content: SYSTEM_PROMPT + "\n\n以下是当前用户的命盘数据：\n" + fortuneContext },
      ...chatHistory,
      { role: "user", content: userMsg },
    ];
    reply = await callAPI(messages);
  } catch (error) {
    console.log("API unavailable, using local reply");
    reply = generateLocalReply(userMsg);
  }

  // 移除typing
  typingDiv.remove();

  // 显示回复
  appendMessage("assistant", reply);

  // 保存历史
  chatHistory.push({ role: "user", content: userMsg });
  chatHistory.push({ role: "assistant", content: reply });

  // 限制历史长度（保留最近10轮）
  if (chatHistory.length > 20) {
    chatHistory = chatHistory.slice(-20);
  }

  chatSendBtn.disabled = false;
  chatInput.focus();
}

async function callAPI(messages) {
  // 尝试多个端点
  let lastError = null;
  
  for (const endpoint of API_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "hunyuan-turbos-latest",
          messages: messages,
          temperature: 0.8,
          max_tokens: 800,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        currentEndpoint = endpoint;
        if (data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        }
        throw new Error("Unexpected response format");
      }
      
      // 如果是认证错误，不再尝试其他端点
      if (response.status === 401 || response.status === 403) {
        throw new Error(`Authentication failed (${response.status})`);
      }
      
      lastError = new Error(`API returned ${response.status}`);
    } catch (err) {
      lastError = err;
      if (err.message.includes("Authentication")) throw err;
      continue;
    }
  }
  
  throw lastError || new Error("All API endpoints failed");
}

// 本地智能回答（API 不可用时的回退）
function generateLocalReply(question) {
  const r = lastFortuneResult;
  if (!r) return "请先完成测算再来提问哦~";

  const q = question.toLowerCase();
  
  // 事业相关
  if (q.includes("事业") || q.includes("工作") || q.includes("职业") || q.includes("行业")) {
    const currentYF = r.yearlyFortunes.find(yf => yf.isCurrent);
    return `根据你的八字，日主${r.dayStem}${r.dayBranch}属${r.dayElement}，${r.personality.title}。

${r.personality.career}

${currentYF ? `结合页面展示的年份区间来看，${currentYF.year}年（${currentYF.stem}${currentYF.branch}年），${currentYF.desc}。` : ""}

从十神来看，${r.tenGods.map(tg => `${tg.pillar}为${tg.god}`).join("，")}，整体格局${r.balance <= 1 ? "比较均衡，适合稳扎稳打" : `偏向${r.dominant}，适合发挥${r.dominant}的优势领域`}。

建议多用${r.personality.lucky.color}系的物品提升气场，${r.personality.lucky.direction}方位对你有利。`;
  }

  // 财运相关
  if (q.includes("财") || q.includes("钱") || q.includes("投资") || q.includes("收入")) {
    const bestYear = r.yearlyFortunes.reduce((best, yf) => yf.score > best.score ? yf : best, r.yearlyFortunes[0]);
    const wealthMonths = r.monthlyFortunes.filter(mf => ["偏财", "正财"].includes(mf.god));
    return `从你的八字来看，${r.dayElement}克${ELEMENT_OVERCOME[r.dayElement]}为财星。

在 2015-2030 这段年份里，${bestYear.year}年运势最佳（${bestYear.score}分），${bestYear.desc}。

${wealthMonths.length > 0 ? `今年的财运月份：${wealthMonths.map(m => `${m.month}月(${m.god})`).join("、")}，这些月份适合关注收入和理财。` : "今年的财运需要稳健经营。"}

开运建议：幸运数字${r.personality.lucky.number}，多穿${r.personality.lucky.color}系衣物，${r.personality.lucky.direction}方位有利于财运。`;
  }

  // 感情相关
  if (q.includes("感情") || q.includes("恋爱") || q.includes("婚姻") || q.includes("配") || q.includes("另一半")) {
    const complement = ELEMENT_GENERATED_BY[r.dayElement];
    return `你的日主为${r.dayElement}，在感情中自然展现${r.dominant}的特质——${DOMINANT_PROFILE[r.dominant].copy.slice(0, 30)}...

五行互补原则：与${complement}属性偏强的人在一起会比较和谐，因为${complement}生${r.dayElement}，能给你带来支持和滋养。

${r.weak}偏弱提醒你在感情中要注意${WEAK_ELEMENT_ADVICE[r.weak].brief.slice(0, 30)}...

${r.personality.lucky.season}是你的旺运季节，社交运也会更好。`;
  }

  // 健康相关
  if (q.includes("健康") || q.includes("身体") || q.includes("养生")) {
    return `从你的八字五行来看，${r.dominant}偏旺、${r.weak}偏弱。

${r.personality.health}

五行调理建议：
- ${WEAK_ELEMENT_ADVICE[r.weak].detail}
- ${r.personality.lucky.season}注意保养对应的脏腑

日常建议：在${r.personality.lucky.direction}方位活动有助于补气，多用${r.personality.lucky.color}系物品。`;
  }

  // 流年相关
  if (q.includes("今年") || q.includes("明年") || q.includes("运势") || q.includes("流年")) {
    const targetYear = q.includes("明年") ? r.currentYear + 1 : r.currentYear;
    const yf = r.yearlyFortunes.find(y => y.year === targetYear);
    if (yf) {
      const godInfo = TEN_GOD_MEANINGS[yf.god] || { detail: "" };
      return `${yf.year}年（${yf.stem}${yf.branch}年），纳音"${yf.nayin}"，五行属${yf.element}。

对你而言，这是${yf.god}之年（${yf.score}分）：${yf.desc}

${yf.god}的含义：${godInfo.detail}

${yf.score >= 80 ? "总体来看这是个不错的年份，要积极把握机会！" : yf.score >= 65 ? "这一年平稳中有机遇，稳中求进是关键。" : "这一年挑战较多，但也是成长的好时机，稳住心态最重要。"}`;
    }
  }

  // 月份相关
  if (q.includes("月") && (q.includes("几") || q.includes("哪") || q.includes("什么时候"))) {
    const bestMonths = r.monthlyFortunes.filter(m => ["食神", "正财", "偏财", "正印"].includes(m.god));
    const challengeMonths = r.monthlyFortunes.filter(m => ["七杀", "劫财"].includes(m.god));
    return `根据你今年的流月运势分析：

较好的月份：${bestMonths.map(m => `${m.month}月(${m.god}·${m.keyword})`).join("、") || "整体平稳"}
需注意的月份：${challengeMonths.map(m => `${m.month}月(${m.god}·${m.keyword})`).join("、") || "无特别需要注意的"}

${bestMonths.length > 0 ? `特别推荐${bestMonths[0].month}月：${bestMonths[0].advice}` : ""}

整体来看，每个月都有其特点，关键是顺势而为，好的月份积极行动，不太好的月份沉淀积累。`;
  }

  // 通用回答
  return `根据你的八字（${r.pillars.map(p => p.stem + p.branch).join(" ")}），日主${r.dayStem}${r.dayBranch}属${r.dayElement}。

你的命盘特点：${r.personality.title}
${r.personality.copy.slice(0, 60)}...

五行格局：${r.dominant}旺${r.weak}弱，${r.balance <= 1 ? "整体较为均衡" : "需要注意补足" + r.weak}。
${WEAK_ELEMENT_ADVICE[r.weak].brief}

开运提示：颜色${r.personality.lucky.color}，数字${r.personality.lucky.number}，方位${r.personality.lucky.direction}。

如果你有更具体的问题，可以问我关于事业、财运、感情、健康或流年月运势等方面的问题。`;
}

/* ================================================================
   支付弹窗交互逻辑
   ================================================================ */

const payOverlay = document.querySelector("#pay-overlay");
const payCloseBtn = document.querySelector("#pay-close-btn");
const openPayBtn = document.querySelector("#open-pay-btn");
const paySubmitBtn = document.querySelector("#pay-submit-btn");
const payBtnText = document.querySelector("#pay-btn-text");

let selectedPrice = 1;

// 打开支付弹窗
if (openPayBtn) {
  openPayBtn.addEventListener("click", () => {
    payOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
}

// 关闭支付弹窗
if (payCloseBtn) {
  payCloseBtn.addEventListener("click", () => {
    payOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  });
}

// 点击遮罩关闭
if (payOverlay) {
  payOverlay.addEventListener("click", (e) => {
    if (e.target === payOverlay) {
      payOverlay.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });
}

// 选择支付套餐
document.querySelectorAll(".pay-plan").forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelectorAll(".pay-plan").forEach(p => p.classList.remove("active"));
    plan.classList.add("active");
    selectedPrice = parseFloat(plan.dataset.price);
    if (payBtnText) {
      payBtnText.textContent = `立即支付 ¥${selectedPrice}`;
    }
  });
});

// 支付后端地址（本地开发）
const PAY_API_BASE = "http://127.0.0.1:3000";

// 判断是否移动设备
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 提交支付 —— 真实接入支付宝
if (paySubmitBtn) {
  paySubmitBtn.addEventListener("click", async () => {
    const payBtn = paySubmitBtn;
    payBtn.disabled = true;
    payBtnText.textContent = "正在创建订单...";

    try {
      const plan = selectedPrice === 1 ? "single" : "annual";
      const device = isMobileDevice() ? "mobile" : "pc";

      const response = await fetch(`${PAY_API_BASE}/api/pay/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, device }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "创建订单失败");
      }

      // 保存订单号用于后续查询
      localStorage.setItem("fortune_last_order", result.data.orderNo);

      payBtnText.textContent = "正在跳转支付宝...";

      // 跳转到支付宝收银台
      window.location.href = result.data.payUrl;

    } catch (err) {
      console.error("支付失败:", err);

      // 如果后端未启动，给出友好提示
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        alert("支付服务未启动！\n\n请先启动支付后端：\n1. cd server\n2. npm install\n3. npm start\n\n并在 server/config.js 中配置支付宝 AppId 和密钥。");
      } else {
        alert("支付失败: " + err.message);
      }

      payBtn.disabled = false;
      payBtnText.textContent = `立即支付 ¥${selectedPrice}`;
    }
  });
}

// 在结果页面添加解锁按钮
function addUnlockBtnToResult() {
  const ziweiSection = document.querySelector("#ziwei-section");
  if (!ziweiSection) return;
  
  // 检查是否已有解锁按钮
  const existingBtn = ziweiSection.querySelector(".ziwei-unlock-btn");
  if (existingBtn) return;
  
  // 在紫微斗数底部添加深度解锁入口
  const unlockDiv = document.createElement("div");
  unlockDiv.className = "ziwei-unlock-area";
  unlockDiv.innerHTML = `
    <div class="ziwei-unlock-card">
      <div class="ziwei-unlock-icon">★</div>
      <h4>解锁更深层紫微命盘解析</h4>
      <p>包含四化飞星、大运流年、十二宫详细批注、化忌化权化科化禄全面分析</p>
      <button class="vip-button ziwei-unlock-btn" type="button" onclick="document.querySelector('#pay-overlay').classList.remove('hidden'); document.body.style.overflow='hidden';">
        解锁完整版 · ¥1 起
      </button>
    </div>
  `;
  ziweiSection.appendChild(unlockDiv);
}

// 覆写 renderResult 以在渲染后添加解锁按钮
const _originalRenderForPay = renderResult;
renderResult = function(result) {
  _originalRenderForPay(result);
  // 延迟一帧确保 DOM 渲染完成
  requestAnimationFrame(() => addUnlockBtnToResult());
};
