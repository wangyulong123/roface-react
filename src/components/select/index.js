/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class RoSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (value) => {
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
    return (
      <Select
        style={{ width: 120 }}
        {...this.props}
        onChange={this.handleChange}
      >
        {this.renderOption()}
      </Select>
    );
  }
}

export default RoSelect;
