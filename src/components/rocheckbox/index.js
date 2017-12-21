import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class RoCheckBox extends React.Component {
    constructor(props) {
        super(props);
        const value = this.props.value || '';
        const options = this.assembleOptions(this.props.model, this.props.options);
        this.state = {
            value,
            options,
        };
    }
    assembleOptions = (model, options) => {
        let newOptions;
        switch(model) {
            case 'model':
                newOptions = options.map(item => item.itemName);
                break;
            case 'jsonModel':
                newOptions = options.map(item => item.v);
                break;
            case 'additionModel':
            default:
                newOptions = options;
        }
        return newOptions;
    };
    handleChange = (value) => {
        const { onChange } = this.props;
        if (onChange) {
            const v = this._changeArray2String(value);
            onChange(v);
        }
        this.setState({
            value: value,
        });
    };
    _changeString2Array = (str) => {
        if (str instanceof Array) {
            return str;
        }
        if (str === '') {
            return [];
        }
        return str && str.split && str.split(',');
    };
    _changeArray2String = (ary) => {
        if (ary.length === 0) {
            return '';
        }
        return ary && ary.join && ary.join(',');
    };

    render() {
        if (this.props.reading) {
            return (
              <div>{this.props.value}</div>
            );
        }
        return (
          <CheckboxGroup
            {...this.props}
            value={this._changeString2Array(this.state.value)}
            options={this.state.options}
            onChange={this.handleChange}
          />
        );
    }
}
