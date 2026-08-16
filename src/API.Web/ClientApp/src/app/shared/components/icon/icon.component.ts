import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * The application's whole icon set, as inline SVG.
 *
 * Every glyph below is drawn on the same 24x24 grid with the same stroke weight,
 * so icons share an optical size wherever they are used. Inlining them means no
 * icon font, no extra network request and no flash of missing glyphs, and lets an
 * icon inherit `currentColor` and its size from the surrounding CSS.
 */
export type IconName =
  | 'cart'
  | 'user'
  | 'search'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'check'
  | 'check-circle'
  | 'alert'
  | 'x'
  | 'menu'
  | 'package'
  | 'receipt'
  | 'logout'
  | 'send'
  | 'sun'
  | 'moon'
  | 'activity'
  | 'download'
  | 'filter'
  | 'inbox'
  | 'refresh'
  | 'truck'
  | 'credit-card'
  | 'shield'
  | 'contrast'
  | 'clock'
  | 'arrow-right';

const PATHS: Record<IconName, string> = {
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2.4 12.1a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H5.3"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M10 4h4M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  'chevron-left': '<path d="m14.5 5-6 7 6 7"/>',
  'chevron-right': '<path d="m9.5 5 6 7-6 7"/>',
  'chevron-down': '<path d="m5 9 7 6 7-6"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.7 2.7L16 9.5"/>',
  alert: '<path d="M12 3.5 1.8 20.5h20.4L12 3.5Z"/><path d="M12 10v4.2"/><path d="M12 17.6h.01"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  package: '<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/>',
  receipt: '<path d="M5 3h14v18l-2.3-1.5L14.4 21l-2.4-1.5L9.6 21l-2.3-1.5L5 21V3Z"/><path d="M9 8h6M9 12h6"/>',
  logout: '<path d="M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15"/><path d="M10 8 6 12l4 4M6 12h9"/>',
  send: '<path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
  moon: '<path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"/>',
  activity: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  download: '<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
  inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.4 5h13.2l2.4 8v5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 18v-5l2.4-8Z"/>',
  refresh: '<path d="M20 6v5h-5M4 18v-5h5"/><path d="M19.3 11a7.5 7.5 0 0 0-13-3.2L4 11m0 2a7.5 7.5 0 0 0 13 3.2l2.3-3.2"/>',
  truck: '<path d="M3 6h11v11H3zM14 9h4l3 3.2V17h-7"/><circle cx="7" cy="18.5" r="1.7"/><circle cx="17.5" cy="18.5" r="1.7"/>',
  'credit-card': '<rect x="2.5" y="5" width="19" height="14" rx="2.2"/><path d="M2.5 10h19M6 15h3"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.2 2.8 7.6 7 9.5 4.2-1.9 7-5.3 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.4l3.4 2"/>',
  'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
};

@Component({
    selector: 'app-icon',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<svg
    [attr.width]="size()"
    [attr.height]="size()"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    [innerHTML]="markup()"
  ></svg>`,
    styles: [':host{display:inline-flex;line-height:0}']
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();
  /** Edge length in px. Icons are square. */
  readonly size = input(20);

  /**
   * Trusted because every value comes from the constant table above. The input is a
   * key into that table, never markup from a caller, so nothing a caller supplies is
   * ever parsed as HTML.
   */
  readonly markup = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(PATHS[this.name()] ?? '')
  );
}
