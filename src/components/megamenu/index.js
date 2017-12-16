import React from 'react';
import ReactDom from 'react-dom';
import { Icon } from 'antd';

import './style/index.less';
import menuData from '../../json/MenuData';

export default class MegaMenu extends React.Component {
  constructor(props) {
    super(props);
    this.dom = null;
    this.wrapper = null;
    this.menuWrapper = null;
    this.right = null;
    this.left = null;
    this.offsetWidth = 0;
  }
  componentDidMount() {
    /* eslint-disable */
    const { prefix = 'rc' } = this.props;
    this.dom = ReactDom.findDOMNode(this);
    this.right = Array.from(this.dom.children).filter(d => d.className === `${prefix}-nav-arrow-right`)[0];
    this.wrapper = Array.from(this.dom.children).filter(d => d.className === `${prefix}-nav-wrapper`)[0];
    this.left = Array.from(this.dom.children).filter(d => d.className === `${prefix}-nav-arrow-left`)[0];
    this.menuWrapper = Array.from(this.wrapper.children).filter(d => d.className === `${prefix}-nav-menu-wrapper`)[0];
    this.offsetWidth = this.wrapper.offsetWidth;
    this.checkWidth();
    window.onresize = () => {
      this.checkWidth();
    };
  }
  checkWidth = () => {
    if (this.wrapper) {
      if (this.wrapper.offsetWidth < this.wrapper.scrollWidth) {
        this.right.style.display = 'block';
      } else {
        this.right.style.display = 'none';
        const marginLeft = this._getValue(this.menuWrapper.style.marginLeft);
        if (marginLeft >= 0) {
          this.left.style.display = 'none';
        }
        if (this.left.style.display !== 'none' && this.offsetWidth < this.wrapper.offsetWidth) {
          const dValue = (marginLeft + (this.wrapper.offsetWidth - this.offsetWidth));
          if (dValue >= 0) {
            this.left.style.display = 'none';
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
  renderForthChildrenMenu = (children = []) => {
    return children.map(item => <li key={item.id}><span>{item.name}</span></li>)
  };
  renderThirdChildrenMenu = (children = [], prefix) => {
    return (
      <ul className={`${prefix}-child`}>
        {
          children.map(item => {
            if (item.children) {
              return <li key={item.id}>{
                <div>
                  <span onClick={(e) => this.thirdChildrenMenuShow(e, `${prefix}-child-children-container`)}>{item.name}</span>
                  <span className={`${prefix}-child-children-container-icon`}><Icon type="caret-right"/></span>
                  <div className={`${prefix}-child-children-container`}>
                    <ul className={`${prefix}-child-children`}>
                      {this.renderForthChildrenMenu(item.children)}
                    </ul>
                  </div>
                </div>
              }</li>
            }
            return <li key={item.id}><span>{item.name}</span></li>;
          })
        }
      </ul>
    );
  };
  renderSecondChildrenMenu = (children = [], prefix) => {
    return (
      <div className={`${prefix}-container`}>
        <div className={`${prefix}-container-wrapper`}>
          {
            children.map(child => {
              return (<div key={child.id} >
                <div className={`${prefix}-container-wrapper-item`}>
                  <div className={`${prefix}-container-wrapper-item-menu`}>
                    <Icon type="pay-circle" className={`${prefix}-container-wrapper-item-menu-icon`} />
                    <span className={`${prefix}-container-wrapper-item-menu-name`}>{child.name}</span>
                  </div>
                </div>
                <div>
                  {this.renderThirdChildrenMenu(child.children, `${prefix}-container-wrapper-item`)}
                </div>
              </div>);
            })
          }
        </div>
      </div>
    );
  };
  changeSecondChildrenMenu = (e, prefix, status) => {
    const menu = e.currentTarget;
    const secondMenu = Array.from(menu.children).filter(dom => dom.className === prefix)[0];
    if (secondMenu) {
      secondMenu.style.display = status;
    }
  };
  renderMenu = (prefix) => {
    return (
      <div className={`${prefix}-menu-container`}>
        {menuData.body.map((menu) => {
        return (
          <div
            className={`${prefix}-menu`}
            key={menu.name}
            onMouseOver={(e) => this.changeSecondChildrenMenu(e, `${prefix}-menu-children`, 'block')}
            onMouseLeave={(e) => this.changeSecondChildrenMenu(e, `${prefix}-menu-children`, 'none')}
          >
            <Icon type="pay-circle" className={`${prefix}-menu-icon`} />
            <span className={`${prefix}-menu-name`}>{menu.name}</span>
            <div className={`${prefix}-menu-children`}>
              {this.renderSecondChildrenMenu(menu.children, `${prefix}-menu-children`)}
            </div>
          </div>);
      })}
      </div>);
  };
  _getValue = (data) => {
    return parseFloat(data.split('px')[0] || 0, 10);
  };
  _moveRight = () => {
    const marginLeft = this._getValue(this.menuWrapper.style.marginLeft);
    const dValue = this.wrapper.scrollWidth - this.wrapper.offsetWidth + marginLeft;
    if (dValue <= 0) {
      this.menuWrapper.style.marginLeft = marginLeft + (this.wrapper.offsetWidth - this.wrapper.scrollWidth) + 'px';
      this.right.style.display = 'none';
    } else if (dValue > this.wrapper.offsetWidth) {
      this.menuWrapper.style.marginLeft = (-(marginLeft + this.wrapper.offsetWidth)) + 'px';
    } else {
      this.menuWrapper.style.marginLeft = (marginLeft - dValue) + 'px';
      this.right.style.display = 'none';
    }
    this.left.style.display = 'block';
  };
  _moveLeft = () => {
    const marginLeft = this._getValue(this.menuWrapper.style.marginLeft);
    const dValue = this.wrapper.scrollWidth - this.wrapper.offsetWidth + marginLeft;
    if (dValue + this.wrapper.offsetWidth < 0) {
      this.menuWrapper.style.marginLeft = (marginLeft + this.wrapper.offsetWidth) + 'px';
    } else {
      this.menuWrapper.style.marginLeft = '0px';
      this.left.style.display = 'none';
    }
    this.right.style.display = 'block';
  };
  render() {
    const { prefix = 'rc' } = this.props;
    return (
      <div className={`${prefix}-nav-container`}>
        <div className={`${prefix}-navbar-logo`}>
          <Icon type="taobao-circle" />
        </div>
        <div className={`${prefix}-nav-arrow-left`}><Icon type="left" onClick={this._moveLeft}/></div>
        <div className={`${prefix}-nav-wrapper`}>
          <div className={`${prefix}-nav-menu-wrapper`}>
            {this.renderMenu(prefix)}
          </div>
        </div>
        <div className={`${prefix}-nav-arrow-right`}><Icon type="right" onClick={this._moveRight}/></div>
        <div className={`${prefix}-nav-right`}>aaaa</div>
      </div>
    );
  }
}
