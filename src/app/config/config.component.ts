import {Component, DestroyRef, effect, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Config, Entry} from '../shared/model/config';
import {SumOperator} from '../shared/model/sum';
import {ConfigService} from '../shared/services/config.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UiStateService} from '../shared/services/ui-state.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {EntrySummaryPipe} from '../shared/pipes/entry-summary-pipe';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowsRotate, faCopy, faPrint, faTrash} from '@fortawesome/free-solid-svg-icons';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {GenerateSumService} from '../shared/services/generate-sum.service';
import {Router} from '@angular/router';
import {TimePipe} from '../shared/pipes/time-pipe';
import {UiState} from '../shared/model/ui-state';
import {configToBase64} from '../shared/url.util';

@Component({
  selector: 'app-config',
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    EntrySummaryPipe,
    FaIconComponent,
    MatButton,
    MatCheckbox,
    TimePipe
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  configForm = signal<FormGroup | undefined>(undefined);
  stateForm = signal<FormGroup | undefined>(undefined);

  protected readonly faTrash = faTrash;
  protected readonly faPrint = faPrint;
  protected readonly faArrowsRotate = faArrowsRotate;
  protected readonly faCopy = faCopy;

  constructor(private fb: FormBuilder, private readonly configService: ConfigService, protected readonly uiStateService: UiStateService,
              private readonly generateSumService: GenerateSumService, private readonly router: Router, private readonly destroyRef: DestroyRef) {
    const effectRef = effect(() => {
      const initialConfig = this.configService.config();
      if (!initialConfig) {
        return;
      }
      effectRef.destroy();
      const configForm = this.fb.group({
        itemsPerGroup: [initialConfig.itemsPerGroup, [Validators.required, Validators.min(1)]],
        doubleSided: [initialConfig.doubleSided],
        entries: this.fb.array(initialConfig.entries.map(entry => this.createEntryGroup(entry))),
      });
      this.configForm.set(configForm);
      const initialState = this.uiStateService.state();
      const stateForm = this.fb.group({
        showAnswers: [initialState.showAnswers],
        showHeader: [initialState.showHeader],
        fillOutMinutes: [initialState.fillOutMinutes]
      });
      this.stateForm.set(stateForm);
      configForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(config => this.configService.update(config as Partial<Config>));
      stateForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(config => this.uiStateService.update(config as Partial<UiState>));
    });
  }

  get entries(): FormArray {
    return this.configForm()?.get('entries') as FormArray;
  }

  addEntry(): void {
    const newEntry: Entry = {
      id: Date.now(),
      operator: '+' as SumOperator,
      start: 0,
      end: 0,
      nrOfGroups: 1,
    };
    this.entries.push(this.createEntryGroup(newEntry));
  }

  removeEntry(index: number): void {
    this.entries.removeAt(index);
  }

  print() {
      print();
  }

  regenerate() {
    const value = this.generateSumService.createSeed();
    this.generateSumService.seed.set(value);
    this.router.navigate(['/', value], {queryParams: {config: configToBase64(this.configService.config())}});
  }

  copyUrl() {
    window.navigator.clipboard.writeText(window.location.href);
  }

  startFillingOut() {
    this.uiStateService.startFillingOut();
  }

  stopFillingOut() {
    this.uiStateService.stopFillingOut();
  }

  private createEntryGroup(entry: Entry): FormGroup {
    return this.fb.group({
      operator: [entry.operator, Validators.required],
      start: [entry.start, Validators.required],
      end: [entry.end, Validators.required],
      nrOfGroups: [entry.nrOfGroups, [Validators.required, Validators.min(1)]],
    });
  }
}
