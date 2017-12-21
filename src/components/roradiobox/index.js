import React from 'react';
import Radio from './radio';

export default class RadioBox extends React.Component{
    constructor(props) {
        super(props);
        const value = this.props.value || '';
        const valueArr = this.props.valueArr || [];
            this.state = {
          // eslint-disable-next-line react/no-unused-state
          value,
          valueArr,
          checkedArr: this._constructCheckedArr(value, valueArr),
        };
    }
    _radioChangeCallback = (value) => {
        console.log(`selected-value:${value}`);
        this.setState({
            // eslint-disable-next-line react/no-unused-state
            value,
            checkedArr: this._constructCheckedArr(value, this.state.valueArr),
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    };
    _constructCheckedArr = (value, valueArr) => {
        return valueArr.map(item => item === value);
    };
    _renderRadioItem = () => {
      if (this.state.valueArr && this.state.valueArr.length !== 0) {
         return this.state.valueArr.map((item, index) => {
              return (
                <Radio
                  value={item}
                  checked={this.state.checkedArr[index]}
                  key={`radio${item}`}
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
