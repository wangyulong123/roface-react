import React from 'react';
import {Button, Icon, Message, Divider, Menu, Row, Col,Form,Select,Input} from '../../../src/components';

const FormItem = Form.Item;
const Option = Select.Option;


export default class FormWithData extends React.Component {
    state = {
        data: {},
    }
    /**
     * 改变按钮为加载中状态，1秒之后复原
     */
    clickExec = () => {
    }



    render() {
        // const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div style={{margin: '15px'}}>
                <Form>
                    <FormItem {...formItemLayout} label="用户识别码" >
                        <Input />
                    </FormItem>
                </Form>
            </div>

        );
    }
}

