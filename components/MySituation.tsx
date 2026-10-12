'use client';
import { useCallback, useEffect, useState } from 'react';
import { UserRound, ChevronDown } from 'lucide-react';
import { IDENTITIES, DISTRICTS, Identity, District } from '@/lib/content';
import { ID_ICON, DISTRICT_ICON } from '@/lib/icons';
import { useSettings, birthMonth } from '@/lib/settings';
import Sheet from './Sheet';
export const ID_SHORT: Record<string, string> = { local: '京户有房', localNoHouse: '京户无房', nonBj: '非京户', other: '其他身份' };
export const D_SHORT: Record<string, string> = { city: '全市', haidian: '海淀', otherDistrict: '其他区' };
export function summary(s: { identity: string; district: string; birth: string }) {
  const p: string[] = []; if (s.district !== 'city') p.push(D_SHORT[s.district]); if (s.identity) p.push(ID_SHORT[s.identity]);
  if (s.birth) { const [y, m] = s.birth.split('-'); p.push(`${y}年${+m}月生`); } return p.join(' · ');
}
export default function MySituation() {
  const [s, set] = useSettings(); const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setOpen(true); window.addEventListener('jsx-open-settings', f); return () => window.removeEventListener('jsx-open-settings', f); }, []);
  const close = useCallback(() => setOpen(false), []);
  const sum = summary(s);
  const L = 'block text-sm font-semibold mb-2';
  return <>
    <button onClick={() => setOpen(true)} className="inline-flex max-w-[52vw] items-center gap-2 rounded-full border border-line bg-card py-1.5 pl-2 pr-3 text-sm shadow-card hover:border-primary sm:max-w-none" aria-haspopup="dialog">
      <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-tint text-primary"><UserRound size={14} aria-hidden />{!sum && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" aria-hidden />}</span>
      <span className="truncate">{sum || '设置我的情况'}</span><ChevronDown size={14} className="shrink-0 text-muted" aria-hidden /></button>
    <Sheet open={open} onClose={close} title="我的情况" icon={<span className="grid h-8 w-8 place-items-center rounded-sm bg-tint text-primary"><UserRound size={17} aria-hidden /></span>}
      footer={<div className="flex items-center justify-between gap-3"><p className="text-xs text-muted">只保存在本机浏览器，全站通用。</p><button onClick={close} className="btn-primary">完成</button></div>}>
      <div className="space-y-6">
        <div><span className={L}>身份</span><div role="radiogroup" aria-label="身份" className="grid grid-cols-2 gap-2">{IDENTITIES.map(([k, t, d]) => { const I = ID_ICON[k]; const on = s.identity === k; return <button key={k} role="radio" aria-checked={on} onClick={() => set({ identity: on ? '' : k as Identity })} className={`flex flex-col gap-2 rounded-md border p-3 text-left transition ${on ? 'border-primary bg-tint' : 'border-line hover:border-muted'}`}><I size={20} className={on ? 'text-primary' : 'text-muted'} aria-hidden /><span className="text-sm font-semibold leading-tight">{t}</span><span className="text-xs leading-snug text-muted">{d}</span></button>; })}</div></div>
        <div><span className={L}>区</span><div role="radiogroup" aria-label="区" className="grid grid-cols-3 gap-1 rounded-sm bg-subtle p-1">{DISTRICTS.map(([k, t]) => { const on = s.district === k; return <button key={k} role="radio" aria-checked={on} onClick={() => set({ district: k as District })} className={`inline-flex items-center justify-center gap-1 rounded-[8px] py-2 text-sm ${on ? 'bg-card font-semibold shadow-card' : 'text-muted'}`}>{k !== 'city' && <DISTRICT_ICON size={14} aria-hidden />}{t}</button>; })}</div>
          <p className="mt-2 text-xs text-muted">目前只收录了海淀区细则，其他区显示全市通则。</p></div>
        <label className="block"><span className={L}>孩子出生日期</span><input type="date" value={s.birth} onChange={e => set({ birth: e.target.value })} className="w-full" /><span className="mt-1 block text-xs text-muted">填写后，资格条件会逐条显示满足 / 不满足。</span></label>
        {s.identity && s.identity !== 'local' && <label className="flex items-center gap-3"><input type="checkbox" className="h-5 w-5" checked={s.lives} onChange={e => set({ lives: e.target.checked })} /><span className="text-sm">家庭实际住在所选区</span></label>}
        {s.identity === 'nonBj' && <div className="space-y-4 rounded-md border border-line p-4"><p className="text-sm font-semibold">非京户补充</p>
          <label className="block"><span className="mb-1 block text-sm">居住证有效期起始日</span><input type="date" value={s.permit} onChange={e => set({ permit: e.target.value })} className="w-full" /></label>
          <label className="block"><span className="mb-1 block text-sm">社保首次参保日</span><input type="date" value={s.ins} onChange={e => set({ ins: e.target.value })} className="w-full" /></label>
          <label className="flex items-center gap-3"><input type="checkbox" className="h-5 w-5" checked={s.cont} onChange={e => set({ cont: e.target.checked })} /><span className="text-sm">社保按月连续缴纳，没有断缴</span></label></div>}
        <button onClick={() => set({ identity: '', district: 'city', birth: '', permit: '', ins: '' })} className="text-sm text-muted underline">清除全部</button>
      </div>
    </Sheet>
  </>;
}
