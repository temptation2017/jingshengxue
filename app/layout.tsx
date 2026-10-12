import './globals.css';
import Link from 'next/link';
import { NAV, RETRIEVED } from '@/lib/site';
export const metadata = { title: '京升学 · 北京升学政策查询（非官方）', description: '北京幼儿园到大学入学政策：年龄截止日、户籍、房产、居住证、材料、时间线，均附官方原文链接。' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="zh-CN"><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white">跳到正文</a>
    <header className="bg-pine text-white">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <Link href="/" className="text-white no-underline text-2xl font-bold tracking-wide">京升学<span className="text-base font-normal ml-2 opacity-90">北京升学政策 · 可溯源</span></Link>
        <nav aria-label="主导航" className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-base">
          {NAV.map(([h, t]) => <Link key={h} href={h} className="text-white">{t}</Link>)}
        </nav>
      </div>
    </header>
    <main id="main" className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    <footer className="border-t border-[#d9cbb4] bg-apricot">
      <div className="max-w-4xl mx-auto px-4 py-4 text-base">
        <p><strong>免责：</strong>本站非官方，不承诺录取；一切以市、区教委及招生单位当年正式文件为准。<Link href="/about/">完整声明</Link></p>
        <p>政策检索/核对日期：{RETRIEVED}（北京时间）</p>
      </div>
    </footer>
  </body></html>);
}
