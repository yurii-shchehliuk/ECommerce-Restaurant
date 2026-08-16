import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  const root = () => document.documentElement;

  beforeEach(() => {
    localStorage.removeItem('owlet_theme');
    root().removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem('owlet_theme');
    root().removeAttribute('data-theme');
  });

  it('follows the system by default and stamps nothing on the document', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.preference()).toBe('system');
    expect(root().hasAttribute('data-theme')).toBe(false);
  });

  it('stamps an explicit choice, which outranks the media query', () => {
    const service = TestBed.inject(ThemeService);
    service.preference.set('dark');
    TestBed.tick();

    expect(root().getAttribute('data-theme')).toBe('dark');
  });

  it('cycles light, dark, system and back', () => {
    const service = TestBed.inject(ThemeService);
    service.preference.set('light');

    service.cycle();
    expect(service.preference()).toBe('dark');
    service.cycle();
    expect(service.preference()).toBe('system');
    service.cycle();
    expect(service.preference()).toBe('light');
  });

  it('removes the stamp again when the reader goes back to following the system', () => {
    const service = TestBed.inject(ThemeService);
    service.preference.set('dark');
    TestBed.tick();
    service.preference.set('system');
    TestBed.tick();

    expect(root().hasAttribute('data-theme')).toBe(false);
  });

  it('remembers the choice across a reload', () => {
    const service = TestBed.inject(ThemeService);
    service.preference.set('light');
    TestBed.tick();

    expect(localStorage.getItem('owlet_theme')).toBe('light');
  });

  it('ignores a stored value that is not a theme', () => {
    localStorage.setItem('owlet_theme', 'chartreuse');

    expect(TestBed.inject(ThemeService).preference()).toBe('system');
  });
});
