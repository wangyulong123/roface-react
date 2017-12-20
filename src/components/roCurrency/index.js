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
    let textValue = nextProps.value.toString().replace(/[^0-9.]*/g, '');
    let showValue = this.formatCurrencyInt(textValue);
    showValue = this.formatCurrencyDecimal(showValue, precision);
    this.state({ value: showValue });
  };

  /* eslint-disable */
  formatCurrencyInt = (numStr) => {
    let decimalIndex = numStr.toString().indexOf('.');
    decimalIndex = decimalIndex === -1 ? numStr.toString().length : decimalIndex;
    let intPart = numStr.toString().slice(0, decimalIndex + 1);
    let decimalPart = numStr.toString().slice(decimalIndex + 1, numStr.toString().length);
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    console.log(intPart + decimalPart);
    return intPart + decimalPart;
  };

  formatCurrencyDecimal = (numStr, precision) => {
    if (numStr .length === 0) return numStr;
    const precisionX = !isNaN(precision = Math.abs(precision)) ? precision : 3;
    let decimalIndex = numStr.toString().indexOf('.');
    decimalIndex = decimalIndex === -1 ? numStr.toString().length : decimalIndex;
    let intPart = numStr.toString().slice(0, decimalIndex + 1);
    let decimalPart = numStr.toString().slice(decimalIndex + 1, numStr.toString().length);console.log(intPart);
    console.log(decimalPart);
    if (decimalPart.length < precisionX || decimalPart.length === 0) {
      let zero = '';
      for (let i = 0; i < precisionX - decimalPart.length; i++) {
        zero += '0';
      }
      zero = decimalPart.length === 0 && intPart[intPart.length-1] !== '.' ? '.' + zero : zero;
      decimalPart = decimalPart + zero;
    } else {
      decimalPart = decimalPart.replace(/[^0-9]*/g, '');
      decimalPart = decimalPart.slice(0, precisionX);
    }
    console.log(intPart + decimalPart);
    return intPart + decimalPart;
  };
  /* eslint-disable */

  handleCurrencyChange = (e) => {
    const { onChange } = this.props;
    let textValue = e.target.value.toString().replace(/[^0-9,.]*/g, '');
    let numberValue = e.target.value.toString().replace(/[^0-9.]*/g, '');
    this.setState({ value: textValue });
    if (onChange) {
      onChange({ event: e, text: textValue, value: parseFloat(numberValue)});
    }
    console.log({ event: e, text: textValue, value: parseFloat(numberValue)});
  };

  handleCurrencyBlur = (e) => {
    const { onBlur, precision } = this.props;
    let textValue = e.target.value.toString().replace(/[^0-9.]*/g, '');
    let showValue = this.formatCurrencyInt(textValue);
    showValue = this.formatCurrencyDecimal(showValue, precision);
    this.setState({ value: showValue });
    if (onBlur) {
      onBlur({ event: e, text: showValue, value: parseFloat(textValue) });
    }
    console.log({ event: e, text: showValue, value: parseFloat(textValue) });
  };

  render() {
    if (this.props.reading) {
      return (
        <div {...this.props}>
          {this.state.value}
        </div>
      );
    }

    return (
      <Input
        {...this.props}
        ref="Input"
        value={this.state.value}
        onChange={this.handleCurrencyChange}
        onBlur={this.handleCurrencyBlur}
      />
    );
  }
}

export default RoCurrency;
