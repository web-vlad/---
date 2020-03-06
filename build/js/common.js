
$(document).ready(function() {

    // HEADER Scroll
    var nav = $('.header-second--scroll');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            nav.addClass("sticky");
            //$('.header-wrapp').removeClass('header-fixed');
        } else {
            nav.removeClass("sticky");
            //$('.header-wrapp').addClass('header-fixed');
        }
    });

    // SHOW MAIN MENU
    $('.button-menu').click(function(e) {
        $(this).toggleClass('active');
        $('.box-main-menu').toggleClass('open');
        e.stopPropagation();
        e.preventDefault();
    });


    $('.close-menu, .box-main-menu').click(function() {
        $('.button-menu').removeClass('active');
        $('.box-main-menu').removeClass('open');
    });


    // ASIDE BASKET FIXED
    var basket_container = $(".basket-container");
    var basket = $(".basket-widget");

    var top_spacingBasket = 50;
    var waypoint_offsetBasket = -250;

    basket_container .waypoint({
        handler: function(event, direction) {

            if (direction == 'down') {

                basket_container .css({ 'height':basket.outerHeight() });
                basket.stop().addClass("sticky").css("top",-basket.outerHeight()).animate({"top":top_spacingBasket});

            } else {

                basket_container .css({ 'height':'auto' });
                basket.stop().removeClass("sticky").css("top",basket.outerHeight()+waypoint_offsetBasket).animate({"top":""});

            }

        },
        offset: function() {
            return -basket.outerHeight()-waypoint_offsetBasket;
        }
    });


    // ASIDE SUB MENU SHOW
    $a = $('.sup-menu .sub-menuAside');
    $a.on('click', function(event) {
        event.preventDefault();
        $a.not(this).children('ul').slideUp();
        $(this).children('ul').slideToggle();
        $(this).toggleClass('active');
        $a.not(this).removeClass('active');
    });

    // SHOW LEFT BAR
    $('.button-category').click(function(e) {
        $(this).toggleClass('active');
        $('.left-bar').toggleClass('open');
        e.stopPropagation();
        e.preventDefault();
    });

    // SCROLL BACK-TOP
    $("#back-top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }

        });

        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });

    }); //scrol back-top

});