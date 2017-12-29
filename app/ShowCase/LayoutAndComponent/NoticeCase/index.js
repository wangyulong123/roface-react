import React from 'react';
import {Dropdown, Button} from 'antd';
import {message, Icon, Menu} from '../../../../src/components';

export default class NoticeCase extends React.Component {
    openNotificationWithIcon = (type) => {
        message[type]('abcd');
    };

    openMessage = (i, msg) => {
        switch (i) {
            case 1:
                message.info(msg);
                break;
            default:
                message.info(msg);
                break;
        }
    };

    render() {
        const btnMessageList = (
            <Menu>
                <Menu.Item>
                    <a target='_blank' rel='noopener noreferrer' href='http://www.alipay.com/'>1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target='_blank' rel='noopener noreferrer' href='http://www.taobao.com/'>2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>3rd menu item</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <Button onClick={() => this.openMessage(0, '这是一段提示')}>默认(info)</Button>
                <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
                <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
                <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
                <Dropdown.Button overlay={
                    <Menu>
                        <Menu.Item><a href="#" onClick={() => this.openMessage(0, '默认消息提示')}>默认</a></Menu.Item>
                        <Menu.Item><a href="#" onClick={() => this.openMessage(0, '延迟5秒关闭')}>延迟5秒自动关闭</a></Menu.Item>
                    </Menu>
                }>提示</Dropdown.Button>
            </div>
        );
    }
}

