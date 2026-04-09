/* ========================================================================
 * 八字核心算法引擎 v2.0
 * 基于《八字教程整理》《子平真诠》《滴天髓》《王德峰讲稿》
 * ======================================================================== */

/* ===== 地支藏干系统 ===== */
const BRANCH_HIDDEN_STEMS = {
  子: [{ stem: "癸", weight: 100 }],
  丑: [{ stem: "己", weight: 60 }, { stem: "癸", weight: 30 }, { stem: "辛", weight: 10 }],
  寅: [{ stem: "甲", weight: 60 }, { stem: "丙", weight: 30 }, { stem: "戊", weight: 10 }],
  卯: [{ stem: "乙", weight: 100 }],
  辰: [{ stem: "戊", weight: 60 }, { stem: "乙", weight: 30 }, { stem: "癸", weight: 10 }],
  巳: [{ stem: "丙", weight: 60 }, { stem: "庚", weight: 30 }, { stem: "戊", weight: 10 }],
  午: [{ stem: "丁", weight: 70 }, { stem: "己", weight: 30 }],
  未: [{ stem: "己", weight: 60 }, { stem: "丁", weight: 30 }, { stem: "乙", weight: 10 }],
  申: [{ stem: "庚", weight: 60 }, { stem: "壬", weight: 30 }, { stem: "戊", weight: 10 }],
  酉: [{ stem: "辛", weight: 100 }],
  戌: [{ stem: "戊", weight: 60 }, { stem: "辛", weight: 30 }, { stem: "丁", weight: 10 }],
  亥: [{ stem: "壬", weight: 70 }, { stem: "甲", weight: 30 }],
};

/* ===== 四柱权重体系 ===== */
const PILLAR_WEIGHTS = {
  yearStem: 8, monthStem: 12, dayStem: 0, hourStem: 12,
  yearBranch: 4, monthBranch: 40, dayBranch: 12, hourBranch: 12,
};

/* ===== 身强身弱判断 ===== */
function calculateDayMasterStrength(pillars, dayStem) {
  const dayEl = STEM_ELEMENTS[dayStem];
  let helpScore = 0, drainScore = 0;
  const positions = [
    { stem: pillars[0].stem, branch: pillars[0].branch, stemW: 8, branchW: 4 },
    { stem: pillars[1].stem, branch: pillars[1].branch, stemW: 12, branchW: 40 },
    { stem: null, branch: pillars[2].branch, stemW: 0, branchW: 12 },
    { stem: pillars[3].stem, branch: pillars[3].branch, stemW: 12, branchW: 12 },
  ];
  positions.forEach(({ stem, branch, stemW, branchW }) => {
    if (stem) {
      const el = STEM_ELEMENTS[stem];
      if (el === dayEl || ELEMENT_GENERATED_BY[dayEl] === el) helpScore += stemW;
      else drainScore += stemW;
    }
    if (branch && BRANCH_HIDDEN_STEMS[branch]) {
      BRANCH_HIDDEN_STEMS[branch].forEach(({ stem: h, weight: w }) => {
        const ratio = w / 100;
        const el = STEM_ELEMENTS[h];
        if (el === dayEl || ELEMENT_GENERATED_BY[dayEl] === el) helpScore += branchW * ratio;
        else drainScore += branchW * ratio;
      });
    }
  });
  const total = helpScore + drainScore;
  const score = total > 0 ? Math.round((helpScore / total) * 100) : 50;
  let level, label, desc, conclusion;
  if (score >= 85) { level = 7; label = "从强"; desc = "日主极旺，宜顺其势，取比劫印星为用"; conclusion = "命主精力充沛、意志坚定，有领袖气质。但过刚则折，须防刚愎自用、不听人言。事业上宜自主创业或担任管理角色，不宜受制于人。财运方面先苦后甜，中年后渐入佳境。"; }
  else if (score >= 70) { level = 6; label = "强"; desc = "日主偏旺，宜用官杀、食伤、财星制衡"; conclusion = "命主性格果断、执行力强，有魄力和主见。适合在竞争性行业发展，能担当重任。但需注意脾气急躁、与人争执的倾向。财运较好，但花销也大，宜节制消费、做好理财。"; }
  else if (score >= 58) { level = 5; label = "偏强"; desc = "日主稍旺，宜适当泄耗，食伤生财为佳"; conclusion = "命主能力出众、自信心强，做事有章法。事业上适合技术、管理或创意类工作。发挥特长可将才华转化为财富。婚姻中需要适度退让，避免过于主导。"; }
  else if (score >= 42) { level = 4; label = "均衡"; desc = "日主中和，五行流通为上，忌冲破平衡"; conclusion = "命主性情平和、适应力强，属于难得的均衡命格。一生少大起大落，福运绵长。事业和生活都较顺遂，关键是保持现状、不要轻易冒险打破平衡。逢大运流年冲破时需特别谨慎。"; }
  else if (score >= 30) { level = 3; label = "偏弱"; desc = "日主稍弱，宜印星帮扶、比劫助力"; conclusion = "命主性格温和、善于合作，但独立决策能力需加强。事业上适合团队协作或依托平台发展，不宜单打独斗。贵人运重要——得贵人相助可事半功倍。财运平稳但不宜投机。"; }
  else if (score >= 15) { level = 2; label = "弱"; desc = "日主偏弱，急需印比帮扶，忌官杀克伐"; conclusion = "命主心思细腻、多愁善感，内心世界丰富。早年可能坎坷较多，需靠自身努力和贵人帮扶渡过难关。事业上宜选择稳定行业，避免高风险投资。中晚年运势渐好，宜养生保身。"; }
  else { level = 1; label = "从弱"; desc = "日主极弱，宜弃命从势，顺克泄之气"; conclusion = "命主性格柔顺、随遇而安，宜顺势而为、不宜强求。事业上适合辅助性角色或自由职业，跟随强者可获益。一生波折较多但逢凶化吉，关键在于放下执念、顺应天时。"; }
  // 月令支持
  const hiddens = BRANCH_HIDDEN_STEMS[pillars[1].branch];
  const mainEl = STEM_ELEMENTS[hiddens[0].stem];
  let monthStatus;
  if (mainEl === dayEl) monthStatus = "得令·旺";
  else if (ELEMENT_GENERATED_BY[dayEl] === mainEl) monthStatus = "得令·相";
  else if (ELEMENT_GENERATE[dayEl] === mainEl) monthStatus = "失令·休";
  else if (ELEMENT_OVERCOME[dayEl] === mainEl) monthStatus = "失令·囚";
  else if (ELEMENT_OVERCOME_BY[dayEl] === mainEl) monthStatus = "失令·死";
  else monthStatus = "平";
  return { helpScore: Math.round(helpScore), drainScore: Math.round(drainScore), strengthScore: score, level, label, desc, conclusion, isStrong: score >= 50, monthStatus };
}

