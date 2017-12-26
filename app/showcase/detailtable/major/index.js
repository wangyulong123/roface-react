/**
 * Created by hjtu (hjtu@amarsoft.com) on 2017/12/18.
 */
import React from 'react';
import { notification, message, Button } from 'antd';
import { DetailTable } from '../../../../src/components';

let vm = null;

function setSize() {
  vm.setSize('small');
}

function setBorder() {
  vm.setBorder(false);
}

function toggleSelection() {
  // debugger;
  const a = vm.$get('rowSelection.type') === 'radio' ? 'multiple' : 'single';
  vm.setSelectionMode(a);
  // vm.setSelectionFixed(true);
}

function setDisabledRows() {
  const d = vm.getData();
  vm.setDisabledRows((row) => {
    return d.indexOf(row) <= 2; // Column configuration not to be checked
  });
}

function setSelectedRows() {
  vm.setSelectedRows((row) => {
    return row.key !== '2';
  });
}

function onSelectRow() {
  vm.onSelectRow((selectedKeys, selectedRows) => {
    const rows = vm.getData();
    const rowsIdx = selectedRows.map((row) => {
      return rows.indexOf(row);
    });
    notification.open({
      message: '已选中行',
      description: `已选中行号：${rowsIdx.join(',')} 已选中：${selectedKeys.join(',')}
      已选中行数据：${JSON.stringify(selectedRows)}`,
    });
    // console.log('onSelectRow', selectedKeys, selectedRows);
  });
  message.success('设置选中行监听成功！');
}

function onSelectionChange() {
  vm.onSelectionChange((record, selected, selectedRows) => {
    console.log(record);
    notification.open({
      message: '单行选中状态已变更',
      description: `行号：${vm.getData().indexOf(record)}
      行数据：${JSON.stringify(selectedRows)}
当前行已${selected ? '选中' : '取消'}`,
    });
    // console.log('onSelectionChange', record, selected, selectedRows);
  });
  message.success('设置单行选中状态监听成功！');
}

function getSelectedRows() {
  notification.open({
    message: '已选中行',
    description: JSON.stringify(vm.getSelectedRows()),
  });
  // console.log(vm.getSelectedRows(), vm.getSelectedRow());
}

function getRandomKey() {
  return parseInt(Math.random() * 10000 + 1, 10).toString();
}

function prependRow() {
  const row = {
    key: getRandomKey(),
    name: 'SomeoneHead',
    age: 27,
    address: 'Shanghai No. 1 People Square',
  };
  vm.prependRow(row);
}

function appendRow() {
  const row = {
    key: getRandomKey(),
    name: 'SomeoneRear',
    age: 17,
    address: 'Shanghai No. 11 People Square',
  };
  vm.appendRow(row);
}

function insertBefore() {
  const currRow = vm.getSelectedRow();
  if (!currRow) {
    message.warning('请选中一行数据！');
    return;
  }
  const row = {
    key: getRandomKey(),
    name: 'SomeoneBefore',
    age: 20,
    address: 'Shanghai No. 12 People Square',
  };
  vm.insertBefore(currRow, row);
}

function insertAfter() {
  const currRow = vm.getSelectedRow();
  if (!currRow) {
    message.warning('请选中一行数据！');
    return;
  }
  const row = {
    key: getRandomKey(),
    name: 'SomeoneAfter',
    age: 32,
    address: 'Shanghai No. 21 People Square',
  };
  vm.insertAfter(currRow, row);
}

function removeRows() {
  const rows = vm.getSelectedRows();
  if (!rows || !rows.length) {
    message.warning('请选择要删除的行数据');
    return;
  }
  // const row = vm.getData()[parseInt(Math.random() * vm.getData.length, 10)];
  console.log(vm.removeRows(rows));
}

function setValue() {
  // debugger;
  vm.setValue((row) => { return row.age < 13; }, 'age', 55);
}

function setLinkage() {
  vm.setLinkage('name', (row) => {
    // console.warn(row, val, oldVal);
    return {
      age: Number(row.age) + 1,
      address: '02',
    };
  });
  vm.setLinkage('age', (row) => {
    return {
      height: Number(row.age) + 5,
    };
  });

  vm.setLinkage('height', (row) => {
    return {
      weight: Number(row.age) + 4,
    };
  });
  // debugger;
  vm.setLinkage('address', (row) => {
    return {
      weight: Number(row.age) + 3,
    };
  });
  vm.setLinkage('sex', (row) => {
    return {
      name: `${row.name} 2`,
    };
  });
  message.success('联动设置成功！请随意改变值观察变化');
}

function closePagination() {
  vm.closePagination();
}

function setPageSize() {
  vm.setPageSize(2);
}

function setColumnReadonly() {
  vm.setColumnReadonly((column) => { return column.dataIndex.length <= 4; }, false);
}

function setRowReadonly() {
  vm.setRowReadonly((row) => { return row.weight < 50; }, true);
}

function setReadonlyByRow() {
  vm.setCellReadonly(true, true);
}

function setReadonlyByCol() {
  vm.setCellReadonly(true);
}

