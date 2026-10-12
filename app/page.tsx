import BirthCalc from '@/components/BirthCalc'; import { src } from '@/lib/content';
export const metadata = { title: { absolute: '京升学 · 北京入学政策查询' } };
const E = ['ryfw', 'yjrx', 'hdService', 'bjeea'];
export default function Home() { return <div className="mx-auto max-w-5xl px-4">
  <section className="pt-20 pb-12"><h1 className="max-w-3xl text-xl font-semibold sm:text-2xl">北京从幼儿园到高考，每一站的入学条件</h1>
    <p className="mt-5 max-w-2xl text-muted">每个学段都回答同样四个问题：能不能报、怎么分、带什么、何时何地办。每条都附官方原文。</p></section>
  <BirthCalc />
  <section className="mt-20 border-t border-line pt-6 text-xs text-muted"><span className="mr-3">官方入口</span>{E.map((e, i) => <span key={e}>{i > 0 && <span className="mx-2">·</span>}<a href={src(e).url} target="_blank" rel="noopener noreferrer">{src(e).title}</a></span>)}</section>
</div>; }
