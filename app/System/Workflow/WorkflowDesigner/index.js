import React from 'react';

import { DataTable, Button, Modal, Dropdown,Menu } from '../../../../src/components';

import * as rest from '../../../../src/lib/rest';

export default class WorkflowModelList extends React.Component {
    //dataTable(vm),meta,dom
    formReady = (dataTable,meta,dom) => {
        // console.log('form-ready:',dataTable,meta,dom);
    }

    // console.log('data-ready:',dataTable,dataList);
    //     function openWorkflowEditor(row){
    //       var url = "http://127.0.0.1:8080/amix/modeler.html?modelId="+row.id;
    //       window.open(url);
    //     }
    //
    //     dataTable.setColumnTemplate('name', (row, column, index, text) => {
    //         return (<a onClick={()=>openWorkflowEditor(row)}>{text}</a>);
    //     });

    dataReady = (dataTable,dataList,vm) =>{
        const resultModal = Modal;
        const deploy = (row) => {
            rest.put("/workflow/model/"+row.id+"/deploy")
                .then((res) => {
                    resultModal.info({
                        title: '返回信息提示',
                        content: res.result
                    })
                });
        }


        const refresh = () => {
            const { refresh } = this.props;
            refresh && refresh();
        }

        const openWorkflowEditor = (row) => {
            // var url = "http://127.0.0.1:8080/amix/modeler.html?modelId="+row.id;
            var url = rest.getRequestURL(`/modeler.html?modelId=${row.id}`);
            window.open(url);
        }

        const addModel = () => {
            rest.put("/workflow/model/addModel").then(()=>{
                refresh()
            })
        }


        vm.setColumnTemplate('button', (row) => {
            return (<div><Button onClick={()=>openWorkflowEditor(row)}>流程设计</Button>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item onClick={()=>deploy(row)}>流程部署</Menu.Item>
                        <Menu.Item>流程导入</Menu.Item>
                    </Menu>
                }>
                    <Button>操作</Button>
                </Dropdown>
            </div>);
        });

        vm.addBtn({
            type: 'primary',
            onclick: addModel,
            name: '新建模型',
        });
    }

    didMounted = (vm) => {
        const resultModal = Modal;
        const deploy = (row) => {
            rest.put("/workflow/model/"+row.id+"/deploy")
                .then((res) => {
                    resultModal.info({
                        title: '返回信息提示',
                        content: res.result
                    })
                });
        }


        const refresh = () => {
            const { refresh } = this.props;
            refresh && refresh();
        }

        const openWorkflowEditor = (row) => {
            // var url = "http://127.0.0.1:8080/amix/modeler.html?modelId="+row.id;
            let url = rest.getRequestURL(`/modeler.html?modelId=${row.id}`);
            window.open(url);
        }

        const addModel = () => {
            rest.put("/workflow/model/addModel").then(()=>{
                refresh()
            })
        }


        vm.setColumnTemplate('button', (row) => {
            return (<div><Button onClick={()=>openWorkflowEditor(row)}>流程设计</Button>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item onClick={()=>deploy(row)}>流程部署</Menu.Item>
                        <Menu.Item>流程导入</Menu.Item>
                    </Menu>
                }>
                    <Button>操作</Button>
                </Dropdown>
                </div>);
        });

        vm.addBtn({
            type: 'primary',
            onclick: addModel,
            name: '新建模型',
        });
    }



    render() {
        return (
            <DataTable dataFormId="workflow-DesignerModelList"
                       // dataReady={this.dataReady}
                       formReady={this.formReady}
                       didMounted={this.didMounted}
            />
        );
    }
}
