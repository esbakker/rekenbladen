import {Injectable, signal} from '@angular/core';
import {UiState} from '../model/ui-state';
import {GenerateSumService} from './generate-sum.service';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  state = signal<UiState>({showAnswers: false, showHeader: false, fillingOut: false, fillOutMinutes: 5});
  remainingTime = signal<number | undefined>(undefined);
  private timeoutId?: number;

  constructor(private readonly generateSumService: GenerateSumService) {
  }

  update(updatedState: Partial<UiState>) {
    this.state.update(state => ({...state, ...updatedState}));
  }

  startFillingOut() {
    this.generateSumService.answeredSums.set([]);
    this.update({fillingOut: true});
    const endTime = new Date().getTime() + this.state().fillOutMinutes! * 60 * 1000;
    this.remainingTime.set(this.state().fillOutMinutes! * 60);
    this.updateRemainingSeconds(endTime);
  }

  stopFillingOut() {
    clearTimeout(this.timeoutId);
    if (this.state().timeExpired) {
      this.update({fillingOut: false, timeExpired: false});
      this.generateSumService.sums().forEach(sums => sums.forEach(sum => sum.givenAnswer = undefined));
    } else {
      this.update({timeExpired: true, finishedCounts: this.calculateCounts()});
    }
  }

  private updateRemainingSeconds(endTime: number) {
    this.timeoutId = setTimeout(() => {
      const remainingSeconds = Math.round((endTime - new Date().getTime()) / 1000);
      this.remainingTime.set(remainingSeconds);
      if (remainingSeconds <= 0) {
        this.stopFillingOut();
      } else {
        this.updateRemainingSeconds(endTime);
      }
    }, this.state().fillOutMinutes! * 60);
  }

  private calculateCounts() {
    return this.generateSumService.answeredSums().reduce((pv, sum) => {
      if (sum.givenAnswer === sum.answer) {
        pv.correct += 1;
      } else if (sum.givenAnswer !== undefined) {
        pv.incorrect += 1;
      } else {
        pv.skipped += 1;
      }

      return pv;
    }, {correct: 0, incorrect: 0, skipped: 0});
  }
}
