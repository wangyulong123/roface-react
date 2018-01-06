import React from 'react';
import { addOnResize } from '../../../../src/lib/listener';
import { DataTable ,Button} from '../../../../src/components';

export class WorkflowModelList extends React.Component {
    //dataTable(vm),meta,dom
    formReady(dataTable,meta,dom){
        // console.log('form-ready:',dataTable,meta,dom);
    }
    dataReady(dataTable,dataList){
        // console.log('data-ready:',dataTable,dataList);
        // function clickName(row){
        //     console.log(row);
        // }

        // dataTable.setColumnTemplate('name', (row, column, index, text) => {
        //     return (<a onClick={()=>clickName(row)}>{text}</a>);
        // });
    }


    render() {
        return (
            <DataTable dataFormId="workflow-DesignerModelList" dataReady={this.dataReady} formReady={this.formReady}/>
        );
    }
}

export default class WorkFlowDesigner extends React.Component {
  static WorkflowModelList = WorkflowModelList;

  constructor(){
    super();
    this.height = 150;
    this.state = {
      clientHeight: '100%'
    }
  }
  componentDidMount(){
    this._checkWidth();
    addOnResize(this._checkWidth);
  };
  _checkWidth = () => {
    this.setState({
      clientHeight: (document.documentElement.clientHeight - this.height) + 'px'
    });
  };
  render() {
    return <iframe
      width="100%"
      height={this.state.clientHeight}
      src="http://192.168.64.23:8080/workflow/modeler.html?modelId=252501"
    >{}</iframe>;
  }
}
