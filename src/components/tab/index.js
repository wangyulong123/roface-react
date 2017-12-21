import React from 'react';
import ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { Icon, Modal } from 'antd';
import { depthFirstSearch } from '../../lib/menutransform';
import { addOnResize } from '../../lib/listener';

import './mega-tabcontent.css';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.dom = null;
    this.tabsWrapper = null;
    this.refStr = new Date().getTime();
    this.isMoving = false;
    this.clientX = 0;
    this.clientY = 0;
    this.state = {
      tabs: [],
      tabsCollapse: [],
      showTabsCollapse: 'none',
      activeTabId: null,
    };
  }

  componentDidMount() {
    /* eslint-disable */
    const { prefix = 'ro' } = this.props;
    this.dom = ReactDom.findDOMNode(this);
    // tab的固定长度
    this.tabWidth = 110;
    this.tabsWrapper = Array.from(this.dom.children).filter(d => d.className === `${prefix}-page-content-wrapper`)[0];
    this.offsetWidth = this.tabsWrapper.offsetWidth;

    this.checkWidth();
    addOnResize(this.checkWidth);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const pathname = history.location && history.location.pathname && history.location.pathname.substr(1);
    if (!this.props.data.length && !this.state.tabs.length && nextProps.data.length && pathname)
    {
      let allMenus = [];
      depthFirstSearch(nextProps.data, (menuItem) => {
        allMenus.push(menuItem);
      });
      const initTab = allMenus.filter(menuItem => menuItem.id === pathname)[0];
      this._createTab(initTab);
    }
  }

  checkWidth = () => {
    if (this.tabsWrapper) {
      const tabsLength = this.state.tabs.length * this.tabWidth;
      if (this.tabsWrapper.offsetWidth - 5 - 41 < tabsLength) {
        const isSpace = (this.tabsWrapper.offsetWidth - 5 - 41 - (this.state.tabs.length -1) * 2 - tabsLength) > this.tabWidth;
        if (isSpace) {
          console.log('isSpace:' + isSpace);
        } else {
          console.log('isSpace:' + isSpace);
          const tempCollapseItems = this.state.tabs.length ? this.state.tabs.pop() : null;
          this.setState({
            tabs: this.state.tabs,
            activeTabId: this.state.tabs.length && this.state.tabs[this.state.tabs.length -1 ] .id,
            tabsCollapse: this.state.tabsCollapse.concat(tempCollapseItems),
          });
        }
      } else if (this.tabsWrapper.offsetWidth - 5 - 41 > tabsLength) {
        const isSpace = (this.tabsWrapper.offsetWidth - 5 - 41 -
          (this.state.tabs.length ? this.state.tabs.length -1 : 0) * 2 - tabsLength) > this.tabWidth;
        if (isSpace && this.state.tabsCollapse.length) {
          console.log('isSpace:' + isSpace);
          const tempTabsItems = this.state.tabsCollapse.length ? this.state.tabsCollapse.pop() : null;
          this.setState({
            tabsCollapse: this.state.tabsCollapse,
            activeTabId: tempTabsItems ? tempTabsItems.id : '',
            tabs: this.state.tabs.concat(tempTabsItems),
            showTabsCollapse: this.state.tabsCollapse.length ? this.state.showTabsCollapse : 'none'
          });
        } else {
          console.log('isSpace:' + isSpace);
        }
      }
      this.offsetWidth = this.tabsWrapper.offsetWidth;
    }
  };

  _createTab = (item) => {
    this.checkWidth();
    const isExsitTabsItem = this.state.tabs && this.state.tabs
        .find(tabsItem => tabsItem.id === item.id);
    const isExsitCollapseItem = this.state.tabsCollapse && this.state.tabsCollapse
        .find(collapseItem => collapseItem.id === item.id);
    if (isExsitTabsItem && !isExsitCollapseItem) {
      this.setState({
        activeTabId: item.id,
      });
    } else if (isExsitCollapseItem && !isExsitTabsItem) {
      this._selectTabCollapse(item);
    } else {
      // TODO. 新增的时候，当空间不够的时候，应该将第一个收起来，将新增的排列到末尾
      this.setState({
        tabs: this.state.tabs.concat(item),
        activeTabId: item.id,
      });
    }
    this.checkWidth();
  };

  _closeAllTabs = () => {
    this.setState({ tabs: [] });
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
  };

  _deleteTab = (isDeteleTab) => {
    if (this.state.activeTabId === isDeteleTab.id) {
      this.setState({
        tabs: this.state.tabs && this.state.tabs.filter(tabItems => tabItems.id !==
        isDeteleTab.id),
      }, this.setState({
        activeTabId: this.state.tabs && this.state.tabs[this.state.tabs.length - 1].id,
      }));
    } else {
      this.setState({
        tabs: this.state.tabs && this.state.tabs.filter(tabItems => tabItems.id !==
        isDeteleTab.id),
        activeTabId: this.state.tabs && this.state.tabs[this.state.tabs.length - 2].id,
      });
    }
    this.checkWidth();
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

  _selectTabCollapse = (collapseItem) => {
    const tempTab = this.state.tabs.shift();
    const tempCollapse = this.state.tabsCollapse
      .filter(tabsCollapseItem => collapseItem.id !== tabsCollapseItem.id);
    const { history } = this.props;
    history.replace(`/${collapseItem.id}`);
    this.setState({
      tabs: this.state.tabs.concat(collapseItem),
      activeTabId: collapseItem.id,
      tabsCollapse: [...tempCollapse, tempTab],
    });
  };

  _deleteTabCollapse = (e, collapseItem) => {
    e.preventDefault();    // 阻止默认事件
    e.stopPropagation();
    this.setState({
      tabsCollapse: this.state.tabsCollapse
        .filter(tabsCollapseItem => collapseItem.id !== tabsCollapseItem.id),
    });
    return false;
  };

  // _dragDrop = (cb, name) => {
  //   const event = {
  //     onMouseDown: (e) => {
  //       this.isMoving = true;
  //       const tag = window.getComputedStyle(this._getTag());
  //       this.tagX = tag.left.substring(0, tag.left.length - 2);
  //       this.tagY = tag.top.substring(0, tag.top.length - 2);
  //       this.clientX = e.clientX;
  //       this.clientY = e.clientY;
  //     },
  //     onMouseMove: (e) => {
  //       if (this.isMoving) {
  //         const tag = this._getTag();
  //         tag.style.left = Number(this.tagX) + e.clientX - this.clientX + 'px';
  //         tag.style.top = Number(this.tagY) + e.clientY - this.clientY + 'px';
  //       }
  //     }
  //   };
  //
  //   event.onMouseUp = event.onMouseOut = (e) => {
  //     this.isMoving = false;
  //   };
  //   return (
  //     <div className="title-bar" {...event}>
  //       <span>{name}</span>
  //       <a style={{ display: '', right: 45 }} ><Icon type="reload" /></a>
  //       <a onClick={cb}><Icon type="close" /></a>
  //     </div>
  //   );
  // };

  // _getTag = cssSelector => {
  //   if (!cssSelector) {
  //     return document.querySelector('.' + this.refStr);
  //   }
  //   return document.querySelector('.' + this.refStr + ' ' + cssSelector);
  // };

  render() {
    const showTab = this.state.tabs && this.state.tabs.filter(activeTab => activeTab.id ===
      this.state.activeTabId);
    const { renderComponent } = this.props;
    // const event = {
    //   onMouseDown: (e) => {
    //     this.isMoving = true;
    //     const tag = window.getComputedStyle(this._getTag());
    //     this.tagX = tag.left.substring(0, tag.left.length - 2);
    //     this.tagY = tag.top.substring(0, tag.top.length - 2);
    //     this.clientX = e.clientX;
    //     this.clientY = e.clientY;
    //   },
    //   onMouseMove: (e) => {
    //     if (this.isMoving) {
    //       const tag = this._getTag();
    //       tag.style.left = Number(this.tagX) + e.clientX - this.clientX + 'px';
    //       tag.style.top = Number(this.tagY) + e.clientY - this.clientY + 'px';
    //     }
    //   }
    // };
    //
    // event.onMouseUp = event.onMouseOut = (e) => {
    //   this.isMoving = false;
    // };
    return (
      <div>
        <div className="ro-page-content-wrapper" id="ro-main-content">
          <div className="ro-page-content" id="ro-main-content-container">
            <div className="ro-main-tabs-container">
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
                        <span
                          style={{ cursor: 'move' }}
                          title={tabItem.name}
                          {...event}
                        >
                          {tabItem.name}
                        </span>
                        <Icon type="close" className="close" onClick={() => this._deleteTab(tabItem)} />
                      </li>
                    );
                  })
                }
              </ul>
              <li
                className="dropdown pull-right ro-tabs-collapse"
              >
                <span className="roic-right-operate">
                  <span className="roic-more" onClick={this._dropHiddenDown} title="打开更多..." />
                  <span className="roic-close-others" onClick={this._closeOtherTabs} title="关闭其他..." />
                </span>
                <ul
                  style={{ display: this.state.tabsCollapse.length ? this.state.showTabsCollapse : 'none' }}
                  id="ro-nav-tabs-collapse"
                >
                  {
                    this.state.tabsCollapse.length &&
                    this.state.tabsCollapse && this.state.tabsCollapse.map((collapseItems) => {
                      return(
                        <span className="span-no-wrap">
                          <li
                            key={collapseItems.id}
                            onClick={() => this._selectTabCollapse(collapseItems)}
                          >{collapseItems.name}
                          </li>
                          <Icon type="close" className="close-collapse" onClick={e => this._deleteTabCollapse(e, collapseItems)} />
                        </span>
                      );
                    })
                  }
                </ul>
              </li>
              <li className="dropdown pull-right ro-tabdrop" style={{ float: 'right' }}>
                <ul className="dropdown-menu" id="ro-tabclose-container">
                  <li><a id="ro-close-all" onClick={this._closeAllTabs}>关闭所有</a></li>
                </ul>
              </li>
              <div className="ro-tab-content-container">
                <ol className="breadcrumb ro-breadcrumb">
                  <div className="ro-tab-pane" id="ro-tab-pane">
                    {
                      (showTab && showTab[0] && showTab[0].name) ?
                        <span><Icon type="home" /><span>{showTab && showTab[0] && showTab[0].name}</span></span> : '无tab页正在查看'
                    }
                  </div>
                </ol>
              </div>
              <div>
                <Route path="/" render={p => renderComponent(p, showTab[0])} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
