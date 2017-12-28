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
    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
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
        console.log(value);
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
    _renderCheckBoxItem = () => {
        if (this.state.options && this.state.options.length !== 0) {
            return this.state.options.map((item) => {
                return (
                  <Checkbox
                    value={item.code}
                    disabled={this.props.disabled}
                    key={item.code}
                  >
                    {item.name}
                  </Checkbox>
                );
            });
        }
        return null;
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
            >
              {this._renderCheckBoxItem()}
            </CheckboxGroup>
          </div>
        );
    }
}
