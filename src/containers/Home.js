import React from 'react';

import { DetailInfo } from '../components';


export default class Home extends React.Component {
  componentDidMount() {
    console.log('===');
  }
  _didMount = (info) => {
    // console.log(info);
    // info.setData({ name: 'test11111' });
    info.setItemVisible('chnName', false);
  };
  render() {
    return (
      <DetailInfo dataFormId="demoPerson" didMount={this._didMount} />
    );
  }
}

