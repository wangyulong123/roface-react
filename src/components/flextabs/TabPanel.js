/**
 * Created by jkwu on 17-12-22.
 */
import React from 'react';
import { Icon, Tooltip } from '../index';

class TabPanel extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   return ((nextProps.tabItem.id === this.props.tabItem.id) &&
  //   (nextProps.activeTabId !== this.props.activeTabId)) || (
  //     (nextProps.isCollapse) &&
  //     (nextProps.activeTabId !== this.props.activeTabId));
  // }
    render() {
    const { tabItem, className, clickTab, deleteTab } = this.props;

    return (
      <li
        className={`list-item ${className}`}
        onClick={() => clickTab(tabItem)}
        key={tabItem.id}
      >
        <Tooltip placement="bottom" title={tabItem.name} mouseEnterDelay={2}>
          <span
            style={{ cursor: 'move' }}
            key={`span ${tabItem.id}`}
          >
            {tabItem.name}
          </span>
        </Tooltip>
        <Icon type="close" className="close" onClick={() => deleteTab(tabItem)} />
      </li>);
  }
}

export default TabPanel;