/* ===== 用神取法 ===== */
function determineUsefulGod(strengthResult, dayStem) {
  const dayEl = STEM_ELEMENTS[dayStem];
  const { isStrong, level, label } = strengthResult;
  let useGod, useGodElement, avoidGod, avoidGodElement, useGodDesc, strategy, advice;
  const likeElements = [], dislikeElements = [];

  if (level >= 6) {
    useGod = "食伤"; useGodElement = ELEMENT_GENERATE[dayEl]; avoidGod = "印星"; avoidGodElement = ELEMENT_GENERATED_BY[dayEl]; strategy = "泄秀生财";
    useGodDesc = `日主${label}，${dayEl}气过旺，宜用${useGodElement}（食伤）泄秀，${ELEMENT_OVERCOME[dayEl]}（财星）耗气。忌${avoidGodElement}（印星）和${dayEl}（比劫）再助旺。`;
    advice = `【开运建议】发挥才华是关键，宜从事创意、教育、技术输出类工作。多与${useGodElement}属性的人合作（如从事${useGodElement}相关行业者）。颜色宜选${useGodElement}系，居住和办公方位宜${useGodElement}方。流年遇食伤大运为黄金期，可大胆施展。`;
    likeElements.push(ELEMENT_GENERATE[dayEl], ELEMENT_OVERCOME[dayEl], ELEMENT_OVERCOME_BY[dayEl]);
    dislikeElements.push(dayEl, ELEMENT_GENERATED_BY[dayEl]);
  } else if (level === 5) {
    useGod = "财星"; useGodElement = ELEMENT_OVERCOME[dayEl]; avoidGod = "比劫"; avoidGodElement = dayEl; strategy = "耗气制衡";
    useGodDesc = `日主偏强，宜用${useGodElement}（财星）耗气，${ELEMENT_GENERATE[dayEl]}（食伤）泄秀为辅。忌${avoidGodElement}（比劫）和${ELEMENT_GENERATED_BY[dayEl]}（印星）。`;
    advice = `【开运建议】财运是突破口，宜主动求财而非坐等。适合从事${useGodElement}相关行业或面向${useGodElement}方向发展。多结交财星旺的朋友，合作共赢。避免与同行过度竞争，宜差异化发展。`;
    likeElements.push(ELEMENT_GENERATE[dayEl], ELEMENT_OVERCOME[dayEl], ELEMENT_OVERCOME_BY[dayEl]);
    dislikeElements.push(dayEl, ELEMENT_GENERATED_BY[dayEl]);
  } else if (level === 4) {
    useGod = "通关"; useGodElement = ELEMENT_GENERATE[dayEl]; avoidGod = "冲破"; avoidGodElement = ELEMENT_OVERCOME_BY[dayEl]; strategy = "维持均衡";
    useGodDesc = `日主中和难得，五行流通是关键。忌${avoidGodElement}（七杀）冲破平衡，宜顺势而为。`;
    advice = `【开运建议】保持现状是最好的策略。不宜大起大落的投资或剧烈的生活变动。遇到冲太岁的年份需格外小心，提前做好防范。日常宜修身养性，维持五行平衡的生活方式。`;
    likeElements.push(ELEMENT_GENERATE[dayEl], ELEMENT_GENERATED_BY[dayEl]);
    dislikeElements.push(ELEMENT_OVERCOME_BY[dayEl]);
  } else if (level === 3) {
    useGod = "印星"; useGodElement = ELEMENT_GENERATED_BY[dayEl]; avoidGod = "官杀"; avoidGodElement = ELEMENT_OVERCOME_BY[dayEl]; strategy = "生扶日主";
    useGodDesc = `日主偏弱，宜用${useGodElement}（印星）生扶，${dayEl}（比劫）助力为辅。忌${avoidGodElement}（官杀）克伐和过多${ELEMENT_OVERCOME[dayEl]}（财星）耗气。`;
    advice = `【开运建议】多学习、多读书、多考证——印星代表学识和贵人。选择${useGodElement}方位居住或办公有利。宜进入大平台或跟随有实力的领导发展，借力使力。避免独自承担过大压力。`;
    likeElements.push(ELEMENT_GENERATED_BY[dayEl], dayEl);
    dislikeElements.push(ELEMENT_OVERCOME_BY[dayEl], ELEMENT_OVERCOME[dayEl], ELEMENT_GENERATE[dayEl]);
  } else if (level === 1) {
    useGod = "从势"; useGodElement = ELEMENT_OVERCOME_BY[dayEl]; avoidGod = "印比"; avoidGodElement = ELEMENT_GENERATED_BY[dayEl]; strategy = "弃命从势";
    useGodDesc = `日主从弱，宜弃命随势，顺从${useGodElement}（官杀）之气。忌${avoidGodElement}（印星）和${dayEl}（比劫）来扶。`;
    advice = `【开运建议】顺势而为是唯一出路。不要逆势而动，宜跟随大势、大平台。遇到帮扶日主的大运流年反而不顺（因为破了从格），遇到泄耗的运势反而如鱼得水。人生格局特殊，成就往往非常规路径。`;
    likeElements.push(ELEMENT_OVERCOME_BY[dayEl], ELEMENT_OVERCOME[dayEl], ELEMENT_GENERATE[dayEl]);
    dislikeElements.push(dayEl, ELEMENT_GENERATED_BY[dayEl]);
  } else {
    useGod = "印星"; useGodElement = ELEMENT_GENERATED_BY[dayEl]; avoidGod = "财星"; avoidGodElement = ELEMENT_OVERCOME[dayEl]; strategy = "扶弱抑强";
    useGodDesc = `日主弱，急需${useGodElement}（印星）生扶、${dayEl}（比劫）助力。忌${avoidGodElement}（财星）损印、${ELEMENT_OVERCOME_BY[dayEl]}（官杀）克伐。`;
    advice = `【开运建议】当务之急是增强自身实力——学习深造、考取资格证书、寻找靠山。${useGodElement}方位和颜色是贵人方。切忌贪财冒险，守住已有资源比追逐新机会更重要。中晚年运势逐渐走强。`;
    likeElements.push(ELEMENT_GENERATED_BY[dayEl], dayEl);
    dislikeElements.push(ELEMENT_OVERCOME_BY[dayEl], ELEMENT_OVERCOME[dayEl], ELEMENT_GENERATE[dayEl]);
  }
  return { useGod, useGodElement, avoidGod, avoidGodElement, useGodDesc, strategy, advice, likeElements: [...new Set(likeElements)], dislikeElements: [...new Set(dislikeElements)] };
}

