import React from "react";

import { DataTable } from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    formReady(dom){
        console.log('form-ready:',dom);
    };
    dataReady(data){
        console.log('data-ready:',data);
    };

    render() {
        return (
            <DataTable dataFormId="demo-MapPersonList" dataReady={this.dataReady} tableReady={this.formReady}/>
        );
    }
}