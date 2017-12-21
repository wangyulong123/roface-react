import React from 'react';
import { Menu, Icon } from '../index';

const { SubMenu } = Menu;

export default class NavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      theme: 'light',
    };
  }
  _renderMenu = (menu) => {
    if (menu.children) {
      return (
        <SubMenu key={menu.id} title={<span><Icon type="inbox" /><span>{menu.name}</span></span>}>
          {menu.children.map(item => this._renderMenu(item))}
        </SubMenu>
      );
    }
    return <Menu.Item key={menu.id}><Icon type="inbox" /><span>{menu.name}</span></Menu.Item>;
  }
  render() {
    const { data = [] } = this.props;
    return (
      <div>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          {data.map(menu => this._renderMenu(menu))}
        </Menu>
      </div>
    );
  }
}
