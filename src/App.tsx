import React from 'react';
import SortPanel from './components/SortPanel';
import './css/App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">Somesort</header>
      <section>
        <SortPanel algorithm="Quicksort" />
      </section>
    </div>
  );
};

export default App;
