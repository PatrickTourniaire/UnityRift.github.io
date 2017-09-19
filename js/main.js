//Data
var single_objects = ["#maker", "#desc", "#press-info", "#lastned", "header"]
var devices = ["#pc", "#mobile"]

//Center object
$(function() {
    $('.main-content').css({
        'position' : 'absolute',
        'top' : '50%',
        'margin-top' : -$('.main-content').outerHeight()/2
    });
});

//Store current locations
var pc_pos = $("#pc").position();
var mobile_pos = $("#mobile").position();
var maker_pos = $("#maker").position();
    
//Set positions
$(function() {
    $('#pc').css({
        'top' : pc_pos.top,
        'left' : pc_pos.left,
        'position' : 'absolute'
    });
});
    
$(function() {
    $('#mobile').css({
        'top' : $(".main-content").height / 2 - $("#mobile").outerHeight / 2,
        'left' : mobile_pos.left,
        'position' : 'absolute'
    });
});


//onClick listeners
$(document).on("click", "#pc", function(e) {
    
    e.preventDefault();
    
    //Hide previous elements
    $(devices[1]).fadeOut(100);
    for(n = 0; n < single_objects.length; n++) {
        $(single_objects[n]).fadeOut(100);
    }
    
    $("#desc-pc").fadeIn(500);
    
    //Enlargen pc
    $("#pc").animate({
        width: "600px"
    }, 200);
    
    //Back to original
    $("#back").on("click", function() {
        $("#desc-pc").fadeOut(100);
        
        $(devices[1]).fadeIn(500)
        for(n = 0; n < single_objects.length; n++) {
            $(single_objects[n]).fadeIn(500);
        }
        
        //Decenter pc
        $("#pc").animate({
            width: "400px"
        }, 200);
    });
    
});

$(document).on("click", "#mobile", function(e) {
    e.preventDefault();
    
    //Hide previous elements
    $(devices[0]).fadeOut(100);
    for(n = 0; n < single_objects.length; n++) {
        $(single_objects[n]).fadeOut(100);
    }
    
    $("#desc-pc").fadeIn(500);
    
    //Enlargen pc
    $("#mobile").animate({
        height: "300px"
    }, 200);
    
    //Back to original
    $("#back").on("click", function() {
        $("#desc-pc").fadeOut(100);
        
        $(devices[0]).fadeIn(500)
        for(n = 0; n < single_objects.length; n++) {
            $(single_objects[n]).fadeIn(500);
        }
        
        //Decenter pc
        $("#mobile").animate({
            height: "100px"
        }, 200);
    });
});
