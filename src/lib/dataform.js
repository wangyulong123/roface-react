import * as rest from './rest';
import config from './config';

/**
 * 获取模板源数据
 * 以前API名称为getDataFormMeta,在名称上dataform.js就已经表示DataForm了，已经具备上下文了，因此这里API简化
 * @param dataFormId
 * @returns {*}
 */
export const getMeta = (id) => {
    return rest.get(`${config.webApi.dataFormMeta}/${id}`);
};

export const getDataOne = (id,param) => {
    return rest.get(`${config.webApi.dataFormDataOne}/${id}/${param}`);
};

export const getDataList = (id,param,sort,index,size) => {
    return rest.get(`${config.webApi.dataFormDataList}/${id}/${param}/${sort}/${index}-${size}`);
};

/**
 * 调用dataForm对应Handler上绑定的方法
 * @param dataFormId
 * @param func
 * @param param
 */
export const invokeMethod = (dataFormId, funcName, param) => {
    return rest.post(`${config.webApi.dataFormMethod}/${dataFormId}/${funcName}`,param);
};

export const getAdmin = (url, param) => {
  return rest.get(`${config.webApi.dataFormAdmin}${url}`, param);
};

export const postAdmin = (url, param) => {
  return rest.post(`${config.webApi.dataFormAdmin}${url}`, param);
};

export const deleteAdmin = (url, param) => {
  return rest.del(`${config.webApi.dataFormAdmin}${url}`, param);
};

export const saveDataOne = (dataFormId, param) => {
  return rest.post(`${config.webApi.dataFormDataOneSave}/${dataFormId}`, param);
};

export const saveDataList = (dataFormId, param) => {
  return rest.post(`${config.webApi.dataFormDataListSave}/${dataFormId}`, param);
};

export const deleteDataList = (dataFormId, param) => {
  return rest.post(`${config.webApi.dataFormDataListDelete}/${dataFormId}`, param);
};
