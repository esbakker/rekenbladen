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
      Array.from({length: entry.nrOfGroups}).map(() =>
        Array.from({length: config.itemsPerGroup}).reduce((pv: Sum[]) => {
          const sum = this.createUniqueSum(random, entry, pv);

          return [...pv, sum];
        }, [] as Sum[])
      )
    );
  }

  private createUniqueSum(random: PRNG, entry: Entry, sums: Sum[]) {
    let sum: Sum;

    do {
      sum = this.createSum(random, entry);
    } while (sums.some(s => sumsEqual(sum, s)) || sum.answer > entry.end || sum.answer < entry.start)

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
    return Math.round(random() * ((entry.end) - entry.start)) + entry.start;
  }
}
