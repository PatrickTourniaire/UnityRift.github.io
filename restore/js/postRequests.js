$(document).ready(function(){
    $('.header').click(function() {
        var key = $(this).attr('class').split(' ')[3];
        var topic = $(this).attr('class').split(' ')[4];
        console.log(key);

        $( ".loading" ).animate({
          left: "+=100%"
        }, 200, function() {
          var params = { article: key };
          var str = jQuery.param( params );
          window.location.replace("https://unityrift.github.io/restore/article.html" + "?" + str);
        });
    });

    $('.nav-pages .nav a').click(function() {
        var category = $(this).attr('id');
        console.log(category);

        if (category != "home") {
          $( ".loading" ).animate({
            left: "+=100%"
          }, 200, function() {
            var params = { categories: category };
            var str = jQuery.param( params );
            window.location.replace("https://unityrift.github.io/restore/topic.html" + "?" + str);
          });
        }
    });
});
