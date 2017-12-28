import React from 'react';
import Radio from './radio';

export default class RadioBox extends React.Component{
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
          checkedArr: this._constructCheckedArr(value, options),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
                checkedArr: this._constructCheckedArr(nextProps.value, this.props.options),
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
    _radioChangeCallback = (value, index, checked) => {
        let newValue = checked ? value : '';
        const newCheckArr = this._constructCheckedArr(newValue, this.state.options);
        this.setState({
            // eslint-disable-next-line react/no-unused-state
            value: newValue,
            checkedArr: newCheckArr,
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(newValue);
        }
    };
    _constructCheckedArr = (value, options) => {
        if (options) {
            return options.map(item => item.code === value);
        }
        return [];
    };
    _renderRadioItem = () => {
      const { optionField, optionName, optionDisabled } = this.props;
      const options = this.state.options;
      if (options && options.length !== 0) {
         return options.map((item, index) => {
              return (
                <Radio
                  value={item[optionField]}
                  displayValue={item[optionName]}
                  disabled={optionDisabled && optionDisabled.includes(item[optionField])}
                  checked={this.state.checkedArr[index]}
                  key={item[optionField]}
                  index={index}
                  radioChangeCallback={this._radioChangeCallback}
                />
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
        return(
          <div>
            {this._renderRadioItem()}
          </div>
        );
    }
}
