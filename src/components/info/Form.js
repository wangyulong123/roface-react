import React from 'react';
import * as component from '../index';

const { Form, Collapse, Anchor, Tooltip } = component;
const { Link } = Anchor;
const { Item } = Form;
const { Panel } = Collapse;
export default Form.create({
  onValuesChange: (props, values) => {
    const { onValuesChange } = props;
    onValuesChange && onValuesChange(values);
  },
})(class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: this._getKeys(props),
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      keys: this._getKeys(props),
    });
  }
  _getKeys = (props) => {
    return Object.keys(this._calculateGroup(props.dataForm)) || [];
  }
  _calculateGroup = (data) => {
    const groups = {};
    if (Object.keys(data).length > 0) {
      let { elements = [] } = data;
      // elements = elements.filter(item => item.elementUIHint.visible);
      if (elements.some(ele => ele.group)) {
        // 如果有分组存在，根据分组进行过滤
        elements.forEach((ele) => {
          if (groups[ele.group]) {
            groups[ele.group].push(ele);
          } else {
            groups[ele.group] = [].concat(ele);
          }
        });
      } else {
        groups.noGroup = elements;
      }
    }
    return groups;
  }
  _getComponent = (editStyle) => {
    let com = component.Text;
    if (typeof editStyle === 'string') {
      com = component[editStyle] || component.Text;
    } else {
      com = editStyle;
    }
    return com;
  }
  _panelChange = (key) => {
    this.setState({
      keys: key,
    });
  };
  _getElementUIHint = (item) => {
    const { dict } = this.props;
    return {
      reading: item.elementUIHint.reading,
      readOnly: item.elementUIHint.readonly,
      prefix: item.elementUIHint.prefix,
      suffix: item.elementUIHint.suffix,
      options: dict[item.code],
      htmlstyle: item.elementUIHint.htmlStyle,
    };
  };
  _dataType = (type) => {
    let dataType = 'string';
    switch (type) {
      case 'String':
      case 'StringArray': dataType = 'string'; break;
      case 'Integer': dataType = 'integer'; break;
      case 'Double':
      case 'Currency': dataType = 'number'; break;
      case 'Date':
      case 'DateTime':
      case 'Time': dataType = 'string'; break;
      default: dataType = 'string';
    }
    return dataType;
  };
  _renderFormItem = (items, data, prefix) => {
    const { formUIHint = {} } = data;
    const { dataValue } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (items.map((item) => {
      const Com = this._getComponent(item.elementUIHint.editStyle);
      const comProps = this._getElementUIHint(item);
      const key = item.code;
      return (
        <div
          key={key}
          className={`${prefix}-item-container`}
          style={{
            width: `${(100 / (formUIHint.columnNumber || 1)) * item.elementUIHint.colspan}%`,
            display: item.elementUIHint.visible ? '' : 'none' }}
        >
          <Item
            className={`${prefix}-item`}
            label={item.name}
          >
            <Tooltip title={item.elementUIHint.tips}>
              <div>
                {getFieldDecorator(item.code, {
                  initialValue: dataValue[item.code] || item.defaultValue,
                  rules: [{ required: item.elementUIHint.required, type: this._dataType(item.dataType), message: `${item.name}是必输字段` }],
                })(
                  typeof Com === 'object' ? React.cloneElement(Com, comProps) : <Com {...comProps} />)}
              </div>
            </Tooltip>
          </Item>
          {
            item.elementUIHint &&
            item.elementUIHint.note ? <div className={`${prefix}-item-container-note`}>{item.elementUIHint.note}</div> : null
          }
        </div>
      );
    }));
  }
  _renderAnchor = (groups) => {
    return Object.keys(groups).filter((group) => {
      return groups[group].filter(item => item.elementUIHint.visible).length > 0;
    }).map((group) => {
      return <Link href={`#${group}`} key={`#${group}`} title={group.split(':')[1]} />;
    });
  }
  render() {
    const { dataForm, prefix } = this.props;
    const groups = this._calculateGroup(dataForm);
    const { keys } = this.state;
    return (
      <div className={`${prefix}-info`}>
        <Form>
          {
            !groups.noGroup ? (
              <Collapse activeKey={keys} onChange={this._panelChange}>
                {Object.keys(groups).map((group) => {
                  const display =
                    groups[group].filter(item => item.elementUIHint.visible).length !== 0 ? '' : 'none';
                  return (
                    <Panel header={group.split(':')[1]} id={group} key={group} style={{ display: display }}>
                      <div className={`${prefix}-info-container`}>
                        {this._renderFormItem(groups[group], dataForm, `${prefix}-info`)}
                      </div>
                    </Panel>
                  );
                })}
              </Collapse>) : (
                <div className={`${prefix}-info-container`}>
                  {this._renderFormItem(groups.noGroup, dataForm, `${prefix}-info`)}
                </div>)
          }
        </Form>
        {
          !groups.noGroup ? (
            <div className={`${prefix}-info-anchor`}>
              <Anchor>
                {this._renderAnchor(groups)}
              </Anchor>
            </div>
          ) : null
        }
      </div>
    );
  }
});
