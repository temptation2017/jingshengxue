'use client';
import { Moon } from 'lucide-react';
export default function ThemeToggle() {
  const flip = () => { const d = document.documentElement.classList.toggle('dark'); try { localStorage.setItem('jsx-theme', d ? 'dark' : 'light'); } catch {} };
  return <button onClick={flip} className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-muted hover:text-ink" aria-label="切换深色或浅色模式"><Moon size={14} aria-hidden />深色 / 浅色</button>;
}
