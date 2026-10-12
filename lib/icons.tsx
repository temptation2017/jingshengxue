import { Blocks, Backpack, BookOpen, School, GraduationCap, ShieldCheck, ListOrdered, FileText, CalendarClock, House, Building2, IdCard, Users, MapPin, CircleCheck, CircleX, CircleHelp, Clock, BadgeCheck, CircleDashed, Landmark, ExternalLink, BookUser, Baby, Syringe, ClipboardList, Briefcase, ScanLine, HeartPulse, MapPinHouse, type LucideIcon } from 'lucide-react';
import type { StageKey, QKey, Identity, District } from './content';
export const STAGE_ICON: Record<StageKey, LucideIcon> = { kindergarten: Blocks, primary: Backpack, junior: BookOpen, senior: School, gaokao: GraduationCap };
export const Q_ICON: Record<QKey, LucideIcon> = { eligibility: ShieldCheck, allocation: ListOrdered, materials: FileText, when: CalendarClock };
export const ID_ICON: Record<Identity, LucideIcon> = { local: House, localNoHouse: Building2, nonBj: IdCard, other: Users };
export const DISTRICT_ICON = MapPin;
export const ENTRY_ICON = Landmark; export const EXT_ICON = ExternalLink;
export type Mark = 'yes' | 'no' | 'not_stated' | 'pending' | 'official' | 'self';
export const MARK: Record<Mark, [LucideIcon, string, string]> = {
  yes: [CircleCheck, '满足', 'text-ok bg-ok-bg'], no: [CircleX, '不满足', 'text-fail bg-fail-bg'],
  not_stated: [CircleHelp, '官方未写明', 'text-muted bg-subtle'], pending: [Clock, '待收录', 'text-pend bg-pend-bg'],
  official: [BadgeCheck, '官方原文', 'text-ok bg-ok-bg'], self: [CircleDashed, '需自行核对', 'text-muted bg-subtle'],
};
const MAT: [RegExp, LucideIcon][] = [[/户口簿/, BookUser], [/房产|不动产/, House], [/居住证/, IdCard], [/社保/, HeartPulse], [/出生/, Baby], [/接种|疫苗/, Syringe], [/信息采集表/, ClipboardList], [/务工|就业/, Briefcase], [/住所/, MapPinHouse], [/扫描|上传/, ScanLine], [/身份证|亲子/, Users], [/学籍|毕业/, GraduationCap]];
export const matIcon = (t: string): LucideIcon => MAT.find(([r]) => r.test(t))?.[1] ?? FileText;
