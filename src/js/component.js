$(document).ready(function () {
  $('.lazyYT').lazyYT();
  var heightS = $('.item-animation').parents('section').scrollTop() + $('.item-animation').parents('section').height();
  console.log(heightS);
  $(document).scroll(function () {
    y = $(this).scrollTop() / 45;
    //    console.log(y)


    $('.item-animation').css({
      'background-position-y': +y + '%'
    });
    if (heightS < $(this).scrollTop()) {
      y = 0;
    }
  });

  $('.concept-list li').hover(function () {
    $('#concept-img img').attr('src', $(this).data('img'));
    $('#concept-img .concept-date').text($(this).data('date'));
    $('#concept-img .concept-date').text($(this).data('date'));
    $('.concept-btn').text($(this).text());
    $('.concept-btn').attr('href', $(this).data('link'));
  });

  $('.registration-form input').focus(function () {
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
  $('.project_page').viewportChecker({
    classToAdd: 'fixed',
    offset: "70%",
    repeat: true,
    callbackFunction: function (elem, action) {
      $(window).scroll(function () {
        var y = 200 - $(this).scrollTop();
        if (y < 0) {
          y = 0;
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

});