import React from 'react';
import {Form, Icon, Tabs, Text, Button, Modal} from '../../../src/components/index';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
export default Form.create()(class PersonalManager extends React.Component {
  constructor(props) {
    super(props);
    this.tag = null;
    this.state = {
      dropDownState: 'top',
      dropDownBox: 'none',
      quitState: false,
    };
  }
  componentDidMount() {
    const { prefix = 'ro' } = this.props;
    const tags = document.querySelectorAll(`.${prefix}-personal-box`);
    if (tags.length > 0) {
      this.tag = tags[tags.length - 1];
      window.addEventListener('click', this._executeCb);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.executeCb);
  }
  _executeCb = (e) => {
    if (this.tag && this.tag.compareDocumentPosition(e.target) !== 20) {
      this._closeDropDown();
    }
  };
  _closeDropDown = () => {
    this.setState({
      dropDownState: 'top',
      dropDownBox: 'none',
    });
  };
  _dropDownBox = (e) => {
    const {dropDownState} = this.state;
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
  informationTabPane = (prefix, getFieldDecorator) => {
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 14, offset: 0},
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
                  {required: true, message: '请输入个人账户'},
                ],
              })(<Text placeholder="请输入用户账户" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="昵称"
            >
              {getFieldDecorator('nickname', {
                rule: [{type: 'string'}],
              })(<Text placeholder="请输入用户昵称" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
            >
              {getFieldDecorator('user_email', {
                rule: [{type: 'email'}],
              })(<Text placeholder="请输入邮箱地址" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电话"
            >
              {getFieldDecorator('phone', {
                rule: [{type: 'number'}],
              })(<Text placeholder="请输入联系方式" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="其他"
            >
              {getFieldDecorator('other')(<Text placeholder="请输入" />)}
            </FormItem>
          </Form>
        </div>
      </div>
    );
  };
  passwordTabPane = (prefix, getFieldDecorator) => {
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 15, offset: 0},
    };
    return (
      <div className={`${prefix}-tabPane2`}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="原密码"
          >
            {getFieldDecorator('oldPassword', {
              rule: [{type: 'password'}, {required: true}],
            })(<Text type="password" placeholder="请输入原密码" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPasswod', {
              rule: [{type: 'password'}, {required: true}],
            })(<Text type="password" placeholder="请输入新密码" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('confirmPassword', {
              rule: [{type: 'password'}, {required: true}],
            })(<Text type="password" placeholder="请再输入一遍" />)}
          </FormItem>
        </Form>
      </div>
    );
  };
  _showQuitBox = () => {
    this.setState({
      quitState: true,
    });
  };
  _quitSuccess = () => {
    console.log('success!');
  };
  _quitFail = () => {
    this.setState({
      quitState: false,
    });
  };
  render() {
    const {prefix = 'ro'} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {dropDownBox, dropDownState, quitState} = this.state;
    return (
      <div className={`${prefix}-nav-right`}>
        <span className={`${prefix}-right-items`}>
          <span className={`${prefix}-personal-portrait`} onClick={this._dropDownBox} />
          <span className={`${prefix}-navRight-text`} onClick={this._dropDownBox}>admin</span>
          <span className={`${prefix}-personal-${dropDownState}`} onClick={this._dropDownBox} />
          <div style={{display: dropDownBox}} className={`${prefix}-personal-box`}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="个人信息" key="1">
                {this.informationTabPane(prefix, getFieldDecorator)}
              </TabPane>
              <TabPane tab="修改密码" key="2">
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
          <span className={`${prefix}-navRight-text`} onClick={this._showQuitBox}>退出</span>
          <Modal
            visible={quitState}
            onOk={this._quitSuccess}
            onCancel={this._quitFail}
            title="提示"
            footer={[
              <Button onClick={this._quitFail} key="cancel">取消</Button>,
              <Button type="primary" onClick={this._quitSuccess} key="ok">确定</Button>,
            ]}
          >
            <Icon type="warning" />
            <span>确认退出系统？</span>
          </Modal>
        </span>
      </div>
    );
  }
});
