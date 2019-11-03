import React, { Component, RefObject } from 'react';
import Pipe from './Pipe';
import SortList from '../SortList';
import PerformanceSummary from '../PerformanceSummary';

type SortDisplayProps = {
  list: SortList;
};

type SortDisplayState = {};

class SortDisplay extends Component<SortDisplayProps, SortDisplayState> {
  pipes: Array<Pipe> = [];
  containerRef: RefObject<HTMLDivElement> = React.createRef();
  currentInstruction = 0;
  isAnimating = false;

  beginSortAnimation(
    sortFunction: (l: SortList) => void,
    perf: PerformanceSummary,
    time = 5e3
  ): void {
    this.props.list.clearHistory();
    this.props.list.updateData(
      this.pipes.map((pipe: Pipe): number => {
        return pipe.getValue();
      })
    );
    const sortedList: SortList = this.props.list.clone();
    sortFunction(sortedList);
    console.log({
      before: this.props.list,
      after: sortedList
    });
    const instructions: Array<Array<number>> = sortedList.getHistory();
    console.log(perf.summarize(sortedList.getSize(), sortedList.getSteps()));
    const interval: number = instructions.length / time;
    this.toggleUserInput(false);
    this.stepSortAnimation(instructions, interval);
  }

  stepSortAnimation(instructions: Array<Array<number>>, interval = 0): void {
    if (instructions.length > this.currentInstruction) {
      const [i, j] = instructions[this.currentInstruction];
      const pipeA: Pipe = this.pipes[i];
      const pipeB: Pipe = this.pipes[j];
      const tempValue: number = pipeA.getValue();
      pipeA.updateValue(pipeB.getValue());
      pipeB.updateValue(tempValue);
      this.currentInstruction++;
      setTimeout((): void => {
        this.stepSortAnimation(instructions, interval);
      }, interval);
    } else {
      console.log('DONE');
      this.currentInstruction = 0;
      this.toggleUserInput(true);
    }
    return;
  }

  setPipeRef(el: Pipe | null, i: number): void {
    this.pipes[i] = el as Pipe;
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
