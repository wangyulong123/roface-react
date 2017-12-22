import React from 'react';
import { Cascader } from 'antd';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }, {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
        }],
    }],
}];

export default class RoCascader extends React.Component{
    handleChange = (value, selectOptions) => {
        console.log(value, selectOptions);
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    };
    render() {
        return (
          <Cascader
            {...this.props}
            options={options}
            onChange={this.handleChange}
          />
        );
    }
}
