import { get, post } from './rest';
import config from './config';

export const getWebApiMenu = (param) => {
  return get(config.webApiMenu, param);
};
export const postWebApiMenu = (param) => {
  return post(config.webApiMenu, param);
};
export const getWebApiDataFormMeta = (dataFormId) => {
  return get(`${config.webApiDataFormMeta}${dataFormId}`);
};
export const postWebApiDataFormMeta = (param) => {
  return post(config.webApiDataFormMeta, param);
};
export const getWebApiDataFormDataOne = (param) => {
  return get(config.webApiDataFormDataOne, param);
};
export const postWebApiDataFormDataOne = (param) => {
  return post(config.webApiDataFormDataOne, param);
};
export const getWebApiDataFormDataList = (param) => {
  return get(config.webApiDataFormDataList, param);
};
export const postWebApiDataFormDataList = (param) => {
  return post(config.webApiDataFormDataList, param);
};
