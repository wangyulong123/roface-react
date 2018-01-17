import React from "react";

import { DataTable1 ,Button} from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    // static DetailInfo = DetailInfo;
    //dataTable(vm),meta,dom
    formReady(dataTable){
        console.log('form-ready:',dataTable);
      dataTable.setColumnTemplate('name', (text, record, i) => {
        return <a>{text}</a>
      });
    }
  dataReady = (dataTable) => {
    this.setState({ dataTable });
    dataTable.setColumnTemplate('url', (text, record, i) => {
      return <a>{text}</a>
    });
  };

    clickName = (row) => {
        const {flexTabs} = this.prop;

        flexTabs.createTab('ShowCase/DataTable/BaseSimpleTable/DetailInfo', '');
        // flexTabs.createTab(<DetailInfo dataFormId="demo-MapPersonInfo" params={{id: row.id}}/>,'');
        // console.log(props);
    }

    render() {
        return <
          DataTable1
            dataFormId="demo-BeanPersonList"
            params={{ code: 'BeanPersonList' }}
            dataReady={this.dataReady}
            formReady={this.formReady}
        />
    }
}