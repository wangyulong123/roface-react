/**
 * Created by hjtu (hjtu@amarsoft.com) on 2017/12/20.
 */

import React from 'react';
import { Input, InputNumber, Select, DatePicker, TimePicker } from 'antd';

const _columns = [{
  title: '姓名',
  dataIndex: 'name',
  type: 'input',
}, {
  title: '年龄',
  dataIndex: 'age',
  type: 'number',
}, {
  title: '身高',
  dataIndex: 'height',
  type: 'number',
}, {
  title: '体重',
  dataIndex: 'weight',
  type: 'number',
}, {
  title: '地址',
  dataIndex: 'address',
  type: 'select',
  codeDict: [{
    id: '01',
    label: '北京',
  }, {
    id: '02',
    label: '上海',
    disabled: true,
  }, {
    id: '03',
    label: '广州',
  }, {
    id: '04',
    label: '深圳',
  }],
}, {
  title: '性别',
  dataIndex: 'sex',
  type: 'select',
  codeDict: [{
    id: 'F',
    label: '女',
  }, {
    id: 'M',
    label: '男',
  }, {
    id: 'U',
    label: '未知',
  }],
}];

const _rows = [{
  name: '李雷',
  age: 13,
  address: '01',
}, {
  name: '韩梅梅',
  age: 12,
  address: '02',
}, {
  name: 'Polly',
  age: 1,
  address: '03',
}, {
  name: 'Miss Wang',
  age: 29,
  address: '04',
}];

export default class DataListObject {
  init() {
    this.state.gridOptions = {
      searchRenderOnly: false,
      loading: false,
      size: 'default',
      bordered: true,
      // rowSelection: {

      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
      // }),
      // },
    };

    this.state.rowSelection = {
      selectedRowKeys: [],
      hideDefaultSelections: true,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.$set('rowSelection.selectedRowKeys', selectedRowKeys);
        this.selectedRows = selectedRows;
        if (this.on.selectRow) {
          this.on.selectRow(selectedRowKeys, selectedRows);
        }
      },
      onSelect: (record, selected, selectedRows) => {
        if (this.on.selectionChange) {
          this.on.selectionChange(record, selected, selectedRows);
        }
      },
    };

    this.state.paginationConf = {
      pagination: true,
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 15,
      pagesLength: 10,
      noItemText: '',
      perPageOptions: [10, 20, 30, 40, 50, 150, 300],
      onChange(currentPage, itemsPerPage) {
        console.log(currentPage + itemsPerPage);
      },
    };

    this.state.rows = [];
    this.state.columns = [];
    this.state.key = '$$key';

    // 自定义表footer
    function setFooter(footerData) {
      console.log(footerData);
      return (<h1>111</h1>);
    }

