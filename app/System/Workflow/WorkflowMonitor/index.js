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
            //var url = "http://127.0.0.1:8080/amix/diagram-viewer/index.html?modelId="+row.id;
            // var url = "http://127.0.0.1:8080/amix/diagram-viewer/index.html?processInstanceId="+row.procId+"&processDefinitionId="+row.procDefId;
            // window.open(url);

            if (this.flexTabs) {
                this.flexTabs.createTab({...row,
                    Com: this._renderComponent(history, row),
                });
            }
        }
        // _menuClick = (item, history) => {
        //     history.replace(`/${item.id}`);
        //     if (this.flexTabs) {
        //         this.flexTabs.createTab({...item,
        //             Com: this._renderComponent(history, item),
        //         });
        //     }
        // };

        dataTable.setColumnTemplate('summary', (row, column, index, text) => {
            return (<a onClick={()=>openWorkflowEditor(row)}>{text}</a>);
        });
    }

    //   System/Workflow/WorkflowDesigner/WorkflowModelList


    render() {
        return (
            <DataTable dataFormId="workflow-ProcInstList"
                       dataReady={this.dataReady}
                       formReady={this.formReady}/>
        );
    }
}