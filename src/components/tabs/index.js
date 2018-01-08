
import React from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class RoTabs extends React.Component {
  static TabPane = TabPane;
  static defaultProps = {
    tabName: 'tab',
    keyName: 'key',
    compName: 'content',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderTabPane = () => {
    const { options, compName, tabName, keyName } = this.props;
    return options && options.map((item, index) => {
      if (item instanceof Object) {
        return (
          <TabPane tab={item[tabName]} key={item[keyName]}>
            {item[compName]}
          </TabPane>
        );
      }
      return (
        <TabPane tab={index} key={Math.uuid()}>
          {item}
        </TabPane>
      );
    });

  };
  render() {
    return (
      <Tabs {...this.props}>
        { this.props.children || this._renderTabPane() }
      </Tabs>
    );
  }
}

export default RoTabs;
