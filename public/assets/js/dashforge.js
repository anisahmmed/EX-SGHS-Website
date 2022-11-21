
$(function(){
  'use strict'

  feather.replace();

  ////////// NAVBAR //////////

  // Initialize PerfectScrollbar of navbar menu for mobile only
  if(window.matchMedia('(max-width: 991px)').matches) {
    if($('#navbarMenu').length){
      const psNavbar = new PerfectScrollbar('#navbarMenu', {
        suppressScrollX: true
      });
    }
  }

  // Showing sub-menu of active menu on navbar when mobile
  function showNavbarActiveSub() {
    if(window.matchMedia('(max-width: 991px)').matches) {
      $('#navbarMenu .active').addClass('show');
    } else {
      $('#navbarMenu .active').removeClass('show');
    }
  }

  showNavbarActiveSub()
  $(window).resize(function(){
    showNavbarActiveSub()
  })

  // Initialize backdrop for overlay purpose
  $('body').append('<div class="backdrop"></div>');


  // Showing sub menu of navbar menu while hiding other siblings
  $('.navbar-menu .with-sub .nav-link').on('click', function(e){
    e.preventDefault();
    $(this).parent().toggleClass('show');
    $(this).parent().siblings().removeClass('show');

    if(window.matchMedia('(max-width: 991px)').matches) {
      psNavbar.update();
    }
  })

  // Closing dropdown menu of navbar menu
  $(document).on('click touchstart', function(e){
    e.stopPropagation();

    // closing nav sub menu of header when clicking outside of it
    if(window.matchMedia('(min-width: 992px)').matches) {
      var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
      if(!navTarg) {
        $('.navbar-header .show').removeClass('show');
      }
    }
  })

  $('#mainMenuClose').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('navbar-nav-show');
  });

  $('#sidebarMenuOpen').on('click', function(e){
    e.preventDefault();
    $('body').addClass('sidebar-show');
  })

  // Navbar Search
  $('#navbarSearch').on('click', function(e){
    e.preventDefault();
    $('.navbar-search').addClass('visible');
    $('.backdrop').addClass('show');
  })

  $('#navbarSearchClose').on('click', function(e){
    e.preventDefault();
    $('.navbar-search').removeClass('visible');
    $('.backdrop').removeClass('show');
  })



  ////////// SIDEBAR //////////

  // Initialize PerfectScrollbar for sidebar menu
  if($('#sidebarMenu').length) {
    const psSidebar = new PerfectScrollbar('#sidebarMenu', {
      suppressScrollX: true
    });


    // Showing sub menu in sidebar
    $('.sidebar-nav .with-sub').on('click', function(e){
      e.preventDefault();
      $(this).parent().toggleClass('show');

      psSidebar.update();
    })
  }


  $('#mainMenuOpen').on('click touchstart', function(e){
    e.preventDefault();
    $('body').addClass('navbar-nav-show');
  });

  $('#sidebarMenuClose').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('sidebar-show');
  });

  $('.chat__close').on('click', function(e){
    e.preventDefault();
    $('.chat__bubble_part').addClass('d-none');
  });

  $('.this__close').on('click', function(e){
    e.preventDefault();
    $('.registration_notice').addClass('d-none');
  })
  

  // hide sidebar when clicking outside of it
  $(document).on('click touchstart', function(e){
    e.stopPropagation();

    // closing of sidebar menu when clicking outside of it
    if(!$(e.target).closest('.burger-menu').length) {
      var sb = $(e.target).closest('.sidebar').length;
      var nb = $(e.target).closest('.navbar-menu-wrapper').length;
      if(!sb && !nb) {
        if($('body').hasClass('navbar-nav-show')) {
          $('body').removeClass('navbar-nav-show');
        } else {
          $('body').removeClass('sidebar-show');
        }
      }
    }
  });

  $(document).ready(function(){

    $(".quickMenu").endlessRiver({

      // scrolling speed in ms
      speed: 40,
      // pause on hover
      pause: true,
      // shows play / pause buttons
      buttons: false
      
    });

  });

});



function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  let user = getCookie(cname);
  if (user != "") {
    return true;
  } else {
    return false;
  }
}

function update_msg_count(count){
  if(count > 0){
      $('.msg__count').html(count).show();
      $('.chat__new').show();
  } else {
      $('.msg__count').html('0').hide();
      $('.chat__new').hide();
  }
}

function open_chat(){
  tidioChatApi.display(true);
  tidioChatApi.open();

  setCookie('chatWindowOpen-v1','yes',1);
  setCookie('chatCount-v1',0,1);
  update_msg_count(0);
  $('.chat__bubble_part').hide();
  stopBlink('chat__new');
}

function playSound() {
  const audio = new Audio('./assets/sound/alert.mp3');
  audio.play();
}

function blinkNow(className){
  if(!($('.' + className).hasClass('blink_me'))){
    $('.' + className).addClass('blink_me');
  }
}

function stopBlink(className){
  if($('.' + className).hasClass('blink_me')){
    $('.' + className).removeClass('blink_me');
  }
}


$('#web-share-button').on('click', () => {
    if (navigator.share) {
      navigator.share({
          title: 'Home delivery Laundry & dry cleaning service in Dhaka',
          text: 'We collect and deliver laundry & dry cleaning service to your doorstep. Easy & cost effective. Take service now.',
          url: 'https://www.dhopaghat.com',
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      $('#web-share-button').css('display','none');
      $('#addthis_share_buttons').css('display','block');
      $('#addthis_share').css('display','block');
    }
});
