import profile from '../../profile';

const defaultConfig = {
    baseUrl: 'http://127.0.0.1',
    webApi: {
        i18n: '/base/i18n',
        dictList: '/base/dicts',
        dictItem: '/base/dicts',
        userMenuList: '/base/menu/userMenu',
        dataFormAdmin: '/devtool',
        dataFormMeta: '/dataform/meta',
        dataFormMethod: '/dataform/method',
        dataFormDataOne: '/dataform/data/one',
        dataFormDataList: '/dataform/data/list',
        // dataFormDataOne: '/dataform/data/one/{form}/{param}',
        // dataFormDataList: '/dataform/data/list/{form}/{param}/{sort}/{index:[]+}-{size:[]+}',
    },
};

const config = {...defaultConfig,profile} ;

export default config;
