import React from 'react';
import { Route } from 'react-router-dom';
// import { Tabs } from 'antd';
import { Icon, Modal } from 'antd';
import './mega-tabcontent.css';
// import './mega-tabcontent-orange.css';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      activeTabId: null,
    };
  }

  _createTab = (item) => {
    // const title = Math.random() * 10;
    this.setState({
      tabs: this.state.tabs.concat({ title: item.name, id: item.id }),
      activeTabId: item.id,
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
    const { history } = this.props;
    history.replace(`/${currentTabItem.id}`);
    this.setState({
      activeTabId: currentTabItem.id,
    });
  };

  render() {
    const showTab = this.state.tabs && this.state.tabs.filter(activeTab => activeTab.id ===
      this.state.activeTabId);
    const { renderComponent } = this.props;
    return (
      <div>
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
                        <Icon type="reload" onClick={() => this._refreshTab(tabItem)} />
                        <a style={{ cursor: 'move' }} title={tabItem.title}>
                          {tabItem.title}
                        </a>
                        <Icon type="close" onClick={() => this._deleteTab(tabItem)} />
                      </li>
                    );
                  })
                }
              </ul>
              <li className="dropdown pull-right rb-tabdrop" style={{ float: 'right' }}>
                <ul className="dropdown-menu dropdown-menu-default" id="rb-tabclose-container">
                  <li><a id="rb-close-all" onClick={this._closeAllTabs}>关闭所有</a></li>
                  <li><a id="rb-close-other" onClick={this._closeOtherTabs}>关闭其他</a></li>
                </ul>
              </li>
              <div style={{ border: '1px solid #e25613', width: '1px', height: '100%' }} />
              <div className="rb-tab-content-container">
                <div className="rb-tab-pane" id="rb-tab-pane">
                  {
                    (showTab && showTab[0] && showTab[0].title) || '无tab页正在查看'
                  }
                </div>
                <div>
                  <Route path="/" render={p => renderComponent(p, showTab[0])} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
