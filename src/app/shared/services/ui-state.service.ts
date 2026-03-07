import {Injectable, signal} from '@angular/core';
import {UiState} from '../model/ui-state';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  state = signal<UiState>({showAnswers: false});

  update(updatedState: Partial<UiState>) {
    this.state.update(state => ({...state, ...updatedState}));
  }
}
