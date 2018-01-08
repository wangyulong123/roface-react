import React from  'react';
import * as components from '../../../../../src/components';
import './style/index.less';

const {
  Form, Collapse, Text, RadioBox, TextArea, Table,
  Button, Icon, Modal, Notify, Select
} = components;

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const comSize = 'small';

const EditableCell = ({value, com, onChange, options}) => {
  const Com = components[com];
  if (com === 'Select' || com === 'RadioBox' || com === 'CheckBox') {
    return (
      <Com
        size={comSize}
        value={value}
        onChange={onChange}
        options={options}
        optionName="name"
        optionField="code"
      />
    );
  }
  return (
    <Com
      size={comSize}
      value={value}
      onChange={onChange}
    />
  );
  
};

export default Form.create()(class TemplateDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      columns: [{
        title: '#',
        dataIndex: 'number',
        key: 'number',
        render: (text, record, index) => <span>{index}</span>,
      },
      {
        title: '操作',
        dataIndex: 'opt',
        key: 'opt',
        width: '140px',
        render: (text, record, index) => this._createButton(record, index),
      },
      {
      title: '排序号',
      dataIndex: 'sortCode',
      key: 'sortCode',
      render: (text, record, index) => this._renderColumns('sortCode', 'Text', text, record, index),
      },
      {
        title: '显示名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => this._renderColumns('name', 'Text', text, record, index),
      },
      {
        title: '英文代码',
        dataIndex: 'code',
        key: 'code',
        render: (text, record, index) => this._renderColumns('code', 'Text', text, record, index),
      },
      {
        title: '列名',
        dataIndex: 'column',
        key: 'column',
        render: (text, record, index) => this._renderColumns('column', 'Text', text, record, index),
      },
      {
        title: '可见',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.visible',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.visible', 'CheckBox', text && text.visible ? true : false,
            record, index, []),
      },
      {
        title: '只读',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.readonly',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.readonly', 'CheckBox', text && text.readonly, record, index, [])
      },
      {
        title: '必须',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.required',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.required', 'CheckBox', text && text.required, record, index, []),
      },
      {
        title: '栏位数',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.colspan',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.colspan', 'Select', (text && text.colspan) || 1, record, index,
            [
              {code: 1, name: '1'},
              {code: 2, name: '2'},
              {code: 3, name: '3'},
              {code: 4, name: '4'},
            ]),
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        render: (text, record, index) => this._renderColumns('dataType', 'Select',
          text || 'String', record, index,
          ['String', 'Integer', 'Double', 'Date', 'StringArray', 'Boolean']),
      },
      {
        title: '编辑形式',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.editStyle',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.editStyle', 'Select', text && text.editStyle || 'Text', record, index,
            [
              {code: 'Text', name: '文本框'},
              {code: 'TextArea', name: '多行文本框'},
              {code: 'Select', name: '下拉框'},
              {code: 'CheckBox', name: '复选框'},
              {code: 'DatePicker', name: '日期选择'},
              {code: 'RadioBox', name: '单选框'},
              {code: 'YearMonthPicker', name: '月份选择'},
              {code: 'Password', name: '密码框'},
              {code: 'DateRange', name: '区间日期'},
              {code: 'Address', name: '地址'},
              {code: 'Star', name: '五星评分'},
            ]),
      },
      {
        title: '字典形式',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.dictCodeMode',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.dictCodeMode', 'Select', text && text.dictCodeMode, record, index,
          ['SQLQuery', 'DictCode', 'JSON']),
      },
      {
        title: '字典表达式',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.dictCodeExpr',
        render: (text, record, index) =>
          this._renderColumns('elementUIHint.dictCodeExpr', 'Text', text && text.dictCodeExpr, record, index),
      }],
    };
  }
  componentDidMount(){
    const { dataform, closeLoading, openLoading, param } = this.props;
    if (param && param.dataId && !param.flag) {
      openLoading && openLoading();
      dataform.getAdmin(`/dataform/${param.dataId}`).then((res) => {
        this.setState({
          data: {
            ...res,
            elements: (res.elements || []).map(ele => ({ ...ele, key: Math.uuid() }))
          },
        }, () => {
          closeLoading && closeLoading();
        });
      });
    }
  }
  _dataChange = (name, value, key) => {
    this.setState({
      data: {
        ...this.state.data,
        elements: this.state.data.elements.map((ele) => {
          if (ele.key === key) {
            if (name.includes('.')) {
              const arrays = name.split('.');
              return {
                ...ele,
                [arrays[0]]: {
                  ...ele[arrays[0]],
                  [arrays[1]]: value
                }
              }
            }
            return {
              ...ele,
              [name]: value,
            };
          }
          return ele;
        }),
      },
    });
  };
  _renderColumns = (name, com, text, record, index, options) => (
    <EditableCell
      value={text}
      com={com}
      onChange={value => this._dataChange(name, value, record.key)}
      options={options}
    />
  );
  _createButton = (record, index) => {
    return (
      <ButtonGroup>
        <Button onClick={() => this._checkDataId(record)} icon="edit" type="primary" size={comSize}/>
        <Button onClick={() => this._addTableData(record, index)} icon="plus" type="primary" size={comSize}/>
        <Button onClick={() => this._deleteTableData(record)} icon="minus" type="primary" size={comSize}/>
      </ButtonGroup>
    );
  };
  _checkDataId = (record) => {
    const { data } = this.state;
    if (!data.id) {
      const that = this;
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        title: '是否保存当前模板?',
        content: '当前模板为新增模板，请先保存。',
        onOk() {
          that._saveData().then(res => {
            that.setState({
              data: res
            }, () => that.createTab(record))
          })
        },
      })
    } else {
      this.createTab(record);
    }
  }
  createTab = (record) => {
    const { flexTabs } = this.props;
    const { data } = this.state;
    const tab = {
      id: Math.uuid(),
      name: `字段:${record.name}`,
      url: 'System/SystemManage/DisplayTemplate/ElementDetail',
    };
    flexTabs.createTab({
      ...tab,
      param: {
        dataId: data.id,
        dataCode: record.code,
      },
    });
  };
  _addTableData = (record, index) => {
    const { length } = this.state.data.elements || [];
    const tempArray = [...(this.state.data.elements || [])];
    const nextElement = tempArray[index + 1];
    let sortC = parseInt(record.sortCode) || 1000;
    sortC = parseInt(nextElement ? (parseInt(nextElement.sortCode) + sortC) / 2 : sortC + 10);
    const newField = { name: `新字段${length}`, code: `新字段${length}`, key: Math.uuid(), sortCode: sortC};
    if (!record) {
      tempArray.push(newField)
    } else {
      tempArray.splice(index + 1, 0, newField);
    }
    this.setState({
      data: {
        ...this.state.data,
        elements: tempArray,
      },
    });
  };
  _filterField = (obj, field) => {
    const tempObj = {};
    Object.keys(obj).filter(f => f !== field).forEach((f) => {
      tempObj[f] = obj[f];
    });
    return tempObj;
  };
  _saveData = () => {
    const { dataform } = this.props;
    return new Promise((resovle, reject) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            loading: true,
          });
          const param = {
            ...this.state.data,
            ...this._filterField(values, 'columnNumber'),
            ...this._filterField(values, 'formStyle'),
            formUIHint: {
              ...this.state.data.formUIHint,
              columnNumber: values.columnNumber,
              formStyle: values.formStyle,
            },
            query: {
              ...this.state.data.query,
              select: values.select,
              where: values.where,
              from: values.from,
              groupBy: values.groupBy,
              orderBy: values.order,
              having: values.having,
            }
          };
          const url = this.state.data.id ? `/dataform/${this.state.data.id}` : '/dataform';
          dataform.postAdmin(url, param).then((res) => {
            resovle(res);
            Notify.success({
              message: '保存成功',
            });
            this.setState({
              loading: false,
            });
          }).catch((e) => {
            reject(e);
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
    })
    
  }
  _deleteTableData = (record) => {
    this.setState({
      data: {
        ...this.state.data,
        elements: this.state.data.elements.filter(ele => ele.code !== record.code),
      },
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 8},
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator, prefix = 'ro' } = this.props.form;
    const style = { width: '100%' };
    return (
      <div className={`${prefix}-template-detail`}>
        <div className={`${prefix}-template-detail-all-save`}>
          <Button
            onClick={this._saveData}
            className={`${prefix}-template-detail-all-save-button`}
            loading={this.state.loading}
            type="primary"
          >
            <Icon type="check" />保存
          </Button>
        </div>
        <div className={`${prefix}-template-detail-collapse`}>
          <Collapse defaultActiveKey={['1', '2']} onChange={this._panelChange}>
            <Panel header="基本信息" key="1">
              <Form className={`${prefix}-template-detail-info-layout`}>
                <FormItem
                  style={{ width: '30%' }}
                  {...formItemLayout}
                  label="包"
                  wrapperCol={{ span: 13 }}
                >
                  <div>
                    {getFieldDecorator('pack', {
                      rules: [{ required: true }],
                      initialValue: this.state.data.pack,
                    })(<Text />)}
                  </div>
                </FormItem>
                <FormItem
                  style={{ width: '65%' }}
                  {...formItemLayout}
                  label="模版代码"
                  wrapperCol={{ span: 12 }}
                >
                  <div>
                    {getFieldDecorator('code', {
                      rules: [{ required: true }],
                      initialValue: this.state.data.code,
                    })(<Text />)}
                  </div>
                </FormItem>
                <FormItem
                  style={{ width: '50%' }}
                  {...formItemLayout}
                  label="名称"
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.name,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{ width: '50%' }}
                  {...formItemLayout}
                  label="排序码"
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('sortCode', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.sortCode,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={{ width: '50%' }}
                  {...formItemLayout}
                  label="显示方式"
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('formStyle', {
                    rules: [{ required: true }],
                    initialValue: (this.state.data.formUIHint
                      && this.state.data.formUIHint.formStyle) || 'DataTable',
                  })(<Select options={[
                      {code: 'DataTable', name: 'DataTable'},
                      {code: 'DetailInfo', name: 'DetailInfo'},
                      {code: 'TreeTable', name: 'TreeTable'},
                      {code: 'ListItem', name: 'ListItem'},
                      {code: 'ListCard', name: 'ListCard'},
                    ]}
                             optionName="name"
                             optionField="code"
                    />
                  )}
                </FormItem>
                <FormItem
                  style={{ width: '45%' }}
                  {...formItemLayout}
                  label="栏数"
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('columnNumber', {
                    rules: [{ required: false }],
                    initialValue: (this.state.data.formUIHint
                      && this.state.data.formUIHint.columnNumber) || 1,
                  })(<RadioBox options={[
                    {code: 1, name: '1'},
                    {code: 2, name: '2'},
                    {code: 3, name: '3'},
                    {code: 4, name: '4'},
                  ]}
                  />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="关键字"
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator('tags', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.tags,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="模版说明"
                >
                  {getFieldDecorator('description', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.description,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="数据模型"
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator('dataModelType', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.dataModelType || 'JavaBean',
                  })(<RadioBox options={[
                    {code: 'JavaBean', name: 'JavaBean'},
                    {code: 'DataMap', name: 'DataMap'},
                  ]}/>)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="数据实体"
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('dataModel', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.dataModel,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="处理Handler"
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator('handler', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.handler,
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="SELECT"
                  wrapperCol={{ span: 6 }}
                >
                  {getFieldDecorator('select', {
                    rules: [{ required: false }],
                    initialValue: (this.state.data.query
                      && this.state.data.query.select) || 'select',
                  })(<Text />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="字段明细"
                >
                  <code>[自动计算]</code>
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="FROM"
                >
                  {getFieldDecorator('from', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.query
                    && this.state.data.query.from,
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="WHERE"
                >
                  {getFieldDecorator('where', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.query
                    && this.state.data.query.where,
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="GROUP BY"
                >
                  {getFieldDecorator('groupBy', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.query
                    && this.state.data.query.groupBy,
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="ORDER BY"
                >
                  {getFieldDecorator('orderBy', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.query
                    && this.state.data.query.orderBy,
                  })(<TextArea />)}
                </FormItem>
                <FormItem
                  style={style}
                  {...formItemLayout}
                  label="HAVING"
                >
                  {getFieldDecorator('having', {
                    rules: [{ required: false }],
                    initialValue: this.state.data.query
                    && this.state.data.query.having,
                  })(<TextArea />)}
                </FormItem>
              </Form>
            </Panel>
            <Panel header="字段信息" key="2">
              <Table
                className={`${prefix}-template-field-table`}
                rowKey={record => record.key}
                columns={this.state.columns}
                dataSource={this.state.data.elements || []}
                pagination={false}
                scroll={{ x: 2000 }}
                locale={{
                  emptyText: <Button onClick={this._addTableData}>添加一个字段</Button>
                }}
              />
            </Panel>
          </Collapse>
        </div>
      </div>);
  }
});
