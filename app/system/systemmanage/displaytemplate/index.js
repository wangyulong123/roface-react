import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { Table, LocaleProvider } from '../../../../src/components';

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
        render: (text, record) => <a onClick={() => this._createTab(record)}>{text}</a>,
      }, {
        title: '分栏数',
        dataIndex: 'formUIHint',
        key: 'formUIHint',
        render: text => <span>{text.columnNumber}</span>,
      }],
    };
  }
  componentDidMount(){
    const { rest, closeLoading, openLoading } = this.props;
    openLoading && openLoading();
    rest.restAjax('http://192.168.64.246:8080/dataform/admin/dataform/getdataform', 'get').then((res) => {
      this.setState({
        data: res,
      }, () => {
        closeLoading && closeLoading();
      });
    });
  }
  _createTab = (record) => {
    const { flexTabs, history } = this.props;
    history.replace(`/system/systemManage/TemplateDetail/${record.id}`, { id: record.id });
    flexTabs._createTab({
      id: `system/systemManage/TemplateDetail/${record.id}`,
      name: `模板:${record.name}`,
      url: 'system/systemManage/TemplateDetail',
      state: {
        id: record.id,
      },
    });
  };
  render() {
    return (
      <div>
        <LocaleProvider locale={zhCN}>
          <Table
            rowKey={record => record.id}
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </LocaleProvider>
      </div>
    );
  }
}