function setElement() {
  vm.setElement((row) => {
    return row.weight < 10;
  }, 'height', (row, column, index, value) => {
    return (
      <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>{value}</div>
    );
  });

  vm.setElement((row) => {
    return Number(row.address) > 1;
  }, 'name', (row, column, index, value) => {
    return (
      <div style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>{value}</div>
    );
  });
}

function setEditable(){
  vm.setEditable(true);
}

function getColumnDict() {
  const field = 'address';
  notification.open({
    message: `${field}字段码表`,
    description: JSON.stringify(vm.getColumnDict(field)),
  });
}

function setColumnDict() {
  const field = 'address';
  vm.setColumnDict(field, [{
    id: '00',
    label: '苏州',
  }, {
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
  }]);
  message.success(`设置${field}字段码表成功，请查看`);
}

function setColumnTemplate() {
  vm.setColumnTemplate('age', (row, column, index, text) => {
    return (<h2 style={{ backgroundColor: 'green' }}>{text}</h2>);
  });
  vm.setColumnTemplate('birth', (row, column, index, text) => {
    return (<h3 style={{ backgroundColor: 'red', color: 'white' }}>{text}</h3>);
  });
}

function replaceColumnValue() {
  vm.replaceColumnValue('birth', new Date('2000/01/01').getTime());
}

function setSelectionAll() {
  vm.setSelectionAll(true);
}

function getSelectionMode() {
  notification.open({
    message: '选中模式',
    description: `当前选中模式为：${vm.getSelectionMode()}`,
  });
}

function setRemember() {
  if (vm.getSelectionMode() !== 'multiple') {
    message.warning('非多选模式下不能设置跨查询选中，请设置为多选模式后重试');
  } else {
    vm.setRemember(true);
    message.success('设置跨查询选中数据成功，请查询数据后尝试');
  }
}

function getRemembers() {
  if (vm.getSelectionMode() !== 'multiple') {
    message.warning('非多选模式下不能设置跨查询选中，请设置为多选模式后重试');
  } else {
    notification.open({
      message: '跨查询选中的数据',
      description: JSON.stringify(vm.getRemembers()),
    });
  }
}

function onMounted(api) {
  vm = api;
  vm.setEditable(true);
  api.run().then(() => {
    // debugger;
    // console.log('hahah');
    // api.$set('gridOptions.loading', true);
  });
}
export default class DataListTest extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { dataSource: data };
  //   setInterval(() => {
  //     this.setState({
  //       dataSource: data.reverse(),
  //     });
  //   }, 1000);
  // }

  render() {
    return (
      <div>
        <div className="button-group">
          <Button type="primary" onClick={setSize}>设置表格尺寸</Button>
          <Button type="primary" onClick={setBorder}>设置表格边框</Button>
          <Button type="primary" onClick={toggleSelection}>切换选中状态</Button>
          <Button type="primary" onClick={setDisabledRows}>设置行禁止选中</Button>
          <Button type="primary" onClick={setSelectedRows}>设置默认选中行</Button>
          <Button type="primary" onClick={onSelectRow}>选中行监听</Button>
          <Button type="primary" onClick={onSelectionChange}>单行选中状态监听</Button>
          <Button type="primary" onClick={getSelectedRows}>获取选中行</Button>
          <Button type="primary" onClick={prependRow}>在表首新增一行</Button>
          <Button type="primary" onClick={appendRow}>在表尾新增一行</Button>
          <Button type="primary" onClick={insertBefore}>在当前行上方新增一行</Button>
          <Button type="primary" onClick={insertAfter}>在当前行下方新增一行</Button>
          <Button type="primary" onClick={removeRows}>移除行</Button>
          <Button type="primary" onClick={setValue}>设值</Button>
          <Button type="primary" onClick={setLinkage}>设置行联动</Button>
          <Button type="primary" onClick={closePagination}>关闭分页</Button>
          <Button type="primary" onClick={setPageSize}>设置每页显示条目数</Button>
          <Button type="primary" onClick={setColumnReadonly}>设置列只读</Button>
          <Button type="primary" onClick={setRowReadonly}>设置行只读</Button>
          <Button type="primary" onClick={setReadonlyByRow}>按行设置列表只读</Button>
          <Button type="primary" onClick={setReadonlyByCol}>按列设置列表只读</Button>
          <Button type="primary" onClick={setEditable}>打开列表编辑模式</Button>
          <Button type="primary" onClick={setElement}>重置单元格</Button>
          <Button type="primary" onClick={getColumnDict}>获取码表</Button>
          <Button type="primary" onClick={setColumnDict}>设置码表</Button>
          <Button type="primary" onClick={setColumnTemplate}>替换列模板</Button>
          <Button type="primary" onClick={replaceColumnValue}>统一替换列值</Button>
          <Button type="primary" onClick={setSelectionAll}>设置所有行选中</Button>
          <Button type="primary" onClick={setRemember}>设置跨查询选中数据</Button>
          <Button type="primary" onClick={getRemembers}>获取跨查询选中的数据</Button>
          <Button type="primary" onClick={getSelectionMode}>获取选中模式</Button>
        </div>
        <DetailTable onMounted={onMounted} />
      </div>
    );
  }
}