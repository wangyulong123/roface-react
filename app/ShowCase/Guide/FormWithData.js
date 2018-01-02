import React from 'react';
import { Checkbox } from 'antd';
import {
    Button,
    Icon,
    Message,
    Divider,
    Menu,
    Row,
    Col,
    Form,
    Radio,
    Select,
    DatePicker,
    Input,
    InputNumber,
} from '../../../src/components';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class CustomizedForm extends React.Component {
    constructor() {
        super();
        this.state = {email: 'syang@amarsoft.com'};
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <Form>
                <FormItem {...formItemLayout} label="邮件">
                    <Row gutter={8}>
                        <Col span={16}>
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: '邮件地址格式不正确',
                                }, {
                                    required: true, message: '此项必填',
                                }],
                            })(
                                <Input/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="用户识别码">
                    <Row gutter={8}>
                        <Col span={10}>
                            {getFieldDecorator('code', {
                                rules: [{required: true, message: '此项必填', whitespace: true}],
                            })(
                                <Input/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="姓名">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '此项必填', whitespace: true}],
                            })(
                                <Input/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="英文名">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('engName')(
                                <Input/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="性别">
                    <Row gutter={8}>
                        <Col span={16}>
                            {getFieldDecorator('gender')(
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                    <Radio value="3">未知性别</Radio>
                                </RadioGroup>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="出生日期">
                    <Row gutter={8}>
                        <Col span={8}>
                            {getFieldDecorator('birth')(
                                <DatePicker/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="身高">
                    <Row gutter={8}>
                        <Col span={8}>
                            {getFieldDecorator('height')(
                                <Input addonAfter={getFieldDecorator('prefixHeight')(
                                    <span>CM</span>
                                )}/>
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="体重">
                    <Row gutter={8}>
                        <Col span={14}>
                            {getFieldDecorator('weight')(
                                <InputNumber
                                    formatter={value => `${value} KG`}
                                    parser={value => value.replace(' KG', '')}
                                />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="爱好">
                    {getFieldDecorator('hobby')(
                        <Checkbox.Group>
                            <Row>
                                <Col span={6}><Checkbox value="HOB1">游泳</Checkbox></Col>
                                <Col span={6}><Checkbox value="HOB2">足球</Checkbox></Col>
                                <Col span={6}><Checkbox value="HOB3">篮球</Checkbox></Col>
                                <Col span={6}><Checkbox value="HOB4">跑步</Checkbox></Col>
                                <Col span={6}><Checkbox value="HOB5">户外</Checkbox></Col>
                                <Col span={6}><Checkbox value="HOB6">登山</Checkbox></Col>
                                <Col span={6}><Checkbox value="HOB7">攀岩</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    )}
                </FormItem>
            </Form>
        );
    }
}

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
        const MyForm = Form.create()(CustomizedForm);
        return (
            <div style={{margin: '15px'}}>
                <Row gutter={10}>
                    <Col span={18}>
                        <MyForm/>
                    </Col>
                    <Col span={6}>
                        <pre className="language-bash">
                          {JSON.stringify(this.state.data, null, 2)}
                        </pre>
                    </Col>
                </Row>
            </div>
        );
    }
}

