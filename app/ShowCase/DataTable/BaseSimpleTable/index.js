import React from "react";

import { DataTable ,Button} from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    static DetailInfo = DetailInfo;
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
        const {flexTabs} = this.prop;

        // flexTabs.createTab('ShowCase/DataTable/BaseSimpleTable/DetailInfo','');
        // flexTabs.createTab(<DetailInfo dataFormId="demo-MapPersonInfo" params={{id: row.id}}/>,'');
        // console.log(props);
    ;


    render() {
        return (
            <DataTable dataFormId="demo-MapPersonList" dataReady={this.dataReady} formReady={this.formReady}/>
        );
    }
}