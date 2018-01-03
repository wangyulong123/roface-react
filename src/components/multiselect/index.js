import React from 'react';
import { Select } from 'antd';
import { compose } from '../compose';

const Option = Select.Option;

@compose
export default class MultiSelect extends React.Component {
    static defaultProps = {
        optionField: 'code',
        optionName: 'name',
    };
    constructor(props) {
        super(props);
        this.state = {
            value: this._changeString2Array(this.props.value) || [],
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: this._changeString2Array(nextProps.value),
            });
        }
    }
    _assembleOptions = () => {
       const { model, options, optionField, optionName, optionDisabled} = this.props;
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
       if (options && options[0] instanceof Object) {
           newOptions && newOptions.forEach((item) => {
               optionArr.push(
                 <Option
                   key={item[optionField]}
                   disabled={optionDisabled && optionDisabled.includes(item[optionField])}
                   value={item[optionField]}
                 >
                   {item[optionName]}
                 </Option>);
           });
       } else {
           newOptions && newOptions.forEach((item) => {
               optionArr.push(
                 <Option
                   key={item}
                   value={item}
                   disabled={optionDisabled.includes(item)}
                 >
                   {item}
                 </Option>);
           });
       }
       return optionArr;
    };

    handleChange = (value) => {
        this.setState({
           value,
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(this._changeArray2String(value));
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
        if (ary instanceof String) {
            return ary;
        }
        if (ary.length === 0) {
            return '';
        }
        return ary && ary.join && ary.join(',');
    };
    _constructReadingValue = (value) => {
      const { options, optionField, optionName } = this.props;
      const displayValueArr  = [];
      value && value.forEach((item) => {
        options.forEach((option) => {
            if (option[optionField] === item) {
                displayValueArr.push(option[optionName]);
            }
        });
      });
      return displayValueArr;
    };
    render() {
        if (this.props.reading) {
            return (
              <div>{this._changeArray2String(this._constructReadingValue(this.state.value))}</div>
            );
        }
        const children = this._assembleOptions();
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
