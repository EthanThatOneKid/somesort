import SortList from '../SortList';

const bubblesort = (list: SortList): void => {
  const len: number = list.getSize();
  let swapped = false;
  for (let i = 1; i < len; i++) {
    if (list.at(i - 1) > list.at(i)) {
      list.swap(i - 1, i);
      swapped = true;
    }
  }
  if (swapped) {
    bubblesort(list);
  }
};

export default bubblesort;
