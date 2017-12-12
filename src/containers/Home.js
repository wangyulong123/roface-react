import React from 'react';
// import 'antd/es/tabs/style';

import Tabs from '../components/tab';

const { TabPane } = Tabs;

export default class App extends React.Component {
  callback = () => {

  };

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    );
  }
}
