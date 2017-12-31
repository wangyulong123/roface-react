var redirect = {
  url: 'http://192.168.64.80:8080',
  path: [
    '/dataform/admin/dataform',
    '/dataform/admin/dataform/:dataFormId/element',
    '/dataform/admin/dataform/clone',
    '/dataform/admin/dataform/:id',
    '/dataform/admin/dataform/:dataFormId/:elementCode',
    '/dataform/admin/dataform/:id',
    '/dataform/list/:sort'
  ]
}

module.exports = redirect;