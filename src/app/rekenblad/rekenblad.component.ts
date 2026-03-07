import {Component, OnInit} from '@angular/core';
import {GenerateSumService} from '../shared/services/generate-sum.service';
import {ConfigService} from '../shared/services/config.service';
import {UiStateService} from '../shared/services/ui-state.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {faBan, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {getConfigQueryParam} from '../shared/url.util';

@Component({
  selector: 'app-rekenblad',
  imports: [
    FormsModule,
    FaIconComponent
  ],
  templateUrl: './rekenblad.component.html',
  styleUrl: './rekenblad.component.scss',
})
export class RekenbladComponent implements OnInit {

  protected readonly faTimes = faTimes;
  protected readonly faCheck = faCheck;
  protected readonly faBan = faBan;

  constructor(readonly generateSumService: GenerateSumService, readonly configService: ConfigService,
              readonly uiStateService: UiStateService, private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const seed = params['seed'];
      if (!seed) {
        return;
      }

      const configQueryParam = getConfigQueryParam();
      if (seed === 'default') {
        this.router.navigate(['/', this.generateSumService.createSeed()], {queryParams: {config: configQueryParam}});

        return;
      }

      this.generateSumService.seed.set(seed);
      this.configService.init(configQueryParam);
    });
  }
}
