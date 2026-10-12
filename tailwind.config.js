const v = n => `rgb(var(--${n}) / <alpha-value>)`;
module.exports = { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    fontSize: { xs: ['13px', '1.5'], base: ['16px', '1.7'], lg: ['20px', '1.45'], xl: ['28px', '1.3'], '2xl': ['40px', '1.2'] },
    extend: {
      colors: { bg: v('bg'), ink: v('ink'), muted: v('muted'), line: v('line'), subtle: v('subtle'), primary: v('primary'), 'on-primary': v('on-primary'), ok: v('ok'), fail: v('fail'), pend: v('pend') },
      borderRadius: { sm: '6px', md: '10px' },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans CJK SC"', '"Source Han Sans SC"', 'system-ui', 'sans-serif'] },
      boxShadow: { pop: '0 8px 30px -8px rgb(0 0 0 / .18)' },
    } }, plugins: [] };
