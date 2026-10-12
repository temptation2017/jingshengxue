import './globals.css';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import StageMenu from '@/components/StageMenu';
import { RETRIEVED } from '@/lib/content';
export const metadata = { title: { default: '京升学 · 北京入学政策查询', template: '%s · 京升学' }, description: '北京幼儿园到高考的入学条件：能不能报、怎么分、带什么、何时何地办。每条附官方原文。' };
const themeInit = `try{var t=localStorage.getItem('jsx-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="zh-CN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-bg focus:p-2">跳到正文</a>
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
        <Link href="/" className="mr-2 font-semibold text-ink no-underline">京升学</Link>
        <nav aria-label="主导航" className="flex items-center gap-1 text-base"><StageMenu /><Link href="/check/" className="rounded-sm px-2 py-1 text-ink no-underline hover:bg-subtle">条件自查</Link><Link href="/sources/" className="rounded-sm px-2 py-1 text-ink no-underline hover:bg-subtle">政策原文</Link></nav>
        <div className="ml-auto hidden sm:block"><ThemeToggle /></div>
      </div>
    </header>
    <main id="main">{children}</main>
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-8 text-xs text-muted sm:flex-row sm:justify-between">
        <p>非官方整理，不承诺录取；以市、区教委及招生单位当年正式文件为准。<Link href="/about/">关于与免责</Link></p>
        <p>官方原文核对日期：{RETRIEVED} · <ThemeToggle /></p>
      </div>
    </footer>
  </body></html>);
}
