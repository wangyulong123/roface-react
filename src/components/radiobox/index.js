import React from 'react';
import Radio from './radio';

export default class RadioBox extends React.Component{
    constructor(props) {
        super(props);
        const value = this.props.value || '';
        const options = this.assembleOptions(this.props.model, this.props.dict);
            this.state = {
          // eslint-disable-next-line react/no-unused-state
          value,
          options,
          checkedArr: this._constructCheckedArr(value, options),
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
        return options.map(item => item === value);
    };
    _renderRadioItem = () => {
      if (this.state.options && this.state.options.length !== 0) {
         return this.state.options.map((item, index) => {
              return (
                <Radio
                  value={item.code}
                  displayValue={item.name}
                  checked={this.state.checkedArr[index]}
                  key={`radio${item.code}`}
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
