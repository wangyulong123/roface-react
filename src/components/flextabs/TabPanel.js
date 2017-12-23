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

  _allowDrop = (ev) => {
    ev.preventDefault();
  };

  _drop = (ev) => {
      ev.preventDefault();
      const data = ev.dataTransfer.getData('Text');
      ev.target.appendChild(document.getElementById(data));
  }

  render() {
    const { tabItem, className, clickTab, deleteTab, dragStart } = this.props;
    /* eslint-disable prefer-template */
    /* eslint-disable no-mixed-operators */
    /* eslint-disable no-multi-assign */
    // const event = {
    //   onMouseDown: (e) => {
    //     this.isMoving = true;
    //     // const tag = window.getComputedStyle(this._getTag());
    //     const tag = window.getComputedStyle(document.querySelector('.close'));
    //     this.tagX = tag.left.substring(0, tag.left.length - 2);
    //     this.tagY = tag.top.substring(0, tag.top.length - 2);
    //     this.clientX = e.clientX;
    //     this.clientY = e.clientY;
    //     console.log('onMouseDown:' + e);
    //   },
    //   onMouseMove: (e) => {
    //     if (this.isMoving) {
    //       const tag = document.querySelector('.close');
    //       tag.style.left = Number(this.tagX) + e.clientX - this.clientX + 'px';
    //       tag.style.top = Number(this.tagY) + e.clientY - this.clientY + 'px';
    //       console.log('onMouseMove:' + e);
    //     }
    //   },
    // };
    //
    // event.onMouseUp = event.onMouseOut = (e) => {
    //   console.log(e);
    //   this.isMoving = false;
    // };

    return (
      <li
        className={className}
        onClick={() => clickTab(tabItem)}
        key={tabItem.id}
        draggable="true"
        onDragStart={event => dragStart(event, tabItem)}
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
