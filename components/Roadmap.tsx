'use client';
import Link from 'next/link';
import { useProfile } from './useProfile';
import { yearRows, nextMilestone, entryYears, HUKOU_LABEL, HOUSING_LABEL, LS } from '@/lib/roadmap';
import { plan } from '@/lib/guide';
import { Chip } from './ui';
import StarterPath from './StarterPath';
export default function Roadmap() {
  const p = useProfile();
  if (p === undefined) return <div className="card h-40 animate-pulse" />;
  if (!p) return <StarterPath />;
  const now = new Date(); const rows = yearRows(p, now); const { m, monthsLeft, all } = nextMilestone(p, now); const e = entryYears(p); const pl = plan(p, m);
  const tone = { ok: 'ok', conditional: 'warn', gap: 'gap', unknown: 'info' } as const;
  return (<div className="space-y-6">
    <div className="flex flex-wrap gap-2 text-sm"><Chip tone="info">出生 {p.birth}</Chip><Chip tone="info">{p.district === 'haidian' ? '海淀区' : '其他区'}</Chip><Chip tone="info">{HUKOU_LABEL[p.hukou]}</Chip><Chip tone="info">{HOUSING_LABEL[p.housing]}</Chip>
      <button className="chip bg-surface border border-line text-muted hover:text-ink" onClick={() => { localStorage.removeItem(LS.profile); location.href = '/jingshengxue/start/'; }}>修改答案</button></div>
    <section className="card overflow-hidden"><div className="bg-accent p-5 text-accent-ink"><p className="text-sm opacity-90">下一件大事</p><p className="mt-1 text-2xl font-bold">{m.title}</p>
      <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-bold tabular-nums">{monthsLeft}</span><span className="pb-1">个月后 · {m.whenText}</span></div></div>
      <div className="p-5"><div className="flex items-center gap-2"><Chip tone={tone[pl.verdict]}>{pl.verdictText}</Chip></div>
        {m.caveat && <p className="mt-3 rounded-xl bg-warn-soft p-3 text-sm text-warn">⚠ {m.caveat}</p>}
        <Link href="/guide/" className="btn-primary mt-4 w-full">看分步行动清单（{pl.steps.length || '入口'}）→</Link></div></section>
    <section><h2 className="mb-3 text-xl font-bold">五个关键节点</h2>
      <ol className="grid gap-2 sm:grid-cols-5">{all.map(x => { const past = x.y * 12 + x.m < now.getFullYear() * 12 + now.getMonth() + 1; const cur = x.key === m.key; return (
        <li key={x.key} className={`rounded-2xl border p-3 text-sm ${cur ? 'border-accent bg-soft' : 'border-line bg-surface'} ${past ? 'opacity-60' : ''}`}><p className="font-bold tabular-nums">{x.y}.{String(x.m).padStart(2, '0')}</p><p>{x.title}</p>{past && <p className="text-xs text-muted">已过</p>}</li>); })}</ol></section>
    <section><h2 className="mb-1 text-xl font-bold">逐年路线图</h2><p className="mb-4 text-sm text-muted">学年从每年 9 月开始。小班 {e.kg} 年、一年级 {e.primary} 年起的推算依据：2026 年官方出生日期窗口（8 月 31 日划线）。</p>
      <ol className="relative ml-3 border-l-2 border-line">{rows.map((r, idx) => { const node = all.find(x => x.schoolYear === r.schoolYear + 1 || (x.stage === 'university' && x.y === r.schoolYear)); const isNow = idx === 0; return (
        <li key={r.schoolYear} className="relative mb-4 pl-6">
          <span aria-hidden className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${isNow ? 'border-accent bg-accent' : 'border-line bg-surface'}`} />
          <div className={`rounded-2xl p-3 ${isNow ? 'bg-soft' : ''}`}><p className="text-sm text-muted tabular-nums">{r.schoolYear}–{r.schoolYear + 1} 学年 · 约 {r.age} 岁 {isNow && <strong className="text-accent">· 现在</strong>}</p>
            <p className="font-semibold">{r.label}</p>{node && node.stage !== 'university' && <p className="text-sm text-muted">本学年下半年：{node.title}</p>}{node && node.stage === 'university' && <p className="text-sm text-muted">{node.title}（{node.y} 年 10–11 月）</p>}</div></li>); })}</ol></section>
  </div>);
}
