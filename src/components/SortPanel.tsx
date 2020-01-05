import React, { Component } from 'react';
import SortDisplay from './SortDisplay';
import SortList from '../SortList';
import algorithms from '../algorithms';
import Dial from './Dial';

type SortPanelProps = {
  algorithm: string;
};

type SortPanelState = {
  listSize: number;
  sortSpeed: number;
};

class SortPanel extends Component<SortPanelProps, SortPanelState> {
  display: React.RefObject<SortDisplay> = React.createRef();
  list: SortList = new SortList(40);
  currentAlgorithm: string = this.props.algorithm;

  onRandomizeClickListener(): void {
    if (this.display.current !== null) {
      if (!this.display.current.isAnimating) {
        this.list.randomize();
        this.display.current.undoRecentSort();
      }
    }
  }

  onResizeListener(event: React.FormEvent<HTMLInputElement>): void {
    const nextSize = Number(event.currentTarget.value);
    const isProductiveResize = this.list.resize(nextSize);
    if (isProductiveResize) {
      this.setState({ listSize: nextSize });
      setTimeout(() => {
        if (this.display.current !== null) {
          this.display.current.flushList();
        }
      }, 0);
    }
  }

  onDialChange(dialValue: number): void {
    console.log(dialValue);
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
      this.display.current.beginSortAnimation(sortFunction);
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
        <section className="sort-display-container">
          <SortDisplay list={this.list} ref={this.display} />
        </section>
        <section className="buttons-container">
          <label>Sorting Algorithms:</label>
          <section className="sorting-algorithms">
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
          <br />
          <label>Options:</label>
          <section className="sorting-options">
            <button onClick={this.onUndoClickListener.bind(this)}>
              Undo Sort
            </button>
            <button onClick={this.onRandomizeClickListener.bind(this)}>
              Randomize
            </button>
            <input
              className="list-size-input"
              type="range"
              onInput={this.onResizeListener.bind(this)}
            ></input>
            <Dial
              value={100}
              strokes={12}
              sensitivity={2}
              diameter={100}
              valueFactor={20}
              minValue={0}
              maxValue={100}
              onChange={this.onDialChange}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default SortPanel;
