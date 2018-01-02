import React from 'react';

import { DetailInfo } from '../../../../src/components';


export default class ColumnFour extends React.Component {
  _didMount = (info) => {
    info.setItemTemplate('chnName', <div>sdssss</div>);
  };
  render() {
    return (
      <DetailInfo dataFormId="demo-PersonInfo-data-ColumnFour" didMount={this._didMount} />
    );
  }
}

