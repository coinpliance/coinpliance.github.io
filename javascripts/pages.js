/*
 * jQuery PageStyleSwitcher Plugin
 * Examples and documentation at: 
 * http://www.immortalwolf.com/demo/jquery-style-switcher/
 * Copyright (c) 2011 immortal wolf
 * Version: 1.4 (27-JAN-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/Gpl
 * http://en.wikipedia.org/wiki/MIT_License
 * Requires: jQuery v1.2.6 or later
 * 
 * @version 1.4 changelog:
 * 		- added cookie support
 * 		- allow usage of either JavaScript or PHP for
 * 			cookie management via jQuery config options 
 */
 
(function($) {
	$.fn.styleSwitcher = function(options){		
		var defaults = {	
		 container: this.selector, directory: "stylesheets/", useCookie: true, cookieExpires: 30, manageCookieLoad:true	
		};
		var opts = $.extend(defaults, options);
		// if using cookies and using JavaScript to load css
		if (opts.useCookie && opts.manageCookieLoad) {
			// check if css is set in cookie
			var isCookie = readCookie("style_selected")
			if(isCookie){
				var newStyle = opts.directory + isCookie + ".css";
				$("link[id=theme]").attr("href",newStyle);
				baseStyle = newStyle;
			}
			else{
				
			}
		}		

		var baseStyle = $("link[id=theme]").attr("href");
		
		$(opts.container + " a").click(
			function (e) {
				var newStyle = opts.directory + this.id + ".css";
				$("link[id=theme]").attr("href",newStyle);
				baseStyle = newStyle;
				if(opts.useCookie){
					createCookie("style_selected",this.id,opts.cookieExpires)
				}
				e.preventDefault();
			}
		);
		
	};
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
})(jQuery);
