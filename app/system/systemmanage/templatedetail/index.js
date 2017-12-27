import React from  'react';

import { Form, Collapse, Text, RadioBox, TextArea, Table, Button, Icon, Modal, Notification } from '../../../../src/components';

import './style/index.less';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

export default Form.create()(class TemplateDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      selectedKeys: [],
      loading: false,
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
        render: (text, record) => <a onClick={() => this._createTab(record)}>{text}</a>,
      },
      {
        title: '单位基数',
        dataIndex: 'multiplier',
        key: 'multiplier',
      },
      {
        title: '列名',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '对其',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.textAlign',
        render: text => <span>{text && text.textAlign}</span>,
      },
      {
        title: '编辑形式',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.editStyle',
        render: text => <span>{text && text.editStyle}</span>,
      },
      {
        title: '代码表',
        dataIndex: 'elementUIHint',
        key: 'elementUIHint.dictCodeExpr',
        render: text => <span>{text && text.dictCodeExpr}</span>,
      },
        {
          title: '可见',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.visible',
          render: text => <span>{text && text.visible ? '是' : '否'}</span>,
        },
        {
          title: '只读',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.readonly',
          render: text => <span>{text && text.readonly ? '是' : '否'}</span>,
        },
        {
          title: '必须',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.required',
          render: text => <span>{text && text.required ? '是' : '否'}</span>,
        },
        {
          title: '所属组',
          dataIndex: 'group',
          key: 'group',
        },
        {
          title: '跨几栏',
          dataIndex: 'elementUIHint',
          key: 'elementUIHint.colspan',
          render: text => <span>{text && text.colspan}</span>,
        },
      ],
    };
  }
  componentDidMount(){
    const { rest, location, closeLoading, openLoading } = this.props;
    if (location && location.state && location.state.id) {
      openLoading && openLoading();
      rest.get('http://192.168.64.246:8080/dataform/admin/dataform/getdataformelement',
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
  _selectionOnChange = (record) => {
    this.setState({
      selectedKeys: [record.code],
    });
  }
  _rowClick = (row) => {
    this.setState({
      selectedKeys: [row.code],
    });
  }
  _getBodyWrapper = (body) => {
    return (
      <tbody className={body.className}>
        {
          body.children.map((child) => {
            return {
              ...child,
              props: {
                ...child.props,
                onRowClick: this._rowClick,
              },
            };
          })
        }
      </tbody>);
  }
  _addTableData = () => {
    const { length } = this.state.data.elements;
    this.setState({
      data: {
        ...this.state.data,
        elements: [...this.state.data.elements, { name: `新字段${length}`, code: `新字段${length}`}],
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
        rest.post('http://192.168.64.246:8080/dataform/admin/dataform/savedataform',
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
  _deleteTableData = () => {
    this.setState({
      data: {
        ...this.state.data,
        elements: this.state.data.elements.filter(ele => ele.code !== this.state.selectedKeys[0]),
      },
      selectedKeys: [],
    });
  }
  _setGroupColumn = () => {

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
            <div>
              <Button
                onClick={this._addTableData}
                className={`${prefix}-template-detail-table-button`}
              >
                <Icon type="plus" />添加
              </Button>
              <Button
                onClick={this._saveData}
                className={`${prefix}-template-detail-table-button`}
                loading={this.state.loading}
              >
                <Icon type="check" />保存
              </Button>
              <Button
                onClick={this._deleteTableData}
                className={`${prefix}-template-detail-table-button`}
                disabled={this.state.selectedKeys.length === 0}
              >
                <Icon type="close" />删除
              </Button>
              <Button
                onClick={this._setGroupColumn}
                className={`${prefix}-template-detail-table-button`}
                disabled={this.state.selectedKeys.length === 0}
              >
                <Icon type="setting" />设置分组
              </Button>
            </div>
            <Table
              rowSelection={{
                selectedRowKeys: this.state.selectedKeys,
                type: 'radio',
                onSelect: this._selectionOnChange,
              }}
              rowKey={record => record.code}
              columns={this.state.columns}
              dataSource={this.state.data.elements || []}
              pagination={false}
              components={{
                body: {
                  wrapper: this._getBodyWrapper,
                },
              }}
            />
          </Panel>
        </Collapse>
      </div>);
  }
});
