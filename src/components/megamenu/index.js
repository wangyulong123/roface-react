import React from 'react';
import ReactDom from 'react-dom';
import { Icon, Tabs, Input, Button, Form } from '../index';

import './style/index.less';
import { getUserMenuList } from '../../lib/base';
import { addOnResize } from '../../lib/listener';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class MegaMenu extends React.Component {
    constructor(props) {
        super(props);
        this.dom = null;
        this.wrapper = null;
        this.menuWrapper = null;
        this.right = null;
        this.left = null;
        this.offsetWidth = 0;
        this.tag = null;
        this.state = {
            menuData: [],
            dropDownState: 'top',
            dropDownBox: 'none',
        };
    }
    componentDidMount() {
        /* eslint-disable */
        const { prefix = 'ro', dataMount } = this.props;
        this.dom = ReactDom.findDOMNode(this);
        this.right = Array.from(this.dom.children[0].children).filter(d => d.className === `${prefix}-nav-arrow-right`)[0];
        this.wrapper = Array.from(this.dom.children[0].children).filter(d => d.className === `${prefix}-nav-wrapper`)[0];
        this.left = Array.from(this.dom.children[0].children).filter(d => d.className === `${prefix}-nav-arrow-left`)[0];
        this.menuWrapper = Array.from(this.wrapper.children).filter(d => d.className === `${prefix}-nav-menu-wrapper`)[0];
        this.offsetWidth = this.wrapper.offsetWidth;
        this.checkWidth();
        addOnResize(this.checkWidth);
        getUserMenuList().then(res => {
            const dataSource = this.removeLevelMore(this.flatToTree(res).data);
            dataMount && dataMount(dataSource);
            this.setState({
                menuData: dataSource,
            });
        });
        document.onclick = this._closeDropDown;
        const tags = document.querySelectorAll('.' + prefix + '-personal-box');
       if (tags.length > 0) {
            this.tag = tags[tags.length - 1];
            window.addEventListener('click', this._executeCb);
       }
    }

    _executeCb = e => {
        if (this.tag && this.tag.compareDocumentPosition(e.target) === 20) {
            this._openDropDown();
        }
    };
    _menuClick = (e, item) => {
        e.stopPropagation();
        const { menuClick, prefix = 'ro', history } = this.props;
        menuClick && menuClick(item, history);
        // this.changeSecondChildrenMenu(e, `${prefix}-menu-children`, 'none')
        const childrenMenu = document.getElementsByClassName(`${prefix}-menu-children`);
        Array.from(childrenMenu).forEach(menu => {
          if (menu.style.display !== 'none') {
            menu.style.display = 'none';
          }
        })
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
        return children.map(item => <li key={item.id} onClick={(e) => this._menuClick(e, item)}><span>{item.name}</span></li>)
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
                        return <li key={item.id} onClick={(e) => this._menuClick(e, item)}><span>{item.name}</span></li>;
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
                                    <div className={`${prefix}-container-wrapper-item-menu`} onClick={(e) => this._menuClick(e, child)}>
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
    _dropDownBox = e => {
        const { dropDownState, dropDownBox } = this.state;
        if (dropDownState === 'down') {
            this.setState({
                dropDownState: 'top',
                dropDownBox: 'none',
            });
        } else {
            this.setState({
                dropDownState: 'down',
                dropDownBox: 'block',
            });
        }
        e.nativeEvent.stopImmediatePropagation();
    };
    _closeDropDown = () => {
        const { dropDownState, dropDownBox } = this.state;
        this.setState({
            dropDownState: 'top',
            dropDownBox: 'none',
        });
    };
    _openDropDown = () => {
        const { dropDownState, dropDownBox } = this.state;
        this.setState({
            dropDownState: 'down',
            dropDownBox: 'block',
        });
    };
    informationTabPane = (prefix, getFieldDecorator) => {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol:{ span: 15, offset: 1 },
        };
        return (
            <div className={`${prefix}-tabPane1`}>
                <div className={`${prefix}-tabPane1-portrait`}>
                    <span className={`${prefix}-tabPane1-portrait-icon`} />
                    <span className={`${prefix}-tabPane1-portrait-tooltip`}>更新头像</span>
                </div>
                <div className={`${prefix}-tabPane1-register`}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="账户"
                        >
                            {getFieldDecorator('account', {
                                rule: [
                                    {type: 'string'},
                                    {required: true, message: '请输入个人账户'}
                                ],
                            })(<Input placeholder="请输入用户账户" />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="昵称"
                        >
                            {getFieldDecorator('nickname', {
                                rule: [{type: 'string'}],
                            })(<Input placeholder="请输入用户昵称" />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                        >
                            {getFieldDecorator('email', {
                                rule: [{type: 'email'}],
                            })(<Input placeholder="请输入邮箱地址" />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电话"
                        >
                            {getFieldDecorator('phone', {
                                rule: [{type: 'number'}],
                            })(<Input placeholder="请输入联系方式" />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="其他"
                        >
                            {getFieldDecorator('other')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    };
    passwordTabPane = (prefix, getFieldDecorator) => {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol:{ span: 15, offset: 1 },
        };
        return (
            <div className={`${prefix}-tabPane2`}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="原密码"
                    >
                        {getFieldDecorator('oldPassword', {
                            rule: [{type: 'password'},{required: true}],
                        })(<Input type="password" placeholder="请输入原密码" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新密码"
                    >
                        {getFieldDecorator('newPasswod', {
                            rule: [{type: 'password'},{required: true}],
                        })(<Input type="password" placeholder="请输入新密码" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirmPassword', {
                            rule: [{type: 'password'},{required: true}],
                        })(<Input type="password" placeholder="请再输入一遍" />)}
                    </FormItem>
                </Form>
            </div>
        );
    };
    render() {
        const { prefix = 'ro' } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { dropDownBox, dropDownState } = this.state;
        return (
            <div className={`${prefix}-nav-container`}>
                <div className={`${prefix}-nav-left`}>
                    <div className={`${prefix}-navbar-logo`}>
                        <span className={`${prefix}-navbar-icon`} />
                    </div>
                    <div className={`${prefix}-nav-arrow-left`}><Icon type="left" onClick={this._moveLeft}/></div>
                    <div className={`${prefix}-nav-wrapper`}>
                        <div className={`${prefix}-nav-menu-wrapper`}>
                            {this.renderMenu(prefix)}
                        </div>
                    </div>
                    <div className={`${prefix}-nav-arrow-right`}><Icon type="right" onClick={this._moveRight}/></div>
                </div>
                <div className={`${prefix}-nav-right`}>
                    <span className={`${prefix}-right-items`}>
                        <span className={`${prefix}-personal-portrait`} />
                        <span className={`${prefix}-navRight-text`}>admin</span>
                        <span className={`${prefix}-personal-${dropDownState}`} onClick={this._dropDownBox} />
                        <div style={{ display: dropDownBox }} className={`${prefix}-personal-box`}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="个人信息" key="1">
                                    {this.informationTabPane(prefix, getFieldDecorator)}
                                </TabPane>
                                <TabPane tab="修改密码"  key="2">
                                    {this.passwordTabPane(prefix, getFieldDecorator)}
                                </TabPane>
                            </Tabs>
                            <span className={`${prefix}-personal-box-downLine`} />
                            <div className={`${prefix}-personal-box-button`}>
                                <Button>取消</Button>
                                <Button type="primary">保存</Button>
                            </div>
                        </div>
                    </span>
                    <span className={`${prefix}-vertical-line`} />
                    <span className={`${prefix}-right-items`}>
                        <span className={`${prefix}-personal-information`} />
                        <span className={`${prefix}-personal-information-prompt ${prefix}-navRight-text`}>消息中心</span>
                    </span>
                    <span className={`${prefix}-vertical-line`} />
                    <span className={`${prefix}-right-items`}>
                        <span className={`${prefix}-personal-quit`} />
                        <span className={`${prefix}-navRight-text`}>退出</span>
                    </span>
                </div>
            </div>
        );
    }
}
export default MegaMenu = Form.create()(MegaMenu);