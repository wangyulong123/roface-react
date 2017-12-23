import React from 'react';

import { DetailInfo, Button, Modal } from '../../../../src/components';

export default class MainFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      info: null,
    };
  }
  _setValue = () => {
    const { info } = this.state;
    info.setValue('name', 'test');
  };
  _getData = () => {
    const { info } = this.state;
    Modal.info({
      title: '获取表单数据',
      content: (
        <div>
          {JSON.stringify(info.getData())}
        </div>
      )});
  };
  _setData = () => {
    const { info } = this.state;
    info.setData({name: 'test1'});
  };
  _setItemVisible = () => {
    const { info } = this.state;
    info.setItemVisible('name', false);
  };
  _setItemRequired = () => {
    const { info } = this.state;
    info.setItemRequired('name', true);
  };
  _setValueReadonly = () => {
    const { info } = this.state;
    info.setValueReadonly('name', true);
  };
  _setReadingMode = () => {
    const { info } = this.state;
    info.setReadingMode('name', true);
  };
  _setGroupVisible = () => {
    const { info } = this.state;
    info.setGroupVisible('10:基本信息', false);
  };
  _setGroupReadonly = () => {
    const { info } = this.state;
    info.setGroupReadonly('10:基本信息', true);
  };
  _setGroupReadingMode = () => {
    const { info } = this.state;
    info.setGroupReadingMode('10:基本信息', true);
  };
  _setItemTemplate = () => {
    const { info } = this.state;
    info.setItemTemplate('name', <div>sdssss</div>);
  };
  _setItemPrefix = () => {
    const { info } = this.state;
    info.setItemPrefix('name', 'Prefix');
  };
  _setItemSuffix = () => {
    const { info } = this.state;
    info.setItemPrefix('name', 'Suffix');
  };
  _setItemTips = () => {
    const { info } = this.state;
    info.setItemTips('name', 'test11');
  };
  _setItemNotes = () => {
    const { info } = this.state;
    info.setItemNotes('name', 'test11');
  };
  _validate = () => {
    const { info } = this.state;
    info.validate((err, value) => {
      if (err) {
        Modal.info({
          title: '校验表单数据',
          content: (
            <div>
              {JSON.stringify(err)}
            </div>
          )});
      } else {
        Modal.info({
          title: '校验表单数据',
          content: (
            <div>
              {JSON.stringify(value)}
            </div>
          )});
      }
    });
  };
  _validateItem = () => {
    const { info } = this.state;
    info.validateItem('name', (err, value) => {
      if (err) {
        Modal.info({
          title: '校验表单数据',
          content: (
            <div>
              {JSON.stringify(err)}
            </div>
          )});
      } else {
        Modal.info({
          title: '校验表单数据',
          content: (
            <div>
              {JSON.stringify(value)}
            </div>
          )});
      }
    });
  };
  _saveData = () => {
    console.log('save data');
  };
  _didMount = (info) => {
    this.setState({
      info,
      disabled: false,
    });
  };
  render() {
    return (
      <div>
        <div>
          <Button
            disabled={this.state.disabled}
            onClick={this._setValue}
          >
            setValue
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._getData}
          >
            getData
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setData}
          >
            setData
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemVisible}
          >
            setItemVisible
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemRequired}
          >
            setItemRequired
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setValueReadonly}
          >
            setValueReadonly
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setReadingMode}
          >
            setReadingMode
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setGroupVisible}
          >
            setGroupVisible
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setGroupReadonly}
          >
            setGroupReadonly
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setGroupReadingMode}
          >
            setGroupReadingMode
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemTemplate}
          >
            setItemTemplate
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemPrefix}
          >
            setItemPrefix
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemSuffix}
          >
            setItemSuffix
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemTips}
          >
            setItemTips
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemNotes}
          >setItemNotes
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._validate}
          >
            validate
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._validateItem}
          >
            validateItem
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._saveData}
          >saveData
          </Button>
        </div>
        <DetailInfo dataFormId="demo-PersonInfo-data" didMount={this._didMount} />
      </div>
    );
  }
}

