import './globals.css';
import Link from 'next/link';
import { Library, GraduationCap } from 'lucide-react';
import MySituation from '@/components/MySituation';
import ThemeToggle from '@/components/ThemeToggle';
import StageMenu from '@/components/StageMenu';
import { RETRIEVED } from '@/lib/content';
export const metadata = { title: { default: '京升学 · 北京入学政策查询', template: '%s · 京升学' }, description: '北京幼儿园到高考的入学条件：能不能报、怎么分、带什么、何时何地办。每条附官方原文。' };
const themeInit = `try{var t=localStorage.getItem('jsx-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="zh-CN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-bg focus:p-2">跳到正文</a>
    <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        <Link href="/" className="mr-2 inline-flex items-center gap-2 font-bold text-ink no-underline"><span className="grid h-7 w-7 place-items-center rounded-sm bg-primary text-on-primary"><GraduationCap size={16} aria-hidden /></span><span className="hidden sm:inline">京升学</span></Link>
        <nav aria-label="主导航" className="flex items-center gap-1 text-base"><StageMenu /><Link href="/sources/" className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-2 py-1 text-ink no-underline hover:bg-subtle"><Library size={17} aria-hidden /><span className="sr-only sm:not-sr-only">政策原文</span></Link></nav>
        <div className="ml-auto min-w-0"><MySituation /></div>
      </div>
    </header>
    <main id="main">{children}</main>
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-8 text-xs text-muted sm:flex-row sm:justify-between">
        <p>非官方整理，不承诺录取；以市、区教委及招生单位当年正式文件为准。<Link href="/about/">关于与免责</Link></p>
        <p>官方原文核对日期：{RETRIEVED} · <ThemeToggle /></p>
      </div>
    </footer>
  </body></html>);
}
