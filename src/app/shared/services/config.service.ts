import {computed, Injectable, signal} from '@angular/core';
import {Config} from '../model/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public config = signal<Config>({
    itemsPerGroup: 5,
    entries: [{nrOfGroups: 12, start: 0, end: 10, operator: '+', id: 0}, {nrOfGroups: 8, start: 0, end: 10, operator: '-', id: 0}],
    doubleSided: false,
  });

  sumGenerationConfig = computed(() => ({...this.config(), showAnswers: undefined}));

  update(updatedConfig: Partial<Config>) {
    this.config.update(config => ({...config, ...updatedConfig}));
  }
}
