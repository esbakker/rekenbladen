export type SumOperator = '+' | '-';

export interface Sum {
  id: number;
  first: number;
  second: number;
  operator: SumOperator;
  answer: number;
  givenAnswer?: number;
}

export const sumsEqual = (sum1: Sum, sum2: Sum) => {
  if (sum1.operator !== sum2.operator) {
    return false;
  }

  if (sum1.answer !== sum2.answer) {
    return false;
  }

  return sum1.first === sum2.first && sum1.second === sum2.second || sum1.first === sum2.second && sum1.second === sum2.first;
};
