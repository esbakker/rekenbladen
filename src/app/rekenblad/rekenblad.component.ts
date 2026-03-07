import {Component} from '@angular/core';
import {GenerateSumService} from '../shared/services/generate-sum.service';
import {ConfigService} from '../shared/services/config.service';
import {UiStateService} from '../shared/services/ui-state.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rekenblad',
  imports: [],
  templateUrl: './rekenblad.component.html',
  styleUrl: './rekenblad.component.scss',
})
export class RekenbladComponent {

  constructor(readonly generateSumService: GenerateSumService, readonly configService: ConfigService,
              readonly uiStateService: UiStateService, private readonly route: ActivatedRoute, private readonly router: Router) {
    this.route.params.pipe(takeUntilDestroyed()).subscribe(data => {
      const seed = data['seed'];
      if (!seed) {
        this.router.navigate(['/', generateSumService.createSeed()]);
      }

      this.generateSumService.seed.set(seed);
    })
  }
}
