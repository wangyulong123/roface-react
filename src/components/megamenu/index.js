import React from 'react';
import ReactDom from 'react-dom';
import { Icon, Modal } from '../index';
import MenuChildren from './MenuChildren';

import './style/index.less';
import { getUserMenuList } from '../../lib/base';
import { addOnResize } from '../../lib/listener';

export default class MegaMenu extends React.Component {
  constructor(props) {
    super(props);
    this.logo = null;
    this.dom = null;
    this.wrapper = null;
    this.menuWrapper = null;
    this.right = null;
    this.left = null;
    this.offsetWidth = 0;
    this.moveWidth = 210;
    this.state = {
      menuData: [],
    };
  }
  componentDidMount() {
    /* eslint-disable */
    const { prefix = 'ro', dataMount, logoIcon } = this.props;
    this.dom = ReactDom.findDOMNode(this);
    this.logo = Array.from(Array.from(this.dom.children).filter(d => d.className === `${prefix}-navbar-logo`)[0].children).filter(item => item.className === `${prefix}-navbar-icon`);
    this.right = Array.from(this.dom.children).filter(d => d.className === `${prefix}-nav-arrow-right`)[0];
    this.wrapper = Array.from(this.dom.children).filter(d => d.className === `${prefix}-nav-wrapper`)[0];
    this.left = Array.from(this.dom.children).filter(d => d.className === `${prefix}-nav-arrow-left`)[0];
    this.menuWrapper = Array.from(this.wrapper.children).filter(d => d.className === `${prefix}-nav-menu-wrapper`)[0];
    this.offsetWidth = this.wrapper.offsetWidth;
    this.logo[0].style.background = `url(${logoIcon}) 0% 0% / 100% 100% no-repeat`;
    addOnResize(this.checkWidth, true);
    getUserMenuList().then(res => {
      const dataSource = this.removeLevelMore(this.flatToTree(res).data);
      dataMount && dataMount(dataSource);
      this.setState({
        menuData: dataSource,
      }, () => {
        this.checkWidth();
      });
    }).catch(e => {
      Modal.error({
        title: '获取菜单列表失败',
        content: JSON.stringify(e)
      })
    });
  }
  _menuClick = (e, item) => {
    e.stopPropagation();
    if (!item.children || item.children.length === 0) {
      const { menuClick, prefix = 'ro', history } = this.props;
      menuClick && menuClick(item, history);
      // this.changeSecondChildrenMenu(e, `${prefix}-menu-children`, 'none')
      const childrenMenu = document.getElementsByClassName(`${prefix}-menu-children`);
      Array.from(childrenMenu).forEach(menu => {
        if (menu.style.display !== 'none') {
          menu.style.display = 'none';
        }
      })
    }
  };
  flatToTree = (data, params) => {
    /*
    * data: 要转换到树形结构的数据，type=array
    * params: 树形结构中节点的命名，type=object
    * return: { data, params }:树结构和节点命名形式
    * */
    const menuMap = {};
    const menuData = data.slice(0);
    params = {
      sortCodeName: params && params.sortCodeName ? params.sortCodeName : 'sortCode',
      parentName: params && params.parentName ? params.parentName : 'parent',
      childrenName: params && params.childrenName ? params.childrenName : 'children',
      levelName: params && params.levelName ? params.levelName : 'level'
    };

    menuData.slice(0).map(function(item){
      if (Object.keys(item).includes(params.sortCodeName)) {
        menuMap[item[params.sortCodeName]] = item;
      } else {
        console.log(item.id + '--缺少sortCode');
      }
    });

    for(let id in menuMap){
      const item = menuMap[id],
        codes = item[params.sortCodeName].trim().split('-'),
        parent = menuMap[codes.slice(0,codes.length - 1).join('-')] || null;
      if(parent){
        parent[params.childrenName] = parent[params.childrenName] || [];
        item[params.parentName] = parent;
        parent[params.childrenName].push(item);
      }
      item[params.levelName] = codes.length;
    }
    return { data: data, params: params };
  };
  removeLevelMore = (treeData, params) => {
    /*
    * 保留层级为1的树结构
    * treeData：树结构,type=array
    * */
    params = {
      sortCodeName: params && params.sortCodeName ? params.sortCodeName : 'sortCode'
    };
    const tempTreeData = treeData.slice(0);
    return tempTreeData.filter((menuItem) => {
      const sortCodeItems = menuItem[params.sortCodeName] && menuItem[params.sortCodeName].split('-');
      return sortCodeItems && sortCodeItems.length === 1;
    });
  };
  checkWidth = () => {
    if (this.wrapper) {
      if (this.wrapper.offsetWidth < this.wrapper.scrollWidth) {
        this.right.children[0].style.display = 'block';
      } else {
        this.right.children[0].style.display = 'none';
        const marginLeft = this._getValue(this.menuWrapper.style.marginLeft);
        if (marginLeft >= 0) {
          this.left.children[0].style.display = 'none';
        }
        if (this.left.children[0].style.display !== 'none' && this.offsetWidth < this.wrapper.offsetWidth) {
          const dValue = (marginLeft + (this.wrapper.offsetWidth - this.offsetWidth));
          if (dValue >= 0) {
            this.left.children[0].style.display = 'none';
          }
          this.menuWrapper.style.marginLeft = (dValue >= 0 ? 0 : dValue) + 'px';
        }
      }
      this.offsetWidth = this.wrapper.offsetWidth;
    }
  };
  thirdChildrenMenuShow = (e, prefix) => {
    const dom = e.currentTarget.parentNode;
    const ul = Array.from(dom.children).filter(item => item.className === prefix)[0];
    const icon = Array.from(dom.children).filter(item => item.className === prefix + '-icon')[0];
    if (ul) {
      const display = getComputedStyle(ul).display;
      ul.style.display = display === 'none' ? 'block' : 'none';
      icon.style.transform = display === 'none' ? 'rotate(90deg)' : 'rotate(0deg)';
    }
  };
  changeSecondChildrenMenu = (e, prefix, status) => {
    const menu = e.currentTarget;
    const secondMenu = Array.from(menu.children).filter(dom => dom.className === prefix)[0];
    if (secondMenu) {
      secondMenu.style.display = status;
      secondMenu.style.width = this.menuWrapper.clientWidth + 'px';
    }
  };
  renderMenu = (prefix) => {
    const { menuData } = this.state;
    return (
      <div className={`${prefix}-menu-container`}>
        {menuData.map((menu) => {
          return (
            <div
              onClick={(e) => this._menuClick(e, menu)}
              className={`${prefix}-menu`}
              key={menu.name}
              onMouseOver={(e) => this.changeSecondChildrenMenu(e, `${prefix}-menu-children`, 'block')}
              onMouseLeave={(e) => this.changeSecondChildrenMenu(e, `${prefix}-menu-children`, 'none')}
            >
              <Icon type="pay-circle" className={`${prefix}-menu-icon`} />
              <span className={`${prefix}-menu-name`}>{menu.name}</span>
              <MenuChildren prefix={prefix} menu={menu} menuClick={this._menuClick}/>
            </div>);
        })}
      </div>);
  };
  _getValue = (data) => {
    return parseFloat(data.split('px')[0] || 0, 10);
  };
  _moveRight = () => {
    this.rightWidth = this.wrapper.scrollWidth - this.wrapper.offsetWidth;
    const marginLeft = this._getValue(this.menuWrapper.style.marginLeft);
    const dValue = - this.rightWidth + this.moveWidth;
    if (dValue < 0) {
      this.menuWrapper.style.marginLeft = marginLeft - this.moveWidth + 'px';
    } else {
      this.menuWrapper.style.marginLeft = - this.rightWidth + marginLeft + 'px';
      this.right.children[0].style.display = 'none';
    }
    this.left.children[0].style.display = 'block';
  };
  _moveLeft = () => {
    const marginLeft = this._getValue(this.menuWrapper.style.marginLeft);
    this.rightWidth = this.wrapper.scrollWidth - this.wrapper.offsetWidth;
    const dValue = this.moveWidth + marginLeft;
    if (dValue <= 0) {
      this.menuWrapper.style.marginLeft = (marginLeft + this.moveWidth) + 'px';
    } else {
      this.menuWrapper.style.marginLeft = '0px';
      this.left.children[0].style.display = 'none';
    }
    this.right.children[0].style.display = 'block';
  };
  render() {
    const { prefix = 'ro', NavRight } = this.props;
    return (
      <div className={`${prefix}-nav-container`}>
        <div className={`${prefix}-navbar-logo`}>
          <span className={`${prefix}-navbar-icon`} />
        </div>
        <div className={`${prefix}-nav-arrow-left`}><Icon type="left" onClick={this._moveLeft} /></div>
        <div className={`${prefix}-nav-wrapper`}>
          <div className={`${prefix}-nav-menu-wrapper`}>
            {this.renderMenu(prefix)}
          </div>
        </div>
        <div className={`${prefix}-nav-arrow-right`}><Icon type="right" onClick={this._moveRight}/></div>
        <NavRight />
      </div>
    );
  }
}