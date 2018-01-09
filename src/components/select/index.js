/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import { Select, Input, Icon } from 'antd';
import { compose } from '../compose';

const Option = Select.Option;

@compose
class RoSelect extends React.Component {
  static defaultProps = {
    optionField: 'code',
    optionName: 'name',
  };
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
      <Option key={Math.uuid()} value=''>
        { '--请选择--' }
      </Option>
      );
    const children = [optionDefault];
    const { options=[], optionName, optionField, optionDisabled } = this.props;
    if (options && options[0] instanceof Object) {
      for (let i = 0; i < options.length; i++) {
        children.push(
          <Option
            key={options[i][optionField]}
            disabled={optionDisabled && optionDisabled.includes(options[i][optionField])}
            value={options[i][optionField]}
          >
            { options[i][optionName] }
          </Option>
        );
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        children.push(
          <Option
            key={options[i]}
            value={options[i]}
            disabled={optionDisabled && optionDisabled.includes(options[i])}
          >
            { options[i] }
          </Option>
        );
      }
    }
    return children;
  };
  /* eslint-disable */

  renderReadingAndReadOnly = () => {
    const {reading, options = [], optionField, optionName, readOnly, placeholder, className, style} = this.props;
    let valueX = this.state.value;

    if (options[0] instanceof Object) {
      for (let i = 0; i < options.length; i++) {
        if (options[i][optionField] === this.state.value) { valueX = options[i][optionName] }
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
