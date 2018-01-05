/**
 * Created by hjtu (hjtu@amarsoft.com) on 2017/12/20.
 */

import React from 'react';
// import { Input, InputNumber, Select, DatePicker, TimePicker } from 'antd';
import { Text, TextArea, NumberInput, Currency, Select, MultiSelect, DatePicker, DateTimePicker, YearMonthPicker, YearPicker, TimePicker } from '../../components';
import * as rest from '../../lib/rest';
import * as TableService from './table-service';

// const _columns = [{
//   title: '#',
//   dataIndex: 'index',
//   render(text, record, index) {
//     return index + 1;
//   },
//   static: true,
// }, {
//   title: '姓名',
//   dataIndex: 'name',
//   type: 'input',
//   readonly: true,
// }, {
//   title: '年龄',
//   dataIndex: 'age',
//   type: 'number',
// }, {
//   title: '身高',
//   dataIndex: 'height',
//   type: 'number',
// }, {
//   title: '体重',
//   dataIndex: 'weight',
//   type: 'number',
// }, {
//   title: '生日',
//   dataIndex: 'birth',
//   type: 'date',
// }, {
//   title: '地址',
//   dataIndex: 'address',
//   type: 'select',
//   codeDict: [{
//     id: '01',
//     label: '北京',
//   }, {
//     id: '02',
//     label: '上海',
//     disabled: true,
//   }, {
//     id: '03',
//     label: '广州',
//   }, {
//     id: '04',
//     label: '深圳',
//   }],
// }, {
//   title: '性别',
//   dataIndex: 'sex',
//   type: 'select',
//   codeDict: [{
//     id: 'F',
//     label: '女',
//   }, {
//     id: 'M',
//     label: '男',
//   }, {
//     id: 'U',
//     label: '未知',
//   }],
// }];

// let _rows = [{
//   name: '李雷',
//   age: 13,
//   address: '01',
//   height: 171,
//   weight: 62,
//   birth: new Date('1992/06/16').getTime(),
//   sex: 'M',
// }, {
//   name: '韩梅梅',
//   age: 12,
//   address: '02',
//   height: 165,
//   weight: 48,
//   birth: new Date('1994/01/16').getTime(),
//   sex: 'F',
// }, {
//   name: 'Polly',
//   age: 1,
//   address: '03',
//   height: 21,
//   weight: 2.3,
//   birth: new Date('2001/02/30').getTime(),
//   sex: 'U',
// }, {
//   name: 'Miss Wang',
//   age: 29,
//   address: '04',
//   height: 161,
//   weight: 52,
//   birth: new Date('1985/03/01').getTime(),
//   sex: 'F',
// }];

// for (let i = 0; i < 2; i += 1) {
//   _rows = _rows.concat(_rows);
// }

