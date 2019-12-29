// Helpers
const createComplexityFormula = (formula: string): ((n: number) => number) => {
  const jsFormula: string = formula
    .replace(/\s/, '*') // \s = multiplication
    .replace(/\^/, '**') // ^ = exponent
    .replace(/log/, 'Math.log10')
    .replace(/ln/, 'Math.log');
  // eslint-disable-next-line
    return (n: number): number => Math.floor(eval(jsFormula));
};

// Module
export default class PerformanceSummary {
  bestCase: (n: number) => number;
  worstCase: (n: number) => number;
  constructor(bestCase: string, worstCase: string) {
    this.bestCase = createComplexityFormula(bestCase);
    this.worstCase = createComplexityFormula(worstCase);
  }

  summarize(dataSize: number, actualComplexity: number): number {
    const worst = this.worstCase(dataSize);
    const best = this.bestCase(dataSize);
    const discrepancy = worst - best;
    console.log({ dataSize, actualComplexity, worst, best, discrepancy });
    return Math.abs((actualComplexity - discrepancy) / discrepancy);
  }
}
