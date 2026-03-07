import {Component, signal} from '@angular/core';
import {RekenbladComponent} from './rekenblad/rekenblad.component';
import {ConfigComponent} from './config/config.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RekenbladComponent, ConfigComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