export default class DataListObject {
  init() {
    const target = this;
    this.state.gridOptions = {
      searchRenderOnly: false,
      loading: false,
      size: 'default',
      bordered: true,
      requireType: 'remote',
      // rowSelection: {

      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
      // }),
      // },
    };

    this.state.rowSelection = {
      selectedRowKeys: [],
      hideDefaultSelections: true,
      // fixed: true,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        if (this.remember && this.state.rowSelection.type === 'checkbox') {
          this.updateRemembered(selectedRows);
        }

        this.$set('rowSelection.selectedRowKeys', selectedRowKeys);

        this.selectedRows = selectedRows;
        if (this.on.selectRow) {
          this.on.selectRow(selectedRowKeys, selectedRows);
        }
      },
      onSelect: (record, selected, selectedRows) => {
        // if (this.remember && this.state.rowSelection.type === 'checkbox') {
        //   this.toggleRememberedRows(record, selected);
        // }
        if (this.on.selectionChange) {
          this.on.selectionChange(record, selected, selectedRows);
        }
      },
    };

    this.state.paginationConf = {
      pagination: false,
      showQuickJumper: true,
      showSizeChanger: true,
      defaultPageSize: 10,
      current: 1,
      total: 0,
      pageSize: this.defaultPageSize,
      noItemText: '',
      // itemRender: function (page, type, originalElement) {
      //   console.log(page, type, originalElement);
      // },
      pageSizeOptions: ['10', '20', '30', '40', '50', '150', '300'],
      onChange(currentPage, itemsPerPage) {
        target.$set('paginationConf.current', currentPage);
        if (target.remember && target.state.rowSelection.type === 'checkbox') {
          target.setRememberedRows();
        }
        if (target.on.pageChanged) {
          target.on.pageChanged(currentPage, itemsPerPage);
        }
      },
      onShowSizeChange(current, size) {
        console.log(current, size);
        target.$set('paginationConf.pageSize', size);
        if (target.remember && target.state.rowSelection.type === 'checkbox') {
          target.setRememberedRows();
        }
        if (target.on.itemPerPageChange) {
          target.on.itemPerPageChange(current, size);
        }
      },
      // 用作添加删除数据时单页数据条目数超过默认设置时修改单页显示条目数
      onSizeChange(size) {
        console.log(this.defaultPageSize, size);
        target.$set('paginationConf.pageSize', Math.max(this.defaultPageSize, size));
      },
    };

    this.state.rows = [];
    this.state.columns = [];
    // this.state.buttonList = [];
    this.state.key = '$$key';

    // 自定义表footer
    // function setFooter(footerData) {
    //   console.log(footerData);
    //   return (<h1>111</h1>);
    // }

    // this.state.footer = setFooter.bind(this);

    // 事件监听注册
    this.on = {
      // 行选中监听（多行状态
      // 'selectRow': null,
      // ***单行选中监听（单行状态）***
      // 'selectionChange': null,
      // ***数据查询成功后的监听***
      // 'beforeRenderData': null,
      // ***分页切换监听***
      // 'pageChanged': null,
      // ***单页数据条数监听***,
      // 'itemPerPageChange': null
    };

    function valueChanged(rowIndex, field, value, oldValue) {
      // DataListObject
      //   .debounce(target.on.valueChanged, 200, i, column.dataIndex, val, oldVal)();
      // console.warn(rowIndex, field, value, oldValue);
      this.executeLinkages(rowIndex, field, value, oldValue);
      this.executeGrandTotal(field);
      // console.log(rowIndex, field, value, oldValue);
    }

    this.on.valueChanged = valueChanged.bind(this);
    this.lastQuery = {};

    console.log(this.lastQuery);
    this.disabledKeys = [];

    this.remember = false;
    this.rememberRows = [];

    this.selectedRows = [];
    this.changeValueCollection = [];
    this.linkages = [];
    this.linkageTrees = [];

    this.grandTotal = {};
    this.grandTotalLibrary = {
      average: {
        name: '平均值',
        method(preV, currV, index, array) {
          let ret = 0;
          if (index === array.length - 1) {
            ret = (Number(preV) + Number(currV)) / (index + 1);
          } else {
            ret = (Number(preV) + Number(currV));
          }
          return ret;
        },
      },
      sum: {
        name: '总数',
        method(preV, currV) {
          return Number(preV) + Number(currV);
        },
      },
    };

    function renderGrandTotalFooter() {
      return Object.keys(this.grandTotal).map((key) => {
        return (
          <section key={key}>
            <b>{key}:</b>
            <span>{this.grandTotal[key].result}</span>
          </section>
        );
      });
    }

    this.tplTypeMap = {
      text: 'input',
      textarea: 'textarea',
      select: 'select',
      checkbox: 'multiselect',
      radiobox: 'select',
      number: 'number',
      currency: 'currency',
      multiSelect: 'checkbox',
      datepicker: 'datepicker',
      yearmonthpicker: 'yearmonthpicker',
      yearpicker: 'yearpicker',
      datetimepicker: 'datetimepicker',
      timepicker: 'datetimepicker',
    };

    this.renderGrandTotalFooter = renderGrandTotalFooter.bind(this);


    this.rowsHint = [{
      field: '$$all',
      execute: {
        readonly: false,
        style: {
          color: 'red',
        },
      },
    }];

    this.columnsHint = [
      {
        field: '$$all',
        execute() {
          return {
            readonly: false,
          };
        },
      }, {
        field: 'name',
        execute: {
          readonly: false,
        },
      }, {
        field: 'height',
        execute: {
          style: {
            width: 200,
            backgroundColor: '#ddd',
          },
        },
      }, {
        field: 'weight',
        execute: {
          render(text) {
            return (<b>{text}</b>);
          },
        },
      }];
  }

  // 事件监听方法
  onSelectRow(callback) {
    this.on.selectRow = callback.bind(this);
  }

  onSelectionChange(callback) {
    this.on.selectionChange = callback.bind(this);
  }

  onBeforeRenderData(callback) {
    this.on.beforeRenderData = callback.bind(this);
  }

  onPageChanged(callback) {
    this.on.pageChanged = callback.bind(this);
  }

  onItemPerPageChange(callback) {
    this.on.itemPerPageChange = callback.bind(this);
  }

  queryTplAndData(dono, params) {
    if (this.state.gridOptions.searchRenderOnly) {
      return null;
    }
    this.$set('gridOptions.tplLoading', true);
    this.$set('gridOptions.dataLoading', true);

    if (!this.state.paginationConf.pagination) {
      this.$set('paginationConf.itemsPerPage', 0);
    }

    const promise = new Promise((resolve) => {
      TableService.queryTableTplAndData(dono, params,
        Math.max(this.state.paginationConf.current - 1, 0),
        this.state.paginationConf.defaultPageSize).then((res) => {
        resolve(res);
      });
    });

    return promise;
  }

  // 数据查询方法
  queryDataDefault() {
    if (this.state.gridOptions.searchRenderOnly) {
      return null;
    }
    this.$set('gridOptions.loading', true);
    this.$set('paginationConf.pagination', this.state.paginationConf.pagination !== false);

    // this.paginationConf.pagination = this.paginationConf.pagination !== false;
    if (!this.state.paginationConf.pagination) {
      this.$set('paginationConf.itemsPerPage', 0);
    }
    // listService.queryListData(
    // p.dono,
    // p.owArgs,
    // vm.paginationConf.currentPage,
    // vm.paginationConf.itemsPerPage,
    // hasCodeMap, _hasCodeParam,
    // {url:vm.gridOptions.URLs.queryData}
    // ).then(res => {
    //
    // })
    // 暂时用setTimeout替代从服务端请求数据
    const promise = new Promise((resolve) => {
      // setTimeout(() => {
      //   resolve(_rows);
      //   // this.rows = data;
      // }, 1000);
      rest.get('/detailTableData').then((res) => {
        resolve(res.data.slice(0, 9));
        this.$set('paginationConf.pageSize', res.data.slice(0, 9).length);
        // this.$set('paginationConf.total', res.data.length);
        // console.warn(res.data);
      });
    });

    return promise;
  }


  queryTplData() {
    // listService.queryListTpl(
    // dono,
    // _hasCodeParam,
    // owArgs,
    // {url:vm.gridOptions.URLs.queryTemplate}
    // ).then((res) => {
    // })

    this.$set('gridOptions.tplLoading', true);

    // 暂时用setTimeout替代从服务端请求数据
    const promise = new Promise((resolve) => {
      // setTimeout(() => {
      //   resolve(_columns);
      // }, 1000);
      rest.get('/detailTableTpl').then((res) => {
        console.log(res);
        const adapter = this.templateAdapter
        && this.templateAdapter instanceof Function
          ? this.templateAdapter : DataListObject.tplAdapter;
        resolve(adapter(res, this.tplTypeMap));
      });
    });

    return promise;
  }

  static queryDataByFilter(p) {
    console.log(p);
  }

  queryData(type, p) {
    let promise = null;
    if (type.trim() === 'default') {
      promise = this.queryDataDefault(p);
    }
    if (type.trim() === 'filter') {
      promise = this.queryDataByFilter(p);
    }

    if (promise && promise.then) {
      this.$set('gridOptions.dataLoading', true);
      promise = new Promise((resolve) => {
        promise.then((rows) => {
          // 数据查询后执行小计
          Object.keys(this.grandTotal).forEach((key) => {
            this.executeGrandTotal(key, rows);
          });
          if (this.on.beforeRenderData) {
            this.on.beforeRenderData(this);
          }
          resolve(rows);
        });
      });
    }
    return promise;
  }

  rend() {
    this.fillData();
    this.renderUI();
  }

  static parseHint(hints, data, key) {
    const columnsHint = {};
    data.forEach((tpl) => {
      if (!tpl.static) {
        columnsHint[tpl[key]] = {};
      }
    });
    hints.forEach((hint) => {
      let execute = {};
      if (hint.execute) {
        if (hint.execute instanceof Function) {
          execute = hint.execute();
        } else if (!(hint.execute instanceof Array) &&
          hint.execute instanceof Object) {
          execute = hint.execute;
        }
      }

      // 清空在数据加载后的列render方法
      execute.render = execute.render instanceof Function ?
        execute.render : null;
      if (hint.field instanceof Function) {
        data.filter(hint.field).forEach((item) => {
          const element = {};
          if (execute && execute.element) {
            Object.assign(element, execute.element, columnsHint[item[key]].element || {});
          }
          Object.assign(columnsHint[item[key]], execute);
          columnsHint[item[key]].element = element;
        });
      } else if (hint.field === '$$all') {
        Object.keys(columnsHint).forEach((field) => {
          const element = {};
          if (execute && execute.element) {
            Object.assign(element, execute.element, columnsHint[field].element || {});
          }
          Object.assign(columnsHint[field], execute);
          columnsHint[field].element = element;
        });
        columnsHint.$$all = Object.assign(columnsHint.$$all || {}, execute);
      } else if (columnsHint[hint.field]) {
        const element = {};
        if (execute && execute.element) {
          Object.assign(element, execute.element, columnsHint[hint.field].element || {});
        }
        Object.assign(columnsHint[hint.field], execute);
        columnsHint[hint.field].element = element;
      }
    });
    return columnsHint;
  }

  setTemplateAdapter(adapter) {
    this.templateAdapter = adapter;
  }

  static tplAdapter(data, typeMap) {
    const columns = [{
      title: '#',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
      className: 'detail-table-index',
      static: true,
    }];

    data.meta.elements.forEach((column) => {
      if (column.elementUIHint.visible) {
        const col = {};
        col.title = column.name;
        col.dataIndex = column.code;
        // console.log(column.name, column.elementUIHint.editStyle);
        col.type = typeMap[column.elementUIHint.editStyle.toLowerCase()];
        // console.log(column.name, col.type);
        if (col.type === 'select' || col.type === 'multiselect') {
          col.codeDict = data.dict[column.code] || [];
          // console.log(col.type, col.codeDict);
        }
        col.className = 'detail-table-header-cell';
        columns.push(col);
      }
    });
    // console.warn(JSON.stringify(DataListObject.mockListData(data)));
    return columns;
  }

  static mockListData(tplData, count = 15) {
    const data = [];
    for (let i = 0; i < count; i += 1) {
      const row = {};
      tplData.meta.elements.forEach((e) => {
        switch (e.dataType) {
          case 'String': {
            row[e.code] = `测试${e.name}`;
            break;
          }

          case 'Double': {
            row[e.code] = Number(parseFloat(Math.random() * 10000, 10).toFixed(2));
            break;
          }

          case 'Date': {
            row[e.code] = new Date(`
              ${parseInt(Math.random() * 50 + 1950, 10)}-${parseInt(Math.random() * 12 + 1, 10)}-${parseInt(Math.random() * 27 + 1, 10)}
              `).getTime();
            break;
          }

          default: {
            break;
          }
        }
      });
      data.push(row);
    }
    return data;
  }

  renderUI(data) {
    const tplData = data || this.state.columns;
    if (!this.editMode) {
      if (!this.rendered) {
        this.rendered = true;
        const columns = tplData.map((column) => {
          const columnCopy = { ...column };
          columnCopy.readonly = true;
          function render(text, row, index) {
            return this.getTemplate(columnCopy, row, index, text, {});
          }
          if (!columnCopy.static) {
            columnCopy.render = null;
          }
          columnCopy.render = columnCopy.render || render.bind(this);
          return columnCopy;
        });
        this.setState({ columns });
      }
    } else {
      const columnsHint = DataListObject.parseHint(this.columnsHint, tplData, 'dataIndex');
      let rowsHint = null;
      const columns = tplData.map((column) => {
        const columnCopy = Object.assign({ ...column }, columnsHint[column.dataIndex]);
        function render(text, row, index) {
          if (!rowsHint) {
            rowsHint = DataListObject.parseHint(this.rowsHint, this.state.rows, '$$key');
          }
          const rowHint = Object.assign({}, rowsHint.$$all || {}, rowsHint[row.$$key]);
          return this.getTemplate(columnCopy, row, index, text, rowHint);
        }
        columnCopy.render = columnCopy.render ? columnCopy.render.bind(this) : render.bind(this);
        return columnCopy;
      });
      this.setState({ columns });
    }
  }

  static getKey() {
    return parseInt(Math.random() * new Date().getTime(), 10).toString();
  }

  indexingRow(row) {
    const rowCopy = { ...row };
    rowCopy[this.state.key] = DataListObject.getKey();
    return rowCopy;
  }

  fillData(listData) {
    const listDataCopy = listData.map((row) => {
      return this.indexingRow(row);
    });

    this.setState({ rows: listDataCopy });
  }

  run(dono, params) {
    this.$set('gridOptions.requireType', 'remote');
    // const tplPromise = this.queryData('default').then((res) => {
    //   this.fillData(res);
    //   this.$set('gridOptions.dataLoading', false);
    // });
    //
    // const DataPromise = this.queryTplData().then((res) => {
    //   this.renderUI(res);
    //   this.$set('gridOptions.tplLoading', false);
    // });
    //
    // return Promise.all([tplPromise, DataPromise]).then(() => {
    //   // this.$set('gridOptions.loading', false);
    // });

    const promise = this.queryTplAndData(dono, params).then((res) => {
      console.warn(res);
      this.$set('paginationConf.total', res.body.totalRowCount);
      this.fillData(res.body.dataList);
      this.$set('gridOptions.dataLoading', false);
      this.$set('gridOptions.tplLoading', false);
      const adapter = this.templateAdapter
      && this.templateAdapter instanceof Function
        ? this.templateAdapter : DataListObject.tplAdapter;
      this.renderUI(adapter(res, this.tplTypeMap));
    });
    return promise.then(() => {

    });
  }

  $get(attrChainStr) {
    let ret = null;
    if (attrChainStr) {
      const attrChain = attrChainStr.trim().split('.');
      let target = this.state;
      while (attrChain.length) {
        try {
          const attr = attrChain.shift();
          if (!attrChain.length) {
            ret = target[attr];
            break;
          }
          if (target[attr]) {
            target = target[attr];
          } else {
            console.error(`cannot find attr 【 ${attr} 】 in  【 ${attrChain.slice(0, attrChain.indexOf(attr) + 1).join('.')} 】`);
            ret = null;
            break;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return ret;
  }

  $set(attrChainStr, value) {
    if (!attrChainStr || value === undefined) return;
    const attrChain = attrChainStr.trim().split('.');
    const base = Object.assign({}, this.state);
    let target = base;

    while (attrChain.length) {
      try {
        const attr = attrChain.shift();
        if (!attrChain.length) {
          target[attr] = value;
          break;
        }
        if (target[attr]) {
          target = target[attr];
        } else {
          console.error(`cannot find attr [ ${attr} ] in  [ ${attrChain.slice(0, attrChain.indexOf(attr) + 1).join('.')} ]`);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    this.setState(base);
  }

  getData() {
    return this.state.rows;
  }

  enableSearchOnly(bool) {
    this.$set('gridOptions.searchRenderOnly', bool !== false);
  }

  setSelectionMode(mode) {
    switch (mode) {
      case 'single': {
        this.$set('rowSelection.type', 'radio');
        break;
      }
      case 'multiple': {
        this.$set('rowSelection.type', 'checkbox');
        break;
      }
      case 'none': {
        this.$set('rowSelection', null);
        break;
      }
      default: {
        break;
      }
    }
  }
  getSelectionMode() {
    const { type } = this.state.rowSelection;
    let ret = '';
    switch (type) {
      case 'radio': {
        ret = 'single';
        break;
      }
      case 'checkbox': {
        ret = 'multiple';
        break;
      }
      default: {
        ret = 'none';
        break;
      }
    }
    return ret;
  }

  setSelectionFixed(bool) {
    if (this.state.rowSelection) {
      this.$set('rowSelection.fixed', bool !== false);
    }
  }

  setDisabledRows(rowsEntry) {
    if (rowsEntry
      && rowsEntry instanceof Function
      && this.state.rowSelection
      && this.state.rowSelection.type !== 'none') {
      const keys = this.state.rows.filter(rowsEntry).map((row) => {
        return row[this.state.key];
      });
      this.disabledKeys = keys;
      this.$set('rowSelection.getCheckboxProps', (record) => {
        return {
          disabled: keys.indexOf(record[this.state.key]) !== -1,
        };
      });
    }
  }

  setSelectedRows(rowsEntry) {
    if (rowsEntry
      && rowsEntry instanceof Function
      && this.state.rowSelection
      && this.state.rowSelection.type) {
      // 过滤掉禁用状态下且未选中的行，并将选中行按照key的字典序排序
      let keys = this.state.rowSelection.selectedRowKeys ?
        this.state.rowSelection.selectedRowKeys.slice(0) : [];
      keys = this.disabledKeys.filter((key) => {
        return keys.indexOf(key) !== -1;
      });

      keys = keys.concat(this.state.rows
        .filter(rowsEntry)
        .filter((row) => {
          return this.disabledKeys.indexOf(row[this.state.key]) === -1;
        }).map((row) => { return row[this.state.key]; })).sort();

      // 单选状态下选中传入keys的最后一个
      if (this.state.rowSelection.type === 'radio') {
        keys = [keys.pop()];
      }

      const selectedRows = this.state.rows.filter((row) => {
        return keys.indexOf(row[this.state.key]) !== -1;
      });
      this.$set('rowSelection.selectedRowKeys', keys);
      this.state.rowSelection.onChange(keys, selectedRows.slice(0));
    }
  }

  getSelectedRows() {
    this.selectedRows = this.selectedRows || [];
    return this.selectedRows;
  }

  getSelectedRow() {
    const selectedRows = this.getSelectedRows();
    return selectedRows.length ? selectedRows[selectedRows.length - 1] : null;
  }

  // 传入一行或多行
  removeRows(rowsEntry) {
    let ret = null;
    let rer = rowsEntry;
    if (rowsEntry && (rowsEntry instanceof Object)) {
      if (!(rowsEntry instanceof Array)) {
        rer = [rer];
      }
      // 以key的形式转换待删除行数组
      let keys = null;
      keys = rer.map((row) => {
        return row[this.state.key];
      });

      // 设置禁用行
      this.disabledKeys = this.disabledKeys.filter((key) => {
        return keys.indexOf(key) === -1;
      });
      this.$set('rowSelection.getCheckboxProps', (record) => {
        return {
          disabled: this.disabledKeys.indexOf(record[this.state.key]) !== -1,
        };
      });

      // 更新所有行
      const removeRows = [];
      const rows = this.state.rows.filter((row) => {
        const idx = keys.indexOf(row[this.state.key]);
        if (idx !== -1) {
          removeRows.push(row);
        }
        return idx === -1;
      });

      // 重新设置已选中行，如果选中行条数目发生变化，则更新
      const selectedKeys = this.state.rowSelection.selectedRowKeys.filter((key) => {
        return keys.indexOf(key) === -1;
      });

      if (selectedKeys.length !== this.state.rowSelection.selectedRowKeys.length) {
        this.$set('rowSelection.selectedRowKeys', selectedKeys);

        const selectedRows = rows.filter((row) => {
          return selectedKeys.indexOf(row[this.state.key]) !== -1;
        });

        // 触发行选中监听
        this.state.rowSelection.onChange(selectedKeys, selectedRows);
      }
      this.state.paginationConf.onSizeChange(rows.length);

      this.setState({ rows });

      // 对返回的选中行进行排序
      ret = removeRows.sort((a, b) => {
        return a >= b;
      });
    }
    return ret;
  }

  appendRow(row) {
    if (!(row && row instanceof Object)) return;
    const rows = this.state.rows.slice(0);
    rows.push(this.indexingRow(row));
    this.state.paginationConf.onSizeChange(rows.length);
    this.setState({ rows });
  }

  prependRow(row) {
    if (!(row && row instanceof Object)) return;
    const rows = this.state.rows.slice(0);
    rows.unshift(this.indexingRow(row));
    this.state.paginationConf.onSizeChange(rows.length);
    this.setState({ rows });
  }


  insertBefore(currRow, newRow) {
    if (!(currRow && currRow instanceof Object) || !(newRow && newRow instanceof Object)) return;
    const rows = this.state.rows.slice(0);
    const idx = rows.indexOf(currRow);
    if (idx !== -1) {
      rows.splice(idx, 0, this.indexingRow(newRow));
    }
    this.state.paginationConf.onSizeChange(rows.length);
    this.setState({ rows });
  }

  insertAfter(currRow, newRow) {
    if (!(currRow && currRow instanceof Object) || !(newRow && newRow instanceof Object)) return;
    const rows = this.state.rows;
    const idx = rows.indexOf(currRow);
    if (idx !== -1) {
      rows.splice(idx + 1, 0, this.indexingRow(newRow));
    }
    this.state.paginationConf.onSizeChange(rows.length);
    this.setState({ rows });
  }

  setSize(size) {
    const s = size === 'small' ? 'small' : 'default';
    this.$set('gridOptions.size', s);
  }

  setBorder(bool) {
    this.$set('gridOptions.bordered', bool !== false);
  }

  static debounce(action, idle, ...args) {
    let last;
    return () => {
      const ctx = this;
      clearTimeout(last);
      last = setTimeout(() => {
        action.apply(ctx, args);
      }, idle);
    };
  }

  getTemplate(column, row, index, text, rowHint) {
    let tpl = null;
    const target = this;
    function changed(entry) {
      let val = entry;
      if (entry instanceof Object && entry.target) {
        const { value } = entry.target;
        val = value;
      }
      target.state.rows.map((r, i) => {
        const rc = r;
        if (index === i) {
          const oldVal = rc[column.dataIndex];
          rc[column.dataIndex] = val;
          if (target.on.valueChanged && val !== oldVal) {
            target.on.valueChanged(i, column.dataIndex, val, oldVal);
          }
        }
        return rc;
      });

      // target.setState({ rows });
    }

    function onChange(entry) {
      changed(entry, 'change');
    }

    function onBlur(entry) {
      return entry;
      // changed(entry, 'blur');
    }
    if (rowHint && rowHint.element &&
      rowHint.element[column.dataIndex] &&
      rowHint.element[column.dataIndex] instanceof Function) {
      tpl = rowHint.element[column.dataIndex](row, column, index, text);
    } else {
      switch (column.type) {
        case 'input': {
          tpl = (
            <Text
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'textarea': {
          tpl = (
            <TextArea
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'select': {
          tpl = (
            <Select
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              options={column.codeDict}
              optionName="name"
              optionField="code"
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'multiselect': {
          tpl = (
            <MultiSelect
              value={row[column.dataIndex] || '01'}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              options={column.codeDict}
              optionName="name"
              optionField="code"
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'number': {
          tpl = (
            <NumberInput
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'currency': {
          tpl = (
            <Currency
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'datepicker': {
          tpl = (
            <DatePicker
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'yearmonthpicker': {
          tpl = (
            <YearMonthPicker
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'yearpicker': {
          tpl = (
            <YearPicker
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'datetimepicker': {
          tpl = (
            <DateTimePicker
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        case 'timepicker': {
          tpl = (
            <TimePicker
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
        default: {
          tpl = (
            <Text
              value={row[column.dataIndex]}
              reading={rowHint.readonly || column.readonly || undefined}
              onChange={onChange}
              onBlur={onBlur}
              size={this.state.gridOptions.size}
            />
          );
          break;
        }
      }
    }
    return tpl;
  }

  setValue(rowEntry, field, value) {
    const rows = this.rowEntryUtil(rowEntry, field, (_row, index) => {
      const row = _row;
      const oldVal = row[field];
      row[field] = value;
      if (this.on.valueChanged) {
        this.on.valueChanged(index, field, value, oldVal);
      }
    });
    this.setState({ rows });
  }

  rowEntryUtil(rowEntry, field, callback) {
    let rows = this.state.rows.slice(0);
    if (rowEntry !== undefined && field && callback !== undefined) {
      if (rowEntry === '$$all') {
        rows = rows.map((row, index) => {
          const _row = row;
          callback(_row, index);
          return _row;
        });
      } else if (typeof rowEntry === 'number') {
        callback(rows[rowEntry], rowEntry);
      } else if (rowEntry instanceof Function) {
        rows = rows.map((row, index) => {
          const _row = row;
          if (rowEntry(row, index)) {
            callback(_row, index);
          }
          return _row;
        });
      }
    }
    return rows;
  }

  // 提高setValue执行效率，先将setValue的值全部缓存下来，待下一次更新界面时全部更新，避免一直更新值刷新一次页面
  valueExecute() {
    const { rows } = this.state.rows.slice(0);
    if (this.changeValueCollection.length) {
      this.changeValueCollection.forEach((item) => {
        rows[item.index][item.field] = item.value;
      });
      this.changeValueCollection.length = 0;
    }
    this.setState({ rows });
  }


  flatToTree() {
    const linkagesExtend = {};
    const collection = [];
    function buildTree(entry) {
      if (entry) {
        const node = entry;
        if (node.handler) {
          const excution = node.handler({});
          if (excution) {
            const next = Object.keys(excution).map((key) => {
              const item = {};
              item.field = key;
              // item.prev = node;
              if (linkagesExtend[key]) {
                item.handler = linkagesExtend[key].handler;
              }
              collection.push(item);
              return item;
            });
            node.next = next;
          }
        }
        if (linkagesExtend[node.field]) {
          linkagesExtend[node.field].visited = true;
        }

        // 使用JSON序列化方法进行环检查
        try {
          JSON.stringify(node);
        } catch (e) {
          const error = {
            title: 'circular structure is not allowed',
            message: `Converting circular structure to linkages, maybe attribute (${node.field}) is repeated, please check your code`,
            e,
          };
          throw error;
        }
        buildTree(collection[collection.indexOf(node) + 1]);
      }
    }
    if (this.linkages.length) {
      this.linkages.forEach((linkage) => {
        linkagesExtend[linkage.field] = { handler: linkage.handler };
      });

      this.linkageTrees = [];

      this.linkages.forEach((linkage) => {
        if (!linkagesExtend[linkage.field].visited) {
          const linkageTree = { field: linkage.field,
            handler: linkagesExtend[linkage.field].handler };
          collection.push(linkageTree);
          buildTree(linkageTree, 0);
          this.linkageTrees.push(linkageTree);
        }
      });
    }
  }

  setLinkage(field, handler) {
    // 去重操作，如有重复，将前面已重复的移除，保留最新的
    for (let i = 0; i < this.linkages.length; i += 1) {
      if (this.linkages[i].field === field) {
        this.linkages.splice(i, 1);
        break;
      }
    }
    this.linkages.push({ field, handler });
    this.flatToTree(this.linkages);
  }

  executeLinkages(rowIndex, field, value, oldValue) {
    const target = this;
    const val = value;
    const oldVal = oldValue;
    function excute(tree) {
      if (field === tree.field) {
        const rows = target.state.rows.slice(0);
        let row = rows[rowIndex];
        // 仍然使用树的广度遍历方法
        DataListObject.breadthFirstSearch(tree, (item) => {
          if (item.handler) {
            // 对row进行管道操作，返回最终的row
            const rowBubble = item.handler(row, val, oldVal);
            // 检查是否有值变化，若有变化，则触发valueChanged监听事件
            Object.keys(rowBubble).forEach((key) => {
              if (rowBubble[key] !== row[key]) {
                target.on.valueChanged(rowIndex, key, rowBubble[key], row[key]);
              }
            });
            row = Object.assign(row, rowBubble);
          }
        });
        target.setState({ rows });
      }
    }

    if (this.linkageTrees && this.linkageTrees.length) {
      this.linkageTrees.forEach((tree) => {
        // 查找到树的当前field节点后执行联动操作
        DataListObject.breadthFirstSearch(tree, excute);
      });
    }
  }

  static breadthFirstSearch(treeData, callback, childMapping = 'next') {
    let cache = [treeData];
    for (let i = 0; i < cache.length; i += 1) {
      const item = cache[i];
      callback(item);
      if (item[childMapping]) {
        cache = cache.concat(item[childMapping]);
      }
    }
  }

  setElement(rowEntry, field, elEntry) {
    const entry = {};
    entry[field] = elEntry;
    this.setAttr('row', rowEntry, 'element', entry);
  }

  closePagination() {
    this.$set('paginationConf', false);
  }

  setPageSize(size) {
    if (size && Number(size) && this.state.paginationConf) {
      const sz = parseInt(Number(size), 10);
      if (sz > 0) {
        this.$set('paginationConf.defaultPageSize', sz);
        this.$set('paginationConf.pageSize', sz);
        if (this.state.paginationConf.onShowSizeChange) {
          this.state.paginationConf.onShowSizeChange(this.state.paginationConf.current, sz);
        }
      }
    }
  }

  columnEntryUtil(columnEntry, field, callback) {
    let columns = this.state.columns.slice(0);
    if (columnEntry !== undefined && field && callback !== undefined) {
      if (typeof columnEntry === 'string') {
        if (callback) {
          callback(columns[columnEntry], columnEntry);
        }
      } else if (columnEntry instanceof Function) {
        columns = columns.map((column, index) => {
          const _column = column;
          if (columnEntry(_column)) {
            if (callback) {
              callback(_column, index);
            }
          }
          return _column;
        });
      }
    }
    return columns;
  }

  setAttr(target, entry, field, value) {
    const hint = {
      field: entry,
      execute: {},
    };

    hint.execute[field] = value;

    this[`${target}sHint`].push(hint);
    if (this.state.gridOptions.tplLoading === false &&
      this.state.gridOptions.dataLoading === false
    ) {
      this.renderUI();
    }
  }

  setCellReadonly(bool, isRow) {
    isRow ?
      this.setAttr('row', '$$all', 'readonly', bool !== false) :
      this.setAttr('column', '$$all', 'readonly', bool !== false);
  }

  setColumnReadonly(columnEntry, bool) {
    this.setAttr('column', columnEntry, 'readonly', bool !== false);
  }

  setRowReadonly(rowEntry, bool) {
    this.setAttr('row', rowEntry, 'readonly', bool !== false);
  }

  setColumnStyle(columnEntry, style) {
    this.setAttr('column', columnEntry, 'style', style);
  }

  setRowStyle(rowEntry, style) {
    this.setAttr('row', rowEntry, 'style', style);
  }

  setColumnVisible(columnEntry, bool) {
    this.setAttr('column', columnEntry, 'display', bool !== false);
  }

  setColumnTemplate(field, elEntry) {
    const entry = {};
    entry[field] = elEntry;
    this.setAttr('row', '$$all', 'element', entry);
  }

  replaceColumnValue(field, value) {
    const rows = this.rowEntryUtil('$$all', field, (_row, index) => {
      const row = _row;
      const oldVal = row[field];
      row[field] = value;
      if (this.on.valueChanged) {
        this.on.valueChanged(index, field, value, oldVal);
      }
    });
    this.setState({ rows });
  }

  // setSimpleMode(bool) {
  //   this.simpleMode = bool !== false;
  //   this.renderUI();
  // }

  getColumnDict(field) {
    let dict = null;
    if (this.state.columns && this.state.columns.length) {
      for (let i = 0; i < this.state.columns.length; i += 1) {
        if (this.state.columns[i].dataIndex === field) {
          dict = this.state.columns[i].codeDict;
          break;
        }
      }
    }
    return dict;
  }
  setColumnDict(field, codeDict) {
    this.setAttr('column', field, 'codeDict', codeDict);
  }

  setSelectionAll(bool) {
    this.setSelectedRows(bool !== false ? () => { return true; } : () => { return false; });
  }

  setEditable(bool) {
    this.editMode = bool !== false;
    this.renderUI();
  }

  setRemember(bool) {
    if (this.state.rowSelection.type !== 'checkbox') {
      console.warn('select data cross query is only valid of multi select mode, please check and retry');
    } else {
      this.remember = bool !== false;
      if (!this.remember) {
        this.rememberRows.length = 0;
      } else {
        const keys = this.rememberRows.map((row) => {
          return row.$$key;
        });

        this.selectedRows.forEach((row) => {
          if (keys.indexOf(row.$$key) === -1) {
            this.rememberRows.push(row);
          }
        });
      }
    }
  }

  toggleRememberedRows(record, selected) {
    if (!selected) {
      for (let i = 0; i < this.rememberRows.length; i += 1) {
        if (this.rememberRows[i].$$key === record.$$key) {
          this.rememberRows.splice(i, 1);
          break;
        }
      }
    } else {
      this.rememberRows.push(record);
    }
  }

  updateRemembered(selectedRows) {
    const oldSelectedRow = this.selectedRows.slice(0);
    const newSelectedEntrys = {};
    selectedRows.forEach((row) => {
      newSelectedEntrys[row.$$key] = row;
    });

    oldSelectedRow.forEach((row) => {
      if (!newSelectedEntrys[row.$$key]) {
        this.toggleRememberedRows(row, false);
      } else {
        delete newSelectedEntrys[row.$$key];
      }
    });

    Object.keys(newSelectedEntrys).forEach((key) => {
      this.toggleRememberedRows(newSelectedEntrys[key], true);
    });
  }

  setRememberedRows() {
    const keys = this.rememberRows.map((row) => {
      return row.$$key;
    });
    const selectedKeys = [];
    this.state.rows.forEach((row) => {
      if (keys.indexOf(row.$$key) !== -1) {
        selectedKeys.push(row.$$key);
      }
    });
    this.$set('rowSelection.selectedRowKeys', selectedKeys);
  }

  getRemembers() {
    let rows = null;
    if (this.state.rowSelection.type !== 'checkbox') {
      console.warn('select data cross query is only valid of multi select mode, please check and retry');
    } else {
      rows = this.rememberRows;
    }
    return rows;
  }

  setGrandTotal(field, reduceAction, callback) {
    let action = null;
    if (typeof reduceAction === 'string') {
      action = this.grandTotalLibrary[reduceAction].method;
    } else if (reduceAction instanceof Function) {
      action = reduceAction;
    }
    if (action) {
      this.grandTotal[field] = this.grandTotal[field] || {};
      this.grandTotal[field].action = action;
      this.grandTotal[field].callback = callback;
      if (!this.state.gridOptions.dataLoading &&
        !this.state.gridOptions.tplLoading
      ) {
        this.executeGrandTotal(field);
      }
    }
  }
  setGrandTotalVisible(bool) {
    this.grandTotalVisible = bool !== false;
    this.toggleGrandFooter();
  }

  getGrandTotalResult(field) {
    let result = null;
    if (this.grandTotal[field]) {
      result = this.grandTotal[field].result;
    }
    return result;
  }

  toggleGrandFooter() {
    let footer = this.grandTotalVisible === false ?
      undefined : this.renderGrandTotalFooter;

    this.setState({
      footer,
    });
  }

  executeGrandTotal(field, rowsData) {
    let rows = rowsData || this.state.rows;
    if (rows && rows.length) {
      rows = rows.slice(0);
      if (field && this.grandTotal[field] && this.grandTotal[field].action) {
        const result = rows.map((row) => {
          return row[field];
        }).reduce(this.grandTotal[field].action);
        this.grandTotal[field].result = result;
        this.toggleGrandFooter();
        if (this.grandTotal[field].callback) {
          this.grandTotal[field].callback(result);
        }
      }
    }
  }

  onQuickSearch(searchCondition) {
    console.log(searchCondition, this);
  }

  onSearcherToggle(searcherToggle) {
    this.setState({
      openSeniorSearch: searcherToggle,
    });
  }

}

