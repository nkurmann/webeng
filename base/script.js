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
    }
    $("#menu>img").click( toggleMenu );
    
    
    
    
    
    var menu = $("#menu");
    
    
    var countdown = 2000;
    
    var iid
    function moveToBorder () {
       
        countdown = 0;
        var X = parseInt(menu.css("left"));
        
        iid = setInterval( function () {
            if (countdown == 0 && parseInt(menu.css("left"))>0) {
                X = parseInt(menu.css("left")); 
                menu.css("left", (X-1) +"px");
            }
            else {
                clearInterval(iid)
            }
        }, 20);    
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


