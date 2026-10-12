'use client';
const G: [string, string[]][] = [
 ['幼儿园（海淀）', ['孩子及监护人证件扫描件（清晰、每张 ≤1M，平台上传）', '户口簿或海淀实际居住证明', '意向园招生简章要求的其他材料（各园不同，待核验）']],
 ['小学 · 京户', ['户口簿', '房产证明（不动产权证等）', '《信息采集表》（平台打印，登记日携带）']],
 ['小学 · 非京户（海淀 2026 附件2）', ['北京市居住证（住址在海淀，起始日早于 2025-09-01）', '在京务工就业材料', '社保缴费记录（2025-09 至 2026-05 连续在海淀）', '在京实际住所材料（房产或符合条件的租房合同、完税等）', '全家户口簿']],
 ['大学 · 随迁子女高职（2027）', ['身份证', '亲子关系证明', '居住证类证件', '社保缴费记录（2021-09 至 2026-08 连续）', '学籍/毕业证明']],
];
export default function Checklist() { return (<div>
  <button onClick={() => window.print()} className="no-print bg-pine text-white rounded px-4 py-2 mb-4">打印 / 另存为 PDF</button>
  {G.map(([t, items]) => <fieldset key={t} className="bg-white border rounded p-3 mb-4"><legend className="font-bold text-xl px-1">{t}</legend>
    {items.map(i => <label key={i} className="flex gap-3 items-start py-1"><input type="checkbox" className="w-6 h-6 mt-1 shrink-0" />{i}</label>)}</fieldset>)}
</div>); }
