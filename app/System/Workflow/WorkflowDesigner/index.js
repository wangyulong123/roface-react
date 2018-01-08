import React from 'react';

import {DataTable, Button} from '../../../../src/components';

import * as rest from '../../../../src/lib/rest';

export default class WorkflowModelList extends React.Component {
    //dataTable(vm),meta,dom
    formReady(dataTable,meta,dom){
        // console.log('form-ready:',dataTable,meta,dom);
    }
    // dataReady(dataTable,dataList){
    //     // console.log('data-ready:',dataTable,dataList);
    //     function openWorkflowEditor(row){
    //       var url = "http://127.0.0.1:8080/amix/modeler.html?modelId="+row.id;
    //       window.open(url);
    //     }
    //
    //     dataTable.setColumnTemplate('name', (row, column, index, text) => {
    //         return (<a onClick={()=>openWorkflowEditor(row)}>{text}</a>);
    //     });
    // }

    didMounted(vm) {

        function deploy(row) {
            rest.post("/model/"+row.id+"/deploy");
        }

        function openWorkflowEditor(row){
            var url = "http://127.0.0.1:8080/amix/modeler.html?modelId="+row.id;
            window.open(url);
        }


        vm.setColumnTemplate('button', (row) => {
            return (<div><Button onClick={()=>openWorkflowEditor(row)}>流程设计</Button>
                <Button onClick={()=>deploy(row)}>流程部署</Button></div>);
        });
    }


    render() {
        return (
            <DataTable dataFormId="workflow-DesignerModelList"
                       // dataReady={this.dataReady}
                       formReady={this.formReady}
                       didMounted={this.didMounted}/>
        );
    }
}
