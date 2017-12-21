import React from 'react';
import { Radio } from 'antd';

export default class RoRadio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.checked,
            value: this.props.value,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.checked !== nextProps.checked) {
            this.setState({
               checked: nextProps.checked,
            });
        }
    }
    handleClick = () => {
        this.setState({
           checked: !this.state.checked,
        });
        this.props.radioChangeCallback(this.state.value);
    };
    render() {
        return (
          <Radio
            onClick={this.handleClick}
            checked={this.state.checked}
          >
            {this.state.value}
          </Radio>
        );
    }
}
