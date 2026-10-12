import Redirect from '@/components/Redirect';
export const metadata = { title: '页面已搬家', robots: { index: false } };
export default function P() { return <Redirect to="/library/about/" />; }
