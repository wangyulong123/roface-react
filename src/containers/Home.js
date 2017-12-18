import React from 'react';
// import 'antd/es/tabs/style';

import { Tabs, DetailInfo, Menu } from '../components';

import * as rest from '../lib/rest';

const { TabPane } = Tabs;

export default class Home extends React.Component {
  callback = () => {
    /* Fetch('http://localhost:3001/test1', {}, 'get').then((res) => {
      console.log(res);
    }); */
    /* const { info = {} } = this.props.refs;
    info.setFieldValue(); */
    // rest.get('/dataform/meta/demoPerson', { username: 'www', aa: 'ssss' });
    const obj = rest.get('/abc/def?a=1&b=2' , {b:[4,5],c:3});
    console.log(obj);
  };

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Tab 1" key="1">
          <DetailInfo ref="info" dataFormId="demoPerson" />
        </TabPane>
        <TabPane tab="Tab 2" key="2"><Menu ref="info" dataFormId="test1">------</Menu></TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    );
  }
}