/* ===== 天干合冲 ===== */
const STEM_COMBINE = {
  甲己: { result: "土", name: "中正之合" }, 己甲: { result: "土", name: "中正之合" },
  乙庚: { result: "金", name: "仁义之合" }, 庚乙: { result: "金", name: "仁义之合" },
  丙辛: { result: "水", name: "威制之合" }, 辛丙: { result: "水", name: "威制之合" },
  丁壬: { result: "木", name: "淫慝之合" }, 壬丁: { result: "木", name: "淫慝之合" },
  戊癸: { result: "火", name: "无情之合" }, 癸戊: { result: "火", name: "无情之合" },
};
const STEM_CLASH = {
  甲庚: "金克木", 庚甲: "金克木", 乙辛: "金克木", 辛乙: "金克木",
  丙壬: "水克火", 壬丙: "水克火", 丁癸: "水克火", 癸丁: "水克火",
};

/* ===== 地支六合 ===== */
const BRANCH_SIX_COMBINE = {
  子丑: { result: "土", name: "子丑合土" }, 丑子: { result: "土", name: "子丑合土" },
  寅亥: { result: "木", name: "寅亥合木" }, 亥寅: { result: "木", name: "寅亥合木" },
  卯戌: { result: "火", name: "卯戌合火" }, 戌卯: { result: "火", name: "卯戌合火" },
  辰酉: { result: "金", name: "辰酉合金" }, 酉辰: { result: "金", name: "辰酉合金" },
  巳申: { result: "水", name: "巳申合水" }, 申巳: { result: "水", name: "巳申合水" },
  午未: { result: "火", name: "午未合火" }, 未午: { result: "火", name: "午未合火" },
};

/* ===== 地支三合局 ===== */
const BRANCH_THREE_COMBINE = [
  { branches: ["申", "子", "辰"], result: "水", name: "申子辰合水局" },
  { branches: ["寅", "午", "戌"], result: "火", name: "寅午戌合火局" },
  { branches: ["亥", "卯", "未"], result: "木", name: "亥卯未合木局" },
  { branches: ["巳", "酉", "丑"], result: "金", name: "巳酉丑合金局" },
];

/* ===== 地支三会方 ===== */
const BRANCH_THREE_MEET = [
  { branches: ["寅", "卯", "辰"], result: "木", name: "寅卯辰会东方木" },
  { branches: ["巳", "午", "未"], result: "火", name: "巳午未会南方火" },
  { branches: ["申", "酉", "戌"], result: "金", name: "申酉戌会西方金" },
  { branches: ["亥", "子", "丑"], result: "水", name: "亥子丑会北方水" },
];

/* ===== 地支六冲 ===== */
const BRANCH_SIX_CLASH = {
  子午: "子午冲", 午子: "子午冲", 丑未: "丑未冲", 未丑: "丑未冲",
  寅申: "寅申冲", 申寅: "寅申冲", 卯酉: "卯酉冲", 酉卯: "卯酉冲",
  辰戌: "辰戌冲", 戌辰: "辰戌冲", 巳亥: "巳亥冲", 亥巳: "巳亥冲",
};

/* ===== 地支六害 ===== */
const BRANCH_SIX_HARM = {
  子未: "子未害", 未子: "子未害", 丑午: "丑午害", 午丑: "丑午害",
  寅巳: "寅巳害", 巳寅: "寅巳害", 卯辰: "卯辰害", 辰卯: "卯辰害",
  申亥: "申亥害", 亥申: "申亥害", 酉戌: "酉戌害", 戌酉: "酉戌害",
};

/* ===== 地支三刑 ===== */
const BRANCH_THREE_PUNISH = [
  { branches: ["寅", "巳", "申"], name: "寅巳申无恩之刑", desc: "恃势凌人，易招是非" },
  { branches: ["丑", "戌", "未"], name: "丑戌未持势之刑", desc: "目无长上，傲慢自大" },
  { branches: ["子", "卯"], name: "子卯无礼之刑", desc: "缺少礼数，言行无忌" },
  { branches: ["辰", "辰"], name: "辰辰自刑", desc: "自寻烦恼" },
  { branches: ["午", "午"], name: "午午自刑", desc: "急躁冲动" },
  { branches: ["酉", "酉"], name: "酉酉自刑", desc: "孤芳自赏" },
  { branches: ["亥", "亥"], name: "亥亥自刑", desc: "思虑过多" },
];

