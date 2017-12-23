/**
 * Created by dpcui on 18/12/2017.
 */

import React from 'react';
import { InputNumber } from 'antd';

class RoNumber extends React.Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    const valueNum = parseFloat(props.value);
    this.state = {
      value: isNaN(valueNum) ? '' : isFinite(valueNum) ? valueNum : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const valueNum = parseFloat(nextProps.value);
    this.setState({
      value: isNaN(valueNum) ? '' : isFinite(valueNum) ? valueNum : '',
    });
  }

  handleNumberChange = (e) => {
    const { onChange, onValueChange } = this.props;
    let number = e;
    if (isNaN(parseFloat(e)) || !isFinite(parseFloat(e))) {
      number = '';
    }
    this.setState({ value: number });
    onChange && onChange(e);
    onValueChange && onValueChange(e)
  };
  /* eslint-disable */

  render() {
    if (this.props.reading) {
      return (
        <div>
          {this.props.value}
        </div>
      );
    }

    return (
      <InputNumber
        {...this.props}
        onChange={this.handleNumberChange}
        value={this.state.value}
      />
    );
  }
}

export default RoNumber;