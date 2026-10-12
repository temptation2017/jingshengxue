import { Item, Identity } from './content';
import type { Mark } from './icons';
export interface Profile { identity: Identity; lives: boolean; permit: string; ins: string; cont: boolean; birth: string }
const d = (s: string) => new Date(s + 'T00:00:00');
export function judge(it: Item, Y: number, v: Profile): [Mark, string] {
  const pub = Y === 2026; const pend = pub ? '' : `（${Y} 年细则未发布，按 2026 年口径推算）`;
  if (it.status === 'not_stated') return ['not_stated', ''];
  if (it.status === 'pending') return ['pending', ''];
  switch (it.check) {
    case 'age': return [pub ? 'yes' : 'pending', `出生 ${v.birth.slice(0, 7)}，对应 ${Y} 年入学${pend}`];
    case 'live': return v.identity === 'local' || v.lives ? ['yes', v.identity === 'local' ? '户籍或房产在本区' : '家庭实际住在本区'] : ['no', '户籍和实际居住都不在本区'];
    case 'permit': { if (!v.permit) return ['no', '未填写居住证起始日']; const lim = `${Y - 1}-09-01`; const ok = d(v.permit) < d(lim); return [ok ? (pub ? 'yes' : 'pending') : 'no', `起始日 ${v.permit}，要求早于 ${lim}${pend}`]; }
    case 'insurance': { if (!v.ins) return ['no', '未填写首次参保日']; const lim = `${Y - 1}-09-01`; const ok = d(v.ins) < d(lim) && v.cont; return [ok ? (pub ? 'yes' : 'pending') : 'no', `参保 ${v.ins}${v.cont ? '，连续缴纳' : '，有断缴'}；要求 ${lim} 前参保并连续缴纳${pend}`]; }
  }
  return ['self', '请对照原文自行核对'];
}
