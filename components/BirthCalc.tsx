'use client';
import Link from 'next/link'; import { useEffect, useState } from 'react';
import { STAGES } from '@/lib/content'; import { entryYears, YEAR_NOTE } from '@/lib/years';
export default function BirthCalc() {
  const [b, setB] = useState('');
  useEffect(() => { const s = localStorage.getItem('jsx-birth'); if (s) setB(s); }, []);
  const ok = /^\d{4}-\d{2}$/.test(b); const ys = ok ? entryYears(b) : null;
  const now = new Date(); const nowIdx = now.getFullYear() * 12 + now.getMonth();
  const nextKey = ys ? STAGES.find(s => ys[s.key] * 12 + 8 > nowIdx)?.key : undefined;
  return <div>
    <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"><span className="font-semibold">孩子出生年月</span>
      <input type="month" min="2008-01" max="2027-12" value={b} onChange={e => { setB(e.target.value); localStorage.setItem('jsx-birth', e.target.value); }} className="sm:w-56" /></label>
    <ol className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-5">
      {STAGES.map((s, i) => { const nx = s.key === nextKey; return <li key={s.key} className="bg-bg"><Link href={`/stage/${s.key}/`} className={`relative block h-full p-5 no-underline text-ink hover:bg-subtle ${nx ? 'outline outline-2 -outline-offset-2 outline-primary' : ''}`}>
        <span className="text-xs text-muted tabular-nums">{i + 1}</span>
        <span className="mt-2 block font-semibold">{s.name}</span>
        <span className="block text-xs text-muted">{s.age}</span>
        <span className="mt-4 block text-lg tabular-nums">{ys ? `${s.key === 'gaokao' ? ys[s.key] + ' 年 6 月' : ys[s.key] + ' 年 9 月'}` : '—'}</span>
        {nx && <span className="mt-1 block text-xs font-semibold text-primary">下一站</span>}
      </Link></li>; })}
    </ol>
    <p className="mt-3 text-xs text-muted">{ys ? YEAR_NOTE : '输入后显示各学段入学年份（不保存到任何服务器）。'}</p>
  </div>;
}
