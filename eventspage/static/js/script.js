(function (window, document, $) {
	"use strict";
	
	$(window).on("load", function () {
		/* loader */
		$(".noo-spinner").fadeOut(500, function(){
			$(".noo-spinner").remove();
		});
	});
	
	/* On resize */
	$(window).on("resize", function () {
	});
	
	/* On scroll */
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 500) {
			$("#backtotop").addClass("on");
		} else {
			$("#backtotop").removeClass("on");
		}
	});
	
	$(document).ready(function($) {
		
		//Onepage navigation
		if($(".onepage-menu").length > 0) {
			var offset = $('.onepage-menu').attr('data-offset');
			if ($('.onepage-menu').length > 0) $('.onepage-menu').singlePageNav({ 'offset': offset, 'filter': '.onepage' });
		}
		
		//scroll to top
		$("body").on("click", "#backtotop", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
		// Sider
		if($("#side-box-container").length > 0) {
			$(".header-icon-canvas").sidr({
				name: "side-box-container",
				source: "#side-box-container",
				side: "right",
				renaming: false,
				displace: false
			});
			$(".button-side-box-close").on("click", function (evt) {
				evt.preventDefault();
				$.sidr("close", "side-box-container");
			});
		}
		
		//Owl Carousel
		OwlCarousel();
		
		// mini-cart
		var $mini_cart = $(".mini-cart");
		$mini_cart.on("click", function (e) {
			$(this).addClass("open");
		});
		
		$(document).on("click", function (e) {
			if ($(e.target).closest($mini_cart).length == 0) {
				$mini_cart.removeClass("open");
			}
		});
		
		// Full screen search
		var $fullSearchContainer = $(".search-form-container-full");
		$(".header-icon-search").on("click", function (evt) {
			evt.preventDefault();
	
			$fullSearchContainer.addClass("open");
		});
	
		$fullSearchContainer.on("click", function (evt) {
			if (!$(evt.target).parents(".search-form").length) {
				$fullSearchContainer.removeClass("open");
			}
		});
		
		/* counters */
		if ($(".counter").length > 0) {
			$(".counter").each(function(index) {
				var $this = $(this);
				var waypoint = $this.waypoint({
					handler: function(direction) {
						$this.find(".counter-digit:not(.counted)").countTo().addClass("counted");
					},
					offset: "90%"
				});
			});
		}
		
		//Headroom Menu
		if($(".header-static").length == 0 && $(".header-left-menu").length == 0) {
			$(".header").headroom();
		}
		
		//Rotating Text
		if ($("#js-rotating").length > 0) {
			var i = 0;
			var colors = ["#3aacc7", "#bda068", "#d49496", "#67a275"];
			$("#js-rotating").Morphext({
				animation: "fadeInDown",
				// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
				separator: ",",
				// The delay between the changing of each phrase in milliseconds.
				speed: 2000,
				complete: function() {
					$("#js-rotating").css("color", colors[i]);
					if(i < colors.length - 1) {
						i++;
					} else {
						i = 0;
					}
				}
			});
		}
		
		//Pretty photos
		if($("a.prettyphoto").length > 0) {
			$("a[data-rel^='prettyPhoto'], a.prettyphoto").prettyPhoto();
			$("a[data-rel^='prettyPhoto']").prettyPhoto({hook:"data-rel",social_tools:!1,theme:"pp_default",horizontal_padding:20,opacity:.8,deeplinking:!1});
		}
		
		/* progress bars */
		$(".group-progressbar").each(function() {
			var $this = $(this);
			var waypoint = $this.waypoint({
				handler: function(direction) {
					$this.find(".progressbar").progressbar({ display_text: 'center' });
				},
				offset: "80%"
			});
		});
		
		//Typed Text
		if($("#typed").length > 0) {
		  $("#typed").typed({
			stringsElement: $("#typed-strings"),
			typeSpeed: 30,
			backDelay: 500,
			loop: true,
			contentType: "html", // or text
			loopCount: false,
			cursorChar: "|",
		  });
		}
		
		//Fullscreen Section
		introHeight();
		
		//scroll to anchor
		$(".smooth-scroll-link").on("click", function(event) {

			// Make sure this.hash has a value before overriding default behavior
			if (this.hash !== "") {
			  // Prevent default anchor click behavior
			  event.preventDefault();
		
			  // Store hash
			  var hash = this.hash;
			  $("html, body").animate({
				scrollTop: $(hash).offset().top
			  }, 800, function(){
		   
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			  });
			} // End if
		});
		
		//popup video
		if($(".popup-video").length > 0) {
			$(".popup-video").magnificPopup({
				type: "iframe",
				iframe: {
					patterns: {
						youtube: {
							index: "youtube.com/", 
							id: function(url) {        
								var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
								if ( !m || !m[1] ) return null;
								return m[1];
							},
							src: "//www.youtube.com/embed/%id%?autoplay=1"
						},
						vimeo: {
							index: "vimeo.com/", 
							id: function(url) {        
								var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
								if ( !m || !m[5] ) return null;
								return m[5];
							},
							src: "//player.vimeo.com/video/%id%?autoplay=1"
						}
					}
				}
			});
		}
		
		//Toggle Mobile Menu
		$('.page-open-mobile-menu, .page-close-mobile-menu').on('click',function(){
			$('.page-mobile-main-menu').toggleClass('open');
		});
		$('.toggle-sub-menu').on('click',function(){
			if($(this).parent("a").next().hasClass('open')) {
				$(this).parent("a").next().toggleClass('open');
				$(this).toggleClass('open');
			} else {
				$('.sub-menu, .toggle-sub-menu').removeClass('open');
				$(this).parent("a").next().toggleClass('open');
				$(this).parent("a").parent('li').parent('.sub-menu').addClass('open');
				$(this).parent('a').parent('li').parent('.sub-menu').siblings('a').children('.toggle-sub-menu').toggleClass('open');
				$(this).toggleClass('open');
			}
		});
		
		/* split slider */
		if($('#multiScroll').length > 0) {
			if ($(window).width() > 768) {
				$('#multiScroll').multiscroll({
					sectionsColor: [],
					easing: 'easeOutBack',
					menu: false,
					navigation: true,
					loopBottom: true,
					loopTop: true,
					navigationPosition: 'right',
				});
				$('#multiscroll-nav > ul > li ').each(function(index) {
					$(this).children('a').attr('href', 'javascript:void()');
				});
			}
		}
		
		//Equal Heights
		if ($(".equalheight").length > 0) $(".equalheight").equalHeights();
		
		/* google map */
		GoogleMap();
		
		/* countdown */
		Countdown();
		
		//Presentation Slide
		if($("#presentation").length > 0) {
			preSlider();
		}
		
		//fitvids
		if ($('.multimedia').length > 0) $('.multimedia').fitVids();
		
		//Toggle Accordion
		$(document).on('show.bs.collapse hide.bs.collapse', '.accordion', function(e) {
			var $target = $(e.target)
			if (e.type == 'show')
				$target.prev('.accordion-heading').addClass('active');
			if (e.type == 'hide')
				$target.prev('.accordion-heading').removeClass('active');
		});
		
		/* init revolution slider */
		if ($("#rev_slider").length > 0) {
			RevolutionInit();
		}
		if ($("#rev_slider_2").length > 0) {
			RevolutionInit_2();
		}
		if ($("#rev_slider_3").length > 0) {
			RevolutionInit_3();
		}
		if ($("#rev_slider_4").length > 0) {
			RevolutionInit_4();
		}
		if ($("#rev_slider_5").length > 0) {
			RevolutionInit_5();
		}
		if ($("#rev_slider_6").length > 0) {
			RevolutionInit_6();
		}
		if ($("#rev_slider_7").length > 0) {
			RevolutionInit_7();
		}
		if ($("#rev_slider_8").length > 0) {
			RevolutionInit_8();
		}
		if ($("#rev_slider_9").length > 0) {
			RevolutionInit_9();
		}
		if ($("#rev_slider_10").length > 0) {
			RevolutionInit_10();
		}
		if ($("#rev_slider_11").length > 0) {
			RevolutionInit_11();
		}
		if ($("#rev_slider_12").length > 0) {
			RevolutionInit_12();
		}
	});

})(window, document, jQuery);

