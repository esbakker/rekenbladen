import {Component, signal} from '@angular/core';
import {RekenbladComponent} from './rekenblad/rekenblad.component';
import {ConfigComponent} from './config/config.component';

@Component({
  selector: 'app-root',
  imports: [RekenbladComponent, ConfigComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
