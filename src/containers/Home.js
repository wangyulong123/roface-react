import React from 'react';
// import 'antd/es/tabs/style';

import { Tabs, Info } from '../components';
// import demo from '../json/demoPerson';
// import Fetch from '../utils/fetch';

const { TabPane } = Tabs;

export default class Home extends React.Component {
  callback = () => {
    /* Fetch('http://localhost:3001/test1', {}, 'get').then((res) => {
      console.log(res);
    }); */
    this.props.refs.info.setFieldValue();
  };

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Tab 1" key="1">
          <Info ref="info" dataFormId="test1" />
        </TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    );
  }
}

