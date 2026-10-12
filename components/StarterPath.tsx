import Link from 'next/link';
const S = [['幼儿园', '约 3 岁', '每年 5–6 月网上报名，按园所规则录取'], ['小学', '满 6 岁', '5 月信息采集 → 6 月登记，免试就近'], ['初中', '小学毕业', '填志愿 → 登记、直升或电脑派位'], ['高中 / 中职', '初中毕业', '6 月中考，按分数填志愿'], ['大学', '高中毕业', '前一年 10–11 月高考报名']];
export default function StarterPath() { return (<div className="space-y-5">
  <div className="card p-5"><h2 className="text-xl font-bold">还没回答问题？先了解全流程</h2><p className="mt-1 text-muted">北京升学一共五站。每一站都有「年龄线 + 报名窗口 + 材料」三件事。</p>
    <ol className="mt-4 space-y-2">{S.map(([a, b, c], i) => <li key={a} className="flex gap-3 rounded-2xl bg-sunken p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-ink">{i + 1}</span><div><p className="font-semibold">{a} <span className="text-sm font-normal text-muted">· {b}</span></p><p className="text-sm text-muted">{c}</p></div></li>)}</ol></div>
  <div className="flex flex-col gap-3 sm:flex-row"><Link href="/start/" className="btn-primary flex-1">回答 4 个问题，生成我家路线图</Link><Link href="/learn/" className="btn-ghost flex-1">先读白话流程</Link></div>
</div>); }
