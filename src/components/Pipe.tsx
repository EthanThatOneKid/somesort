import React, { Component } from 'react';

type PipeProps = {
  value: number;
  index: number;
};

type PipeState = {
  index: number;
  value: number;
};

class Pipe extends Component<PipeProps, PipeState> {
  state = {
    index: this.props.index,
    value: this.props.value
  };

  mouseMoveListener(
    reactEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    // tslint:disable-next-line (@typescript-eslint/no-explicit-any)
    const { nativeEvent: event }: any = reactEvent;
    const isPrimaryClick = event !== null && event.buttons === 1;
    if (isPrimaryClick) {
      const targetHeight: number = event.target.clientHeight;
      const pxDistanceFromBottom: number = targetHeight - event.offsetY;
      const percentFromBottom: number = Math.floor(
        (100 * pxDistanceFromBottom) / targetHeight
      );
      this.updateValue(percentFromBottom);
    }
    return;
  }

  updateValue(value: number): void {
    this.setState({
      value: Math.round(value)
    });
    return;
  }

  getValue(): number {
    return this.state.value;
  }

  render(): React.ReactNode {
    return (
      <div
        className={`pipe-${this.state.value}`}
        onMouseMove={this.mouseMoveListener.bind(this)}
      ></div>
    );
  }
}

export default Pipe;
