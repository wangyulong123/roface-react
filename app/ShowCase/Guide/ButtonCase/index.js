import React from 'react';
import {Button, Icon, Message, Divider, Menu} from '../../../../src/components';
import {Dropdown} from 'antd';

const ButtonGroup = Button.Group;

export default class ButtonCase extends React.Component {

    render() {
        return (
            <div style={{margin: '15px'}}>
                <Divider>基础按钮</Divider>
                <div>
                    <div>
                        <Button>默认按钮</Button>
                        <Divider type="vertical" />
                        <Button type="primary">主要按钮</Button>
                        <Divider type="vertical" />
                        <Button type="dashed">虚线按钮</Button>
                        <Divider type="vertical" />
                        <Button type="danger">易冲动的按钮</Button>
                    </div>
                </div>

                <Divider>带图标的按钮</Divider>
                <div>
                    <div>
                        <Button type="primary" shape="circle" icon="search"/>
                        <Divider type="vertical" />
                        <Button type="primary" icon="search">搜索</Button>
                        <br/>
                        <Button shape="circle" icon="search"/>
                        <Divider type="vertical" />
                        <Button icon="search">搜索</Button>
                    </div>

                </div>

                <Divider>分组的按钮</Divider>
                <div>
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left"/>后退
                        </Button>
                        <Button type="primary">
                            前进<Icon type="right"/>
                        </Button>
                    </ButtonGroup>
                    <Divider type="vertical" />
                    <ButtonGroup>
                        <Button type="primary" icon="cloud"/>
                        <Button type="primary" icon="cloud-download"/>
                    </ButtonGroup>

                </div>
                <Divider>下拉按钮</Divider>
                <div>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item>默认</Menu.Item>
                            <Menu.Item>延迟5秒自动关闭</Menu.Item>
                        </Menu>
                    }>
                        <Button>
                            按钮下拉菜单 <Icon type="down"/>
                        </Button>
                    </Dropdown>
                    <Divider type="vertical" />
                    <Dropdown.Button overlay={
                        <Menu>
                            <Menu.Item>默认</Menu.Item>
                            <Menu.Item>延迟5秒自动关闭</Menu.Item>
                        </Menu>
                    }>
                        分裂式按钮
                    </Dropdown.Button>

                </div>
            </div>

        );
    }
}

