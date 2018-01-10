import React from 'react';
import ReactDom from 'react-dom';

import * as dataForm from '../../lib/dataform';
import * as rest from '../../lib/rest';
import Form from './Form';
import './style/index.less';
import { Modal, Notify } from '../index';
import { developCompose } from '../developCompose';

@developCompose
export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForm: {},
      dataValue: {},
      dict: {},
    };
  }
  componentDidMount() {
    const { didMount, formReady, dataReady } = this.props;
    /* eslint-disable */
    formReady && formReady(ReactDom.findDOMNode(this));
    this.info = {
      setValue: this.setValue,
      getValue: this.getValue,
      setData: this.setData,
      getData: this.getData,
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
    };
    this._updateData(didMount, dataReady);
  }
  componentWillReceiveProps(nextProps) {
    // 只适合对象的浅比较，否则会造成性能问题
    const nextParams = nextProps.params && rest.serializeParam(nextProps.params);
    const thisParams = this.props.params && rest.serializeParam(this.props.params);
    if ((nextParams !== thisParams) || (nextProps.dataFormId !== this.props.dataFormId)) {
      this._updateData(nextProps.didMount, nextProps.dataReady);
    }
  }
  _updateData = (didMount, dataReady) => {
    this._getData().then((res) => {
      this.setState({
        dataForm: res.meta || res,
        dataValue: res.body || {},
        dict: res.dict || {},
      }, () => {
        dataReady && dataReady(this.info);
        didMount && didMount(this.info);
      });
    }).catch(e => {
      Modal.error({
        title: '获取详情数据失败',
        content: JSON.stringify(e)
      })
    });
  }
  _getData = () => {
    const { dataFormId, params } = this.props;
    if (params) {
      return dataForm.getDataOne(dataFormId, this._serializeParam(params))
    }
    return dataForm.getMeta(dataFormId)
  };
  _serializeParam = (params, field) => {
    let str = '';
    if (typeof params === 'string') {
      str = params;
    } else {
      if (Array.isArray(params) && field) {
        params.forEach(p => {
          if (typeof p === 'string' || typeof p === 'number') {
            str = `${str}&${field}=${p}`;
          }
        })
      } else {
        Object.keys(params).forEach(p => {
          if (Array.isArray(params[p])) {
            str = `${str}&${this._serializeParam(params[p], p)}`;
          } else {
            str = `${str}&${p}=${params[p]}`;
          }
        })
      }
    }
    return str.replace(/^&/g, '');
  };
  setValue = (itemId, value) => {
    this.form.setFieldsValue({ [itemId]: value });
  };
  getValue = (itemId) => {
    return this.form.getFieldValue(itemId);
  };
  setData = (data) => {
    this.form.setFieldsValue(data);
  };
  getData = (data) => {
    return this.form.getFieldsValue(data);
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
    this.form.validateFieldsAndScroll(cb);
  };
  validateItem = (itemId, cb) => {
    this.form.validateFieldsAndScroll([itemId], cb);
  };
  saveData = (cb) => {
    const { dataFormId } = this.props;
    this.validate((errors, values) => {
      if (!errors) {
        dataForm.saveDataOne(dataFormId, values).then((res) => {
          cb(res);
          Notify.success({
            message: '保存成功',
          });
        }).catch((e) => {
          cb(e);
          Modal.error({
            title: '保存失败',
            content: JSON.stringify(e),
          });
        });
      } else {
        cb(errors)
      }
    });
  };
  render() {
    const { prefix = 'ro', defaultKeys = [], onValuesChange } = this.props;
    return (
      <Form
        ref={form => this.form = form}
        {...this.state}
        prefix={prefix}
        defaultKeys={defaultKeys}
        onValuesChange={onValuesChange}
      />
    );
  }
}

