import React from 'react';

import { DetailInfo } from '../../../../src/components';

export default class ColumnTwo extends React.Component {
  _didMount = (info) => {
    info.setItemTemplate('chnName', <div>sdssss</div>);
  };
  render() {
    return (
      <DetailInfo dataFormId="demo-PersonInfo-data-ColumnTwo" didMount={this._didMount} />
    );
  }
}

