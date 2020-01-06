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
};

class SortPanel extends Component<SortPanelProps, SortPanelState> {
  display: React.RefObject<SortDisplay> = React.createRef();
  sizeDialRef: React.RefObject<Dial> = React.createRef();
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

  onResizeListener(nextSize: number): void {
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
    if (this.display.current !== null) {
      this.display.current.setSortSpeed(dialValue);
    }
  }

  onSortClickListener(name: string): void {
    if (this.display.current !== null) {
      if (!this.display.current.isAnimating) {
        this.currentAlgorithm = name;
        this.executeSort();
      }
    }
  }

  onCancelListener(): void {
    if (this.display.current !== null) {
      this.display.current.cancelSortAnimation();
    }
  }

  onSortCompleteListener(): void {
    if (this.sizeDialRef.current !== null) {
      this.sizeDialRef.current.toggleInteraction(true);
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
      if (this.sizeDialRef.current !== null) {
        this.sizeDialRef.current.toggleInteraction(false);
      }
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
          <SortDisplay
            list={this.list}
            ref={this.display}
            onSortComplete={this.onSortCompleteListener.bind(this)}
          />
        </section>
        <section className="buttons-container">
          <section className="sorting-algorithms">
            <label>Sorting Algorithms:</label>
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
          <section className="sorting-options">
            <label>Options:</label>
            <button onClick={this.onUndoClickListener.bind(this)}>
              Undo Sort
            </button>
            <button onClick={this.onRandomizeClickListener.bind(this)}>
              Randomize
            </button>
            <button onClick={this.onCancelListener.bind(this)}>Cancel</button>
          </section>
          <br />
          <section className="speed-option-container">
            <label>Speed:</label>
            <Dial
              value={100}
              strokes={12}
              sensitivity={2}
              diameter={100}
              valueFactor={20}
              minValue={0}
              maxValue={100}
              onChange={this.onDialChange.bind(this)}
            />
          </section>
          <section className="size-option-container">
            <label>Size:</label>
            <Dial
              value={40}
              strokes={12}
              sensitivity={2}
              diameter={100}
              valueFactor={20}
              minValue={10}
              maxValue={100}
              ref={this.sizeDialRef}
              onChange={this.onResizeListener.bind(this)}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default SortPanel;
