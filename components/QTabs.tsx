'use client';
import { useEffect, useRef, useState } from 'react';
import { QUESTIONS, QKey } from '@/lib/content';
import { Q_ICON } from '@/lib/icons';
export function useHashTab(): [QKey, (k: QKey) => void] {
  const [t, setT] = useState<QKey>('eligibility');
  useEffect(() => { const r = () => { const h = location.hash.slice(1) as QKey; if (QUESTIONS.some(q => q[0] === h)) setT(h); }; r(); window.addEventListener('hashchange', r); return () => window.removeEventListener('hashchange', r); }, []);
  return [t, (k: QKey) => { history.replaceState(null, '', '#' + k); setT(k); }];
}
export default function QTabs({ tab, set, idp }: { tab: QKey; set: (k: QKey) => void; idp: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, i: number) => { const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? 3 : -9; if (n === -9) return; e.preventDefault(); const j = (n + 4) % 4; set(QUESTIONS[j][0]); refs.current[j]?.focus(); };
  return <div role="tablist" aria-label="四个问题" className="no-scrollbar grid grid-cols-4 gap-1 rounded-md bg-subtle p-1">
    {QUESTIONS.map(([k, t], i) => { const I = Q_ICON[k]; const on = tab === k; return <button key={k} ref={el => { refs.current[i] = el; }} role="tab" id={`${idp}-tab-${k}`} aria-controls={`${idp}-panel`} aria-selected={on} tabIndex={on ? 0 : -1} onClick={() => set(k)} onKeyDown={e => key(e, i)}
      className={`flex flex-col items-center gap-1 rounded-sm px-1 py-2 text-xs transition sm:flex-row sm:justify-center sm:gap-2 sm:text-sm ${on ? 'bg-card font-semibold text-ink shadow-card' : 'text-muted hover:text-ink'}`}>
      <span className="flex items-center gap-1"><span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${on ? 'bg-primary text-on-primary' : 'bg-line text-muted'}`}>{i + 1}</span><I size={16} aria-hidden /></span>{t}</button>; })}
  </div>;
}
