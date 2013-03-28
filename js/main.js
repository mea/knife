$(function () {
  'use strict';
  if (document.cookie.indexOf('0328new') !== -1) {
    $('#cover').remove();
    return;
  }
  // 写cookie
  var now = new Date();
  now.setDate(now.getDate() + 365);
  document.cookie = '0328new=1;expires=' + now.toUTCString();
  var scrollHeight = 0,
      sliceHeight = 0,
      hasAnimation = supportsTransitions();

  // 把东西显示出来
  $('#cover div, #knife, #pop1, #feng').removeClass('hide');
  $('#knife')
    .on({
      'mouseover': function () {
        $(this).removeClass('animated flash');
      },
      'mouseout': function () {
        $(this).addClass('animated flash');
      }
    })
    .draggable({
      axis: 'y',
      scroll: false,
      drag: onScroll
    });
  var interval = setInterval(function () {
    if (document.body.offsetHeight < 1000) {
      return;
    }
    scrollHeight = document.body.offsetHeight - $(window).height();
    sliceHeight = $(window).height() - 240;
    if (scrollHeight > 0) {
      $(window).scroll(onScroll);
    }
    clearInterval(interval);
  }, 500);

  // 给不能css动画的东西加上动画
  if (!hasAnimation) {

  }

 function autoSlice() {
    $('#arrow, #pop2').remove();
    $('#knife').animate({top: $(window).height()}, 400);
    $('#feng')
      .animate({height: $(window).height()}, {duration: 400, complete: afterSlice})
      .animate({opacity: 0}, 500);
  }
  function afterSlice() {
    $('#knife')
      .off()
      .animate({top: $(window).height() + 50}, 1000);
    $('#cover')
      .addClass('after')
      .animate({
        width: $(window).width() + 960,
        marginLeft: -($(window).width() + 960 >> 1)
      }, 2000)
      .animate({opacity: 0}, {duration: 500, complete: clear});
    $(window).off('scroll').scrollTop(0);
  }
  function clear() {
    $('#knife, #feng, #cover').remove();
    $('#share-modal').modal('show');
  }
  function onScroll(event, ui) {
    var h = 0;
    if (ui) {
      h = ui.position.top + 42 > $('#feng').height() ? ui.position.top + 42 : $('#feng').height();
    } else {
      h = sliceHeight * $(window).scrollTop() / scrollHeight;
      $('#knife').css('top', h - 30);
    }
    $('#feng').height(h);
    if (h > $(window).height() - 250) {
      autoSlice();
    }
    $('#pop1').remove();
    $('#arrow, #pop2').removeClass('hide');
  }
});
function postToWb() {
  var _url = encodeURIComponent(document.location);
  var _assname = encodeURI("qqdigi");//你注册的帐号，不是昵称
  var _appkey = encodeURI("100678265");//你从腾讯获得的appkey
  var _pic = encodeURI('http://demo.meathill.com/knife/img/share.jpg');//（例如：var _pic='图片url1|图片url2|图片url3....）
  var _t = '腾讯手机 3月28日焕新上线 不破不立 我们需要你来划下“最后一刀”！';//标题和描述信息
  var metainfo = document.getElementsByTagName("meta");
  for(var metai = 0;metai < metainfo.length;metai++){
    if((new RegExp('description','gi')).test(metainfo[metai].getAttribute("name"))){
      _t = metainfo[metai].attributes["content"].value;
    }
  }
  _t =  document.title+_t;//请在这里添加你自定义的分享内容
  if(_t.length > 120){
    _t= _t.substr(0,117)+'...';
  }
  _t = encodeURI(_t);

  var _u = 'http://share.v.t.qq.com/index.php?c=share&a=index&url='+_url+'&appkey='+_appkey+'&pic='+_pic+'&assname='+_assname+'&title='+_t;
  window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}
function postToWeibo() {
  var pic = encodeURIComponent('http://demo.meathill.com/knife/img/share.jpg'),
      title = encodeURIComponent('腾讯手机 3月28日焕新上线 不破不立 我们需要你来划下“最后一刀”！'),
      url = 'http://v.t.sina.com.cn/share/share.php?appkey=',
      link = encodeURIComponent(document.location),
      param = '&url=' +  link + '&title=' + title + '&source=&sourceUrl=&content=UTF-8&pic=' + pic;
  function go() {
    if (!window.open(url + param, 'mb', 'toolbar=0, status=0, resizable=1, width=440, height=430, left=' + (screen.width - 440) / 2 + ',top=' + (screen.height - 430) / 2)) {
      location.href = url + param;
    }
  };
  if (/Firefox/.test(navigator.userAgent)) {
    setTimeout(go, 0);
  } else {
    go();
  }
}
function supportsTransitions() {
  var b = document.body || document.documentElement;
  var s = b.style;
  var p = 'transition';
  if(typeof s[p] == 'string') {return true; }

  // Tests for vendor specific prop
  v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
  for(var i=0; i<v.length; i++) {
    if(typeof s[v[i] + p] == 'string') { return true; }
  }
  return false;
}