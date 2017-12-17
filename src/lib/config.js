const config = {
    baseUrl: 'http://localhost:3003',
    webApi: {
        i18n: '/base/i18n',
        dictList: '/base/dicts',
        dictItem: '/base/dicts/{code}',
        userMenuList: '/common/menu/userMenu',
        dataFormMeta: '/dataform/meta',
        dataFormDataOne: '/dataform/data/one/{form}/{param}',
        dataFormDataList: '/dataform/data/list/{form}/{param}/{sort}/{index:[]+}-{size:[]+}',
    },
};

export default config;
