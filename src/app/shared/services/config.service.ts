import {effect, Injectable, signal} from '@angular/core';
import {Config} from '../model/config';
import {ActivatedRoute, Router} from '@angular/router';

export const DEFAULT_CONFIG: Config = {
  itemsPerGroup: 5,
  entries: [{nrOfGroups: 12, start: 1, end: 10, operator: '+', id: 0}, {nrOfGroups: 8, start: 1, end: 10, operator: '-', id: 0}],
  doubleSided: false,
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config = signal<Config | undefined>(undefined);

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    effect(() => {
      const config = this.config();
      if (config) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            replaceUrl: true,
          queryParams: {config: btoa(JSON.stringify(config))}
          }
        )
      }
    });
  }

  init(configParam?: string) {
    const decodedConfigParam = configParam ? decodeURIComponent(configParam) : '';
    const newConfig: Config = decodedConfigParam ? JSON.parse(atob(decodedConfigParam)) : {...DEFAULT_CONFIG};
    this.update(newConfig);
  }

  update(updatedConfig: Partial<Config>) {
    this.config.update(config => config ? ({...config, ...updatedConfig}) : {...DEFAULT_CONFIG, ...updatedConfig});
  }
}
