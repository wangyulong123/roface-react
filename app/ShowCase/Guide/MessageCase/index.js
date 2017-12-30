import React from 'react';
import {Button, Icon, Message, Modal, Notify,Popconfirm, Divider, Menu, Row, Col} from '../../../../src/components';
import './index.css';

const ButtonGroup = Button.Group;

export default class MessageCase extends React.Component {

    openNotice = (type, content, title) => {
        switch (type) {
            case 'info':
                Notify.info(content, title);
                break;
            case 'success':
                Notify.success(content, title);
                break;
            case 'warn':
                Notify.warn(content, title);
                break;
            case 'error':
                Notify.error(content, title);
                break;
        }

    }

    openNoticeCustomize1 = () => {
        Notify.info(<div style={{fontSize: '18px', color: '#FF0000'}}>这是通过DOM定义的消息内容</div>, <span
            style={{fontSize: '14px', color: '#0000FF'}}>自定义的标题头</span>);
    }

    openNoticeCustomize2 = () => {
        Notify.open('不会自动关闭的消息', '提示', 0)
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
                const hide = Message.loading(content, 0);
                setTimeout(() => {
                    hide();
                    Message.info('设置为2.5秒后，手动消失了');
                }, 2500);
                break;
        }

    }

    openMessageByDuration = (content) => {
        Message.info(content, 10);
    };

    openModalAlert = (type,message,title) => {
        Modal[type]({
            title:title,
            content:message,
        });
    };

    openModalAlertCustomize1 = () => {
        Modal.info({
            title:<span
                style={{fontSize: '14px', color: '#0000FF'}}>自定义的标题头</span>,
            content:<div style={{fontSize: '18px', color: '#FF0000'}}>这是通过DOM定义的消息内容</div>,
            okText:'好的，我已经确定了',
            okType:'danger',
        });
    };
    openModalAutoClose = () => {
        const modal = Modal.success({
            title: '自动关闭对话框',
            content: '这个模态框会在5秒后自动关闭'
        });

        setTimeout(() => modal.destroy(), 5000);
    };

    showConfirm = () => {
        Modal.confirm({
            title: '操作确认',
            content: '你确定要这样操作吗？',
            onOk() {
                Notify.success('您已确定完成XX操作，系统已经处理完成','确认操作提示');
            },
            onCancel() {
                Notify.info('您已放弃XX操作','取消操作提示');
            },
        });
    };

    showConfirmCustomize = () => {
        Modal.confirm({
            title: '操作确认',
            content: '你确定要这样操作吗？',
            okText: '我确定要这样做',
            okType: 'danger',
            cancelText: '放弃',
            onOk() {
                Notify.success('您已确定完成XX操作，系统已经处理完成','确认操作提示');
            },
            onCancel() {
                Notify.info('您已放弃XX操作','取消操作提示');
            },
        });
    };

    popConfirm = () => {
        Notify.success('确认操作');
    }

    popCancel  = () =>  {
        Notify.error('放弃操作');
    }

    showModal = () => {
        Notify.warn('开发中...');
    };

    showModalCustomize = () => {
        Notify.warn('开发中...');
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
                            <Button type="primary"
                                    onClick={() => this.openNotice('info', '这里是消息内容', '这里是消息标题')}>定义消息标题</Button>
                            <Button type="primary" onClick={() => this.openNoticeCustomize1()}>使用DOM自定义</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary"
                                    onClick={() => this.openNotice('info', '这里是消息内容', '这里是消息标题')}>定义消息标题</Button>
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
                            <Button type="primary"
                                    onClick={() => this.openMessageByDuration('成功反馈消息，10秒后自动消失')}>10秒后消失</Button>
                        </ButtonGroup>
                    </div>
                </Col>
                <Col span={8}>
                    <h3>交互对话框</h3>
                    <h4>信息提示框</h4>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openModalAlert('info', '信息提示，一般')}>一般信息</Button>
                            <Button type="primary" onClick={() => this.openModalAlert('success', '信息提示，成功')}>成功</Button>
                            <Button type="primary" onClick={() => this.openModalAlert('warn', '信息提示，警告')}>警告</Button>
                            <Button type="primary" onClick={() => this.openModalAlert('error', '信息提示，出错')}>错误</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openModalAlertCustomize1()}>定义标题和内容</Button>
                            <Button type="primary" onClick={() => this.openModalAutoClose()}>5秒后自动关闭</Button>
                        </ButtonGroup>
                    </div>
                    <h4>确认框</h4>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.showConfirm()}>默认</Button>
                            <Button type="primary" onClick={() => this.showConfirmCustomize()}>自定义样式</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                        </ButtonGroup>
                    </div>
                    <h4>气泡确认框</h4>
                    <div>
                        <Popconfirm title="确定删除吗?" onConfirm={() => this.popConfirm()} onCancel={() => this.popCancel()} okText="确定" cancelText="放弃">
                            <Button type="primary">删除</Button>
                        </Popconfirm>
                    </div>
                    <h4>弹出选择框(暂时没有完成)</h4>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.showModal()}>默认</Button>
                            <Button type="primary" onClick={() => this.showModalCustomize()}>自定义样式</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                        </ButtonGroup>
                    </div>
                </Col>
                <Col span={8}>
                    <h3>其他交互效果</h3>
                </Col>
            </Row>


        );
    }
}

