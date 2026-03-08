import {Component, inject, signal} from '@angular/core';
import {ConfigComponent} from './config/config.component';
import {RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [ConfigComponent, RouterOutlet, MatSidenav, MatSidenavContent, MatSidenavContainer, MatToolbar, MatIconButton, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 700px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
}
