import { Component, signal, inject } from '@angular/core';
import {Home} from './home/home';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ltd-theme-toogle-ng');

  themeService = inject(ThemeService);
  $theme = this.themeService.$theme;


  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
