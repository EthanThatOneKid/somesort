import React, { Component, RefObject } from 'react';

type DialProps = {
  value: number;
  strokes: number;
  sensitivity: number;
  diameter: number; // in pixels
  valueFactor: number;
  minValue: number;
  maxValue: number;
  onChange: (n: number) => void;
};

type DialState = Record<string, unknown>;

class Dial extends Component<DialProps, DialState> {
  value = this.props.value * this.props.valueFactor || 0;
  prevAngle = 0;
  isInteractable = true;
  valueFactor = this.props.valueFactor || 1;
  strokeRefs: Array<RefObject<HTMLDivElement>> = Array(this.props.strokes)
    .fill(0)
    .map(() => React.createRef());
  valueRef: RefObject<HTMLInputElement> = React.createRef();
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  pointerMoveListener(
    reactEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    // tslint:disable-next-line (@typescript-eslint/no-explicit-any)
    const { nativeEvent: event }: any = reactEvent;
    const isPrimaryClick = event !== null && event.buttons === 1;
    if (isPrimaryClick && this.isInteractable) {
      const isBeyond180: boolean =
        event.target.offsetWidth - event.offsetX >
        0.5 * event.target.offsetWidth;
      const angle: number =
        Math.atan(
          (event.offsetY - 0.5 * event.target.offsetHeight) /
            (event.offsetX - 0.5 * event.target.offsetWidth)
        ) + (isBeyond180 ? Math.PI : 0);
      if (angle !== this.prevAngle) {
        const isClockwiseRotation: boolean = angle >= this.prevAngle;
        const nextValue: number =
          this.value +
          (isClockwiseRotation
            ? this.props.sensitivity
            : -1 * this.props.sensitivity);
        const displayValue: number = this.calculateDisplayValue(nextValue);
        const isWithinBounds: boolean =
          displayValue <= this.props.maxValue &&
          this.props.minValue <= displayValue;
        if (isWithinBounds) {
          this.value = nextValue;
          this.prevAngle = angle;
          this.strokeRefs.forEach((strokeRef, i) => {
            if (strokeRef.current !== null) {
              strokeRef.current.style.transform = this.createTransformationCss(
                i
              );
            }
          });
          if (this.valueRef.current !== null) {
            this.valueRef.current.value = String(displayValue);
          }
          this.props.onChange(displayValue);
        }
      }
    }
    return;
  }

  createTransformationCss(strokeIndex: number): string {
    const angle: number = (360 * strokeIndex) / this.props.strokes + this.value;
    return `rotate(${angle}deg) translate(${
      this.props.diameter / 3
    }px) rotate(90deg)`;
  }

  calculateDisplayValue(value: number): number {
    return Math.floor(value / this.valueFactor);
  }

  updateDisplayValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const displayValue = Number(event.target.value);
    this.value = displayValue * this.valueFactor;
  }

  toggleInteraction(isOn?: boolean): boolean {
    this.isInteractable = isOn === undefined ? !this.isInteractable : isOn;
    const userInputClassName = 'unselectable';
    if (this.isInteractable) {
      if (this.containerRef.current !== null) {
        this.containerRef.current.classList.remove(userInputClassName);
      }
    } else {
      if (this.containerRef.current !== null) {
        this.containerRef.current.classList.add(userInputClassName);
      }
    }
    return this.isInteractable;
  }

  render(): React.ReactNode {
    return (
      <div
        className="dial"
        onPointerMove={this.pointerMoveListener.bind(this)}
        ref={this.containerRef}
      >
        {this.strokeRefs.map((_, i) => {
          return (
            <div className="dial-stroke" key={i} ref={this.strokeRefs[i]}>
              <div className={`dial-stroke-content-${i + 1}`}></div>
            </div>
          );
        })}
        <div className="dial-value-container">
          <input
            ref={this.valueRef}
            className="dial-value"
            type="number"
            min={this.props.minValue}
            max={this.props.maxValue}
            step={1}
            value={this.calculateDisplayValue(this.value)}
            onChange={this.updateDisplayValue.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Dial;
