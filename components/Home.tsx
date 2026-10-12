'use client';
import Link from 'next/link';
import { CalendarDays, ArrowRight, UserRound, Sparkles } from 'lucide-react';
import { STAGES, QUESTIONS } from '@/lib/content';
import { STAGE_ICON, Q_ICON } from '@/lib/icons';
import { useSettings, openSettings } from '@/lib/settings';
import { entryYears } from '@/lib/years';
import { summary } from './MySituation';
export default function Home() {
  const [s, set] = useSettings();
  const ym = s.birth ? s.birth.slice(0, 7) : ''; const ys = ym ? entryYears(ym) : null;
  const now = new Date(); const ni = now.getFullYear() * 12 + now.getMonth();
  const next = ys ? STAGES.find(x => ys[x.key] * 12 + 8 > ni) : undefined;
  const months = next && ys ? ys[next.key] * 12 + 8 - ni : 0; const NI = next ? STAGE_ICON[next.key] : null;
  const sum = summary(s);
  return <div className="mx-auto max-w-6xl px-4">
    <section className="grid gap-6 pt-8 sm:pt-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10">
      <div>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 text-xs font-semibold text-primary"><Sparkles size={13} aria-hidden />只收录官方原文</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">北京上学，<br />下一站怎么走？</h1>
        <p className="mt-3 max-w-md text-muted">从幼儿园到高考，每个学段都告诉你：能不能报、怎么分、带什么、何时何地办。</p>
        <label className="mt-6 flex max-w-md items-center gap-3 rounded-md border border-line bg-card p-2 pl-4 shadow-card"><CalendarDays size={20} className="shrink-0 text-primary" aria-hidden /><span className="shrink-0 text-sm font-semibold">孩子出生年月</span>
          <input type="month" min="2008-01" max="2027-12" value={ym} onChange={e => set({ birth: e.target.value ? e.target.value + '-01' : '' })} className="min-w-0 flex-1 border-0 bg-transparent" /></label>
        <button onClick={openSettings} className="mt-3 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><UserRound size={15} aria-hidden />{sum ? <>我的情况：<span className="font-semibold text-ink">{sum}</span>（修改）</> : '设置身份和区，答案更准'}</button>
      </div>
      <div className="rounded-xl border border-line bg-card p-5 shadow-card sm:p-6">
        {next && NI && ys ? <>
          <p className="text-sm font-semibold text-accent">下一站</p>
          <div className="mt-3 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-md bg-primary text-on-primary"><NI size={28} aria-hidden /></span><div><p className="text-xl font-semibold">{next.name}</p><p className="text-sm text-muted">{next.age}</p></div></div>
          <div className="mt-5 flex gap-8"><div><p className="text-xs text-muted">{next.key === 'gaokao' ? '高考' : '入学'}</p><p className="text-3xl font-bold tabular-nums">{ys[next.key]}<span className="ml-1 text-base font-semibold text-muted">年{next.key === 'gaokao' ? '6' : '9'}月</span></p></div><div><p className="text-xs text-muted">还有约</p><p className="text-3xl font-bold tabular-nums text-accent">{months}<span className="ml-1 text-base font-semibold">个月</span></p></div></div>
          <Link href={`/stage/${next.key}/`} className="btn-primary mt-5 w-full">看{next.name}怎么办<ArrowRight size={16} aria-hidden /></Link>
          <p className="mt-2 text-xs text-muted">按 2026 年出生日期线推算，以当年文件为准。</p>
        </> : <><p className="text-sm font-semibold text-accent">下一站</p><p className="mt-3 text-xl font-semibold">输入出生年月</p><p className="mt-1 text-sm text-muted">马上算出孩子哪年上哪一站、还剩几个月。</p>
          <ul className="mt-5 grid grid-cols-4 gap-2">{QUESTIONS.map(([k, t]) => { const QI = Q_ICON[k]; return <li key={k} className="flex flex-col items-center gap-1.5 rounded-sm bg-subtle p-3 text-center"><QI size={18} className="text-primary" aria-hidden /><span className="text-xs">{t}</span></li>; })}</ul></>}
      </div>
    </section>
    <section className="mt-10"><h2 className="text-sm font-semibold text-muted">或直接选学段</h2>
      <ol className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">{STAGES.map((x, i) => { const XI = STAGE_ICON[x.key]; const on = x.key === next?.key; return <li key={x.key} className={i === 4 ? 'col-span-2 sm:col-span-1' : ''}>
        <Link href={`/stage/${x.key}/`} className={`card group flex h-full flex-col gap-3 p-4 no-underline text-ink transition hover:-translate-y-0.5 hover:shadow-pop ${on ? 'border-accent ring-2 ring-accent/25' : ''}`}>
          <span className="flex items-center justify-between"><span className={`grid h-10 w-10 place-items-center rounded-sm ${on ? 'bg-accent text-white' : 'bg-tint text-primary'}`}><XI size={20} aria-hidden /></span>{on && <span className="rounded-full bg-accent-bg px-2 py-0.5 text-[11px] font-semibold text-accent">下一站</span>}</span>
          <span><span className="block font-semibold">{x.name}</span><span className="block text-xs text-muted">{x.age}</span></span>
          <span className="mt-auto text-lg font-semibold tabular-nums">{ys ? ys[x.key] : <span className="text-sm font-normal text-muted">查看 →</span>}</span>
        </Link></li>; })}</ol>
    </section>
  </div>;
}
