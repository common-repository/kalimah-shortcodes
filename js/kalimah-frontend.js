/* Counter plugin*/
(function ($) {
	$.fn.countTo = function (options) {
		// merge the default plugin settings with the custom options
		options = $.extend({}, $.fn.countTo.defaults, options || {});

		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(options.speed / options.refreshInterval),
		increment = (options.to - options.from) / loops;

		return $(this).each(function () {
			var _this = this,
			loopCount = 0,
			value = options.from,
			interval = setInterval(updateTimer, options.refreshInterval);

			function updateTimer() {
				value += increment;
				loopCount++;

				var newValue = (options.zeroPad > 0) ? pad(value.toFixed(options.decimals), options.zeroPad) : value.toFixed(options.decimals);

				if (options.addComma)
					$(_this).html(commaSeparateNumber(newValue));
				else
					$(_this).html(newValue);

				if (typeof(options.onUpdate) == 'function') {
					options.onUpdate.call(_this, value);
				}

				if (loopCount >= loops) {
					clearInterval(interval);
					value = options.to;

					if (typeof(options.onComplete) == 'function') {
						options.onComplete.call(_this, value);
					}
				}
			}
		});
	};

	$.fn.countTo.defaults = {
		from : 0, // the number the element should start at
		to : 100, // the number the element should end at
		speed : 1000, // how long it should take to count between the target numbers
		refreshInterval : 100, // how often the element should be updated
		zeroPad : 0, // Add zero to the left of number
		decimals : 0, // the number of decimal places to show
		onUpdate : null, // callback method for every time the element is updated,
		onComplete : null, // callback method for when the element finishes updating
	};
})(jQuery);

function commaSeparateNumber(val) {
	while (/(\d+)(\d{3})/.test(val.toString())) {
		val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
	}
	return val;
}
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

