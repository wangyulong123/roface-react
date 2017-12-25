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
    notification.open({
      message: '单行选中状态已变更',
      description: `行号：${record.key}
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
  vm.setColumnReadonly();
}

function onMounted(api) {
  vm = api;
  // debugger;
  vm.setCellReadonly(true, true);

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

        </div>
        <DetailTable onMounted={onMounted} />
      </div>
    );
  }
}
