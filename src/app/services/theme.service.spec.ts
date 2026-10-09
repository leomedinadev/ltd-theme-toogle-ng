import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  const createService = () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(ThemeService);
  };

  const mockSystemTheme = (prefersDark: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: () => ({ matches: prefersDark }),
    });
  };

  beforeEach(() => {
    localStorage.clear();
    mockSystemTheme(false);
  });

  it('should start with the light theme by default', () => {
    const service = createService();

    expect(service.$theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should follow the system theme when nothing is saved', () => {
    mockSystemTheme(true);

    expect(createService().$theme()).toBe('dark');
  });

  it('should restore the saved theme over the system one', () => {
    mockSystemTheme(true);
    localStorage.setItem('app-theme', 'light');

    expect(createService().$theme()).toBe('light');
  });

  it('should ignore an invalid saved value', () => {
    localStorage.setItem('app-theme', 'purple');

    expect(createService().$theme()).toBe('light');
  });

  it('should toggle, apply and persist the theme', () => {
    const service = createService();

    service.toggleTheme();

    expect(service.$theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('app-theme')).toBe('dark');

    service.toggleTheme();

    expect(service.$theme()).toBe('light');
    expect(localStorage.getItem('app-theme')).toBe('light');
  });
});
