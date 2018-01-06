import React from "react";

import { DataTable ,Button} from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    //dataTable(vm),meta,dom
    formReady(dataTable,meta,dom){
        console.log('form-ready:',dataTable,meta,dom);
    }
    dataReady(dataTable,dataList){
        console.log('data-ready:',dataTable,dataList);
        function clickName(row){
            console.log(row);
        }

        dataTable.setColumnTemplate('name', (row, column, index, text) => {
            return (<a onClick={()=>clickName(row)}>{text}</a>);
        });
    }

    clickName = (row) => {
        //<DetailInfo dataFormId="demo-MapPersonInfo" params={{id: row.id}}/>
    };


    render() {
        return (
            <DataTable dataFormId="demo-MapPersonList" dataReady={this.dataReady} formReady={this.formReady}/>
        );
    }
}