'use client';
export default function ThemeToggle() {
  const flip = () => { const d = document.documentElement.classList.toggle('dark'); try { localStorage.setItem('jsx-theme', d ? 'dark' : 'light'); } catch {} };
  return <button onClick={flip} className="rounded-sm px-2 py-1 text-xs text-muted hover:text-ink" aria-label="切换深色或浅色模式">深色 / 浅色</button>;
}
