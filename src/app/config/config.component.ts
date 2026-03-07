import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Entry} from '../shared/model/config';
import {SumOperator} from '../shared/model/sum';
import {ConfigService} from '../shared/services/config.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UiStateService} from '../shared/services/ui-state.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {EntrySummaryPipe} from '../shared/pipes/entry-summary-pipe';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPrint, faTrash} from '@fortawesome/free-solid-svg-icons';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';

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
    MatCheckbox
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  configForm: FormGroup;
  stateForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly configService: ConfigService, private readonly uiStateService: UiStateService) {
    const initialConfig = this.configService.config();
    this.configForm = this.fb.group({
      itemsPerGroup: [initialConfig.itemsPerGroup, [Validators.required, Validators.min(1)]],
      doubleSided: [initialConfig.doubleSided],
      entries: this.fb.array(initialConfig.entries.map(entry => this.createEntryGroup(entry))),
    });
    const initialState = this.uiStateService.state();
    this.stateForm = this.fb.group({
      showAnswers: [initialState.showAnswers]
    })
    this.configForm.valueChanges.pipe(takeUntilDestroyed())
      .subscribe(config => this.configService.update(config));
    this.stateForm.valueChanges.pipe(takeUntilDestroyed())
      .subscribe(config => this.uiStateService.update(config));
  }

  private createEntryGroup(entry: Entry): FormGroup {
    return this.fb.group({
      operator: [entry.operator, Validators.required],
      start: [entry.start, Validators.required],
      end: [entry.end, Validators.required],
      nrOfGroups: [entry.nrOfGroups, [Validators.required, Validators.min(1)]],
    });
  }

  get entries(): FormArray {
    return this.configForm.get('entries') as FormArray;
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

  protected readonly faTrash = faTrash;
  protected readonly faPrint = faPrint;

  print() {
    window.print();
  }
}
