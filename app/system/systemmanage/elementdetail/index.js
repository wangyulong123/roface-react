import React from 'react';
import {Form, Button, Icon, Collapse, Text, Modal, Notification } from '../../../../src/components';

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
    const { rest, location, closeLoading, openLoading } = this.props;
    if (location && location.state) {
      openLoading && openLoading();
      rest.restAjax('http://192.168.64.246:8080/dataform/admin/dataform/getdataformelementdetail', 'get',
        {
          code: location.state.code,
          dataformId: location.state.id,
        }).then((res) => {
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
        rest.restAjax('http://192.168.64.246:8080/dataform/admin/dataform/savedataformelement', 'post',
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
    const { prefix = 'ro' } = this.props;
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
                    initialValue: this.state.data.dataFormId,
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
                  })(<Text />)}
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
                  })(<Text />)}
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
                  })(<Text />)}
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
                  })(<Text />)}
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
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="值类型"
                >
                  {getFieldDecorator('dataType', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.dataType,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="所属组"
                >
                  {getFieldDecorator('group', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.group,
                  })(<Text />)}
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
                  {getFieldDecorator('code', {
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
                  })(<Text />)}
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
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="查询选项"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="可排序"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="提示"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="是否Sum"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
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
                  {getFieldDecorator('code', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="表达式"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="校验方式"
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="校验不通过提示"
                >
                  {getFieldDecorator('code', {
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
