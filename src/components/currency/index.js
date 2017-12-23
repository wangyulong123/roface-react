/**
 * Created by dpcui on 19/12/2017.
 */

import React from 'react';
import { Input } from 'antd';

class RoCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    let textValue = nextProps.value.toString().replace(/[^0-9.-]*/g, '');
    let showValue = this.formatCurrencyInt(textValue);
    showValue = this.formatCurrencyDecimal(showValue, nextProps.precision);
    this.state({ value: showValue });
  }

  /* eslint-disable */
  formatCurrencyInt = (numStr) => {
    let decimalIndex = numStr.toString().indexOf('.');
    decimalIndex = decimalIndex === -1 ? numStr.toString().length : decimalIndex;
    let intPart = numStr.toString().slice(0, decimalIndex + 1);
    let decimalPart = numStr.toString().slice(decimalIndex + 1, numStr.toString().length);
    if (intPart.charAt(0) === '-') {
      intPart = '-' + intPart.replace(/[^0-9.]*/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return intPart + decimalPart;
  };

  formatCurrencyDecimal = (numStr, precision) => {
    if (numStr.replace(/[^0-9]*/g, '') === '') return '';
    const precisionX = !isNaN(precision = Math.abs(precision)) ? precision : 3;
    let decimalIndex = numStr.toString().indexOf('.');
    decimalIndex = decimalIndex === -1 ? numStr.toString().length : decimalIndex;
    let intPart = numStr.toString().slice(0, decimalIndex + 1);
    let decimalPart = numStr.toString().slice(decimalIndex + 1, numStr.toString().length);
    decimalPart = decimalPart.replace(/[^0-9]*/g, '');
    if (decimalPart.length < precisionX || decimalPart.length === 0) {
      let zero = '';
      for (let i = 0; i < precisionX - decimalPart.length; i++) {
        zero += '0';
      }
      zero = decimalPart.length === 0 && intPart[intPart.length-1] !== '.' ? '.' + zero : zero;
      decimalPart = decimalPart + zero;
    } else {
      decimalPart = decimalPart.slice(0, precisionX);
    }
    return intPart + decimalPart;
  };
  /* eslint-disable */

  handleCurrencyChange = (e) => {
    let textValue = e.target.value.toString().replace(/(?!^[-\d\.][\d,\.]*)[^\d\.,]/g, '');
    this.setState({ value: textValue });
    // let numberValue = e.target.value.toString().replace(/(?!^[-\d\.][\d\.]*)[^\d\.]/g, '');
    // console.log({ event: e, text: textValue, value: numberValue});
  };

  handleCurrencyBlur = (e) => {
    const { onBlur, onChange, onValueChange, precision } = this.props;
    let textValue = e.target.value.toString().replace(/(?!^[-\d\.][\d\.]*)[^\d\.]/g, '');
    let showValue = this.formatCurrencyInt(textValue);
    showValue = this.formatCurrencyDecimal(showValue, precision);
    textValue = showValue.toString().replace(/(?!^[-\d\.][\d\.]*)[^\d\.]/g, '');
    this.setState({ value: showValue });
    onBlur && onBlur(textValue);
    onChange && onChange(textValue);
    onValueChange && onValueChange(date);
    console.log({ event: e, text: showValue, value: textValue });
  };

  render() {
    if (this.props.reading) {
      return (
        <div>
          {this.state.value}
        </div>
      );
    }

    return (
      <Input
        {...this.props}
        value={this.state.value}
        onChange={this.handleCurrencyChange}
        onBlur={this.handleCurrencyBlur}
      />
    );
  }
}

export default RoCurrency;
