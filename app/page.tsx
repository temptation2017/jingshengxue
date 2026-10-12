import Link from 'next/link';
import { BirthInput, StageLine } from '@/components/BirthCalc';
import { QUESTIONS, src } from '@/lib/content'; import { Q_ICON, ENTRY_ICON, EXT_ICON } from '@/lib/icons';
export const metadata = { title: { absolute: '京升学 · 北京入学政策查询' } };
const QD = ['年龄、户籍、居住等硬门槛', '登记、派位、顺位还是考试', '要准备的材料清单', '时间线和官方办理入口'];
const E = ['ryfw', 'yjrx', 'hdService', 'bjeea'];
export default function Home() { return <div>
  <section className="border-b border-line bg-gradient-to-b from-tint to-bg"><div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
    <p className="text-sm font-semibold text-primary">北京 · 幼儿园到高考</p>
    <h1 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">每一站入学条件，<br className="sm:hidden" />一页看懂</h1>
    <p className="mt-3 max-w-xl text-muted">只收录官方原文。输入出生年月，看孩子哪年到哪一站。</p>
    <div className="mt-6"><BirthInput /></div>
  </div></section>
  <div className="mx-auto max-w-6xl px-4">
    <section className="mt-8"><StageLine /></section>
    <section className="mt-12"><h2 className="text-lg font-semibold">每个学段都讲这 4 件事</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{QUESTIONS.map(([k, t], i) => { const I = Q_ICON[k]; return <li key={k} className="card flex items-start gap-3 p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-tint text-primary"><I size={18} aria-hidden /></span><div><p className="font-semibold"><span className="mr-1 text-primary">{i + 1}</span>{t}</p><p className="text-sm text-muted">{QD[i]}</p></div></li>; })}</ul></section>
    <section className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-sm"><span className="inline-flex items-center gap-1.5 font-semibold text-muted"><ENTRY_ICON size={16} aria-hidden />官方入口</span>
      {E.map(e => <a key={e} href={src(e).url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 no-underline hover:underline">{src(e).title}<EXT_ICON size={13} aria-hidden /></a>)}
      <Link href="/check/" className="btn-primary ml-auto">条件自查</Link></section>
  </div>
</div>; }
