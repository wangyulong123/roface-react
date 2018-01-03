import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './style/index.less';
import TemplateDetail from './TemplateDetail';
import ElementDetail from './ElementDetail';
import { Table, LocaleProvider, Modal, Button, Icon, Notify, Text } from '../../../../src/components';

export default class DisplayTemplate extends React.Component {
  static TemplateDetail = TemplateDetail;
  static ElementDetail = ElementDetail;
  constructor(props){
  super(props);
  this.id = '';
  this.state = {
    data: [],
    selectedRowRecord: null,
    pageIndex: 0,
    pageSize: 10,
    totalCount: 10,
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
      }],
    };
  }
  componentDidMount(){
    const { pageIndex, pageSize } = this.state;
    this._getDataformList(pageIndex, pageSize);
  }
  _getDataformList = (index, size, code='DESC') => {
    const { dataform, closeLoading, openLoading } = this.props;
    openLoading && openLoading();
    dataform.getAdmin(`/dataform/list/code=${code}/${index}-${size}`)
    .then((res) => {
      this.setState({
        pageIndex: res.index,
        pageSize: res.size,
        data: res.dataList,
        totalCount: res.totalRowCount,
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
  };

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
      id: `System/SystemManage/DisplayTemplate/TemplateDetail/${record.id}`,
      name: `模板:${record.name}`,
      url: 'System/SystemManage/DisplayTemplate/TemplateDetail',
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
    const record = this.state.selectedRowRecord;
    const that = this;
    if (!record) {
      Notify.info({
        message: '请选择要删除的模板行！',
      });
      return;
    }
    // dataform/{id}
      Modal.confirm({
        title: '删除模板',
        content: (
          <div>您确定要删除模板:{record.name || record.id} 吗？</div>
        ),
        onOk() {
          openLoading && openLoading();
          // 如果删除的是索引为0的项目，则默认选中后面一项
          // 如果删除的不是索引为0的，则选中删除项前面的一项
          // 如果删除的是该列表的最后一项，则默认不做选中
          const isDeletedIndex = that.state.data.findIndex(templateItem => templateItem.id === record.id);
          let nextIndex = 0;
          if (isDeletedIndex === 0) {
            nextIndex = isDeletedIndex + 1;
          } else if (isDeletedIndex > 0) {
            nextIndex = (isDeletedIndex - 1 < 0) ? 0 : isDeletedIndex - 1
          }
          dataform.deleteAdmin(`/dataform/${record.id}`)
            .then(() => {
              that.setState({
                data: that.state.data && that.state.data.filter(templateItem => templateItem.id !== record.id),
                selectedRowRecord: that.state.data[nextIndex]
              }, () => {
                  closeLoading && closeLoading();
                  Notify.success({
                    message: '删除模板' + (record.name || record.id) + '成功',
                  });
              });
            }).catch((e) => {
            closeLoading && closeLoading();
            Modal.error({
              title: '删除模板失败',
              content: JSON.stringify(e),
            });
          });
        },
      });
  };

  _paginationOnChange = (page, pageSize) => {
    this._getDataformList(page-1, pageSize);
  };

  _paginationShowSizeChange = (current, size) => {
    this._getDataformList(current-1, size);
  };

  render(){
    const { pageIndex, pageSize, totalCount, prefix = 'ro' } = this.state;
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
            <Icon type="close" />删除
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
              defaultCurrent: 1,
              total: totalCount,
              pageSize: pageSize,
              current: pageIndex + 1,
              onShowSizeChange: this._paginationShowSizeChange,
              onChange: this._paginationOnChange
            }}
            rowSelection={{
              type: 'radio',
              onSelect: this._onSelectRow,
              selectedRowKeys: [this.state.selectedRowRecord && this.state.selectedRowRecord.id]
            }}
          />
        </LocaleProvider>
      </div>
    );
  }
}
