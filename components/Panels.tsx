'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Item, Stage, IDENTITIES, src } from '@/lib/content';
import { MARK, Mark, matIcon, ID_ICON, ENTRY_ICON, EXT_ICON } from '@/lib/icons';
import { Badge, More } from './bits';
const MAX = 4;
const markOf = (i: Item): Mark => i.status === 'official' ? 'official' : i.status;
function Row({ it, m, why }: { it: Item; m: Mark; why?: string }) {
  const [I, , c] = MARK[m];
  return <li className="flex items-start gap-3 py-3"><span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${c}`}><I size={16} aria-hidden /></span>
    <div className="min-w-0 flex-1"><p className="text-base">{it.text}{it.status === 'not_stated' && '——官方未写明'}{it.status === 'pending' && '——待收录'}</p>{why && <p className="text-sm text-muted">{why}</p>}</div><Badge m={m} /></li>;
}
export function Elig({ items, stage, showCompare, judged }: { items: Item[]; stage: Stage; showCompare: boolean; judged?: Map<Item, [Mark, string]> }) {
  const list = items.filter(i => !i.date);
  const r = (it: Item) => { const j = judged?.get(it); return <Row key={it.text} it={it} m={j ? j[0] : markOf(it)} why={j?.[1]} />; };
  return <div>
    {showCompare && stage.compare && <div className="mb-4 grid gap-2 sm:grid-cols-2">{IDENTITIES.map(([k, t]) => { const I = ID_ICON[k]; return <div key={k} className="flex gap-3 rounded-md border border-line bg-subtle/50 p-3"><I size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden /><div><p className="text-sm font-semibold">{t}</p><p className="text-sm text-muted">{stage.compare![k] ?? '官方未写明'}</p></div></div>; })}</div>}
    <ul className="divide-y divide-line">{list.slice(0, MAX).map(r)}</ul>
    <More n={list.length - MAX}><ul className="divide-y divide-line border-t border-line">{list.slice(MAX).map(r)}</ul></More>
  </div>;
}
export function Alloc({ items }: { items: Item[] }) {
  const steps = items.filter(i => i.status === 'official'); const rest = items.filter(i => i.status !== 'official');
  const node = (it: Item, n: number, last: boolean) => <li key={it.text} className="relative flex gap-4 pb-5 last:pb-0">
    {!last && <span aria-hidden className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-line" />}
    <span className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-primary bg-card text-sm font-bold text-primary">{n}</span>
    <p className="pt-1">{it.text}</p></li>;
  return <div>
    <ol>{steps.slice(0, MAX).map((it, i) => node(it, i + 1, i === Math.min(MAX, steps.length) - 1))}</ol>
    <More n={steps.length - MAX + rest.length}><ol className="mt-2">{steps.slice(MAX).map((it, i) => node(it, MAX + i + 1, i === steps.length - MAX - 1))}</ol>
      <ul className="mt-3 divide-y divide-line">{rest.map(it => <Row key={it.text} it={it} m={markOf(it)} />)}</ul></More>
    {rest.length > 0 && steps.length <= MAX && <ul className="mt-3 divide-y divide-line border-t border-line">{rest.map(it => <Row key={it.text} it={it} m={markOf(it)} />)}</ul>}
  </div>;
}
export function Mats({ items, stageKey }: { items: Item[]; stageKey: string }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const mats = items.filter(i => i.material); const notes = items.filter(i => !i.material);
  return <div>
    {mats.length > 0 ? <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">{mats.map(it => { const I = matIcon(it.text); const k = stageKey + it.text; const on = !!done[k]; return <li key={k}>
      <label className={`flex h-full cursor-pointer flex-col gap-3 rounded-md border p-3 transition ${on ? 'border-primary bg-tint' : 'border-line bg-card hover:border-muted'}`}>
        <span className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-sm bg-tint text-primary"><I size={20} aria-hidden /></span><input type="checkbox" className="h-5 w-5 accent-[rgb(var(--primary))]" checked={on} onChange={() => setDone({ ...done, [k]: !on })} /></span>
        <span className="text-sm font-medium leading-snug">{it.text}</span></label></li>; })}</ul>
    : <p className="text-muted">没有可列出的统一材料清单。</p>}
    {notes.length > 0 && <ul className="mt-4 divide-y divide-line border-t border-line">{notes.slice(0, 3).map(it => <Row key={it.text} it={it} m={markOf(it)} />)}</ul>}
  </div>;
}
export function When({ items, stage }: { items: Item[]; stage: Stage }) {
  const dates = items.filter(i => i.date); const notes = items.filter(i => !i.date);
  const N = 5;
  const tl = (arr: Item[]) => <ol className="relative grid gap-4 md:grid-flow-col md:auto-cols-fr md:gap-3">
    {arr.map((it, i) => <li key={it.text} className="relative flex gap-3 md:flex-col md:gap-2">
      <span aria-hidden className={`absolute left-[11px] top-6 h-[calc(100%+0.5rem)] w-px bg-line md:left-6 md:top-[11px] md:h-px md:w-[calc(100%+0.75rem)] ${i === arr.length - 1 ? 'hidden' : ''}`} />
      <span className={`z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${it.status === 'official' ? 'bg-primary text-on-primary' : 'bg-pend-bg text-pend'}`}><span className="h-2 w-2 rounded-full bg-current" /></span>
      <p className="text-sm">{it.status === 'pending' && <span className="mr-1"><Badge m="pending" compact /></span>}{it.text}</p></li>)}
  </ol>;
  return <div className="space-y-5">
    {dates.length > 0 ? <>{tl(dates.slice(0, N))}<More n={dates.length - N}><div className="pt-2">{tl(dates.slice(N))}</div></More></> : <p className="text-muted">时间线待收录。</p>}
    <div className="rounded-lg border border-primary/30 bg-tint p-4">
      <div className="flex items-center gap-2 font-semibold"><ENTRY_ICON size={18} className="text-primary" aria-hidden />官方入口</div>
      <div className="mt-3 flex flex-wrap gap-2">{stage.entries.map((e, i) => { const s = src(e); return <a key={e} href={s.url} target="_blank" rel="noopener noreferrer" className={i === 0 ? 'btn-primary' : 'btn-ghost'}>{s.title.length > 18 ? s.title.slice(0, 18) + '…' : s.title}<EXT_ICON size={15} aria-hidden /></a>; })}</div>
      {notes.length > 0 && <ul className="mt-3 space-y-1 text-sm text-muted">{notes.map(n => <li key={n.text}>{n.text}</li>)}</ul>}
    </div>
  </div>;
}
export const ArrowSep = () => <ArrowRight size={14} aria-hidden />;
