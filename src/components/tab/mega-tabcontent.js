/**
 * Created by amarsoft on 2017/11/2.
 */
(function (global, $) {
  var mainContent = {}
  // var mainController = global.mainController
  var _menuData = null;
  var scope = {}
  scope.tabsData = []
  scope.tabContents = []
  scope.tabsCollapse = []
  scope.tabsDataStack = []
  scope.tabsDomCache = []
  scope.collapseDomCache = []
  scope.currTabsWidth = 0;
  scope.oldNavTabsWidth = 0;

  function findById(id, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return i
      }
    }
    return -1
  }

  function findActiveContent() {
    var activeContent;
    for (var i = 0; i < scope.tabContents.length; i++) {
      if (scope.tabContents[i].active === true) {
        activeContent = scope.tabContents[i];
        break;
      }
    }
    return activeContent;
  }

  function findActiveTabIdx() {
    var activeTabIdx = -1;
    for (var i = 0; i < scope.tabsData.length; i++) {
      if (scope.tabsData[i].active === true) {
        activeTabIdx = i;
        break;
      }
    }
    return activeTabIdx;
  }

  function findTabItem(id) {
    for (var i = 0; i < scope.tabsData.length; i++) {
      if (scope.tabsData[i].id == id) {
        return scope.tabsData[i];
      }
    }
  }

  function findTabContent(id) {
    for (var i = 0; i < scope.tabContents.length; i++) {
      if (scope.tabContents[i].id == id) {
        return scope.tabContents[i];
      }
    }
  }

  function openInTab(url, tabId, name, headerData, isCell) {

    if (scope.tabsData.length + scope.tabsCollapse.length >= 30) {
      console.warn('打开的tab页已达上限【30】')
      return;
    }

    tabId = tabId || new Date().getTime() * Math.random() + ''
    var tabItem = findTabItem(tabId);
    var contentItem = findTabContent(tabId);

    var allname = name;
    /*        if (name.length > 8) {
     name = name.substring(0, 8) + "...";
     }*/

    if (!tabItem) {
      tabItem = {
        id: tabId,
        header: name,
        allName: allname,
        url: url,
        isCell: isCell
      };

      tabItem.breadcrumbData = headerData;

      addV(tabItem)
      // scope.tabsData.push(tabItem);
      // scope.tabsDataStack.push(tabItem);
    }

    if (!contentItem) {
      contentItem = {
        id: tabId,
        url: url
      }
    }

    scope.tabContents.push(contentItem);
    scope.selectTabItem(tabItem);

    //当前tab数总宽度超过tab面板宽度时，隐藏tabsData中的若干tab到tabsCollapse中,达到自适应效果
    setTimeout(function () {

      //窗口未变化时tab容器（父元素）的宽度
      scope.oldNavTabsWidth = $("#rb-nav-tabs-visable").outerWidth() - $('.rb-tabsmore').outerWidth();

      //tab加载完成后求解tab宽度并绑定到tab中
      tabItem.width = $('#rb-tab-nav-' + tabItem.id).outerWidth();
      /*            var lis = angular.element('#rb-nav-tabs-visablenav-tabs').find('li').slice();

       for (var i = 0; i < lis.length; i++) {
       scope.tabsData[i].width = $(lis[i]).outerWidth();
       }*/

      //tab容器宽度自适应
      scope.tabReplaceWidthAutoAdapt(tabItem);

    });


  }

  function genIframeName(menuItem) {
    var ifrname = "iframe" + menuItem.id;
    ifrname = ifrname.replace(new RegExp("-", 'gm'), '');
    return ifrname;
  }

  function _getParaString(sPara) {
    if (!sPara) {
      return "";
    } else if (sPara.substring(0, 1) == "&") {
      return encodeURI(encodeURI(sPara));
    } else {
      return "&" + encodeURI(encodeURI(sPara));
    }
  }

  function openMenuContent(menuItem) {

    //由于ng-repeat可能没有渲染完毕，因此这里用个定时器等一下，完成后，就清除定时是器
    // console.log("open in tabs:"+menuItem.name);
    if (!menuItem.url) return;
    var container = $("#rb-container-" + menuItem.id);
    if(!(container && container.length)){
      container = $('<div id="rb-container-'+menuItem.id+'"  class="rb-tab-pane-content"></div>');
      $('.rb-tab-content-container').append(container)
    }
    loadFileToFrame(container, menuItem);
  }

  function loadFileToFrame(container, menuItem) {
    if (menuItem.url) {
      var iframe = $('<iframe class="rb-content-iframe" frameborder=0></iframe>');
      iframe.attr("id", genIframeName(menuItem));
      iframe.attr("name", genIframeName(menuItem));
      //iframe.attr("src",menuItem.url+"?v="+Math.random());
      container.empty();
      container.css("overflow", "hidden");
      container.append(iframe);
      // console.log("ifr--container");
      // console.log(container.size());
      // console.log(menuItem.url);
      //$timeout(function(){
      alsOpenComponent(iframe, menuItem);
      //},100);
    }
  }

  function alsOpenComponent(iframe, menuItem, params) {
    var ifrname = genIframeName(menuItem);

    if(params){
      var paramsStr = '';
      for(var i in params){
        paramsStr += (i+'='+params[i])+'&';
      }
      menuItem.param = menuItem.param || '';
      if(menuItem.param){
        menuItem.param += '&';
      }
      menuItem.param += paramsStr.substring(0,paramsStr.length-1);
    }

    var urlParam = _getParaString(menuItem.param);
    if (urlParam.indexOf("&") === 0) urlParam = urlParam.substring(1);
    urlParam = urlParam ? ("?" + urlParam) : "";
    console.log("load:" + rax.url(menuItem.url) + urlParam);
    iframe.attr("src", rax.url(menuItem.url) + urlParam);

    // var blockContainer = "#rb-tab-content-" + menuItem.id;
    var blockContainer = $("#rb-container-" + menuItem.id);

    blockContainer.css('height', iframeAutoAdaptHeight() + 'px');

    //设置主内容容器高度为自适应屏幕高度


    function iframeWait() {
      rax.block("加载中...", blockContainer);
    };

    function iframeComplete(iframe) {
      iframe.binding = scope;
      iframe.contentWindow.onStatusRegister = onStatusRegister;
      // angular.element('.content-iframe').css('height', iframeAutoAdaptHeight() + 'px');
      rax.unblock(blockContainer);
    }

    function onStatusRegister(status, config){
      if(!status)return;
      config = config || {};
      var tabItem = findTabItem(menuItem.id);
      if(status === 'close'){
        tabItem.beforeClose = config;
        config.destroy && (delete tabItem.beforeClose);
      }else if(status === 'switch'){
        tabItem.beforeSwitch = config;
        config.destroy && (delete tabItem.beforeSwitch);
      }
    }

    iframeWait();

    if (iframe[0].attachEvent) {
      iframe[0].attachEvent("onload", function () {
        iframeComplete(iframe[0]);
      });
    } else {
      iframe[0].onload = function () {
        iframeComplete(iframe[0]);
      };
    }

  }

  function openCollapseMenuInTabsOnClick(menuItem) {
    switchTabDeferred(menuItem, scope.openCollapseMenuInTabs);
  }

  //打开tabsCollapse中的tab：tabsData队列最后一个元素和tabsCollapse队列第一个元素互换
  function openCollapseMenuInTabs(menuItem) {
    // scope.tabsCollapse.push(scope.tabsData.shift());
    addC(removeV(0))
    var currItem = removeC(menuItem)
    addV(currItem)
    // var currItem = scope.tabsCollapse.removeAt(scope.tabsCollapse.indexOf(menuItem))[0];
    // scope.tabsData.push(currItem);
    //tab容器宽度自适应
    scope.tabReplaceWidthAutoAdapt(currItem);
    scope.selectTabItem(currItem);
    //这里注意tabs的布局没有监控，可能出现异常！！！！
  }

  function closeTabItemOnClick(tabItem) {
    closeTabDeferred(tabItem, scope.closeTabItem);
  }

  function closeTabItem(tabItem) {
    var idx = scope.tabsData.indexOf(tabItem);
    var idxActive = findActiveTabIdx();

    if (idx != idxActive) {
      removeV(idx)
      // scope.tabsData.removeAt(idx);
      // scope.tabsDataStack.removeAt(scope.tabsDataStack.indexOf(tabItem));
      if (scope.tabsCollapse.length) {
        scope.tabCollapseToData();
      }
    } else {
      scope.closeCurrTab(idx);
    }
  }

  function closeCurrTab(index) {
    idx = index || findActiveTabIdx();
    var tabItem = scope.tabsData[idx];

    var preTab = null;

    if (scope.tabsCollapse.length === 0 && scope.tabsData.length === 1) {
      removeV(idx)
      scope.tabsData.removeAt(idx);
      scope.tabsDataStack.length = 0;
      scope.tabContents.length = 0;
      return;
    }


    if (scope.tabsDataStack.indexOf(tabItem) === 0) {
      preTab = scope.tabsDataStack[1];
    } else {
      preTab = scope.tabsDataStack[scope.tabsDataStack.indexOf(tabItem) - 1];
    }

    if (scope.tabsCollapse.indexOf(preTab) === -1) {
      scope.selectTabItem(preTab);
      removeV(tabItem)
      // scope.tabsData.removeAt(idx);
      // scope.tabsDataStack.removeAt(scope.tabsDataStack.indexOf(tabItem));
      if (scope.tabsCollapse.length) {
        scope.tabCollapseToData();
      }
    } else {
      removeV(idx)
      removeC(preTab)
      addV(preTab)
      // scope.tabsData.removeAt(idx);
      // scope.tabsCollapse.removeAt(scope.tabsCollapse.indexOf(preTab));
      // scope.tabsData.push(preTab);
      scope.selectTabItem(preTab);
      // scope.tabsDataStack.removeAt(scope.tabsDataStack.indexOf(tabItem));
      scope.tabReplaceWidthAutoAdapt(preTab);
    }
  }

  function closeTabDeferred(tabItem, execution, remark) {
    if (tabItem.beforeClose) {
      if (tabItem.beforeClose.block) {
        if (tabItem.beforeClose.block(tabItem.beforeClose.params)) {
          execution(tabItem)
        }
        return;
      } else {
        var confirmStr = tabItem.beforeClose.title || '确认要关闭tab页【' + tabItem.allName + '】吗？';
        remark && (confirmStr = '确认要' + remark + 'tab页【' + tabItem.allName + '】吗？');
        var b = confirm(confirmStr)
        b && execution(tabItem);
      }
    } else {
      execution(tabItem);
    }
  }

  function closeCollapseTabItemByClick(tabItem, event) {
    event && event.stopPropagation && (event.stopPropagation());
    closeTabDeferred(tabItem, scope.closeCollapseTabItem);
  }

  //关闭tabsCollapse中的tab，阻止事件冒泡
  function closeCollapseTabItem(tabItem, event) {
    event && event.stopPropagation && (event.stopPropagation());
    removeC(tabItem)
    // scope.tabsCollapse.removeAt(scope.tabsCollapse.indexOf(tabItem));
    // scope.tabsDataStack.removeAt(scope.tabsDataStack.indexOf(tabItem));

  }


  function refreshTabContent(item, params) {
    console.log('######## refreshTabContent ########', item, params)
    // if(params){
    //   var iframe = document.getElementById(genIframeName(item));
    //   iframe = $(iframe);
    //   alsOpenComponent(iframe, item, params);
    // }else{
    //   document.getElementById(genIframeName(item)).contentWindow.location.reload(true);
    // }
  }

  //关闭tabsData中的tab时，从tabsCollapse中读出tab来替换
  function tabCollapseToData() {
    var currItem = scope.tabsCollapse[0];
    removeC(currItem)
    addV(currItem)
    // scope.tabsData.push(currItem);
    //tab容器宽度自适应
    scope.tabReplaceWidthAutoAdapt(currItem);
    // $scope.selectTabItem(currItem);
  }

  // function getBreadCrumb (tabItem) {
  //   return '' +
  //     '   <ol class="breadcrumb">\n' +
  //     '       <span class="raxi raxi-0010home"></span>\n' +
  //     (function(){
  //       var str = ''
  //       tabItem.breadcrumbData.forEach(function(bcruItem){
  //         str +=
  //           '<li>\n' +
  //           '       <i ng-if="$index==1"></i>\n' +
  //           '       <span>'+ bcruItem.name +'</span>\n' +
  //           '</li>\n'
  //       })
  //       return str
  //     })() +
  //     '   </ol>\n'
  // }

  function selectTabItem(tabItem, isNav) {
    for (var i = 0; i < scope.tabsData.length; i++) {
      scope.tabsData[i].active = false;
    }

    tabItem.active = true;
    // var breadCrumb = $(getBreadCrumb(tabItem))
    var breadCrumb = doT.template($("#rb-breadcrumb").text())(tabItem);
    // console.log(breadCrumb)
    $('#rb-tab-pane').html(breadCrumb).show()
    $('#rb-nav-tabs-visable li').removeClass('active')
    $('#rb-nav-tabs-visable li:eq(' + scope.tabsData.indexOf(tabItem) + ')').addClass('active')

    setTimeout(function(){
      $('.rb-tab-pane-content').hide()
      $('#rb-container-'+tabItem.id).show()
    })


    // for (var j = 0; j < scope.tabContents.length; j++) {
    //   scope.tabContents[j].active = false;
    //   if (tabItem.id == scope.tabContents[j].id) {
    //     scope.tabContents[j].active = true;
    //   }
    // }

    // if (!tabItem.isCell) {
    //   $location.hash(tabItem.id);
    // }
  }

  function selectTabItemOnClick(tabItem, isNav) {
    switchTabDeferred(tabItem, scope.selectTabItem);
  }

  function switchTabDeferred(tabItem, execution) {
    var index = scope.findActiveTabIdx();
    if (index !== -1) {
      var activeTab = scope.tabsData[index];
      if (activeTab.active && activeTab.beforeSwitch) {
        if (activeTab.beforeSwitch.block) {
          if (activeTab.beforeSwitch.block(activeTab.beforeSwitch.params)) {
            execution(tabItem)
          }
          return;
        } else {
          var confirmStr = activeTab.beforeSwitch.title || '确认要从【' + activeTab.allName + '】切换到【' + tabItem.allName + '】吗？';
          var b = confirm(confirmStr)
          b && execution(tabItem);
        }
        return;
      }
    }
    execution(tabItem);
  }

  function buildBreadcrumb(menuItem) {
    var bcru = [];
    var family = menuItem._family
    if(!(family && family.length)){
      bcru.push(menuItem)
    }else{
      var current = _menuData;
      // console.log(current,family)
      family.forEach(function(fml){
        bcru.unshift(current[fml])
        current = current[fml].children
      })
    }
    return bcru;
  }

  function openMenuInTabs(menuItem) {
    //页面刷新后保留刷新前当前tab页，将它置入tabsData中
    if (!scope.tabsData) {
      scope.tabsData.push(menuItem);
    }

    openInTab(menuItem.url, menuItem.id, menuItem.name, buildBreadcrumb(menuItem).reverse(), 0);
  }


  function onMenuItemSelected(menuItem) {
    var tabItem = scope.findTabItem(menuItem.id);
    if (tabItem && tabItem.beforeClose) {
      closeTabDeferred(tabItem, function () {
        scope.openMenuInTabs(menuItem);
        openMenuContent(menuItem);
      }, '重载');
    } else {
      scope.openMenuInTabs(menuItem);
      openMenuContent(menuItem);
    }
  }

  function onToggle(menuItem, menuData) {
  	!(_menuData && _menuData.length) && (_menuData = menuData);
  	if(!menuItem){
  		console.warn('意外的没有菜单项？')
  		return;
  	}
  	onMenuItemSelected(menuItem)
  }

  function closeAllTabs() {
    /*$scope.tabsData.clear();
     $scope.tabContents.clear();*/

    // scope.tabsData.length = 0;
    // scope.tabsDataStack.length = 0;
    // scope.tabsCollapse.length = 0;
    while (scope.tabsCollapse.length) {
      removeC(0)
    }
    while (scope.tabsData.length) {
      removeV(0)
    }


    // scope.tabContents.length = 0;
    scope.currTabsWidth = 0;

  }

  function closeOtherTabs() {
    var activeContent = findActiveContent();
    scope.tabContents.length = 0;

    while (scope.tabsCollapse.length) {
      removeC(0)
    }

    while (scope.tabsData.length > 1) {
      if (!scope.tabsData[0].active) {
        removeV(0)
      }else{
        scope.currTabsWidth = activeItem.width;
      }
    }

    if (activeContent) {
      scope.tabContents.push(activeContent);
    }
  }

  // 操纵可见tab页dom结点
  function removeV(pos) {
    if (pos instanceof Object) {
      pos = scope.tabsData.indexOf(pos)
    }
    pos = +pos;
    var tabItem = scope.tabsData[pos];
    typeof pos === 'number' && _opt(1, 'remove', pos);
    return tabItem
  }

  function addV(tabItem, pos) {
    _opt(1, 'add', pos, tabItem)
  }

  // 操纵隐藏tab页dom结点
  function removeC(pos) {
    if (pos instanceof Object) {
      pos = scope.tabsCollapse.indexOf(pos)
    }
    pos = +pos;
    var tabItem = scope.tabsCollapse[pos];
    typeof pos === 'number' && _opt(0, 'remove', pos);
    var len = scope.tabsCollapse.length
    if (len) {
      $('#rb-main-content-container .rb-tabsmore').show();
    } else {
      $('#rb-main-content-container .rb-tabsmore').hide();
    }
    $('#rb-main-content-container .badge').html(len);

    return tabItem
  }

  function addC(tabItem, pos) {
    _opt(0, 'add', pos, tabItem)
    var len = scope.tabsCollapse.length
    if (len) {
      $('#rb-main-content-container .rb-tabsmore').show();
    } else {
      $('#rb-main-content-container .rb-tabsmore').hide();
    }
    $('#rb-main-content-container .badge').html(len);
  }

  // 操作接口方法
  function _opt(type, foo, pos, tabItem) {
    var node = type ? $('#rb-nav-tabs-visable') : $('#rb-nav-tabs-collapse');
    var data = type ? scope.tabsData : scope.tabsCollapse;
    var cache = type ? scope.tabsDomCache : scope.collapseDomCache;
    if (foo === 'add') {
      var idx = findById(tabItem.id, cache)
      var item = null
      var _li = null
      if (idx === -1) {
        _li = $(getLi(type, tabItem));
        if (type) {
          $('.rb-tab-close', _li).click(function () {
            closeTabItemOnClick(tabItem)
          })
          $('.rb-tab-refresh', _li).click(function () {
            refreshTabContent(tabItem)
          })
          $('a', _li).click(function () {
            selectTabItemOnClick(tabItem)
          })
          $('a', _li).mousedown(mousedown)
          // tabItem.active ? _li.addClass('active') : _li.removeClass('active')
        } else {
          $('a', _li).click(function () {
            openCollapseMenuInTabsOnClick(tabItem)
          })
          $('.rb-remove-collapse-tab', _li).click(function (event) {
            closeCollapseTabItemByClick(tabItem, event)
          })
        }

        cache.push({
          id: tabItem.id,
          item: tabItem,
          dom: _li
        })
        item = tabItem
        // var track = data.indexOf(tabItem)
        // if (track === -1) {
        //   data.push(tabItem)
        //   scope.tabsDataStack.push(tabItem)
        // }

      } else {
        _li = cache[idx].dom
        item = cache[idx].item
        var track1 = data.indexOf(item)
        var track2 = scope.tabsDataStack.indexOf(item)
        track1 !== -1 && data.splice(track1, 1)
        track2 !== -1 && scope.tabsDataStack.splice(track2, 1)
        // data.push(item)
        // scope.tabsDataStack.push(item)
      }

      if (pos < 0 || pos === undefined) {
        node.append(_li)
        data.push(item)
      } else {
        var el = $('li:eq(' + pos + ')', node)
          if (el && el.length){
            el.before(_li)
          }else{
            node.append(_li)
          }
        data.splice(pos, 0, item)
      }
      scope.tabsDataStack.push(item)
    }
    if (foo === 'remove') {
      $('li:eq(' + pos + ')', node).detach()
      scope.tabsDataStack.splice(scope.tabsDataStack.indexOf(data.splice(pos, 1)[0]), 1)
      if(!scope.tabsDataStack.length){
        $('#rb-tab-pane').hide()
        $('.rb-tab-pane-content').hide()
      }
    }

    function getLi(type, tabItem) {
      return type ? 
      doT.template($("#rb-nav-tabs-item").text())(tabItem)
      :
      doT.template($("#rb-nav-tabs-collapse-item").text())(tabItem)
      // '<li class=\'' + (tabItem.active ? "active" : "") + '\'>\n' +
      // '   <div class="glyphicon glyphicon-remove rb-tab-close"></div>\n' +
      // '   <div class="glyphicon glyphicon-refresh rb-tab-refresh"></div>\n' +
      // '   <a style="cursor:move" href="javascript:;" title="' + tabItem.allName + '" id="rb-tab-nav-' + tabItem.id + '">' + tabItem.header + '\n' +
      // '   </a>\n' +
      // '</li>\n'
      //   :
      // '<li>\n' +
      // '   <a class="collapse-tab" href="javascript:void(0);">\n' +
      // '     <span ng-cloak>' + tabItem.header + '\n' +
      // '       <span class="glyphicon glyphicon-remove rb-remove-collapse-tab">\n' +
      // '       </span>\n' +
      // '     </span>\n' +
      // '   </a>\n' +
      // '</li>\n'
    }

  }

  function getPos(event){
    var lists = $('#rb-nav-tabs-visable').children();
    var posX = event.pageX;
    var pos = lists.length;
    if(lists.length > 1){
      for(var i=0; i<lists.length; posX -= $(lists[i++]).outerWidth()){
        if(posX <= 0){
          pos = i;
          break;
        }
      }
    }
    return pos - 1;
  }

  function mousedown(event) {
    var element = $(this)
    event.stopPropagation && event.stopPropagation();
    event.preventDefault && event.preventDefault();
    // scope.$emit(element.attr('id') + 'moved');

    var replaceIndex = -1;
    var lists = $('#rb-nav-tabs-visable').children();
    scope.ind = Array.prototype.indexOf.call(lists,element.parent()[0])
    $('body').mousemove(function (event) {
      event.stopPropagation && event.stopPropagation();
      event.preventDefault && event.preventDefault();
      var elCopy = $('#rb-tab-element-copy');
      if (!(elCopy && elCopy.length)) {
        elCopy = $("<div id='rb-tab-element-copy' class='rb-tab-element-copy'>" + element.html() + "</div>");
        $('body').append(elCopy);
      }

      var currPos = getPos(event);
      // console.log(currPos,scope.ind)
      if (currPos !== scope.ind) {
        // console.log($('a',lists[currPos]),$('a',lists[replaceIndex]))
        $('a', lists[currPos]).addClass("rb-tab-element-copy-replace");
      }

      if (replaceIndex >= 0 && replaceIndex !== currPos) {
        $('a', lists[replaceIndex]).removeClass("rb-tab-element-copy-replace");
      }
      replaceIndex = currPos;


      elCopy.css({'left': (event.pageX) + 'px', 'top': (event.pageY) + 'px'});
    });


    $('body').mouseup(function (event) {
      event.stopPropagation && event.stopPropagation();
      event.preventDefault && event.preventDefault();
      // 节点交换
      // scope.$apply(function(){
      //     var tabsData = scope.$parent.$parent.$parent.tabsData;
      //     var position = getPos();
      //     var temp = tabsData[position];
      //     tabsData[position] = tabsData[scope.ind];
      //     tabsData[scope.ind] = temp;
      // })

      // 出入栈

      var tabsData = _menuData;
      var position = getPos(event);
      var curr = tabsData[scope.ind];

      if(scope.ind !== position){
        addV(removeV(scope.ind), position)
      }

      // if (scope.ind < position) {
      //   for (var i = scope.ind; i < position; i++) {
      //     tabsData[i] = tabsData[i + 1];
      //   }
      // }
      //
      // if (scope.ind > position) {
      //   for (var i = scope.ind; i > position; i--) {
      //     tabsData[i] = tabsData[i - 1];
      //   }
      // }
      // tabsData[position] = curr;

      $('a', lists[replaceIndex]).removeClass("rb-tab-element-copy-replace");

      $('#rb-tab-element-copy').remove();
      $('body').unbind('mousemove');
      $('body').unbind('mouseup');
    });
  }



  //iframe自适应高度
  var iframeAutoAdaptHeight = function () {

    // setTimeout(function () {
      var footer = $('.footer');
      var content = $('.rb-tab-pane-content');
      var setHeight = $(window).outerHeight() - footer.outerHeight() - 105/*content.offset()['top']*/;
      $('.content-iframe').css('height', setHeight + 'px');
      return setHeight;
    // })


  }

  //宽度变化时，tabsData、tabsCollapse中的tab数自动变化
  //两种情况：1，时延内宽度变化较大则重置tabsData和tabsCollapse；2，变化较小时tabsData和tabsCollapse中元素互换
  //可有效防止窗口大小变化过程中tab漂移
  function tabsAutoLayout() {
    if (scope.tabsData.length === 0) return;
    /*angular.element('.rb-tabsmore').outerWidth()是浮动的，width不一定能读出来，用50代替*/
    var navTabsWidth = $("#rb-nav-tabs-visable").outerWidth() - 50;
    var subWidth = navTabsWidth - scope.oldNavTabsWidth;
    // console.log(subWidth)
    if (Math.abs(subWidth) > 200) {
      var index = 0;

      //激活的tab
      var currTab = null;

      if (scope.tabsData.length) {
        for (var i = 0; i < scope.tabsData.length; i++) {
          if (scope.tabsData[i].active) {
            currTab = scope.tabsData[i];
            removeV(currTab)
            // scope.tabsData.removeAt(i);
            break;
          }
        }
      }

      scope.currTabsWidth = currTab.width ? currTab.width : 0;

      var sumData = scope.tabsData.slice().concat(scope.tabsCollapse);

      for (var i = 1; i <= sumData.length; i++) {

        if (scope.currTabsWidth + sumData[i - 1].width <= navTabsWidth) {
          scope.currTabsWidth += sumData[i - 1].width;
          index = i;
        }
        else break;
      }

      while (scope.tabsData.length) {
        removeV(0)
      }

      sumData.splice(0, index).forEach(function (item) {
        addV(item)
      })

      addV(currTab)

      while (scope.tabsCollapse.length) {
        removeC(0)
      }

      sumData.forEach(function (item) {
        addC(item)
      })

      // $scope.tabsData = sumData.splice(0, index);
      // $scope.tabsData.push(currTab);
      // $scope.tabsCollapse = sumData;
    }

    else {

      var last = scope.tabsCollapse[scope.tabsCollapse.length - 1];

      var first = scope.tabsData[scope.tabsData.length - 1];


      if (first) {

        if (navTabsWidth <= scope.currTabsWidth && scope.tabsData.length > 1) {
          // debugger
          // console.log(scope.tabsData,first,first.active)
          if (first.active) {
            first = scope.tabsData[scope.tabsData.length - 2];
            removeV(first)
            // scope.tabsData.removeAt(scope.tabsData.length - 2);
          }

          else {
            // first = scope.tabsData.pop();
            first = removeV(scope.tabsData[scope.tabsData.length - 1])
          }

          addC(first)
          // scope.tabsCollapse.push(first);
          scope.currTabsWidth -= (first.width);

        }
      }


      if (last) {
        if (navTabsWidth - scope.currTabsWidth > last.width) {
          last = removeC(scope.tabsCollapse.length - 1)
          // last = scope.tabsCollapse.pop();
          addV(last, scope.tabsData.length - 1)
          // scope.tabsData.insertAt(scope.tabsData.length - 1, last);
          scope.currTabsWidth += last.width;
        }
      }

    }

    scope.oldNavTabsWidth = navTabsWidth;

  }

  //tab容器宽度自适应：以待添加到容器中的tab为参数，容器宽度不足替换掉之前的tab
  function tabReplaceWidthAutoAdapt(newTab) {
    var tabsWidth = scope.oldNavTabsWidth;
    var firstWidth = 0;
    scope.currTabsWidth = 0;
    for (var i = 0; i < scope.tabsData.length - 1; i++) {
      scope.currTabsWidth += scope.tabsData[i].width;
    }
    //如果要显示的tab宽度与隐藏的tab宽度大于所剩空间，再隐藏一个tab
    if (scope.currTabsWidth + newTab.width > tabsWidth) {
      firstWidth = scope.tabsData[0].width;
      scope.currTabsWidth -= firstWidth;
      addC(removeV(0))
      // scope.tabsCollapse.push(scope.tabsData.shift());
      if (scope.currTabsWidth + newTab.width > tabsWidth) {
        firstWidth = scope.tabsData[0].width;
        scope.currTabsWidth -= firstWidth;
        addC(removeV(0))
        // scope.tabsCollapse.push(scope.tabsData.shift());
      }

    }
    scope.currTabsWidth += newTab.width;
  }

  var methods = {};

  var methods = {
    closeAllTabs: closeAllTabs,
    closeCollapseTabItem: closeCollapseTabItem,
    closeCollapseTabItemByClick: closeCollapseTabItemByClick,
    closeCurrTab: closeCurrTab,
    closeOtherTabs: closeOtherTabs,
    closeTabItem: closeTabItem,
    closeTabItemOnClick: closeTabItemOnClick,
    findActiveTabIdx: findActiveTabIdx,
    findTabItem: findTabItem,
    openCollapseMenuInTabs: openCollapseMenuInTabs,
    openCollapseMenuInTabsOnClick: openCollapseMenuInTabsOnClick,
    openMenuInTabs: openMenuInTabs,
    selectTabItem: selectTabItem,
    selectTabItemOnClick: selectTabItemOnClick,
    tabsAutoLayout: tabsAutoLayout,
    tabCollapseToData: tabCollapseToData,
    tabReplaceWidthAutoAdapt: tabReplaceWidthAutoAdapt,
  }

  $.extend(scope, methods);

  // mainContent = {
  //   openInTab: openInTab,
  //   onMenuItemSelected: onMenuItemSelected,
  //   scope: scope
  // }
  // $.extend(mainController, mainContent, scope)

  $.fn.megatab = function (opts) {
  	var defaults = {

  	};

	options = $.extend(defaults, opts);  //应用参数
	//tab面板宽度随浏览器宽度自适应：

	$(window).resize(function () {
		scope.tabsAutoLayout();
	});

	$("#rb-close-all").click(methods.closeAllTabs)
	$("#rb-close-other").click(methods.closeOtherTabs)
	return {
		onToggle: onToggle,
		methods: methods
	}
  }
})(window, jQuery)