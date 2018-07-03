///------------------------------------------------------------------------///
///--------------------------------top-------------------------------------///
//アニメーション
$(function() {
  setTimeout('ani1()', 2400);
  setTimeout('ani2()', 3000); //1秒後に実行
});
function ani1() {
  var adScript = document.createElement("script");
  adScript.src = "top/js/top_canvas.js";
  document.getElementById('canvas').appendChild(adScript);//アニメーション用のクラスを追加
}

function ani2() {
  $('.title-container').addClass('title_anime');
    $('#prf-container-top').addClass('title_anime');
      $('.playbutton').addClass('title_anime'); //アニメーション用のクラスを追加
}

///------------------------------------------------------------------------///
///-------------------------------about------------------------------------///
$(function(){

$(".modalOpen").click(function(){
    var navClass = $(this).attr("class"),
    href = $(this).attr("href");

    $(href).fadeIn();
    $(this).addClass("open");
    //cssアニメーションの記述を追加する
    $(href).children(".inner").css("animation","modal 0.5s forwards");
    return false;
});

$(".modalClose").click(function(){
     $(this).parents(".modal").fadeOut();
     //$(".inner").fadeOut();
     $(".modalOpen").removeClass("open");
     //cssアニメーションの記述を追加する
      $(this).parents(".modal").children(".inner").css("animation","modalClose 0.5s forwards");
      return false;
});
});


///------------------------------------------------------------------------///
///-------------------------------works------------------------------------///
// 可変ヘッダー
$(function() {
  var $win = $(window),
      $header = $('header'),
      animationClass = 'active';

  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > 100 ) {
      $header.addClass(animationClass);
    } else {
      $header.removeClass(animationClass);
    }
  });
});

//videoスクロールふわっと表示
$(function() {
$(document).ready(function(){
  $('.fuwat').css('visibility','hidden');
  $(window).scroll(function(){
   var windowHeight = $(window).height(),
       topWindow = $(window).scrollTop();
   $('.fuwat').each(function(){
    var objectPosition = $(this).offset().top;
    if(topWindow > objectPosition - windowHeight + 200){
     $(this).addClass("fuwatAnime");}
		 else{
			$(this).removeClass("fuwatAnime");
		 }
   });
  });
});
});
// 要素の取得
/*var videoone = document.getElementById('videoone');
window.onload = function(){
    videoone.defaultPlaybackRate = 0.3;
    videoone.load();
}
var videotwo = document.getElementById('videotwo');
window.onload = function(){
    videotwo.defaultPlaybackRate = 0.5;
    videotwo.load();
}
var videothree = document.getElementById('videothree');
window.onload = function(){
    videothree.defaultPlaybackRate = 0.5;
    videothree.load();
}*/

//------------------------------------------------------------------------///
///-------------------------------play------------------------------------///
$('.icon').click(function(){
  $('#sound_modal-container').addClass('out');
//  $('body').removeClass('modal-active');
});

//------------------------------------------------------------------------///
///-------------------------------Fadein&out------------------------------------///
//-------------Fadein-------------
$(function(){
$('head').append(
  '<style type="text/css">.fadein{display:none;}</style>'
);
$(window).on("load",function() {
  $('body').fadeIn(800).removeClass("fadein");
});
});

//-------------Fadeout-------------
$(function(){
  $('.fadelink').on("click",function() {
    var url = $(this).attr('href');
    if (url != '') {
      $('body').addClass("fadeout");
      $('body').fadeOut(700);
      setTimeout(function(){
        location.href = url;
      }, 500);
    }
    return false;
  });

$(window).on("pageshow",function() {
  if (event.persisted) {
    window.location.reload();
  }
});
});
