import React, { Component } from 'react';
import SortDisplay from './SortDisplay';
import SortList from '../SortList';
import algorithms from '../algorithms';

type SortPanelProps = {
  algorithm: string;
};

type SortPanelState = {
  currentAlgorithm: string;
};

class SortPanel extends Component<SortPanelProps, SortPanelState> {
  display: React.RefObject<SortDisplay> = React.createRef();
  list: SortList = new SortList(100);
  state = {
    currentAlgorithm: this.props.algorithm
  };
  setAlgorithm(name: string): void {
    this.setState({
      currentAlgorithm: name
    });
  }

  onClickListener(
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    name: string
  ): void {
    this.setAlgorithm(name);
    this.executeSort();
    return;
  }

  executeSort(): void {
    if (this.display.current !== null) {
      const sortFunction: (l: SortList) => void =
        algorithms[this.state.currentAlgorithm].sort;
      this.display.current.beginSortAnimation(sortFunction);
    }
    return;
  }

  render(): React.ReactNode {
    return (
      <div className="sort-panel">
        <section>
          <SortDisplay list={this.list} ref={this.display} />
        </section>
        <section>
          {Object.keys(algorithms).map((name: string) => {
            return (
              <button
                key={name}
                onClick={this.onClickListener.bind(this, name)}
              >
                {name}
              </button>
            );
          })}
        </section>
      </div>
    );
  }
}

export default SortPanel;
