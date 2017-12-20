import React from 'react';
// import { Tabs } from 'antd';
import { Icon, Modal } from 'antd';
import './mega-tabcontent.css';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      tabsCollapse: [],
      showTabsCollapse: 'none',
      activeTabId: null,
    };
  }

  _createTab = () => {
    const title = Math.random() * 10;
    const tempCollapseItems = this.state.tabs && this.state.tabs.length > 5 ?
      this.state.tabs.shift() : [];
    this.setState({
      tabs: this.state.tabs.concat({ title, id: title }),
      activeTabId: title,
      tabsCollapse: this.state.tabsCollapse.concat(tempCollapseItems),
    });
  };

  _closeAllTabs = () => {
    this.setState({ tabs: [] });
    console.log('close all');
  };

  _closeOtherTabs = () => {
    if (!this.state.activeTabId) {
      Modal.info({
        title: '当前没有可用的tab',
      });
    }
    this.setState({
      tabs: this.state.tabs && this.state.tabs.filter(tabItems => tabItems.id ===
      this.state.activeTabId),
      activeTabId: this.state.tabs && this.state.tabs[this.state.tabs.length - 1].id,
    });
    console.log('close other');
  };

  _deleteTab = (currentTab) => {
    this.setState({
      tabs: this.state.tabs && this.state.tabs.filter(tabItems => tabItems.id !==
      currentTab.id),
      activeTabId: this.state.tabs && this.state.tabs[this.state.tabs.length - 1].id,
    });
    console.log('_deleteTab');
  };

  _refreshTab = () => {
    console.log('_refreshTab');
  };

  _clickTab = (currentTabItem) => {
    this.setState({
      activeTabId: currentTabItem.id,
    });
  };

  _dropHiddenDown = () => {
    if (!this.state.tabsCollapse.length) {
      Modal.info({
        title: '没有折叠起来的tab页',
      });
      return;
    }
    this.setState({
      showTabsCollapse: this.state.showTabsCollapse === 'list-item' ? '' : 'list-item',
    });
  };

  _selectTabCollapse = () => {
    console.log('_selecttabsCollapse');
  };

  _deleteTabCollapse = (e, collapseItem) => {
    e.preventDefault();    // 阻止默认事件
    e.stopPropagation();
    this.setState({
      tabsCollapse: this.state.tabsCollapse
        .filter(tabsCollapseItem => collapseItem.id !== tabsCollapseItem.id),
    });
    console.log('_deleteTabCollapse');
    return false;
  };

  render() {
    const showTab = this.state.tabs && this.state.tabs.filter(activeTab => activeTab.id ===
      this.state.activeTabId);
    return (
      <div>
        <button
          className="btn btn-danger btn-lg"
          id="tabs-toggle"
          onClick={this._createTab}
        >点击弹出tab页
        </button>
        <div className="rb-page-content-wrapper" id="rb-main-content">
          <div className="rb-page-content" id="rb-main-content-container">
            <div className="rb-main-tabs-container">
              <ul
                className="nav-tabs"
              >
                {
                  this.state.tabs && this.state.tabs.map((tabItem) => {
                    let className = '';
                    if (this.state.activeTabId === tabItem.id) {
                      className = 'li-active';
                    }
                    return (
                      <li
                        style={{ float: 'left' }}
                        className={className}
                        onClick={() => this._clickTab(tabItem)}
                        key={tabItem.id}
                      >
                        <span style={{ cursor: 'move' }} title={tabItem.title} >
                          {tabItem.title}
                        </span>
                        <Icon type="close" className="close" onClick={() => this._deleteTab(tabItem)} />
                      </li>
                    );
                  })
                }
              </ul>
              <li
                className="dropdown pull-right ro-tabs-collapse"
                style={{display: 'list-item' }}
                onClick={this._dropHiddenDown}
              >
                <span>
                  <span>{this.state.tabsCollapse.length}</span>
                  <Icon type="caret-down" />
                </span>
                <ul
                  style={{ display: this.state.showTabsCollapse }}
                  id="rb-nav-tabs-collapse"
                >
                  {
                    this.state.tabsCollapse.length &&
                    this.state.tabsCollapse && this.state.tabsCollapse.map((collapseItems) => {
                      return(
                        <span className="span-no-wrap">
                          <li
                            key={collapseItems.id}
                            onClick={this._selectTabCollapse}
                          >{collapseItems.title}
                          </li>
                          <Icon type="close" className="close-collapse" onClick={e => this._deleteTabCollapse(e, collapseItems)} />
                        </span>
                      );
                    })
                  }
                </ul>
              </li>
              <li className="dropdown pull-right rb-tabdrop" style={{ float: 'right' }}>
                <ul className="dropdown-menu" id="rb-tabclose-container">
                  <li><a id="rb-close-all" onClick={this._closeAllTabs}>关闭所有</a></li>
                  <li><a id="rb-close-other" onClick={this._closeOtherTabs}>关闭其他</a></li>
                </ul>
              </li>
              <div className="rb-tab-content-container">
                <ol className="breadcrumb rb-breadcrumb">
                  <div className="rb-tab-pane" id="rb-tab-pane">
                    {
                      (showTab && showTab[0] && showTab[0].title) ?
                        <span><Icon type="home" /><span>{showTab && showTab[0] && showTab[0].title}</span></span> : '无tab页正在查看'
                    }
                  </div>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
