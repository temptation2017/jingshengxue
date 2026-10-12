'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MARK, Mark, EXT_ICON } from '@/lib/icons';
import { src, Item } from '@/lib/content';
export function Badge({ m, compact }: { m: Mark; compact?: boolean }) {
  const [I, t, c] = MARK[m];
  return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${c}`}><I size={14} strokeWidth={2} aria-hidden />{compact ? <span className="sr-only">{t}</span> : t}</span>;
}
export function More({ n, children }: { n: number; children: React.ReactNode }) {
  const [o, setO] = useState(false);
  if (n <= 0) return null;
  return <div className="mt-3">{o && children}<button onClick={() => setO(!o)} aria-expanded={o} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ChevronDown size={16} className={`transition ${o ? 'rotate-180' : ''}`} aria-hidden />{o ? '收起' : `展开更多（${n}）`}</button></div>;
}
export function Sources({ items }: { items: Item[] }) {
  const ids = Array.from(new Set(items.map(i => i.source).filter(Boolean))) as string[];
  const [o, setO] = useState(false);
  if (!ids.length) return null;
  const quotes = items.filter(i => i.quote);
  return <div className="mt-6 rounded-md border border-line bg-subtle/60 px-4 py-3 text-sm">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span className="font-semibold text-muted">出处</span>
      {ids.map(id => { const s = src(id); return <a key={id} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 no-underline hover:underline">{s.title.length > 26 ? s.title.slice(0, 26) + '…' : s.title}<EXT_ICON size={13} aria-hidden /></a>; })}
      {quotes.length > 0 && <button onClick={() => setO(!o)} aria-expanded={o} className="ml-auto text-sm font-semibold text-primary">{o ? '收起原话' : `看原话（${quotes.length}）`}</button>}</div>
    {o && <ul className="mt-3 space-y-2 border-t border-line pt-3">{quotes.map(q => <li key={q.text} className="text-ink">「{q.quote}」<span className="text-xs text-muted"> —— {src(q.source!).issuer}</span></li>)}</ul>}
    <p className="mt-1 text-xs text-muted">核对日期 2026-10-12</p>
  </div>;
}
