//Data
var single_objects = ["#maker", "#desc", "#press-info", "#lastned", "header"]

//onClick listeners
$(document).on("click", "#pc", function(e) {
    
    e.preventDefault();
    
    //Hide previous elements
    for(n = 0; n < single_objects.length; n++) {
        $(single_objects[n]).slideUp(130);
    }
    
    $("#desc-pc").slideDown( 200 );
    
    //Back to original
    $("#back").on("click", function() {
        $("#desc-pc").slideUp( 260 );
        
        for(n = 0; n < single_objects.length; n++) {
            $(single_objects[n]).slideDown(200);
        }
    });
    
});