/*=================================================================
	presentation slide
===================================================================*/
function preSlider() {
	var $container  = $('#presentation');
	$('#presentation').fullpage({
		sectionsColor: ['#fff', '#fff', '#1a237e', '#fff', '#fff'],
		anchors: ['section-introduction', 'section-about-us', 'section-our-services', 'section-our-projects', 'section-contact-us'],
		menu: '#presentation-menu',
		slidesNavigation: true,
		slidesToSections: true,
		responsiveWidth: 900,
		responsiveSlides: true,
		responsiveSlidesKey: 'YWx2YXJvdHJpZ28uY29tX3RoVWNtVnpjRzl1YzJsMlpWTnNhV1JsY3c9PUVZdg==',
		afterLoad : function( anchorLink, index ) {
			  var $currentRow = $container.children('.active');
			  var skin        = $currentRow.attr( 'data-skin' );
			  $('body').attr( 'data-row-skin', skin );
		  }
	});
}

/*=================================================================
	google map function
===================================================================*/
function GoogleMap() {
	// When the window has finished loading create our google map below
	var marker_image = "../images/map-marker.png";

	if ($('#map').length > 0) {
		if ($('#map').attr('data-marker-image') != undefined) {
			marker_image = $('#map').attr('data-marker-image')
		}
		google.maps.event.addDomListener(window, 'load', init);
	}

	function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6000, -73.9400), // New York

			// How you would like to style the map.
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"saturation": 36
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 40
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					},
					{
						"weight": 1.2
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 21
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 29
					},
					{
						"weight": 0.2
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 18
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 19
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			}]
		};

		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');
		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6000, -73.9400),
			map: map,
			title: 'Location 1',
			icon: marker_image
		});

	}
}