jQuery(document).ready(function () {
	/* check if counter in view and intiaite counting. once it is completed stop listting to inview*/
	jQuery('.kalimah-shortcodes-counter .counter').on('inview', function (event, isInView) {
		if (isInView) {
			var eleme = jQuery(this);
			eleme.countTo({
				from : parseInt(eleme.attr('data-start')),
				to : parseInt(eleme.attr('data-end')),
				speed : parseInt(eleme.attr('data-speed')) * 1000,
				zeroPad : parseInt(eleme.attr('data-zero-padding')),
				addComma : eleme.attr('data-comma'),
				refreshInterval : 50,
				onComplete : function () {}
			});

			eleme.off('inview');
		}
	});

	/* check if progress bar in view and that it has animation enabled */
	jQuery('.kalimah-progress-bar-element-bg > div').on('inview', function (event, isInView) {
		if (isInView) {
			var eleme = jQuery(this);
			var type = jQuery(this).attr("data-type");

			if (eleme.attr("data-animated") == "true") {
				var percentage = eleme.attr("data-percentage");
				if (type == "vertical") {
					eleme.addClass("animated").height(percentage + "%");
				} else if (type == "horizontal") {
					eleme.addClass("animated").width(percentage + "%");
				} else if (type == "circular") {
					/// Animate left and right cirucl halves accordingly
					var left = eleme.find(".kalimah-progress-circular-left");
					var right = eleme.find(".kalimah-progress-circular-right");
					var concealer = eleme.find(".kalimah-progress-circular-left-concealer");

					right.css('transform', 'rotate(' + right.attr("data-rotate") + 'deg)');
					// First step move the left half if the percentage is more than 50
					if (percentage > 50)
						left.css('transform', 'rotate(180deg)');

					// hide concealer if percentage is more than %50 and animation completed for right
					right.on("transitionend", function () {

						// Second step, animate the second half after we are done with the first one
						if (percentage > 50) {
							concealer.css("display", "none");
							left.css('transform', 'rotate(' + left.attr("data-rotate") + 'deg)');
						}
					});
				}
			}
			eleme.off('inview');
		}
	});

	var onTabClick = function () {
		// First handle the clicked tab
		var _this = jQuery(this);

		var topParent = _this.closest(".kalimah-shortcodes-tabs");
		var contentContainer = topParent.find(".kalimah-shortcodes-tabs-content");
		var contentContainerHieght = topParent.outerHeight();
		var contentContainerMinHeight = topParent.attr('min-height');
		var enterAnimation = topParent.attr('data-enter-animation');
		var exitAnimation = topParent.attr('data-exit-animation');

		// Now handle the content
		var target = _this.attr("data-target");
		var exitElement = topParent.find(".shortcode_tab_content.active");
		var enterElement = topParent.find("div[data-id='" + target + "']");

		//Remove animation from all elements first
		// Get all elements
		var elements = _this.parent().children();

		// remove active from all elements
		elements.removeClass("active absolute_position " + enterAnimation + " " + exitAnimation);

		_this.addClass("active").siblings().removeClass("active");

		// Add enter and exit animation to relevant elements
		enterElement.addClass("active absolute_position " + enterAnimation);
		exitElement.addClass(exitAnimation);

		// We get the element height to animate the parent hieght and then set it to position:absolute to animate it
		// Clone the element and add some properties to be able to get height
		clone = enterElement.clone().css({
				position : "absolute",
				left : "-10000px",
				width : enterElement.width(),
				display : "block"
			}).appendTo(topParent.parent());

		// Get the height and width for enter element
		enterElementHeight = clone.outerHeight() + 30;
		enterElementWidth = clone.outerWidth();

		// remove the cloned element as we dont need it anymore
		clone.remove();

		// Set checkbox to true since we have chosen an item
		// We need it for repsoive mode
		_this.parent().prev('input[type="checkbox"]').prop('checked', true);

		// Animate container height
		// if the tabs are vertical we need to make sure the tab content div height
		// matches the parent div height
		if (topParent.hasClass('vertical')) {
			var minHeight = 0;

			topParent.find(".kalimah-shortcodes-tabs-titles .shortcode_tabs_title").each(function (i, e) {
				minHeight += jQuery(e).outerHeight();
			});

			if (enterElementHeight < minHeight)
				enterElementHeight = minHeight;

			contentContainer.addClass("magictime").css({
				height : enterElementHeight,
				width : enterElementWidth
			});
		} else {
			contentContainer.addClass("magictime").css({
				height : enterElementHeight
			});
		}

		exitElement.off("animationend").one("animationend", function (e) {
			exitElement.hide().removeClass("active absolute_position " + exitAnimation);
			console.log("Exit", "animationend");
		});

		enterElement.off("animationend").one("animationend", function (e) {
			enterElement.removeClass("absolute_position " + enterAnimation);
		});
	}
	/* Dismissable shortcode box */
	jQuery(".kalimah-shortcodes-box .close").click(function () {
		var parent = jQuery(this).closest(".kalimah-shortcodes-box");

		parent.animate({
			opacity : "0"
		}, function () {
			jQuery(this).slideUp(function () {
				jQuery(this).remove()
			})
		});
	});

	/* Handle on tab clickes
	We enable it only once, it will be attached once after the animation eneded
	 */
	jQuery(".kalimah-shortcodes-tabs").on("click", ".shortcode_tabs_title:not(.active)", onTabClick);

	jQuery(".kalimah-shortcodes-tabs").on("click", ".shortcode_tabs_title.active", function () {
		// Set checkbox to true since we have chosen an item
		// We need it for repsoive mode
		var checkbox = jQuery(this).parent().prev('input[type="checkbox"]');
		checkbox.prop('checked', (checkbox.prop('checked') == true) ? false : true);

	});

	// On document load adjust height for vertical tabs
	jQuery(".kalimah-shortcodes-tabs.vertical").each(function (i, e) {
		var topParent = jQuery(e);
		var contentContainer = topParent.find(".kalimah-shortcodes-tabs-content");
		var element = topParent.find(".shortcode_tab_content.active");
		// We get the element height to animate the parent hieght and then set it to position:absolute to animate it
		// Clone the element and add some properties to be able to get height
		clone = element.clone().css({
				position : "absolute",
				left : "-10000px",
				width : element.width(),
				display : "block"
			}).appendTo(topParent.parent());

		// Get the height and width for enter element
		elementHeight = clone.outerHeight() + 30;
		elementWidth = clone.outerWidth();

		// remove the cloned element as we dont need it anymore
		clone.remove();

		// we need to make sure the tab content div height
		// matches the parent div height

		var minHeight = 0;

		topParent.find(".kalimah-shortcodes-tabs-titles .shortcode_tabs_title").each(function (i, e) {
			minHeight += jQuery(e).outerHeight();
		});

		if (elementHeight < minHeight)
			elementHeight = minHeight;

		contentContainer.css({
			height : elementHeight,
			width : elementWidth
		});

	});

	/*********************
	Slider
	 *********************/
	// Add dots to match slides
	jQuery(".kalimah-shortcodes-slider .slide_content_outer").each(function (i, e) {
		var parent = jQuery(e).parent();
		var dotsContainer = parent.siblings('.kalimah-shortcodes-slider-dots');

		if (i == 0)
			dotsContainer.append('<span class="dot active"></span>');
		else
			dotsContainer.append('<span class="dot"></span>');
	});

	// Kick off animation for sliders
	jQuery(".kalimah-shortcodes-slider").each(function (i, e) {
		var element = jQuery(e);
		var autoPlay = element.attr("data-auto-play");
		var duration = element.attr("data-interval");
		var progressBar = element.find(".kalimah-shortcodes-slider-bar");

		if (autoPlay == 'true' && !element.is(":hover")) {
			// start progress bar
			progressBar.css('animation-duration', duration + 'ms').addClass('extend-bar');

			var interval = setInterval(function () {
					var currentMs = element.attr("data-remainingMs");
					element.attr("data-remainingMs", currentMs - 50);
				}, 50);

			var timeout = setTimeout(function () {
					element.find(".next").trigger("click");
					progressBar.removeClass('extend-bar');
				}, duration);
			element.data("timer", timeout).data("interval", interval);
		}
	});

	// Process slider click
	var onSliderClick = function (event) {

		// Get main elements
		var clickedElement = jQuery(this);
		var topParent = clickedElement.closest(".kalimah-shortcodes-slider");
		var progressBar = topParent.find(".kalimah-shortcodes-slider-bar");
		var direction = clickedElement.attr("data-direction");

		progressBar.removeClass('extend-bar');

		// First clear any timers
		clearTimeout(topParent.data("timer"));
		clearInterval(topParent.data("interval"));

		// Get index for current and prev or next items
		var currentItemIndex = parseInt(topParent.attr("data-active-index"));
		var newItemIndex = (clickedElement.attr("data-direction") == 'right') ? parseInt(topParent.attr("data-next-index")) : parseInt(topParent.attr("data-prev-index"));

		if (event.data.source == 'dots')
			var newItemIndex = clickedElement.index();

		// Detemine direction when clikcing on a dot
		if (event.data.source == 'dots') {
			var index = topParent.find(".dot.active").index() - clickedElement.index();
			direction = (index > 0) ? "left" : "right";
		}

		// Get all elements and length
		var elements = topParent.find(".slide_content_outer");
		var elementsLength = elements.length;

		// Set current element and new element objects
		var currentElement = elements.eq(currentItemIndex);
		var newElement = elements.eq(newItemIndex);

		// Get etnter and exit animations
		var enterAnimation = topParent.attr('data-enter-animation');
		var exitAnimation = topParent.attr('data-exit-animation');

		if (topParent.attr('data-enter-inverse-animation') != undefined && direction == 'left') {
			enterAnimation = topParent.attr('data-enter-inverse-animation');
			exitAnimation = topParent.attr('data-exit-inverse-animation');
		}

		// remove active from all elements
		elements.removeClass("active absolute_position " + enterAnimation + " " + exitAnimation).hide();

		// Add relevat classes to currentelement (exiting) and newElement (entering)
		currentElement.attr("class", "slide_content_outer magictime absolute_position " + exitAnimation).show();
		newElement.attr("class", "slide_content_outer magictime active absolute_position " + enterAnimation);

		// Add data to main element to use for later clicks
		topParent.attr("data-active-index", newItemIndex);
		topParent.attr("data-next-index", (newItemIndex + 1 >= elementsLength) ? 0 : newItemIndex + 1);
		topParent.attr("data-prev-index", (newItemIndex - 1 < 0) ? elementsLength - 1 : newItemIndex - 1);

		// update dots
		var dots = topParent.find(".dot").removeClass("active");
		jQuery(dots.eq(newItemIndex)).addClass("active");

		// Kick off animation after css animation have finsihed
		newElement.one("animationstart", function (e) {
			// Set element to animating
			topParent.data("animating", true);
		});

		newElement.one("animationend", function (e) {
			// Clear any timers that already exist to prevent multiple timers
			clearTimeout(topParent.data("timer"));

			var autoPlay = topParent.attr("data-auto-play");
			topParent.data("animating", false);
			clearInterval(topParent.data("interval"));

			var duration = parseInt(topParent.attr("data-wait-duration"));
			topParent.attr("data-remainingMs", duration);

			if (autoPlay == 'true' && !topParent.is(":hover")) {
				// start progress bar
				progressBar.css('animation-duration', duration + 'ms').addClass('extend-bar');

				var interval = setInterval(function () {
						var currentMs = topParent.attr("data-remainingMs");
						topParent.attr("data-remainingMs", currentMs - 50);
					}, 50);

				var timeout = setTimeout(function () {
						topParent.find(".next").trigger("click");
						progressBar.removeClass('extend-bar');
					}, duration);
				topParent.data("timer", timeout).data("interval", interval);
			}
		});
	}

	/* Handle clickes for navigation and dots*/
	jQuery(".kalimah-shortcodes-slider").on("click", ".prev, .next", {
		source : "navigation"
	}, onSliderClick);

	jQuery(".kalimah-shortcodes-slider").on("click", ".dot:not(.active)", {
		source : "dots"
	}, onSliderClick);

	// Add active class to first element on load
	jQuery(".kalimah-shortcodes-slider .slide_content_outer:first-of-type").addClass("active absolute_position");
	jQuery(".kalimah-shortcodes-slider-dots span:first-child").addClass("active");

	// On hover (mouseenter and mouseleave)
	jQuery(".kalimah-shortcodes-slider").on("mouseenter", function () {
		var element = jQuery(this);
		var autoPlay = element.attr("data-auto-play");
		var timer = element.data('timer');
		var progressBar = element.find(".kalimah-shortcodes-slider-bar");

		if (autoPlay == 'true') {
			clearTimeout(element.data('timer'));
			clearInterval(element.data('interval'));
		}
	}).on("mouseleave", function () {

		var element = jQuery(this);
		var autoPlay = element.attr("data-auto-play");
		var timer = element.attr('data-timer');
		var progressBar = element.find(".kalimah-shortcodes-slider-bar");
		var remainingMs = parseInt(element.attr("data-remainingMs"));
		var animatedElement = element.find(".kalimah-shortcodes-slider-slides .active");

		if ((autoPlay == 'true') && (!element.data("animating"))) {
			progressBar.addClass("extend-bar");
			var interval = setInterval(function () {
					var currentMs = element.attr("data-remainingMs");
					element.attr("data-remainingMs", currentMs - 50);
				}, 50);

			var timeout = setTimeout(function () {
					element.find(".next").trigger("click");
					progressBar.removeClass('extend-bar');
				}, remainingMs);
			element.data("timer", timeout).data("interval", interval);
		}
	});

	/*************
	Stack view for accordion shortcode for horizontal orientation
	 *****************/
	var onAccordionHorizontalActive = function () {
		var element = jQuery(this);
		var numberOfElements = element.siblings().length;
		var left = 30 / numberOfElements;

		var maxElementWidth = (element.parent().outerWidth() * 70) / 100;
		var index = element.index();

		element.siblings().each(function (i, e) {
			elementWidth = (i < index) ? 0 : maxElementWidth;
			// We use translateX insitead of calc for left margin for Edge compatibility
			jQuery(e).css({
				'left' : (i * left) + '%',
				'transform' : 'translateX(' + elementWidth + 'px)'
			}).removeClass("active");
		});

		var elementIndex = (element.index() - 1 < 0) ? 0 : element.index() - 1;
		element.css({
			'left' : element.index() * left + '%',
			'transform' : 'translateX(0px)'
		}).addClass("active").attr("data-index", element.index());
	}

	jQuery(".kalimah-shortcodes-accordion.horizontal.third-style").each(function (i, e) {
		var trigger = jQuery(e).attr("data-trigger");
		jQuery(e).find(".accordion_outer").on(trigger, onAccordionHorizontalActive);
		jQuery(e).find(".accordion_outer.active").trigger(trigger);
	});

	jQuery(".kalimah-shortcodes-accordion").each(function (i, e) {
		var parent = jQuery(e);
		var trigger = parent.attr("data-trigger");

		parent.find(".title").on(trigger, function () {
			parent.find(".accordion_outer").removeClass('active');
			jQuery(this).parent().addClass('active');
		});
	});
	/*************
	Stack view for accordion shortcode for vertical orientation
	 *****************/
	var onAccordionVerticalActive = function () {
		var element = jQuery(this);
		var numberOfElements = element.siblings().length;
		var top = 30 / numberOfElements;
		//var startFrom = jQuery(this).index();
		var maxElementHeight = (element.parent().outerHeight() * 70) / 100;
		var index = element.index();

		element.siblings().each(function (i, e) {
			elementHeight = (i < index) ? 0 : maxElementHeight;

			jQuery(e).css({
				'top' : 'calc(' + (i * top) + '% + ' + elementHeight + 'px)',
				'height' : '70%'
			}).removeClass("active");
		});

		element.css({
			'top' : element.index() * top + '%',
			'height' : '70%'
		}).addClass("active");
	}

	jQuery(".kalimah-shortcodes-accordion.vertical.third-style").each(function (i, e) {
		var trigger = jQuery(e).attr("data-trigger");
		jQuery(e).find(".accordion_outer").on(trigger, onAccordionVerticalActive);
		jQuery(e).find(".accordion_outer.active").trigger(trigger);
	});

	/*****************
	Handle Accordion and tabs resposive
	 *******************/
	// This variable will ensure that resize function for devices over 600 width
	// will run only when there is a broswer resize first
	var resized = false;

	jQuery(window).resize(function () {
		var width = jQuery(window).width();

		if (width <= 600) {
			resized = true;
			// if smalle screen (mobile) then remove horizontal and swap with vertical view
			var horizontal_accordion = jQuery('.kalimah-shortcodes-accordion[data-type="horizontal"]');
			var vertical_tabs = jQuery('.kalimah-shortcodes-tabs[data-type="vertical"]');

			if (vertical_tabs.hasClass("vertical"))
				vertical_tabs.removeClass('vertical').addClass('horizontal');

			if (horizontal_accordion.hasClass("horizontal")) {
				horizontal_accordion.removeClass('horizontal').addClass('vertical');

				// Turn off event monitoring for horizontal accordion third style and turn it on for vertical
				// Also restors elements left and width sized to defualt
				horizontal_accordion.hasClass('third-style').each(function (i, e) {
					var trigger = jQuery(e).attr("data-trigger");
					jQuery(e).find(".accordion_outer").off(trigger, onAccordionHorizontalActive);
					jQuery(e).find(".accordion_outer").on(trigger, onAccordionVerticalActive);
					jQuery(e).find(".accordion_outer.active").trigger(trigger);

					jQuery(e).find(".accordion_outer").css({
						'left' : '0',
						'width' : '100%',
						'transform' : 'translateX(0px)'
					});
				});
			}
		} else {
			if (resized) {
				// Return everything to normal
				jQuery('.kalimah-shortcodes-accordion').each(function (i, e) {
					var type = jQuery(e).attr('data-type');
					var outer = jQuery(e).find(".accordion_outer");
					var active = jQuery(e).find(".accordion_outer.active");
					var trigger = jQuery(e).attr("data-trigger");

					jQuery(e).removeClass('horizontal vertical').addClass(type);

					if (type == 'horizontal' && jQuery(e).hasClass('.third-style')) {

						jQuery(e).find(".accordion_outer").css({
							'top' : '0',
							'height' : '100%',
							'transform' : 'translateY(0px)'
						});

						outer.off(trigger, onAccordionVerticalActive);
						outer.on(trigger, onAccordionHorizontalActive);

						active.trigger(trigger);
					}
				});

				jQuery('.kalimah-shortcodes-tabs').each(function (i, e) {
					var type = jQuery(e).attr('data-type');
					jQuery(e).removeClass('horizontal vertical').addClass(type);
				});
			}
		}
	})
	.resize(); //trigger the resize event on page load.
	/*************
	Stack view for tab shortcode for horizontal orientation
	 *****************/
	jQuery(".kalimah-shortcodes-tabs.horizontal.fifth-style .shortcode_tabs_title").each(function (i, e) {
		jQuery(e).css('left', i * 5 + '%');
	});

	// When mouse is over one of the tabs then calcualte the width of that element
	// and then animate all next elements to view the current element in full
	jQuery(".kalimah-shortcodes-tabs.horizontal.fifth-style .shortcode_tabs_title").mouseenter(function () {
		var startFrom = jQuery(this).index();
		var elementEidth = jQuery(this).outerWidth();

		jQuery(this).addClass('border-radius').nextAll('li').each(function (i, e) {
			jQuery(e).css({
				'transform' : 'translateX(' + elementEidth + 'px)',
			});
		});
	});

	// When mouse leaves return all elements to their original state
	jQuery(".kalimah-shortcodes-tabs.horizontal.fifth-style .shortcode_tabs_title").mouseleave(function () {
		jQuery(".kalimah-shortcodes-tabs.horizontal.fifth-style .shortcode_tabs_title").each(function (i, e) {
			jQuery(e).css({
				'left' : i * 5 + '%',
				'transform' : 'translateX(0px)'
			}).removeClass('border-radius');
		});
	});

	/*************
	Stack view for tab shortcode for vertical orientation
	 *****************/
	jQuery(".kalimah-shortcodes-tabs.vertical.fifth-style .shortcode_tabs_title").each(function (i, e) {
		jQuery(e).css('top', i * 15 + 'px');
	});

	// When mouse is over one of the tabs then calcualte the height of that element
	// and then animate all next elements to view the current element in full
	jQuery(".kalimah-shortcodes-tabs.vertical.fifth-style .shortcode_tabs_title").mouseenter(function () {
		var startFrom = jQuery(this).index();
		var elementEidth = jQuery(this).outerHeight();

		jQuery(this).addClass('border-radius').nextAll('li').each(function (i, e) {
			jQuery(e).css({
				'transform' : 'translateY(' + elementEidth + 'px)'
			});
		});
	});

	// When mouse leaves return all elements to their original state
	jQuery(".kalimah-shortcodes-tabs.vertical.fifth-style .shortcode_tabs_title").mouseleave(function () {
		jQuery(".kalimah-shortcodes-tabs.vertical.fifth-style .shortcode_tabs_title").each(function (i, e) {
			jQuery(e).css({
				'top' : i * 15 + 'px',
				'transform' : 'translateY(0px)'
			}).removeClass('border-radius');
		});
	});

	/***********************
	Spoiler handling
	 ***********************/
	// Handle intital loading
	jQuery(".kalimah-shortcodes-spoiler").each(function (i, e) {
		var element = jQuery(e);
		if (element.hasClass('closed_spoiler'))
			element.children(".kalimah-shortcodes-spoiler-content").hide();
		else
			element.children(".kalimah-shortcodes-spoiler-content").show();
	});

	// Handle click
	jQuery(".kalimah-shortcodes-spoiler-title").click(function () {
		var parent = jQuery(this).parent();
		if (parent.hasClass('closed_spoiler')) {
			jQuery(this).siblings(".kalimah-shortcodes-spoiler-content").stop(true).slideDown();
			parent.removeClass('closed_spoiler').addClass('opened_spoiler');
		} else {
			jQuery(this).siblings(".kalimah-shortcodes-spoiler-content").stop(true).slideUp();
			parent.removeClass('opened_spoiler').addClass('closed_spoiler');
		}
	});

	/***
	Handle Anchor Smooth Scrolling
	 ****/
	jQuery('.kalimah-shortcodes-divider').on('click', '.kalimah-shortcodes-top-text', function (event) {
		event.preventDefault();
		var anchor = jQuery(this).attr('data-anchor');

		moveTo = (anchor == "#") ? 0 : jQuery(anchor).offset().top;

		jQuery('html, body').animate({
			scrollTop : moveTo
		}, 500);
	});

	/************************
	Handle animation hover trigger
	 *******************/
	jQuery('.kalimah-shortcodes-animation').each(function (index, animationElement) {
		var element = jQuery(animationElement);
		var trigger = element.attr("data-trigger");
		var duration = element.attr("data-delay");
		var effect = element.attr("data-effect");

		if (trigger == 'hover') {
			trigger = 'mouseenter';
		} else if (trigger == 'delay') {
			setTimeout(function () {
				element.trigger("delay");
			}, duration);
		}

		element.on(trigger, function (event) {
			element.addClass(effect + " animated");

			element.on('animationend', function () {
				element.removeClass(effect + " animated");
				element.off('inview');
			});
		});
	});

	/************************
	Handle tooltip trigger
	 *******************/
	jQuery('.kalimah-shortcodes-tooltip').each(function (index, animationElement) {
		var element = jQuery(animationElement);
		var trigger = element.attr("data-trigger");
		var duration = element.attr("data-delay");

		if (trigger == 'hover') {
			trigger = 'mouseenter';
		} else if (trigger == 'delay') {
			setTimeout(function () {
				element.trigger("delay");
			}, duration);
		}

		element.on(trigger, function (event) {

			if (trigger == 'click') {
				if (element.hasClass("animated"))
					element.removeClass("animated");
				else
					element.addClass("animated");
			} else if (trigger == 'mouseenter') {
				element.addClass("animated");
				element.on('mouseleave', function () {
					element.removeClass("animated");
				});
			} else if (trigger == 'inview' || trigger == 'delay')
				element.addClass("animated");
		});
	});

	jQuery(".kalimah-shortcodes-tooltip .kalimah-shortcodes-tooltip-close").click(function () {
		jQuery(this).closest(".kalimah-shortcodes-tooltip").removeClass("animated");
		return false;
	});

	/************************
	Features/service list animation
	 *******************/
	jQuery(".kalimah-shortcodes-features-list-item").on('inview', function (event, isInView) {
		if (isInView) {
			var eleme = jQuery(this);
			eleme.off('inview');

			eleme.addClass(eleme.closest('.kalimah-shortcodes-features-list').attr("data-animation"));
		}
	});

	/************************
	Gallery JS
	 *******************/
	jQuery(".kalimah-shortcodes-gallery.first-style").on('click', '.kalimah-shortcodes-gallery-thumbs img', function (event) {
		var parent = jQuery(this).parent();
		var index = jQuery(this).index();
		parent.siblings('.kalimah-shortcodes-gallery-images').find('img').eq(index).addClass("active").siblings().removeClass("active");
	});

	/* 	Handle thumbnail click for second-style */
	jQuery(".kalimah-shortcodes-gallery.second-style .kalimah-shortcodes-gallery-thumbs").on('click', 'img', function (event) {
		var element = jQuery(this);
		var mainParent = element.closest('.kalimah-shortcodes-gallery');
		var parent = element.parent();
		var left = parent.scrollLeft();
		var index = element.index();

		element.addClass("active").siblings().removeClass("active");

		var targetElement = mainParent.find('.kalimah-shortcodes-gallery-images img').eq(index);
		targetElement.addClass("active").siblings().removeClass("active");

		// Animate the parent height to fit the child
		targetElement.parent().css('height', targetElement.outerHeight());

		// Make sure the next thumbnail is shown if needed
		if (element.next().length > 0) {
			var leftPositionWidth = element.next().position().left + element.width();
			var parentFullWidth = parent.outerWidth();

			// How much to move left
			var moveLeft = leftPositionWidth - parentFullWidth;
			var currentScrollLeft = parent.scrollLeft();

			// move left only if the next element is out of view
			if (leftPositionWidth > parentFullWidth) {
				parent.stop(true, true).animate({
					scrollLeft : moveLeft + currentScrollLeft + 'px'
				});
			}
		}

		// Make sure the prev thumbnail is shown if needed
		if (element.prev().length > 0) {
			var leftPosition = element.prev().position().left;

			// How much to move left
			var moveLeft = element.width() * index;
			var currentScrollLeft = parent.scrollLeft() - element.width();

			// move left only if the prev element is out of view
			if (leftPosition < element.width()) {
				parent.stop(true, true).animate({
					scrollLeft : currentScrollLeft + 'px'
				});
			}
		}
	});

	/* 	Handle next and prev click */
	jQuery(".kalimah-shortcodes-gallery.second-style").on('click', '.next, .prev', function (event) {
		var mainParent = jQuery(this).closest('.kalimah-shortcodes-gallery');
		var parent = mainParent.find('.kalimah-shortcodes-gallery-thumbs');
		var thumb = parent.find("img").eq(0);
		var left = parent.scrollLeft();

		if (jQuery(this).hasClass("prev"))
			parent.stop(true, true).animate({
				scrollLeft : left - thumb.width() + 'px'
			});
		else
			parent.stop(true, true).animate({
				scrollLeft : left + thumb.width() + 'px'
			});

	});

	/* Third Style*/
	jQuery(".kalimah-shortcodes-gallery.third-style .kalimah-shortcodes-gallery-images img").each(function (i, e) {
		var rotateValue = 350 / jQuery(e).siblings().length;
		var rotate = i * rotateValue;
		jQuery(e).css('transform', ' translate(-50%, -50%) rotate(' + rotate + 'deg) scale(1.05)');
		jQuery(e).click(function () {
			var style = jQuery(this).attr("style");
			jQuery(this).addClass('active');

			// Swap css
			jQuery(this).siblings('.active').attr("style", style).removeClass("active");
		});
	});

	/* Fourth Style*/
	jQuery(".kalimah-shortcodes-gallery.fourth-style .kalimah-shortcodes-gallery-thumbs img:last-child").on('mouseover', function (event) {
		var rotateValue = 350 / jQuery(this).siblings().length;
		var images_parent = jQuery(this).parent().siblings('.kalimah-shortcodes-gallery-images');

		// Handle click to show lightbox
		jQuery(this).click(function () {
			images_parent.addClass('lightbox');
			images_parent.find('img').eq(0).addClass('active');
		});
		// Animate sibilings
		jQuery(this).siblings().each(function (i, e) {
			var rotate = i * rotateValue;
			jQuery(e).css('transform', ' translate(-50%, -50%) rotate(' + rotate + 'deg) scale(1.1)');
		})
	}).on('mouseout', function (event) {
		jQuery(this).siblings().each(function (i, e) {
			jQuery(e).css('transform', ' translate(-50%, -50%)');
		})
	});

	/* Handle prev and next click for fourth style */
	jQuery(".kalimah-shortcodes-gallery.fourth-style").on('click', '.prev, .next', function (event) {
		var mainParent = jQuery(this).closest('.kalimah-shortcodes-gallery');
		var images = mainParent.find('.kalimah-shortcodes-gallery-images img');
		var active = mainParent.find('.kalimah-shortcodes-gallery-images img.active');
		var nextElement = (active.next().length > 0) ? active.next() : images.eq(0);
		var prevElement = (active.prev().length > 0) ? active.prev() : images.last();

		var element = (jQuery(this).hasClass('next')) ? nextElement : prevElement;

		element.addClass('active');
		active.removeClass('active');
	});

	jQuery(".kalimah-shortcodes-gallery.fourth-style").on("click", ".kalimah-shortcodes-gallery-navigation", function (e) {
		if(!jQuery(e.target).hasClass('prev') && !jQuery(e.target).hasClass('next'))
			jQuery('.kalimah-shortcodes-gallery.fourth-style .kalimah-shortcodes-gallery-images.lightbox').removeClass('lightbox');
	});

	jQuery(".kalimah-shortcodes-gallery .kalimah-shortcodes-gallery-images img:first-child, .kalimah-shortcodes-gallery .kalimah-shortcodes-gallery-thumbs img:first-child").trigger('click');
});
