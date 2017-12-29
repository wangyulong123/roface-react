import React from 'react';
import {Button,Icon, Message,Dropdown, Divider,Menu} from '../../../../src/components';

const ButtonGroup = Button.Group;

export default class ButtonCase extends React.Component {

    render() {
        return (
            <div style={{margin: '15px'}}>
                <Divider>基础按钮</Divider>
                <div>
                    <div>
                        <Button>默认按钮</Button>
                        <Button type="primary">主要按钮</Button>
                        <Button type="dashed">虚线按钮</Button>
                        <Button type="danger">易冲动的按钮</Button>
                    </div>
                </div>

                <Divider>带图标的按钮</Divider>
                <div>
                    <div>
                        <Button type="primary" shape="circle" icon="search"/>
                        <Button type="primary" icon="search">搜索</Button>
                        <br/>
                        <Button shape="circle" icon="search"/>
                        <Button icon="search">搜索</Button>
                    </div>

                </div>

                <Divider>分组的按钮</Divider>
                <div>
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left" />后退
                        </Button>
                        <Button type="primary">
                            前进<Icon type="right" />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type="primary" icon="cloud" />
                        <Button type="primary" icon="cloud-download" />
                    </ButtonGroup>

                </div>
                <Divider>下拉按钮</Divider>
                <div>
                    <Dropdown.Button overlay={
                        <Menu>
                            <Menu.Item>默认</Menu.Item>
                            <Menu.Item>延迟5秒自动关闭</Menu.Item>
                        </Menu>
                    }>
                        提示
                    </Dropdown.Button>
                </div>
            </div>

        );
    }
}

