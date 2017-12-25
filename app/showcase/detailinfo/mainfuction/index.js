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
    info.setData({engName: 'test1'});
  };
  _setItemVisible = () => {
    const { info } = this.state;
    info.setItemVisible('gender', false);
  };
  _setItemRequired = () => {
    const { info } = this.state;
    info.setItemRequired('birth', true);
  };
  _setValueReadonly = () => {
    const { info } = this.state;
    info.setValueReadonly('birth', true);
  };
  _setReadingMode = () => {
    const { info } = this.state;
    info.setReadingMode('name', true);
  };
  _setGroupVisible = () => {
    const { info } = this.state;
    info.setGroupVisible('20:联系信息', false);
  };
  _setGroupReadonly = () => {
    const { info } = this.state;
    info.setGroupReadonly('40:经济状况', true);
  };
  _setGroupReadingMode = () => {
    const { info } = this.state;
    info.setGroupReadingMode('30:职业信息', true);
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
    info.setItemSuffix('name', 'Suffix');
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
            setValue(姓名)
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
            setData(英文名)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemVisible}
          >
            setItemVisible(性别)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemRequired}
          >
            setItemRequired(生日)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setValueReadonly}
          >
            setValueReadonly(生日)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setReadingMode}
          >
            setReadingMode(姓名)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setGroupVisible}
          >
            setGroupVisible(联系信息)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setGroupReadonly}
          >
            setGroupReadonly(经济状况)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setGroupReadingMode}
          >
            setGroupReadingMode(职业信息)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemTemplate}
          >
            setItemTemplate(姓名)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemPrefix}
          >
            setItemPrefix(姓名)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemSuffix}
          >
            setItemSuffix(姓名)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemTips}
          >
            setItemTips(姓名)
          </Button>
          <Button
            disabled={this.state.disabled}
            onClick={this._setItemNotes}
          >setItemNotes(姓名)
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
            validateItem(姓名)
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

