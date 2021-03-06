import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = (props) => (`
  width: 25px;
  height: 25px;
  background: ${props.color};
  cursor: pointer;
  outline: 5px solid #333;
  opacity: ${props.opacity};
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 10px;
  margin-bottom: -5px;
  .value {
    flex: 1;
    font-size: 2rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends React.Component {
    state = {
        value: 0
    };

    handleOnChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.handleraiseAmountInput(e.target.value);
    };

    render() {
        return (
            <Styles opacity={this.state.value > 1 ? (this.state.value / this.props.max) : .1} color={'rgb(237,94,2)'}>
                <input type="range" min={0} max={this.props.max} value={this.state.value} className="slider" onChange={this.handleOnChange} />
                <div className="value">{this.state.value}</div>
            </Styles>
        )
    }
}