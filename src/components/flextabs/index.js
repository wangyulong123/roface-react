import React from 'react';
import ReactDom from 'react-dom';
// import { Route } from 'react-router-dom';
import Sortable from 'sortablejs';
import { Icon, Notification, Tooltip } from '../index';
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
    // this.minHeight = '10px';
    this.state = {
      tabs: [],
      tabsCollapse: [],
      showTabsCollapse: 'none',
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
    this.tabsWrapper = Array.from(this.dom.children).filter(d => d.className === `ro-page-content-wrapper`)[0];
    this.offsetWidth = this.tabsWrapper.offsetWidth;

    this.checkWidth();
    const _this = this;
    addOnResize(this.checkWidth);
    // addOnResize(function () {
    //   _this.minHeight = (document.documentElement.clientHeight * 9 / 20) + 'px';
    // });
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const pathname = history.location && history.location.pathname && history.location.pathname.substr(1);
    if (!this.props.data.length && !this.state.tabs.length && nextProps.data.length && pathname) {
      let allMenus = [];
      depthFirstSearch(nextProps.data, (menuItem) => {
        allMenus.push(menuItem);
      });
      const initTab = allMenus.filter(menuItem => menuItem.id === pathname)[0];
      const indexMenu = allMenus.filter(menuItem => menuItem.id === '00')[0];
      this._createTab(initTab ? initTab : indexMenu);
    }
  }


  checkWidth = () => {
    if (this.tabsWrapper) {
      const tabsLength = this.state.tabs.length * (this.tabWidth + 2);
      if (this.tabsWrapper.offsetWidth - 5 - 42 < tabsLength) {
        const isSpace = (this.tabsWrapper.offsetWidth - 5 - 41 - (this.state.tabs.length) * 2 - tabsLength) > this.tabWidth;
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
      } else if (this.tabsWrapper.offsetWidth - 5 - 41 > tabsLength) {
        const isSpace = (this.tabsWrapper.offsetWidth - 5 - 41 -
          (this.state.tabs.length ? this.state.tabs.length -1 : 0) * 2 - tabsLength) > this.tabWidth;
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

  _createTab = (item) => {
    // this.checkWidth();
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
      // 新增的时候，当空间不够的时候，应该将第一个tab折叠起来，将新增的tab排列到末尾
      if (this._isExistSpaceIfAdd()) {
        this.setState({
          tabs: this.state.tabs.concat(item),
          activeTabId: item.id,
        });
      }
      else {
        const tempCollapseItems = this.state.tabs.length ? this.state.tabs.shift() : null;
        this.setState({
          tabs: this.state.tabs.concat(item),
          activeTabId: item.id,
          tabsCollapse: tempCollapseItems ? this.state.tabsCollapse.concat(tempCollapseItems) : this.state.tabsCollapse,
        });
      }
    }
    // this.checkWidth();
  };

  _isExistSpaceIfAdd = () => {
    if (this.tabsWrapper) {
      const tabsLength = (this.state.tabs.length + 1) * (this.tabWidth + 2);
      return this.tabsWrapper.offsetWidth - 5 - 42 > tabsLength;
    }
  };

  _closeAllTabs = () => {
    this.setState({ tabs: [] });
  };

  _closeOtherTabs = () => {
    if (!this.state.activeTabId) {
      Notification.info({
        description: '当前没有可用的tab',
        duration: 3,
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
      Notification.info({
        description: '没有折叠起来的tab页',
        duration: 3,
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
    e.stopPropagation();
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
          // const originFields = this.props.dataSource.filter(item => (this.state.show || (item.operator === false)) &&
          // (item.name && item.name.includes(this.state.value)));
          // const { newIndex, oldIndex } = evt;
          // const newName = originFields[newIndex].name;
          // const oldName = originFields[oldIndex].name;
          // const tempOldIndex = this.props.entityAllFields.findIndex((field) => field.name === oldName);
          // const tempNewIndex = this.props.entityAllFields.findIndex((field) => field.name === newName);
          // const finalFields = [...this.props.entityAllFields];
          // const olderField = finalFields.splice(tempOldIndex, 1)[0];
          // finalFields.splice(tempNewIndex, 0, olderField);

         // this.props.onUpdateProperties(finalFields, 'sort');
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  render() {
    const showTab = this.state.tabs && this.state.tabs.filter(activeTab => activeTab.id ===
      this.state.activeTabId);
    const { renderComponent } = this.props;

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
                   <Tooltip placement="leftTop" title={'打开更多...'}>
                     <span className="roic-more" onClick={this._dropHiddenDown} />
                   </Tooltip>
                   <Tooltip placement="leftTop" title={'关闭其他...'}>
                     <span className="roic-close-others" onClick={this._closeOtherTabs} />
                   </Tooltip>
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
                {
                  <TabContent
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
