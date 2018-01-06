import React from 'react';

import {DataTable, Button} from '../../../../src/components';

export default class WorkflowModelList extends React.Component {
    //dataTable(vm),meta,dom
    formReady(dataTable,meta,dom){
        // console.log('form-ready:',dataTable,meta,dom);
    }
    dataReady(dataTable,dataList){
        // console.log('data-ready:',dataTable,dataList);
        function openWorkflowEditor(row){
          var url = "http://127.0.0.1:8080/amix/modeler.html?modelId="+row.id;
          window.open(url);
        }

        dataTable.setColumnTemplate('name', (row, column, index, text) => {
            return (<a onClick={()=>openWorkflowEditor(row)}>{text}</a>);
        });
    }

    //   System/Workflow/WorkflowDesigner/WorkflowModelList


    render() {
        return (
            <DataTable dataFormId="workflow-DesignerModelList" dataReady={this.dataReady} formReady={this.formReady}/>
        );
    }
}
