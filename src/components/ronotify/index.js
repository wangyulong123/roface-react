import { notification, Modal } from 'antd';

export const ModalConfirm = (title, content, onOk, onCancel) => {
    const config = {};
    if (typeof title === 'object') {
        config.title = title.title;
        config.content = title.content;
        if (onOk) {
            config.onOk = title.onOk;
        } else {
            config.onOk = null;
        }
        if (onCancel) {
            config.onCancel = title.onCancel;
        } else {
            config.onCancel = null;
        }
    }
    if (typeof title === 'string') {
        config.title = title;
        config.content = content;
        if (onOk) {
            config.onOk = onOk;
        } else {
            config.onOk = null;
        }
        if (onCancel) {
            config.onCancel = onCancel;
        } else {
            config.onCancel = null;
        }
    }
    Modal.confirm(config);
};

export const NotificationWithIcon = (type, message, description, duration) => {
    const config = {};
    if (typeof type === 'object') {
        config.message = type.message;
        config.description = type.description;
        if (type.duration === 0) {
            config.duration = type.duration;
        }
        notification[type.type](config);
    }
    if (typeof type === 'string') {
        config.message = message;
        config.description = description;
        if (duration === 0) {
            config.duration = duration;
        }
        notification[type](config);
    }
};
