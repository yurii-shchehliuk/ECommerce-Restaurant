import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'owlet_theme';

/**
 * Light and dark, as a three-state preference.
 *
 * "system" is the default and stamps nothing on the document, so the palette
 * follows prefers-color-scheme. Choosing light or dark stamps `data-theme`, which
 * outranks the media query in both directions - a reader who wants the light theme
 * on a dark machine gets it.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);

  readonly preference = signal<ThemePreference>(this.read());

  constructor() {
    effect(() => {
      const preference = this.preference();
      const root = this.document.documentElement;

      if (preference === 'system') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', preference);
      }

      localStorage.setItem(STORAGE_KEY, preference);
    });
  }

  /** Cycles light to dark to system, which is the whole control. */
  cycle(): void {
    const next: Record<ThemePreference, ThemePreference> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
    };
    this.preference.set(next[this.preference()]);
  }

  private read(): ThemePreference {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  }
}
