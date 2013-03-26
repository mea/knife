$(function () {
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
        var h = ui.position.top + 483 > $('#feng').height() ? ui.position.top + 483 : $('#feng').height();
        $('#feng').height(h);
        if (h > $(window).height()) {
          afterSlice();
        }
      }
    });
  function afterSlice() {
    $('#knife')
      .off()
      .draggable('destroy')
      .animate({top: $(window).height() + 50}, 1000);
    $('#feng').animate({opacity: 0}, 500);
    $('#cover')
      .animate({
        width: $(window).width() + 970,
        marginLeft: -($(window).width() + 970 >> 1)
      }, 2000)
      .animate({
        opacity: 0,
        onComplete: clear
      }, 500);
  }
  function clear() {
    $('#knife, #feng, #cover').remove();
  }
});