import SortList from '../SortList';

const createPartition = (list: SortList, lo: number, hi: number): number => {
  const pivot: number = list.at(hi);
  let i: number = lo;
  while (lo < hi) {
    if (list.at(lo) < pivot) {
      list.swap(i, lo);
      i++;
    }
    lo++;
  }
  list.swap(i, hi);
  return i;
};

const quicksort = (list: SortList, lo = 0, hi: number = list.len - 1): void => {
  if (lo < hi) {
    const partition: number = createPartition(list, lo, hi);
    quicksort(list, lo, partition - 1);
    quicksort(list, partition + 1, hi);
  }
};

export default quicksort;
