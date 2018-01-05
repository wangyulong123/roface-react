/**
 * Created by hjtu (hjtu@amarsoft.com) on 2017/12/18.
 */

import React from 'react';
import {Table, LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import DetailButtons from './detailbuttons';
import DetailSearcher from './detailsearcher';
import DetailToggle from './detailtoggle';
import DetailFilter from './detailfilter';
import Methods from './api-inject';
import './index.css';

class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.methods = new Methods();
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this.methods));
    keys.splice(keys.indexOf('constructor'), 1);
    keys.forEach((method) => {
      this.methods[method] = this.methods[method].bind(this);
      this[method] = this.methods[method];
    });
    this.methods.init();
  }

  componentDidMount() {
    if (this.props.onMounted) {
      this.props.onMounted(this.methods);
    }
  }

  componentWillUnmount() {
  }

  render() {
    if (this.beforeRender) {
      this.beforeRender();
    }
    const target = this;
    function renderDetailFilter() {
      let tpl = null;
      if (target.state.openSeniorSearch) {
        tpl = <DetailFilter />;
      }
      return tpl;
    }

    return (
      <div className="detail-table-wrapper">
        <div className="detail-table-operation">
          <div className="detail-btn-wrapper">
            <DetailButtons buttonList={this.state.buttonList} methods={this.methods}/>
          </div>
          <div className="detail-searcher-wrapper">
            <DetailSearcher placeholder="haha" onSearch={this.onQuickSearch} />
          </div>
          <div className="detail-toggle-wrapper">
            <DetailToggle onChange={this.onSearcherToggle} />
          </div>
        </div>
        <div className="detail-filter-wrapper">
          {renderDetailFilter()}
        </div>
        <LocaleProvider locale={zhCN}>
          <Table
            columns={this.state.columns}
            dataSource={this.state.rows}
            loading={this.state.gridOptions.tplLoading && this.state.gridOptions.dataLoading}
            rowSelection={this.state.rowSelection}
            size={this.state.gridOptions.size}
            bordered={this.state.gridOptions.bordered}
            rowKey={this.state.key}
            footer={this.state.footer}
            pagination={this.state.paginationConf}
          />
        </LocaleProvider>
      </div>
    );
  }
}
export default DetailTable;