    this.state.footer = setFooter.bind(this);

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
      this.executeLinkages(rowIndex, field, value, oldValue);
      // console.log(rowIndex, field, value, oldValue);
    }

    this.on.valueChanged = valueChanged.bind(this);
    this.lastQuery = {};

    console.log(this.lastQuery);
    this.disabledKeys = [];

    this.selectedRows = [];
    this.changeValueCollection = [];
    this.linkages = [];
    this.linkageTrees = [];
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
      setTimeout(() => {
        resolve(_rows);
        // this.rows = data;
      }, 1000);
    });

    return promise;
  }


  static queryTplData() {
    // listService.queryListTpl(
    // dono,
    // _hasCodeParam,
    // owArgs,
    // {url:vm.gridOptions.URLs.queryTemplate}
    // ).then((res) => {
    // })

    // 暂时用setTimeout替代从服务端请求数据
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(_columns);
        // this.columns = columns;
      }, 1000);
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
      // promise = this.queryDataByFilter(p);
    }

    if (promise && promise.then) {
      promise.then(() => {
        if (this.on.beforeRenderData) {
          this.on.beforeRenderData(this);
        }
      });
    }
    return promise;
  }

  rend() {
    this.renderUI();
    this.fillData();
  }

  renderUI(tplData) {
    const tplDataCopy = tplData.map((column) => {
      const columnCopy = { ...column };
      function render(text, row, index) {
        return this.getTemplate(columnCopy, row, index, text);
      }
      columnCopy.render = render.bind(this);
      return columnCopy;
    });
    this.setState({ columns: tplDataCopy });
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

  run() {
    const tplPromise = this.queryData('default').then((res) => {
      this.fillData(res);
    });

    const DataPromise = DataListObject.queryTplData().then((res) => {
      this.renderUI(res);
    });

    return Promise.all([tplPromise, DataPromise]).then(() => {
      this.setState({
        gridOptions: Object.assign(
          {},
          this.state.gridOptions,
          { loading: false },
        ),
      });
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

      const selectedRows = this.state.rows.map((row) => {
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
      const rowCopy = this.state.rows.filter((row) => {
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

        const selectedRows = rowCopy.filter((row) => {
          return selectedKeys.indexOf(row[this.state.key]) !== -1;
        });

        // 触发行选中监听
        this.state.rowSelection.onChange(selectedKeys, selectedRows);
      }

      this.setState({
        rows: rowCopy,
      });

      // 对返回的选中行进行排序
      ret = removeRows.sort((a, b) => {
        return a >= b;
      });
    }
    return ret;
  }

  appendRow(row) {
    if (!(row && row instanceof Object)) return;
    const rowsCopy = this.state.rows.slice(0);
    rowsCopy.push(this.indexingRow(row));
    this.setState({
      rows: rowsCopy,
    });
  }

  prependRow(row) {
    if (!(row && row instanceof Object)) return;
    const rowsCopy = this.state.rows.slice(0);
    rowsCopy.unshift(this.indexingRow(row));
    this.setState({
      rows: rowsCopy,
    });
  }


  insertBefore(currRow, newRow) {
    if (!(currRow && currRow instanceof Object) || !(newRow && newRow instanceof Object)) return;
    const rowsCopy = this.state.rows;
    const idx = rowsCopy.indexOf(currRow);
    if (idx !== -1) {
      rowsCopy.splice(idx, 0, this.indexingRow(newRow));
    }
    this.setState({
      rows: rowsCopy,
    });
  }

  insertAfter(currRow, newRow) {
    if (!(currRow && currRow instanceof Object) || !(newRow && newRow instanceof Object)) return;
    const rowsCopy = this.state.rows;
    const idx = rowsCopy.indexOf(currRow);
    if (idx !== -1) {
      rowsCopy.splice(idx + 1, 0, this.indexingRow(newRow));
    }
    this.setState({
      rows: rowsCopy,
    });
  }

  setSize(size) {
    const s = size === 'small' ? 'small' : 'default';
    this.$set('gridOptions.size', s);
  }

  setBorder(bool) {
    this.$set('gridOptions.bordered', bool === false);
  }

  getTemplate(column, row, index) {
    let tpl = null;
    const target = this;
    function changed(entry) {
      let val = entry;
      if (entry instanceof Object && entry.target) {
        const { value } = entry.target;
        val = value;
      }
      const rowsCopy = target.state.rows.map((r, i) => {
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
      target.setState({
        rows: rowsCopy,
      });
    }

    function onChange(entry) {
      changed(entry, 'change');
    }

    function onBlur(entry) {
      return entry;
      // changed(entry, 'blur');
    }

    switch (column.type) {
      case 'input': {
        tpl = (
          <Input value={row[column.dataIndex]} onChange={onChange} onBlur={onBlur} />
        );
        break;
      }
      case 'select': {
        tpl = (
          <Select value={row[column.dataIndex]} onChange={onChange} onBlur={onBlur}>
            <Select.Option value="">-- 请选择 --</Select.Option>
            {column.codeDict.map((cd) => {
              return (
                <Select.Option key={cd.id} value={cd.id} disabled={cd.disabled}>
                  {cd.label}
                </Select.Option>
              );
            })}
          </Select>
        );
        break;
      }
      case 'number': {
        tpl = (
          <InputNumber value={row[column.dataIndex]} onChange={onChange} onBlur={onBlur} />
        );
        break;
      }
      case 'date': {
        tpl = (
          <DatePicker value={row[column.dataIndex]} onChange={onChange} onBlur={onBlur} />
        );
        break;
      }
      case 'time': {
        tpl = (
          <TimePicker value={row[column.dataIndex]} onChange={onChange} onBlur={onBlur} />
        );
        break;
      }
      default: {
        tpl = (
          <Input value={row[column.dataIndex]} onChange={onChange} onBlur={onBlur} />
        );
        break;
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
      if (typeof rowEntry === 'number') {
        callback(rows[rowEntry], rowEntry);
      } else if (rowEntry instanceof Function) {
        rows = rows.map((row, index) => {
          const _row = row;
          if (rowEntry(row)) {
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
        // console.log(node, collection.indexOf(node), collection[collection.indexOf(node) + 1]);
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
      // 未做环检查，有环时直接溢出，体验性不佳
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

  // setElement(rowEntry, field, elEntry) {
  //   const rows = this.rowEntryUtil(rowEntry, field, (_row, index) => {
  //
  //   });
  //   this.setState({ rows });
  // }
}

