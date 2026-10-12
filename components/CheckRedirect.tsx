'use client';
import { useEffect } from 'react';
const OK = ['kindergarten', 'primary', 'junior', 'senior', 'gaokao'];
export default function CheckRedirect() {
  useEffect(() => { const q = new URLSearchParams(location.search).get('stage') || ''; location.replace(`/jingshengxue/stage/${OK.includes(q) ? q : 'kindergarten'}/`); }, []);
  return <div className="mx-auto max-w-3xl px-4 pt-12"><meta httpEquiv="refresh" content="0; url=/jingshengxue/stage/kindergarten/" /><p>条件自查已合并进学段页。<a href="/jingshengxue/stage/kindergarten/">前往</a></p></div>;
}
