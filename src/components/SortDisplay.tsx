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
  render(): React.ReactNode {
    return (
      <div className="sort-display">
        {this.props.list.getData().map((value, i) => {
          return <Pipe value={value} index={i} />;
        })}
      </div>
    );
  }
}

export default SortDisplay;
