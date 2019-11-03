import quicksort from './quicksort';
import mergesort from './mergesort';
import SortList from '../SortList';

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
  }
};

export default algorithms;
