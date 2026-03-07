import {Injectable, signal} from '@angular/core';
import {ConfigService} from './config.service';
import {Sum, sumsEqual} from '../model/sum';
import seedrandom, {PRNG} from 'seedrandom';
import {Entry} from '../model/config';
import {evaluate} from 'mathjs';

@Injectable({
  providedIn: 'root',
})
export class GenerateSumService {

  sums = signal<Sum[][]>([]);

  constructor(private readonly configService: ConfigService) {
  }

  generateSums() {
    const random = seedrandom();
    const config = this.configService.config();
    const generatedSums = config.entries.flatMap(entry =>
      Array.from({length: entry.nrOfGroups}).map(() =>
        Array.from({length: config.itemsPersGroup}).reduce((pv: Sum[]) => {
          const sum = this.createSum(random, entry);

          return [...pv, sum];
        }, [] as Sum[])
      )
    );
    this.sums.set(generatedSums)
  }

  private createUniqueSum(random: PRNG, entry: Entry, sums: Sum[]) {
    let sum = this.createSum(random, entry);
    while (sums.some(s => sumsEqual(sum, s))) {
      sum = this.createSum(random, entry);
    }
    return sum;
  }

  private createSum(random: PRNG, entry: Entry) {
    const first = this.generateNumber(random, entry);
    let second = this.generateNumber(random, entry);

    return {
      first: first,
      second: second,
      operator: entry.operator,
      answer: evaluate(`${first} ${entry.operator} ${second}`)
    } as Sum;
  }

  private generateNumber(random: PRNG, entry: Entry) {
    return Math.floor(random() * (entry.end - entry.start + 1)) + entry.start;
  }
}
