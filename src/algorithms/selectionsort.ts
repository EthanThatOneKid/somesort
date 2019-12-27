import SortList from '../SortList';

const selectionsort = (list: SortList): void => {
  const len: number = list.getSize();
  for (let i = 0; i < len; i++) {
    let min: number = i;
    for (let j: number = i + 1; j < len; j++) {
      if (list.at(j) < list.at(min)) {
        min = j;
      }
    }
    if (min != i) {
      list.swap(i, min);
    }
  }
};

export default selectionsort;
