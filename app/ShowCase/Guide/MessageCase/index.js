import React from 'react';
import {Button, Icon, Message, Divider, Menu, Row, Col} from '../../../../src/components';
import './index.css';

const ButtonGroup = Button.Group;

export default class MessageCase extends React.Component {

    openNotice = (type, content) => {
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

    openNoticeByDuration = (content) => {
        Message.info(content,10);
    };

    render() {
        return (
            <Row gutter={10}>
                <Col span={8}>
                    <h3>提示</h3>
                    <h4>通知提示</h4>
                    <div></div>
                    <h4>全局提示</h4>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openNotice('info', '一般信息反馈消息')}>一般信息</Button>
                            <Button type="primary" onClick={() => this.openNotice('success', '成功反馈消息')}>成功</Button>
                            <Button type="primary" onClick={() => this.openNotice('warn', '警告反馈消息')}>警告</Button>
                            <Button type="primary" onClick={() => this.openNotice('error', '错误反馈消息')}>错误</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openNotice('loading', '加载中反馈消息')}>加载中</Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.openNoticeByDuration('成功反馈消息，10秒后自动消失')}>10秒后消失</Button>
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

