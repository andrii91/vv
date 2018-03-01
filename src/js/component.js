$(document).ready(function () {
    $(".footer-list li a").fancybox();
  $('.lazyYT').lazyYT();
  var heightS = $('.item-animation').parents('section').scrollTop() + $('.item-animation').parents('section').height();
  console.log(heightS);
  $(document).scroll(function () {
    y = $(this).scrollTop() / 25;
    //    console.log(y)

/*
    $('.item-animation').css({
      'background-position-y': +y + '%',
      'transition' : 'all 3s'
    });*/
    if (heightS < $(this).scrollTop()) {
      y = 0;
    }
  });

  $('.concept-list li').hover(function () {
    $('#concept-img img').attr('src', $(this).data('img'));
    $('#concept-img .concept-date').text($(this).data('date'));
    $('.concept-btn').text($(this).text());
    $('.concept-btn').attr('href', $(this).data('link'));
  });

  $('#concept-img img').attr('src', $('.concept-list li').first().data('img'));
    $('#concept-img .concept-date').text($('.concept-list li').first().data('date'));
    $('.concept-btn').text($('.concept-list li').first().text());
    $('.concept-btn').attr('href', $('.concept-list li').first().data('link'));

  $('.registration-form input, .registration-form textarea').focus(function () {
    $('.registration-form label').removeClass('active');
    $(this).parent().addClass('active');
  });

  $('.nav-btn').click(function () {
    $('.nav').toggleClass('active');
  })

  $('.gmap').each(function () {
    var container = this;

    var mapOptions = {
      zoom: $(container).data('zoom'),
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      scrollwheel: false, //zoom on scroll
      draggable: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(container, mapOptions);
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': $(container).data('address')
      },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            icon: $(container).data('marker')
          });
          map.setCenter(results[0].geometry.location);
        }
      }
    );

  });

  $('.tab-link li').click(function () {
    $('.tab-link li').removeClass('active')
    $('.tab-content .tab-item').removeClass('active');
    $(this).addClass('active');
    $("#" + $(this).data('tab')).addClass('active');
  })

  $('#of_work').viewportChecker({
    classToAdd: 'visible', // Class to add to the elements when they are visible,
    classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
    classToRemove: 'invisible', // Class to remove before adding 'classToAdd' to the elements
    removeClassAfterAnimation: false, // Remove added classes after animation has finished
    offset: 10,
    invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
    repeat: false, // Add the possibility to remove the class if the elements are not visible
    callbackFunction: function (elem, action) {
      $('#of_work .iframe').each(function () {
        var $this = $(this);
        $this.append('<iframe src="//www.youtube.com/embed/' + $this.data('youtube-id') + '?version=3&loop=1&autoplay=1&mute=1" allowfullscreen></iframe>');
      });


    },
    scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
  });

  $('.project-list li').viewportChecker({
    classToAdd: 'visible',
    offset: "50%",
    repeat: true
  });

  if ($(window).width() < 1200) {

    $(window).scroll(function () {
    return $('.nav').toggleClass("bg", $(window).scrollTop() > 480);
  });
  }
  if ($(window).width() > 1200) {
      setTimeout(function(){
        $('.head-title, .head-info').animate({
          opacity: 0,
        }, 2000);
      },1000);

    $('.project_page-list li').addClass("hidden_animation").viewportChecker({
      classToAdd: 'visible animated slideInUp', // Class to add to the elements when they are visible
      offset: "20%",
      offset: 0
    });
    $.stellar({
    responsive: false,
    horizontalScrolling: false,
  });
  }
  if ($(window).width() < 1200 && $(window).width() > 767) {

    $('.of_work-grid .of_work-item:nth-child(7)').css({
      'height': $('.of_work-grid .of_work-item:nth-child(6)').height() + 'px'
    })
  }

  $(window).resize(function () {
    if ($(window).width() < 1200 && $(window).width() > 767) {

      $('.of_work-grid .of_work-item:nth-child(7)').css({
        'height': $('.of_work-grid .of_work-item:nth-child(6)').height() + 'px'
      })
    }
  })

  $('.project_page').viewportChecker({
    classToAdd: 'fixed',
    offset: "70%",
    repeat: true,
    callbackFunction: function (elem, action) {
      $(window).scroll(function () {
        var y = 200 - $(this).scrollTop();
        if (y < 20) {
          y = 20;
        }

        $('.project_page-item').css({
          'top': y + "px",
        })
      })

    }
  });


  $('.photo-gif img').hover(function () {
      var photo = $(this).attr('src');
      var gif = $(this).data('gif');
      $(this).attr('src', gif);
      $(this).data('gif', photo);
    },
    function () {
      var gif = $(this).attr('src');
      var photo = $(this).data('gif');
      $(this).attr('src', photo);
      $(this).data('gif', gif);
    })

  $('.project-list li .project_h').click(function () {
    $('.project-list li').removeClass('full-visible')
    var off = $(window).height() / 2 - $(this).height() / 2;
    var destination = $(this).offset().top - off;
    console.log('destination', destination);
    $("body,html").animate({
      scrollTop: destination
    }, 500);
  })

  function myCallback() {
    console.log("5656");
  }

  $(".list-img").fancybox();

  /*   new Vivus('my-svg', {
        duration: 3000,
        file: 'images/s1.svg'
      }, myCallback);*/

  /*
    new Vivus('mySVG', {}, function (obj) {
      obj.el.classList.add('finished');
    });
    */

  document._video = document.getElementById("video");

  function getVideo() {
    return document._video;
  }


  $('.sound').click(function () {
    getVideo().muted = false;
    $(this).hide();
    $('.muted').show();
  });

  $('.muted').click(function () {
    getVideo().muted = true;
    $(this).hide();
    $('.sound').show();
  });


});

