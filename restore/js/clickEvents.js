
// Like Animation
$(".heart").on('click touchstart', function(){
  $(this).addClass('is_animating');
});


// Login handler
$(".login-btn").click(function() {
  $(".login-state").addClass("fade-in");
  $(".login-state .login-box").addClass("zoom-in");
});

$(".exit-login").click(function() {
  $(".login-state").removeClass("fade-in");
  $(".login-state .login-box").removeClass("zoom-in");
});

//About click
$(".about-toggle").click(function() {
  $(".about-state").addClass("fade-in");
  $(".about-state .login-box").addClass("zoom-in");
});

$(".exit-login").click(function() {
  $(".about-state").removeClass("fade-in");
  $(".about-state .login-box").removeClass("zoom-in");
});

//Bookmarks click
$("#board").click(function() {
  $(".bookmarks").addClass("fade-in");
  $(".bookmarks .login-box").addClass("zoom-in");
});

$(".exit-login").click(function() {
  $(".bookmarks").removeClass("fade-in");
  $(".bookmarks .login-box").removeClass("zoom-in");
});

//Profile options
$('#profile-img').click(function(){
  $('.profile-menu').toggle();
});

$(document).click(function(e) {
  var target = e.target;
  if (!$(target).is('#profile-img') && !$(target).parents().is('#profile-img')) {
    $('.profile-menu').hide();
  }
});

//Signout
$("#sign-out").click(function() {
  firebase.auth().signOut().then(function() {
    console.log("Signed out");
  }, function(error) {
    // An error happened.
  });
});
