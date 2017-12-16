import React from 'react';
import * as component from 'antd';

import * as dataform from '../../lib/dataform';
// import { Form, Input, Icon, Divider } from 'antd';

import './style/index.less';

const { Form, Row, Col, Anchor, Collapse } = component;
const { Item } = Form;
const { Link } = Anchor;
const { Panel } = Collapse;

export default Form.create()(class Forms extends React.Component {
  /* static propTypes = {
    data: React.PropTypes.Array.isRequired,
  }; */

  constructor(props) {
    super(props);
    this.state = {
      dataForm: {},
    };
  }
  componentDidMount() {
    const { dataFormId } = this.props;
    dataform.getWebApiDataFormMeta(dataFormId).then((res) => {
      this.setState({
        dataForm: res,
      });
    });
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
       case 'DatePicker': com = component.DatePicker; break;
       default: com = component.Input;
     }
     return com;
   }
  _renderFormItem = (items, data) => {
    const { formUIHint = {} } = data;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    return (items.filter(item => item.elementUIHint.visible).map((item, index) => {
      const Com = this._getComponent(item.elementUIHint.editStyle);
      const key = `${index}`;
      return (
        <Col span={24 / (formUIHint.columnNumber || 1)} key={key}>
          <Item
            {...formItemLayout}
            label={item.name}
          >
            {getFieldDecorator(item.code, {
              initialValue: item.defaultValue,
              rules: [{ required: item.elementUIHint.required, type: item.dataType.toLocaleLowerCase(), message: `${item.name}是必输字段` }],
            })(<Com disabled={item.readonly} />)}
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
    const { prefix = 'rc' } = this.props;
    const groups = this._calculateGroup(this.state.dataForm);
    return (
      <div className={`${prefix}-info`}>
        <Form>
          {Object.keys(groups).map((group, index) => {
            const key = `${index}`;
            return (
              <Collapse key={key} bordered={false} defaultActiveKey={Object.keys(groups)}>
                <Panel header={group.split(':')[1]} id={group} key={group}>
                  <Row>
                    <Col span={24}>
                      {this._renderFormItem(groups[group], this.state.dataForm)}
                    </Col>
                  </Row>
                </Panel>
              </Collapse>);
          })}
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

