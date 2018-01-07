$(window).scroll(function() {
  var topOfScreen = $(window).scrollTop();
  var topOfNav = $(".nav-pages").offset().top;

  if (topOfScreen >= topOfNav) {
    $(".nav-pages").css("position", "fixed");
  } else {
    console.log("nav is fine");
    $(".nav-pages").css("position", "static");
  }
});
