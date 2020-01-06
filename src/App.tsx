import React from 'react';
import GithubCorner from 'react-github-corner';
import SortPanel from './components/SortPanel';
import './css/App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <GithubCorner
        href="https://github.com/ethanthatonekid/somesort"
        octoColor="rgb(20, 22, 26)"
        bannerColor="rgb(90, 92, 96)"
      />
      <header className="app-header">Somesort</header>
      <section>
        <SortPanel algorithm="Quicksort" />
      </section>
    </div>
  );
};

export default App;
