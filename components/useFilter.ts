'use client';
import { useEffect, useState } from 'react';
import type { Identity, District } from '@/lib/content';
export interface Filter { identity: Identity | ''; district: District }
const KEY = 'jsx-filter'; const EVT = 'jsx-filter-change';
export function useFilter(): [Filter, (f: Filter) => void, boolean] {
  const [f, setF] = useState<Filter>({ identity: '', district: 'city' }); const [ready, setReady] = useState(false);
  useEffect(() => { const load = () => { try { const s = localStorage.getItem(KEY); if (s) setF(JSON.parse(s)); } catch {} setReady(true); }; load(); window.addEventListener(EVT, load); return () => window.removeEventListener(EVT, load); }, []);
  const set = (n: Filter) => { localStorage.setItem(KEY, JSON.stringify(n)); setF(n); window.dispatchEvent(new Event(EVT)); };
  return [f, set, ready];
}
