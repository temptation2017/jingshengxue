'use client';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { PanelRightOpen, Printer, Sparkles, ArrowRight, Info } from 'lucide-react';
import { stageByKey, STAGES, QUESTIONS, IDENTITIES, src, Item, QKey, Stage, RETRIEVED } from '@/lib/content';
import { STAGE_ICON, Q_ICON, ID_ICON, MARK, Mark, matIcon, ENTRY_ICON, EXT_ICON } from '@/lib/icons';
import { visible, conclusion } from '@/lib/filter';
import { useSettings, openSettings } from '@/lib/settings';
import { judge } from '@/lib/judge';
import { nextNode } from '@/lib/nodes';
import { summary } from './MySituation';
import Sheet from './Sheet';
const Q_TONE: Record<QKey, string> = { eligibility: 'bg-tint text-primary', allocation: 'bg-[#EEF0FB] text-[#4453A6] dark:bg-[#22264a] dark:text-[#A9B4FF]', materials: 'bg-accent-bg text-accent', when: 'bg-[#F3EEFA] text-[#7A4CB0] dark:bg-[#2f2440] dark:text-[#C9A8F5]' };
const markOf = (i: Item): Mark => i.status === 'official' ? 'official' : i.status;
function Badge({ m, label }: { m: Mark; label?: string }) { const [I, t, c] = MARK[m]; return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${c}`}><I size={13} aria-hidden />{label ?? t}</span>; }
function Dot({ m }: { m: Mark }) { const [I, t, c] = MARK[m]; return <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${c}`} title={t}><I size={14} aria-hidden /><span className="sr-only">{t}</span></span>; }
const layer = (i: Item) => i.district === 'haidian' ? '海淀细则' : '全市通则';
function Sources({ items }: { items: Item[] }) {
  const ids = Array.from(new Set(items.map(i => i.source).filter(Boolean))) as string[];
  if (!ids.length) return null;
  return <div className="mt-6 border-t border-line pt-4"><p className="text-xs font-semibold text-muted">出处 · 核对 {RETRIEVED}</p><ul className="mt-2 space-y-1.5">{ids.map(id => { const s = src(id); return <li key={id}><a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-sm">{s.title}<EXT_ICON size={13} className="mt-1 shrink-0" aria-hidden /></a><span className="block text-xs text-muted">{s.issuer}</span></li>; })}</ul></div>;
}
export default function Dashboard({ k }: { k: string }) {
  const s = stageByKey(k); const [st, , ready] = useSettings(); const [open, setOpen] = useState<QKey | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const node = nextNode(s.key, st.birth, st.identity);
  const items = useMemo(() => Object.fromEntries(QUESTIONS.map(([q]) => [q, visible(s.q[q].items, st.identity, st.district, s)])) as Record<QKey, Item[]>, [s, st.identity, st.district]);
  const jm = useMemo(() => { const m = new Map<Item, [Mark, string]>(); if (node && st.identity) items.eligibility.filter(i => !i.date).forEach(it => m.set(it, judge(it, node.Y, { identity: st.identity as any, lives: st.lives, permit: st.permit, ins: st.ins, cont: st.cont, birth: st.birth }))); return m; }, [items, node, st]);
  const I = STAGE_ICON[s.key]; const sum = summary(st);
  const noDetail = st.district === 'otherDistrict' || (st.district === 'haidian' && !s.detailDistricts.includes('haidian'));
  const firstDate = items.when.find(i => i.date && i.status === 'official');
  const who = sum ? sum.split(' · ').filter(x => !x.includes('生')).join('') || '全市通则' : '全市通则';
  const elig = items.eligibility.filter(i => !i.date); const marks = elig.map(i => jm.get(i)?.[0] ?? markOf(i));
  const nYes = marks.filter(m => m === 'yes').length, nNo = marks.filter(m => m === 'no').length;
  const eligBadge: [Mark, string] = jm.size ? (nNo ? ['no', `${nNo} 项不满足`] : ['yes', `${nYes}/${marks.length} 满足`]) : ['official', `${elig.filter(i => i.status === 'official').length} 条官方`];
  const mats = items.materials.filter(i => i.material);
  if (!ready) return <div className="mx-auto max-w-6xl px-4 pt-6"><div className="h-[600px] animate-pulse rounded-xl bg-subtle" /></div>;
  const Card = ({ q, badge, children }: { q: QKey; badge?: React.ReactNode; children: React.ReactNode }) => { const QI = Q_ICON[q]; const qi = QUESTIONS.findIndex(x => x[0] === q); const n = q === 'materials' ? mats.length || items[q].length : items[q].length; return (
    <section aria-labelledby={`h-${q}`} className="card flex flex-col p-4 sm:p-5">
      <div className="flex items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-sm ${Q_TONE[q]}`}><QI size={18} aria-hidden /></span><h2 id={`h-${q}`} className="flex-1 text-lg font-semibold"><span className="mr-1.5 text-muted">{qi + 1}</span>{QUESTIONS[qi][1]}</h2>{badge}</div>
      <div className="mt-3 flex-1">{children}</div>
      <button onClick={() => setOpen(q)} className="mt-3 inline-flex items-center gap-1.5 self-start rounded-sm px-2 py-1 -ml-2 text-sm font-semibold text-primary hover:bg-tint"><PanelRightOpen size={15} aria-hidden />详情 · 共 {items[q].length} 条</button>
    </section>); };
  const Line = ({ it }: { it: Item }) => { const j = jm.get(it); return <li className="flex gap-2.5 py-1.5"><Dot m={j ? j[0] : markOf(it)} /><span className="clamp2 text-sm leading-6">{it.text}{it.status === 'not_stated' && '——官方未写明'}{it.status === 'pending' && '——待收录'}</span></li>; };
  return <div className="mx-auto max-w-6xl px-4 pb-4 pt-4 sm:pt-5">
    <nav aria-label="学段" className="no-print no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">{STAGES.map(x => { const XI = STAGE_ICON[x.key]; const on = x.key === s.key; return <Link key={x.key} href={`/stage/${x.key}/`} aria-current={on ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm no-underline transition ${on ? 'border-primary bg-primary text-on-primary' : 'border-line bg-card text-ink hover:border-primary'}`}><XI size={15} aria-hidden />{x.short}</Link>; })}</nav>
    <section className="mt-4 overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-primary text-on-primary"><I size={24} aria-hidden /></span>
          <div className="min-w-0"><h1 className="text-sm font-semibold text-muted">{s.name} · {s.age}</h1>
            <p className="mt-0.5 text-xl font-semibold leading-snug"><span className="text-primary">{who}</span>：{s.brief}{node ? (node.left > 0 ? `，下一个节点 ${node.y} 年 ${node.m} 月` : `（${node.Y} 年这一站已过）`) : ''}。</p>
            <p className="mt-1 text-xs text-muted">{s.schoolYear} · 核对 {RETRIEVED}{node?.estimated && ' · 年份按 2026 年口径推算，以当年文件为准'}</p></div>
        </div>
        {node && <div className="flex shrink-0 gap-6 border-t border-line pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <div><p className="text-xs text-muted">{s.key === 'gaokao' ? '高考年份' : '入学年份'}</p><p className="text-2xl font-bold tabular-nums">{node.Y}</p></div>
          <div><p className="text-xs text-muted">距 {node.label}</p><p className="text-2xl font-bold tabular-nums text-accent">{node.left > 0 ? <>{node.left}<span className="ml-1 text-sm font-semibold">个月</span></> : <span className="text-lg">已过</span>}</p></div>
        </div>}
      </div>
      {(!st.identity || noDetail) && <div className="flex flex-wrap items-center gap-2 border-t border-line bg-accent-bg/60 px-4 py-2.5 text-sm sm:px-5">
        {!st.identity ? <><Sparkles size={16} className="text-accent" aria-hidden /><span>选一下你的情况，结果会更准。当前显示全市通则。</span><button onClick={openSettings} className="ml-auto inline-flex items-center gap-1 font-semibold text-accent">设置我的情况<ArrowRight size={14} aria-hidden /></button></>
          : <><Info size={16} className="text-accent" aria-hidden /><span>{st.district === 'otherDistrict' ? '本区' : '海淀'}细则待收录，下面显示全市通则。</span></>}
      </div>}
    </section>
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <Card q="eligibility" badge={<Badge m={eligBadge[0]} label={eligBadge[1]} />}><ul>{elig.slice(0, 3).map(it => <Line key={it.text} it={it} />)}</ul>{!st.birth && st.identity && <button onClick={openSettings} className="mt-1 text-xs text-muted underline">填出生日期，逐条判断</button>}</Card>
      <Card q="allocation"><ol className="space-y-2">{items.allocation.filter(i => i.status === 'official').slice(0, 3).map((it, n) => <li key={it.text} className="flex gap-2.5"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-[#4453A6] text-xs font-bold text-[#4453A6] dark:border-[#A9B4FF] dark:text-[#A9B4FF]">{n + 1}</span><span className="clamp2 text-sm leading-6">{it.text}</span></li>)}</ol></Card>
      <Card q="materials" badge={mats.length ? <span className="text-xs text-muted">{mats.length} 项</span> : undefined}>
        {mats.length ? <ul className="grid grid-cols-3 gap-2">{mats.slice(0, 3).map(it => { const MI = matIcon(it.text); return <li key={it.text} className="flex flex-col items-start gap-2 rounded-sm bg-subtle p-2.5"><MI size={18} className="text-accent" aria-hidden /><span className="clamp2 text-xs leading-5">{it.text}</span></li>; })}</ul> : null}
        <ul className={mats.length ? 'mt-1' : ''}>{items.materials.filter(i => !i.material).slice(0, mats.length ? 1 : 3).map(it => <Line key={it.text} it={it} />)}</ul></Card>
      <Card q="when">
        {(() => { const d = items.when.filter(i => i.date); const first = d[0]; const E0 = src(s.entries[0]); return <div className="space-y-3">
          {first && <div className="flex gap-3 rounded-sm bg-subtle p-3"><span className="text-xs font-semibold text-accent">{first.status === 'pending' ? '待发布' : '最近'}</span><span className="clamp2 text-sm leading-6">{first.text}</span></div>}
          {d[1] && <p className="clamp2 px-1 text-sm leading-6 text-muted">接着：{d[1].text}</p>}
          <a href={E0.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-sm bg-primary px-3 py-2.5 text-sm font-semibold text-on-primary no-underline hover:opacity-90"><ENTRY_ICON size={17} className="shrink-0" aria-hidden /><span className="flex-1 leading-snug">{E0.title}</span><EXT_ICON size={15} className="shrink-0" aria-hidden /></a>
        </div>; })()}
      </Card>
    </div>
    <p className="mt-4 text-xs text-muted">{s.summary}</p>
    {QUESTIONS.map(([q, t]) => { const QI = Q_ICON[q]; const all = items[q]; return <Sheet key={q} open={open === q} onClose={close} title={t} icon={<span className={`grid h-8 w-8 place-items-center rounded-sm ${Q_TONE[q]}`}><QI size={17} aria-hidden /></span>}
      footer={q === 'materials' && mats.length ? <button onClick={() => { document.body.classList.add('print-mats'); window.print(); document.body.classList.remove('print-mats'); }} className="btn-ghost w-full"><Printer size={16} aria-hidden />打印材料清单</button> : undefined}>
      <p className="font-semibold">{conclusion(s, q, st.district)}</p>
      {q === 'eligibility' && !st.identity && s.compare && <div className="mt-4 grid gap-2">{IDENTITIES.map(([id, name]) => { const II = ID_ICON[id]; return <div key={id} className="flex gap-3 rounded-sm bg-subtle p-3"><II size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden /><div><p className="text-sm font-semibold">{name}</p><p className="text-sm text-muted">{s.compare![id] ?? '官方未写明'}</p></div></div>; })}</div>}
      {q === 'materials' && mats.length > 0 && <div id="mats-print" className="mt-4"><p className="mb-2 hidden text-lg font-semibold print:block">{s.name} 材料清单（{who}）</p><ul className="space-y-2">{mats.map(it => { const MI = matIcon(it.text); return <li key={it.text}><label className="flex items-center gap-3 rounded-sm border border-line p-3"><input type="checkbox" className="h-5 w-5 accent-[rgb(var(--primary))]" /><MI size={18} className="shrink-0 text-accent" aria-hidden /><span className="text-sm">{it.text}</span></label></li>; })}</ul></div>}
      <ul className="mt-4 divide-y divide-line">{all.filter(i => q !== 'materials' || !i.material).map(it => { const j = jm.get(it); return <li key={it.text} className="py-3"><div className="flex items-start gap-3"><Dot m={j ? j[0] : markOf(it)} /><div className="min-w-0 flex-1"><p className="text-sm leading-6">{it.text}{it.status === 'not_stated' && '——官方未写明'}</p>{j?.[1] && <p className="text-xs text-muted">{j[1]}</p>}
        {it.quote && <p className="mt-1 border-l-2 border-line pl-2 text-xs text-muted">「{it.quote}」</p>}
        <span className="mt-1 inline-block rounded-full bg-subtle px-2 py-0.5 text-[11px] text-muted">{layer(it)}</span></div></div></li>; })}</ul>
      {q === 'when' && <div className="mt-4 space-y-2"><p className="text-sm font-semibold">官方入口</p>{s.entries.map((e, n) => { const E = src(e); return <a key={e} href={E.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm no-underline ${n === 0 ? 'bg-primary font-semibold text-on-primary' : 'border border-line text-ink hover:bg-subtle'}`}><ENTRY_ICON size={16} className="shrink-0" aria-hidden /><span className="flex-1 leading-snug">{E.title}</span><EXT_ICON size={14} className="shrink-0" aria-hidden /></a>; })}</div>}
      <Sources items={all} />
    </Sheet>; })}
  </div>;
}
