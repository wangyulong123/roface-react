/**
 * Created by dpcui on 21/12/2017.
 */

import React from 'react';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { DatePicker, Input, Icon, LocaleProvider } from 'antd';
import { compose } from '../compose';

@compose
class RoDateTimePicker extends React.Component {
  static defaultProps = {
    format: 'YYYY-MM-DD HH:mm:ss',
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
        <LocaleProvider locale={zhCN}>
          <DatePicker
            placeholder="Select time"
            {...this.props}
            showTime
            value={this.handleMillisecondValue(this.state.value)}
            onChange={this.handleTimeChange}
            onOk={this._onOk}
          />
        </LocaleProvider>
      );
    }
  }
}

export default RoDateTimePicker;