/* ===== 分析四柱合冲刑害 ===== */
function analyzeInteractions(pillars) {
  const stems = pillars.map(p => p.stem);
  const branches = pillars.map(p => p.branch);
  const names = ["年柱", "月柱", "日柱", "时柱"];
  const r = { stemCombines: [], stemClashes: [], branchCombines: [], branchThreeCombines: [], branchThreeMeets: [], branchClashes: [], branchPunishes: [], branchHarms: [], summary: [] };

  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const sk = stems[i] + stems[j];
      if (STEM_COMBINE[sk]) r.stemCombines.push({ pair: `${names[i]}${stems[i]}—${names[j]}${stems[j]}`, ...STEM_COMBINE[sk] });
      if (STEM_CLASH[sk]) r.stemClashes.push({ pair: `${names[i]}${stems[i]}—${names[j]}${stems[j]}`, desc: STEM_CLASH[sk] });
      const bk = branches[i] + branches[j];
      if (BRANCH_SIX_COMBINE[bk]) r.branchCombines.push({ pair: `${names[i]}${branches[i]}—${names[j]}${branches[j]}`, ...BRANCH_SIX_COMBINE[bk] });
      if (BRANCH_SIX_CLASH[bk]) r.branchClashes.push({ pair: `${names[i]}${branches[i]}—${names[j]}${branches[j]}`, name: BRANCH_SIX_CLASH[bk] });
      if (BRANCH_SIX_HARM[bk]) r.branchHarms.push({ pair: `${names[i]}${branches[i]}—${names[j]}${branches[j]}`, name: BRANCH_SIX_HARM[bk] });
    }
  }
  BRANCH_THREE_COMBINE.forEach(c => { const f = c.branches.filter(b => branches.includes(b)); if (f.length >= 2) r.branchThreeCombines.push({ name: c.name, found: f.join(""), label: f.length === 3 ? "三合局成" : "半三合", result: c.result }); });
  BRANCH_THREE_MEET.forEach(c => { const f = c.branches.filter(b => branches.includes(b)); if (f.length >= 3) r.branchThreeMeets.push({ name: c.name, result: c.result }); });
  BRANCH_THREE_PUNISH.forEach(p => {
    if (p.branches.length === 2) {
      const [a, b] = p.branches;
      if (a === b) { if (branches.filter(br => br === a).length >= 2) r.branchPunishes.push({ name: p.name, desc: p.desc }); }
      else { if (branches.includes(a) && branches.includes(b)) r.branchPunishes.push({ name: p.name, desc: p.desc }); }
    } else { if (p.branches.filter(b => branches.includes(b)).length >= 2) r.branchPunishes.push({ name: p.name, desc: p.desc }); }
  });
  if (r.stemCombines.length) r.summary.push(`天干有${r.stemCombines.map(c => c.name).join("、")}，合化之气影响命格走向`);
  if (r.branchCombines.length) r.summary.push(`地支有${r.branchCombines.map(c => c.name).join("、")}，六合助力，利人际关系和贵人运`);
  if (r.branchThreeCombines.length) r.summary.push(`${r.branchThreeCombines.map(c => `${c.label}→${c.name}`).join("、")}，格局层次提升`);
  if (r.branchClashes.length) r.summary.push(`⚠ ${r.branchClashes.map(c => c.name).join("、")}，主变动冲突，逢冲之年需防意外`);
  if (r.branchPunishes.length) r.summary.push(`⚠ ${r.branchPunishes.map(p => p.name).join("、")}，注意人际纠纷和法律风险`);
  if (r.branchHarms.length) r.summary.push(`${r.branchHarms.map(h => h.name).join("、")}，暗害需防，小心被算计`);
  // 综合结论
  const hasGood = r.stemCombines.length + r.branchCombines.length + r.branchThreeCombines.length + r.branchThreeMeets.length;
  const hasBad = r.stemClashes.length + r.branchClashes.length + r.branchPunishes.length + r.branchHarms.length;
  if (hasGood > hasBad) r.summary.push("总体而言命局合多冲少，人际和睦、贵人运旺");
  else if (hasBad > hasGood) r.summary.push("总体而言命局冲害偏多，一生变动较大，需在稳定中求发展");
  else if (hasGood === 0 && hasBad === 0) r.summary.push("四柱无明显合冲，命局平稳安定");
  return r;
}

/* ===== 完整十神（含地支藏干） ===== */
function getCompleteTenGods(pillars, dayStem) {
  const names = ["年柱", "月柱", "日柱", "时柱"];
  const all = [];
  pillars.forEach((p, i) => {
    if (i !== 2) {
      const god = getTenGod(dayStem, p.stem);
      all.push({ position: names[i] + "天干", stem: p.stem, element: STEM_ELEMENTS[p.stem], god, info: TEN_GOD_MEANINGS[god], isHidden: false });
    }
    if (BRANCH_HIDDEN_STEMS[p.branch]) {
      BRANCH_HIDDEN_STEMS[p.branch].forEach((h, hIdx) => {
        const god = getTenGod(dayStem, h.stem);
        const label = hIdx === 0 ? "本气" : hIdx === 1 ? "中气" : "余气";
        all.push({ position: `${names[i]}${p.branch}藏${label}`, stem: h.stem, element: STEM_ELEMENTS[h.stem], god, info: TEN_GOD_MEANINGS[god], isHidden: true, hiddenLabel: label });
      });
    }
  });
  const counts = {}, details = {};
  all.forEach(g => { counts[g.god] = (counts[g.god] || 0) + 1; if (!details[g.god]) details[g.god] = []; details[g.god].push(g.position); });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const absent = Object.keys(TEN_GOD_MEANINGS).filter(g => !counts[g]);
  return { all, counts, details, sortedGods: sorted, dominantGod: sorted[0]?.[0] || "", absentGods: absent };
}

