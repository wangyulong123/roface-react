import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || [],
            options: this.assembleOptions(this.props.options) || [],
        };
    }

    assembleOptions = (options) => {
       const a = [];
       options.forEach((item) => {
         a.push(<Option key={item}>{item}</Option>);
       });
       return a;
    };

    handleChange = (value) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    };

    _changeArray2String = (ary) => {
        return ary && ary.join && ary.join(',');
    };

    render() {
        if (this.props.reading) {
            return (
              <div>{this._changeArray2String(this.props.value)}</div>
            );
        }
        return (
          <Select
            {...this.props}
            mode="multiple"
            style={{width: '100%'}}
            defaultValue={this.state.value}
            onChange={this.handleChange}
          >
            {this.state.options}
          </Select>
        );
    }
}
