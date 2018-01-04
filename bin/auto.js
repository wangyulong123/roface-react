var fs = require('fs');
var path = require ('path');

var defaultConfig = require('../config/default.config');

// 检查app目录下的文件
var fileObj = {};

function checkFirstUp(str) {
  var firstStr = str.substr(0, 1);
  return firstStr.toLocaleUpperCase() === firstStr;
}

function checkIsCom(dir, ignore) {
  var files = fs.readdirSync(dir);
  var filterFiles = files.filter(file => !ignore.includes(file) && checkFirstUp(file));
  if (filterFiles.length === 0) {
    return false
  }
  if (files.some((file) => !checkFirstUp(file) && file !== 'index.js' && file !== 'autoIndex.js')
    || (files.length === 1 && files[0] === 'index.js' && files[0] !== 'autoIndex.js') || files.some(function (file) {
      return file.endsWith('less') || file.endsWith('css');
    })) {
    return false;
  }
  return true;
}

function checkDir(dir, ignore) {
  var files = fs.readdirSync(dir);
  if (!files.some((file) => !checkFirstUp(file) && file !== 'index.js' && file !== 'autoIndex.js')) {
    files.forEach(function (file) {
      var pathname = path.join(dir, file);
      if (fs.lstatSync(pathname).isDirectory()) {
        if(!pathname.includes('.') && !ignore.includes(file) && checkFirstUp(file)){
          if (fs.readdirSync(pathname).length !== 0) {
            if (!fileObj[dir]) {
              fileObj[dir] = [];
            }
            fileObj[dir].push({
              name: file,
              isDir: checkIsCom(dir + '/' + file, ignore)
            });
            checkDir(pathname, ignore);
          }
        }
      }
    });
  }
}

function autoJs(fileObj) {
  console.log('开始生成文件');
  Object.keys(fileObj).forEach(function (field) {
    var data = '// 该文件为自动生成，手动修改无效\n';
    data = data + fileObj[field].map(function (file) {
      if (file.isDir) {
        return 'export * as ' + file.name + ' from \'./' + file.name + '/autoIndex\';'
      } else {
        return 'export ' + file.name + ' from \'./' + file.name + '\';'
      }
    }).join('\n');
    //console.log(fileObj);
    // 删除原来的index.js文件
    if (fs.existsSync(field + '/index.js')) {
      fs.unlinkSync(field + '/index.js');
    }
    fs.writeFileSync(field + '/autoIndex.js', data);
    console.log(field + '/autoIndex.js 文件生成');
  })
  console.log('app 所有索引文件已经成功生成');
}

// 过滤掉Container目录
checkDir(path.resolve(__dirname, '../app'), defaultConfig.autoJsIgnore);


autoJs(fileObj);
