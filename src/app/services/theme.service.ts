import {Injectable, signal} from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly storageKey = 'app-theme';

  $theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.$theme());
  }

  toggleTheme() {
    const next = this.$theme() === 'light' ? 'dark' : 'light';
    this.$theme.set(next);
    localStorage.setItem(this.storageKey, next);
    this.applyTheme(next);
  }

  private applyTheme(theme: Theme) {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'dark' : 'light'
    );
  }

  // Tema guardado por el usuario; si no hay uno válido, el que prefiera el sistema operativo
  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
