import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { Table, LocaleProvider, Modal, Button, Icon, Notify, Text, Pagination } from '../../../../src/components';

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
      },
      {
        title: '操作',
        dataIndex: 'opt',
        key: 'opt',
        render: (text, record, index) => this._createButton(record, index),
      }],
      pageIndex: 0,
      pageCount: 10,
    };
    this.id = ''
  }
  componentDidMount(){
    const { dataform, closeLoading, openLoading } = this.props;
    const { pageIndex, pageCount } = this.state;
    openLoading && openLoading();
    dataform.getAdmin(`/dataform/list/code=DESC/${pageIndex}-${pageCount}`).then((res) => {
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
  _createButton = (record, index) => {
    const { prefix = 'ro' } = this.props;
    return (
      <div>
        <Button
          onClick={() => this._cloneTableData(record)}
          className={`${prefix}-template-detail-table-button`}
        >
          <Icon type="close" />克隆
        </Button>
        <Button
          onClick={() => this.createTab(record)}
          className={`${prefix}-template-detail-table-button`}
        >
          <Icon type="info" />详情
        </Button>
      </div>
    );
  };
  _idChange = (value) => {
    this.id = value;
  };
  _cloneTableData = (record) => {
    const { dataform, openLoading, closeLoading } = this.props;
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
        dataform.postAdmin.post('/dataform/clone', {
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
  createTab = (record) => {
    const { flexTabs } = this.props;
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
  _paginationOnChange = (page, pageSize) => {

  };
  _renderPagination = () => (
    <Pagination
      showSizeChanger={true}
      showQuickJumper={true}
      defaultCurrent={1}
      onShowSizeChange={() => {}}
      onChange={this._paginationOnChange}
    />
  );
  render() {
    return (
      <div>
        <Button
          onClick={() => this.createTab({
            name: '新增模板',
            id: `newTemplateDetail${new Date().getTime()}`,
            flag: true
          })}
        >
          <Icon type="plus" />新增模板
        </Button>
        <LocaleProvider locale={zhCN}>
          <Table
            rowKey={record => record.id}
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={this._renderPagination()}
          />
        </LocaleProvider>
      </div>
    );
  }
}

