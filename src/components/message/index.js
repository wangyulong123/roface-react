import { message } from 'antd';

export const success = (content, duration, onClose) => {
    return message.success(content, duration, onClose);
};
export const error = (content, duration, onClose) => {
    return message.error(content, duration, onClose);
};
export const info = (content, duration, onClose) => {
    return message.info(content, duration, onClose);
};
export const warning = (content, duration, onClose) => {
    return message.warning(content, duration, onClose);
};
export const warn = (content, duration, onClose) => {
    return message.warn(content, duration, onClose);
};
export const loading = (content, duration, onClose) => {
    return message.loading(content, duration, onClose);
};
export const config = (options) => {
    return message.config(options);
};
export const destroy = () => {
    return message.destroy();
};

