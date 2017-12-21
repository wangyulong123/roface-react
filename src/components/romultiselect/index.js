import React from 'react';
import { Select } from 'antd';

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || [],
            options: this.props.options || [],
        };
    }

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
