import React from 'react';
import * as component from 'antd';

const { Form, Row, Col, Collapse, Anchor, Tooltip } = component;
const { Link } = Anchor;
const { Item } = Form;
const { Panel } = Collapse;
export default Form.create()(class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: props.defaultKeys || [],
    };
  }
  _calculateGroup = (data) => {
    const groups = {};
    if (Object.keys(data).length > 0) {
      const { elements = [] } = data;
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
    let com = component.Input;
    switch (editStyle) {
      case 'Text': com = component.Input; break;
      // case 'DatePicker': com = component.DatePicker; break;
      default: com = component.Input;
    }
    return com;
  }
  _panelChange = (key) => {
    this.setState({
      keys: key,
    });
  };
  _renderFormItem = (items, data) => {
    const { formUIHint = {} } = data;
    const { dataValue } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    return (items.filter(item => item.elementUIHint.visible).map((item, index) => {
      const Com = this._getComponent(item.elementUIHint.editStyle);
      const key = `${index}`;
      return (
        <Col span={(24 / (formUIHint.columnNumber || 1)) * item.elementUIHint.colspan} key={key}>
          <Item
            {...formItemLayout}
            labelCol={{ span: 5 }}
            label={item.name}
          >
            <Tooltip title={item.elementUIHint.tips}>
              <div>
                {getFieldDecorator(item.code, {
                  initialValue: dataValue[item.code] || item.defaultValue,
                  rules: [{ required: item.elementUIHint.required, type: item.dataType.toLocaleLowerCase(), message: `${item.name}是必输字段` }],
                })(
                  <Com
                    readOnly={item.elementUIHint.readonly}
                    prefix={item.elementUIHint.prefix}
                    suffix={item.elementUIHint.suffix}
                    note={item.elementUIHint.note}
                  />)}
              </div>
            </Tooltip>
          </Item>
        </Col>
      );
    }));
  }
  _renderAnchor = (groups) => {
    return Object.keys(groups).map((group) => {
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
          <Collapse activeKey={keys} onChange={this._panelChange}>
            {Object.keys(groups).map((group) => {
              return (
                <Panel header={group.split(':')[1]} id={group} key={group}>
                  <Row>
                    {this._renderFormItem(groups[group], dataForm)}
                  </Row>
                </Panel>
              );
            })}
          </Collapse>
        </Form>
        <div className={`${prefix}-info-anchor`}>
          <Anchor>
            {this._renderAnchor(groups)}
          </Anchor>
        </div>
      </div>
    );
  }
});
