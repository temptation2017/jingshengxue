import { OFFICIAL, Src } from './site';
import { Milestone, Profile } from './roadmap';
export interface Step { id: string; title: string; when: string; detail: string; materials?: string[]; entry?: Src; basis?: { text: string; src: Src } }
export interface Plan { verdict: 'ok' | 'conditional' | 'gap' | 'unknown'; verdictText: string; steps: Step[]; notes: string[]; entries: Src[] }

export function plan(p: Profile, m: Milestone): Plan {
  const Y = m.y; const notes: string[] = []; if (m.caveat) notes.push(m.caveat);
  const unknown = (why: string, entries: Src[]): Plan => ({ verdict: 'unknown', verdictText: '暂时判断不了', steps: [], notes: [why, ...notes], entries });
  if (p.hukou === 'collective') return unknown('集体户口（单位或学校的公共户口）的入学规则，本站没有找到可核验的统一条文。请直接问区教委或学区。', [OFFICIAL.yjrx, OFFICIAL.ryfw, OFFICIAL.bjeea]);

  if (m.stage === 'kindergarten') {
    if (p.district !== 'haidian') return unknown('本站目前只核验了海淀区的入园细则。其他区的报名日期、志愿数每年都不一样。', [OFFICIAL.ryfw]);
    const lives = p.hukou === 'haidian' || p.housing !== 'none';
    const steps: Step[] = [
      { id: 'kg1', title: '确认能证明「户籍在海淀」或「实际住在海淀」的材料', when: '现在', detail: '海淀入园看的是户籍所在地或家庭实际居住地，二选一即可。', materials: ['户口簿', '房产证明或租房等实际居住材料'], basis: { text: '海淀 2026：户籍所在地或家庭实际居住在海淀区的适龄儿童可参加信息采集。', src: OFFICIAL.hdKgFaq } },
      { id: 'kg2', title: `核对年龄：${Y - 4} 年 9 月 1 日至 ${Y - 3} 年 8 月 31 日出生`, when: `${Y} 年 5 月文件发布后`, detail: '小班按「前一年 9 月 1 日到当年 8 月 31 日」划出生窗口。差一天也要等下一年。', basis: { text: '海淀 2026 小班：2022-09-01 至 2023-08-31 出生。', src: OFFICIAL.hdKgFaq } },
      { id: 'kg3', title: '看当年《小班招生名录》，选 2–5 所意向园', when: `${Y} 年 5 月底`, detail: '重点读每所园招生简章里的「招生顺位」（录取先后规则）。单位办的园可能优先本单位职工子女。', entry: OFFICIAL.hdRoster2026, basis: { text: '海淀答疑：每名幼儿填报 2–5 个有序意向园；按招生顺位录取，同等顺位看意向顺序。', src: OFFICIAL.hdKgFaq } },
      { id: 'kg4', title: '在入园服务平台完成信息采集（报名）', when: `${Y} 年 6 月上中旬`, detail: '入口：ryfw.bjedu.cn → 选海淀 →「我要报名」。报名早晚不影响录取顺序，但别错过窗口。多孩家庭一个账号可添加多名子女。', materials: ['证件扫描件（清晰、每张不超过 1M）'], entry: OFFICIAL.ryfw, basis: { text: '海淀 2026 采集时间 6/1–6/15；报名早晚不影响优先序。', src: OFFICIAL.hdKgFaq } },
      { id: 'kg5', title: '等现场材料审核和录取结果', when: `${Y} 年 6 月 15 日以后`, detail: '网上审核通过后，幼儿园会做现场材料审核。6 月 15 日后不能再改信息和志愿。录取额满为止，不保证。没录上怎么补录：海淀官方未写明，可在平台看「未录取」状态后打学前科 88487315 咨询。', basis: { text: '答疑 7(4)：「网上信息审核通过后，幼儿园会进行现场材料审核。」7(8)：「各园按照招生顺位依次录取，额满为止。」', src: OFFICIAL.hdKgFaq } },
    ];
    if (p.hukou === 'nonBj') notes.push('非北京户口：能否录取、排在第几顺位，要看各园招生简章（本站尚未逐园核验）。');
    return { verdict: lives ? (m.verified ? 'conditional' : 'unknown') : 'gap', verdictText: lives ? (m.verified ? '可以报名，录取看各园顺位' : '大概率能报名，以当年文件为准') : '缺少在海淀的户籍或居住材料', steps, notes, entries: [OFFICIAL.ryfw, OFFICIAL.hdRoster2026] };
  }

  if (m.stage === 'primary') {
    if (p.district !== 'haidian') return unknown('本站目前只核验了海淀区的幼升小细则。市级规则：满 6 周岁、免试就近，具体材料看所在区当年文件。', [OFFICIAL.yjrx, OFFICIAL.bjCompulsory2026]);
    const common: Step[] = [
      { id: 'p-age', title: `核对年龄：${Y - 6} 年 8 月 31 日以前出生`, when: `${Y} 年 4 月市级文件发布后`, detail: '「满 6 周岁」按 8 月 31 日划线。', basis: { text: '京教基二〔2026〕7号：年满 6 周岁（2020 年 8 月 31 日以前出生）。', src: OFFICIAL.bjCompulsory2026 } },
      { id: 'p-doc', title: '读当年市教委意见和海淀实施意见', when: `${Y} 年 4–5 月`, detail: '每年的材料要求、日期都会变。不要用往年的自媒体解读。', entry: OFFICIAL.hdFaq2026, basis: { text: '市意见定框架，区定细则（「区级为主」）。', src: OFFICIAL.bjCompulsory2026 } },
    ];
    const tail: Step[] = [
      { id: 'p-notice', title: '去学区或小学门口看《入学登记通知》', when: `${Y} 年 6 月初`, detail: '对应哪所小学，以当年张贴的通知为准。官方没有「小区→学校」固定对照表。', basis: { text: '登记入学为主，单校划片 + 多校划片结合；具体学校以当年通知为准。', src: OFFICIAL.hdFaq2026 } },
      { id: 'p-reg', title: '带《信息采集表》按通知到校登记', when: `${Y} 年 6 月中旬（2026 为 6/13–14）`, detail: '7 月上旬发录取通知书。', materials: ['《信息采集表》', '户口簿', '房产或居住证明'], basis: { text: '海淀 2026：6/13–14 登记；7 月上旬通知书。', src: OFFICIAL.hdFaq2026 } },
    ];
    if (p.hukou !== 'nonBj') {
      const s: Step[] = [...common];
      let verdict: Plan['verdict'] = 'ok', vt = '符合登记入学的基本条件';
      if (p.housing === 'own') s.splice(1, 0, { id: 'p-1911', title: '查房产证的取得日期：是否在 2019 年 1 月 1 日之后', when: '现在', detail: '2019-01-01 之后取得产权证的房子用于入学，走电脑派位（多校划片，不保证某一所学校）。另外原则上「六年一学位」：同一套房六年内只给一个学位，符合国家生育政策的适龄儿童除外。', materials: ['不动产权证'], basis: { text: '海淀解读「19.1.1」与六年一学位条款。', src: OFFICIAL.hdFaq2026 } });
      else if (p.hukou === 'haidian') { verdict = 'conditional'; vt = '有海淀户口，但缺少实际居住证明'; s.splice(1, 0, { id: 'p-live', title: '准备在海淀实际居住的证明', when: '现在', detail: '海淀户籍需同时满足实际居住。无房 / 借住怎么认定，以学区审核为准。', basis: { text: '海淀 2026：海淀户籍 + 实际居住。', src: OFFICIAL.hdGov2026 } }); }
      else { verdict = p.housing === 'rent' ? 'conditional' : 'gap'; vt = p.housing === 'rent' ? '外区户口租房：要满 3 年条件' : '外区户口无房：在海淀入学条件不足'; s.splice(1, 0, { id: 'p-rent3', title: '外区京户无房：凑齐「租住 3 年 + 就业 3 年」', when: '尽早', detail: '需在海淀连续单独承租并实际居住 3 年以上、租赁平台备案，且在海淀稳定就业 3 年以上。也可以回户籍所在区入学。', basis: { text: '海淀 2026 实施意见：外区京户无房类型条件。', src: OFFICIAL.hdGov2026 } }); }
      s.push({ id: 'p-collect', title: '在义务教育入学服务平台完成信息采集', when: `${Y} 年 5 月（2026 为 5/6–31）`, detail: '用京通登录 yjrx.bjedu.cn。', entry: OFFICIAL.yjrx, basis: { text: '海淀 2026：京户采集 5/6–31。', src: OFFICIAL.hdFaq2026 } }, ...tail);
      return { verdict: m.verified ? verdict : verdict === 'gap' ? 'gap' : 'unknown', verdictText: m.verified ? vt : `${vt}（以当年文件为准）`, steps: s, notes, entries: [OFFICIAL.yjrx, OFFICIAL.hdGov2026, OFFICIAL.hdFaq2026] };
    }
    const s: Step[] = [...common,
      { id: 'p-permit', title: `核对居住证（住址在海淀）的起始日：按 2026 口径推算需早于 ${Y - 1} 年 9 月 1 日`, when: '现在', detail: '如果还没办或起始日晚于这个日期，按往年口径可能不达标，请尽快办理并向学区确认当年要求。2026 年的要求是：监护人一方持住址为海淀的有效居住证，有效期起始日在 2025-09-01 之前（不含当天）。新学年日期以当年文件为准。', materials: ['北京市居住证'], basis: { text: '海淀 2026 非本市户籍条款（附件2）。', src: OFFICIAL.hdFaq2026 } },
      { id: 'p-ss', title: '核对社保：在海淀连续缴纳、不要断', when: `现在起持续到 ${Y} 年 5 月（按 2026 口径推算）`, detail: '2026 年的要求：2025-09-01 前参保，2025-09 至 2026-05 按月连续缴费且缴费地在海淀。', materials: ['社保缴费记录'], basis: { text: '海淀 2026 非本市户籍条款。', src: OFFICIAL.hdFaq2026 } },
      { id: 'p-house', title: p.housing === 'none' ? '准备在京实际住所材料（目前缺）' : '准备住所材料（购房或租房合同）', when: '现在', detail: '租房合同签订日期、完税等有具体要求（2026 年要求合同在 2025-09-01 前签订）。', materials: ['房产证明或租房合同', '完税证明'], basis: { text: '海淀 2026 附件2 住所材料细则。', src: OFFICIAL.hdFaq2026 } },
      { id: 'p-nb', title: '平台注册，并到居住地街镇参加联审（材料审核）', when: `${Y} 年 5 月（2026：注册 5/6–15，联审 5/11–29）`, detail: '需带务工就业材料、实际住所材料、全家户口簿、居住证。', materials: ['在京务工就业材料', '实际住所材料', '全家户口簿', '北京市居住证'], entry: OFFICIAL.yjrx, basis: { text: '京教基二〔2026〕7号：非本市户籍到居住地街镇审核。', src: OFFICIAL.bjCompulsory2026 } },
      ...tail];
    return { verdict: p.housing === 'none' ? 'gap' : m.verified ? 'conditional' : 'unknown', verdictText: p.housing === 'none' ? '缺少在京住所材料' : '能否入学取决于居住证、社保日期是否达标（以当年文件为准）', steps: s, notes, entries: [OFFICIAL.yjrx, OFFICIAL.hdFaq2026] };
  }
  if (m.stage === 'university') {
    if (p.hukou !== 'nonBj') return { verdict: 'unknown', verdictText: '有北京户口可报名普通高考（以当年规定为准）', steps: [{ id: 'u1', title: '关注当年高考报名通知', when: `${Y} 年 10–11 月`, detail: '北京正式户口可报名；学籍等其他条件看当年招生工作规定。', entry: OFFICIAL.bjeea, basis: { text: '2026 北京普通高校招生工作规定：具有北京市正式户口可报名。', src: OFFICIAL.gaokao2026 } }], notes, entries: [OFFICIAL.bjeea] };
    return { verdict: 'conditional', verdictText: '随迁子女只能参加高职考试，不能报普通本科高考', steps: [{ id: 'u2', title: '提前 6 年准备五项条件', when: '越早越好', detail: '有效居住证类证件；合法稳定住所；合法稳定职业满 6 年；养老或医保连续满 6 年（不含补缴）；孩子有北京学籍且在京连续读完高中阶段 3 年。', basis: { text: '2027 随迁高职通知（五项同时满足）。', src: OFFICIAL.migrant2027 } }], notes, entries: [OFFICIAL.migrant2027, OFFICIAL.bjeea] };
  }
  return unknown(m.stage === 'junior' ? '小升初按学籍、户籍和房产类别走登记、对口直升或派位，本站暂不自动判断。可以先读「了解流程」。' : '中考以学籍为主；随迁子女在京可报考中职，条件以当年考试院通知为准。', m.stage === 'junior' ? [OFFICIAL.hdJunior, OFFICIAL.yjrx] : [OFFICIAL.senior2026, OFFICIAL.bjeea]);
}
