/**
 * Created by hjtu (hjtu@amarsoft.com) on 2017/12/18.
 */

import React from 'react';
import { Table } from 'antd';
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
    return (
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
    );
  }
}
export default DetailTable;
