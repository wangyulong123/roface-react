var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

var redirect = require('../config');

/* GET home page. */

//
// router.get('/dataform/meta/demoPerson', function (req, res, next) {
//     // /dataform/meta/demoPerson
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.sendFile(path.resolve(__dirname, '../json/demoPerson.json'));
// });

router.route("/")
    .get(function (req, rep, next) {
        rep.send(" server is running");
    });

router.route('/dataform/meta/:dataFormId')
    .get(function (req, rep, next) {
        // req.params.xxxxx 从path中的变量
        // req.query.xxxxx 从get中的?xxxx=中
        // req.body.xxxxx 从post中的变量

        const dataFormId = req.params.dataFormId;
        rep.setHeader('Content-Type', 'application/json;charset=utf-8');
        // rep.setHeader("Access-Control-Allow-Origin", "*");//已经统一放到app.js中统一设置
        rep.sendFile(path.resolve(__dirname, `../json/${dataFormId}.json`));
    });

//例如：/dataform/data/one/demo.PersonInfo/id=1001
router.route('/dataform/data/one/:dataFormId/:queryParam')
    .get(function (req, rep, next) {
        const dataFormId = req.params.dataFormId;
        const queryParam = req.params.queryParam;

        rep.setHeader('Content-Type', 'application/json;charset=utf-8');
        rep.sendFile(path.resolve(__dirname, '../json/dataOne.json'));
    });

//例如：/dataform/data/list/demo.PersonList/staus=A;type=B/;/0-15
router.route('/dataform/data/list/:dataFormId/:queryParam/:sortExpr/:index-:size')
    .get(function (req, rep, next) {
        const dataFormId = req.params.dataFormId;
        const queryParam = req.params.queryParam;


        rep.setHeader('Content-Type', 'application/json;charset=utf-8');
        rep.sendFile(path.resolve(__dirname, '../json/dataList.json'));
    });

router.route('/base/menu/userMenu')
    .get(function (req, rep, next) {
        const dataFormId = req.params.dataFormId;
        rep.setHeader('Content-Type', 'application/json;charset=utf-8');
        rep.sendFile(path.resolve(__dirname, '../json/menuData.json'));
    });

router.route('/base/dicts')
  .get(function (req, rep, next) {
    const dataFormId = req.params.dataFormId;
    rep.setHeader('Content-Type', 'application/json;charset=utf-8');
    rep.sendFile(path.resolve(__dirname, '../json/demo-Dict.json'));
  });

router.route('/base/dicts/:dict')
  .get(function (req, rep, next) {
    const dataFormId = req.params.dataFormId;
    rep.setHeader('Content-Type', 'application/json;charset=utf-8');
    rep.sendFile(path.resolve(__dirname, '../json/demo-Dict.json'));
  });

router.route('/templateList')
  .get(function (req, rep, next) {
    const dataFormId = req.params.dataFormId;
    rep.setHeader('Content-Type', 'application/json;charset=utf-8');
    rep.sendFile(path.resolve(__dirname, '../json/demo-TemplateList.json'));
  });

router.route('/detailTableTpl')
  .get(function (req, rep, next) {
    const detailTableId = req.params.detailTableId;
    rep.setHeader('Content-Type', 'application/json;charset=utf-8');
    rep.sendFile(path.resolve(__dirname, '../json/demo-PersonList-tpl.json'));
  });

router.route('/detailTableData')
  .get(function (req, rep, next) {
    const detailTableId = req.params.detailTableId;
    rep.setHeader('Content-Type', 'application/json;charset=utf-8');
    rep.sendFile(path.resolve(__dirname, '../json/demo-PersonList.json'));
  });

var setRedirect = function (options, cb) {
  request(options, function (error, response, body) {
    cb(body);
  });
}

var reqPath = redirect.path;
var url = redirect.url;

for(let i = 0; i< reqPath.length; i ++) {
  console.log(reqPath[i]);
  router.route(reqPath[i]).get(function (req, rep, next) {
    setRedirect({
      headers: req.headers,
      uri: url + req.url,
      method: 'get',
    }, function (body) {
      rep.json(body && JSON.parse(body));
    })
  })
  router.route(reqPath[i]).post(function (req, rep, next) {
    setRedirect({
      headers: req.headers,
      uri: url + reqPath[i],
      method: 'post',
      body: JSON.stringify(req.body)
    }, function (body) {
      rep.json(body && JSON.parse(body));
    })
  })
}




module.exports = router;
