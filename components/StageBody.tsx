'use client';
import Link from 'next/link';
import { stageByKey, QUESTIONS, IDENTITIES, STAGES, src } from '@/lib/content';
import { visible, conclusion } from '@/lib/filter';
import { useFilter } from './useFilter';
import FilterBar from './FilterBar';
import { Tag, Quote, Num } from './bits';
export default function StageBody({ k }: { k: string }) {
  const s = stageByKey(k); const [f] = useFilter();
  const idx = STAGES.findIndex(x => x.key === k); const prev = STAGES[idx - 1], next = STAGES[idx + 1];
  const otherDistrict = f.district === 'otherDistrict'; const noDetail = f.district === 'haidian' && !s.detailDistricts.includes('haidian');
  return <div className="lg:grid lg:grid-cols-[1fr_180px] lg:gap-16">
    <div className="min-w-0">
      <FilterBar />
      {(otherDistrict || noDetail) && <p className="mt-4 rounded-md bg-subtle p-3 text-base"><Tag s="pending" /> {otherDistrict ? '本区细则待收录。' : '海淀细则待收录。'}下面显示全市通则；请以所在区教委当年公告为准。</p>}
      <nav aria-label="本页目录" className="no-print mt-6 flex gap-4 overflow-x-auto text-xs lg:hidden">{QUESTIONS.map(([q, t], i) => <a key={q} href={`#${q}`} className="whitespace-nowrap text-muted no-underline hover:text-ink">{i + 1} {t}</a>)}</nav>
      {QUESTIONS.map(([q, t], i) => { const items = visible(s.q[q].items, f.identity, f.district, s); return (
        <section key={q} id={q} aria-labelledby={`h-${q}`} className="border-b border-line py-12 last:border-0">
          <h2 id={`h-${q}`} className="flex items-center gap-3 text-lg font-semibold"><Num n={i + 1} />{t}</h2>
          <p className="mt-4 font-semibold">{conclusion(s, q, f.district)}</p>
          {q === 'eligibility' && !f.identity && s.compare && <div className="mt-6 overflow-x-auto"><table className="tbl"><caption className="mb-2 text-left text-xs text-muted">各身份对比 · 在上方选择身份后只显示相关内容</caption><thead><tr><th scope="col" className="w-44">身份</th><th scope="col">要点</th></tr></thead>
            <tbody>{IDENTITIES.map(([id, name]) => <tr key={id}><th scope="row" className="font-normal">{name}</th><td>{s.compare![id] ?? <Tag s="not_stated" />}</td></tr>)}</tbody></table></div>}
          <ul className="mt-6 space-y-5">{items.map(it => <li key={it.text} className="flex gap-3"><span aria-hidden className="mt-3 h-1 w-1 shrink-0 rounded-full bg-muted" /><div className="min-w-0"><p>{it.status !== 'official' && <><Tag s={it.status} />{' '}</>}{it.text}{it.status === 'not_stated' && '：官方未写明。'}</p><Quote id={it.source} quote={it.quote} /></div></li>)}
            {items.length === 0 && <li className="text-muted"><Tag s="pending" /> 待收录。请看下方官方入口。</li>}</ul>
          {q === 'when' && <p className="mt-6 text-base">官方入口：{s.entries.map((e, j) => <span key={e}>{j > 0 && ' · '}<a href={src(e).url} target="_blank" rel="noopener noreferrer">{src(e).title}</a></span>)}</p>}
        </section>); })}
      <section aria-labelledby="h-terms" className="pt-4"><h2 id="h-terms" className="text-xs font-semibold text-muted">本页名词</h2>
        <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">{s.terms.map(([a, b]) => <div key={a}><dt className="font-semibold">{a}</dt><dd className="text-muted">{b}</dd></div>)}</dl></section>
      <nav aria-label="学段导航" className="mt-16 flex justify-between gap-4 border-t border-line pt-6">
        {prev ? <Link href={`/stage/${prev.key}/`} className="no-underline"><span className="block text-xs text-muted">上一学段</span>{prev.name}</Link> : <span />}
        {next ? <Link href={`/stage/${next.key}/`} className="text-right no-underline"><span className="block text-xs text-muted">下一学段</span>{next.name}</Link> : <span />}
      </nav>
    </div>
    <aside className="no-print hidden lg:block"><nav aria-label="本页目录" className="sticky top-24 text-base"><p className="mb-3 text-xs text-muted">本页目录</p><ol className="space-y-2">{QUESTIONS.map(([q, t], i) => <li key={q}><a href={`#${q}`} className="flex gap-2 text-muted no-underline hover:text-ink"><span className="tabular-nums">{i + 1}</span>{t}</a></li>)}</ol>
      <Link href={`/check/?stage=${s.key}`} className="mt-8 block text-xs">用这些条件自查 →</Link></nav></aside>
  </div>;
}
