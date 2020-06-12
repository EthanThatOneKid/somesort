import React, { Component, RefObject } from 'react';
import Pipe from './Pipe';
import SortList from '../SortList';

type SortDisplayProps = {
  list: SortList;
  onSortComplete: () => void;
};

type SortDisplayState = {};

class SortDisplay extends Component<SortDisplayProps, SortDisplayState> {
  pipes: Array<Pipe> = [];
  containerRef: RefObject<HTMLDivElement> = React.createRef();
  currentInstruction = 0;
  sortSpeedFactor = 0;
  isAnimating = false;
  isRequestingCancel = false;

  beginSortAnimation(sortFunction: (l: SortList) => void): void {
    this.props.list.clearHistory();
    this.props.list.updateData(
      this.pipes.map((pipe: Pipe): number => {
        return pipe.getValue();
      })
    );
    const sortedList: SortList = this.props.list.clone();
    sortFunction(sortedList);
    const instructions: Array<Array<number>> = sortedList.getHistory();
    this.toggleUserInput(false);
    this.stepSortAnimation(instructions);
  }

  cancelSortAnimation(): void {
    if (this.isAnimating) {
      this.isRequestingCancel = true;
    }
  }

  stepSortAnimation(instructions: Array<Array<number>>): void {
    if (
      instructions.length > this.currentInstruction &&
      !this.isRequestingCancel
    ) {
      const [i, j] = instructions[this.currentInstruction++];
      const pipeA: Pipe = this.pipes[i];
      const pipeB: Pipe = this.pipes[j];
      const tempValue: number = pipeA.getValue();
      pipeA.updateValue(pipeB.getValue());
      pipeB.updateValue(tempValue);
      const interval: number = this.sortSpeedFactor * 1e3;
      setTimeout((): void => {
        this.stepSortAnimation(instructions);
      }, interval);
    } else {
      this.currentInstruction = 0;
      this.toggleUserInput(true);
      if (this.isRequestingCancel) {
        this.flushList();
        this.isRequestingCancel = false;
      }
      this.props.onSortComplete();
    }
    return;
  }

  setPipeRef(el: Pipe | null, i: number): void {
    this.pipes[i] = el as Pipe;
  }

  setSortSpeed(sortSpeed: number): void {
    // Desmos function: y=-\left(\frac{x}{100}\right)^{\frac{1}{2}}+1
    this.sortSpeedFactor = -1 * Math.pow(sortSpeed / 100, 0.5) + 1;
  }

  flushList(): void {
    this.pipes = this.pipes.slice(0, this.props.list.getSize());
    this.props.list.updateData(this.pipes.map((pipe) => pipe.getValue()));
  }

  toggleUserInput(mayUseUserInput?: boolean): void {
    const userInputClassName = 'unselectable';
    if (this.containerRef.current !== null) {
      if (typeof mayUseUserInput === 'undefined') {
        this.isAnimating = !this.isAnimating;
        this.containerRef.current.classList.toggle(userInputClassName);
      } else {
        if (mayUseUserInput) {
          this.isAnimating = false;
          this.containerRef.current.classList.remove(userInputClassName);
        } else {
          this.isAnimating = true;
          this.containerRef.current.classList.add(userInputClassName);
        }
      }
    }
  }

  undoRecentSort(): void {
    this.pipes.forEach((pipe: Pipe, i: number) => {
      const prevValue: number = this.props.list.at(i);
      pipe.updateValue(prevValue);
    });
  }

  render(): React.ReactNode {
    return (
      <div className="sort-display" ref={this.containerRef}>
        {this.props.list.getData().map((value, i) => {
          return (
            <Pipe
              value={value}
              index={i}
              key={i}
              ref={(el: Pipe | null): void => this.setPipeRef(el, i)}
            />
          );
        })}
      </div>
    );
  }
}

export default SortDisplay;
