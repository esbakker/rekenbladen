export interface UiState {
  showAnswers: boolean;
  showHeader: boolean;
  fillingOut: boolean;
  fillOutMinutes?: number;
  timeExpired?: boolean;
  finishedCounts?: {
    correct: number;
    incorrect: number;
    skipped: number;
  }
}
