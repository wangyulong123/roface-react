import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { Table, LocaleProvider, Modal, Button, Icon, Notify, Text } from '../../../../src/components';
import './style/index.less';

export default class DisplayTemplate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      columns: [{
        title: '#',
        dataIndex: 'number',
        key: 'number',
        render: (text, record, index) => <span>{index}</span>,
      }, {
        title: '模板编号',
        dataIndex: 'code',
        key: 'code',
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a onClick={() => this.createTab(record)}>{text}</a>,
      }, {
        title: '分栏数',
        dataIndex: 'formUIHint',
        key: 'formUIHint',
        render: text => <span>{text.columnNumber}</span>,
      }
      ],
      selectedRowRecord: null,
    };
    this.id = ''
  }
  componentDidMount(){
    const { dataform, closeLoading, openLoading } = this.props;
    openLoading && openLoading();
    dataform.getAdmin('/dataform').then((res) => {
      this.setState({
        data: res,
      }, () => {
        closeLoading && closeLoading();
      });
    }).catch((err) => {
      Modal.error({
        title: '获取模板列表失败',
        content: JSON.stringify(err),
      });
      closeLoading && closeLoading();
    });
  }

  _onSelectRow = (record) => {
    this.setState({
      selectedRowRecord: record,
    });
  };

  _idChange = (value) => {
    this.id = value;
  };

  _cloneTableData = () => {
    const { dataform, openLoading, closeLoading } = this.props;
    const record = this.state.selectedRowRecord;
    if (!record) {
      Notify.info({
        message: '请选择要克隆的模板行！',
      });
      return;
    }
    const that = this;
    Modal.confirm({
      title: '请输入模板编号',
      content: (
        <div>
          <Text defaultValue={record.id} onChange={this._idChange} />
        </div>
      ),
      onOk() {
        openLoading && openLoading();
        dataform.postAdmin('/dataform/clone', {
          newDataFormId: that.id,
          oldDataFormId: record.id
        })
          .then((res) => {
            that.setState({
              data: [...that.state.data, res]
            });
            closeLoading && closeLoading();
            Notify.success({
              message: '克隆成功',
            });
          }).catch((e) => {
          Modal.error({
            title: '克隆失败',
            content: JSON.stringify(e),
          });
        });
      },
    });
  };

  refresh = () => {
    console.log("组件刷新");
  };

  createTab = (record) => {
    const { flexTabs } = this.props;
    record = record || this.state.selectedRowRecord;
    if (!record) {
      Notify.info({
        message: '请选择要查看详情的模板行！',
      });
      return;
    }
    const tab = {
      id: `system/systemManage/TemplateDetail/${record.id}`,
      name: `模板:${record.name}`,
      url: 'system/systemManage/TemplateDetail',
    };
    flexTabs.createTab({
      ...tab,
      state: {
        ...tab,
        dataId: record.id,
        flag: record.flag
      },
    });
  };

  _deleteTemplate = () => {
    const { dataform, closeLoading, openLoading } = this.props;
    openLoading && openLoading();
    const record = this.state.selectedRowRecord;
    if (!record) {
      Notify.info({
        message: '请选择要删除的模板行！',
      });
      return;
    }
    // dataform/{id}
    dataform.deleteAdmin(`/dataform/${record.id}`, {
      id: record.id
    })
      .then((res) => {
        closeLoading && closeLoading();
        Notify.success({
          message: '删除模板成功',
        });
      }).catch((e) => {
      closeLoading && closeLoading();
      Modal.error({
        title: '删除模板失败',
        content: JSON.stringify(e),
      });
    });
  };

  render() {
    const { prefix = 'ro' } = this.props;
    return (
      <div>
        <div className={`${prefix}-template-detail-button-group`}>
          <Button
            onClick={() => this.createTab({
              name: '新增模板',
              id: `newTemplateDetail${new Date().getTime()}`,
              flag: true
            })}
          >
            <Icon type="plus" />新增模板
          </Button>
          <Button
            onClick={() => this._cloneTableData()}
            className={`${prefix}-template-detail-button-group-button`}
          >
            <Icon type="close" />克隆
          </Button>
          <Button
            onClick={() => this.createTab()}
            className={`${prefix}-template-detail-button-group-button`}
          >
            <Icon type="info" />详情
          </Button>
          <Button
            onClick={() => this._deleteTemplate()}
            className={`${prefix}-template-detail-button-group-button`}
          >
            <Icon type="info" />删除
          </Button>
        </div>
        <LocaleProvider locale={zhCN}>
          <Table
            rowKey={record => record.id}
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            rowSelection={{
              type: 'radio',
              onSelect: this._onSelectRow
            }}
          />
        </LocaleProvider>
      </div>
    );
  }
}

