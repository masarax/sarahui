/** Branded, escaped HTML. Use html tagged templates to compose components. */
export interface Markup { readonly value: string; readonly __sarahMarkup: unique symbol; toString(): string }
export type Content = Markup | string | number | boolean | null | undefined | readonly Content[];
export type Attributes = Record<string, string | number | boolean | null | undefined>;
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Tone = 'success' | 'warning' | 'danger' | 'info';
export type Theme = 'light' | 'dark' | 'system';
export function html(parts: TemplateStringsArray, ...values: Content[]): Markup;
export function render(value: unknown): string;
export function escapeText(value: unknown): string;
export function safeHref(value?: unknown): string;
export function attributes(props?: Attributes): string;
export const ICONS: Readonly<Record<string, string>>;
export function Icon(props?: { name?: string; size?: number; label?: string }): Markup;
export function Logo(props?: { compact?: boolean }): Markup;
export interface ButtonProps { label?: string; variant?: Variant; size?: Size; icon?: string; trailing?: string; disabled?: boolean; loading?: boolean; attrs?: Attributes; className?: string; type?: 'button' | 'submit' | 'reset' }
export function Button(props?: ButtonProps): Markup;
export function IconButton(props?: Omit<ButtonProps,'trailing' | 'loading' | 'className' | 'type'>): Markup;
export function ButtonGroup(props?: { label?: string; children?: Content }): Markup;
export interface FieldProps { id?: string; label?: string; helper?: string; error?: string; attrs?: Attributes }
export function Input(props?: FieldProps & { icon?: string; type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' }): Markup;
export function Textarea(props?: FieldProps & { value?: string }): Markup;
export function Select(props?: Omit<FieldProps,'error'> & { options?: (string | { label: string; value: string | number; disabled?: boolean })[]; value?: string | number }): Markup;
export interface ChoiceProps { id?: string; label?: string; description?: string; checked?: boolean; disabled?: boolean; attrs?: Attributes }
export function Checkbox(props?: ChoiceProps): Markup;
export function Radio(props?: ChoiceProps): Markup;
export function Switch(props?: ChoiceProps): Markup;
export function Slider(props?: { id?: string; label?: string; value?: number; min?: number; max?: number; step?: number; attrs?: Attributes }): Markup;
export function Badge(props?: { label?: string; tone?: Tone | 'brand' | 'neutral'; dot?: boolean }): Markup;
export function Chip(props?: { label?: string; removable?: boolean; selected?: boolean }): Markup;
export function Avatar(props?: { name?: string; initials?: string; size?: Size; tone?: 'brand' | 'info' | 'success' | 'warning'; status?: boolean }): Markup;
export function Card(props?: { title?: string; description?: string; children?: Content; footer?: Content; className?: string }): Markup;
export function Alert(props?: { title?: string; description?: string; tone?: Tone; live?: boolean }): Markup;
export function Tabs(props?: { id?: string; label?: string; items?: { label: string; content: Content; disabled?: boolean }[]; active?: number; variant?: 'line' | 'pill' }): Markup;
export function Breadcrumb(props?: { items?: { label: string; href?: string }[]; label?: string }): Markup;
export function Pagination(props?: { pages?: number; current?: number; label?: string }): Markup;
export function NavItem(props?: { label?: string; href?: string; icon?: string; active?: boolean; badge?: string }): Markup;
export function DataTable(props?: { id?: string; caption?: string; columns?: { key: string; label: string; sortable?: boolean }[]; rows?: Record<string,Content>[]; selectable?: boolean }): Markup;
export function Accordion(props?: { items?: { title: string; content: Content; open?: boolean }[] }): Markup;
export function Dialog(props?: { id?: string; title?: string; description?: string; children?: Content; footer?: Content }): Markup;
export function Tooltip(props?: { id?: string; label?: string; text?: string; icon?: string }): Markup;
export function Progress(props?: { value?: number; label?: string; showLabel?: boolean }): Markup;
export function Skeleton(props?: { lines?: number; label?: string }): Markup;
export function EmptyState(props?: { title?: string; description?: string; action?: Content; icon?: string }): Markup;
export function Separator(props?: { label?: string }): Markup;
export function Spinner(props?: { label?: string; decorative?: boolean }): Markup;
export function Toast(props?: { title?: string; description?: string; tone?: Tone }): Markup;
export function Menu(props?: { id?: string; label?: string; items?: { label: string; icon?: string; value: string; danger?: boolean; disabled?: boolean }[] }): Markup;
export function CommandPalette(props?: { id?: string; title?: string; items?: { label: string; href: string; icon?: string; keywords?: string }[] }): Markup;
/** Idempotent per root. Call cleanup on unmount. Safe to import without a DOM. */
export function enhanceUI(root?: Document | HTMLElement): () => void;
export function setTheme(preference?: Theme, options?: { root?: HTMLElement; persist?: boolean }): string;
export function openDialog(dialog: HTMLDialogElement | null, trigger?: HTMLElement): void;
export function closeDialog(dialog: HTMLDialogElement | null, value?: string): void;
export function toast(description: string, options?: { title?: string; tone?: Tone; duration?: number; document?: Document }): () => void;
export function copyText(value: unknown, document?: Document): Promise<boolean>;
export interface SarahEvents {
  'sarah:themechange': { preference: Theme; theme: 'light' | 'dark' };
  'sarah:tabchange': { index: number; id: string };
  'sarah:selectionchange': { selected: string[]; count: number };
  'sarah:sortchange': { key: string; direction: 'ascending' | 'descending' };
  'sarah:pagechange': { page: number; pages: number };
  'sarah:chipremove': { label: string };
  'sarah:menuaction': { value: string };
  'sarah:command': { href: string; label: string };
}
