import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this._changeString2Array(this.props.value) || [],
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    _assembleOptions = (model, options) => {
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
       const optionArr = [];
        newOptions.forEach((item) => {
           optionArr.push(<Option key={item}>{item}</Option>);
       });
       return optionArr;
    };

    handleChange = (value) => {
        this.setState({
           value,
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.props._changeArray2String(value));
        }
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
              <div>{this._changeArray2String(this.props.value)}</div>
            );
        }
        const children = this._assembleOptions(this.props.model, this.props.options);
        return (
          <Select
            {...this.props}
            mode="multiple"
            style={{width: '100%'}}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {children}
          </Select>
        );
    }
}
