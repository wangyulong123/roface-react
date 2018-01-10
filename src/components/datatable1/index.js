/**
 * Created by dpcui on 09/01/2018.
 */

import React from 'react';
import { Table } from 'antd';
import ReactDom from 'react-dom';
import * as dataForm from '../../lib/dataform';
import * as components from '../index';
import { developCompose } from '../developCompose';

const { Modal, Notify } = components;

const EditableCell = ({editable, value, comp, onChange, options}) => {
  const Comp = components[comp];
  return (
    <div>
      {editable ?
        <Comp
          value={value}
          onChange={e => onChange(e)}
          options={options}
        />
        : value
      }
    </div>
  );
};

@developCompose
class RoDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageSize: 10,
      totalCount: 10,
      dataSource: [],
      columns: [],
      // dataMeta: {},
      // dataBody: {},
      // dict: {},
    };
  }

  componentDidMount() {
    const { didMount, formReady, dataReady } = this.props;
    const { pageIndex, pageSize } = this.state;
    /* eslint-disable */
    formReady && formReady(ReactDom.findDOMNode(this));
    this.table = {
      setColumnTemplate: this.setColumnTemplate,
    };
    this._getDataList(pageIndex, pageSize).then(() => {
      didMount && didMount(this.table);
      dataReady && dataReady(this.table);
    })
  }

  _getDataList = (index, size) => {
    const { dataFormId, params } = this.props;
    if (params) {
      return dataForm.getDataList(dataFormId, this._serializeParam(params), 'sort_code=ASC', index, size)
        .then((res) => {
        const columns = (res.meta && this.columnsHandler(res.meta.elements)) || [];
        this.setState({
          dataMeta: res.meta || res,
          dataBody: res.body || {},
          dict: res.dict || {},
          columns: columns,
          dataSource: (res.body && res.body.dataList) || [],
          pageIndex: res.body && res.body.index,
          pageSize: res.body && res.body.size,
          totalCount: res.body && res.body.totalRowCount,
        });
      }).catch(e => {
        Modal.error({
          title: '获取列表数据失败',
          content: JSON.stringify(e)
        })
      });
    }
    return dataForm.getMeta(dataFormId)
  };

  _serializeParam = (params, field) => {
    let str = '';
    if (typeof params === 'string') {
      str = params;
    } else {
      if (Array.isArray(params) && field) {
        params.forEach(p => {
          if (typeof p === 'string' || typeof p === 'number') {
            str = `${str}&${field}=${p}`;
          }
        })
      } else {
        Object.keys(params).forEach(p => {
          if (Array.isArray(params[p])) {
            str = `${str}&${this._serializeParam(params[p], p)}`;
          } else {
            str = `${str}&${p}=${params[p]}`;
          }
        })
      }
    }
    return str.replace(/^&/g, '');
  };

  _paginationOnChange = (page, pageSize) => {
    this._getDataList(page - 1, pageSize);
  };

  _paginationShowSizeChange = (current, size) => {
    this._getDataList(current - 1, size);
  };

  handleChange = (value, key, column) => {};

  renderColumns = (text, comp, record, column) => {
    return (
      <EditableCell
        editable={false}
        value={text}
        comp={comp}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  };

  setColumnTemplate = (field, callback) => {
    this._updateElementUIHint(ele => ele.key === field, callback);
  };

  _updateElementUIHint = (match, callback) => {
    this.setState({
      columns: this.state.columns.map(ele => {
        if (match(ele) && callback) {
          return {
            ...ele,
            render: (text, record, index) => callback(text, record, index),
          }
        }
        return ele;
      })
    });
  };

  columnsHandler = (col) => {
    return col && col.map((item) => {
      return {
        title: item.name,
        dataIndex: item.code,
        key: item.code,
        render: (text, record, index) => this.renderColumns(text,
          item.elementUIHint.editStyle, record, index),
        colSource: item,
      };
    });
  };

  render() {
    const {pageIndex, pageSize, totalCount } = this.state;
    return (
      <Table
        {...this.props}
        columns={this.state.columns}
        dataSource={this.state.dataSource}
        rowKey={record => record.id}
        rowSelection={{
          type: 'radio',
          selections: true,
        }}
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
        this
      />
    )
  }
}

export default RoDataTable;
