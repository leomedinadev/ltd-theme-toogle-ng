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

  private getInitialTheme(): Theme {
    return (localStorage.getItem(this.storageKey) as Theme) ?? 'light';
  }
}
