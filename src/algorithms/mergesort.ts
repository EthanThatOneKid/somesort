import SortList from '../SortList';

const merge = (list: SortList, beg: number, mid: number, end: number): void => {
  let beg2: number = mid + 1;
  if (list.at(mid) <= list.at(beg2)) {
    return;
  }
  while (beg <= mid && beg2 <= end) {
    if (list.at(beg) <= list.at(beg2)) {
      beg++;
    } else {
      let index = beg2;
      while (index !== beg) {
        list.swap(index, --index);
      }
      beg++;
      mid++;
      beg2++;
    }
  }
};

const mergesort = (list: SortList, l = 0, r: number = list.len - 1): void => {
  if (l < r) {
    const m: number = Math.floor((r - l) * 0.5) + l;
    mergesort(list, l, m);
    mergesort(list, m + 1, r);
    merge(list, l, m, r);
    list.step();
  }
};

export default mergesort;
