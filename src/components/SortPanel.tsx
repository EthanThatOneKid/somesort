import React, { Component } from 'react';
import SortDisplay from './SortDisplay';
import SortList from '../SortList';
import algorithms from '../algorithms';
import PerformanceSummary from '../PerformanceSummary';

type SortPanelProps = {
  algorithm: string;
};

type SortPanelState = {};

class SortPanel extends Component<SortPanelProps, SortPanelState> {
  display: React.RefObject<SortDisplay> = React.createRef();
  list: SortList = new SortList(100);
  currentAlgorithm: string = this.props.algorithm;

  onRandomizeClickListener(): void {
    if (this.display.current !== null) {
      if (!this.display.current.isAnimating) {
        this.list.randomize();
        this.display.current.undoRecentSort();
      }
    }
  }

  onSortClickListener(
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    name: string
  ): void {
    if (this.display.current !== null) {
      if (!this.display.current.isAnimating) {
        this.currentAlgorithm = name;
        this.executeSort();
      }
    }
  }

  onUndoClickListener(): void {
    if (this.display.current !== null) {
      if (!this.display.current.isAnimating) {
        this.display.current.undoRecentSort();
      }
    }
  }

  executeSort(): void {
    if (this.display.current !== null) {
      const sortFunction: (l: SortList) => void =
        algorithms[this.currentAlgorithm].sort;
      this.display.current.beginSortAnimation(
        sortFunction,
        new PerformanceSummary(
          algorithms[this.currentAlgorithm].best,
          algorithms[this.currentAlgorithm].worst
        )
      );
    }
  }

  checkDisplayIsAnimating(): boolean {
    if (this.display.current !== null) {
      return this.display.current.isAnimating;
    }
    return false;
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
                onClick={this.onSortClickListener.bind(this, name)}
                title={name}
              >
                {name}
              </button>
            );
          })}
        </section>
        <button onClick={this.onUndoClickListener.bind(this)}>Undo Sort</button>
        <button onClick={this.onRandomizeClickListener.bind(this)}>
          Randomize
        </button>
      </div>
    );
  }
}

export default SortPanel;
