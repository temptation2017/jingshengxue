'use client';
import Link from 'next/link'; import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { STAGES } from '@/lib/content'; import { STAGE_ICON } from '@/lib/icons'; import { entryYears, YEAR_NOTE } from '@/lib/years';
export function useBirth(): [string, (b: string) => void] { const [b, setB] = useState(''); useEffect(() => { const s = localStorage.getItem('jsx-birth'); if (s) setB(s); }, []); return [b, (x: string) => { setB(x); localStorage.setItem('jsx-birth', x); }]; }
export function BirthInput() {
  const [b, setB] = useBirth();
  useEffect(() => { const f = () => setB(localStorage.getItem('jsx-birth') || ''); window.addEventListener('jsx-birth', f); return () => window.removeEventListener('jsx-birth', f); }, []); // eslint-disable-line
  return <label className="flex w-full max-w-md items-center gap-3 rounded-md border border-line bg-card p-2 pl-4 shadow-card"><CalendarDays size={20} className="shrink-0 text-primary" aria-hidden /><span className="shrink-0 text-sm font-semibold">孩子出生年月</span>
    <input type="month" min="2008-01" max="2027-12" value={b} onChange={e => { setB(e.target.value); window.dispatchEvent(new Event('jsx-birth')); }} className="min-w-0 flex-1 border-0 bg-transparent" /></label>;
}
export function StageLine() {
  const [b, setB] = useBirth();
  useEffect(() => { const f = () => setB(localStorage.getItem('jsx-birth') || ''); window.addEventListener('jsx-birth', f); return () => window.removeEventListener('jsx-birth', f); }, []); // eslint-disable-line
  const ys = /^\d{4}-\d{2}$/.test(b) ? entryYears(b) : null; const now = new Date(); const ni = now.getFullYear() * 12 + now.getMonth();
  const nx = ys ? STAGES.find(s => ys[s.key] * 12 + 8 > ni)?.key : undefined;
  return <div>
    <ol className="relative grid grid-cols-1 gap-3 sm:grid-cols-5">
      <span aria-hidden className="absolute left-6 top-0 h-full w-px bg-line sm:left-0 sm:top-7 sm:h-px sm:w-full" />
      {STAGES.map((s, i) => { const I = STAGE_ICON[s.key]; const on = s.key === nx; return <li key={s.key} className="relative">
        <Link href={`/stage/${s.key}/`} className={`card flex items-center gap-3 p-3 no-underline text-ink transition hover:-translate-y-0.5 hover:shadow-pop sm:flex-col sm:items-start sm:p-4 ${on ? 'border-primary ring-2 ring-primary/30' : ''}`}>
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${on ? 'bg-primary text-on-primary' : 'bg-tint text-primary'}`}><I size={22} aria-hidden /></span>
          <span className="min-w-0 flex-1"><span className="flex items-center gap-2 font-semibold">{s.name}{on && <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] text-on-primary">下一站</span>}</span>
            <span className="block text-xs text-muted">{i + 1} · {s.age}</span></span>
          <span className="text-lg font-semibold tabular-nums sm:mt-1">{ys ? (s.key === 'gaokao' ? `${ys[s.key]}.06` : `${ys[s.key]}.09`) : '—'}</span>
        </Link></li>; })}
    </ol>
    <p className="mt-3 text-xs text-muted">{ys ? YEAR_NOTE : '输入出生年月后，显示各学段入学时间（只在本机计算）。'}</p>
  </div>;
}
