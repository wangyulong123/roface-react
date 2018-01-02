import React from 'react';

import { DetailInfo, Button } from '../../../../src/components';

export default class MetaSeparateData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      disabled: true,
    };
  }
  _didMount = (info) => {
    this.setState({
      info,
      disabled: false,
    });
  };
  _getData = () => {
    const { info } = this.state;
    info.setData({
      birth: '1990-02-02 00:00:00.000',
      chnName: 'Alan',
      code: 'P1001',
      gender: 'M',
      name: '艾伦',
    });
  };
  render() {
    return (
      <div>
        <Button disabled={this.state.disabled} onClick={this._getData}>获取数据</Button>
        <DetailInfo dataFormId="demo-PersonInfo-data-MetaSeparateData" didMount={this._didMount} />
      </div>
    );
  }
}

