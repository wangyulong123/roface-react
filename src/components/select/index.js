/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import { Select, Input, Icon } from 'antd';

const Option = Select.Option;

class RoSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  /* eslint-disable */
  handleChange = (value) => {
    this.setState({ value: value });
    this.props.onChange && this.props.onChange(value);
  };

  renderOption = () => {
    const optionDefault = (
      <Option key='' value=''>
        { '--请选择--' }
      </Option>
      );
    const children = [optionDefault];
    const { optionData, optionName, optionField, optionDisabled } = this.props;
    if (optionData[0] instanceof Object) {
      for (let i = 0; i < optionData.length; i++) {
        children.push(
          <Option
            key={optionData[i][optionField]}
            disabled={optionDisabled && optionDisabled.includes(optionData[i][optionField])}
            value={optionData[i][optionField]}
          >
            { optionData[i][optionName] }
          </Option>
        );
      }
    } else {
      for (let i = 0; i < optionData.length; i++) {
        children.push(
          <Option
            key={optionData[i]}
            value={optionData[i]}
            disabled={optionDisabled.includes(optionData[i])}
          >
            { optionData[i] }
          </Option>
        );
      }
    }
    return children;
  };
  /* eslint-disable */

  renderReadingAndReadOnly = () => {
    const { reading, optionData, optionField, optionName, readOnly, placeholder, className, style } = this.props;
    let valueX = this.state.value;

    if (optionData[0] instanceof Object) {
      for (let i = 0; i < optionData.length; i++) {
        if (optionData[i][optionField] === this.state.value) { valueX = optionData[i][optionName] }
      }
    }

    if (reading) {
      return (
        <div>{ valueX }</div>
      );
    } else {
      return (
        <Input
          style={{ width: 120, ...style}}
          readOnly={readOnly}
          placeholder={placeholder}
          className={className}
          suffix={<Icon type="down" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={valueX}
        />
      );
    }
  };

  render() {
    const { reading, readOnly } = this.props;
    if (reading || readOnly) { return this.renderReadingAndReadOnly() }

    return (
      <Select
        style={{ width: 120 }}
        {...this.props}
        onChange={this.handleChange}
        value={this.state.value}
      >
        {this.renderOption()}
      </Select>
    );
  }
}

export default RoSelect;
