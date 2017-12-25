import React from 'react';
import ReactDom from 'react-dom';

import { Icon } from '../index';
import {addOnResize} from '../../lib/listener';


export default class MenuChildren extends React.Component {
  constructor(props){
    super(props);
    this.height = 100;
    this.flag = true;
  }
  componentDidMount(){
    /* eslint-disable */
    this.dom = ReactDom.findDOMNode(this);
    this._setComHeight();
    addOnResize(() => {
      if (this.flag) {
        this.flag = false;
        setTimeout(() => {
          this._setComHeight();
          this.flag = true;
        }, 100)
      }
    })
  };
  _setComHeight = () => {
    this.dom.style.maxHeight = (document.documentElement.clientHeight - this.height) + 'px';
  };
  renderForthChildrenMenu = (children = []) => {
    const { menuClick } = this.props;
    return children.map(item => (
      <li key={item.id} onClick={e => menuClick(e, item)}><span>{item.name}</span></li>));
  };
  renderThirdChildrenMenu = (children = [], prefix) => {
    const { menuClick } = this.props;
    return (
      <ul className={`${prefix}-child`}>
        {
          children.map((item) => {
            if (item.children) {
              return (
                <li key={item.id}>{
                  <div>
                    <span onClick={e => this.thirdChildrenMenuShow(e, `${prefix}-child-children-container`)}>{item.name}</span>
                    <span className={`${prefix}-child-children-container-icon`}><Icon type="caret-right" /></span>
                    <div className={`${prefix}-child-children-container`}>
                      <ul className={`${prefix}-child-children`}>
                        {this.renderForthChildrenMenu(item.children)}
                      </ul>
                    </div>
                  </div>
                }
                </li>);
            }
            return (
              <li
                key={item.id}
                onClick={e => menuClick(e, item)}
              >
                <span>{item.name}</span>
              </li>);
          })
        }
      </ul>
    );
  };
  renderSecondChildrenMenu = (children = [], prefix) => {
    const { menuClick } = this.props;
    return (
      <div className={`${prefix}-container`}>
        <div className={`${prefix}-container-wrapper`}>
          {
            children.map((child) => {
              return (
                <div key={child.id} >
                  <div className={`${prefix}-container-wrapper-item`}>
                    <div className={`${prefix}-container-wrapper-item-menu`} onClick={e => menuClick(e, child)}>
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
  render() {
    const { prefix, menu } = this.props;
    return (
      <div className={`${prefix}-menu-children`}>
        {this.renderSecondChildrenMenu(menu.children, `${prefix}-menu-children`)}
      </div>);
  }
}
