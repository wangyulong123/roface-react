import React from 'react';
import { Input } from 'antd';

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
        return (
          <Input
            {...this.props}
            value={this.state.value}
            onChange={this.handleChange}
          />
        );
    }
}
