import React from 'react';
import {
  Form, Button, Icon, Collapse, Text, Modal, Notification, Select, RadioBox,
  CheckBox,
} from '../../../../src/components';

import './style/index.less';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

export default Form.create()(class ElementDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      loading: false,
    };
  }
  componentDidMount(){
    const { rest, history, closeLoading, openLoading } = this.props;
    const { location } = history;
    if (location && location.state) {
      openLoading && openLoading();
      rest.get(`/dataform/admin/dataForm/${location.state.id}/${location.state.code}`).then((res) => {
        this.setState({
          data: res,
        }, () => {
          closeLoading && closeLoading();
        });
      });
    }
  }
  _filterField = (obj, field) => {
    const tempObj = {};
    Object.keys(obj).filter((f) => {
      if (field.includes(f)) {
        if (!tempObj.elementUIHint) {
          tempObj.elementUIHint = {};
        }
        tempObj.elementUIHint[f] = obj[f];
        return false;
      }
      return true;
    }).forEach((f) => {
      tempObj[f] = obj[f];
    });
    return tempObj;
  }
  _saveData = () => {
    const { rest } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        rest.post('/dataform/admin/dataForm/dataFormElement',
          {
            ...this.state.data,
            ...this._filterField(values,
              ['editStyle', 'textAlign', 'readonly',
                'colspan', 'suffix', 'htmlStyle', 'visible', 'required', 'eventExpr', 'dataFormat']),
          }).then(() => {
          Notification.success({
            message: '保存成功',
          });
          this.setState({
            loading: false,
          });
        }).catch((e) => {
          Modal.error({
            title: '保存失败',
            content: JSON.stringify(e),
          });
          this.setState({
            loading: false,
          });
        });
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 3},
      wrapperCol: { span: 20 },
    };
    const style = { width: '50%' };
    const { getFieldDecorator } = this.props.form;
    const { prefix = 'ro', location } = this.props;
    return (
      <div className={`${prefix}-element-detail`}>
        <div className={`${prefix}-element-detail-header`}>
          <Button
            className={`${prefix}-element-detail-header-button`}
            loading={this.state.loading}
            onClick={this._saveData}
          >
            <Icon type="check" />保存
          </Button>
        </div>
        <Form>
          <Collapse defaultActiveKey={['1', '2', '3', '4', '5']} onChange={this._panelChange}>
            <Panel header="基本信息" key="1">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="模板编号"
                >
                  {getFieldDecorator('dataFormId', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.dataFormId
                    || (location && location.state && location.state.id),
                  })(<Text reading />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="中文显示"
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.name,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="英文栏位名"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="编辑形式"
                >
                  {getFieldDecorator('editStyle', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.editStyle,
                  })(<Select
                    options={[
                      {code: 'Text', name: '文本框'},
                      {code: 'Textarea', name: '多行文本框'},
                      {code: 'Select', name: '下拉框'},
                      {code: 'Checkbox', name: '复选框'},
                      {code: 'DatePicker', name: '日期选择'},
                      {code: 'Radiobox', name: '单选框'},
                      {code: 'YearMonthPicker', name: '月份选择'},
                      {code: 'Password', name: '密码框'},
                      {code: 'DateRange', name: '区间日期'},
                      {code: 'Address', name: '地址'},
                      {code: 'Star', name: '五星评分'},
                    ]}
                    optionName="name"
                    optionField="code"
                  />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="排序号"
                >
                  {getFieldDecorator('sortCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.sortCode,
                  })(<Text />)}
                </FormItem>
              </div>
            </Panel>
            <Panel header="展示界面控制" key="2">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="对齐"
                >
                  {getFieldDecorator('textAlign', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.textAlign,
                  })(<RadioBox options={[{code: 1, name: '左'}, {code: 2, name: '中'}, {code: 3, name: '右'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="只读"
                >
                  {getFieldDecorator('readonly', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.readonly,
                  })(<RadioBox options={[{code: 0, name: '否'}, {code: 1, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="跨几栏"
                >
                  {getFieldDecorator('colspan', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.colspan,
                  })(<Select
                    options={[
                      {code: 0, name: '默认(默认占一列）'},
                      {code: 1, name: '占一列'},
                      {code: 2, name: '占两列'},
                      {code: 3, name: '占三列'},
                      {code: 4, name: '占四列'},
                    ]}
                    optionName="name"
                    optionField="code"
                  />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="显示后缀"
                >
                  {getFieldDecorator('suffix', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.suffix,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="单位基数"
                >
                  {getFieldDecorator('multiplier', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.multiplier,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="HTML格式"
                >
                  {getFieldDecorator('htmlStyle', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.htmlStyle,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="可见"
                >
                  {getFieldDecorator('visible', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.visible,
                  })(<RadioBox options={[{code: 0, name: '否'}, {code: 1, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="必须"
                >
                  {getFieldDecorator('required', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.required,
                  })(<RadioBox options={[{code: 0, name: '否'}, {code: 1, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="值类型"
                >
                  {getFieldDecorator('dataType', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.dataType,
                  })(<Select options={['String', 'Number']} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="所属组"
                >
                  {getFieldDecorator('group', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.group,
                  })(<Select />)}
                </FormItem>
              </div>
            </Panel>
            <Panel header="输入界面控制" key="3">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="缺省值"
                >
                  {getFieldDecorator('code10', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="内置按钮事件"
                >
                  {getFieldDecorator('eventExpr', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.eventExpr,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="长度"
                >
                  {getFieldDecorator('limitedLength', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.limitedLength,
                  })(<Text note="中文汉字长度为3，英文字母长度为1" />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="检查格式"
                >
                  {getFieldDecorator('dataFormat', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.dataFormat,
                  })(<Select
                    options={[
                      {code: 'Currency', name: '金额'},
                      {code: 'Date', name: '日期'},
                      {code: 'DateTime', name: '日期时间'},
                      {code: 'Float2', name: '小数点后2位'},
                      {code: 'Float4', name: '小数点后4位'},
                      {code: 'Float6', name: 'float6'},
                      {code: 'Integer', name: '整数'},
                      {code: 'String', name: '字符串'},
                      {code: 'Time', name: '时间'},
                    ]}
                    optionName="name"
                    optionField="code"
                  />)}
                </FormItem>
              </div>
            </Panel>
            <Panel header="列表展现补充" key="4">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="查询"
                >
                  {getFieldDecorator('code0', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<RadioBox options={[{code: 0, name: '否'}, {code: 1, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="查询选项"
                >
                  {getFieldDecorator('code1', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<CheckBox
                    options={[{code: 'Quick', name: '快速搜索'},
                      {code: 'Equal', name: '等于'},
                      {code: 'StartWith', name: '开始于'},
                      {code: 'EndWith', name: '结束于'},
                      {code: 'BigThan', name: '大于'},
                      {code: 'LessThan', name: '小于'},
                      {code: 'Contain', name: '包含'},
                      {code: 'Range', name: '在...之间'}]}
                  />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="可排序"
                >
                  {getFieldDecorator('code2', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<RadioBox options={[{code: 0, name: '否'}, {code: 1, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="提示"
                >
                  {getFieldDecorator('code3', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="是否Sum"
                >
                  {getFieldDecorator('code4', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Select
                    options={[
                      {code: 1, name: '不汇总'},
                      {code: 2, name: '显示小计'},
                      {code: 3, name: '显示小计+总计'},
                    ]}
                    optionName="name"
                    optionField="code"
                  />)}
                </FormItem>
              </div>
            </Panel>
            <Panel header="字段校验" key="5">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="字段校验位置"
                >
                  {getFieldDecorator('code6', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.code,
                  })(<RadioBox options={[{code: 'client', name: '客户端'}, {code: 'Server', name: '服务端'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="表达式"
                >
                  {getFieldDecorator('code7', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="校验方式"
                >
                  {getFieldDecorator('code8', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.code,
                  })(<RadioBox
                    options={[
                      {code: 'jsFunction', name: 'JS函数'},
                      {code: 'owHandler', name: 'owHandler方法'},
                      {code: 'regexp', name: 'owHandler方法'},
                    ]}
                  />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="校验不通过提示"
                >
                  {getFieldDecorator('code9', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
              </div>
            </Panel>
          </Collapse>
        </Form>
      </div>);
  }
});
