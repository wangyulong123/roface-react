/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

class RoDateTimePicker extends React.Component {
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

  handleTimeChange = (e) => {
    const { locale } = this.props;
    const lo = locale || 'zh';
    const date = this.handleFormatDate(e);
    this.setState({ value: date && moment(date).locale(lo) });
    this.props.onChange && this.props.onChange(date);
    this.props.onValueChange && this.props.onValueChange(date);
  };
  /* eslint-disable */

  _onOk = (value) => {
    this.props.onOk && this.props.onOk(value);
  };

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
        placeholder="Select time"
        format="YYYY-MM-DD HH:mm:ss"
        {...this.props}
        showTime
        value={this.handleMillisecondValue(this.state.value)}
        onChange={this.handleTimeChange}
        onOk={this._onOk}
      />
    );
  }
}

export default RoDateTimePicker;