$(function() {
  // Parallax background
  // http://markdalgleish.com/projects/stellar.js/docs/
  

$('.project-title').viewportChecker({
    offset: "0%",
    repeat: true,
    callbackFunction: function (elem, action) {
      console.log(action);
      if(action == 'add') {
        $('#private .project-list li').first().addClass('full-visible');
        $('#commercial .project-list li').first().addClass('full-visible');
      }else{
        $('#private .project-list li').first().removeClass('full-visible');
        $('#commercial .project-list li').first().removeClass('full-visible');
      }
    }
  });

  $('.footer').viewportChecker({
    offset: "20%",
    repeat: true,
    callbackFunction: function (elem, action) {
      console.log('f',action);
      if(action == 'add') {
        $('#private .project-list li').last().addClass('full-visible');
        $('#commercial .project-list li').last().addClass('full-visible');
      }else{
        $('#private .project-list li').last().removeClass('full-visible');
        $('#commercial .project-list li').last().removeClass('full-visible');
      }
    }
  });
  
});

$(document).ready(function() { 

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    }
    $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
    $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
    $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
    $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
    $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
    $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
    $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
    $('input[name="user_agent"]').val(navigator.userAgent);
    $('input[name="ref"]').val(document.referrer);
    $('input[name="page_url"]').val(window.location.hostname+window.location.pathname);
    
    $.get("https://ipinfo.io", function(response) {
        $('input[name="ip_address"]').val(response.ip);
        $('input[name="city"]').val(response.city);
    }, "jsonp");

    function readCookie(name) {
        var n = name + "=";
        var cookie = document.cookie.split(';');
        for (var i = 0; i < cookie.length; i++) {
            var c = cookie[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(n) == 0) {
                return c.substring(n.length, c.length);
            }
        }
        return null;
    }
    setTimeout(function() {
        $('.gclid_field').val(readCookie('gclid'));
        if ($('.gclid_field').val() == '') {
          $('.gclid_field').val(readCookie('_gid'));
        }
    }, 2000);

    /*db/registration.php*/

    /* form valid*/
    var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
    var error;
    $('.submit').click(function(e) {
        e.preventDefault();
        var ref = $(this).closest('form').find('[required]');
        $(ref).each(function() {
            if ($(this).val() == '') {
                var errorfield = $(this);
                if ($(this).attr("type") == 'email') {
                      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                       if (!pattern.test($(this).val())) {
                        $("input[name=email]").val('');
                        $(this).addClass('error').parent('label').append('<div class="allert"><p>Укажите коректный e-mail</p>' + alertImage + '</div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }else if($(this).attr("type") == 'tel'){
                    var patterntel = /^()[- +()0-9]{9,18}/i;
                    if (!patterntel.test($(this).val())) {
                        $("input[name=phone]").val('');
                        $(this).addClass('error').parent('label').append('<div class="allert"><p>Укажите номер телефона в формате +3809999999</p>' + alertImage + '</div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }else{
                    $(this).addClass('error').parent('label').append('<div class="allert"><p>Заполните это поле</p>' + alertImage + '</div>');
                    error = 1;
                    $(":input.error:first").focus();
                }
                return;
            } else {
                error = 0;
                $(this).parent('label').find('.allert').remove();
            }
        });
        if (error !== 1) {
            $(this).unbind('submit').submit();
        }
    });

    /*end form valid*/
    
    $('form').on('submit', function(e) {
        e.preventDefault();
        $('.submit').addClass('inactive');
        $('.submit').prop('disabled', true);
        var $form = $(this);
        var $data = $form.find('input');



        $.ajax({
            type: 'POST',
            url: '/main/mail.php',
            dataType: 'json',
            data: $form.serialize(),
            success: function(response) {
            }
        });

        setTimeout(function(){
              window.location.href = "/success/";
          }, 800);

    });
  
  

});
