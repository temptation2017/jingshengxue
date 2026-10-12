'use client';
import { useEffect, useState } from 'react';
import type { Identity, District } from './content';
export interface Settings { identity: Identity | ''; district: District; birth: string; permit: string; ins: string; cont: boolean; lives: boolean }
export const DEFAULT: Settings = { identity: '', district: 'city', birth: '', permit: '', ins: '', cont: true, lives: true };
const KEY = 'jsx-settings'; const EVT = 'jsx-settings';
function read(): Settings {
  try { const s = localStorage.getItem(KEY); if (s) return { ...DEFAULT, ...JSON.parse(s) };
    const f = JSON.parse(localStorage.getItem('jsx-filter') || '{}'); const b = localStorage.getItem('jsx-birth') || '';
    return { ...DEFAULT, ...f, birth: b }; } catch { return DEFAULT; }
}
export function useSettings(): [Settings, (p: Partial<Settings>) => void, boolean] {
  const [s, setS] = useState<Settings>(DEFAULT); const [ready, setReady] = useState(false);
  useEffect(() => { const l = () => { setS(read()); setReady(true); }; l(); window.addEventListener(EVT, l); return () => window.removeEventListener(EVT, l); }, []);
  const set = (p: Partial<Settings>) => { const n = { ...read(), ...p }; localStorage.setItem(KEY, JSON.stringify(n)); setS(n); window.dispatchEvent(new Event(EVT)); };
  return [s, set, ready];
}
export const openSettings = () => window.dispatchEvent(new Event('jsx-open-settings'));
export const birthMonth = (b: string) => b.slice(0, 7);
