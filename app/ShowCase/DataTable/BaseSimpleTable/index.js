import React from "react";

import { DataTable ,Button} from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    //dataTable(vm),meta,dom
    formReady(dom){
        console.log('form-ready:',dom);
    }
    //dataTable(vm),dataList(res.body)
    dataReady(data){
        console.log('data-ready:',data);
    }

    didMounted(dataTable){
        function clickName(row){
            console.log(row);
        }

        dataTable.setColumnTemplate('name', (row, column, index, text) => {
            return (<a onClick={()=>clickName(row)}>{text}</a>);
        });

    }


    render() {
        return (
            <DataTable dataFormId="demo-MapPersonList" dataReady={this.dataReady} formReady={this.formReady} didMounted={this.didMounted}/>
        );
    }
}