/* ===== 格局判断 ===== */
function determinePattern(pillars, dayStem, strengthResult, tenGodResult) {
  const hiddens = BRANCH_HIDDEN_STEMS[pillars[1].branch];
  const monthMainGod = getTenGod(dayStem, hiddens[0].stem);
  const pats = { 正官: "正官格", 七杀: "七杀格", 正财: "正财格", 偏财: "偏财格", 正印: "正印格", 偏印: "偏印格", 食神: "食神格", 伤官: "伤官格" };
  const patDescs = {
    正官格: { brief: "月令透官，主功名富贵", detail: "正官格为八格之首，主人品行端正、有责任感、重信用。适合体制内发展、公务员、管理层。一生注重名誉，行事光明磊落。若官星有印星保护，富贵可期；若财来生官，更是锦上添花。" },
    七杀格: { brief: "月令透杀，主权威显赫", detail: "七杀格命主个性刚烈、有魄力、敢于冒险。适合军警、法律、竞技、创业等需要魄力的领域。若食神制杀或印星化杀，则化凶为吉、大权在握。但杀无制则一生多灾多险。" },
    正财格: { brief: "月令透财，主勤劳致富", detail: "正财格命主务实勤恳、理财有方、重视家庭。适合金融、会计、贸易、实业经营。一生财运稳定，靠正道获利，不宜投机取巧。婚姻多美满（男命尤佳），配偶贤惠持家。" },
    偏财格: { brief: "月令透偏财，主慷慨大方", detail: "偏财格命主慷慨豪爽、人缘极佳、善于交际。适合销售、公关、投资、娱乐行业。财运来去较大，有意外之财但也容易散财。社交广泛，朋友众多，但须防小人借贷不还。" },
    正印格: { brief: "月令透印，主学业有成", detail: "正印格命主聪慧好学、品德端正、有长辈缘。适合教育、学术、文化、出版等行业。一生得贵人相助，学历和资质是立身之本。母亲对命主影响极大，家庭教育良好。" },
    偏印格: { brief: "月令透偏印，主悟性过人", detail: "偏印格命主思维独特、直觉敏锐、有艺术天赋。适合研究、玄学、中医、IT技术、自由职业。性格较为孤僻内敛，不善交际但内心丰富。需注意偏印夺食带来的创业风险。" },
    食神格: { brief: "月令透食，主才华横溢", detail: "食神格命主才华出众、心态乐观、享受生活。适合餐饮、文艺、娱乐、设计等创意行业。食神生财格局极佳，以才华换取财富。一生较有口福，但须防过度安逸、缺乏进取心。" },
    伤官格: { brief: "月令透伤，主技艺出众", detail: "伤官格命主才气纵横、不拘一格、追求完美。适合律师、医生、技术专家、艺术家等专业领域。伤官配印为上格，才华与修养兼备。但伤官见官则是非多，须避免与权威对抗。" },
  };
  const pName = pats[monthMainGod] || "杂气格";
  const patInfo = patDescs[pName] || { brief: "月令杂气，综合取用", detail: "杂气格需要综合分析命局中最旺的十神来确定格局走向。灵活性强，适应面广，关键看大运引发哪种力量。" };
  const mainPattern = { name: pName, brief: patInfo.brief, desc: patInfo.detail };
  const specials = [];
  const gc = tenGodResult.counts;
  if ((gc["七杀"] || 0) >= 1 && (gc["正印"] || 0) >= 1) specials.push({ name: "杀印相生", desc: "化杀为权，智勇双全。有将帅之才，适合掌权管人、军警法务。" });
  if ((gc["食神"] || 0) >= 1 && (gc["七杀"] || 0) >= 1) specials.push({ name: "食神制杀", desc: "以柔克刚，才华化压力。善于用智慧化解困境，事业成就较高。" });
  if ((gc["伤官"] || 0) >= 1 && (gc["正印"] || 0) >= 1) specials.push({ name: "伤官配印", desc: "才华与修养并重。既有创造力又有深度，适合学术研究或高端专业。" });
  if (((gc["食神"] || 0) + (gc["伤官"] || 0)) >= 2 && ((gc["正财"] || 0) + (gc["偏财"] || 0)) >= 1) specials.push({ name: "食伤生财", desc: "才华直接变现，财运亨通。靠本事赚钱，越努力越幸运。" });
  if ((gc["正官"] || 0) >= 1 && (gc["正印"] || 0) >= 1) specials.push({ name: "官印相生", desc: "功名显赫，仕途顺利。有领导力和学识，适合体制内升迁。" });
  if (((gc["比肩"] || 0) + (gc["劫财"] || 0)) >= 3) specials.push({ name: "比劫成群", desc: "竞争激烈，人际复杂。破财之兆，须防合伙纠纷和朋友借钱。" });
  // 综合格局结论
  let patternConclusion = `此命为${pName}`;
  if (specials.length > 0) patternConclusion += `，兼有${specials.map(s=>s.name).join("、")}等特殊格局`;
  patternConclusion += `。${mainPattern.brief}。`;
  return { mainPattern, monthMainGod, specialPatterns: specials, hasSpecial: specials.length > 0, patternConclusion };
}

/* ===== 五行加权计数 ===== */
function getWeightedElementCounts(pillars) {
  const c = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  const pos = [
    { stem: pillars[0].stem, branch: pillars[0].branch, sW: 8, bW: 4 },
    { stem: pillars[1].stem, branch: pillars[1].branch, sW: 12, bW: 40 },
    { stem: pillars[2].stem, branch: pillars[2].branch, sW: 0, bW: 12 },
    { stem: pillars[3].stem, branch: pillars[3].branch, sW: 12, bW: 12 },
  ];
  pos.forEach(({ stem, branch, sW, bW }) => {
    if (stem && sW > 0) c[STEM_ELEMENTS[stem]] += sW;
    if (branch && BRANCH_HIDDEN_STEMS[branch]) BRANCH_HIDDEN_STEMS[branch].forEach(({ stem: h, weight: w }) => { c[STEM_ELEMENTS[h]] += bW * (w / 100); });
  });
  return c;
}

