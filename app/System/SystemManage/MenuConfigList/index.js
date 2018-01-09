import React from "react";
import {DataTable, Message, Modal} from '../../../../src/components';

let vm = null;



export default class MenuConfigList extends React.Component {
  didMounted(_vm) {
    vm = _vm;
    function prependRow() {
      const time = new Date().getTime();
      vm.prependRow({
        enable: "Y",
        createdTime: time,
        updatedTime: time
      });
      vm.setRowReadonly((row, index) => {return !index; }, false);
    }

    vm.setSelectedRows((row, index) => {
      return index === 0;
    });

    function editRow() {
      const rowKeys = vm.getSelectedRows().map((row) => {return row.$$key;});
      if (rowKeys && rowKeys.length) {
        vm.setRowReadonly((row) => {return rowKeys.indexOf(row.$$key) !== -1;}, false);
      }
    }

    function deleteRow() {
      const rows = vm.getSelectedRows();
      if (rows && rows.length) {
        Modal.confirm({
          title: '删除确认',
          content: '数据删除后将不可撤销，确认删除吗？',
          okText: '删除',
          cancelText: '取消',
          onOk() {
            vm.deleteData(rows).then(()=>{
              Message.success('数据删除成功');
            });
          }
        });
      }
    }

    function saveData() {
      vm.saveData().then(() => {
        Message.success('保存成功');
      });
    }

    // 打开列表编辑模式
    vm.setEditable(true);
    // 按行设置列表全部只读
    vm.setCellReadonly(true, true);
    vm.setSelectionMode('multiple');
    vm.addBtn({
      type: 'primary',
      onclick: prependRow,
      name: '新增',
    });
    vm.addBtn({
      type: 'primary',
      onclick: editRow,
      name: '编辑',
    });
    vm.addBtn({
      type: 'danger',
      onclick: deleteRow,
      name: '删除',
      icon: 'delete'
    });
    vm.addBtn({
      type: 'primary',
      onclick: saveData,
      name: '保存',
      icon: ''
    });

  }

  render() {
    return (
      <div>
        <DataTable
          dataFormId="system-MenuList"
          didMounted={this.didMounted}
          dataReady={this.dataReady}
          formReady={this.formReady}/>
      </div>
    );
  }
}