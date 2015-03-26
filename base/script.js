/*jQuery*/

$(document).ready(function () {
    /*
    $("#navbox").draggable();
   */

    // Make an element draggable
    var makeDraggable = function(element) {
        element = jQuery(element);

        // Move the element by the amount of change in the mouse position
        var move = function(event) {
            if(element.data('mouseMove')) {
                var changeX = event.clientX - element.data('mouseX');
                var changeY = event.clientY - element.data('mouseY');

                var newX = parseInt(element.css('left')) + changeX;
                var newY = parseInt(element.css('top')) + changeY;

                element.css('left', newX);
                element.css('top', newY);

                element.data('mouseX', event.clientX);
                element.data('mouseY', event.clientY);
            }
        }

        element.mousedown(function(event) {
            element.data('mouseMove', true);
            element.data('mouseX', event.clientX);
            element.data('mouseY', event.clientY);                               
        });

        element.parents(':last').mouseup(function() {
            element.data('mouseMove', false);
        });

        element.mouseout(move);            
        element.mousemove(move);           
    }
    
    makeDraggable($("#menu"));
    
    
    var toggleMenu = function() {
        $('#menu>div>a').toggle();
        $('#sticky').toggle();
        
    }
    $("#menu>img").click( toggleMenu );
    
    
    
    $('#sticky').click(function(){
        $('#sticky').toggleClass("active");
        //alert("setting sticky to "+$('#sticky').hasClass('active'));
    });
    
    var menu = $("#menu");
    
    
    var countdown = 1000;
    
    var iid
    function moveToBorder () {
        if(!$('#sticky').hasClass("active")) {
            countdown = 0;
            var X = parseInt(menu.css("left"));
            var Y = parseInt(menu.css("top"));
            var size = 220;
            var height = window.innerHeight;
            var width = window.innerWidth;
            //alert("height: "+height+"\nwidth: "+width); 

            // DECIDE ON DIRECTION
            if (X <= Math.min(width-X-size, Math.min(Y, height-Y-size))) {
                // go left
                iid = setInterval( function () {
                    if (countdown == 0 && X>0) {
                        X = parseInt(menu.css("left")); 
                        menu.css("left", (X-1) +"px");
                    }
                    else {
                        clearInterval(iid);
                    }
                }, 20);  
            }
            else if (width-X-size <= Math.min(X, Math.min(Y, height-Y-size))) {
                // go right
                
                iid = setInterval( function () {
                    if (countdown == 0 && width-X-size>0) {
                        X = parseInt(menu.css("left")); 
                        menu.css("left", (X+1) +"px");
                    }
                    else {
                        clearInterval(iid);
                    }
                }, 20);  
            }
            else if (Y < Math.min(height-Y-size, Math.min(X, width-X-size))) {
                // go up
                
                iid = setInterval( function () {
                    if (countdown == 0 && Y>0) {
                        Y = parseInt(menu.css("top")); 
                        menu.css("top", (Y-1) +"px");
                    }
                    else {
                        clearInterval(iid);
                    }
                }, 20);  
            }
            else if (width-Y-size < Math.min(Y, Math.min(X, width-X-size))) {
                // go down
                
                iid = setInterval( function () {
                    if (countdown == 0 && height-Y-size>0) {
                        Y = parseInt(menu.css("top")); 
                        menu.css("top", (Y+1) +"px");
                    }
                    else {
                        clearInterval(iid);
                    }
                }, 20);  
            }
        }
        else {
            //alert("I'm staying here");
        }
                  
    }
    
    
    var tid;
    $("#menu").mouseenter( function () {
        //alert("entered!");
        countdown = 1000;
        clearTimeout(tid);
        clearInterval(iid);
    });
        
      
    $("#menu").mouseleave( function () {
        //alert("left!");
        tid = setTimeout(moveToBorder, 1000);
    });
    
    
    
    
    
    
    
});