/* ===== 神煞系统 ===== */
const TIANYI_TABLE = { 甲: ["丑", "未"], 戊: ["丑", "未"], 乙: ["子", "申"], 己: ["子", "申"], 丙: ["亥", "酉"], 丁: ["亥", "酉"], 庚: ["丑", "未"], 辛: ["寅", "午"], 壬: ["卯", "巳"], 癸: ["卯", "巳"] };
const WENCHANG_TABLE = { 甲: "巳", 乙: "午", 丙: "申", 丁: "酉", 戊: "申", 己: "酉", 庚: "亥", 辛: "子", 壬: "寅", 癸: "卯" };
const YIMA_TABLE = { "申子辰": "寅", "寅午戌": "申", "亥卯未": "巳", "巳酉丑": "亥" };
const TAOHUA_TABLE = { "申子辰": "酉", "寅午戌": "卯", "亥卯未": "子", "巳酉丑": "午" };
const HUAGAI_TABLE = { "申子辰": "辰", "寅午戌": "戌", "亥卯未": "未", "巳酉丑": "丑" };
const TIANDE_TABLE = { 寅: "丁", 卯: "申", 辰: "壬", 巳: "辛", 午: "亥", 未: "甲", 申: "癸", 酉: "寅", 戌: "丙", 亥: "乙", 子: "巳", 丑: "庚" };
const YUEDE_TABLE = { 寅: "丙", 卯: "甲", 辰: "壬", 巳: "庚", 午: "丙", 未: "甲", 申: "壬", 酉: "庚", 戌: "丙", 亥: "甲", 子: "壬", 丑: "庚" };

function analyzeShensha(pillars, dayStem) {
  const results = [];
  const branches = pillars.map(p => p.branch);
  const stems = pillars.map(p => p.stem);
  const yearBranch = pillars[0].branch;
  const monthBranch = pillars[1].branch;
  (TIANYI_TABLE[dayStem] || []).forEach(b => { if (branches.includes(b)) results.push({ name: "天乙贵人", icon: "⭐", type: "吉", desc: "逢凶化吉，多得贵人相助" }); });
  if (WENCHANG_TABLE[dayStem] && branches.includes(WENCHANG_TABLE[dayStem])) results.push({ name: "文昌贵人", icon: "📖", type: "吉", desc: "利考试学术，文才出众" });
  if (TIANDE_TABLE[monthBranch] && stems.includes(TIANDE_TABLE[monthBranch])) results.push({ name: "天德贵人", icon: "🌟", type: "吉", desc: "化灾解厄，心性善良" });
  if (YUEDE_TABLE[monthBranch] && stems.includes(YUEDE_TABLE[monthBranch])) results.push({ name: "月德贵人", icon: "🌙", type: "吉", desc: "为人宽厚，少灾少难" });
  const sanheKey = Object.keys(YIMA_TABLE).find(k => k.includes(yearBranch));
  if (sanheKey) {
    if (branches.includes(YIMA_TABLE[sanheKey])) results.push({ name: "驿马", icon: "🐎", type: "动", desc: "主奔波迁移，适合外向发展" });
    if (branches.includes(TAOHUA_TABLE[sanheKey])) results.push({ name: "桃花", icon: "🌸", type: "桃花", desc: "异性缘旺，有魅力" });
    if (branches.includes(HUAGAI_TABLE[sanheKey])) results.push({ name: "华盖", icon: "☂️", type: "孤", desc: "聪明独立，有哲学倾向" });
  }
  return results;
}

/* ===== 空亡系统 ===== */
function analyzeKongWang(pillars) {
  const sIdx = STEMS.indexOf(pillars[2].stem);
  const bIdx = BRANCHES.indexOf(pillars[2].branch);
  const xunStart = safeMod(bIdx - sIdx, 12);
  const kong1 = BRANCHES[safeMod(xunStart + 10, 12)];
  const kong2 = BRANCHES[safeMod(xunStart + 11, 12)];
  const names = ["年柱", "月柱", "日柱", "时柱"];
  const meanings = { 年柱: "祖业薄、早年漂泊", 月柱: "父母缘浅、中年自立", 日柱: "婚姻有波折", 时柱: "子女缘薄、晚年需规划" };
  const positions = [];
  pillars.forEach((p, i) => { if (p.branch === kong1 || p.branch === kong2) positions.push({ pillar: names[i], branch: p.branch, meaning: meanings[names[i]] || "" }); });
  return {
    kongWang: [kong1, kong2],
    kongPositions: positions,
    hasKongWang: positions.length > 0,
    desc: positions.length > 0
      ? `空亡${kong1}${kong2}，${positions.map(k => `${k.pillar}${k.branch}逢空——${k.meaning}`).join("；")}`
      : `空亡${kong1}${kong2}，四柱无逢空。`,
  };
}

/* ===== 称骨算命 ===== */
const CHENGGU_YEAR = { 甲子:1.2,丙子:1.6,戊子:1.5,庚子:0.7,壬子:0.5,乙丑:0.9,丁丑:0.8,己丑:0.7,辛丑:0.7,癸丑:0.7,丙寅:0.6,戊寅:0.8,庚寅:0.9,壬寅:0.9,甲寅:1.2,丁卯:0.7,己卯:1.9,辛卯:1.2,癸卯:1.2,乙卯:0.8,戊辰:1.2,庚辰:1.2,壬辰:1.0,甲辰:0.8,丙辰:0.8,己巳:0.5,辛巳:0.6,癸巳:0.7,乙巳:0.7,丁巳:0.6,庚午:0.9,壬午:0.8,甲午:1.5,丙午:1.3,戊午:1.9,辛未:0.8,癸未:0.7,乙未:0.6,丁未:0.5,己未:0.6,壬申:0.7,甲申:0.5,丙申:0.5,戊申:1.4,庚申:0.8,癸酉:0.8,乙酉:1.5,丁酉:1.4,己酉:0.5,辛酉:1.6,甲戌:1.5,丙戌:0.6,戊戌:1.4,庚戌:0.9,壬戌:1.0,乙亥:0.9,丁亥:1.6,己亥:0.9,辛亥:1.7,癸亥:0.6 };
const CHENGGU_MONTH = { 1:0.6,2:0.7,3:1.8,4:0.9,5:0.5,6:1.6,7:0.9,8:1.5,9:1.8,10:0.8,11:0.9,12:0.5 };
const CHENGGU_DAY = { 1:0.5,2:1.0,3:0.8,4:1.5,5:1.6,6:1.5,7:0.8,8:1.6,9:0.8,10:1.6,11:0.9,12:1.7,13:0.8,14:1.7,15:1.0,16:0.8,17:0.9,18:1.8,19:0.5,20:1.5,21:1.0,22:0.9,23:1.5,24:1.5,25:1.5,26:1.8,27:0.7,28:0.8,29:1.6,30:0.6 };
const CHENGGU_HOUR = { 子:1.6,丑:0.6,寅:0.7,卯:1.0,辰:0.9,巳:1.6,午:1.0,未:0.8,申:0.8,酉:0.9,戌:0.6,亥:0.6 };

