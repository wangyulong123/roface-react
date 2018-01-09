import React from 'react';

import {DataTable, Button} from '../../../../src/components';

export default class WorkflowModelList extends React.Component {
    //dataTable(vm),meta,dom
    formReady = (dataTable,meta,dom) => {
        // console.log('form-ready:',dataTable,meta,dom);
    }
    dataReady = (dataTable,dataList) => {
        console.log('data-ready:',dataTable,dataList);
        const { flexTabs } = this.props;
        const { open } = flexTabs;
        function openWorkflowEditor(row){
            //var url = "http://127.0.0.1:8080/amix/diagram-viewer/index.html?modelId="+row.id;
            // var url = "http://127.0.0.1:8080/amix/diagram-viewer/index.html?processInstanceId="+row.procId+"&processDefinitionId="+row.procDefId;
            // window.open(url);

        open(`流程实例详情:${row.procName}`, `System/Workflow/WorkflowProcInstInfo/`, {
            processInstanceId: row.procId,
                // flag: row.flag || false,
            });
        }

        dataTable.setColumnTemplate('summary', (row, column, index, text) => {
            return (<a onClick={()=>openWorkflowEditor(row)}>{text}</a>);
        });
    }

    didMounted =(vm)=>{
        const openProcInstSchedule =(row) =>{
                var url = "http://127.0.0.1:8080/amix/diagram-viewer/index.html?processInstanceId="+row.procId+"&processDefinitionId="+row.procDefId;
                window.open(url);
        }

        vm.setColumnTemplate('button',(row) =>{
            return (<Button onClick={() =>openProcInstSchedule(row)}>查看流程进度</Button>)
        });
    }

    //   System/Workflow/WorkflowDesigner/WorkflowModelList


    render() {
        return (
            <DataTable dataFormId="workflow-ProcInstList"
                       dataReady={this.dataReady}
                       didMounted={this.didMounted}
                       formReady={this.formReady}/>
        );
    }
}