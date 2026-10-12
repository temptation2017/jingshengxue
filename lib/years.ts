import { StageKey } from './content';
export function entryYears(birth: string): Record<StageKey, number> {
  const [by, bm] = birth.split('-').map(Number);
  const kg = bm <= 8 ? by + 3 : by + 4; // 2026 口径：前一年 9/1 – 当年 8/31 出生
  return { kindergarten: kg, primary: kg + 3, junior: kg + 9, senior: kg + 12, gaokao: kg + 15 };
}
export const YEAR_NOTE = '按 2026 年官方出生日期线（8 月 31 日）推算；2027 年及以后以当年文件为准。';
