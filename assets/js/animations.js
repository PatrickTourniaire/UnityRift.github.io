// Action starters
var frontNav = $(".nav-front");
var card = $(".card");

// Manipulated
var frontContent = $(".front-content");
var cardHeader = $(".header-container");
            
frontNav.click(function() {
    
    if (frontContent.is(".nav-close")) {
        frontContent.removeClass("nav-close").addClass("nav-open");
    } else if (frontContent.is(".nav-open")) {
        frontContent.addClass("nav-close").removeClass("nav-open");
    } else {
        frontContent.removeClass("nav-close").addClass("nav-open");
    }
    
});

/*
card.mouseenter(function() {
    if (cardHeader.is("")) {
        
    } else {
        
    }
}).mouseout(function() {
    if (cardHeader.is("")) {
        
    } else {
        
    }
});
*/