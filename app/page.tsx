import Link from 'next/link';
import HomeCTA from '@/components/HomeCTA';
export const metadata = { title: { absolute: '京升学 · 北京升学路线图' } };
const L = [['1', '你现在该做什么', '回答 4 个问题，得到路线图和下一步清单', '/start/'], ['2', '这个阶段怎么运作', '用白话讲入园、幼升小、小升初、中考、高考', '/learn/'], ['3', '进阶资料', '政策原文、字段表、海淀专章、变更日志', '/library/']];
export default function Home() { return (<div className="space-y-10">
  <section className="pt-4"><p className="chip bg-soft text-accent">非官方 · 每条附官方原文</p>
    <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">孩子在北京上学，<br />下一步该做什么？</h1>
    <p className="mt-4 text-lg text-muted">告诉我们孩子的出生年月、区、户口和住房，30 秒生成从幼儿园到大学的路线图，并告诉你最近一件事怎么一步步办。</p>
    <div className="mt-6"><HomeCTA /></div></section>
  <section aria-labelledby="h-layers"><h2 id="h-layers" className="text-xl font-bold">由浅入深，三层就够</h2>
    <ul className="mt-4 grid gap-3">{L.map(([n, t, d, h]) => <li key={n}><Link href={h} className="card group flex items-center gap-4 p-4 no-underline text-ink transition hover:shadow-lift">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-soft font-bold text-accent">{n}</span><span className="flex-1"><span className="block font-semibold">{t}</span><span className="block text-sm text-muted">{d}</span></span><span aria-hidden className="text-muted transition group-hover:translate-x-1">→</span></Link></li>)}</ul></section>
  <section className="card p-5"><h2 className="font-bold">你需要知道的一件事</h2><p className="mt-1 text-muted">2027 年的入园、幼升小细则截至 2026-10-12 还没有发布。本站对 2027 年及以后的推算都按 2026 年官方文件的结构，届时以当年文件为准。</p></section>
</div>); }
