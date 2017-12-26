import React from  'react';

import { Form, Collapse, Text, RadioBox, TextArea } from '../../../../src/components';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

export default Form.create()(class TemplateDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount(){
    const { rest, location } = this.props;
    if (location && location.state && location.state.id) {
      rest.restAjax('http://192.168.64.246:8080/dataform/admin/dataform/getdataformelement', 'get',
        {
          id: location.state.id,
        }, true).then((res) => {
        this.setState({
          data: res,
        });
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { getFieldDecorator, prefix = 'ro' } = this.props.form;
    return (
      <div className={`${prefix}-template-detail`}>
        <Collapse defaultActiveKey={['1', '2']} onChange={this._panelChange}>
          <Panel header="基本信息" key="1">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                {...formItemLayout}
                label="模板编号"
              >
                {getFieldDecorator('code', {
                  rules: [{ required: true }],
                  initialValue: this.state.data.code,
                })(<Text reading />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="名称"
              >
                {getFieldDecorator('name', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.name,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="分栏数"
              >
                {getFieldDecorator('columnNumber', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.formUIHint
                  && this.state.data.formUIHint.columnNumber,
                })(<RadioBox dict={[
                  {code: 1, name: '一栏'},
                  {code: 2, name: '二栏'},
                  {code: 3, name: '三栏'},
                  {code: 4, name: '四栏'},
                ]}
                />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="查询条件"
              >
                {getFieldDecorator('query', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query,
                })(<TextArea />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="业务模型"
              >
                {getFieldDecorator('query', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.handler,
                })(<TextArea />)}
              </FormItem>
            </Form>
          </Panel>
          <Panel header="字段信息" key="2">
            <p>aa</p>
          </Panel>
        </Collapse>
      </div>);
  }
});
