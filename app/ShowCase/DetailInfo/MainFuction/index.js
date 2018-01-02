import React from 'react';

import {DetailInfo, Button, Affix, Dropdown, Menu, Icon, Notify} from '../../../../src/components';

export default class MainFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      info: null,
    };
  }

  // Api接口展示
  _setValue = () => {
    const { info } = this.state;
    info.setValue('name', 'test' + parseInt(Math.random() * 100)); // eslint-disable-line
  };
  _getValue = () => {
    const {info} = this.state;
    Notify.success({
      message: '获取姓名',
      description: info.getValue('name'),
    });
  };
  _getData = () => {
    const { info } = this.state;
    Notify.success({
      message: '获取表单数据',
      description: JSON.stringify(info.getData()),
    });
  };
  _setData = () => {
    const { info } = this.state;
    info.setData({engName: 'test' + parseInt(Math.random() * 100)}); // eslint-disable-line
  };
  _setItemVisible = (bool) => {
    const { info } = this.state;
    info.setItemVisible('gender', bool);
  };
  _setItemRequired = (bool) => {
    const { info } = this.state;
    info.setItemRequired('birth', bool);
  };
  _setValueReadonly = (bool) => {
    const { info } = this.state;
    Notify.success({
      message: '选中操作',
      description: '尝试点击出生日期选择框',
      duration: 6,
    });
    info.setValueReadonly('birth', bool);
  };
  _setReadingMode = (bool) => {
    const { info } = this.state;
    info.setReadingMode('name', bool);
  };
  _setGroupVisible = (bool) => {
    const { info } = this.state;
    info.setGroupVisible('20:联系信息', bool);
  };
  _setGroupReadonly = (bool) => {
    const { info } = this.state;
    info.setGroupReadonly('40:经济状况', bool);
    Notify.success({
      message: '选中操作',
      description: '尝试点击经济状况组中输入框',
      duration: 6,
    });
  };
  _setGroupReadingMode = (bool) => {
    const { info } = this.state;
    info.setGroupReadingMode('30:职业信息', bool);
  };
  _setItemTemplate = () => {
    const { info } = this.state;
    info.setItemTemplate('name', <div>sdssss</div>);
  };
  _setItemPrefix = () => {
    const { info } = this.state;
    info.setItemPrefix('name', 'Prefix' + parseInt(Math.random() * 100)); // eslint-disable-line
  };
  _setItemSuffix = () => {
    const { info } = this.state;
    info.setItemSuffix('name', 'Suffix' + parseInt(Math.random() * 100)); // eslint-disable-line
  };
  _setItemTips = () => {
    const { info } = this.state;
    Notify.success({
      message: '鼠标操作',
      description: '将鼠标移动到姓名输入框中',
      duration: 6,
    });
    info.setItemTips('name', 'test' + parseInt(Math.random() * 100)); // eslint-disable-line
  };
  _setItemNotes = () => {
    const { info } = this.state;
    info.setItemNotes('name', 'test' + parseInt(Math.random() * 100)); // eslint-disable-line
  };
  _validate = () => {
    const { info } = this.state;
    info.validate((err, value) => {
      if (err) {
        Notify.success({
          message: '校验表单数据',
          description: JSON.stringify(err),
        });
      } else {
        Notify.success({
          message: '校验表单数据',
          description: JSON.stringify(value),
        });
      }
    });
  };
  _validateItem = () => {
    const { info } = this.state;
    info.validateItem('name', (err, value) => {
      if (err) {
        Notify.success({
          message: '校验表单数据(姓名)',
          description: JSON.stringify(err),
        });
      } else {
        Notify.success({
          message: '校验表单数据(姓名)',
          description: JSON.stringify(value),
        });
      }
    });
  };
  _saveData = () => {
    console.log('save data');
  };
  // 界面渲染
  _didMount = (info) => {
    this.setState({
      info,
      disabled: false,
    });
  };
  render() {
    const menuItem = (text, onChange) => <Menu.Item><a onClick={onChange}>{text}</a></Menu.Item>

    return (
      <div>
        <Affix offsetTop={0}>
          <Dropdown overlay={
            <Menu>
              {menuItem('setValue', () => this._setValue())}
              {menuItem('getValue', () => this._getValue())}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setValue和getValue(姓名)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('setData', () => this._setData())}
              {menuItem('getData', () => this._getData())}
              {menuItem('saveData', () =>this._saveData())}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setData和getData(英文名)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setItemVisible(true))}
              {menuItem('false', () => this._setItemVisible(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setVisible(性别)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setItemRequired(true))}
              {menuItem('false', () => this._setItemRequired(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setRequired(生日)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setValueReadonly(true))}
              {menuItem('false', () => this._setValueReadonly(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setReadOnly(生日)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setReadingMode(true))}
              {menuItem('false', () => this._setReadingMode(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setReadingMode(姓名)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setGroupVisible(true))}
              {menuItem('false', () => this._setGroupVisible(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setGroupVisible(联系信息组)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setGroupReadonly(true))}
              {menuItem('false', () => this._setGroupReadonly(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setGroupReadOnly(经济状况组)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('true', () => this._setGroupReadingMode(true))}
              {menuItem('false', () => this._setGroupReadingMode(false))}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setGroupReadingMode(职业信息组)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('tips', () => this._setItemTips())}
              {menuItem('notes', () => this._setItemNotes())}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setTips和setNotes(姓名)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('suffix', () => this._setItemSuffix())}
              {menuItem('prefix', () => this._setItemPrefix())}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'setSuffix和setPrefix(姓名)'} <Icon type="down" /> </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu>
              {menuItem('all', () => this._validate())}
              {menuItem('item(姓名)', () => this._validateItem())}
            </Menu>
          }>
            <Button disabled={this.state.disabled}> {'validate和validateItem'} <Icon type="down" /> </Button>
          </Dropdown>
        </Affix>
        <DetailInfo dataFormId="demo-PersonInfo-data" didMount={this._didMount} />
      </div>
    );
  }
}
