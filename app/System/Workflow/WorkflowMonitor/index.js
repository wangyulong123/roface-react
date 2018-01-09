import React from 'react';

import {DataTable, Button} from '../../../../src/components';
export default class WorkflowModelList extends React.Component {
    formReady = (dataTable,meta,dom) => {
        // console.log('form-ready:',dataTable,meta,dom);
    }
    dataReady = (dataTable,dataList) => {
        console.log('data-ready:',dataTable,dataList);
        const { flexTabs } = this.props;
        const { open } = flexTabs;
        function openWorkflowEditor(row){
        open(`流程实例详情:${row.procName}`, `System/Workflow/WorkflowProcInstInfo/`, {
            processInstanceId: row.procId,
            });
        }

        dataTable.setColumnTemplate('summary', (row, column, index, text) => {
            return (<a onClick={()=>openWorkflowEditor(row)}>{text}</a>);
        });
    }


    didMounted =(vm)=>{
        const { flexTabs } = this.props;
        const openProcInstSchedule =(row) => {

            var url = "http://127.0.0.1:8080/amix/diagram-viewer/index.html?processInstanceId=" + row.procId + "&processDefinitionId=" + row.procDefId;
            flexTabs.openIframe('查看流程进度图', url);
        }
        vm.setColumnTemplate('button',(row) =>{
            return (<Button onClick={() =>openProcInstSchedule(row)}>查看流程进度</Button>)
        });
    }

    render(){
        return (
            <DataTable dataFormId="workflow-ProcInstList"
                       dataReady={this.dataReady}
                       didMounted={this.didMounted}
                       formReady={this.formReady}/>
        );
    }
}