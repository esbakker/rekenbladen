import {Component} from '@angular/core';
import {GenerateSumService} from '../shared/services/generate-sum.service';

@Component({
  selector: 'app-rekenblad',
  imports: [],
  templateUrl: './rekenblad.component.html',
  styleUrl: './rekenblad.component.scss',
})
export class RekenbladComponent {

  constructor(readonly generateSumService: GenerateSumService) {
    this.generateSumService.generateSums();
  }
}
