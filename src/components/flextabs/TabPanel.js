/**
 * Created by jkwu on 17-12-22.
 */
import React from 'react';
import { Icon } from '../index';
// import _object from 'lodash/object';

class TabPanel extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   return ((nextProps.tabItem.id === this.props.tabItem.id) &&
  //   (nextProps.activeTabId !== this.props.activeTabId)) || (
  //     (nextProps.isCollapse) &&
  //     (nextProps.activeTabId !== this.props.activeTabId));
  // }

  render() {
    const { tabItem, className, clickTab, deleteTab } = this.props;
    /* eslint-disable prefer-template */
    return (
      <li
        className={className}
        onClick={() => clickTab(tabItem)}
        key={tabItem.id}
      >
        <span
          style={{ cursor: 'move' }}
          title={tabItem.name}
          key={'span' + tabItem.id}
        >
          {tabItem.name}
        </span>
        <Icon type="close" className="close" onClick={() => deleteTab(tabItem)} />
      </li>);
  }
}

export default TabPanel;
