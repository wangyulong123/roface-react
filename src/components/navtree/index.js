import React from 'react';
import { Menu, Icon, Modal, Switch } from '../index';

import { getUserMenuList } from '../../lib/base';
import { removeLevelMore, flatToTree } from '../../lib/menutransform';
// import { addOnResize } from '../../lib/listener';
import './style/index.less';

const { SubMenu } = Menu;

export default class NavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      theme: 'dark',
      menuData: [],
      flatMenuData: [],
      bgColor: '',
      collapsed: false,
    };
  }

  componentDidMount() {
    const { dataMount } = this.props;
    getUserMenuList().then((res) => {
      const dataSource = removeLevelMore(flatToTree(res).data);
      dataMount && dataMount(dataSource);
      this.setState({
        flatMenuData: res,
        menuData: dataSource,
        bgColor: '#001529',
      });
    }).catch((e) => {
      Modal.error({
        title: '获取菜单列表失败',
        content: JSON.stringify(e),
      });
    });
  }

  _menuClick = (e) => {
    // e.stopPropagation();
    if (e && e.key) {
      const { menuClick, history } = this.props;
      const item = this.state.flatMenuData.length && this.state.flatMenuData
          .find(menuItem => menuItem.id === e.key);
      menuClick && menuClick(item, history);
    }
  };
  _renderSencondMenu = (menu, prefix) => {
    if (menu.children) {
      return (
        <SubMenu
          // className={`${prefix}-container-menu-item-children`}
          key={menu.id}
          title={<span><span>{menu.name}</span></span>}
        >
          {menu.children.map(item => this._renderSencondMenu(item, prefix))}
        </SubMenu>
      );
    }
    return (
      <Menu.Item
        // className={`${prefix}-container-menu-item-children`}
        key={menu.id}
      >
        <span>{menu.name}</span>
      </Menu.Item>
    );
  }
  _renderMenu = (menu, prefix) => {
    if (menu.children) {
      return (
        <SubMenu
          // className={`${prefix}-container-menu-item`}
          key={menu.id}
          title={<span><Icon type="inbox" /><span>{menu.name}</span></span>}
        >
          {menu.children.map(item => this._renderSencondMenu(item, prefix))}
        </SubMenu>
      );
    }
    return (
      <Menu.Item
        // className={`${prefix}-container-menu-item`}
        key={menu.id}
      >
        <Icon type="inbox" />
        <span>{menu.name}</span>
      </Menu.Item>
    );
  };
  _changeMenuTheme = (value) => {
    if (value) {
      this.setState({
        theme: 'dark',
        bgColor: '#001529',
      });
    } else {
      this.setState({
        theme: 'light',
        bgColor: '',
      });
    }
  };
  _changeMenuMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  };
  _toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { menuData, bgColor, collapsed, mode, theme } = this.state;
    const { prefix = 'ro' } = this.props;
    return (
      <div className={`${prefix}-container`} style={{ background: bgColor }}>
        <div className={`${prefix}-container-logo`}>
          <span className={`${prefix}-container-logo-icon`} />
          <Icon
            className={`${prefix}-container-logo-collapsed`}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this._toggleCollapsed}
          />
        </div>
        <div className={`${prefix}-container-admin`}>
          <span className={`${prefix}-container-admin-img`} />
          <span className={`${prefix}-container-admin-container`}>
            <span className={`${prefix}-container-admin-container-name`}>admin</span>
            <span className={`${prefix}-container-admin-container-icon`}>
              <span className={`${prefix}-container-admin-container-icon-setup`}/>
              <span className={`${prefix}-container-admin-container-icon-line`} />
              <span className={`${prefix}-container-admin-container-icon-message`}/>
              <span className={`${prefix}-container-admin-container-icon-line`} />
              <span className={`${prefix}-container-admin-container-icon-quit`}/>
            </span>
          </span>
        </div>
        <div className={`${prefix}-container-menu`}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={mode}
            theme={theme}
            inlineCollapsed={collapsed}
            onClick={e => this._menuClick(e)}
          >
            {menuData.map(menu => this._renderMenu(menu, prefix))}
          </Menu>
        </div>
        <div className={`${prefix}-container-switch`}>
          <Switch
            unCheckedChildren='light'
            checkedChildren='dark'
            disabled
            onChange={this._changeMenuTheme}
          />
          <Switch
            unCheckedChildren='展开'
            checkedChildren='弹出'
            onChange={this._changeMenuMode}
          />
        </div>
      </div>
    );
  }
}
