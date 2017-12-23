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
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  handleChange = (value) => {
    this.setState({ value: value });
    this.props.onChange && this.props.onChange(value);
  };

  renderOption = () => {
    const children = [];
    const { optionData, optionName, optionField, optionProps } = this.props;
    if (optionData.charAt(0) instanceof Object) {
      for (let i = 0; i < optionData.length; i++) {
        children.push(
          <Option key={i} {...optionProps} value={optionData[i][optionField]}>{ optionData[i][optionName] }</Option>
        );
      }
    } else {
      for (let i = 0; i < optionData.length; i++) {
        children.push(
          <Option key={i} {...optionProps} value={optionData[i]}>{ optionData[i] }</Option>
        );
      }
    }
    return children;
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
