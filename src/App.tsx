import React from 'react';
import SortDisplay from './components/SortDisplay';
import SortList from './SortList';
import quicksort from './algorithms/quicksort';
import './css/App.scss';

const _list = new SortList(10);
const list = _list.clone();
quicksort(list);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">Somesort</header>
      <section>
        <SortDisplay list={list} />
      </section>
    </div>
  );
};

export default App;
