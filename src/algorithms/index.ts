import SortList from '../SortList';
import quicksort from './quicksort';
import mergesort from './mergesort';
import selectionsort from './selectionsort';
import bubblesort from './bubblesort';

type Algorithm = {
  best: string;
  worst: string;
  sort: (l: SortList) => void;
};

interface AlgorithmMap {
  [key: string]: Algorithm;
}

const algorithms: AlgorithmMap = {
  Quicksort: {
    best: 'n log(n)',
    worst: 'n^2',
    sort: quicksort
  },
  Mergesort: {
    best: 'n log(n)',
    worst: 'n log(n)',
    sort: mergesort
  },
  Selectionsort: {
    best: 'n^2',
    worst: 'n^2',
    sort: selectionsort
  },
  Bubblesort: {
    best: 'n',
    worst: 'n^2',
    sort: bubblesort
  }
};

export default algorithms;
