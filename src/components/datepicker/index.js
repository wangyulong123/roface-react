/**
 * Created by dpcui on 20/12/2017.
 */

import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

class RoDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
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

  handleDateChange = (e) => {
    const { locale } = this.props;
    const lo = locale || 'zh';
    const date = this.handleFormatDate(e);
    this.setState({ value: date && moment(date).locale(lo) });
    this.props.onChange && this.props.onChange(date);
    this.props.onValueChange && this.props.onValueChange(date);
  };
  /* eslint-disable */

  render() {
    const { reading, format } = this.props;
    if (reading) {
      return (
        <div {...this.props}>
          {value && moment(new Date(this.state.value)).format(format)}
        </div>
      );
    }
    return (
      <DatePicker
        {...this.props}
        value={this.handleMillisecondValue(this.state.value)}
        onChange={this.handleDateChange}
      />
    );
  }
}

export default RoDatePicker;
