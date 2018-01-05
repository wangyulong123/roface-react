import React from 'react';
import ReactDom from 'react-dom';
// import { Route } from 'react-router-dom';
import Sortable from 'sortablejs';
import { Icon, Notify, Tooltip } from '../index';
import TabPanel from './TabPanel';
import TabContent from './TabContent';
import { depthFirstSearch } from '../../lib/menutransform';
import { addOnResize } from '../../lib/listener';

import './mega-tabcontent.css';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.dom = null;
    this.tabsWrapper = null;
    this.state = {
      refresh: false,
      tabs: [],
      tabsCollapse: [],
      showTabsCollapse: 'none',
      showOperateCollapse: 'none',
      activeTabId: null,
      isCollapse: false,
    };
  }

  componentDidMount() {
    /* eslint-disable */
    const { prefix = 'ro' } = this.props;
    this.dom = ReactDom.findDOMNode(this);
    // tab的固定长度
    this.tabWidth = 110;
    this.tabsLeftWidth = 5;
    this.tabsRightWidth = 36;
    this.tabIntervalWidth = 2;
    this.tabsWrapper = Array.from(this.dom.children).filter(d => d.className === `ro-page-content-wrapper`)[0];
    this.offsetWidth = this.tabsWrapper.offsetWidth;

    this.checkWidth();
    addOnResize(this.checkWidth);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const pathname = history.location && history.location.pathname && history.location.pathname.substr(1);
    if (!this.props.data.length && !this.state.tabs.length && nextProps.data.length && pathname) {
      let allMenus = [];
      depthFirstSearch(nextProps.data, (menuItem) => {
        allMenus.push(menuItem);
      });
      let initTab = allMenus.filter(menuItem => menuItem.id === pathname)[0] ||
        allMenus.filter(menuItem => (menuItem.id === 'Home' || menuItem.id === '00'))[0];
      if (history.location.state && history.location.state.id) {
        const tempState = {
          id: history.location.state && history.location.state.id,
          name: history.location.state && history.location.state.name,
          url: history.location.state && history.location.state.url,
        };
        initTab = {
          ...tempState,
          state: {
            ...history.location.state
          },
        };
      }
      this.createTab(initTab);
    } else if (!pathname) {
      let allMenus = [];
      depthFirstSearch(nextProps.data, (menuItem) => {
        allMenus.push(menuItem);
      });
      const indexMenu = allMenus.filter(menuItem => (menuItem.id === 'Home' || menuItem.id === '00'))[0];
      this.createTab(indexMenu);
    }
  }

  _initCom = (tab, props) => {
    const { renderComponent } = this.props;
    return renderComponent(props, tab);
  };


  checkWidth = () => {
    if (this.tabsWrapper) {
      const tabsLength = this.state.tabs.length * (this.tabWidth + this.tabIntervalWidth);
      if (this.tabsWrapper.offsetWidth - this.tabsLeftWidth - this.tabsRightWidth < tabsLength) {
        const isSpace = (this.tabsWrapper.offsetWidth - this.tabsLeftWidth - this.tabsRightWidth - (this.state.tabs.length) * this.tabIntervalWidth - tabsLength) > this.tabWidth;
        if (isSpace) {
          console.log('isSpace-1:' + isSpace);
        } else {
          console.log('isSpace-1:' + isSpace);
          /*
          * 缩小时空间不足，进行折叠tabs，将最后一个tab页进行折叠
          * */
          const tempCollapseItems = this.state.tabs.length ? this.state.tabs.pop() : null;
          this.setState({
            tabs: this.state.tabs,
            activeTabId: this.state.tabs.length && this.state.tabs[this.state.tabs.length -1 ] .id,
            tabsCollapse: tempCollapseItems ? this.state.tabsCollapse.concat(tempCollapseItems) : this.state.tabsCollapse,
          });
        }
      } else if (this.tabsWrapper.offsetWidth - this.tabsLeftWidth - this.tabsRightWidth > tabsLength) {
        const isSpace = (this.tabsWrapper.offsetWidth - this.tabsLeftWidth - this.tabsRightWidth -
          (this.state.tabs.length ? this.state.tabs.length -1 : 0) * this.tabIntervalWidth - tabsLength) > this.tabWidth;
        if (isSpace && this.state.tabsCollapse.length) {
          console.log('isSpace-2:' + isSpace);
          const tempTabsItems = this.state.tabsCollapse.length ? this.state.tabsCollapse.pop() : null;
          this.setState({
            tabsCollapse: this.state.tabsCollapse,
            activeTabId: tempTabsItems ? tempTabsItems.id : '',
            tabs: tempTabsItems ? this.state.tabs.concat(tempTabsItems) : this.state.tabs,
            showTabsCollapse: this.state.tabsCollapse.length ? this.state.showTabsCollapse : 'none'
          });
        } else {
          console.log('isSpace-2:' + isSpace);
          // 新增时，空间不够，进行对tabs变更，实现思路和缩小时的原理一致,不同的是折叠的是第一个tab页
        }
      }
      this.offsetWidth = this.tabsWrapper.offsetWidth;
    }
  };

  createTab = (item) => {
    const { history } = this.props;
    history.replace(`/${item.id}`, {...(item.state || {})});
    const Com = this._initCom(item, this.props);
    const isExsitTabsItem = this.state.tabs && this.state.tabs
        .find(tabsItem => tabsItem.id === item.id);
    const isExsitCollapseItem = this.state.tabsCollapse && this.state.tabsCollapse
        .find(collapseItem => collapseItem.id === item.id);
    if (isExsitTabsItem && !isExsitCollapseItem) {
      this.setState({
        activeTabId: item.id,
      });
    } else if (isExsitCollapseItem && !isExsitTabsItem) {
      this._selectTabCollapse({...item, Com: Com});
    } else {
      // 新增的时候，当空间不够的时候，应该将第一个tab折叠起来，将新增的tab排列到末尾
      if (this._isExistSpaceIfAdd()) {
        this.setState({
          tabs: this.state.tabs.concat({...item, Com: Com}),
          activeTabId: item.id,
        });
      }
      else {
        const tempCollapseItems = this.state.tabs.length ? this.state.tabs.shift() : null;
        this.setState({
          tabs: this.state.tabs.concat({...item, Com: Com}),
          activeTabId: item.id,
          tabsCollapse: tempCollapseItems ? this.state.tabsCollapse.concat(tempCollapseItems) : this.state.tabsCollapse,
        });
      }
    }
  };

  _isExistSpaceIfAdd = () => {
    if (this.tabsWrapper) {
      const tabsLength = (this.state.tabs.length + 1) * (this.tabWidth + this.tabIntervalWidth);
      return this.tabsWrapper.offsetWidth - this.tabsLeftWidth - this.tabsRightWidth > tabsLength;
    }
  };

  _closeAllTabs = () => {
    let allMenus = [];
    depthFirstSearch(this.props.data, (menuItem) => {
      allMenus.push(menuItem);
    });
    const indexMenu = allMenus.filter(menuItem => (menuItem.id === 'Home' || menuItem.id === '00'))[0];
    // 置空并且重新生成默认页
    this.setState({ tabs: [] }, () => {
      this.createTab(indexMenu);
    });
  };

  _closeOtherTabs = () => {
    if (!this.state.activeTabId) {
      Notify.info({
        description: '当前没有可用的tab',
        duration: 3,
      });
    }
    const finalTabs = this.state.tabs && this.state.tabs.filter(tabItems => tabItems.id ===
      this.state.activeTabId);
    this.setState({
      tabs: finalTabs,
      activeTabId: finalTabs[0].id,
    }, this._clickTab(finalTabs[0]));
  };

  _deleteTab = (e, isDeteleTab) => {
    e.preventDefault();    // 阻止默认事件
    e.stopPropagation();   // 阻止事件冒泡
    const finalTabs =  this.state.tabs && this.state.tabs.filter(tabItems => tabItems.id !==
      isDeteleTab.id);
    if (!this.state.tabsCollapse.length) {
      // tabsCollapse为零，没有折叠起来的tab
      if (this.state.activeTabId === isDeteleTab.id) {
        // 删除的是当前显示的tab,并且没有折叠起来的tab
        // 获取当前删除当前页的索引
        const deleteIndex = this.state.tabs && this.state.tabs.findIndex(tabItem => tabItem.id ===
          isDeteleTab.id);
        const nextShowIndex = deleteIndex - 1 >= 0 ? deleteIndex - 1 : 0;
        const lastTabsNumber = this.state.tabs.length;
          this.setState({
          tabs: finalTabs,
        }, lastTabsNumber > 1 ? this._clickTab(finalTabs[nextShowIndex]) : this._closeAllTabs());
      } else {
        // 删除的不是当前显示的tab,并且没有折叠起来的tab
        this.setState({
          tabs: finalTabs,
        });
      }
    } else {
      // 有折叠起来的，删除并且进行展开
      //  将折叠项展开到tabs中
      const tempTabsItems = this.state.tabsCollapse.length ? this.state.tabsCollapse.pop() : null;
      if (this.state.activeTabId === isDeteleTab.id) {
        // 删除的是当前显示的tab,并且有折叠起来的tab
        // 获取当前删除页的索引
        const deleteIndex = this.state.tabs && this.state.tabs.findIndex(tabItem => tabItem.id ===
          isDeteleTab.id);
        // 设置下一个显示页的索引
        const nextShowIndex = deleteIndex - 1 >= 0 ? deleteIndex - 1 : 0;
        this.setState({
          tabs: tempTabsItems ? finalTabs.concat(tempTabsItems) : finalTabs,
          tabsCollapse: this.state.tabsCollapse,
          showTabsCollapse: this.state.tabsCollapse.length ? this.state.showTabsCollapse : 'none'
        }, this._clickTab(finalTabs[nextShowIndex]));
      } else {
        // 删除的不是当前显示的tab,并且有折叠起来的tab
        this.setState({
          tabs: tempTabsItems ? finalTabs.concat(tempTabsItems) : finalTabs,
          tabsCollapse: this.state.tabsCollapse,
          showTabsCollapse: this.state.tabsCollapse.length ? this.state.showTabsCollapse : 'none'
        });
      }
    }
  };

  _refreshTab = () => {
    this.setState({
      refresh: !this.state.refresh
    })
  };

  _clickTab = (currentTabItem) => {
    const { activeTabId } = this.state;
    if (activeTabId !== currentTabItem.id) {
      const {history} = this.props;
      history.replace(`/${currentTabItem.id}`, {...(currentTabItem.state || {})});
      this.setState({
        activeTabId: currentTabItem.id,
        isCollapse: false
      });
    }
  };

  _dropHiddenDown = () => {
    if (!this.state.tabsCollapse.length) {
      Notify.info({
        description: '没有折叠起来的tab页',
        duration: 3,
      });
      return;
    }
    this.setState({
      showTabsCollapse: this.state.showTabsCollapse === 'list-item' ? '' : 'list-item',
      showOperateCollapse: this.state.showOperateCollapse === 'list-item' ? 'none' : 'none'
    });
  };

  _selectTabCollapse = (collapseItem) => {
    const tempTab = this.state.tabs.shift();
    const tempCollapse = this.state.tabsCollapse
      .filter(tabsCollapseItem => collapseItem.id !== tabsCollapseItem.id);
    const { history } = this.props;
    history.replace(`/${collapseItem.id}`, {...(collapseItem.state || {})});
    this.setState({
      tabs: this.state.tabs.concat(collapseItem),
      activeTabId: collapseItem.id,
      tabsCollapse: [...tempCollapse, tempTab],
      isCollapse: true
    });
  };

  _deleteTabCollapse = (e, collapseItem) => {
    e.preventDefault();    // 阻止默认事件
    e.stopPropagation();   // 阻止事件冒泡
    this.setState({
      tabsCollapse: this.state.tabsCollapse
        .filter(tabsCollapseItem => collapseItem.id !== tabsCollapseItem.id),
    });
    return false;
  };

  _sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      // const ghostClass = ;
      const options = {
        animation: 150,
        draggable: 'li', // Specifies which items inside the element should be sortable
        // group: "shared",
        ghostClass: 'rc-draggable-attribute-ghost', // Class name for the drop placeholder
        chosenClass: 'rc-draggable-attribute-chosen',  // Class name for the chosen item
        dragClass: 'rc-draggable-attribute-drag',  // Class name for the dragging item
        onUpdate: (evt) => {
          console.log('onUpdate');
          // 处理拖动后的页面
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  _changesOperateCollapse = () => {
    this.setState({
      showOperateCollapse: this.state.showOperateCollapse === 'list-item' ? 'none' : 'list-item',
      showTabsCollapse: this.state.showTabsCollapse === 'list-item' ? 'none' : 'none',
    });
  };

  render() {
    const showTab = this.state.tabs && this.state.tabs.filter(activeTab => activeTab.id ===
      this.state.activeTabId);
    return (
      <div>
        <div className="ro-page-content-wrapper" id="ro-main-content">
          <div className="ro-page-content" id="ro-main-content-container">
            <div className="ro-main-tabs-container">
              <ul
                className="nav-tabs"
                id="nav-tabs"
                ref={this._sortableGroupDecorator}
              >
                {
                  this.state.tabs && this.state.tabs.map((tabItem) => {
                    let className = '';
                    if (this.state.activeTabId === tabItem.id) {
                      className = 'li-active';
                    }
                    return (
                      <TabPanel
                        key={tabItem.id}
                        tabItem={tabItem}
                        activeTabId={this.state.activeTabId}
                        className={className}
                        deleteTab={this._deleteTab}
                        clickTab={this._clickTab}
                        isCollapse={this.state.isCollapse}
                      />
                    );
                  })
                }
              </ul>
              <li
                className="dropdown pull-right ro-tabs-collapse"
              >
                <span className="roic-right-operate">
                   <Tooltip placement="topLeft" title={'打开更多...'}>
                     <span className="roic-more" onClick={this._dropHiddenDown} />
                   </Tooltip>
                   <Tooltip placement="topRight" title={'展开关闭操作列表'}>
                     <Icon type="double-right" className="" onClick={this._changesOperateCollapse} />
                   </Tooltip>
                </span>
                <ul
                  style={{ display: this.state.tabsCollapse.length ? this.state.showTabsCollapse : 'none' }}
                  id="ro-nav-tabs-collapse"
                  className="ro-nav-tabs-collapse"
                >
                  {
                    this.state.tabsCollapse.length &&
                    this.state.tabsCollapse && this.state.tabsCollapse.map((collapseItems) => {
                      return(
                        <span className="span-no-wrap" key={`span${collapseItems.id}`}>
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
                <ul
                  style={{ display: this.state.showOperateCollapse }}
                  id="ro-nav-operate-collapse"
                  className="ro-nav-operate-collapse"
                >
                  <span className="operate-item" onClick={this._closeOtherTabs}>关闭其他</span>
                  <span className="operate-item" onClick={this._closeAllTabs}>关闭所有</span>
                </ul>
              </li>
              <ul className="pull-right dropdown-menu" id="ro-tabclose-container">
                <li className="menu-item">
                  <Tooltip placement="bottomRight" title={'刷新Tab页'}>
                    <Icon type="reload" onClick={this._refreshTab} />
                  </Tooltip>
                </li>
              </ul>
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
                {
                  <TabContent
                    refresh={this.state.refresh}
                    activeTabId={this.state.activeTabId}
                    tabs={this.state.tabs}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
