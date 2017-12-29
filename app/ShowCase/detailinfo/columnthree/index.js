import React from 'react';

import { DetailInfo } from '../../../../src/components';


export default class ColumnThree extends React.Component {
  _didMount = (info) => {
    info.setItemTemplate('chnName', <div>sdssss</div>);
  };
  render() {
    return (
      <DetailInfo dataFormId="demo-PersonInfo-data-ColumnThree" didMount={this._didMount} />
    );
  }
}

