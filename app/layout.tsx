import './globals.css';
import Link from 'next/link';
import { RETRIEVED } from '@/lib/site';
import ThemeToggle from '@/components/ThemeToggle';
export const metadata = { title: { default: '京升学 · 北京升学路线图', template: '%s · 京升学' }, description: '回答 4 个问题，得到你家孩子从幼儿园到大学的北京升学路线图和分步行动清单。每条规则附官方原文。' };
const themeInit = `try{var t=localStorage.getItem('jsx-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;
const NAV = [['/roadmap/', '我的路线图'], ['/learn/', '了解流程'], ['/library/', '资料库']];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="zh-CN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn-primary">跳到正文</a>
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 no-underline text-ink font-bold text-lg"><span aria-hidden className="grid h-8 w-8 place-items-center rounded-xl bg-accent text-accent-ink text-sm">升</span>京升学</Link>
        <nav aria-label="主导航" className="ml-auto hidden sm:flex gap-1">{NAV.map(([h, t]) => <Link key={h} href={h} className="rounded-pill px-3 py-1.5 text-sm text-ink no-underline hover:bg-sunken">{t}</Link>)}</nav>
        <ThemeToggle />
      </div>
      <nav aria-label="主导航（手机）" className="sm:hidden mx-auto flex max-w-3xl gap-1 px-3 pb-2">{NAV.map(([h, t]) => <Link key={h} href={h} className="flex-1 rounded-pill bg-sunken px-2 py-1.5 text-center text-sm text-ink no-underline">{t}</Link>)}</nav>
    </header>
    <main id="main" className="mx-auto max-w-3xl px-4 py-8 fade-in">{children}</main>
    <footer className="border-t border-line">
      <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-muted space-y-1">
        <p>本站非官方，不承诺录取；一切以市、区教委及招生单位当年正式文件为准。<Link href="/library/about/">免责声明</Link></p>
        <p>政策检索 / 核对日期：{RETRIEVED}（北京时间）</p>
      </div>
    </footer>
  </body></html>);
}
