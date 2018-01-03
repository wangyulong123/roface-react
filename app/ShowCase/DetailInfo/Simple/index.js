import React from 'react';

import { DetailInfo } from '../../../../src/components';

export default class Simple extends React.Component {
  _formReady = (dom) => {
    console.log(dom)
  };
  _dataReady = (info) => {
    info.setItemTemplate('chnName', <div>sdssss</div>);
  };
  render() {
    return (
      <DetailInfo
        dataFormId="demo-PersonInfo-data-Simple"
        formReady={this._formReady}
        dataReady={this._dataReady}/>
    );
  }
}

