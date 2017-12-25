/**
 * Created by dpcui on 20/12/2017.
 */

import React from 'react';
import moment from 'moment';
import { DatePicker, Input, Icon } from 'antd';

class RoDatePicker extends React.Component {
  static defaultProps = {
    format: 'YYYY-MM-DD',
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
    const { reading, format, readOnly, placeholder, className, style } = this.props;
    if (reading) {
      return (
        <div>
          {this.state.value && moment(new Date(this.state.value)).format(format)}
        </div>
      );
    } else if (readOnly) {
      return (
        <Input
          readOnly={readOnly}
          placeholder={placeholder}
          className={className}
          style={style}
          suffix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={this.state.value && moment(new Date(this.state.value)).format(format)}
        />
      );
    } else {
      return (
        <DatePicker
          {...this.props}
          value={this.handleMillisecondValue(this.state.value)}
          onChange={this.handleDateChange}
        />
      );
    }
  }
}

export default RoDatePicker;
