let articleAuthor = $(".latest-author");
let articleDate = $(".latest-date");

let articleHeader = $("latest-title");
let articleDesc = $(".latest-desc");

let articleImg = $(".article-img");
let articleHolder = $(".article-parent");

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

var articleId = getUrlParameter('article');
var articleCategory = getUrlParameter('category');
console.log("id:", articleId, " type:", articleCategory);

var db = firebase.database();
var mainRef = db.ref().child("articles").child(articleId);

//Loading
let loadingState = $('.loading');
let body = $('body');
let main = $('main');

//Declare specific topic refference
switch (articleCategory) {
  case "cm":
    var articleRef = db.ref().child("articles").child("computer modeling").child(articleId);
    break;
  case "data":
    var articleRef = db.ref().child("articles").child("data").child(articleId);
    break;
  case "ml":
    var articleRef = db.ref().child("articles").child("machine learning").child(articleId);
    break;
  case "medicine":
    var articleRef = db.ref().child("articles").child("medicine").child(articleId);
    break;
  case "robots":
    var articleRef = db.ref().child("articles").child("robots").child(articleId);
    break;
  default:
    var articleRef = mainRef;
}

//Read article data
articleRef.on('child_removed', function(data) {
    removeProject(data.key);
});

articleRef.once('value').then(function(snapshot) {
  articleHeader.html(snapshot.val().title);
  articleAuthor.html(snapshot.val().author);
  articleDate.html(snapshot.val().date);
  articleDesc.html(snapshot.val().description);
  articleImg.attr("src", snapshot.val().img);
  articleHolder.append(snapshot.val().article);

  loadingState.addClass("reveal");
  main.css({
    "display": "block"
  });
  body.css({
    "overflow": "auto",
    "height": "auto"
  });
});

function removeProject(key) {
    $("." + key).remove();
}
