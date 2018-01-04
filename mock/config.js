var redirect = {
  // url: 'http://192.168.64.227:8080',
  url: 'http://127.0.0.1:8080',
  path: [
    '/dataform/devtool/dataform',
    '/dataform/devtool/dataform/:dataFormId/element',
    '/dataform/devtool/dataform/clone',
    '/dataform/devtool/dataform/:id',
    '/dataform/devtool/dataform/:dataFormId/:elementCode',
    '/dataform/devtool/dataform/:id',
    '/dataform/devtool/dataform/list/code=DESC/:page',
    '/dataform/list/:sort'
  ]
};

module.exports = redirect;