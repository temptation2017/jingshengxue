import Link from 'next/link';
import { STAGES } from '@/lib/site';
const NODES = [
  ['2026-10-09 起', '2027 随迁子女在京参加高职考试报名（考试院通知，11/11 前现场确认）'],
  ['每年 3–4 月', '市教委发布中招意见、义务教育入学意见（2027 版尚未发布）'],
  ['每年 4–5 月', '各区发布义务教育实施意见；海淀 2026 年京户采集为 5/6–5/31'],
  ['每年 5 月底–6 月', '幼儿园小班信息采集；海淀 2026 年为 6/1–6/15'],
  ['每年 6 月', '小学登记入学（海淀 2026 为 6/13–14）、中考（2026 为 6/24–25）'],
];
export default function Home() {
  return (<div className="space-y-8">
    <section className="bg-apricot rounded-xl p-5">
      <h1 className="text-3xl font-bold">我家孩子明年能上哪类学校？差什么材料？</h1>
      <p className="mt-2">把北京从幼儿园到大学的入学条件——年龄截止日、户口、房子、居住证、社保、材料、时间线——整理成表格，每条都挂官方原文链接。</p>
      <Link href="/quiz/" className="inline-block mt-4 bg-brick text-white no-underline rounded-lg px-5 py-3 text-xl font-bold">开始 30 秒自测 →</Link>
    </section>
    <section><h2 className="text-2xl font-bold mb-3">按学段查</h2>
      <ul className="grid sm:grid-cols-2 gap-3">{STAGES.map(([s, t]) => <li key={s}><Link href={`/stages/${s}/`} className="block bg-white border-2 border-pine rounded-lg p-4 no-underline text-ink font-bold text-lg">{t}</Link></li>)}
        <li><Link href="/haidian/" className="block bg-white border-2 border-ochre rounded-lg p-4 no-underline text-ink font-bold text-lg">海淀专章（含苏家坨/科学城北区）</Link></li></ul>
    </section>
    <section><h2 className="text-2xl font-bold mb-3">关键节点</h2>
      <ol className="space-y-2">{NODES.map(([d, t]) => <li key={d} className="bg-white rounded p-3 border-l-4 border-pine"><strong>{d}</strong>：{t}</li>)}</ol>
      <p className="mt-2 text-base">2027 学年入园与义务教育细则<strong>截至 2026-10-12 尚未发布</strong>，届时以当年文件为准。<Link href="/calendar/">完整日历</Link></p>
    </section>
  </div>);
}
