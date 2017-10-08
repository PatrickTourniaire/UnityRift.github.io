// Manipulated
var headerBody = $(".header-body");
var headerTxt = $("#header_txt");
var headerDate = $("#header_date");

// Article Scroll
$(window).on('scroll', function() {
    var topWindow = $(window).scrollTop();
    var topHeader = headerBody.offset().top;
    var dist = (topHeader - topWindow);

    console.log("top" + dist);
    
    if (dist <= 0) {
        headerBody.removeClass("fade-in");
        headerBody.addClass("header-fix");
    }
});