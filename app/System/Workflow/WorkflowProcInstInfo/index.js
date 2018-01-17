import React from 'react';

import {DetailInfo, Button} from '../../../../src/components';

export default class WorkflowModelList extends React.Component {
    //dataTable(vm),meta,dom
    formReady(dataTable,meta,dom){
        // console.log('form-ready:',dataTable,meta,dom);
    }
    //   System/Workflow/WorkflowDesigner/WorkflowModelList


    render() {
        const { param } = this.props;
        return (
            <DetailInfo dataFormId="workflow-ProcInstInfo"
                       params={{
                           processInstanceId: param.processInstanceId
                       }}
                       dataReady={this.dataReady}
                       formReady={this.formReady}/>
        );
    }
}