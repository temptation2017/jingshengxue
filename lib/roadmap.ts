import { OFFICIAL, Src } from './site';
export type Hukou = 'haidian' | 'otherBj' | 'nonBj' | 'collective';
export type Housing = 'own' | 'rent' | 'none';
export interface Profile { birth: string /* YYYY-MM */; district: 'haidian' | 'other'; hukou: Hukou; housing: Housing }
export type StageKey = 'kindergarten' | 'primary' | 'junior' | 'senior' | 'university';
export interface Milestone { key: string; stage: StageKey; title: string; schoolYear: number; y: number; m: number; whenText: string; verified: boolean; caveat?: string; src: Src }
export interface YearRow { schoolYear: number; age: number; label: string; stage: StageKey | 'home' }
export const PUBLISHED = 2026; // 已发布细则的学年

export function entryYears(p: Profile) {
  const [by, bm] = p.birth.split('-').map(Number);
  // 官方口径（2026）：小班 = 前一年9/1–当年8/31 出生满约3岁；小学 = 入学年(Y-6)年8月31日以前出生
  const kg = bm <= 8 ? by + 3 : by + 4;
  return { by, bm, kg, primary: kg + 3, junior: kg + 9, senior: kg + 12, university: kg + 15 };
}
const caveat = (y: number) => y > PUBLISHED ? `${y} 年细则尚未发布：按 2026 年官方文件结构推算，以当年文件为准。` : undefined;

export function milestones(p: Profile): Milestone[] {
  const e = entryYears(p);
  const nonBj = p.hukou === 'nonBj';
  return [
    { key: `kg-${e.kg}`, stage: 'kindergarten', title: '幼儿园小班报名（信息采集）', schoolYear: e.kg, y: e.kg, m: 6, whenText: `${e.kg} 年 6 月前后（海淀 2026 为 6/1–6/15）`, verified: e.kg === PUBLISHED, caveat: caveat(e.kg), src: OFFICIAL.hdRoster2026 },
    { key: `pri-${e.primary}`, stage: 'primary', title: '幼升小：入学信息采集与登记', schoolYear: e.primary, y: e.primary, m: 5, whenText: `${e.primary} 年 5–6 月（海淀 2026：5/6 起采集，6/13–14 登记）`, verified: e.primary === PUBLISHED, caveat: caveat(e.primary), src: OFFICIAL.bjCompulsory2026 },
    { key: `jun-${e.junior}`, stage: 'junior', title: '小升初：填志愿、登记或派位', schoolYear: e.junior, y: e.junior, m: 5, whenText: `${e.junior} 年 5–7 月（海淀 2026：5/26–29 填志愿）`, verified: false, caveat: caveat(e.junior), src: OFFICIAL.hdFaq2026 },
    { key: `sen-${e.senior}`, stage: 'senior', title: nonBj ? '中考 / 随迁子女报考中职' : '中考（初中学业水平考试）', schoolYear: e.senior, y: e.senior, m: 6, whenText: `${e.senior} 年 6 月（2026 为 6/24–25）`, verified: false, caveat: caveat(e.senior), src: OFFICIAL.senior2026 },
    { key: `uni-${e.university}`, stage: 'university', title: nonBj ? '随迁子女在京高职考试报名' : '北京高考报名', schoolYear: e.university, y: e.university - 1, m: 10, whenText: `${e.university - 1} 年 10–11 月（为 ${e.university} 年高考报名）`, verified: false, caveat: caveat(e.university), src: nonBj ? OFFICIAL.migrant2027 : OFFICIAL.gaokao2026 },
  ];
}
export function yearRows(p: Profile, now: Date): YearRow[] {
  const e = entryYears(p); const cur = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  const rows: YearRow[] = [];
  for (let sy = cur; sy <= e.university; sy++) {
    const age = sy - e.by - (e.bm > 9 ? 1 : 0);
    const L = (k: StageKey | 'home', label: string) => rows.push({ schoolYear: sy, age, stage: k, label });
    if (sy < e.kg) L('home', age >= 2 ? '在家 / 托育（满两周岁可看托班）' : '在家 / 托育');
    else if (sy < e.primary) L('kindergarten', ['幼儿园小班', '幼儿园中班', '幼儿园大班'][sy - e.kg]);
    else if (sy < e.junior) L('primary', `小学 ${sy - e.primary + 1} 年级`);
    else if (sy < e.senior) L('junior', `初中 ${sy - e.junior + 1} 年级`);
    else if (sy < e.university) L('senior', `高中 / 中职 ${sy - e.senior + 1} 年级`);
    else L('university', '大学 / 高职');
  }
  return rows;
}
export function nextMilestone(p: Profile, now: Date) {
  const ms = milestones(p); const nowIdx = now.getFullYear() * 12 + now.getMonth() + 1;
  const n = ms.find(x => x.y * 12 + x.m >= nowIdx) ?? ms[ms.length - 1];
  return { m: n, monthsLeft: Math.max(0, n.y * 12 + n.m - nowIdx), all: ms };
}
export const LS = { profile: 'jsx-profile', done: 'jsx-done' };
export const HUKOU_LABEL: Record<Hukou, string> = { haidian: '北京户口（在海淀）', otherBj: '北京户口（在其他区）', nonBj: '非北京户口', collective: '集体户口' };
export const HOUSING_LABEL: Record<Housing, string> = { own: '自己家的房（有产权）', rent: '租房', none: '无房 / 借住' };
