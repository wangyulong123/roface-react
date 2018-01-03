import React from 'react';
import {
  Form, Button, Icon, Collapse, Text, Modal, Notify, Select, RadioBox,
  CheckBox,
} from '../../../../../src/components';

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
    const { dataform, history, closeLoading, openLoading } = this.props;
    const { location } = history;
    if (location && location.state) {
      openLoading && openLoading();
      dataform.getAdmin(`/dataform/${location.state.dataId}/${location.state.dataCode}`).then((res) => {
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
    const { dataform } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        dataform.postAdmin(`/dataform/${this.state.id}/element`,
          {
            ...this.state.data,
            ...this._filterField(values,
              ['readonly', 'required', 'dataFormat', 'maskFormat', 'textAlign', 'editStyle',
                'dictCodeMode', 'dictCodeExpr', 'prefix', 'suffix', 'tips', 'tipsI18nCode',
                'noteI18nCode', 'visible', 'rank', 'mediaQuery', 'htmlStyle', 'colspan', 'eventExpr']),
          }).then(() => {
          Notify.success({
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
          <Collapse defaultActiveKey={['1', '2', '3',]} onChange={this._panelChange}>
            <Panel header="基本信息" key="1">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="模板ID"
                >
                  {getFieldDecorator('dataFormId', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.dataFormId
                    || (location && location.state && location.state.dataId),
                  })(<Text />)}
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
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="显示名"
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.name,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="国际化代码"
                >
                  {getFieldDecorator('nameI18nCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.nameI18nCode,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '20%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 10}}
                  label="英文代码"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="列名"
                >
                  {getFieldDecorator('column', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.column,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '20%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 10}}
                  label="数据类型"
                >
                  {getFieldDecorator('column', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.dataFormat,
                  })(<Select options={['String', 'Integer', 'Double', 'Currency', 'Date', 'DateTime', 'Time']} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="数据表"
                >
                  {getFieldDecorator('table', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.table,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="可更新"
                >
                  {getFieldDecorator('updateable', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.updateable,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="持久化"
                >
                  {getFieldDecorator('persist', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.persist,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="启用"
                >
                  {getFieldDecorator('enable', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.enable,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="是否主键"
                >
                  {getFieldDecorator('primaryKey', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.primaryKey,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="主键生成器"
                >
                  {getFieldDecorator('primaryKeyGenerator', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.primaryKeyGenerator,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="默认值"
                >
                  {getFieldDecorator('defaultValue', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.defaultValue,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="倍数"
                >
                  {getFieldDecorator('multiplier', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.multiplier,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="最大长度"
                >
                  {getFieldDecorator('limitedLength', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.limitedLength,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="统计表达式"
                >
                  {getFieldDecorator('summaryExpression', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.summaryExpression,
                  })(<Text />)}
                </FormItem>
              </div>
            </Panel>
            <Panel header="分组信息" key="2">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="一级分组表达式"
                >
                  {getFieldDecorator('group', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.group,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="一级分组国际化代码"
                >
                  {getFieldDecorator('groupI18nCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.groupI18nCode,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="二级分组表达式"
                >
                  {getFieldDecorator('subGroup', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.subGroup,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="二级分组国际化代码"
                >
                  {getFieldDecorator('subGroupI18nCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.subGroupI18nCode,
                  })(<Text />)}
                </FormItem>
              </div>
            </Panel>
            <Panel header="展示界面控制" key="3">
              <div className={`${prefix}-element-detail-body-panel`}>
                <FormItem
                  style={{...style, width: '25%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 10}}
                  label="可见"
                >
                  {getFieldDecorator('visible', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.visible,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '25%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 10}}
                  label="只读"
                >
                  {getFieldDecorator('readonly', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.readonly,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '20%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 10}}
                  label="必需"
                >
                  {getFieldDecorator('required', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.required,
                  })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
                </FormItem>
                <FormItem
                  style={{...style, width: '30%'}}
                  {...formItemLayout}
                  wrapperCol={{span: 15}}
                  label="栏位数"
                >
                  {getFieldDecorator('colspan', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.colspan,
                  })(<RadioBox options={[
                      {code: 1, name: '1'},
                      {code: 2, name: '2'},
                      {code: 3, name: '3'},
                      {code: 4, name: '4'},
                    ]}
                    optionName="name"
                    optionField="code"
                  />)}
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
                  label="对齐"
                >
                  {getFieldDecorator('textAlign', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.textAlign,
                  })(<RadioBox options={[{code: 'Left', name: '左'}, {code: 'Center', name: '中'}, {code: 'Right', name: '右'}]} />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="数据字典模式"
                >
                  {getFieldDecorator('dictCodeMode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.dictCodeMode,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="数据字典表达式"
                >
                  {getFieldDecorator('dictCodeExpr', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.dictCodeExpr,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="前缀"
                >
                  {getFieldDecorator('prefix', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.prefix,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="后缀"
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
                  label="TIPS"
                >
                  {getFieldDecorator('tips', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.tips,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="TIPS国际化代码"
                >
                  {getFieldDecorator('tipsI18nCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.tipsI18nCode,
                  })(<Text />)}
                </FormItem>

                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="字段备注"
                >
                  {getFieldDecorator('note', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.note,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="字段备注国际化代码"
                >
                  {getFieldDecorator('noteI18nCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint
                    && this.state.data.elementUIHint.noteI18nCode,
                  })(<Text />)}
                </FormItem>

                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="层级权重值"
                >
                  {getFieldDecorator('rank', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint && this.state.data.elementUIHint.rank,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="媒体查询"
                >
                  {getFieldDecorator('mediaQuery', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint && this.state.data.elementUIHint.mediaQuery,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="事件表达式"
                >
                  {getFieldDecorator('eventExpr', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint && this.state.data.elementUIHint.eventExpr,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="HTML样式"
                >
                  {getFieldDecorator('htmlStyle', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.elementUIHint && this.state.data.elementUIHint.htmlStyle,
                  })(<Text />)}
                </FormItem>
              </div>
            </Panel>
          </Collapse>
        </Form>
      </div>);
  }
});
//
// <Panel header="输入界面控制" key="3">
//   <div className={`${prefix}-element-detail-body-panel`}>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="缺省值"
//     >
//       {getFieldDecorator('defaultValue', {
//         rules: [{ required: false }],
//         initialValue: this.state.data.defaultValue,
//       })(<Text />)}
//     </FormItem>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="内置按钮事件"
//     >
//       {getFieldDecorator('eventExpr', {
//         rules: [{ required: false }],
//         initialValue: this.state.data.elementUIHint
//         && this.state.data.elementUIHint.eventExpr,
//       })(<Text />)}
//     </FormItem>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="长度"
//     >
//       {getFieldDecorator('limitedLength', {
//         rules: [{ required: false }],
//         initialValue: this.state.data.limitedLength,
//       })(<Text note="中文汉字长度为3，英文字母长度为1" />)}
//     </FormItem>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="检查格式"
//     >
//       {getFieldDecorator('maskFormat', {
//         rules: [{ required: false }],
//         initialValue: this.state.data.elementUIHint
//         && this.state.data.elementUIHint.maskFormat,
//       })(<Select
//         options={[
//           {code: 'Currency', name: '金额'},
//           {code: 'Date', name: '日期'},
//           {code: 'DateTime', name: '日期时间'},
//           {code: 'Float2', name: '小数点后2位'},
//           {code: 'Float4', name: '小数点后4位'},
//           {code: 'Float6', name: 'float6'},
//           {code: 'Integer', name: '整数'},
//           {code: 'String', name: '字符串'},
//           {code: 'Time', name: '时间'},
//         ]}
//         optionName="name"
//         optionField="code"
//       />)}
//     </FormItem>
//   </div>
// </Panel>
// <Panel header="列表展现补充" key="4">
//   <div className={`${prefix}-element-detail-body-panel`}>
// <FormItem
// style={style}
// {...formItemLayout}
// label="查询"
//   >
//   {getFieldDecorator('enable', {
//   rules: [{ required: false }],
//     initialValue: this.state.data.enable,
// })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
// </FormItem>
// <FormItem
//   style={style}
//   {...formItemLayout}
//   label="查询选项"
// >
//   {getFieldDecorator('comparePattern', {
//     rules: [{ required: false }],
//     initialValue: this.state.data.comparePattern,
//   })(<CheckBox
//     options={[{code: 'Quick', name: '快速搜索'},
//       {code: 'Equal', name: '等于'},
//       {code: 'StartWith', name: '开始于'},
//       {code: 'EndWith', name: '结束于'},
//       {code: 'BigThan', name: '大于'},
//       {code: 'LessThan', name: '小于'},
//       {code: 'Contain', name: '包含'},
//       {code: 'Range', name: '在...之间'}]}
//   />)}
// </FormItem>
// <FormItem
//   style={style}
//   {...formItemLayout}
//   label="聚合表达式"
// >
//   {getFieldDecorator('summaryExpression', {
//     rules: [{ required: false }],
//     initialValue: this.state.data.summaryExpression,
//   })(<Text />)}
// </FormItem>
// <FormItem
//   style={style}
//   {...formItemLayout}
//   label="可排序"
// >
//   {getFieldDecorator('sortable', {
//     rules: [{ required: false }],
//     initialValue: this.state.data.sortable,
//   })(<RadioBox options={[{code: false, name: '否'}, {code: true, name: '是'}]} />)}
// </FormItem>
// <FormItem
//   style={style}
//   {...formItemLayout}
//   label="提示"
// >
//   {getFieldDecorator('tips', {
//     rules: [{ required: false }],
//     initialValue: this.state.data.elementUIHint
//     && this.state.data.elementUIHint.tips,
//   })(<Text />)}
// </FormItem>
// </div>
// </Panel>
// <Panel header="字段校验" key="5">
//   <div className={`${prefix}-element-detail-body-panel`}>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="校验执行位置"
//     >
//       {getFieldDecorator('runAt', {
//         rules: [{ required: true }],
//         initialValue: this.state.data.runAt,
//       })(<RadioBox options={[{code: 'Client', name: '客户端'}, {code: 'Server', name: '服务端'}]} />)}
//     </FormItem>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="表达式"
//     >
//       {getFieldDecorator('expr', {
//         rules: [{ required: false }],
//         initialValue: this.state.data.expr,
//       })(<Text />)}
//     </FormItem>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="校验方式"
//     >
//       {getFieldDecorator('mode', {
//         rules: [{ required: true }],
//         initialValue: this.state.data.mode,
//       })(<RadioBox
//         options={[
//           {code: 'jsFunction', name: 'JS函数'},
//           {code: 'owHandler', name: 'owHandler方法'},
//           {code: 'regexp', name: 'owHandler方法'},
//         ]}
//       />)}
//     </FormItem>
//     <FormItem
//       style={style}
//       {...formItemLayout}
//       label="校验不通过提示"
//     >
//       {getFieldDecorator('defaultMessage', {
//         rules: [{ required: false }],
//         initialValue: this.state.data.defaultMessage,
//       })(<Text />)}
//     </FormItem>
//   </div>
// </Panel>
