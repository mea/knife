$(function () {
  'use strict';
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
      drag: function (event, ui) {
        var h = ui.position.top + 42 > $('#feng').height() ? ui.position.top + 42 : $('#feng').height();
        $('#feng').height(h);
        if (h > $(window).height() - 250) {
          autoSlice();
        }
        $('#pop1').remove();
        $('#arrow, #pop2').removeClass('hide');
      }
    });
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
      .animate({
        width: $(window).width() + 970,
        marginLeft: -($(window).width() + 970 >> 1)
      }, 2000)
      .animate({opacity: 0}, {duration: 500, complete: clear});
  }
  function clear() {
    $('#knife, #feng, #cover').remove();
    $('#share-modal').modal('show');
  }
});
function postToWb() {
  var _url = encodeURIComponent(document.location);
  var _assname = encodeURI("qqdigi");//你注册的帐号，不是昵称
  var _appkey = encodeURI("100678265");//你从腾讯获得的appkey
  var _pic = encodeURI('');//（例如：var _pic='图片url1|图片url2|图片url3....）
  var _t = '';//标题和描述信息
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

}