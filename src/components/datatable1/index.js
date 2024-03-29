/**
 * Created by dpcui on 09/01/2018.
 */

import React from 'react';
import EasyTable from './easyTable';
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
      loading: false,
      // dataMeta: {},
      // dataBody: {},
      // dict: {},
    };
  }

  componentDidMount() {
    const { didMount, formReady, dataReady } = this.props;
    const { pageIndex, pageSize } = this.state;
    /* eslint-disable */
    this.table = {
      setColumnTemplate: this.setColumnTemplate,
      addColumn: this.addColumn,
      deleteColumn: this.deleteColumn,
    };
    this._getMeta().then((res) => {
      this.setState({
        dict: res.dict || {},
        columns: (res.meta && this.columnsHandler(res.meta.elements)) || [],
      }, () => {
        formReady && formReady(this.table);
        this._getDataList(pageIndex, pageSize).then(() => {
          didMount && didMount(this.table);
          dataReady && dataReady(this.table);
        });
      })
    });
  }

  setColumnTemplate = (field, callback) => {
    this._updateColumnsHandler(field, callback);
  };

  addColumn = (i, callback) => {};
  deleteColumn = (i, callback) => {};

  _getMeta = () => {
    const { dataFormId } = this.props;
    return dataForm.getMeta(dataFormId).catch(e => {
      Modal.error({
        title: '获取列表模版失败',
        content: JSON.stringify(e)
      });
    });
  };

  _getDataList = (index, size) => {
    const { dataFormId, params } = this.props;
    if (params) {
      this.setState({ loading: true });
      return dataForm.getDataList(dataFormId, this._serializeParam(params), 'sort_code=ASC', index, size)
        .then((res) => {
        this.setState({
          dataBody: res.body || {},
          dataSource: (res.body && res.body.dataList) || [],
          pageIndex: res.body && res.body.index,
          pageSize: res.body && res.body.size,
          totalCount: res.body && res.body.totalRowCount,
          loading: false
        });
      }).catch(e => {
        Modal.error({
          title: '获取列表数据失败',
          content: JSON.stringify(e)
        })
      });
    } else {
      Modal.error({
        title: '获取列表数据失败',
        content: '未传入参数'
      });
    }
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

  _getDictName = (name, value) => {
    const { dict } = this.state;
    const options = (dict[name] || []);
    const dicName = options.filter(op => op.code === value)[0];
    if (dicName) {
      return dicName.name || value;
    }
    return value;
  };

  _paginationOnChange = (page, pageSize) => {
    this._getDataList(page - 1, pageSize);
  };

  _paginationShowSizeChange = (current, size) => {
    this._getDataList(current - 1, size);
  };

  handleChange = (value, key, column) => {};

  renderColumns = (text, comp, record, index, column) => {

    return (
      <EditableCell
        editable={false}
        value={this._getDictName(column.code, text)}
        comp={comp}
        onChange={value => this.handleChange(value, record, column)}
      />
    );
  };

  _updateColumnsHandler = (field, callback) => {
    if (field instanceof Number) {}
    this.setState({
      columns: this.state.columns.map(ele => {
        if (ele.key === field && callback) {
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
          item.elementUIHint.editStyle, record, index, item),
        colSource: item,
      };
    });
  };

  render() {
    const {pageIndex, pageSize, totalCount } = this.state;
    return (
      <EasyTable
        {...this.props}
        loading={this.state.loading}
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
