export default class SortList {
  len: number;
  data: Array<number>;
  steps: number;
  history: Array<Array<number>>;
  constructor(len: number) {
    this.len = Math.floor(len);
    this.data = [];
    this.history = [];
    this.steps = 0;
    this.randomize();
  }

  at(i: number): number {
    return this.data[i];
  }

  clearHistory(): void {
    this.history = [];
  }

  clone(): SortList {
    const clone: SortList = new SortList(this.len);
    clone.data = [...this.data];
    clone.history = [...this.history];
    return clone;
  }

  getData(): Array<number> {
    return [...this.data];
  }

  getHistory(): Array<Array<number>> {
    return [...this.history];
  }

  log(): void {
    console.log([...this.data]);
  }

  randomize(): void {
    this.data = new Array(this.len)
      .fill(0)
      .map((): number => Math.round(Math.random() * 100));
  }

  swap(i: number, j: number): void {
    const temp: number = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
    if (i !== j) {
      this.history.push([i, j]);
    }
  }

  toString(): string {
    return JSON.stringify(this.data, null, 2);
  }

  updateData(data: Array<number>): void {
    this.data = [...data.slice(0, this.len)];
  }
}
