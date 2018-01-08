import React from 'react';
import ReactDom from 'react-dom';
import { Menu, Icon, Modal } from '../index';

import { getUserMenuList } from '../../lib/base';
import { removeLevelMore, flatToTree } from '../../lib/menutransform';
// import { addOnResize } from '../../lib/listener';

const { SubMenu } = Menu;

export default class NavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      theme: 'light',
      menuData: [],
      flatMenuData: [],
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

  _renderMenu = (menu) => {
    if (menu.children) {
      return (
        <SubMenu
          key={menu.id}
          title={<span><Icon type="inbox" /><span>{menu.name}</span></span>}
        >
          {menu.children.map(item => this._renderMenu(item))}
        </SubMenu>
      );
    }
    return <Menu.Item key={menu.id}><Icon type="inbox" /><span>{menu.name}</span></Menu.Item>;
  };

  render() {
    const { menuData } = this.state;
    return (
      <div>
        <Menu
          style={{ overflowX: 'hidden', overflowY: 'auto', width: '256px', height: '100vh' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
          theme={this.state.theme}
          onClick={e => this._menuClick(e)}
        >
          {menuData.map(menu => this._renderMenu(menu))}
        </Menu>
      </div>
    );
  }
}
