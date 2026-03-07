import {Component} from '@angular/core';
import {GenerateSumService} from '../shared/services/generate-sum.service';
import {ConfigService} from '../shared/services/config.service';
import {UiStateService} from '../shared/services/ui-state.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-rekenblad',
  imports: [
    NgClass
  ],
  templateUrl: './rekenblad.component.html',
  styleUrl: './rekenblad.component.scss',
})
export class RekenbladComponent {

  constructor(readonly generateSumService: GenerateSumService, readonly configService: ConfigService, readonly uiStateService: UiStateService) {
  }
}
