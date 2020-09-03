import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  isDark: boolean;

  constructor() {}

  ngOnInit(): void {
    this.themeColor(localStorage.getItem('ThemeColor'));
  }

  themeColor(val: string) {
    if (val === 'dark') {
      this.isDark = true;
      localStorage.setItem('ThemeColor', 'dark');
      return;
    }
    localStorage.setItem('ThemeColor', 'light');
    this.isDark = false;
  }
}
