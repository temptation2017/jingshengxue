import { OFFICIAL } from './site';
export type Status = 'eligible' | 'conditional' | 'ineligible' | 'unknown';
export interface Input {
  hukou: 'haidian' | 'otherBj' | 'nonBj' | 'collective'; housing: 'ownPre2019' | 'ownPost2019' | 'rentFiled3y' | 'rent' | 'none';
  permitStart: string; insuranceStart: string; insuranceContinuous: boolean; birth: string;
  stage: 'kindergarten' | 'primary' | 'junior' | 'senior' | 'university'; year: number; district: 'haidian' | 'other';
}
export interface Link { label: string; href: string }
export interface Result { status: Status; can: string[]; gaps: string[]; where: Link[]; notes: string[] }
const d = (s: string) => new Date(s + 'T00:00:00');
const pending = (y: number) => `${y} 学年细则截至 2026-10-12 未发布：下面仅按 2026 年文件结构推算，以当年文件为准。`;

export function evaluate(i: Input): Result {
  const r: Result = { status: 'unknown', can: [], gaps: [], where: [], notes: [] };
  const published = i.year === 2026;
  if (!published) r.notes.push(pending(i.year));
  if (i.hukou === 'collective') {
    r.notes.push('集体户口的入学/报考规则本站未检索到可核验的统一条文。');
    r.where.push({ label: '北京市义务教育入学服务平台', href: OFFICIAL.yjrx }, { label: '北京教育考试院', href: OFFICIAL.bjeea });
    return r;
  }
  if (i.stage === 'kindergarten') {
    r.where.push({ label: '北京市学前教育入园服务平台', href: OFFICIAL.ryfw });
    if (i.district !== 'haidian') { r.notes.push('本站目前只核验了海淀区入园细则；其他区采集日、志愿数差异大。'); return r; }
    r.where.push({ label: '海淀 2026 小班招生名录', href: OFFICIAL.hdRoster2026 });
    const lo = d(`${i.year - 4}-09-01`), hi = d(`${i.year - 3}-08-31`);
    const b = i.birth ? d(i.birth) : null;
    if (!b) { r.gaps.push('请填写孩子出生日期'); return r; }
    const ageOk = b >= lo && b <= hi;
    const win = `${i.year - 4}-09-01 至 ${i.year - 3}-08-31 出生`;
    if (!ageOk) { r.status = published ? 'ineligible' : 'unknown'; r.gaps.push(`年龄不在小班窗口（${win}）${published ? '' : '——推算值'}`); if (b > hi) r.notes.push('出生晚于窗口：可看下一年小班，或各园托班（满两周岁，精确截止日看各园简章）。'); return r; }
    r.can.push(`年龄落在小班窗口：${win}${published ? '（海淀 2026 官方口径）' : '（按 2026 结构推算）'}`);
    if (i.hukou === 'haidian') r.can.push('海淀户籍，可在平台信息采集');
    else if (i.housing !== 'none') r.can.push('家庭实际居住在海淀也可采集（户籍所在地或实际居住地二选一）');
    else r.gaps.push('既非海淀户籍也无海淀实际居住材料');
    if (i.hukou === 'nonBj') r.notes.push('非京户的招生顺位以各园招生简章为准（待按园核验）。');
    r.can.push('填 2–5 个有序意向园；报名早晚不影响优先序');
    r.notes.push('录取按各园「招生顺位」，额满为止，不保证被任一意向园录取。');
    r.status = r.gaps.length ? 'ineligible' : published ? 'conditional' : 'unknown';
    return r;
  }
  if (i.stage === 'primary') {
    r.where.push({ label: '北京市义务教育入学服务平台', href: OFFICIAL.yjrx }, { label: '市 2026 义务教育入学意见', href: OFFICIAL.bjCompulsory2026 });
    const b = i.birth ? d(i.birth) : null;
    if (!b) { r.gaps.push('请填写孩子出生日期'); return r; }
    const cut = `${i.year - 6}-08-31`;
    if (b > d(cut)) { r.status = published ? 'ineligible' : 'unknown'; r.gaps.push(`未满 6 周岁：须 ${cut} 以前出生${published ? '' : '（推算）'}`); return r; }
    r.can.push(`年龄符合：${cut} 以前出生${published ? '' : '（推算）'}`);
    if (i.district !== 'haidian') { r.notes.push('本站目前只核验了海淀区细则，其他区材料与年限请看区教委当年文件。'); return r; }
    r.where.push({ label: '海淀 2026 实施意见', href: OFFICIAL.hdGov2026 }, { label: '海淀 2026 政策解读', href: OFFICIAL.hdFaq2026 });
    if (i.year === 2026 && b < d('2019-09-01')) r.notes.push('2019-09-01 前出生属超龄，需走学区预审。');
    const P = i.year - 1; // 2026 → 2025-09-01
    if (i.hukou === 'haidian' || i.hukou === 'otherBj') {
      if (i.housing === 'ownPre2019' || i.housing === 'ownPost2019') {
        r.can.push(i.hukou === 'haidian' ? '海淀户籍 + 实际居住：可登记入学' : '外区京户 + 海淀住宅类房产 + 实际居住：可在海淀入学');
        if (i.housing === 'ownPost2019') r.notes.push('「19.1.1」：2019-01-01 以后取得不动产权证用于入学，走电脑派位多校划片（不对应固定学校）。');
        r.notes.push('原则上「六年一学位」（符合国家生育政策的适龄儿童除外）。具体对应哪所小学，看当年学区/校门《入学登记通知》。');
        r.status = published ? 'eligible' : 'unknown';
      } else if (i.hukou === 'haidian') {
        r.can.push('海淀户籍'); r.gaps.push('缺少海淀实际居住证明（无房/借住情况以学区审核为准）'); r.status = published ? 'conditional' : 'unknown';
      } else if (i.housing === 'rentFiled3y') {
        r.can.push('连续单独承租并实际居住 3 年以上且租赁备案'); r.gaps.push('还需海淀稳定就业 3 年以上等联审材料'); r.status = published ? 'conditional' : 'unknown';
      } else { r.gaps.push('外区京户无房：需在海淀连续单独承租并实际居住 3 年以上 + 租赁平台备案 + 海淀稳定就业 3 年以上'); r.status = published ? 'ineligible' : 'unknown'; r.notes.push('也可回户籍所在区入学。'); }
      return r;
    }
    // 非京户（海淀 2026 附件2，日期绑定 2026 学年）
    const lim = `${P}-09-01`;
    const permitOk = !!i.permitStart && d(i.permitStart) < d(lim);
    const insOk = !!i.insuranceStart && d(i.insuranceStart) < d(lim) && i.insuranceContinuous;
    permitOk ? r.can.push(`居住证起始日早于 ${lim}`) : r.gaps.push(`监护人一方须持住址为海淀的居住证，有效期起始日早于 ${lim}（不含当日）`);
    insOk ? r.can.push('社保参保与连续缴费满足') : r.gaps.push(`社保须 ${lim} 前参保，并自 ${P}-09 至 ${i.year}-05 按月连续在海淀缴纳`);
    i.housing === 'none' ? r.gaps.push('缺少在京实际住所材料（购房或符合细则的租房）') : r.can.push('有住所材料（租房合同签订日、完税等见附件2）');
    r.notes.push('非京户须到居住地街镇联审，还需务工就业材料、全家户口簿。');
    r.status = !published ? 'unknown' : r.gaps.length ? 'ineligible' : 'conditional';
    return r;
  }
  if (i.stage === 'university') {
    r.where.push({ label: '2026 北京普通高校招生工作规定', href: OFFICIAL.gaokao2026 }, { label: '2027 随迁子女高职报名通知', href: OFFICIAL.migrant2027 });
    if (i.hukou !== 'nonBj') { r.can.push('具有北京市正式户口，可报名普通高考'); r.notes.push('学籍等其他要求见当年招生工作规定。'); r.status = 'conditional'; return r; }
    r.notes.push('非京户随迁子女只能参加高等职业学校招生考试，不能报普通本科高考。');
    r.gaps.push('须同时满足五项（2027 版）：有效居住证类、合法稳定住所、合法稳定职业满 6 年、养老或医保连续满 6 年（2021-09 至 2026-08，不含补缴）、本市学籍且在京连续就读高中阶段 3 年');
    r.status = 'conditional'; return r;
  }
  // junior / senior
  r.where.push(i.stage === 'junior' ? { label: '海淀小升初平台', href: OFFICIAL.hdJunior } : { label: '市 2026 中招意见', href: OFFICIAL.senior2026 }, { label: '北京教育考试院', href: OFFICIAL.bjeea });
  r.notes.push(i.stage === 'junior' ? '小升初按学籍与户籍/房产类别走登记、对口直升或派位，本站暂不做自动判断，请看学段百科。' : '中考以学籍为主；非京户随迁子女在京可报考中等职业学校，条件以当年考试院通知为准。');
  return r;
}
