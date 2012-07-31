/**
 * dragScroll plugin
 * 
 * @version 1 beta
 * 
 * @licensed MIT <http://szanata.com/MIT.txt>
 * @licensed GPL <http://szanata.com/GPL.txt>
 * 
 * @requires jQuery 1.4.2
 * 
 * @author Stéfano Stypulkowski <http://szanata.com>
 *
 * Based on original "contentdargscroller" by Steve Fenton <http://www.stevefenton.co.uk/Content/Jquery-Content-Drag-Scroller/>
 * I made some changes, but the core was wrote by this guy... Thanks o/
 */
(function ($){

  $.fn.dragScroller = function (settings) {
  
    var config = {
  	  easing: "linear",
  	  velocityFactor: 2,
  		velocityCheckWait: 50,
  		afterScrollDuration: 1000
  	};
  
  	if (settings) {
  		$.extend(config, settings);
  	}
  
  	return this.each(function () {
  
      function setVelocity() {
        velocity = startPosition - gesturesY;
        timer = window.setTimeout(setVelocity, config.velocityCheckWait);
      }
        
      var 
        gesturesY = 0,
        startPosition = 0,
        startScrollTop = 0,
        isMouseDown = false,
        velocity = 0,
        timer,
        self = $(this),
        container = $(this).parent();
        
  		container.css({
  			cursor:config.cursor,
        overflow:'hidden'
  		});
  
  		// Detects mouse position and performs real-time scroll
  		$(document).mousemove( function (e) {
          
  			gesturesY = parseInt(e.pageY, 10);
  			if (isMouseDown) {
            
  				var scrollToPosition = startScrollTop + (startPosition - gesturesY);
  				container.scrollTop(scrollToPosition);
  				return false;
  			}
  		});
  
  		// Prevents text being selected while scrolling
  		self.css({"MozUserSelect": "none"})
  			.bind("mousedown.disableTextSelect selectstart.disableTextSelect", function() {
  			return false;
  		});
  
  		// Starts a scroll
  		self.bind('mousedown', function(e) {
  			startPosition = gesturesY;
  			startScrollTop = container.scrollTop();
  			isMouseDown = true;
  			timer = window.setTimeout(setVelocity, config.velocityCheckWait);
  			return false;
  		});
  
  		// Cleans up after a scroll
  		$(document).bind('mouseup', function() {
  			if (isMouseDown) {
  				window.clearTimeout(timer);
  				isMouseDown = false;
  				if (velocity != 0) {
  					var 
              distance = Math.floor(velocity * config.velocityFactor),
              scrollToPosition = container.scrollTop() + distance;
                
  					container.animate({ scrollTop: scrollToPosition}, {
  						duration: config.afterScrollDuration,
  						easing: config.easing
  					});
              
  					velocity = 0;
  				}
  				return false;
  			}
  		});
  	});
  	return this;
	}
})(jQuery);