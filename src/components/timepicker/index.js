/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';

class RoTimePicker extends React.Component {
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

  handleTimeChange = (e) => {
    const { locale } = this.props;
    const lo = locale || 'zh';
    const time = this.handleFormatDate(e);
    this.setState({ value: time && moment(time).locale(lo) });
    this.props.onChange && this.props.onChange(time);
    this.props.onValueChange && this.props.onValueChange(time);
  };
  /* eslint-disable */

  render() {
    const { reading, format } = this.props;
    if (reading) {
      return (
        <div>
          {value && moment(new Date(this.state.value)).format(format)}
        </div>
      );
    }
    return (
      <TimePicker
        placeholder="Select time"
        {...this.props}
        value={this.handleMillisecondValue(this.state.value)}
        onChange={this.handleTimeChange}
      />
    );
  }
}

export default RoTimePicker;
