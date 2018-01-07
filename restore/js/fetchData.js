
//Init databse
var db = firebase.database();
var newestRef = db.ref().child("articles").orderByKey().limitToFirst(1);
var topRef = db.ref().child("articles").orderByKey().limitToFirst(4);

$("html").scrollTop(0);

//Data
let latestTitle = $('.latest-title');
let latestDesc = $('.latest-desc');
let latestAuthor = $('.latest-author');
let latestDate = $('.latest-date');

//Loading
let loadingState = $('.loading');
let body = $('body');
let main = $('main');

//Read newest article
newestRef.on('child_added', function(data) {

  latestTitle.html(data.val().title);
  latestAuthor.html(data.val().author);
  latestDate.html(data.val().date);
  $('.latest-article').css({
    'background-image': 'url(' + data.val().img + ')',
    'background-size': 'cover'
  });

  latestTitle.addClass(data.key);

});

//Read hottest articles
topRef.on('child_added', function(data) {

  var data = {
    title: data.val().title,
    img: data.val().img,
    desc: data.val().description,
    date: data.val().date,
    author: data.val().author,
    key: data.key
    }

    addArticle(data.key, data, 200);

    $('.header').click(function() {
        var key = $(this).attr('class').split(' ')[3];
        console.log(key);

        let mainFeed = $('.feed');
        mainFeed.addClass('slideOff');
        var params = { article: key };
        var str = jQuery.param( params );
        window.location.replace("https://unityrift.github.io/restore/article.html" + "?" + str);
    });

});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    console.log("Logged in");
    var user = firebase.auth().currentUser;

    user.providerData.forEach(function (profile) {
      console.log("  Provider-specific UID: " + profile.uid);

      var topicVal = $('#topic-personal option:selected').val()
      console.log("topicVal: " + topicVal);
      var topicRef = db.ref().child("articles").child(topicVal).limitToFirst(9);

      $(".topic-sect-header").html(topicVal);

      //Read topic articles
      topicData(topicRef, topicVal);
    });

  } else {
    var ref = db.ref().child("articles").limitToFirst(9);
    topicData(ref, null);
  }
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

function topicData(ref, topicVal) {
  ref.on('child_added', function(data) {

    var data = {
          title: data.val().title,
          img: data.val().img,
          desc: data.val().description,
          date: data.val().date,
          author: data.val().author,
          key: data.key,
          category: topicVal
      }

      addArticle(data.key, data, 201);

      $('.header').click(function() {
          var key = $(this).attr('class').split(' ')[3];
          var topicVal = $(this).attr('class').split(' ')[4];
          console.log(key);

          switch (topicVal) {
            case "computer":
              var topicPost = "cm";
              break;
            case "data":
              var topicPost = "data";
              break;
            case "machine":
              var topicPost = "ml";
              break;
            case "medical":
              var topicPost = "medicine";
              break;
            case "robots":
              var topicPost = "robots";
              break;
            default:
              var topicPost = null;
          }

          let mainFeed = $('.feed');
          mainFeed.addClass('slideOff');
          var paramsArticle = { article: key };
          var paramsTopic = {category: topicPost};
          var strArticle = jQuery.param( paramsArticle );
          var strTopic = jQuery.param( paramsTopic );
          window.location.replace("https://unityrift.github.io/restore/article.html" + "?" + strArticle + "&" + strTopic);
      });
    });
}
