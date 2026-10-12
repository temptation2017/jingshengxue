'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from './useProfile';
import { nextMilestone, LS } from '@/lib/roadmap';
import { plan } from '@/lib/guide';
import { Basis, Chip } from './ui';
import StarterPath from './StarterPath';
export default function Guide() {
  const p = useProfile();
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(LS.done) || '{}')); } catch {} }, []);
  if (p === undefined) return <div className="card h-40 animate-pulse" />;
  if (!p) return <StarterPath />;
  const { m, monthsLeft } = nextMilestone(p, new Date()); const pl = plan(p, m);
  const key = (id: string) => `${m.key}:${id}`;
  const toggle = (id: string) => { const n = { ...done, [key(id)]: !done[key(id)] }; setDone(n); localStorage.setItem(LS.done, JSON.stringify(n)); };
  const n = pl.steps.filter(s => done[key(s.id)]).length; const pct = pl.steps.length ? Math.round((n / pl.steps.length) * 100) : 0;
  return (<div className="space-y-5">
    <div className="card p-5"><p className="text-sm text-muted">当前节点 · 还有 {monthsLeft} 个月</p><h2 className="text-2xl font-bold">{m.title}</h2><p className="text-muted">{m.whenText}</p>
      <div className="mt-3"><Chip tone={pl.verdict === 'gap' ? 'gap' : pl.verdict === 'unknown' ? 'info' : pl.verdict === 'ok' ? 'ok' : 'warn'}>{pl.verdictText}</Chip></div>
      {pl.steps.length > 0 && <div className="mt-4"><div className="flex justify-between text-sm"><span>完成 {n} / {pl.steps.length}</span><span className="tabular-nums">{pct}%</span></div>
        <div className="mt-1 h-2.5 rounded-pill bg-sunken" role="progressbar" aria-label="行动清单进度" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div className="h-2.5 rounded-pill bg-accent transition-all duration-500" style={{ width: `${pct}%` }} /></div></div>}</div>
    {pl.notes.map(t => <p key={t} className="rounded-2xl bg-warn-soft p-3 text-sm text-warn">⚠ {t}</p>)}
    {pl.steps.length > 0 ? <ol className="space-y-3">{pl.steps.map((s, i) => { const on = !!done[key(s.id)]; return (
      <li key={s.id} className={`card p-4 transition ${on ? 'opacity-70' : ''}`}><div className="flex gap-3">
        <input id={s.id} type="checkbox" checked={on} onChange={() => toggle(s.id)} className="mt-1 h-6 w-6 shrink-0 accent-[rgb(var(--accent))]" />
        <div className="min-w-0 flex-1"><label htmlFor={s.id} className="cursor-pointer"><span className="text-sm font-semibold text-accent">第 {i + 1} 步 · {s.when}</span><span className={`block text-lg font-semibold ${on ? 'line-through' : ''}`}>{s.title}</span></label>
          <p className="mt-1 text-muted">{s.detail}</p>
          {s.materials && <div className="mt-2 flex flex-wrap gap-1.5">{s.materials.map(x => <Chip key={x} tone="info">📎 {x}</Chip>)}</div>}
          {s.entry && <a className="mt-2 inline-block font-medium" href={s.entry.href} target="_blank" rel="noopener noreferrer">去办理：{s.entry.label} ↗</a>}
          {s.basis && <Basis text={s.basis.text} src={s.basis.src} />}</div></div></li>); })}</ol>
    : <div className="card p-5"><h3 className="font-bold">请直接查看官方入口</h3><ul className="mt-2 space-y-1">{pl.entries.map(x => <li key={x.href}><a href={x.href} target="_blank" rel="noopener noreferrer">{x.label} ↗</a></li>)}</ul></div>}
    <div className="flex flex-col gap-3 sm:flex-row"><Link href="/roadmap/" className="btn-ghost flex-1">← 回到路线图</Link><Link href={`/learn/${m.stage}/`} className="btn-ghost flex-1">这一阶段怎么运作</Link></div>
    <p className="text-xs text-muted">勾选进度只保存在本机浏览器。结果仅为辅助判断，不构成录取承诺。</p>
  </div>);
}
