import React from 'react';
import {Input} from 'antd';

const { TextArea } = Input;

export default class RoTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    onChange = (e) => {
        const value = e.target.value || '';
        const { onChange } = this.props;
        this.setState({
            value,
        });
        if (onChange) {
            onChange(value);
        }
    };

    render() {
        return (
          <TextArea
            {...this.props}
            value={this.state.value}
            onChange={this.onChange}
          />
        );
    }
}
