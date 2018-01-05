/**
 * Created by hjtu (hjtu@amarsoft.com) on 2017/12/18.
 */

import React from 'react';
import ReactDom from 'react-dom';
import {Table, LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import DataButtons from './databuttons';
import DataSearcher from './datasearcher';
import DataToggle from './datatoggle';
import DataFilter from './datafilter';
import Methods from './api-inject';
import './index.css';

class DataTable extends React.Component {
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
    const injects = {};
    this.props.dataReady && (injects.dataReady = this.props.dataReady);
    injects.query = {
      dono: this.props.dataFormId,
      params: this.props.dataFormParams,
    };
    // console.log(injects);
    this.methods.init(injects);
  }

  componentDidMount() {
    /* eslint-disable react/no-find-dom-node*/
    this.props.formReady && this.props.formReady(ReactDom.findDOMNode(this));
    if (this.props.didMounted) {
      this.props.didMounted(this.methods);
    }
    this.run(this.props.dataFormId, this.props.dataFormParams);
  }

  componentWillUnmount() {
  }

  render() {
    if (this.beforeRender) {
      this.beforeRender();
    }
    const target = this;
    function renderDataFilter() {
      let tpl = null;
      if (target.state.openSeniorSearch) {
        tpl = <DataFilter />;
      }
      return tpl;
    }

    return (
      <div className="data-table-wrapper">
        <div className="data-table-operation">
          <div className="data-btn-wrapper">
            <DataButtons buttonList={this.state.buttonList} methods={this.methods}/>
          </div>
          <div className="data-searcher-wrapper">
            <DataSearcher placeholder="haha" onSearch={this.onQuickSearch} />
          </div>
          <div className="data-toggle-wrapper">
            <DataToggle onChange={this.onSearcherToggle} />
          </div>
        </div>
        <div className="data-filter-wrapper">
          {renderDataFilter()}
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
export default DataTable;
