import React from 'react';

import * as dataForm from '../../lib/dataform';
import Form from './Form';

import './style/index.less';


export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForm: {},
      dataValue: {},
    };
  }
  componentDidMount() {
    const { dataFormId, didMount } = this.props;
    dataForm.getMeta(dataFormId).then((meta) => {
      // 获取数据
      dataForm.getDataOne(dataFormId).then((res) => {
        this.setState({
          dataForm: meta,
          dataValue: res,
        }, () => {
          didMount({
            setValue: this.setValue,
            getData: this.getData,
            setData: this.setData,
            setItemVisible: this.setItemVisible,
            setItemRequired: this.setItemRequired,
            setValueReadonly: this.setValueReadonly,
            setReadingMode: this.setReadingMode,
            setGroupVisible: this.setGroupVisible,
            setGroupReadonly: this.setGroupReadonly,
            setGroupReadingMode: this.setGroupReadingMode,
            setItemTemplate: this.setItemTemplate,
            setItemPrefix: this.setItemPrefix,
            setItemSuffix: this.setItemSuffix,
            setItemTips: this.setItemTips,
            setItemNotes: this.setItemNotes,
            validate: this.validate,
            validateItem: this.validateItem,
            saveData: this.saveData,
          });
        });
      });
    });
  }
  setValue = (itemId, value) => {
    this.refs.form.setFieldsValue({ [itemId]: value });
  };
  getData = () => {
    return this.refs.form.getFieldsValue();
  };
  setData = (data) => {
    this.refs.form.setFieldsValue(data);
  };
  setItemVisible = (itemId, status) => {
    this._updateElementUIHint(itemId, status, 'visible', ele => ele.code === itemId);
  };
  setItemRequired = (itemId, status) => {
    this._updateElementUIHint(itemId, status, 'required', ele => ele.code === itemId);
  };
  setValueReadonly = (itemId, status) => {
    this._updateElementUIHint(itemId, status, 'readonly', ele => ele.code === itemId);
  };
  setReadingMode = (itemId, status) => {
    this._updateElementUIHint(itemId, status, 'reading', ele => ele.code === itemId);
  };
  setGroupVisible = (groupId, status) => {
    this._updateElementUIHint(groupId, status, 'visible', ele => ele.group === groupId);
  };
  setGroupReadonly = (groupId, status) => {
    this._updateElementUIHint(groupId, status, 'readonly', ele => ele.group === groupId);
  };
  setGroupReadingMode = (groupId, status) => {
    this._updateElementUIHint(groupId, status, 'reading', ele => ele.group === groupId);
  };
  setItemTemplate = (itemId, template) => {
    this._updateElementUIHint(itemId, template, 'editStyle', ele => ele.code === itemId);
  };
  setItemPrefix = (itemId, prefix) => {
    this._updateElementUIHint(itemId, prefix, 'prefix', ele => ele.code === itemId);
  };
  setItemSuffix = (itemId, suffix) => {
    this._updateElementUIHint(itemId, suffix, 'suffix', ele => ele.code === itemId);
  };
  setItemTips = (itemId, tips) => {
    this._updateElementUIHint(itemId, tips, 'tips', ele => ele.code === itemId);
  };
  setItemNotes = (itemId, notes) => {
    this._updateElementUIHint(itemId, notes, 'note', ele => ele.code === itemId);
  };
  _updateElementUIHint = (itemId, status, name, match) => {
    this.setState({
      dataForm: {
        ...this.state.dataForm,
        elements: this.state.dataForm.elements.map((ele) => {
          if (match(ele)) {
            return {
              ...ele,
              elementUIHint: {
                ...ele.elementUIHint,
                [name]: status,
              },
            };
          }
          return ele;
        }),
      },
    });
  };
  validate = (cb) => {
    this.refs.form.validateFields(cb);
  };
  validateItem = (itemId, cb) => {
    this.refs.form.validateFields([itemId], cb);
  };
  saveData = () => {
    console.log('save data');
  };
  render() {
    const { prefix = 'ro', defaultKeys = [] } = this.props;
    return (
      <Form
        ref="form"
        {...this.state}
        prefix={prefix}
        defaultKeys={defaultKeys}
      />
    );
  }
}

