/**
 * Created by dpcui on 21/12/2017.
 */


import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

const { MonthPicker } = DatePicker;

class RoYearMonthPicker extends React.Component {
  static defaultProps = {
    format: 'YYYY-MM',
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
  handleMillisecondValue = (value) => {
    const { locale } = this.props;
    const lo = locale || 'zh';
    return (value && moment(new Date(value)).locale(lo)) || null;
  };

  handleFormatDate = (value) => {
    return (value && value.toDate().getTime()) || null;
  };

  handleMonthChange = (e) => {
    const { locale } = this.props;
    const lo = locale || 'zh';
    const date = this.handleFormatDate(e);
    this.setState({ value: date && moment(date).locale(lo) });
    this.props.onChange && this.props.onChange(date);
    this.props.onValueChange && this.props.onValueChange(date);
  };
  /* eslint-disable */

  render() {
    const { scene, reading, format } = this.props;
    if (reading) {
      return (
        <div>
          {this.state.value && moment(new Date(this.state.value)).format(format)}
        </div>
      );
    }
    return (
      <MonthPicker
        placeholder="Select month"
        {...this.props}
        value={this.handleMillisecondValue(this.state.value)}
        onChange={this.handleMonthChange}
      />
    );
  }
}

export default RoYearMonthPicker;
