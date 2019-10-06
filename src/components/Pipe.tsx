import React, { Component } from 'react';

type PipeProps = {
  value: number;
  index: number;
};

type PipeState = {
  index: number;
  value: number;
  prevValue: number;
};

class Pipe extends Component<PipeProps, PipeState> {
  state = {
    index: this.props.index,
    value: this.props.value,
    prevValue: 0
  };

  updateValue({ nativeEvent: event }: any) {
    const isPrimaryClick = event.buttons === 1;
    if (isPrimaryClick) {
      const targetHeight: number = event.target.clientHeight;
      const pxDistanceFromBottom: number = targetHeight - event.offsetY;
      const percentFromBottom: number = Math.floor(
        (100 * pxDistanceFromBottom) / targetHeight
      );
      this.setState({
        prevValue: this.state.value,
        value: percentFromBottom
      });
    }
    return;
  }

  render(): React.ReactNode {
    return (
      <div
        className={`pipe-${this.state.prevValue}-${this.state.value}`}
        key={this.props.index}
        onMouseMove={this.updateValue.bind(this)}
      >
        {/* {this.props.value} */}
      </div>
    );
  }
}

export default Pipe;
