import { GFetch, PFetch } from '../../utils/fetch';
import config from '../config';

export const getAbsolutelyUrl = (url) => {
  return `${config.url}/${url}`;
};

export const getMetaG = (url, id) => {
  return GFetch(getAbsolutelyUrl(url), id);
};

export const getMetaP = (url, id) => {
  return PFetch(getAbsolutelyUrl(url), id);
};

export const getDataG = (url, param) => {
  return GFetch(getAbsolutelyUrl(url), param);
};

export const getDataP = (url, param) => {
  return PFetch(getAbsolutelyUrl(url), param);
};

