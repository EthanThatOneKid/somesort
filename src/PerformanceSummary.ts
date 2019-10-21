// Helpers
const createComplexityFormula = (formula: string): ((n: number) => number) => {
    const jsFormula: string = formula
        .replace(/\s/, "*") // \s = multiplication
        .replace(/\^/, "**") // ^ = exponent
        .replace(/log/, "Math.log10")
        .replace(/ln/, "Math.log");
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
        const discrepancy = this.worstCase(dataSize) - this.bestCase(dataSize);
        return (actualComplexity - discrepancy) / discrepancy;
    }
}
  