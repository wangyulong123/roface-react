import * as rest from './rest';
import config from './config';

export const getDataFormMeta = (dataFormId) => {
    return rest.get(`${config.webApi.dataFormMeta}/${dataFormId}`);
};
/**
 * 调用dataForm对应Handler上绑定的方法
 * @param dataFormId
 * @param func
 * @param param
 */
export const invokeDataFormFunc = (dataFormId, func, param) => {
    return { dataFormId, func, param };
};
