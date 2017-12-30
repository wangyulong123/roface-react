import React from 'react';
import {Button, Icon, Message,Notify, Divider, Menu, Row, Col} from '../../../../src/components';
import './index.css';

const ButtonGroup = Button.Group;

export default class MessageCase extends React.Component {

    openNotice = (type, content,title) => {
        switch (type) {
            case 'info':
                Notify.info(content,title);
                break;
            case 'success':
                Notify.success(content,title);
                break;
            case 'warn':
                Notify.warn(content,title);
                break;
            case 'error':
                Notify.error(content,title);
                break;
        }

    }

    openNoticeCustomize1 = () => {
        Notify.info(<div style={{fontSize:'18px',color:'#FF0000'}}>这是通过DOM定义的消息内容</div>,<span style={{fontSize:'14px',color:'#0000FF'}}>自定义的标题头</span>);
    }

    openNoticeCustomize2 = () => {
        Notify.open('不会自动关闭的消息','提示',0)
    }

    openMessage = (type, content) => {
        switch (type) {
            case 'info':
                Message.info(content);
                break;
            case 'success':
                Message.success(content);
                break;
            case 'warn':
                Message.warn(content);
                break;
            case 'error':
                Message.error(content);
                break;
            case 'loading':
                const hide = Message.loading(content,0);
                setTimeout(()=>{
                    hide();
                    Message.info('设置为2.5秒后，手动消失了');
                }, 2500);
                break;
        }

    }

    openMessageByDuration = (content) => {
        Message.info(content,10);
    };

    render() {
        return (
            <Row gutter={10}>
                <Col span={8}>
                    <h3>提示</h3>
                    <h4>通知提示</h4>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openNotice('info', '一般信息反馈消息')}>一般信息</Button>
                            <Button type="primary" onClick={() => this.openNotice('success', '成功反馈消息')}>成功</Button>
                            <Button type="primary" onClick={() => this.openNotice('warn', '警告反馈消息')}>警告</Button>
                            <Button type="primary" onClick={() => this.openNotice('error', '错误反馈消息')}>错误</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openNotice('info', '这里是消息内容','这里是消息标题')}>定义消息标题</Button>
                            <Button type="primary" onClick={() => this.openNoticeCustomize1()}>使用DOM自定义</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openNotice('info', '这里是消息内容','这里是消息标题')}>定义消息标题</Button>
                            <Button type="primary" onClick={() => this.openNoticeCustomize1()}>使用DOM自定义</Button>
                            <Button type="primary" onClick={() => this.openNoticeCustomize2()}>不自动关闭的通知</Button>
                        </ButtonGroup>

                    </div>
                    <h4>全局提示</h4>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openMessage('info', '一般信息反馈消息')}>一般信息</Button>
                            <Button type="primary" onClick={() => this.openMessage('success', '成功反馈消息')}>成功</Button>
                            <Button type="primary" onClick={() => this.openMessage('warn', '警告反馈消息')}>警告</Button>
                            <Button type="primary" onClick={() => this.openMessage('error', '错误反馈消息')}>错误</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openMessage('loading', '加载中反馈消息')}>加载中</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openMessageByDuration('成功反馈消息，10秒后自动消失')}>10秒后消失</Button>
                        </ButtonGroup>
                    </div>
                </Col>
                <Col span={8}>
                    <h3>交互对话框</h3>
                </Col>
                <Col span={8}>
                    <h3>其他交互效果</h3>
                </Col>
            </Row>


        );
    }
}