const CHENGGU_FATE_MALE = {
  "2.1":"短命非业谓大凶，平生灾难事重重。","2.2":"身寒骨冷苦伶仃，此命推来行乞人。","2.3":"此命推来骨肉轻，求谋做事事难成。",
  "2.5":"此命推来祖业微，门庭营度似稀奇。","2.7":"一生做事少商量，难靠祖宗做主张。","2.9":"初年运限未曾亨，纵有功名在后成。",
  "3.0":"劳劳碌碌苦中求，东走西奔何日休。","3.2":"初年运蹇事难谋，渐有财源如水流。","3.4":"此命福气果如何，僧道门中衣禄多。",
  "3.5":"生平福量不周全，祖业根基觉少传。","3.6":"不须劳碌过平生，独自成家福不轻。","3.8":"一身骨肉最清高，早入学门姓名标。",
  "4.0":"平生衣禄是绵长，件件心中自主张。","4.2":"得宽怀处且宽怀，何用双眉总不开。","4.4":"来事由天莫苦求，须知福禄胜前途。",
  "4.6":"东西南北尽皆通，出姓移居更觉隆。","4.8":"幼年运道未曾享，苦是蹉跎再不兴。","5.0":"为利为名终日劳，中年福禄也多遭。",
  "5.2":"一世亨通事事能，不须劳苦自然丰。","5.4":"此命推来厚且清，诗书满腹看功成。","5.6":"此格推来礼义通，一生福禄用无穷。",
  "5.8":"平生福禄自然来，名利兼全福寿偕。","6.0":"一朝金榜快题名，显祖荣宗立大功。","6.5":"细推此格妙且清，必定才高学问成。",
  "7.0":"此命推来福禄宏，须知太岁不相同。",
};
const CHENGGU_FATE_FEMALE = {
  "2.1":"生身此命运不通，乌云盖月黑朦朦。","2.3":"女命推来骨格轻，善事做来也无益。","2.5":"此命推来一般般，女人持家有千般。",
  "2.7":"此格做事多辛苦，兼靠亲朋也不长。","2.9":"女命推来运不强，婚姻难遂又无良。","3.0":"女命推来不称心，祖业根基觉少成。",
  "3.2":"初年运蹇事难谋，谁料中年不自由。","3.4":"女命推来福如何，慈善修行衣食多。","3.6":"女命推来才德具，前途福禄也无亏。",
  "3.8":"凤鸣岐山降人间，女命逢此非等闲。","4.0":"目前月令运不通，如同太阳被云挡。","4.2":"女命推来福不轻，身闲心不得安宁。",
  "4.4":"女命推来事事宜，丈夫有靠福无亏。","4.6":"女人做事多才干，中年以后渐安然。","4.8":"初年运道有无奈，过了中年享安泰。",
  "5.0":"女命推来总是福，衣食无亏得安然。","5.2":"女命推来心善良，衣禄丰盈有主张。","5.4":"此命推来不一般，自得天赐福绵绵。",
  "5.6":"此格推来有名声，门庭清雅更光荣。","5.8":"此命推来旺夫家，女命无忧福可夸。","6.0":"女命推来气象新，精通六艺有才能。",
  "6.5":"女命推来好非常，一生福寿永安康。","7.0":"此命推来贵且清，一朝冠上凤凰鸣。",
};

function calculateChenggu(pillars, birth, gender) {
  const yz = pillars[0].stem + pillars[0].branch;
  const yW = CHENGGU_YEAR[yz] || 0.8;
  // 简化农历月
  const sm = birth.getMonth() + 1, sd = birth.getDate();
  const key = sm * 100 + sd;
  let lm = 12;
  if (key >= 204 && key < 306) lm = 1; else if (key >= 306 && key < 405) lm = 2; else if (key >= 405 && key < 506) lm = 3;
  else if (key >= 506 && key < 606) lm = 4; else if (key >= 606 && key < 707) lm = 5; else if (key >= 707 && key < 808) lm = 6;
  else if (key >= 808 && key < 908) lm = 7; else if (key >= 908 && key < 1008) lm = 8; else if (key >= 1008 && key < 1107) lm = 9;
  else if (key >= 1107 && key < 1207) lm = 10; else if (key >= 1207 || key < 106) lm = 11; else lm = 12;
  const mW = CHENGGU_MONTH[lm] || 0.8;
  const dW = CHENGGU_DAY[birth.getDate()] || 0.8;
  const hW = CHENGGU_HOUR[pillars[3].branch] || 0.8;
  const total = Math.round((yW + mW + dW + hW) * 10) / 10;
  const ft = gender === "male" ? CHENGGU_FATE_MALE : CHENGGU_FATE_FEMALE;
  let fate = ft[total.toFixed(1)];
  if (!fate) { const ks = Object.keys(ft).map(Number).sort((a, b) => a - b); const c = ks.reduce((p, v) => Math.abs(v - total) < Math.abs(p - total) ? v : p); fate = ft[c.toFixed(1)] || "此命推来中等格局。"; }
  let rating; if (total >= 6.0) rating = "上上等"; else if (total >= 5.5) rating = "上等"; else if (total >= 5.0) rating = "中上等"; else if (total >= 4.0) rating = "中等"; else if (total >= 3.0) rating = "中下等"; else rating = "下等";
  return { totalWeight: total, fate, rating, detail: `年${yW}两+月${mW}两+日${dW}两+时${hW}两=${total}两` };
}

