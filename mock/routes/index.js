var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/dataform/meta/demoPerson', function(req, res, next) {
  // /dataform/meta/demoPerson
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(path.resolve(__dirname, '../json/demoPerson.json'));
});


module.exports = router;
