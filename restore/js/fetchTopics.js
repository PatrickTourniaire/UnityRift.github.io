var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var category = getUrlParameter('categories');
console.log("category:", category);

var db = firebase.database();
var mainRef = db.ref().child("articles");

//Loading
let loadingState = $('.loading');
let body = $('body');
let main = $('main');

$("html").scrollTop(0);

//Declare specific topic refference
switch (category) {
  case "cm":
    var topicRef = mainRef.child("computer modeling");
    break;
  case "data":
    var topicRef = mainRef.child("data");
    break;
  case "ml":
    var topicRef = mainRef.child("machine learning");
    break;
  case "medicine":
    var topicRef = mainRef.child("medicine");
    break;
  case "robots":
    var topicRef = mainRef.child("robots");
    break;
  default:
    var topicRef = mainRef;
}


//Read topic articles
topicRef.on('child_added', function(data) {

  var data = {
        title: data.val().title,
        img: data.val().img,
        desc: data.val().description,
        date: data.val().date,
        author: data.val().author,
        key: data.key,
        category: category
    }

    addArticle(data.key, data, 201);

    $('.header').click(function() {
        var key = $(this).attr('class').split(' ')[3];
        var category = $(this).attr('class').split(' ')[4];
        console.log("key: " + key + " category: " + category);

        let mainFeed = $('.feed');
        mainFeed.addClass('slideOff');
        var articleKey = { article: key };
        var categoryKey = { category: category };
        var categoryStr = jQuery.param(categoryKey);
        var articleStr = jQuery.param(articleKey);
        window.location.replace("https://unityrift.github.io/restore/article.html" + "?" + articleStr + "&" + categoryStr);
    });

});


topicRef.on('child_removed', function(data) {
    removeProject(data.key);
});

function addArticle(key, data, type) {
  var template = $("#article-tenplate").html();
  var card = Mustache.render(template, data);

  if (type == 200) {
    $(".top-articles").append(card);
  } else if (type == 201) {
    $(".topic-articles .articles-wrapper").append(card);
  }

  loadingState.addClass("reveal");
  main.css({
    "display": "block"
  });
  body.css({
    "overflow": "auto",
    "height": "auto"
  });


}

function removeProject(key) {
    $("." + key).remove();
}
