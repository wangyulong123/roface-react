import { notification } from 'antd';

export const success = (config) => {
    notification.success(config);
};
export const error = (config) => {
    notification.error(config);
};
export const info = (config) => {
    notification.info(config);
};
export const warning = (config) => {
    notification.warning(config);
};
export const warn = (config) => {
    notification.warn(config);
};
export const close = (key) => {
    notification.close(key);
};
export const destroy = () => {
    notification.destroy();
};
export const config = (options) => {
    notification.config(options);
};
