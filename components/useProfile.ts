'use client';
import { useEffect, useState } from 'react';
import { LS, Profile } from '@/lib/roadmap';
export function useProfile() {
  const [p, setP] = useState<Profile | null | undefined>(undefined);
  useEffect(() => { try { const s = localStorage.getItem(LS.profile); setP(s ? JSON.parse(s) : null); } catch { setP(null); } }, []);
  return p;
}
