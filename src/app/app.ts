import {Component, signal} from '@angular/core';
import {RekenbladComponent} from './rekenblad/rekenblad.component';

@Component({
  selector: 'app-root',
  imports: [RekenbladComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