/*=================================================================
	owl carousel
===================================================================*/
function OwlCarousel() {
	if ($(".project-carousel").length > 0) {
		$(".project-carousel").each(function(){
			$(this).owlCarousel({
				items: 1,
				loop: true,
				mouseDrag: true,
				navigation: true,
				dots: false,
				pagination: false,
				autoPlay: true,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				smartSpeed: 1000,
				autoplayHoverPause: true,
				itemsDesktop: [1199, 1],
				itemsDesktopSmall: [979, 1],
				itemsTablet: [768, 1],
				itemsMobile: [479, 1],
				transitionStyle : "backSlide",
			});
		});
	}
	if ($(".navi-carousel").length > 0) {
		$(".navi-carousel").each(function(){
			var autoplay = ($(this).attr("data-auto-play") === "true") ? true : false;
			$(this).owlCarousel({
				items: $(this).attr("data-desktop"),
				loop: true,
				mouseDrag: true,
				navigation: true,
				dots: false,
				pagination: false,
				autoPlay: autoplay,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				smartSpeed: 1000,
				autoplayHoverPause: true,
				itemsDesktop: [1199, $(this).attr("data-desktop")],
				itemsDesktopSmall: [979, $(this).attr("data-laptop")],
				itemsTablet: [768, $(this).attr("data-tablet")],
				itemsMobile: [479, $(this).attr("data-mobile")],
				navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			});
		});
	}
	if ($(".drag-carousel").length > 0) {
		$(".drag-carousel").each(function(){
			var autoplay = ($(this).attr("data-auto-play") === "true") ? true : false;
			$(this).owlCarousel({
				items: $(this).attr("data-desktop"),
				loop: true,
				mouseDrag: true,
				navigation: false,
				dots: false,
				pagination: false,
				autoPlay: autoplay,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				smartSpeed: 1000,
				autoplayHoverPause: true,
				itemsDesktop: [1199, $(this).attr("data-desktop")],
				itemsDesktopSmall: [979, $(this).attr("data-laptop")],
				itemsTablet: [768, $(this).attr("data-tablet")],
				itemsMobile: [479, $(this).attr("data-mobile")]
			});
		});
	}
	if ($(".dots-carousel").length > 0) {
		$(".dots-carousel").each(function(){
			$(this).owlCarousel({
				items: 1,
				loop: true,
				mouseDrag: true,
				navigation: false,
				dots: true,
				pagination: true,
				autoPlay: false,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				smartSpeed: 1000,
				autoplayHoverPause: true,
				itemsDesktop: [1199, 1],
				itemsDesktopSmall: [979, 1],
				itemsTablet: [768, 1],
				itemsMobile: [479, 1]
			});
		});
	}
}

