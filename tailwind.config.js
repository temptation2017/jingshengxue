const v = n => `rgb(var(--${n}) / <alpha-value>)`;
module.exports = { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    fontSize: { xs: ['12px', '1.5'], sm: ['14px', '1.6'], base: ['16px', '1.7'], lg: ['18px', '1.6'], xl: ['22px', '1.45'], '2xl': ['30px', '1.3'], '3xl': ['44px', '1.15'] },
    extend: {
      colors: { bg: v('bg'), card: v('card'), ink: v('ink'), muted: v('muted'), line: v('line'), subtle: v('subtle'), primary: v('primary'), tint: v('tint'), 'on-primary': v('on-primary'), ok: v('ok'), 'ok-bg': v('ok-bg'), fail: v('fail'), 'fail-bg': v('fail-bg'), pend: v('pend'), 'pend-bg': v('pend-bg') },
      borderRadius: { sm: '8px', md: '12px', lg: '16px' },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans CJK SC"', '"Source Han Sans SC"', 'system-ui', 'sans-serif'] },
      boxShadow: { card: '0 1px 2px rgb(16 24 40 / .04), 0 4px 12px -4px rgb(16 24 40 / .08)', pop: '0 12px 32px -8px rgb(16 24 40 / .2)' },
    } }, plugins: [] };
