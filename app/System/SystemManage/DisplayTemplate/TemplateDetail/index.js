import React from  'react';
import * as components from '../../../../../src/components';
import './style/index.less';

const {
  Form, Collapse, Text, RadioBox, TextArea, Table,
  Button, Icon, Modal, Notify, Dropdown, Menu, CheckBox,
} = components;

const Panel = Collapse.Panel;
const FormItem = Form.Item;

const EditableCell = ({value, com, onChange, options}) => {
  const Com = components[com];
  if (com === 'Select' || com === 'RadioBox' || com === 'CheckBox') {
    return (
      <div>
        <Com
          style={{margin: '-5px 0'}}
          value={value}
          onChange={onChange}
          options={options}
          optionName="name"
          optionField="code"
        />
      </div>
    );
  }
  return (
    <div>
      <Com
        style={{margin: '-5px 0'}}
        value={value}
        onChange={onChange}
      />
    </div>
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
      },
        {
          title: '中文显示名',
          dataIndex: 'name',
          key: 'name',
          render: (text, record, index) => this._renderColumns('name', 'Text', text, record, index),
        },
        {
          title: '列名',
          dataIndex: 'code',
          key: 'code',
          render: (text, record, index) => this._renderColumns('code', 'Text', text, record, index),
        },
        {
          title: '对齐',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.textAlign',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.textAlign', 'RadioBox', text && text.textAlign, record, index,
              [{code: 'Left', name: '左'}, {code: 'Center', name: '中'}, {code: 'Right', name: '右'}]),
        },
        {
          title: '编辑形式',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.editStyle',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.editStyle', 'Select', text && text.editStyle, record, index,
              [
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
              ]),
        },
        {
          title: '代码表',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.dictCodeExpr',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.dictCodeExpr', 'Text', text && text.dictCodeExpr, record, index),
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
            this._renderColumns('elementUIHint.readonly', 'RadioBox', text && text.readonly, record, index, [])
        },
        {
          title: '必须',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.required',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.required', 'RadioBox', text && text.required, record, index, []),
        },
        // {
        //   title: '所属组',
        //   dataIndex: 'group',
        //   key: 'group',
        //   render: (text, record, index) => this._renderColumns('name', 'Text', text, record, index),
        // },
        {
          title: '跨几栏',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.colspan',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.colspan', 'RadioBox', text && text.colspan, record, index,
              [
                {code: 0, name: '默认(1)'},
                {code: 1, name: '1'},
                {code: 2, name: '2'},
                {code: 3, name: '3'},
                {code: 4, name: '4'},
              ]),
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
          data: res,
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
            <Icon type="plus" />添加
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button
            onClick={() => this._deleteTableData(record)}
            className={`${prefix}-template-detail-table-button`}
          >
            <Icon type="close" />删除
          </Button>
        </Menu.Item>
        <Menu.Item key="3">
          <Button
            onClick={() => this._checkDataId(record)}
            className={`${prefix}-template-detail-table-button`}
          >
            <Icon type="info" />详情
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Dropdown.Button overlay={menu}>
          操作
        </Dropdown.Button>
      </div>
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
            }, that.createTab(record))
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
    const newField = { name: `新字段${length}`, code: `新字段${length}`};
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
                label="包名"
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
                label="编号"
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
                label="分栏数"
              >
                {getFieldDecorator('columnNumber', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.formUIHint
                  && this.state.data.formUIHint.columnNumber,
                })(<RadioBox options={[
                  {code: 1, name: '一栏'},
                  {code: 2, name: '二栏'},
                  {code: 3, name: '三栏'},
                  {code: 4, name: '四栏'},
                ]}
                />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="JBO定义表名"
              >
                {getFieldDecorator('dataModel', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.dataModel
                })(<Text />)}
              </FormItem>
              {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="查询项"*/}
              {/*>*/}
                {/*{getFieldDecorator('select', {*/}
                  {/*rules: [{ required: false }],*/}
                  {/*initialValue: this.state.data.query*/}
                  {/*&& this.state.data.query.select,*/}
                {/*})(<Text />)}*/}
              {/*</FormItem>*/}
              <FormItem
                {...formItemLayout}
                label="查询条件"
              >
                {getFieldDecorator('where', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query
                  && this.state.data.query.where,
                })(<TextArea />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="From"
              >
                {getFieldDecorator('from', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query
                  && this.state.data.query.from,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Group By"
              >
                {getFieldDecorator('groupBy', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query
                  && this.state.data.query.groupBy,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Order By"
              >
                {getFieldDecorator('orderBy', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query
                  && this.state.data.query.orderBy,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="having"
              >
                {getFieldDecorator('having', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.query
                  && this.state.data.query.having,
                })(<Text />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="业务模型"
              >
                {getFieldDecorator('handler', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.handler,
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
              rowKey={record => record.code}
              columns={this.state.columns}
              dataSource={this.state.data.elements || []}
              pagination={false}
            />
          </Panel>
        </Collapse>
      </div>);
  }
});
