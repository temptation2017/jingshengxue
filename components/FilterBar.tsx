'use client';
import { IDENTITIES, DISTRICTS, Identity, District } from '@/lib/content';
import { ID_ICON, DISTRICT_ICON } from '@/lib/icons';
import { useFilter } from './useFilter';
export default function FilterBar() {
  const [f, set] = useFilter();
  const IdI = f.identity ? ID_ICON[f.identity] : ID_ICON.other;
  return <div className="no-print flex flex-wrap items-center gap-2" role="group" aria-label="按身份和区筛选">
    <label className="relative flex items-center"><IdI size={16} className="pointer-events-none absolute left-3 text-muted" aria-hidden /><span className="sr-only">身份</span>
      <select className="py-1.5 pl-9 text-sm" value={f.identity} onChange={e => set({ ...f, identity: e.target.value as Identity })}><option value="">全部身份（对比）</option>{IDENTITIES.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></label>
    <div role="radiogroup" aria-label="区" className="inline-flex rounded-sm border border-line bg-card p-0.5">
      {DISTRICTS.map(([k, t]) => { const on = f.district === k; return <button key={k} role="radio" aria-checked={on} onClick={() => set({ ...f, district: k as District })} className={`inline-flex items-center gap-1 rounded-[6px] px-2.5 py-1 text-sm ${on ? 'bg-primary text-on-primary' : 'text-muted hover:text-ink'}`}>{k !== 'city' && <DISTRICT_ICON size={14} aria-hidden />}{t}</button>; })}
    </div>
  </div>;
}
