import React from 'react';
import { Input } from 'antd';

import { compose } from '../compose';

@compose
export default class RoText extends React.Component {
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
    handleChange = (e) => {
        const value = e.target.value || '';
        this.setState({
            value,
        });
        const { onChange } = this.props;
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
        const nullStr = '';
        return (
          <Input
            {...this.props}
            value={this.state.value}
            addonBefore={this.props.prefix}
            addonAfter={this.props.suffix}
            prefix={nullStr}
            suffix={nullStr}
            onChange={this.handleChange}
          />
        );
    }
}
