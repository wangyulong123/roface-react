/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { TimePicker, Input, Icon, LocaleProvider } from 'antd';
import { compose } from '../compose';

@compose
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
    return (value && moment(value).locale(lo)) || null;
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
          suffix={<Icon type="clock-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={this.state.value && moment(new Date(this.state.value)).format(format)}
        />
      );
    } else {
      return (
        <LocaleProvider locale={zhCN}>
          <TimePicker
            placeholder="Select time"
            {...this.props}
            value={this.handleMillisecondValue(this.state.value)}
            onChange={this.handleTimeChange}
          />
        </LocaleProvider>
      );
    }
  }
}

export default RoTimePicker;
