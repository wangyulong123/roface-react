import React from 'react';
import * as component from 'antd';

import * as restful from '../../system/restful';
// import { Form, Input, Icon, Divider } from 'antd';

import './style/index.less';

const { Form, Col, Anchor } = component;
const { Item } = Form;
const { Link } = Anchor;

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
    restful.getDataG('test1', {}).then((res) => {
      console.log(res);
    });
  }
  _calculateGroup = (data) => {
    const groups = {};
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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    return (items.filter(item => item.elementUIHint.visible).map((item, index) => {
      const Com = this._getComponent(item.elementUIHint.editStyle);
      const key = `${index}`;
      return (
        <Col span={24 / data.columnNumber} key={key}>
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
      return <Link href={`#${group}`} title={group.split(':')[1]} />;
    });
  }
  render() {
    // const { data, prefix = 'rc' } = this.props;
    // const groups = this._calculateGroup(data);
    return (
      <div>
        ss
      </div>
    );
  }
});