/* ===== 婚姻分析 ===== */
function analyzeMarriage(pillars, dayStem, gender, strengthResult) {
  const dayBranch = pillars[2].branch;
  let score = 75;
  const factors = [];
  const isMale = gender === "male";
  const dayGod = getTenGod(dayStem, BRANCH_HIDDEN_STEMS[dayBranch][0].stem);
  if (isMale) {
    if (dayGod === "正财") { score += 15; factors.push("日坐正财，妻星得位，配偶贤惠"); }
    else if (dayGod === "偏财") { score += 8; factors.push("日坐偏财，异性缘好"); }
    else if (dayGod === "比肩" || dayGod === "劫财") { score -= 10; factors.push("日坐比劫，夫妻宫有竞争"); }
    else if (dayGod === "伤官") { score -= 8; factors.push("日坐伤官，需多包容"); }
  } else {
    if (dayGod === "正官") { score += 15; factors.push("日坐正官，夫星得位"); }
    else if (dayGod === "七杀") { score += 5; factors.push("日坐七杀，配偶强势"); }
    else if (dayGod === "伤官") { score -= 12; factors.push("伤官见官，婚姻需注意"); }
  }
  // 日支冲害
  [pillars[0], pillars[1], pillars[3]].forEach((p, i) => {
    const n = ["年支", "月支", "时支"][i];
    const k = dayBranch + p.branch;
    if (BRANCH_SIX_CLASH[k]) { score -= 12; factors.push(`日支与${n}相冲，感情多波动`); }
    if (BRANCH_SIX_HARM[k]) { score -= 8; factors.push(`日支与${n}相害`); }
    if (BRANCH_SIX_COMBINE[k]) { score += 5; factors.push(`日支与${n}六合，利感情`); }
  });
  if (strengthResult.level >= 6) { score -= 5; factors.push("日主偏旺，需学会退让"); }
  else if (strengthResult.level <= 2) { score -= 5; factors.push("日主偏弱，需培养主见"); }
  score = Math.min(95, Math.max(30, score));
  let rating, conclusion;
  if (score >= 85) { rating = "上佳"; conclusion = "婚姻宫配置极佳，夫妻宫得力，感情基础深厚。婚后生活和谐美满，配偶对命主有正面助力。宜早婚，婚后运势有明显提升。"; }
  else if (score >= 70) { rating = "良好"; conclusion = "婚姻格局整体不错，虽有小摩擦但无伤大雅。夫妻相敬如宾，彼此包容。适婚年龄在25-32岁之间，配偶条件较好。"; }
  else if (score >= 55) { rating = "中等"; conclusion = "婚姻格局中等偏上，需要双方共同经营。感情中有波动期，但只要互相理解就能渡过。建议晚婚为宜（28岁后），选择性格互补的伴侣。"; }
  else if (score >= 40) { rating = "偏弱"; conclusion = "婚姻宫受冲害，感情之路较为坎坷。可能经历分手或离异的考验。建议慎重择偶，选择对方八字与己互补者。婚前充分了解对方家庭背景。"; }
  else { rating = "波折"; conclusion = "婚姻格局较差，须格外注意感情经营。建议晚婚（30岁后），婚前做好充分考察。如能找到合适对象，后半生反而更幸福。平时多修身养性，提升自我魅力。"; }
  return { score, rating, factors, conclusion, dayMainGod: dayGod };
}

/* ===== 疾病诊断 ===== */
function analyzeHealth(weightedCounts, usefulGod) {
  const organMap = {
    木: { organ: "肝胆", illness: "肝胆疾病、眼疾、头痛", nurture: "宜养肝护眼，多吃绿色蔬菜，避免熬夜和过量饮酒。春季尤须注意。" },
    火: { organ: "心脏小肠", illness: "心血管、高血压、失眠", nurture: "宜养心安神，避免过度劳累和情绪激动。夏季注意清热降火，保证充足睡眠。" },
    土: { organ: "脾胃", illness: "消化系统、糖尿病、皮肤", nurture: "宜健脾养胃，饮食规律，忌生冷油腻。换季时节注意肠胃保养。" },
    金: { organ: "肺大肠", illness: "呼吸系统、皮肤病", nurture: "宜润肺养肤，秋冬注意防寒保暖。少吃辛辣刺激，多做有氧运动。" },
    水: { organ: "肾膀胱", illness: "泌尿系统、耳鸣、肾虚", nurture: "宜补肾固本，冬季注意保暖。避免过度劳累和房事过频，适当食用黑色食物。" },
  };
  const warnings = [];
  usefulGod.dislikeElements.forEach(el => { const o = organMap[el]; if (o) warnings.push({ element: el, organ: o.organ, desc: `${el}为忌神，${o.organ}需注意`, illness: o.illness, nurture: o.nurture }); });
  const sorted = Object.entries(weightedCounts).sort((a, b) => b[1] - a[1]);
  if (sorted[0] && sorted[0][1] > 30) { const o = organMap[sorted[0][0]]; if (o) warnings.push({ element: sorted[0][0], organ: o.organ, desc: `${sorted[0][0]}过旺，${o.organ}可能过亢`, illness: o.illness, nurture: o.nurture }); }
  Object.entries(weightedCounts).forEach(([el, s]) => { if (s < 5) { const o = organMap[el]; if (o) warnings.push({ element: el, organ: o.organ, desc: `${el}极弱，${o.organ}天生较弱`, illness: o.illness, nurture: o.nurture }); } });
  // 去重
  const seen = new Set(); const uniqueWarns = [];
  warnings.forEach(w => { const k = w.element + w.organ; if (!seen.has(k)) { seen.add(k); uniqueWarns.push(w); } });
  let summary;
  if (uniqueWarns.length > 0) {
    summary = `需重点关注${uniqueWarns.map(w => w.organ).join("、")}。${uniqueWarns[0].nurture}`;
  } else {
    summary = "五行较为均衡，无明显健康隐患。日常保持规律作息、适量运动即可。";
  }
  return { warnings: uniqueWarns, summary };
}
