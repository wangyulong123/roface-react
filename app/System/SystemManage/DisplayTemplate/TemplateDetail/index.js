import React from  'react';
import * as components from '../../../../../src/components';
import './style/index.less';
import { Checkbox } from 'antd';

const {
  Form, Collapse, Text, RadioBox, TextArea, Table,
  Button, Icon, Modal, Notify, Dropdown, Menu, Select
} = components;

const Panel = Collapse.Panel;
const FormItem = Form.Item;

const EditableCell = ({value, com, onChange, options}) => {
  const Com = components[com];
  if ( com === 'CheckBox' ) {
    return (
      <Checkbox
        style={{margin: '-5px 0'}}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />

    );
  } else if (com === 'Select' || com === 'RadioBox') {
    return (
      <Com
        style={{margin: '-5px 0'}}
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
      style={{margin: '-5px 0'}}
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
      },{
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
            this._renderColumns('elementUIHint.visible', 'CheckBox', text && text.visible, record, index, []),
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
            this._renderColumns('elementUIHint.colspan', 'RadioBox', (text && text.colspan) || 1, record, index,
              [
                {code: 1, name: '1'},
                {code: 2, name: '2'},
                {code: 3, name: '3'},
                {code: 4, name: '4'},
              ]),
        },
        {
          title: '数据类型',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.dataFormat',
          render: (text, record, index) => this._renderColumns('elementUIHint.dataFormat', 'Select',
            text && text.dataFormat, record, index,
            ['String', 'Integer', 'Double', 'Currency', 'Date', 'DateTime', 'Time']),
        },
        {
          title: '编辑形式',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.editStyle',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.editStyle', 'Select', text && text.editStyle, record, index,
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
        },
        {
          title: '操作',
          dataIndex: 'opt',
          key: 'opt',
          render: (text, record, index) => this._createButton(record, index),
        },
      ],
    };
  }
  componentDidMount(){
    const { dataform, history, closeLoading, openLoading } = this.props;
    const { location } = history;
    if (location && location.state && location.state.dataId && !location.state.flag) {
      openLoading && openLoading();
      dataform.getAdmin(`/dataform/${location.state.dataId}`).then((res) => {
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
  _dataChange = (name, value, code) => {
    this.setState({
      data: {
        ...this.state.data,
        elements: this.state.data.elements.map((ele) => {
          if (ele.code === code) {
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
  }
  _renderColumns = (name, com, text, record, column, options) => (
    <EditableCell
      value={text}
      com={com}
      onChange={value => this._dataChange(name, value, record.code, column)}
      options={options}
    />
  );
  _createButton = (record, index) => {
    const { prefix = 'ro' } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Button
            onClick={() => this._addTableData(record, index)}
            className={`${prefix}-template-detail-table-button`}
          >
            添加
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button
            onClick={() => this._deleteTableData(record)}
            className={`${prefix}-template-detail-table-button`}
          >
            删除
          </Button>
        </Menu.Item>
        <Menu.Item key="3">
          <Button
            onClick={() => this._checkDataId(record)}
            className={`${prefix}-template-detail-table-button`}
          >
            详情
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Button>操作 <Icon type="down" /></Button>
      </Dropdown>
    );
  }
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
      id: `System/SystemManage/DisplayTemplate/ElementDetail/${data.id}/${record.code}`,
      name: `字段:${record.name}`,
      url: 'System/SystemManage/DisplayTemplate/ElementDetail',
    };
    flexTabs.createTab({
      ...tab,
      state: {
        ...tab,
        dataId: data.id,
        dataCode: record.code,
      },
    });
  };
  _addTableData = (record, index) => {
    const { length } = this.state.data.elements || [];
    const tempArray = [...(this.state.data.elements || [])];
    const newField = { name: `新字段${length}`, code: `新字段${length}`, key: Math.uuid()};
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
    console.log(this.state.data);
  }
  _filterField = (obj, field) => {
    const tempObj = {};
    Object.keys(obj).filter(f => f !== field).forEach((f) => {
      tempObj[f] = obj[f];
    });
    return tempObj;
  }
  _saveData = () => {
    const { dataform } = this.props;
    return new Promise((resovle, reject) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            loading: true,
          });
          dataform.postAdmin(`/dataform?dataFormId=${this.state.data.id}`,
            {
              ...this.state.data,
              ...this._filterField(values, 'columnNumber'),
              formUIHint: {
                ...this.state.data.formUIHint,
                columnNumber: values.columnNumber,
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
            }).then((res) => {
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
      labelCol: { span: 6},
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator, prefix = 'ro' } = this.props.form;
    return (
      <div className={`${prefix}-template-detail`}>
        <div className={`${prefix}-template-detail-all-save`}>
          <Button
            onClick={this._saveData}
            className={`${prefix}-template-detail-all-save-button`}
            loading={this.state.loading}
          >
            <Icon type="check" />保存
          </Button>
        </div>
        <Collapse defaultActiveKey={['1', '2']} onChange={this._panelChange}>
          <Panel header="基本信息" key="1">
            <Form className="login-form">
              <FormItem
                {...formItemLayout}
                label="包"
              >
                <div>
                  {getFieldDecorator('pack', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.pack,
                  })(<Text />)}
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="模版代码"
              >
                <div>
                  {getFieldDecorator('code', {
                    rules: [{ required: true }],
                    initialValue: this.state.data.code,
                  })(<Text />)}
                </div>
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
                label="标签"
              >
                {getFieldDecorator('tags', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.tags,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="模版说明"
              >
                {getFieldDecorator('description', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.description,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="栏数"
              >
                {getFieldDecorator('columnNumber', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.formUIHint
                  && this.state.data.formUIHint.columnNumber,
                })(<RadioBox options={[
                  {code: 1, name: '1'},
                  {code: 2, name: '2'},
                  {code: 3, name: '3'},
                  {code: 4, name: '4'},
                ]}
                />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="排序码"
              >
                {getFieldDecorator('sortCode', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.sortCode,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="数据模型类别"
              >
                {getFieldDecorator('dataModelType', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.dataModelType,
                })(<Select options={['JavaBean', 'DataMap']} />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="数据模型"
              >
                {getFieldDecorator('dataModel', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.dataModel,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="处理Handler"
              >
                {getFieldDecorator('handler', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.handler,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="SELECT"
              >
                {getFieldDecorator('select', {
                  rules: [{ required: false }],
                  initialValue: (this.state.data.query
                  && this.state.data.query.select) || 'select',
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="FROM"
              >
                {getFieldDecorator('from', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query
                  && this.state.data.query.from,
                })(<TextArea />)}
              </FormItem>
              <FormItem
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
            <Button
              onClick={this._addTableData}
              className={`${prefix}-template-detail-table-button`}
            >
              <Icon type="plus" />添加
            </Button>
            <Table
              rowKey={record => record.key}
              columns={this.state.columns}
              dataSource={this.state.data.elements || []}
              pagination={false}
              scroll={{ x: 1904 }}
            />
          </Panel>
        </Collapse>
      </div>);
  }
});
