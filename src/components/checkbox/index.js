import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class RoCheckBox extends React.Component {
    static defaultProps = {
        optionField: 'code',
        optionName: 'name',
    };
    constructor(props) {
        super(props);
        const value = this.props.value || '';
        const options = this.assembleOptions(this.props.model, this.props.options);
        this.state = {
            value,
            options,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    _dataFormate = (data) => {
        const { optionField, optionName, optionDisabled } = this.props;
        const newData = [];
        data.forEach((item) => {
           const newItem = {
               label: item[optionName],
               value: item[optionField],
               disabled: optionDisabled && optionDisabled.includes(item[optionField]),
           };
           newData.push(newItem);
        });
        return newData;
    };
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
                newOptions = this._dataFormate(options);
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
          <div>
            <CheckboxGroup
              {...this.props}
              value={this._changeString2Array(this.state.value)}
              onChange={this.handleChange}
              options={this.state.options}
            />
          </div>
        );
    }
}
