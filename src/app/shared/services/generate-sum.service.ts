import {computed, Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Sum, sumsEqual} from '../model/sum';
import seedrandom, {PRNG} from 'seedrandom';
import {Config, Entry} from '../model/config';
import {evaluate} from 'mathjs';

@Injectable({
  providedIn: 'root',
})
export class GenerateSumService {

  sums = computed<Sum[][]>(() => this.generateSums());

  constructor(private readonly configService: ConfigService) {
  }

  private generateSums() {
    const random = seedrandom();
    const config = this.configService.sumGenerationConfig();
    let sums = this.createSums(config, random);
    if (config.doubleSided) {
      sums = sums.concat(this.createSums(config, random));
    }
    return sums;
  }

  private createSums(config: Config, random: PRNG) {
    return config.entries.flatMap(entry =>
      Array.from({length: entry.nrOfGroups}).map(() => {
          if (entry.start >= entry.end) {
            return [];
          }

          return Array.from({length: config.itemsPerGroup}).reduce((pv: Sum[]) => {
            const sum = this.createUniqueSum(random, entry, pv);

            return [...pv, sum];
          }, [] as Sum[]);
        }
      ));
  }

  private createUniqueSum(random: PRNG, entry: Entry, sums: Sum[]) {
    let sum: Sum;
    let attempts = 0;

    do {
      attempts += 1;
      sum = this.createSum(random, entry);
    } while (attempts < 100 && (sums.some(s => sumsEqual(sum, s)) || this.sumInvalid(sum, entry)))

    return sum;
  }

  private sumInvalid(sum: Sum, entry: Entry) {
    return sum.answer > entry.end || sum.answer < entry.start || !sum.first && !sum.second;
  }

  private createSum(random: PRNG, entry: Entry) {
    const first = this.generateNumber(random, entry);
    let second = this.generateNumber(random, entry, first);

    return {
      first: first,
      second: second,
      operator: entry.operator,
      answer: evaluate(`${first} ${entry.operator} ${second}`)
    } as Sum;
  }

  private generateNumber(random: PRNG, entry: Entry, first?: number) {
    let end = entry.end;
    let start = entry.start;
    if (first !== undefined) {
      end = entry.operator === '-' ? first : (entry.end - first);
      start = 1;
    }
    return Math.round(random() * end) + start;
  }
}