/*=================================================================
	fullscreen banner
===================================================================*/
function introHeight() {
	var wh = $(window).height();
	$(".section-fullscreen").css({ height: wh });
}

/*=================================================================
	countdown function
===================================================================*/
function Countdown() {
	if ($(".pl-clock").length > 0) {
		$(".pl-clock").each(function() {
			var time = $(this).attr("data-time");
			$(this).countdown(time, function(event) {
				var $this = $(this).html(event.strftime('' + '<div class="countdown-item"><div class="countdown-item-value">%D</div><div class="countdown-item-label">Days</div></div>' + '<div class="countdown-item"><div class="countdown-item-value">%H</div><div class="countdown-item-label">Hours</div></div>' + '<div class="countdown-item"><div class="countdown-item-value">%M</div><div class="countdown-item-label">Minutes</div></div>' + '<div class="countdown-item"><div class="countdown-item-value">%S</div><div class="countdown-item-label">Seconds</div></div>'));
			});
		});
	}
}


/*=================================================================
	revolution slider function
===================================================================*/
function RevolutionInit() {
	$("#rev_slider").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullwidth",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"on",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 50,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			}
			,
			arrows: {
				style:"metis",
				enable:true,
				hide_onmobile:true,
				hide_under:600,
				hide_onleave:true,
				hide_delay:200,
				hide_delay_mobile:1200,
				tmp:'',
				left: {
					h_align:"left",
					v_align:"center",
					h_offset:30,
					v_offset:0
				},
				right: {
					h_align:"right",
					v_align:"center",
					h_offset:30,
					v_offset:0
				}
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[800,600,500,400],
		lazyType:"smart",
		parallax: {
			type:"mouse",
			origo:"slidercenter",
			speed:2000,
			levels:[2,3,4,5,6,7,12,16,10,50,47,48,49,50,51,55],
			disable_onmobile:"on"
		},
		shadow:0,
		spinner:"off",
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		shuffle:"off",
		autoHeight:"off",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_2() {
	$("#rev_slider_2").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"off",
			arrows: {
				style:"metis",
				enable:true,
				hide_onmobile:false,
				hide_onleave:true,
				hide_delay:200,
				hide_delay_mobile:1200,
				tmp:'',
				left: {
					h_align:"left",
					v_align:"center",
					h_offset:20,
					v_offset:0
				},
				right: {
					h_align:"right",
					v_align:"center",
					h_offset:20,
					v_offset:0
				}
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[868,768,960,720],
		lazyType:"none",
		parallax: {
			type:"mouse",
			origo:"enterpoint",
			speed:400,
			levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
			disable_onmobile:"on"
		},
		shadow:0,
		spinner:"spinner3",
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		shuffle:"off",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: "",
		fullScreenOffset: "",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_3() {
	$("#rev_slider_3").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"off",
			touch:{
				touchenabled:"on",
				swipe_threshold: 75,
				swipe_min_touches: 50,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[868,768,960,720],
		lazyType:"smart",
		parallax: {
			type:"scroll",
			origo:"enterpoint",
			speed:400,
			levels:[5,10,15,25,20,30,35,40,45,46,47,48,49,50,51,55],
			type:"scroll",
		},
		shadow:0,
		spinner:"off",
		stopLoop:"on",
		stopAfterLoops:0,
		stopAtSlide:1,
		shuffle:"off",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: "",
		fullScreenOffset: "60px",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_4() {
	$("#rev_slider_4").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"off",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 50,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			}
			,
			tabs: {
				style:"metis",
				enable:true,
				width:250,
				height:40,
				min_width:0,
				wrapper_padding:0,
				wrapper_color:"",
				tmp:'<div class="tp-tab-wrapper"><div class="tp-tab-number">{{param1}}</div><div class="tp-tab-divider"></div><div class="tp-tab-title-mask"><div class="tp-tab-title">{{title}}</div></div></div>',
				visibleAmount: 5,
				hide_onmobile: true,
				hide_under:800,
				hide_onleave:false,
				hide_delay:200,
				direction:"vertical",
				span:true,
				position:"inner",
				space:0,
				h_align:"left",
				v_align:"center",
				h_offset:0,
				v_offset:0
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[868,768,960,720],
		lazyType:"none",
		parallax: {
			type:"3D",
			origo:"slidercenter",
			speed:1000,
			levels:[2,4,6,8,10,12,14,16,45,50,47,48,49,50,0,50],
			ddd_shadow:"off",
			ddd_bgfreeze:"on",
			ddd_overflow:"hidden",
			ddd_layer_overflow:"visible",
			ddd_z_correction:100,
		},
		spinner:"off",
		stopLoop:"on",
		stopAfterLoops:0,
		stopAtSlide:1,
		shuffle:"off",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: "",
		fullScreenOffset: "60px",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_5() {
	$("#rev_slider_5").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"on",
			mouseScrollReverse:"default",
			onHoverStop:"off",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 1,
				swipe_direction: "vertical",
				drag_block_vertical: false
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[868,768,960,720],
		lazyType:"none",
		shadow:0,
		spinner:"off",
		stopLoop:"on",
		stopAfterLoops:0,
		stopAtSlide:1,
		shuffle:"off",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: "",
		fullScreenOffset: "",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_6() {
	$("#rev_slider_6").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"on",
			keyboard_direction: "vertical",
			mouseScrollNavigation:"carousel",
			mouseScrollReverse:"default",
			onHoverStop:"off",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 1,
				swipe_direction: "vertical",
				drag_block_vertical: false
			}
			,
			bullets: {
				enable:true,
				hide_onmobile:true,
				hide_under:778,
				style:"hermes",
				hide_onleave:false,
				direction:"vertical",
				h_align:"right",
				v_align:"center",
				h_offset:20,
				v_offset:0,
				space:5,
				tmp:''
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[868,768,960,720],
		lazyType:"smart",
		shadow:0,
		spinner:"spinner2",
		stopLoop:"on",
		stopAfterLoops:0,
		stopAtSlide:1,
		shuffle:"off",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: "",
		fullScreenOffset: "",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_7() {
	$("#rev_slider_7").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullwidth",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"on",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 50,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			}
			,
			bullets: {
				enable:true,
				hide_onmobile:true,
				hide_under:600,
				style:"ares",
				hide_onleave:true,
				hide_delay:200,
				hide_delay_mobile:1200,
				direction:"horizontal",
				h_align:"center",
				v_align:"bottom",
				h_offset:0,
				v_offset:50,
				space:5,
				tmp:'<span class="tp-bullet-title">{{title}}</span>'
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[700,600,500,400],
		lazyType:"smart",
		parallax: {
			type:"mouse",
			origo:"slidercenter",
			speed:2000,
			levels:[2,3,4,5,6,7,12,16,10,50,47,48,49,50,51,55],
			disable_onmobile:"on"
		},
		shadow:0,
		spinner:"off",
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		shuffle:"off",
		autoHeight:"off",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_8() {
	$("#rev_slider_8").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[868,768,960,720],
		lazyType:"none",
		shadow:0,
		spinner:"spinner0",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: "",
		fullScreenOffset: "",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_9() {
	$("#rev_slider_9").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"auto",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"off",
			arrows: {
				style:"metis",
				enable:true,
				hide_onmobile:false,
				hide_onleave:true,
				hide_delay:200,
				hide_delay_mobile:1200,
				tmp:'',
				left: {
					h_align:"left",
					v_align:"center",
					h_offset:20,
					v_offset:0
				},
				right: {
					h_align:"right",
					v_align:"center",
					h_offset:20,
					v_offset:0
				}
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1780,1024,778,480],
		gridheight:[800,768,960,720],
		lazyType:"none",
		shadow:0,
		spinner:"spinner0",
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		shuffle:"off",
		autoHeight:"off",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_10() {
	$("#rev_slider_10").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullscreen",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"on",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 50,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			}
			,
			bullets: {
				enable:true,
				hide_onmobile:true,
				hide_under:600,
				style:"ares",
				hide_onleave:true,
				hide_delay:200,
				hide_delay_mobile:1200,
				direction:"horizontal",
				h_align:"center",
				v_align:"bottom",
				h_offset:0,
				v_offset:30,
				space:5,
				tmp:'<span class="tp-bullet-title">{{title}}</span>'
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[800,600,500,400],
		lazyType:"smart",
		parallax: {
			type:"mouse",
			origo:"slidercenter",
			speed:2000,
			levels:[2,3,4,5,6,7,12,16,10,50,47,48,49,50,51,55],
			disable_onmobile:"on"
		},
		shadow:0,
		spinner:"off",
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		shuffle:"off",
		autoHeight:"off",
		fullScreenAutoWidth:"off",
		fullScreenAlignForce:"off",
		fullScreenOffsetContainer: ".site-header",
		fullScreenOffset: "",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_11() {
	$("#rev_slider_11").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"auto",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
		},
		visibilityLevels:[1240,1024,778,480],
		gridwidth:1258,
		gridheight:724,
		lazyType:"none",
		shadow:0,
		spinner:"spinner0",
		autoHeight:"off",
		disableProgressBar:"on",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			disableFocusListener:false,
		}
	});
}

function RevolutionInit_12() {
	$("#rev_slider_12").show().revolution({
		sliderType:"standard",
		jsFileLocation:"js/",
		sliderLayout:"fullwidth",
		dottedOverlay:"none",
		delay:9000,
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			mouseScrollReverse:"default",
			onHoverStop:"on",
			touch:{
				touchenabled:"on",
				touchOnDesktop:"off",
				swipe_threshold: 75,
				swipe_min_touches: 50,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			}
			,
			arrows: {
				style:"metis",
				enable:true,
				hide_onmobile:true,
				hide_under:600,
				hide_onleave:true,
				hide_delay:200,
				hide_delay_mobile:1200,
				tmp:'',
				left: {
					h_align:"left",
					v_align:"center",
					h_offset:30,
					v_offset:0
				},
				right: {
					h_align:"right",
					v_align:"center",
					h_offset:30,
					v_offset:0
				}
			}
		},
		responsiveLevels:[1240,1024,778,480],
		visibilityLevels:[1240,1024,778,480],
		gridwidth:[1240,1024,778,480],
		gridheight:[650,600,500,400],
		lazyType:"smart",
		parallax: {
			type:"mouse",
			origo:"slidercenter",
			speed:2000,
			levels:[2,3,4,5,6,7,12,16,10,50,47,48,49,50,51,55],
			disable_onmobile:"on"
		},
		shadow:0,
		spinner:"off",
		stopLoop:"off",
		stopAfterLoops:-1,
		stopAtSlide:-1,
		shuffle:"off",
		autoHeight:"off",
		hideThumbsOnMobile:"off",
		hideSliderAtLimit:0,
		hideCaptionAtLimit:0,
		hideAllCaptionAtLilmit:0,
		debugMode:false,
		fallbacks: {
			simplifyAll:"off",
			nextSlideOnWindowFocus:"off",
			disableFocusListener:false,
		}
	});
}