import React from 'react';
import {Input} from 'antd';
import { compose } from '../compose';

const { TextArea } = Input;

@compose
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
        if (this.props.reading) {
            return (
              <div>{this.props.value}</div>
            );
        }
        return (
          <TextArea
            {...this.props}
            value={this.state.value}
            onChange={this.onChange}
          />
        );
    }
}
