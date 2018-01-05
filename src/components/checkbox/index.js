import React from 'react';
import {Checkbox} from 'antd';
import {compose} from '../compose';

const CheckboxGroup = Checkbox.Group;

@compose
class RoCheckBoxGroup extends React.Component {
  static defaultProps = {
    optionField: 'code',
    optionName: 'name',
  };
  constructor(props) {
    super(props);
    this.options = this.dataFormat(props.options);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }
  dataFormat = (data) => {
    const { optionField, optionName, optionDisabled } = this.props;
    let newData = [];
    if (data && data[0] instanceof Object) {
      data.forEach((item) => {
        const newItem = {
          label: item[optionName],
          value: item[optionField],
        };
        if(optionDisabled && optionDisabled.includes(item[optionField])) {
          newItem.disabled = true;
        }
        newData.push(newItem);
      });
    } else {
     newData = [...(data || [])];
    }
    return newData;
  };
  handleGroupChange = (value) => {
    this.setState({ value: value });
    this.props.onChange && this.props.onChange(value);
  };
  render() {
    if (this.props.reading) {
      return (
        <div>{this.state.value && this.state.value.toString()}</div>
      );
    }
    return (
      <CheckboxGroup
        {...this.props}
        value={this.state.value}
        options={this.options}
        onChange={this.handleGroupChange}
      />
    );
  }
}

export default class RoCheckBox extends React.Component {
  static Group = RoCheckBoxGroup;
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }
  handleChange = (e) => {
    this.setState({ value: e.target.checked });
    this.props.onChange && this.props.onChange(e.target.checked);
  };
  render() {
    return (
      <Checkbox
        {...this.props}
        onChange={this.handleChange}
        checked={this.state.value}
      />
    );
  }
}
