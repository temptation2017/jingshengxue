'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { stageByKey, STAGES, QUESTIONS, RETRIEVED } from '@/lib/content';
import { STAGE_ICON, Q_ICON } from '@/lib/icons';
import { visible, conclusion } from '@/lib/filter';
import { useFilter } from './useFilter';
import FilterBar from './FilterBar';
import QTabs, { useHashTab } from './QTabs';
import { Elig, Alloc, Mats, When } from './Panels';
import { Sources, Badge } from './bits';
export function StageNav({ current }: { current: string }) {
  return <>
    <nav aria-label="学段" className="no-print hidden lg:block"><ul className="sticky top-20 space-y-1">{STAGES.map((s, i) => { const I = STAGE_ICON[s.key]; const on = s.key === current; return <li key={s.key}><Link href={`/stage/${s.key}/`} aria-current={on ? 'page' : undefined} className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm no-underline transition ${on ? 'bg-tint font-semibold text-primary' : 'text-ink hover:bg-subtle'}`}><I size={18} aria-hidden /><span className="flex-1">{s.name}</span><span className="text-xs text-muted">{i + 1}</span></Link></li>; })}</ul></nav>
    <nav aria-label="学段" className="no-print no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 lg:hidden">{STAGES.map(s => { const I = STAGE_ICON[s.key]; const on = s.key === current; return <Link key={s.key} href={`/stage/${s.key}/`} aria-current={on ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm no-underline ${on ? 'border-primary bg-primary text-on-primary' : 'border-line bg-card text-ink'}`}><I size={15} aria-hidden />{s.short}</Link>; })}</nav>
  </>;
}
export default function StageView({ k }: { k: string }) {
  const s = stageByKey(k); const [f] = useFilter(); const [tab, setTab] = useHashTab();
  const i = STAGES.indexOf(s); const prev = STAGES[i - 1], next = STAGES[i + 1];
  const I = STAGE_ICON[s.key]; const QI = Q_ICON[tab]; const qi = QUESTIONS.findIndex(q => q[0] === tab);
  const items = visible(s.q[tab].items, f.identity, f.district, s);
  const noDetail = f.district === 'otherDistrict' || (f.district === 'haidian' && !s.detailDistricts.includes('haidian'));
  return <div className="mx-auto max-w-6xl px-4 pt-6 lg:grid lg:grid-cols-[200px_minmax(0,760px)] lg:gap-10 lg:pt-10">
    <StageNav current={s.key} />
    <div className="min-w-0">
      <header className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-tint text-primary"><I size={26} aria-hidden /></span>
        <div className="min-w-0"><h1 className="text-2xl font-bold tracking-tight">{s.name}</h1><p className="mt-1 text-muted">{s.summary}</p></div>
      </header>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><FilterBar /><p className="text-xs text-muted">{s.schoolYear} · 核对 {RETRIEVED}</p></div>
      {noDetail && <p className="mt-3 flex items-center gap-2 rounded-sm bg-pend-bg px-3 py-2 text-sm text-pend"><Info size={16} aria-hidden />{f.district === 'otherDistrict' ? '本区细则待收录' : '海淀细则待收录'}，下面显示全市通则。</p>}
      <div className="mt-5"><QTabs tab={tab} set={setTab} idp="st" /></div>
      <section id="st-panel" role="tabpanel" aria-labelledby={`st-tab-${tab}`} className="card mt-4 p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary"><QI size={15} aria-hidden />第 {qi + 1} 问 · {QUESTIONS[qi][1]}</p>
        <p className="mt-2 text-xl font-semibold leading-snug">{conclusion(s, tab, f.district)}</p>
        <div className="mt-5">
          {items.length === 0 ? <p className="flex items-center gap-2 text-muted"><Badge m="pending" /> 本问暂无收录，请看「何时何地办」里的官方入口。</p>
          : tab === 'eligibility' ? <Elig items={items} stage={s} showCompare={!f.identity} />
          : tab === 'allocation' ? <Alloc items={items} />
          : tab === 'materials' ? <Mats items={items} stageKey={s.key} />
          : <When items={items} stage={s} />}
        </div>
        <Sources items={items} />
      </section>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm"><span className="font-semibold text-muted">名词</span>{s.terms.map(([a, b]) => <span key={a}><b className="font-semibold">{a}</b><span className="text-muted">：{b}</span></span>)}</div>
      <nav aria-label="上一个和下一个学段" className="mt-8 grid grid-cols-2 gap-3">
        {prev ? <Link href={`/stage/${prev.key}/`} className="card flex items-center gap-2 p-3 text-sm no-underline text-ink hover:border-primary"><ChevronLeft size={18} aria-hidden /><span><span className="block text-xs text-muted">上一学段</span>{prev.name}</span></Link> : <span />}
        {next ? <Link href={`/stage/${next.key}/`} className="card flex items-center justify-end gap-2 p-3 text-right text-sm no-underline text-ink hover:border-primary"><span><span className="block text-xs text-muted">下一学段</span>{next.name}</span><ChevronRight size={18} aria-hidden /></Link> : <span />}
      </nav>
    </div>
  </div>;
}
