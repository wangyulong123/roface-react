import React from  'react';

import { Form, Collapse, Text, RadioBox, TextArea, Table, Button, Icon, Modal, Notification } from '../../../../src/components';

import './style/index.less';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

const EditableCell = ({ value, onChange }) => (
  <div>
    <Text style={{ margin: '-5px 0' }} value={value} onChange={onChange} />
  </div>
);

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
          title: '对其',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.textAlign',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.textAlign', 'Select', text && text.textAlign, record, index),
        },
        {
          title: '编辑形式',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.editStyle',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.editStyle', 'Select', text && text.editStyle, record, index),
        },
        {
          title: '代码表',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.dictCodeExpr',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.dictCodeExpr', 'RadioBox', text && text.dictCodeExpr, record, index),
        },
        {
          title: '可见',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.visible',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.visible', 'RadioBox', text && text.visible, record, index),
        },
        {
          title: '只读',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.readonly',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.readonly', 'RadioBox', text && text.readonly, record, index),
        },
        {
          title: '必须',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.required',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.required', 'RadioBox', text && text.required, record, index),
        },
        {
          title: '所属组',
          dataIndex: 'group',
          key: 'group',
          render: (text, record, index) => this._renderColumns('name', 'Text', text, record, index),
        },
        {
          title: '跨几栏',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.colspan',
          render: (text, record, index) =>
            this._renderColumns('elementUIHint.colspan', 'RadioBox', text && text.colspan, record, index),
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
    const { rest, history, closeLoading, openLoading } = this.props;
    const { location } = history;
    if (location && location.state && location.state.id) {
      openLoading && openLoading();
      rest.get('/dataform/admin/dataform/getdataformelement',
        {
          id: location.state.id,
        }).then((res) => {
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
  _renderColumns(name, com, text, record, column) {
    return (
      <EditableCell
        value={text}
        com={com}
        onChange={value => this._dataChange(name, value, record.code, column)}
      />
    );
  }
  _createButton = (record, index) => {
    const { prefix = 'ro' } = this.props;
    return (
      <div>
        <Button
          onClick={() => this._addTableData(record, index)}
          className={`${prefix}-template-detail-table-button`}
        >
          <Icon type="plus" />添加
        </Button>
        <Button
          onClick={() => this._deleteTableData(record)}
          className={`${prefix}-template-detail-table-button`}
        >
          <Icon type="close" />删除
        </Button>
        <Button
          onClick={() => this._createTab(record)}
          className={`${prefix}-template-detail-table-button`}
        >
          <Icon type="info" />详情
        </Button>
      </div>
    );
  }
  _createTab = (record) => {
    const { flexTabs, history } = this.props;
    const { data } = this.state;
    history.replace(`/system/systemManage/ElementDetail/${data.id}/${record.code}`, { id: data.id, code: record.code });
    flexTabs._createTab({
      id: `system/systemManage/ElementDetail/${data.id}/${record.code}`,
      name: `字段:${record.name}`,
      url: 'system/systemManage/ElementDetail',
      state: {
        id: data.id,
        code: record.code,
      },
    });
  };
  _addTableData = (record, index) => {
    const { length } = this.state.data.elements;
    const tempArray = [...this.state.data.elements];
    tempArray.splice(index + 1, 0, { name: `新字段${length}`, code: `新字段${length}`});
    this.setState({
      data: {
        ...this.state.data,
        elements: tempArray,
      },
    });
  }
  _filterField = (obj, field) => {
    const tempObj = {};
    Object.keys(obj).filter(f => f !== field).forEach((f) => {
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
        rest.post('/dataform/admin/dataform/savedataform',
          {
            ...this.state.data,
            ...this._filterField(values, 'columnNumber'),
            formUIHint: {
              ...this.state.data.formUIHint,
              columnNumber: values.columnNumber,
            },
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
                {getFieldDecorator('handler', {
                  rules: [{ required: false }],
                  initialValue: this.state.data.handler,
                })(<TextArea />)}
              </FormItem>
            </Form>
          </Panel>
          <Panel header="字段信息" key="2">
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
