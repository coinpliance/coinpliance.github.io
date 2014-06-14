$(document).ready(function() {
	$('html').removeClass('no-js').addClass('js');

	$('#chooseStyle').styleSwitcher();
	
	$('#chooseStyle').hover(function(){
		$('#chooseStyle a').animate({marginLeft: '0'}, 100).css('opacity', '1');
	},
		function(){
		$('#chooseStyle a').animate({marginLeft: '-8px'}, 100).css('opacity', '0.7');;
		}
	);
			
	$('.flexslider').flexslider({
    	animation: "fade",
		directionNav: false,
		slideshow: true
  	});
	
	initializeGMap();

	//Accordion
	$('#accordion_example').smoothAccordion();
	
	// Colorbox for images
	$("a.colorbox").colorbox({
		maxHeight: '90%',
		maxWidth: '90%'
	});
	
	//Scroll navigation
	$(".navList, #Logo, .pageAnchorLink").localScroll({
		duration: 800,
		easing: "easeOutQuart"
	});	

	$(window).scroll(function() {
	    var windscroll = $(window).scrollTop();
		var scrollExt = 60;
		$('.navList a').each(function(){
			var linkHref = $(this).attr('href').substr(1);
			if( $('div[id="' + linkHref + '"]').offset().top <= windscroll + scrollExt) {
				$('.navList a').removeClass('selected');
				$(this).addClass('selected');
			}
		})
	});

	// Tabbed content
	$("#tabs1").organicTabs();

	// Sortable portfolio with Quicksand
	var $portfolioClone = $(".portfolio").clone();
	$(".filter a").click(function(e){
		$(".filter li").removeClass("current");	
		var $filterClass = $(this).parent().attr("class");
		if ( $filterClass == "all" ) {
			var $filteredPortfolio = $portfolioClone.find("li");
		} else {
			var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
		}
		$(".portfolio").quicksand( $filteredPortfolio, { 
			duration: 800, 
			easing: 'easeInOutQuad' 
		}, function(){ 
			$("a.colorbox").colorbox({
				maxHeight: '90%',
				maxWidth: '90%'
			});
		});
		$(this).parent().addClass("current");
		e.preventDefault();
	});

	//Contact form
	$('#contactform').submit(function(){
		var action = $(this).attr('action');
		$("#message").slideUp(750,function() {
		$('#message').hide();
 		$('#submit')
			.after('<img src="images/colorbox/loading.gif" class="loader" />')
			.attr('disabled','disabled');

		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			//phone: $('#phone').val(),
			subject: $('#subject').val(),
			comments: $('#comments').val()
			//verify: $('#verify').val()
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');

			}
		);

		});

		return false;

	});

	//Dropdown menu for mobile	
	$("<select />").appendTo("nav#MenuBar");
	$("<option />", {
	"selected": "selected",
	"value"   : "",
	"text"    : "Select a page..."
	}).appendTo("nav select");

      $("nav#MenuBar a").each(function() {
      	var el = $(this);
		if(el.parents('.dropMenu').length) {
	        $('<option />', {
	            'value': el.attr('href'),
	            'text':  '— ' + el.text()
	        }).appendTo('nav#MenuBar select');
	    } else {
	        $('<option />', {
	            'value': el.attr('href'),
	            'text': el.text()
	        }).appendTo('nav#MenuBar select');
	    }
      });
	
	$("nav#MenuBar select").change(function() {
		window.location = $(this).find("option:selected").val();
	});


	//iPhone, iPad
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	    var viewportmeta = document.querySelector('meta[name="viewport"]');
	    if (viewportmeta) {
	        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
	        document.body.addEventListener('gesturestart', function () {
	            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
	        }, false);
	    }
	}   

});


//Accordion plugin
(function($) {
    $.fn.smoothAccordion = function() {
        this.each(function() {
            var element = this;
            var accordionContent = $(element).find(".accordionCnt");
			var link = $(element).find('.head a');
			var indicator = $(element).find(".head h4 i");
			
			accordionContent.each(function(){
				$main = $(this);
				if ($main.hasClass('active')) {
					$main.show();
					$main.prev().find('i').addClass('icon-minus');
				}
			});
			link.click(function() {
				$cnt =  $(this).parent().parent().next();
				if(!$cnt.hasClass('active')) {
					accordionContent.removeClass('active').slideUp();
					$cnt.removeClass('hide').addClass('active').slideDown();
					indicator.removeClass('icon-minus');
					$(this).children('i').addClass('icon-minus');
				}
				return false;
			});
        })
        return this;
    }
    
})(jQuery);


//Google Maps 
var geocoder;
var map;
function initializeGMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(51.513967, -0.153681);
  var mapOptions = {
    zoom: 12,
    center: latlng,
	scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var address = $('#map_canvas').attr('data-address');
  if ($('#map_canvas').attr('data-address')) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      //alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
}


//Scroll navigation Plugins
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
