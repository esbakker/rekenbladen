import {Injectable, signal} from '@angular/core';
import {Config, Entry} from '../model/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public config = signal<Config>({
    itemsPersGroup: 5,
    entries: [{nrOfGroups: 12, start: 0, end: 10, operator: '+', id: 0}, {nrOfGroups: 8, start: 0, end: 10, operator: '-', id: 0}]
  });

  addEntry(entry: Entry) {
    this.config.update(config => ({...config, entries: [...config.entries, entry]}));
  }
}
