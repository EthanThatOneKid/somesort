import quicksort from './quicksort';
import SortList from '../SortList';

type Algorithm = {
  info: string;
  sort: (l: SortList) => void;
};

interface AlgorithmMap {
  [key: string]: Algorithm;
}

const algorithms: AlgorithmMap = {
  Quicksort: {
    info: 'https://en.wikipedia.org/wiki/Quicksort',
    sort: quicksort
  }
};

export default algorithms;
