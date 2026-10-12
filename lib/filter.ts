import { Item, Stage, Identity, District } from './content';
export function visible(items: Item[], identity: Identity | '', district: District, stage: Stage) {
  const d = district === 'haidian' && stage.detailDistricts.includes('haidian') ? 'haidian' : 'city';
  const r = items.filter(i => { const id = i.district ?? 'city'; if (id !== 'city' && id !== d) return false; if (identity && i.who && !i.who.includes(identity)) return false; return true; });
  const rank = (i: Item) => (i.priority ? -10 + i.priority : 0) + (i.district && i.district !== 'city' ? 0 : 1) * 2 + (i.status === 'official' ? 0 : 1);
  return r.map((x, n) => [x, n] as const).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(x => x[0]);
}
export function conclusion(stage: Stage, q: keyof Stage['q'], district: District) {
  const c = stage.q[q].conclusion; return (district === 'haidian' && c.haidian) || c.city || '待收录。';
}
