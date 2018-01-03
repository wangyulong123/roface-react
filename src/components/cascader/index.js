import React from 'react';
import { Cascader } from 'antd';
import { transformIntoTree, cascaderCodemap, attributes } from './tool';
import { compose } from '../compose';

@compose
export default class RoCascader extends React.Component{
    constructor(props) {
        super(props);
        const param = this.props.attributes || attributes;
        const data = this.props.options || cascaderCodemap;
        const options = transformIntoTree(data, param);
        const value = this._changeString2Array(this.props.value);
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
    handleChange = (value) => {
        this.setState({
           value,
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
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
    render() {
        return (
          <Cascader
            {...this.props}
            value={this.state.value}
            style={{ width: '100%' }}
            options={this.state.options}
            onChange={this.handleChange}
          />
        );
    }
}
