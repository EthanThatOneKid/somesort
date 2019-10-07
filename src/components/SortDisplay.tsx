import React, { Component } from 'react';
import Pipe from './Pipe';
import SortList from '../SortList';

type SortDisplayProps = {
  list: SortList;
};

type SortDisplayState = {
  currentInstruction: number;
};

class SortDisplay extends Component<SortDisplayProps, SortDisplayState> {
  pipes: Array<Pipe> = [];
  state = {
    currentInstruction: 0
  };

  beginSortAnimation(sortFunction: (l: SortList) => void): void {
    const sortedList: SortList = this.props.list.clone();
    sortFunction(sortedList);
    const instructions: Array<Array<number>> = sortedList.getHistory();
    this.stepSortAnimation(instructions, 1e3);
  }

  stepSortAnimation(instructions: Array<Array<number>>, interval = 1e3): void {
    if (instructions.length - 1 > this.state.currentInstruction) {
      const [i, j] = instructions[this.state.currentInstruction];
      const pipeA: Pipe = this.pipes[i];
      const pipeB: Pipe = this.pipes[j];
      const tempValue: number = pipeA.getValue();
      pipeA.updateValue(pipeB.getValue());
      pipeB.updateValue(tempValue);
      this.setState({
        currentInstruction: this.state.currentInstruction + 1
      });
      setTimeout((): void => {
        this.stepSortAnimation(instructions, interval);
      }, interval);
    } else {
      console.log("DONE")
      console.log(instructions)
    }
    return;
  }

  setPipeRef(el: Pipe | null, i: number): void {
    this.pipes[i] = el as Pipe;
  }

  render(): React.ReactNode {
    return (
      <div className="sort-display">
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
