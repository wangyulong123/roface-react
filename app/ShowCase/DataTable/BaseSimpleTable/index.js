import React from "react";

import { DataTable ,Button} from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    //dataTable,meta,dom
    formReady(dom){
        console.log('form-ready:',dom);
    };
    //dataTable,dataList
    dataReady(data){
        console.log('data-ready:',data);
    };

    didMounted(vm){
        vm.setColumnTemplate('name', (row, column, index, text) => {
            return (<a onClick={()=>this.clickName(row)}>{text}</a>);
        });
    };

    clickName(row){
        console.log(row);
    };

    render() {
        return (
            <DataTable dataFormId="demo-MapPersonList" dataReady={this.dataReady} formReady={this.formReady} didMounted={this.didMounted}/>
        );
    }
}