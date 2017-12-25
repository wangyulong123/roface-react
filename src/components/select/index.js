/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import { Select } from 'antd';

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

  render() {
    const { reading, optionData, optionField, optionName } = this.props;
    if (reading) {
      if (optionData[0] instanceof Object) {
        for (let i = 0; i < optionData.length; i++) {
          if (optionData[i][optionField] === this.state.value) {
            return (
              <div>
                {optionData[i][optionName]}
              </div>
            );
          }
        }
      }

      return (
        <div>
          {this.state.value}
        </div>
      );
    }

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
