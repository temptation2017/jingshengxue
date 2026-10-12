'use client';
import Link from 'next/link'; import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { STAGES } from '@/lib/content';
export default function StageMenu() {
  const [open, setOpen] = useState(false); const ref = useRef<HTMLDivElement>(null); const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { const f = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); document.addEventListener('click', f); document.addEventListener('keydown', k); return () => { document.removeEventListener('click', f); document.removeEventListener('keydown', k); }; }, []);
  return <div ref={ref} className="relative">
    <button aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)} className="rounded-sm px-2 py-1 text-ink hover:bg-subtle">学段 <span aria-hidden className="text-xs text-muted">▾</span></button>
    {open && <ul className="absolute left-0 z-50 mt-2 w-48 rounded-md border border-line bg-bg p-1 shadow-pop">{STAGES.map((s, i) => <li key={s.key}><Link href={`/stage/${s.key}/`} className="flex gap-3 rounded-sm px-3 py-2 text-ink no-underline hover:bg-subtle"><span className="text-xs text-muted tabular-nums w-3">{i + 1}</span>{s.name}</Link></li>)}</ul>}
  </div>;
}
