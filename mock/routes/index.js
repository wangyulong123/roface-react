var express = require('express');
var router = express.Router();
var path = require('path');

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
    rep.sendFile(path.resolve(__dirname, '../json/menuData.json'));
  });

router.route('/base/dict/:dict')
  .get(function (req, rep, next) {
    const dataFormId = req.params.dataFormId;
    rep.setHeader('Content-Type', 'application/json;charset=utf-8');
    rep.sendFile(path.resolve(__dirname, '../json/menuData.json'));
  });



module.exports = router;
