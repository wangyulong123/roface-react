import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';

const showModal = (component, params = {}) => {
  const maskDiv = document.createElement('div');
  document.body.appendChild(maskDiv);

  const _close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(maskDiv);
    if (unmountResult) {
      maskDiv.parentNode.removeChild(maskDiv);
    }
  };

  const _handleOk = () => {
    const { onOk } = params;
    onOk && onOk();
  };

  class ModalWrapper extends React.Component {
    render() {
      return (
        <Modal
          visible
          onCancel={_close}
          maskClosable={false}
          footer={[
            <Button key="back" onClick={_close}>取消</Button>,
            <Button key="submit" type="primary" onClick={_handleOk}>确定</Button>,
          ]}
          {...params}
        >
          {React.cloneElement(component, {
            onCancel: _close,
          })}
        </Modal>
      );
    }
  }

  ReactDOM.render(
    React.createElement(ModalWrapper),
    maskDiv,
  );
};

export default showModal;
