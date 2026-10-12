'use client';
import { useEffect } from 'react';
export default function Redirect({ to }: { to: string }) {
  const url = '/jingshengxue' + to;
  useEffect(() => { location.replace(url); }, [url]);
  return <div className="card p-5"><meta httpEquiv="refresh" content={`0; url=${url}`} /><p>页面已搬家，正在跳转…</p><a href={url}>没有自动跳转？点这里</a></div>;
}
