import React from 'react';
import {Button, Icon, Message, Divider, Menu, Row, Col} from '../../../src/components/index';
import {Dropdown} from 'antd';

const ButtonGroup = Button.Group;

export default class ButtonCase extends React.Component {
    state = {
        loading: false,
    }
    /**
     * 改变按钮为加载中状态，1秒之后复原
     */
    enterLoading = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    }

    render() {
        return (
            <div style={{margin: '15px'}}>
                <Row>
                    <Col span={12} style={{padding: "10px"}}>
                        <fieldset>
                            <legend>基础按钮</legend>
                            <div>
                                <Button>默认按钮</Button>
                                <Divider type="vertical"/>
                                <Button type="primary">主要按钮</Button>
                                <Divider type="vertical"/>
                                <Button type="dashed">虚线按钮</Button>
                                <Divider type="vertical"/>
                                <Button type="danger">易冲动的按钮</Button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>带图标的按钮</legend>
                            <div>
                                <Button type="primary" shape="circle" icon="search"/>
                                <Divider type="vertical"/>
                                <Button type="primary" icon="search">搜索</Button>
                                <br/>
                                <Button shape="circle" icon="search"/>
                                <Divider type="vertical"/>
                                <Button icon="search">搜索</Button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>分组的按钮</legend>
                            <div>
                                <ButtonGroup>
                                    <Button>左</Button>
                                    <Button>中</Button>
                                    <Button>右</Button>
                                </ButtonGroup>

                                <Divider type="vertical"/>
                                <ButtonGroup>
                                    <Button type="primary">
                                        <Icon type="left"/>后退
                                    </Button>
                                    <Button type="primary">
                                        前进<Icon type="right"/>
                                    </Button>
                                </ButtonGroup>
                                <Divider type="vertical"/>
                                <ButtonGroup>
                                    <Button type="primary" icon="cloud"/>
                                    <Button type="primary" icon="cloud-download"/>
                                </ButtonGroup>

                            </div>
                        </fieldset>


                        <fieldset>
                            <legend>下拉按钮</legend>
                            <div>
                                <Dropdown overlay={
                                    <Menu>
                                        <Menu.Item>功能项1</Menu.Item>
                                        <Menu.Item>功能项2</Menu.Item>
                                    </Menu>
                                }>
                                    <Button>
                                        按钮拉菜单 <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                                <Divider type="vertical"/>
                                <Dropdown.Button overlay={
                                    <Menu>
                                        <Menu.Item>下拉按钮项1</Menu.Item>
                                        <Menu.Item>下拉按钮项2</Menu.Item>
                                        <Menu.Divider/>
                                        <Menu.Item key="3">下拉按钮项3</Menu.Item>
                                    </Menu>
                                }>
                                    分裂式按钮
                                </Dropdown.Button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>按钮大小及状态</legend>
                            <div>

                                <Dropdown.Button overlay={
                                    <Menu>
                                        <Menu.Item>下拉按钮项1</Menu.Item>
                                        <Menu.Item disabled>下拉按钮项2</Menu.Item>
                                        <Menu.Divider/>
                                        <Menu.Item key="3">下拉按钮项3</Menu.Item>
                                    </Menu>
                                }>
                                    部分不可用
                                </Dropdown.Button>
                                <Divider type="vertical"/>
                                <Dropdown disabled overlay={
                                    <Menu>
                                        <Menu.Item>功能项1</Menu.Item>
                                        <Menu.Item>功能项2</Menu.Item>
                                    </Menu>
                                }>
                                    <Button>
                                        下拉按钮 <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                                <Divider type="vertical"/>
                                <Dropdown.Button disabled overlay={
                                    <Menu>
                                        <Menu.Item>功能项1</Menu.Item>
                                        <Menu.Item>功能项2</Menu.Item>
                                    </Menu>
                                }>
                                    分裂下拉
                                </Dropdown.Button>
                                <Divider type="vertical"/>
                                <Button type="primary" disabled>主要按钮不可用</Button>
                            </div>
                        </fieldset>
                    </Col>
                    <Col span={12} style={{padding: "10px"}}>
                        <Divider>按钮大小</Divider>

                        <Button type="primary">默认大小</Button>
                        <Divider type="vertical"/>
                        <Button type="primary" size={'large'}>大按钮</Button>
                        <Divider type="vertical"/>
                        <Button type="primary" size={'default'}>默认按钮(SIZE默认值）</Button>
                        <Divider type="vertical"/>
                        <Button type="primary" size="small">小按钮</Button>

                        <Divider>按钮加载状态</Divider>
                        <Button type="primary" loading>加载中</Button>
                        <Divider type="vertical"/>
                        <Button icon={'play-circle'} type="primary" loading={this.state.loading}
                                onClick={this.enterLoading}>点击之后变成加载中</Button>

                    </Col>
                </Row>

            </div>

        );
    }
}

