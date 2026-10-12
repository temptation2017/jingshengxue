import Link from 'next/link'; import { STAGES } from '@/lib/site'; import { PageHead } from '@/components/ui';
export const metadata = { title: '资料库' };
const I = [['/library/policies/', '政策原文库', '12 条官方文件，含发文机关、学年、原文链接'], ['/library/haidian/', '海淀专章', '苏家坨 / 科学城北区公办园校名录与 2026 要点'], ['/library/calendar/', '日历 / 时间线', '各学段关键月份'], ['/library/materials/', '材料清单', '可勾选、可打印'], ['/library/changelog/', '变更日志', '改了什么、影响谁'], ['/library/about/', '关于与免责', '非官方声明全文']];
export default function P() { return <><PageHead eyebrow="第 3 层 · 进阶资料" title="资料库" desc="给想深挖原文和细节的家长。" />
 <h2 className="mb-2 font-bold">学段字段表</h2><div className="mb-6 flex flex-wrap gap-2">{STAGES.map(([k, t]) => <Link key={k} href={`/library/stages/${k}/`} className="chip bg-surface border border-line px-3 py-1.5 text-sm text-ink no-underline hover:bg-sunken">{t}</Link>)}</div>
 <ul className="grid gap-3 sm:grid-cols-2">{I.map(([h, t, d]) => <li key={h}><Link href={h} className="card block h-full p-4 no-underline text-ink transition hover:shadow-lift"><span className="block font-semibold">{t}</span><span className="block text-sm text-muted">{d}</span></Link></li>)}</ul></>; }
