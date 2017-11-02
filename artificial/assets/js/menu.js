
$(document).ready(function(){

    var nav = $('.nav');
    var menu = $('#menu');
    var close = $('#close');

    menu.click(function() {
        nav.addClass("open");
    });
    
    close.click(function() {
        nav.removeClass("open");
    });

});