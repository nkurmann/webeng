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
    
    
    
    $('#sticky').click(function(){this.toggleClass("active")});
    
    var menu = $("#menu");
    
    
    var countdown = 2000;
    
    var iid
    function moveToBorder () {
        if(!$('#sticky').hasClass("active")) {
            countdown = 0;
            var X = parseInt(menu.css("left"));
            var Y = parseInt(menu.css("top"));
            var size = 300;
            var height = window.screen.availHeight;
            var width = window.screen.availWidth;

            // DECIDE ON DIRECTION
            if (X <= Math.min(width-X-size, Math.min(Y, height-Y-size))) {
                // go left
                alert("going left");
                iid = setInterval( function () {
                    if (countdown == 0 && parseInt(menu.css("left"))>0) {
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
                alert("going right");
                iid = setInterval( function () {
                    if (countdown == 0 && width-parseInt(menu.css("left"))-size>0) {
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
                alert("going up");
                iid = setInterval( function () {
                    if (countdown == 0 && parseInt(menu.css("up"))>0) {
                        Y = parseInt(menu.css("up")); 
                        menu.css("up", (Y-1) +"px");
                    }
                    else {
                        clearInterval(iid);
                    }
                }, 20);  
            }
            else if (width-Y-size < Math.min(Y, Math.min(X, width-X-size))) {
                // go down
                alert("going down");
                iid = setInterval( function () {
                    if (countdown == 0 && height-parseInt(menu.css("up"))-size>0) {
                        Y = parseInt(menu.css("up")); 
                        menu.css("up", (Y+1) +"px");
                    }
                    else {
                        clearInterval(iid);
                    }
                }, 20);  
            }
        }
        else {
            alert("I'm staying here");
        }
                  
    }
    
    
    var tid;
    $("#menu").mouseenter( function () {
        //alert("entered!");
        countdown = 2000;
        clearTimeout(tid);
        clearInterval(iid);
    });
        
      
    $("#menu").mouseleave( function () {
        //alert("left!");
        tid = setTimeout(moveToBorder, 2000);
    });
    
    
    
    
    
    
    
});


