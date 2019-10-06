import React, { Component } from 'react';

type PipeProps = {
  value: number;
  index: number;
};

type PipeState = {
  index: number;
};

class Pipe extends Component<PipeProps, PipeState> {
  render(): React.ReactNode {
    return <div className="pipe" key={this.props.index}>
      {this.props.value}
    </div>;
  }
}

export default Pipe;
