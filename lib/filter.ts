import { Item, Stage, Identity, District } from './content';
export function visible(items: Item[], identity: Identity | '', district: District, stage: Stage) {
  const d = district === 'haidian' && stage.detailDistricts.includes('haidian') ? 'haidian' : 'city';
  return items.filter(i => { const id = i.district ?? 'city'; if (id !== 'city' && id !== d) return false; if (identity && i.who && !i.who.includes(identity)) return false; return true; });
}
export function conclusion(stage: Stage, q: keyof Stage['q'], district: District) {
  const c = stage.q[q].conclusion; return (district === 'haidian' && c.haidian) || c.city || '待收录。';
}
