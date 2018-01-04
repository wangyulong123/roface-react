import React from 'react';
import {Checkbox} from 'antd';
import {compose} from '../compose';

// const CheckboxGroup = Checkbox.Group;

@compose
export default class RoCheckBox extends React.Component {
  static defaultProps = {
    optionField: 'code',
    optionName: 'name',
  };
  // static Group = (
  //   <CheckboxGroup
  //     {...this.props}
  //     options={this.props.options}
  //     onChange={this.handleGroupChange}
  //   />
  // );
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
  // handleGroupChange = (value) => {
  //   this.setState({ value: value });
  //   this.props.onChange && this.props.onChange(value);
  // };
  handleChange = (e) => {
    this.setState({ value: e.target.checked });
    this.props.onChange && this.props.onChange(e.target.checked);
  };
  render() {
    if (this.props.reading) {
      return (
        <div>{this.state.value}</div>
      );
    }
    return (
      <Checkbox
        {...this.props}
        onChange={this.handleChange}
        checked={this.state.value}
      />
    );
  }
}
