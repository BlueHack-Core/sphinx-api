/*****
* CONFIGURATION
*/
  //Main navigation
  $.navigation = $('nav > ul.nav');

	$.panelIconOpened = 'icon-arrow-up';
	$.panelIconClosed = 'icon-arrow-down';

	//Default colours
	$.brandPrimary =  '#20a8d8';
	$.brandSuccess =  '#4dbd74';
	$.brandInfo =     '#63c2de';
	$.brandWarning =  '#f8cb00';
	$.brandDanger =   '#f86c6b';

	$.grayDark =      '#2a2c36';
	$.gray =          '#55595c';
	$.grayLight =     '#818a91';
	$.grayLighter =   '#d1d4d7';
	$.grayLightest =  '#f8f9fa';

'use strict';

/****
* MAIN NAVIGATION
*/

$(document).ready(function($){

  // Add class .active to current link
  $.navigation.find('a').each(function(){

    var cUrl = String(window.location).split('?')[0];

    if (cUrl.substr(cUrl.length - 1) == '#') {
      cUrl = cUrl.slice(0,-1);
    }

    if ($($(this))[0].href==cUrl) {
      $(this).addClass('active');

      $(this).parents('ul').add(this).each(function(){
        $(this).parent().addClass('open');
      });
    }
  });

  // Dropdown Menu
  $.navigation.on('click', 'a', function(e){

    if ($.ajaxLoad) {
      e.preventDefault();
    }

    if ($(this).hasClass('nav-dropdown-toggle')) {
      $(this).parent().toggleClass('open');
      resizeBroadcast();
    }

  });

  function resizeBroadcast() {

    var timesRun = 0;
    var interval = setInterval(function(){
      timesRun += 1;
      if(timesRun === 5){
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }

  /* ---------- Account Nav ---------- */
  $('.app-topper .account-name').click(function(){
    if ($('.account-nav').is(':visible')) {
      $('.account-nav').slideUp();
    } else {
      $('.account-nav').slideDown();
    }
  });

  /* ---------- Timeline view on fullscreen ---------- */
  $('.timeline-box .btn-fullscreen').click(function(){
    if ($('.timeline-box').hasClass('is-fullscreen')) {
      $('.timeline-box').removeClass('is-fullscreen');
      $('.project-box').removeClass('is-hide');
    } else {
      $('.project-box').addClass('is-hide');
      $('.timeline-box').addClass('is-fullscreen');
    }
  });

  /* ---------- Welcome Layer ----------- */
  $('.layer-welcome button').click(function(){
    $('.layer-welcome').slideUp('fast');
    $('.blind').fadeOut();
  });

  $('.organize-box li').click(function(){
    $(this).parent('ul').find('li').removeClass('is-select');
    $(this).addClass('is-select');
  });

  if($('.app-container').outerHeight() > $(document).height()){
    $('.app-footer').removeClass('fixed');
  } else {
    $('.app-footer').addClass('fixed');
  }

  $(window).resize(function(){
    if($('.app-container').outerHeight() > $(document).height()){
      $('.app-footer').removeClass('fixed');
    } else {
      $('.app-footer').addClass('fixed');
    }
  });

  $('.page-third button:enabled').click(function(){
    window.location.href = './project.html';
  });

  // Scroll detecting navigation
  var lastScroll = 0;
  $(window).on('scroll',function() {
    var scroll = $(window).scrollTop();
    if(lastScroll - scroll > 0) {
      $(".page-gnb").slideDown();
    } else if(scroll > 0){
      $(".page-gnb").slideUp();
    }
    lastScroll = scroll;
  });

});

function init(url) {

  /* ---------- Tooltip ---------- */
  $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

  /* ---------- Popover ---------- */
  $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}
