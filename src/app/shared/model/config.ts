import {SumOperator} from './sum';

export interface Entry {
  id: number;
  operator: SumOperator;
  start: number;
  end: number;
  nrOfGroups: number;
}

export interface Config {
  itemsPerGroup: number;
  entries: Entry[];
  doubleSided: boolean;
}
