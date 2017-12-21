/**
 * Created by dpcui on 21/12/2017.
 */


import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

class RoYearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      mode: 'year',
      open: props.open || false,
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

  handleYearChange = (e) => {
    const { locale } = this.props;
    const lo = locale || 'zh';
    const date = this.handleFormatDate(e);
    this.setState({ value: date && moment(date).locale(lo) });
    this.props.onChange && this.props.onChange(date);
    this.props.onValueChange && this.props.onValueChange(date);
  };
  /* eslint-disable */

  handlePanelChange = (value, mode) => {
    this.setState({ mode: mode, open: false });
    this.handleYearChange(value);
    this.props.onPanelChange && this.props.onPanelChange(value, mode)
  };

  handleOpenChange = (open) => {
    if (open) {
      this.setState({ mode: 'year', open: open });
    }
    this.props.onOpenChange && this.props.onOpenChange(open);
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
        placeholder="Select year"
        {...this.props}
        mode={this.state.mode}
        open={this.state.open}
        format="YYYY"
        value={this.handleMillisecondValue(this.state.value)}
        onChange={this.handleYearChange}
        onOpenChange={this.handleOpenChange}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}

export default RoYearPicker;
