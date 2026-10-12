'use client';
export default function ThemeToggle() {
  const flip = () => { const d = document.documentElement.classList.toggle('dark'); try { localStorage.setItem('jsx-theme', d ? 'dark' : 'light'); } catch {} };
  return <button onClick={flip} aria-label="切换深色/浅色模式" className="ml-auto sm:ml-0 grid h-9 w-9 place-items-center rounded-pill border border-line bg-surface text-ink hover:bg-sunken"><span aria-hidden>◐</span></button>;
}
