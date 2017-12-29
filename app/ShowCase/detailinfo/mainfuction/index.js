import React from 'react';

import {DetailInfo, Button, Affix, Dropdown, Icon, notify} from '../../../../src/components';

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
    notify.success({
      message: '获取姓名',
      description: info.getValue('name'),
    });
  };
  _getData = () => {
    const { info } = this.state;
    notify.success({
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
    notify.success({
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
    notify.success({
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
    notify.success({
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
        notify.success({
          message: '校验表单数据',
          description: JSON.stringify(err),
        });
      } else {
        notify.success({
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
        notify.success({
          message: '校验表单数据(姓名)',
          description: JSON.stringify(err),
        });
      } else {
        notify.success({
          message: '校验表单数据(姓名)',
          description: JSON.stringify(value),
        });
      }
    });
  };
  _saveData = () => {
    console.log('save data');
  };
  // 调用Api
  _useValueSet = (e) => {
    if (e.key === 'setValue') this._setValue();
    else if (e.key === 'getValue') this._getValue();
  };
  _useDataSet = (e) => {
    if (e.key === 'setData') this._setData();
    else if (e.key === 'getData') this._getData();
    else if (e.key === 'saveData') this._saveData();
  };
  _useVisibleSet = (e) => {
    if (e.key === 'true') this._setItemVisible(true);
    else if (e.key === 'false') this._setItemVisible(false);
  };
  _useRequiredSet = (e) => {
    if (e.key === 'true') this._setItemRequired(true);
    else if (e.key === 'false') this._setItemRequired(false);
  };
  _useReadOnlySet = (e) => {
    if (e.key === 'true') this._setValueReadonly(true);
    else if (e.key === 'false') this._setValueReadonly(false);
  };
  _useReadingModeSet = (e) => {
    if (e.key === 'true') this._setReadingMode(true);
    else if (e.key === 'false') this._setReadingMode(false);
  };
  _useGroupVisibleSet = (e) => {
    if (e.key === 'true') this._setGroupVisible(true);
    else if (e.key === 'false') this._setGroupVisible(false);
  };
  _useGroupReadOnlySet = (e) => {
    if (e.key === 'true') this._setGroupReadonly(true);
    else if (e.key === 'false') this._setGroupReadonly(false);
  };
  _useGroupReadingModeSet = (e) => {
    if (e.key === 'true') this._setGroupReadingMode(true);
    else if (e.key === 'false') this._setGroupReadingMode(false);
  };
  _useTipsNotesSet = (e) => {
    if (e.key === 'tips') this._setItemTips();
    else if (e.key === 'notes') this._setItemNotes();
  };
  _useSuffixPrefixSet = (e) => {
    if (e.key === 'suffix') this._setItemSuffix();
    else if (e.key === 'prefix') this._setItemPrefix();
  };
  _useValidateSet = (e) => {
    if (e.key === 'all') this._validate(true);
    else if (e.key === 'item(姓名)') this._validateItem();
  };
  // 界面渲染
  _didMount = (info) => {
    this.setState({
      info,
      disabled: false,
    });
  };
  _renderMenuBtn = (content, disabled, onClick, options) => {
    return (
      <Dropdown options={options} onClick={onClick}>
        <Button disabled={disabled}>
          {content} <Icon type="down"/>
        </Button>
      </Dropdown>
    );
  };

  render() {
    return (
      <div>
        <Affix offsetTop={480}>
          {this._renderMenuBtn('setValue和getValue(姓名)', this.state.disabled,
            e => this._useValueSet(e), ['setValue', 'getValue'])}
          {this._renderMenuBtn('Data对象操作(英文名)', this.state.disabled,
            e => this._useDataSet(e), ['setData', 'getData', 'saveData'])}
          {this._renderMenuBtn('Visible设置(性别)', this.state.disabled,
            e => this._useVisibleSet(e), ['true', 'false'])}
          {this._renderMenuBtn('Required设置(生日)', this.state.disabled,
            e => this._useRequiredSet(e), ['true', 'false'])}
          {this._renderMenuBtn('ReadOnly设置(生日)', this.state.disabled,
            e => this._useReadOnlySet(e), ['true', 'false'])}
          {this._renderMenuBtn('ReadingMode设置(姓名)', this.state.disabled,
            e => this._useReadingModeSet(e), ['true', 'false'])}
          {this._renderMenuBtn('GroupVisible设置(联系信息组)', this.state.disabled,
            e => this._useGroupVisibleSet(e), ['true', 'false'])}
          {this._renderMenuBtn('GroupReadOnly设置(经济状况组)', this.state.disabled,
            e => this._useGroupReadOnlySet(e), ['true', 'false'])}
          {this._renderMenuBtn('GroupReadingMode设置(职业信息组)', this.state.disabled,
            e => this._useGroupReadingModeSet(e), ['true', 'false'])}
          {this._renderMenuBtn('tips、Notes设置(姓名)', this.state.disabled,
            e => this._useTipsNotesSet(e), ['tips', 'notes'])}
          {this._renderMenuBtn('前缀、后缀设置(姓名)', this.state.disabled,
            e => this._useSuffixPrefixSet(e), ['suffix', 'prefix'])}
          {this._renderMenuBtn('validate设置', this.state.disabled,
            e => this._useValidateSet(e), ['all', 'item(姓名)'])}
        </Affix>
        <DetailInfo dataFormId="demo-PersonInfo-data" didMount={this._didMount} />
      </div>
    );
  }
}
//
// <Button
//   disabled={this.state.disabled}
//   onClick={this._setValue}
// >
//   setValue(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._getData}
// >
// getData
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setData}
// >
// setData(英文名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setItemVisible(false)}
// >
// setItemVisible(性别)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setItemVisible(true)}
// >
// setItemVisibleTrue(性别)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setItemRequired}
// >
// setItemRequired(生日)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setValueReadonly(true)}
// >
// setValueReadonly(生日)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setValueReadonly(false)}
// >
// setValueReadonlyFalse(生日)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setReadingMode(true)}
// >
// setReadingMode(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setReadingMode(false)}
// >
// setReadingModeFalse(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setGroupVisible(false)}
// >
// setGroupVisible(联系信息)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setGroupVisible(true)}
// >
// setGroupVisibleTrue(联系信息)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setGroupReadonly}
// >
// setGroupReadonly(经济状况)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setGroupReadingMode(true)}
// >
// setGroupReadingMode(职业信息)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={() => this._setGroupReadingMode(false)}
// >
// setGroupReadingModeFalse(职业信息)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setItemTemplate}
// >
// setItemTemplate(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setItemPrefix}
// >
// setItemPrefix(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setItemSuffix}
// >
// setItemSuffix(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setItemTips}
// >
// setItemTips(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._setItemNotes}
// >setItemNotes(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._validate}
// >
// validate
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._validateItem}
// >
// validateItem(姓名)
// </Button>
// <Button
// disabled={this.state.disabled}
// onClick={this._saveData}
// >saveData
// </Button>

