const v = n => `rgb(var(--${n}) / <alpha-value>)`;
module.exports = { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bg: v('bg'), surface: v('surface'), sunken: v('sunken'), ink: v('ink'), muted: v('muted'), line: v('line'), accent: v('accent'), 'accent-ink': v('accent-ink'), soft: v('soft'), danger: v('danger'), 'danger-soft': v('danger-soft'), warn: v('warn'), 'warn-soft': v('warn-soft') },
    borderRadius: { card: '18px', pill: '999px' },
    boxShadow: { card: '0 1px 2px rgb(0 0 0 / .04), 0 8px 24px -12px rgb(0 0 0 / .12)', lift: '0 2px 4px rgb(0 0 0 / .05), 0 18px 40px -16px rgb(0 0 0 / .22)' },
    fontFamily: { sans: ['"Inter"', '"PingFang SC"', '"HarmonyOS Sans SC"', '"MiSans"', '"Noto Sans SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'] },
  } }, plugins: [] };
