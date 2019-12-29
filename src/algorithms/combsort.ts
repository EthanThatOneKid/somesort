import SortList from '../SortList';

const combsort = (list: SortList): void => {
  const shrinkFactor = 1.3;
  const len: number = list.getSize();
  let gap: number = len;
  let sorted = false;
  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    let i = 0;
    while (i + gap < len) {
      if (list.at(i) > list.at(i + gap)) {
        list.swap(i, i + gap);
        sorted = false;
      }
      i++;
    }
  }
};

export default combsort;
