import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './style/index.less';
import TemplateDetail from './TemplateDetail';
import ElementDetail from './ElementDetail';
import {Table, LocaleProvider, Modal, Button, Icon, Notify, Text} from '../../../../src/components';

const comSize = 'small';
const ButtonGroup = Button.Group;

export default class DisplayTemplate extends React.Component {
  static TemplateDetail = TemplateDetail;
  static ElementDetail = ElementDetail;

  constructor(props) {
    super(props);
    this.pack = '';
    this.code = '';
    this.state = {
      data: [],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 10,
      columns: [{
        title: '#',
        dataIndex: 'number',
        key: 'number',
        render: (text, record, index) => <span>{index}</span>,
      }, {
        title: '操作',
        dataIndex: 'opt',
        key: 'opt',
        render: (text, record, index) => this._createButton(record, index),
      },{
        title: '模板编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => <a onClick={() => this.createTab(record)}>{text}</a>,
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '数据模型',
        dataIndex: 'dataModelType',
        key: 'dataModelType',
        render: text => <span>{text}</span>,
      },{
        title: '关键字',
        dataIndex: 'tags',
        key: 'tags',
        render: text => <span>{text}</span>,
      }],
    };
  }

  componentDidMount() {
    const {pageIndex, pageSize} = this.state;
    this._getDataformList(pageIndex, pageSize);
  }

  _getDataformList = (index, size) => {
    const {dataform, closeLoading, openLoading} = this.props;
    openLoading && openLoading();
    dataform.getAdmin(`/dataform/list/1=1/${index}-${size}`)
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

  _createButton = (record, index) => {
    return (
      <ButtonGroup>
        <Button onClick={() => this._addTemplate(record, index)} icon="plus" type="primary" size={comSize}/>
        <Button onClick={() => this._deleteTemplate(record, index)} icon="minus" type="primary" size={comSize}/>
        <Button onClick={() => this._cloneTableData(record, index)} icon="copy" type="primary" size={comSize}/>
      </ButtonGroup>
    );
  };
  _cloneTableData = (record, index) => {
    const {dataform, openLoading, closeLoading} = this.props;
    const tempArray = [...(this.state.data || [])];
    const that = this;
    that.pack = record.pack;
    that.code = record.code + 'copy';
    Modal.confirm({
      title: `将会复制模版${record.id}`,
      content: (
        <div>
          新模版包:<Text value={that.pack} onChange={value => this.pack = value} />
          新模版编号:<Text value={that.code} onChange={value => this.code = value} />
        </div>
      ),
      onOk() {
        openLoading && openLoading();
        dataform.postAdmin('/dataform/clone', {
          newDataFormId: that.pack + '-' + that.code,
          oldDataFormId: record.id
        }).then((res) => {
          tempArray.splice(index + 1, 0, res);
          that.setState({ data: tempArray }, () => {
            closeLoading && closeLoading();
            Notify.success({
              message: '克隆成功',
            });
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
    flexTabs.open(`模板:${record.name}`, `System/SystemManage/DisplayTemplate/TemplateDetail/`, {
      dataId: record.id,
      flag: record.flag || false,
    });
  };
  _addTemplate = (record, index) => {
    const newT = { name: '新增模板', id: `newTemplateDetail${new Date().getTime()}`, flag: true }
    const tempArray = [...(this.state.data || [])];
    if (!record) {
      tempArray.push(newT)
    } else {
      tempArray.splice(index + 1, 0, newT);
    }
    this.setState({ data: tempArray });
    this.createTab(newT);
  };
  _deleteTemplate = (record) => {
    const { dataform, closeLoading, openLoading } = this.props;
    const that = this;
    Modal.confirm({
      title: '删除模板',
      content: (
        <div>您确定要删除模板:{record.name || record.id} 吗？</div>
      ),
      onOk() {
        openLoading && openLoading();
        dataform.deleteAdmin(`/dataform/${record.id}`)
          .then(() => {
            that.setState({
              data: that.state.data.filter(ele => ele.code !== record.code)
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
    this._getDataformList(page - 1, pageSize);
  };

  _paginationShowSizeChange = (current, size) => {
    this._getDataformList(current - 1, size);
  };

  render() {
    const {pageIndex, pageSize, totalCount } = this.state;
    return (
      <LocaleProvider locale={zhCN}>
        <Table
          className={'ro-template-table'}
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
          locale={{
            emptyText: <Button onClick={this._addTemplate}>添加一个模版</Button>
          }}
        />
      </LocaleProvider>
    );
  }
}
