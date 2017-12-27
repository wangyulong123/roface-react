/**
 * Created by dpcui on 18/12/2017.
 */

import React from 'react';
import { InputNumber } from 'antd';

class RoNumber extends React.Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    const valueNum = props.value && props.value.toString().replace(/(?!^[-\d\.][\d\.]*)[^\d\.]/g, '');
    this.state = {
      value: valueNum,
    };
  }

  componentWillReceiveProps(nextProps) {
    const valueNum = nextProps.value && nextProps.value.toString().replace(/(?!^[-\d\.][\d\.]*)[^\d\.]/g, '');
    this.setState({
      value: valueNum,
    });
  }

  handleNumberChange = (e) => {
    const { onChange, onValueChange } = this.props;
    const numStr = e.toString().replace(/(?!^[-\d\.][\d\.]*)[^\d\.]/g, '');
    this.setState({ value: numStr });
    onChange && onChange(numStr);
    onValueChange && onValueChange(numStr)
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
        style={{ width: 120 }}
        {...this.props}
        onChange={this.handleNumberChange}
        value={this.state.value}
      />
    );
  }
}

export default RoNumber;
