'use client';
import { IDENTITIES, DISTRICTS, Identity, District } from '@/lib/content';
import { useFilter } from './useFilter';
export default function FilterBar() {
  const [f, set] = useFilter();
  return <div className="no-print flex flex-col gap-3 border-y border-line py-3 sm:flex-row sm:items-center sm:gap-6" role="group" aria-label="按身份和区筛选">
    <label className="flex items-center gap-2"><span className="w-10 shrink-0 text-xs text-muted">身份</span><select className="flex-1 sm:flex-none" value={f.identity} onChange={e => set({ ...f, identity: e.target.value as Identity })}><option value="">全部（对比）</option>{IDENTITIES.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></label>
    <label className="flex items-center gap-2"><span className="w-10 shrink-0 text-xs text-muted">区</span><select className="flex-1 sm:flex-none" value={f.district} onChange={e => set({ ...f, district: e.target.value as District })}>{DISTRICTS.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></label>
    <span className="text-xs text-muted sm:ml-auto">选择会被记住，全站生效</span>
  </div>;
}
