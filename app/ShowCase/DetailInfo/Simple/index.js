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
        params={{id: 1}}
        dataFormId="demo-PersonSimpleInfo"
        formReady={this._formReady}
        dataReady={this._dataReady}/>
    );
  }
}

