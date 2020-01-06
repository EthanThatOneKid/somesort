export default class SortList {
  len: number;
  data: Array<number>;
  steps: number;
  history: Array<Array<number>>;
  minSize: number;
  maxSize: number;
  speedFactor: number;
  constructor(len: number, minSize = 10, maxSize = 100) {
    this.len = Math.floor(len);
    this.data = [];
    this.history = [];
    this.steps = 0;
    this.speedFactor = 1;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.randomize();
  }

  at(i: number): number {
    return this.data[i];
  }

  clearHistory(): void {
    this.history = [];
  }

  clone(): SortList {
    const clone: SortList = new SortList(this.len, this.minSize, this.maxSize);
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

  getSteps(): number {
    return this.steps;
  }

  log(): void {
    console.log([...this.data]);
  }

  randomize(): void {
    this.data = new Array(this.len)
      .fill(0)
      .map((): number => Math.round(Math.random() * 100));
  }

  getSize(): number {
    return this.data.length;
  }

  resize(next: number): boolean {
    if (next < this.maxSize && next > this.minSize) {
      next = Math.floor(next);
      if (next > this.data.length) {
        for (let i = this.data.length; i < next; i++) {
          this.data.push(Math.floor(Math.random() * 100));
        }
      } else if (next < this.data.length) {
        this.data = this.data.slice(0, next);
      }
      this.len = next;
      return true;
    }
    return false;
  }

  step(): void {
    this.steps++;
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
