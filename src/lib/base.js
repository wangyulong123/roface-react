import { get, post } from './rest';
import config from './config';

/**
 * 获取当前登录用户的权限内的菜单数据，无层次结构，程序自行组装
 * 会话级控制不需要参数
 * @returns {*}
 */
export const getUserMenuList = () => {
    return get(config.webApi.userMenuList);
};

/**
 * 取所有的代码表集合
 * @param dictCode
 */
export const getDictList = () => {
    return get(config.webApi.dictList);
};
/**
 * 取单个代码项
 * @param dictCode
 */
export const getDictItem = (dictCode) => {
    return get(config.webApi.dictItem);
};