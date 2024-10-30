jQuery.fn.kalimah_icon_picker = function () {

	return this.each(function (options) {
		// Define options
		var settings = jQuery.extend({
				// These are the defaults.
				itemsPerPage : 80,
				selectorElement : jQuery(this),
				targetElement : jQuery(jQuery(this).attr("data-target")),
				displayElement : jQuery(jQuery(this).attr("data-display"))
			}, options);

		var selectorElement = settings.selectorElement;
		var targetElement = settings.targetElement;
		var displayElement = settings.displayElement;

		displayElement.css({
			'align-content' : 'center',
			'background-color' : 'rgb(227, 227, 227)',
			'color' : 'black',
			'border' : '1px solid #828282',
			'border-radius' : '3px',
			'box-sizing' : 'padding-box',
			'cursor' : 'pointer',
			'display' : 'flex',
			'flex-direction' : 'column',
			'font-size' : '20px',
			'height' : '33px',
			'justify-content' : 'center',
			'padding' : '6px',
			'text-align' : 'center',
			'width' : '35px',
		}).attr("class", "ion-navicon-round " + displayElement.attr("class"));

		// Wrap element
		var wrappingElemment = jQuery('<div class="kalimah_icons_picker_wrapper"></div>');
		selectorElement.wrap(wrappingElemment);

		/* Check that the picker box has not been created before
		We dont want to create mutliple boxes
		 */
		var boxes = jQuery("#kalimah_icons_picker").length;
		if (boxes == 0) {
			var icons = createPickerBox();
			jQuery("body").append(icons);
		}

		// Handle show/display of main box
		selectorElement.click(function (event) {
			var item = jQuery(this).siblings('.kalimah_icons_picker');

			// Does the the item exist
			if (item.length == 0) {
				var picker = jQuery("#kalimah_icons_picker").clone(true);

				selectorElement.parent().append(picker);

				// set elements again
				mainWrapper = picker;
				elements = {
					items : picker.find(".icons_wrapper > span"),
					itemsWrapper : picker.find(".icons"),
					itemsSearchWrapper : picker.find(".icons_search_wrapper"),
					types : picker.find(".icons_types > span"),
					typesWrapper : picker.find(".icons_types"),
					pagination : picker.find(".icons_pagination"),
					next : picker.find(".icons_next"),
					prev : picker.find(".icons_prev"),
					searchElement : picker.find(".icons_search input")
				};

				totalIcons = elements.items.length;
				pagesNumber = Math.ceil(totalIcons / settings.itemsPerPage);
				currentPage = elements.itemsWrapper.attr("data-page");

				// Add html sections
				for (i = 0; i <= pagesNumber; i++) {
					var from = settings.itemsPerPage * i;
					var to = (settings.itemsPerPage * i) + settings.itemsPerPage;
					elements.items.slice(from, to).wrapAll("<div></div>");
				}

				elements.pagination.text(currentPage + " / " + pagesNumber);

				// prev click
				elements.prev.click(onPrevClick);

				// Searching box
				elements.searchElement.keyup(onKeyUp);

				// Handle on item click
				elements.items.click(onItemsClick);
				elements.itemsSearchWrapper.on('click', 'span', onItemsClick);

				// Handle on icon group (fontawesome, dashicons .. etc) click
				elements.types.click(onTypesClick);

				// next click
				elements.next.click(onNextClick);

				// clicking outside the wrapper
				jQuery(document).on("click", function (e) {
					var clickPosTop = e.clientY;
					var clickPosLeft = e.clientX;
					var pickerBounds = mainWrapper[0].getBoundingClientRect();

					if (jQuery(e.target).hasClass('icon-picker'))
						return;
						
					if ((clickPosTop < pickerBounds.top || clickPosLeft < pickerBounds.left || clickPosTop > pickerBounds.bottom || clickPosLeft > pickerBounds.right))
						mainWrapper.hide().remove()
				});
			}

			var item = jQuery(this).siblings('.kalimah_icons_picker');

			// is the new item shown?
			//var newPicker = jQuery("#kalimah_icons_picker");
			if (item.is(":visible"))
				item.css("opacity", 1).hide().remove();
			else
				item.show().css("opacity", 1);

		});

		// Hide picker when clicking outside it
		jQuery(window).click(function (event) {
			if (!jQuery(event.target).is('.kalimah_icons_picker_wrapper') && !jQuery(event.target).parents('.kalimah_icons_picker_wrapper').is('.kalimah_icons_picker_wrapper'))
				jQuery('#popup_container .kalimah_icons_picker').css("opacity", 1).hide().remove();
		});
		function createPickerBox() {
			var string = '<div class="kalimah_icons_picker" id="kalimah_icons_picker" style="display:none;"> \
							<div class="icons_types"> \
							  <span data-type="all" class="active dashicons dashicons-screenoptions"></span> \
							  <span data-type="fontawesome" class="fa fa-flag"></span> \
							  <span data-type="dashicons" class="dashicons dashicons-dashboard"></span> \
							  <span data-type="ion" class="ion-ionic"></span> \
							  <span data-type="themify" class="ti-themify-favicon"></span> \
							  <span data-type="typeicons" class="typcn typcn-weather-snow"></span> \
							</div> \
						  <div class="icons_search"><input type="text" name="no-shortcode" placeholder="Search Icons"></div> \
						<div class="icons" data-page="1" data-group="all"> \
						<div class="icons_search_wrapper"></div> \
						<div class="icons_wrapper">';
			string += '<span class="" data-group="fontawesome" data-tags=""></span> \
						<span class="fa fa-500px" data-group="fontawesome" data-tags="fa fa-500px"></span><span class="fa fa-address-book" data-group="fontawesome" data-tags="fa fa-address-book"></span><span class="fa fa-address-book-o" data-group="fontawesome" data-tags="fa fa-address-book-o"></span><span class="fa fa-address-card" data-group="fontawesome" data-tags="fa fa-address-card"></span><span class="fa fa-address-card-o" data-group="fontawesome" data-tags="fa fa-address-card-o"></span><span class="fa fa-adjust" data-group="fontawesome" data-tags="fa fa-adjust"></span><span class="fa fa-adn" data-group="fontawesome" data-tags="fa fa-adn"></span><span class="fa fa-align-center" data-group="fontawesome" data-tags="fa fa-align-center"></span><span class="fa fa-align-justify" data-group="fontawesome" data-tags="fa fa-align-justify"></span><span class="fa fa-align-left" data-group="fontawesome" data-tags="fa fa-align-left"></span><span class="fa fa-align-right" data-group="fontawesome" data-tags="fa fa-align-right"></span><span class="fa fa-amazon" data-group="fontawesome" data-tags="fa fa-amazon"></span><span class="fa fa-ambulance" data-group="fontawesome" data-tags="fa fa-ambulance"></span><span class="fa fa-american-sign-language-interpreting" data-group="fontawesome" data-tags="fa fa-american-sign-language-interpreting"></span><span class="fa fa-anchor" data-group="fontawesome" data-tags="fa fa-anchor"></span><span class="fa fa-android" data-group="fontawesome" data-tags="fa fa-android"></span><span class="fa fa-angellist" data-group="fontawesome" data-tags="fa fa-angellist"></span><span class="fa fa-angle-double-down" data-group="fontawesome" data-tags="fa fa-angle-double-down"></span><span class="fa fa-angle-double-left" data-group="fontawesome" data-tags="fa fa-angle-double-left"></span><span class="fa fa-angle-double-right" data-group="fontawesome" data-tags="fa fa-angle-double-right"></span><span class="fa fa-angle-double-up" data-group="fontawesome" data-tags="fa fa-angle-double-up"></span><span class="fa fa-angle-down" data-group="fontawesome" data-tags="fa fa-angle-down"></span><span class="fa fa-angle-left" data-group="fontawesome" data-tags="fa fa-angle-left"></span><span class="fa fa-angle-right" data-group="fontawesome" data-tags="fa fa-angle-right"></span><span class="fa fa-angle-up" data-group="fontawesome" data-tags="fa fa-angle-up"></span><span class="fa fa-apple" data-group="fontawesome" data-tags="fa fa-apple"></span><span class="fa fa-archive" data-group="fontawesome" data-tags="fa fa-archive"></span><span class="fa fa-area-chart" data-group="fontawesome" data-tags="fa fa-area-chart"></span><span class="fa fa-arrow-circle-down" data-group="fontawesome" data-tags="fa fa-arrow-circle-down"></span><span class="fa fa-arrow-circle-left" data-group="fontawesome" data-tags="fa fa-arrow-circle-left"></span><span class="fa fa-arrow-circle-o-down" data-group="fontawesome" data-tags="fa fa-arrow-circle-o-down"></span><span class="fa fa-arrow-circle-o-left" data-group="fontawesome" data-tags="fa fa-arrow-circle-o-left"></span><span class="fa fa-arrow-circle-o-right" data-group="fontawesome" data-tags="fa fa-arrow-circle-o-right"></span><span class="fa fa-arrow-circle-o-up" data-group="fontawesome" data-tags="fa fa-arrow-circle-o-up"></span><span class="fa fa-arrow-circle-right" data-group="fontawesome" data-tags="fa fa-arrow-circle-right"></span><span class="fa fa-arrow-circle-up" data-group="fontawesome" data-tags="fa fa-arrow-circle-up"></span><span class="fa fa-arrow-down" data-group="fontawesome" data-tags="fa fa-arrow-down"></span><span class="fa fa-arrow-left" data-group="fontawesome" data-tags="fa fa-arrow-left"></span><span class="fa fa-arrow-right" data-group="fontawesome" data-tags="fa fa-arrow-right"></span><span class="fa fa-arrow-up" data-group="fontawesome" data-tags="fa fa-arrow-up"></span><span class="fa fa-arrows" data-group="fontawesome" data-tags="fa fa-arrows"></span><span class="fa fa-arrows-alt" data-group="fontawesome" data-tags="fa fa-arrows-alt"></span><span class="fa fa-arrows-h" data-group="fontawesome" data-tags="fa fa-arrows-h"></span><span class="fa fa-arrows-v" data-group="fontawesome" data-tags="fa fa-arrows-v"></span><span class="fa fa-assistive-listening-systems" data-group="fontawesome" data-tags="fa fa-assistive-listening-systems"></span><span class="fa fa-asterisk" data-group="fontawesome" data-tags="fa fa-asterisk"></span><span class="fa fa-at" data-group="fontawesome" data-tags="fa fa-at"></span><span class="fa fa-audio-description" data-group="fontawesome" data-tags="fa fa-audio-description"></span><span class="fa fa-backward" data-group="fontawesome" data-tags="fa fa-backward"></span><span class="fa fa-balance-scale" data-group="fontawesome" data-tags="fa fa-balance-scale"></span><span class="fa fa-ban" data-group="fontawesome" data-tags="fa fa-ban"></span><span class="fa fa-bandcamp" data-group="fontawesome" data-tags="fa fa-bandcamp"></span><span class="fa fa-bar-chart" data-group="fontawesome" data-tags="fa fa-bar-chart"></span><span class="fa fa-barcode" data-group="fontawesome" data-tags="fa fa-barcode"></span><span class="fa fa-bars" data-group="fontawesome" data-tags="fa fa-bars"></span><span class="fa fa-bath" data-group="fontawesome" data-tags="fa fa-bath"></span><span class="fa fa-battery-empty" data-group="fontawesome" data-tags="fa fa-battery-empty"></span><span class="fa fa-battery-full" data-group="fontawesome" data-tags="fa fa-battery-full"></span><span class="fa fa-battery-half" data-group="fontawesome" data-tags="fa fa-battery-half"></span><span class="fa fa-battery-quarter" data-group="fontawesome" data-tags="fa fa-battery-quarter"></span><span class="fa fa-battery-three-quarters" data-group="fontawesome" data-tags="fa fa-battery-three-quarters"></span><span class="fa fa-bed" data-group="fontawesome" data-tags="fa fa-bed"></span><span class="fa fa-beer" data-group="fontawesome" data-tags="fa fa-beer"></span><span class="fa fa-behance" data-group="fontawesome" data-tags="fa fa-behance"></span><span class="fa fa-behance-square" data-group="fontawesome" data-tags="fa fa-behance-square"></span><span class="fa fa-bell" data-group="fontawesome" data-tags="fa fa-bell"></span><span class="fa fa-bell-o" data-group="fontawesome" data-tags="fa fa-bell-o"></span><span class="fa fa-bell-slash" data-group="fontawesome" data-tags="fa fa-bell-slash"></span><span class="fa fa-bell-slash-o" data-group="fontawesome" data-tags="fa fa-bell-slash-o"></span><span class="fa fa-bicycle" data-group="fontawesome" data-tags="fa fa-bicycle"></span><span class="fa fa-binoculars" data-group="fontawesome" data-tags="fa fa-binoculars"></span><span class="fa fa-birthday-cake" data-group="fontawesome" data-tags="fa fa-birthday-cake"></span><span class="fa fa-bitbucket" data-group="fontawesome" data-tags="fa fa-bitbucket"></span><span class="fa fa-bitbucket-square" data-group="fontawesome" data-tags="fa fa-bitbucket-square"></span><span class="fa fa-black-tie" data-group="fontawesome" data-tags="fa fa-black-tie"></span><span class="fa fa-blind" data-group="fontawesome" data-tags="fa fa-blind"></span><span class="fa fa-bluetooth" data-group="fontawesome" data-tags="fa fa-bluetooth"></span><span class="fa fa-bluetooth-b" data-group="fontawesome" data-tags="fa fa-bluetooth-b"></span><span class="fa fa-bold" data-group="fontawesome" data-tags="fa fa-bold"></span><span class="fa fa-bolt" data-group="fontawesome" data-tags="fa fa-bolt"></span><span class="fa fa-bomb" data-group="fontawesome" data-tags="fa fa-bomb"></span><span class="fa fa-book" data-group="fontawesome" data-tags="fa fa-book"></span><span class="fa fa-bookmark" data-group="fontawesome" data-tags="fa fa-bookmark"></span><span class="fa fa-bookmark-o" data-group="fontawesome" data-tags="fa fa-bookmark-o"></span><span class="fa fa-braille" data-group="fontawesome" data-tags="fa fa-braille"></span><span class="fa fa-briefcase" data-group="fontawesome" data-tags="fa fa-briefcase"></span><span class="fa fa-btc" data-group="fontawesome" data-tags="fa fa-btc"></span><span class="fa fa-bug" data-group="fontawesome" data-tags="fa fa-bug"></span><span class="fa fa-building" data-group="fontawesome" data-tags="fa fa-building"></span><span class="fa fa-building-o" data-group="fontawesome" data-tags="fa fa-building-o"></span><span class="fa fa-bullhorn" data-group="fontawesome" data-tags="fa fa-bullhorn"></span><span class="fa fa-bullseye" data-group="fontawesome" data-tags="fa fa-bullseye"></span><span class="fa fa-bus" data-group="fontawesome" data-tags="fa fa-bus"></span><span class="fa fa-buysellads" data-group="fontawesome" data-tags="fa fa-buysellads"></span><span class="fa fa-calculator" data-group="fontawesome" data-tags="fa fa-calculator"></span><span class="fa fa-calendar" data-group="fontawesome" data-tags="fa fa-calendar"></span><span class="fa fa-calendar-check-o" data-group="fontawesome" data-tags="fa fa-calendar-check-o"></span><span class="fa fa-calendar-minus-o" data-group="fontawesome" data-tags="fa fa-calendar-minus-o"></span><span class="fa fa-calendar-o" data-group="fontawesome" data-tags="fa fa-calendar-o"></span><span class="fa fa-calendar-plus-o" data-group="fontawesome" data-tags="fa fa-calendar-plus-o"></span><span class="fa fa-calendar-times-o" data-group="fontawesome" data-tags="fa fa-calendar-times-o"></span><span class="fa fa-camera" data-group="fontawesome" data-tags="fa fa-camera"></span><span class="fa fa-camera-retro" data-group="fontawesome" data-tags="fa fa-camera-retro"></span><span class="fa fa-car" data-group="fontawesome" data-tags="fa fa-car"></span><span class="fa fa-caret-down" data-group="fontawesome" data-tags="fa fa-caret-down"></span><span class="fa fa-caret-left" data-group="fontawesome" data-tags="fa fa-caret-left"></span><span class="fa fa-caret-right" data-group="fontawesome" data-tags="fa fa-caret-right"></span><span class="fa fa-caret-square-o-down" data-group="fontawesome" data-tags="fa fa-caret-square-o-down"></span><span class="fa fa-caret-square-o-left" data-group="fontawesome" data-tags="fa fa-caret-square-o-left"></span><span class="fa fa-caret-square-o-right" data-group="fontawesome" data-tags="fa fa-caret-square-o-right"></span><span class="fa fa-caret-square-o-up" data-group="fontawesome" data-tags="fa fa-caret-square-o-up"></span><span class="fa fa-caret-up" data-group="fontawesome" data-tags="fa fa-caret-up"></span><span class="fa fa-cart-arrow-down" data-group="fontawesome" data-tags="fa fa-cart-arrow-down"></span><span class="fa fa-cart-plus" data-group="fontawesome" data-tags="fa fa-cart-plus"></span><span class="fa fa-cc" data-group="fontawesome" data-tags="fa fa-cc"></span><span class="fa fa-cc-amex" data-group="fontawesome" data-tags="fa fa-cc-amex"></span><span class="fa fa-cc-diners-club" data-group="fontawesome" data-tags="fa fa-cc-diners-club"></span><span class="fa fa-cc-discover" data-group="fontawesome" data-tags="fa fa-cc-discover"></span><span class="fa fa-cc-jcb" data-group="fontawesome" data-tags="fa fa-cc-jcb"></span><span class="fa fa-cc-mastercard" data-group="fontawesome" data-tags="fa fa-cc-mastercard"></span><span class="fa fa-cc-paypal" data-group="fontawesome" data-tags="fa fa-cc-paypal"></span><span class="fa fa-cc-stripe" data-group="fontawesome" data-tags="fa fa-cc-stripe"></span><span class="fa fa-cc-visa" data-group="fontawesome" data-tags="fa fa-cc-visa"></span><span class="fa fa-certificate" data-group="fontawesome" data-tags="fa fa-certificate"></span><span class="fa fa-chain-broken" data-group="fontawesome" data-tags="fa fa-chain-broken"></span><span class="fa fa-check" data-group="fontawesome" data-tags="fa fa-check"></span><span class="fa fa-check-circle" data-group="fontawesome" data-tags="fa fa-check-circle"></span><span class="fa fa-check-circle-o" data-group="fontawesome" data-tags="fa fa-check-circle-o"></span><span class="fa fa-check-square" data-group="fontawesome" data-tags="fa fa-check-square"></span><span class="fa fa-check-square-o" data-group="fontawesome" data-tags="fa fa-check-square-o"></span><span class="fa fa-chevron-circle-down" data-group="fontawesome" data-tags="fa fa-chevron-circle-down"></span><span class="fa fa-chevron-circle-left" data-group="fontawesome" data-tags="fa fa-chevron-circle-left"></span><span class="fa fa-chevron-circle-right" data-group="fontawesome" data-tags="fa fa-chevron-circle-right"></span><span class="fa fa-chevron-circle-up" data-group="fontawesome" data-tags="fa fa-chevron-circle-up"></span><span class="fa fa-chevron-down" data-group="fontawesome" data-tags="fa fa-chevron-down"></span><span class="fa fa-chevron-left" data-group="fontawesome" data-tags="fa fa-chevron-left"></span><span class="fa fa-chevron-right" data-group="fontawesome" data-tags="fa fa-chevron-right"></span><span class="fa fa-chevron-up" data-group="fontawesome" data-tags="fa fa-chevron-up"></span><span class="fa fa-child" data-group="fontawesome" data-tags="fa fa-child"></span><span class="fa fa-chrome" data-group="fontawesome" data-tags="fa fa-chrome"></span><span class="fa fa-circle" data-group="fontawesome" data-tags="fa fa-circle"></span><span class="fa fa-circle-o" data-group="fontawesome" data-tags="fa fa-circle-o"></span><span class="fa fa-circle-o-notch" data-group="fontawesome" data-tags="fa fa-circle-o-notch"></span><span class="fa fa-circle-thin" data-group="fontawesome" data-tags="fa fa-circle-thin"></span><span class="fa fa-clipboard" data-group="fontawesome" data-tags="fa fa-clipboard"></span><span class="fa fa-clock-o" data-group="fontawesome" data-tags="fa fa-clock-o"></span><span class="fa fa-clone" data-group="fontawesome" data-tags="fa fa-clone"></span><span class="fa fa-cloud" data-group="fontawesome" data-tags="fa fa-cloud"></span><span class="fa fa-cloud-download" data-group="fontawesome" data-tags="fa fa-cloud-download"></span><span class="fa fa-cloud-upload" data-group="fontawesome" data-tags="fa fa-cloud-upload"></span><span class="fa fa-code" data-group="fontawesome" data-tags="fa fa-code"></span><span class="fa fa-code-fork" data-group="fontawesome" data-tags="fa fa-code-fork"></span><span class="fa fa-codepen" data-group="fontawesome" data-tags="fa fa-codepen"></span><span class="fa fa-codiepie" data-group="fontawesome" data-tags="fa fa-codiepie"></span><span class="fa fa-coffee" data-group="fontawesome" data-tags="fa fa-coffee"></span><span class="fa fa-cog" data-group="fontawesome" data-tags="fa fa-cog"></span><span class="fa fa-cogs" data-group="fontawesome" data-tags="fa fa-cogs"></span><span class="fa fa-columns" data-group="fontawesome" data-tags="fa fa-columns"></span><span class="fa fa-comment" data-group="fontawesome" data-tags="fa fa-comment"></span><span class="fa fa-comment-o" data-group="fontawesome" data-tags="fa fa-comment-o"></span><span class="fa fa-commenting" data-group="fontawesome" data-tags="fa fa-commenting"></span><span class="fa fa-commenting-o" data-group="fontawesome" data-tags="fa fa-commenting-o"></span><span class="fa fa-comments" data-group="fontawesome" data-tags="fa fa-comments"></span><span class="fa fa-comments-o" data-group="fontawesome" data-tags="fa fa-comments-o"></span><span class="fa fa-compass" data-group="fontawesome" data-tags="fa fa-compass"></span><span class="fa fa-compress" data-group="fontawesome" data-tags="fa fa-compress"></span><span class="fa fa-connectdevelop" data-group="fontawesome" data-tags="fa fa-connectdevelop"></span><span class="fa fa-contao" data-group="fontawesome" data-tags="fa fa-contao"></span><span class="fa fa-copyright" data-group="fontawesome" data-tags="fa fa-copyright"></span><span class="fa fa-creative-commons" data-group="fontawesome" data-tags="fa fa-creative-commons"></span><span class="fa fa-credit-card" data-group="fontawesome" data-tags="fa fa-credit-card"></span><span class="fa fa-credit-card-alt" data-group="fontawesome" data-tags="fa fa-credit-card-alt"></span><span class="fa fa-crop" data-group="fontawesome" data-tags="fa fa-crop"></span><span class="fa fa-crosshairs" data-group="fontawesome" data-tags="fa fa-crosshairs"></span><span class="fa fa-css3" data-group="fontawesome" data-tags="fa fa-css3"></span><span class="fa fa-cube" data-group="fontawesome" data-tags="fa fa-cube"></span><span class="fa fa-cubes" data-group="fontawesome" data-tags="fa fa-cubes"></span><span class="fa fa-cutlery" data-group="fontawesome" data-tags="fa fa-cutlery"></span><span class="fa fa-dashcube" data-group="fontawesome" data-tags="fa fa-dashcube"></span><span class="fa fa-database" data-group="fontawesome" data-tags="fa fa-database"></span><span class="fa fa-deaf" data-group="fontawesome" data-tags="fa fa-deaf"></span><span class="fa fa-delicious" data-group="fontawesome" data-tags="fa fa-delicious"></span><span class="fa fa-desktop" data-group="fontawesome" data-tags="fa fa-desktop"></span><span class="fa fa-deviantart" data-group="fontawesome" data-tags="fa fa-deviantart"></span><span class="fa fa-diamond" data-group="fontawesome" data-tags="fa fa-diamond"></span><span class="fa fa-digg" data-group="fontawesome" data-tags="fa fa-digg"></span><span class="fa fa-dot-circle-o" data-group="fontawesome" data-tags="fa fa-dot-circle-o"></span><span class="fa fa-download" data-group="fontawesome" data-tags="fa fa-download"></span><span class="fa fa-dribbble" data-group="fontawesome" data-tags="fa fa-dribbble"></span><span class="fa fa-dropbox" data-group="fontawesome" data-tags="fa fa-dropbox"></span><span class="fa fa-drupal" data-group="fontawesome" data-tags="fa fa-drupal"></span><span class="fa fa-edge" data-group="fontawesome" data-tags="fa fa-edge"></span><span class="fa fa-eercast" data-group="fontawesome" data-tags="fa fa-eercast"></span><span class="fa fa-eject" data-group="fontawesome" data-tags="fa fa-eject"></span><span class="fa fa-ellipsis-h" data-group="fontawesome" data-tags="fa fa-ellipsis-h"></span><span class="fa fa-ellipsis-v" data-group="fontawesome" data-tags="fa fa-ellipsis-v"></span><span class="fa fa-empire" data-group="fontawesome" data-tags="fa fa-empire"></span><span class="fa fa-envelope" data-group="fontawesome" data-tags="fa fa-envelope"></span><span class="fa fa-envelope-o" data-group="fontawesome" data-tags="fa fa-envelope-o"></span><span class="fa fa-envelope-open" data-group="fontawesome" data-tags="fa fa-envelope-open"></span><span class="fa fa-envelope-open-o" data-group="fontawesome" data-tags="fa fa-envelope-open-o"></span><span class="fa fa-envelope-square" data-group="fontawesome" data-tags="fa fa-envelope-square"></span><span class="fa fa-envira" data-group="fontawesome" data-tags="fa fa-envira"></span><span class="fa fa-eraser" data-group="fontawesome" data-tags="fa fa-eraser"></span><span class="fa fa-etsy" data-group="fontawesome" data-tags="fa fa-etsy"></span><span class="fa fa-eur" data-group="fontawesome" data-tags="fa fa-eur"></span><span class="fa fa-exchange" data-group="fontawesome" data-tags="fa fa-exchange"></span><span class="fa fa-exclamation" data-group="fontawesome" data-tags="fa fa-exclamation"></span><span class="fa fa-exclamation-circle" data-group="fontawesome" data-tags="fa fa-exclamation-circle"></span><span class="fa fa-exclamation-triangle" data-group="fontawesome" data-tags="fa fa-exclamation-triangle"></span><span class="fa fa-expand" data-group="fontawesome" data-tags="fa fa-expand"></span><span class="fa fa-expeditedssl" data-group="fontawesome" data-tags="fa fa-expeditedssl"></span><span class="fa fa-external-link" data-group="fontawesome" data-tags="fa fa-external-link"></span><span class="fa fa-external-link-square" data-group="fontawesome" data-tags="fa fa-external-link-square"></span><span class="fa fa-eye" data-group="fontawesome" data-tags="fa fa-eye"></span><span class="fa fa-eye-slash" data-group="fontawesome" data-tags="fa fa-eye-slash"></span><span class="fa fa-eyedropper" data-group="fontawesome" data-tags="fa fa-eyedropper"></span><span class="fa fa-facebook" data-group="fontawesome" data-tags="fa fa-facebook"></span><span class="fa fa-facebook-official" data-group="fontawesome" data-tags="fa fa-facebook-official"></span><span class="fa fa-facebook-square" data-group="fontawesome" data-tags="fa fa-facebook-square"></span><span class="fa fa-fast-backward" data-group="fontawesome" data-tags="fa fa-fast-backward"></span><span class="fa fa-fast-forward" data-group="fontawesome" data-tags="fa fa-fast-forward"></span><span class="fa fa-fax" data-group="fontawesome" data-tags="fa fa-fax"></span><span class="fa fa-female" data-group="fontawesome" data-tags="fa fa-female"></span><span class="fa fa-fighter-jet" data-group="fontawesome" data-tags="fa fa-fighter-jet"></span><span class="fa fa-file" data-group="fontawesome" data-tags="fa fa-file"></span><span class="fa fa-file-archive-o" data-group="fontawesome" data-tags="fa fa-file-archive-o"></span><span class="fa fa-file-audio-o" data-group="fontawesome" data-tags="fa fa-file-audio-o"></span><span class="fa fa-file-code-o" data-group="fontawesome" data-tags="fa fa-file-code-o"></span><span class="fa fa-file-excel-o" data-group="fontawesome" data-tags="fa fa-file-excel-o"></span><span class="fa fa-file-image-o" data-group="fontawesome" data-tags="fa fa-file-image-o"></span><span class="fa fa-file-o" data-group="fontawesome" data-tags="fa fa-file-o"></span><span class="fa fa-file-pdf-o" data-group="fontawesome" data-tags="fa fa-file-pdf-o"></span><span class="fa fa-file-powerpoint-o" data-group="fontawesome" data-tags="fa fa-file-powerpoint-o"></span><span class="fa fa-file-text" data-group="fontawesome" data-tags="fa fa-file-text"></span><span class="fa fa-file-text-o" data-group="fontawesome" data-tags="fa fa-file-text-o"></span><span class="fa fa-file-video-o" data-group="fontawesome" data-tags="fa fa-file-video-o"></span><span class="fa fa-file-word-o" data-group="fontawesome" data-tags="fa fa-file-word-o"></span><span class="fa fa-files-o" data-group="fontawesome" data-tags="fa fa-files-o"></span><span class="fa fa-film" data-group="fontawesome" data-tags="fa fa-film"></span><span class="fa fa-filter" data-group="fontawesome" data-tags="fa fa-filter"></span><span class="fa fa-fire" data-group="fontawesome" data-tags="fa fa-fire"></span><span class="fa fa-fire-extinguisher" data-group="fontawesome" data-tags="fa fa-fire-extinguisher"></span><span class="fa fa-firefox" data-group="fontawesome" data-tags="fa fa-firefox"></span><span class="fa fa-first-order" data-group="fontawesome" data-tags="fa fa-first-order"></span><span class="fa fa-flag" data-group="fontawesome" data-tags="fa fa-flag"></span><span class="fa fa-flag-checkered" data-group="fontawesome" data-tags="fa fa-flag-checkered"></span><span class="fa fa-flag-o" data-group="fontawesome" data-tags="fa fa-flag-o"></span><span class="fa fa-flask" data-group="fontawesome" data-tags="fa fa-flask"></span><span class="fa fa-flickr" data-group="fontawesome" data-tags="fa fa-flickr"></span><span class="fa fa-floppy-o" data-group="fontawesome" data-tags="fa fa-floppy-o"></span><span class="fa fa-folder" data-group="fontawesome" data-tags="fa fa-folder"></span><span class="fa fa-folder-o" data-group="fontawesome" data-tags="fa fa-folder-o"></span><span class="fa fa-folder-open" data-group="fontawesome" data-tags="fa fa-folder-open"></span><span class="fa fa-folder-open-o" data-group="fontawesome" data-tags="fa fa-folder-open-o"></span><span class="fa fa-font" data-group="fontawesome" data-tags="fa fa-font"></span><span class="fa fa-font-awesome" data-group="fontawesome" data-tags="fa fa-font-awesome"></span><span class="fa fa-fonticons" data-group="fontawesome" data-tags="fa fa-fonticons"></span><span class="fa fa-fort-awesome" data-group="fontawesome" data-tags="fa fa-fort-awesome"></span><span class="fa fa-forumbee" data-group="fontawesome" data-tags="fa fa-forumbee"></span><span class="fa fa-forward" data-group="fontawesome" data-tags="fa fa-forward"></span><span class="fa fa-foursquare" data-group="fontawesome" data-tags="fa fa-foursquare"></span><span class="fa fa-free-code-camp" data-group="fontawesome" data-tags="fa fa-free-code-camp"></span><span class="fa fa-frown-o" data-group="fontawesome" data-tags="fa fa-frown-o"></span><span class="fa fa-futbol-o" data-group="fontawesome" data-tags="fa fa-futbol-o"></span><span class="fa fa-gamepad" data-group="fontawesome" data-tags="fa fa-gamepad"></span><span class="fa fa-gavel" data-group="fontawesome" data-tags="fa fa-gavel"></span><span class="fa fa-gbp" data-group="fontawesome" data-tags="fa fa-gbp"></span><span class="fa fa-genderless" data-group="fontawesome" data-tags="fa fa-genderless"></span><span class="fa fa-get-pocket" data-group="fontawesome" data-tags="fa fa-get-pocket"></span><span class="fa fa-gg" data-group="fontawesome" data-tags="fa fa-gg"></span><span class="fa fa-gg-circle" data-group="fontawesome" data-tags="fa fa-gg-circle"></span><span class="fa fa-gift" data-group="fontawesome" data-tags="fa fa-gift"></span><span class="fa fa-git" data-group="fontawesome" data-tags="fa fa-git"></span><span class="fa fa-git-square" data-group="fontawesome" data-tags="fa fa-git-square"></span><span class="fa fa-github" data-group="fontawesome" data-tags="fa fa-github"></span><span class="fa fa-github-alt" data-group="fontawesome" data-tags="fa fa-github-alt"></span><span class="fa fa-github-square" data-group="fontawesome" data-tags="fa fa-github-square"></span><span class="fa fa-gitlab" data-group="fontawesome" data-tags="fa fa-gitlab"></span><span class="fa fa-glass" data-group="fontawesome" data-tags="fa fa-glass"></span><span class="fa fa-glide" data-group="fontawesome" data-tags="fa fa-glide"></span><span class="fa fa-glide-g" data-group="fontawesome" data-tags="fa fa-glide-g"></span><span class="fa fa-globe" data-group="fontawesome" data-tags="fa fa-globe"></span><span class="fa fa-google" data-group="fontawesome" data-tags="fa fa-google"></span><span class="fa fa-google-plus" data-group="fontawesome" data-tags="fa fa-google-plus"></span><span class="fa fa-google-plus-official" data-group="fontawesome" data-tags="fa fa-google-plus-official"></span><span class="fa fa-google-plus-square" data-group="fontawesome" data-tags="fa fa-google-plus-square"></span><span class="fa fa-google-wallet" data-group="fontawesome" data-tags="fa fa-google-wallet"></span><span class="fa fa-graduation-cap" data-group="fontawesome" data-tags="fa fa-graduation-cap"></span><span class="fa fa-gratipay" data-group="fontawesome" data-tags="fa fa-gratipay"></span><span class="fa fa-grav" data-group="fontawesome" data-tags="fa fa-grav"></span><span class="fa fa-h-square" data-group="fontawesome" data-tags="fa fa-h-square"></span><span class="fa fa-hacker-news" data-group="fontawesome" data-tags="fa fa-hacker-news"></span><span class="fa fa-hand-lizard-o" data-group="fontawesome" data-tags="fa fa-hand-lizard-o"></span><span class="fa fa-hand-o-down" data-group="fontawesome" data-tags="fa fa-hand-o-down"></span><span class="fa fa-hand-o-left" data-group="fontawesome" data-tags="fa fa-hand-o-left"></span><span class="fa fa-hand-o-right" data-group="fontawesome" data-tags="fa fa-hand-o-right"></span><span class="fa fa-hand-o-up" data-group="fontawesome" data-tags="fa fa-hand-o-up"></span><span class="fa fa-hand-paper-o" data-group="fontawesome" data-tags="fa fa-hand-paper-o"></span><span class="fa fa-hand-peace-o" data-group="fontawesome" data-tags="fa fa-hand-peace-o"></span><span class="fa fa-hand-pointer-o" data-group="fontawesome" data-tags="fa fa-hand-pointer-o"></span><span class="fa fa-hand-rock-o" data-group="fontawesome" data-tags="fa fa-hand-rock-o"></span><span class="fa fa-hand-scissors-o" data-group="fontawesome" data-tags="fa fa-hand-scissors-o"></span><span class="fa fa-hand-spock-o" data-group="fontawesome" data-tags="fa fa-hand-spock-o"></span><span class="fa fa-handshake-o" data-group="fontawesome" data-tags="fa fa-handshake-o"></span><span class="fa fa-hashtag" data-group="fontawesome" data-tags="fa fa-hashtag"></span><span class="fa fa-hdd-o" data-group="fontawesome" data-tags="fa fa-hdd-o"></span><span class="fa fa-header" data-group="fontawesome" data-tags="fa fa-header"></span><span class="fa fa-headphones" data-group="fontawesome" data-tags="fa fa-headphones"></span><span class="fa fa-heart" data-group="fontawesome" data-tags="fa fa-heart"></span><span class="fa fa-heart-o" data-group="fontawesome" data-tags="fa fa-heart-o"></span><span class="fa fa-heartbeat" data-group="fontawesome" data-tags="fa fa-heartbeat"></span><span class="fa fa-history" data-group="fontawesome" data-tags="fa fa-history"></span><span class="fa fa-home" data-group="fontawesome" data-tags="fa fa-home"></span><span class="fa fa-hospital-o" data-group="fontawesome" data-tags="fa fa-hospital-o"></span><span class="fa fa-hourglass" data-group="fontawesome" data-tags="fa fa-hourglass"></span><span class="fa fa-hourglass-end" data-group="fontawesome" data-tags="fa fa-hourglass-end"></span><span class="fa fa-hourglass-half" data-group="fontawesome" data-tags="fa fa-hourglass-half"></span><span class="fa fa-hourglass-o" data-group="fontawesome" data-tags="fa fa-hourglass-o"></span><span class="fa fa-hourglass-start" data-group="fontawesome" data-tags="fa fa-hourglass-start"></span><span class="fa fa-houzz" data-group="fontawesome" data-tags="fa fa-houzz"></span><span class="fa fa-html5" data-group="fontawesome" data-tags="fa fa-html5"></span><span class="fa fa-i-cursor" data-group="fontawesome" data-tags="fa fa-i-cursor"></span><span class="fa fa-id-badge" data-group="fontawesome" data-tags="fa fa-id-badge"></span><span class="fa fa-id-card" data-group="fontawesome" data-tags="fa fa-id-card"></span><span class="fa fa-id-card-o" data-group="fontawesome" data-tags="fa fa-id-card-o"></span><span class="fa fa-ils" data-group="fontawesome" data-tags="fa fa-ils"></span><span class="fa fa-imdb" data-group="fontawesome" data-tags="fa fa-imdb"></span><span class="fa fa-inbox" data-group="fontawesome" data-tags="fa fa-inbox"></span><span class="fa fa-indent" data-group="fontawesome" data-tags="fa fa-indent"></span><span class="fa fa-industry" data-group="fontawesome" data-tags="fa fa-industry"></span><span class="fa fa-info" data-group="fontawesome" data-tags="fa fa-info"></span><span class="fa fa-info-circle" data-group="fontawesome" data-tags="fa fa-info-circle"></span><span class="fa fa-inr" data-group="fontawesome" data-tags="fa fa-inr"></span><span class="fa fa-instagram" data-group="fontawesome" data-tags="fa fa-instagram"></span><span class="fa fa-internet-explorer" data-group="fontawesome" data-tags="fa fa-internet-explorer"></span><span class="fa fa-ioxhost" data-group="fontawesome" data-tags="fa fa-ioxhost"></span><span class="fa fa-italic" data-group="fontawesome" data-tags="fa fa-italic"></span><span class="fa fa-joomla" data-group="fontawesome" data-tags="fa fa-joomla"></span><span class="fa fa-jpy" data-group="fontawesome" data-tags="fa fa-jpy"></span><span class="fa fa-jsfiddle" data-group="fontawesome" data-tags="fa fa-jsfiddle"></span><span class="fa fa-key" data-group="fontawesome" data-tags="fa fa-key"></span><span class="fa fa-keyboard-o" data-group="fontawesome" data-tags="fa fa-keyboard-o"></span><span class="fa fa-krw" data-group="fontawesome" data-tags="fa fa-krw"></span><span class="fa fa-language" data-group="fontawesome" data-tags="fa fa-language"></span><span class="fa fa-laptop" data-group="fontawesome" data-tags="fa fa-laptop"></span><span class="fa fa-lastfm" data-group="fontawesome" data-tags="fa fa-lastfm"></span><span class="fa fa-lastfm-square" data-group="fontawesome" data-tags="fa fa-lastfm-square"></span><span class="fa fa-leaf" data-group="fontawesome" data-tags="fa fa-leaf"></span><span class="fa fa-leanpub" data-group="fontawesome" data-tags="fa fa-leanpub"></span><span class="fa fa-lemon-o" data-group="fontawesome" data-tags="fa fa-lemon-o"></span><span class="fa fa-level-down" data-group="fontawesome" data-tags="fa fa-level-down"></span><span class="fa fa-level-up" data-group="fontawesome" data-tags="fa fa-level-up"></span><span class="fa fa-life-ring" data-group="fontawesome" data-tags="fa fa-life-ring"></span><span class="fa fa-lightbulb-o" data-group="fontawesome" data-tags="fa fa-lightbulb-o"></span><span class="fa fa-line-chart" data-group="fontawesome" data-tags="fa fa-line-chart"></span><span class="fa fa-link" data-group="fontawesome" data-tags="fa fa-link"></span><span class="fa fa-linkedin" data-group="fontawesome" data-tags="fa fa-linkedin"></span><span class="fa fa-linkedin-square" data-group="fontawesome" data-tags="fa fa-linkedin-square"></span><span class="fa fa-linode" data-group="fontawesome" data-tags="fa fa-linode"></span><span class="fa fa-linux" data-group="fontawesome" data-tags="fa fa-linux"></span><span class="fa fa-list" data-group="fontawesome" data-tags="fa fa-list"></span><span class="fa fa-list-alt" data-group="fontawesome" data-tags="fa fa-list-alt"></span><span class="fa fa-list-ol" data-group="fontawesome" data-tags="fa fa-list-ol"></span><span class="fa fa-list-ul" data-group="fontawesome" data-tags="fa fa-list-ul"></span><span class="fa fa-location-arrow" data-group="fontawesome" data-tags="fa fa-location-arrow"></span><span class="fa fa-lock" data-group="fontawesome" data-tags="fa fa-lock"></span><span class="fa fa-long-arrow-down" data-group="fontawesome" data-tags="fa fa-long-arrow-down"></span><span class="fa fa-long-arrow-left" data-group="fontawesome" data-tags="fa fa-long-arrow-left"></span><span class="fa fa-long-arrow-right" data-group="fontawesome" data-tags="fa fa-long-arrow-right"></span><span class="fa fa-long-arrow-up" data-group="fontawesome" data-tags="fa fa-long-arrow-up"></span><span class="fa fa-low-vision" data-group="fontawesome" data-tags="fa fa-low-vision"></span><span class="fa fa-magic" data-group="fontawesome" data-tags="fa fa-magic"></span><span class="fa fa-magnet" data-group="fontawesome" data-tags="fa fa-magnet"></span><span class="fa fa-male" data-group="fontawesome" data-tags="fa fa-male"></span><span class="fa fa-map" data-group="fontawesome" data-tags="fa fa-map"></span><span class="fa fa-map-marker" data-group="fontawesome" data-tags="fa fa-map-marker"></span><span class="fa fa-map-o" data-group="fontawesome" data-tags="fa fa-map-o"></span><span class="fa fa-map-pin" data-group="fontawesome" data-tags="fa fa-map-pin"></span><span class="fa fa-map-signs" data-group="fontawesome" data-tags="fa fa-map-signs"></span><span class="fa fa-mars" data-group="fontawesome" data-tags="fa fa-mars"></span><span class="fa fa-mars-double" data-group="fontawesome" data-tags="fa fa-mars-double"></span><span class="fa fa-mars-stroke" data-group="fontawesome" data-tags="fa fa-mars-stroke"></span><span class="fa fa-mars-stroke-h" data-group="fontawesome" data-tags="fa fa-mars-stroke-h"></span><span class="fa fa-mars-stroke-v" data-group="fontawesome" data-tags="fa fa-mars-stroke-v"></span><span class="fa fa-maxcdn" data-group="fontawesome" data-tags="fa fa-maxcdn"></span><span class="fa fa-meanpath" data-group="fontawesome" data-tags="fa fa-meanpath"></span><span class="fa fa-medium" data-group="fontawesome" data-tags="fa fa-medium"></span><span class="fa fa-medkit" data-group="fontawesome" data-tags="fa fa-medkit"></span><span class="fa fa-meetup" data-group="fontawesome" data-tags="fa fa-meetup"></span><span class="fa fa-meh-o" data-group="fontawesome" data-tags="fa fa-meh-o"></span><span class="fa fa-mercury" data-group="fontawesome" data-tags="fa fa-mercury"></span><span class="fa fa-microchip" data-group="fontawesome" data-tags="fa fa-microchip"></span><span class="fa fa-microphone" data-group="fontawesome" data-tags="fa fa-microphone"></span><span class="fa fa-microphone-slash" data-group="fontawesome" data-tags="fa fa-microphone-slash"></span><span class="fa fa-minus" data-group="fontawesome" data-tags="fa fa-minus"></span><span class="fa fa-minus-circle" data-group="fontawesome" data-tags="fa fa-minus-circle"></span><span class="fa fa-minus-square" data-group="fontawesome" data-tags="fa fa-minus-square"></span><span class="fa fa-minus-square-o" data-group="fontawesome" data-tags="fa fa-minus-square-o"></span><span class="fa fa-mixcloud" data-group="fontawesome" data-tags="fa fa-mixcloud"></span><span class="fa fa-mobile" data-group="fontawesome" data-tags="fa fa-mobile"></span><span class="fa fa-modx" data-group="fontawesome" data-tags="fa fa-modx"></span><span class="fa fa-money" data-group="fontawesome" data-tags="fa fa-money"></span><span class="fa fa-moon-o" data-group="fontawesome" data-tags="fa fa-moon-o"></span><span class="fa fa-motorcycle" data-group="fontawesome" data-tags="fa fa-motorcycle"></span><span class="fa fa-mouse-pointer" data-group="fontawesome" data-tags="fa fa-mouse-pointer"></span><span class="fa fa-music" data-group="fontawesome" data-tags="fa fa-music"></span><span class="fa fa-neuter" data-group="fontawesome" data-tags="fa fa-neuter"></span><span class="fa fa-newspaper-o" data-group="fontawesome" data-tags="fa fa-newspaper-o"></span><span class="fa fa-object-group" data-group="fontawesome" data-tags="fa fa-object-group"></span><span class="fa fa-object-ungroup" data-group="fontawesome" data-tags="fa fa-object-ungroup"></span><span class="fa fa-odnoklassniki" data-group="fontawesome" data-tags="fa fa-odnoklassniki"></span><span class="fa fa-odnoklassniki-square" data-group="fontawesome" data-tags="fa fa-odnoklassniki-square"></span><span class="fa fa-opencart" data-group="fontawesome" data-tags="fa fa-opencart"></span><span class="fa fa-openid" data-group="fontawesome" data-tags="fa fa-openid"></span><span class="fa fa-opera" data-group="fontawesome" data-tags="fa fa-opera"></span><span class="fa fa-optin-monster" data-group="fontawesome" data-tags="fa fa-optin-monster"></span><span class="fa fa-outdent" data-group="fontawesome" data-tags="fa fa-outdent"></span><span class="fa fa-pagelines" data-group="fontawesome" data-tags="fa fa-pagelines"></span><span class="fa fa-paint-brush" data-group="fontawesome" data-tags="fa fa-paint-brush"></span><span class="fa fa-paper-plane" data-group="fontawesome" data-tags="fa fa-paper-plane"></span><span class="fa fa-paper-plane-o" data-group="fontawesome" data-tags="fa fa-paper-plane-o"></span><span class="fa fa-paperclip" data-group="fontawesome" data-tags="fa fa-paperclip"></span><span class="fa fa-paragraph" data-group="fontawesome" data-tags="fa fa-paragraph"></span><span class="fa fa-pause" data-group="fontawesome" data-tags="fa fa-pause"></span><span class="fa fa-pause-circle" data-group="fontawesome" data-tags="fa fa-pause-circle"></span><span class="fa fa-pause-circle-o" data-group="fontawesome" data-tags="fa fa-pause-circle-o"></span><span class="fa fa-paw" data-group="fontawesome" data-tags="fa fa-paw"></span><span class="fa fa-paypal" data-group="fontawesome" data-tags="fa fa-paypal"></span><span class="fa fa-pencil" data-group="fontawesome" data-tags="fa fa-pencil"></span><span class="fa fa-pencil-square" data-group="fontawesome" data-tags="fa fa-pencil-square"></span><span class="fa fa-pencil-square-o" data-group="fontawesome" data-tags="fa fa-pencil-square-o"></span><span class="fa fa-percent" data-group="fontawesome" data-tags="fa fa-percent"></span><span class="fa fa-phone" data-group="fontawesome" data-tags="fa fa-phone"></span><span class="fa fa-phone-square" data-group="fontawesome" data-tags="fa fa-phone-square"></span><span class="fa fa-picture-o" data-group="fontawesome" data-tags="fa fa-picture-o"></span><span class="fa fa-pie-chart" data-group="fontawesome" data-tags="fa fa-pie-chart"></span><span class="fa fa-pied-piper" data-group="fontawesome" data-tags="fa fa-pied-piper"></span><span class="fa fa-pied-piper-alt" data-group="fontawesome" data-tags="fa fa-pied-piper-alt"></span><span class="fa fa-pied-piper-pp" data-group="fontawesome" data-tags="fa fa-pied-piper-pp"></span><span class="fa fa-pinterest" data-group="fontawesome" data-tags="fa fa-pinterest"></span><span class="fa fa-pinterest-p" data-group="fontawesome" data-tags="fa fa-pinterest-p"></span><span class="fa fa-pinterest-square" data-group="fontawesome" data-tags="fa fa-pinterest-square"></span><span class="fa fa-plane" data-group="fontawesome" data-tags="fa fa-plane"></span><span class="fa fa-play" data-group="fontawesome" data-tags="fa fa-play"></span><span class="fa fa-play-circle" data-group="fontawesome" data-tags="fa fa-play-circle"></span><span class="fa fa-play-circle-o" data-group="fontawesome" data-tags="fa fa-play-circle-o"></span><span class="fa fa-plug" data-group="fontawesome" data-tags="fa fa-plug"></span><span class="fa fa-plus" data-group="fontawesome" data-tags="fa fa-plus"></span><span class="fa fa-plus-circle" data-group="fontawesome" data-tags="fa fa-plus-circle"></span><span class="fa fa-plus-square" data-group="fontawesome" data-tags="fa fa-plus-square"></span><span class="fa fa-plus-square-o" data-group="fontawesome" data-tags="fa fa-plus-square-o"></span><span class="fa fa-podcast" data-group="fontawesome" data-tags="fa fa-podcast"></span><span class="fa fa-power-off" data-group="fontawesome" data-tags="fa fa-power-off"></span><span class="fa fa-print" data-group="fontawesome" data-tags="fa fa-print"></span><span class="fa fa-product-hunt" data-group="fontawesome" data-tags="fa fa-product-hunt"></span><span class="fa fa-puzzle-piece" data-group="fontawesome" data-tags="fa fa-puzzle-piece"></span><span class="fa fa-qq" data-group="fontawesome" data-tags="fa fa-qq"></span><span class="fa fa-qrcode" data-group="fontawesome" data-tags="fa fa-qrcode"></span><span class="fa fa-question" data-group="fontawesome" data-tags="fa fa-question"></span><span class="fa fa-question-circle" data-group="fontawesome" data-tags="fa fa-question-circle"></span><span class="fa fa-question-circle-o" data-group="fontawesome" data-tags="fa fa-question-circle-o"></span><span class="fa fa-quora" data-group="fontawesome" data-tags="fa fa-quora"></span><span class="fa fa-quote-left" data-group="fontawesome" data-tags="fa fa-quote-left"></span><span class="fa fa-quote-right" data-group="fontawesome" data-tags="fa fa-quote-right"></span><span class="fa fa-random" data-group="fontawesome" data-tags="fa fa-random"></span><span class="fa fa-ravelry" data-group="fontawesome" data-tags="fa fa-ravelry"></span><span class="fa fa-rebel" data-group="fontawesome" data-tags="fa fa-rebel"></span><span class="fa fa-recycle" data-group="fontawesome" data-tags="fa fa-recycle"></span><span class="fa fa-reddit" data-group="fontawesome" data-tags="fa fa-reddit"></span><span class="fa fa-reddit-alien" data-group="fontawesome" data-tags="fa fa-reddit-alien"></span><span class="fa fa-reddit-square" data-group="fontawesome" data-tags="fa fa-reddit-square"></span><span class="fa fa-refresh" data-group="fontawesome" data-tags="fa fa-refresh"></span><span class="fa fa-registered" data-group="fontawesome" data-tags="fa fa-registered"></span><span class="fa fa-renren" data-group="fontawesome" data-tags="fa fa-renren"></span><span class="fa fa-repeat" data-group="fontawesome" data-tags="fa fa-repeat"></span><span class="fa fa-reply" data-group="fontawesome" data-tags="fa fa-reply"></span><span class="fa fa-reply-all" data-group="fontawesome" data-tags="fa fa-reply-all"></span><span class="fa fa-retweet" data-group="fontawesome" data-tags="fa fa-retweet"></span><span class="fa fa-road" data-group="fontawesome" data-tags="fa fa-road"></span><span class="fa fa-rocket" data-group="fontawesome" data-tags="fa fa-rocket"></span><span class="fa fa-rss" data-group="fontawesome" data-tags="fa fa-rss"></span><span class="fa fa-rss-square" data-group="fontawesome" data-tags="fa fa-rss-square"></span><span class="fa fa-rub" data-group="fontawesome" data-tags="fa fa-rub"></span><span class="fa fa-safari" data-group="fontawesome" data-tags="fa fa-safari"></span><span class="fa fa-scissors" data-group="fontawesome" data-tags="fa fa-scissors"></span><span class="fa fa-scribd" data-group="fontawesome" data-tags="fa fa-scribd"></span><span class="fa fa-search" data-group="fontawesome" data-tags="fa fa-search"></span><span class="fa fa-search-minus" data-group="fontawesome" data-tags="fa fa-search-minus"></span><span class="fa fa-search-plus" data-group="fontawesome" data-tags="fa fa-search-plus"></span><span class="fa fa-sellsy" data-group="fontawesome" data-tags="fa fa-sellsy"></span><span class="fa fa-server" data-group="fontawesome" data-tags="fa fa-server"></span><span class="fa fa-share" data-group="fontawesome" data-tags="fa fa-share"></span><span class="fa fa-share-alt" data-group="fontawesome" data-tags="fa fa-share-alt"></span><span class="fa fa-share-alt-square" data-group="fontawesome" data-tags="fa fa-share-alt-square"></span><span class="fa fa-share-square" data-group="fontawesome" data-tags="fa fa-share-square"></span><span class="fa fa-share-square-o" data-group="fontawesome" data-tags="fa fa-share-square-o"></span><span class="fa fa-shield" data-group="fontawesome" data-tags="fa fa-shield"></span><span class="fa fa-ship" data-group="fontawesome" data-tags="fa fa-ship"></span><span class="fa fa-shirtsinbulk" data-group="fontawesome" data-tags="fa fa-shirtsinbulk"></span><span class="fa fa-shopping-bag" data-group="fontawesome" data-tags="fa fa-shopping-bag"></span><span class="fa fa-shopping-basket" data-group="fontawesome" data-tags="fa fa-shopping-basket"></span><span class="fa fa-shopping-cart" data-group="fontawesome" data-tags="fa fa-shopping-cart"></span><span class="fa fa-shower" data-group="fontawesome" data-tags="fa fa-shower"></span><span class="fa fa-sign-in" data-group="fontawesome" data-tags="fa fa-sign-in"></span><span class="fa fa-sign-language" data-group="fontawesome" data-tags="fa fa-sign-language"></span><span class="fa fa-sign-out" data-group="fontawesome" data-tags="fa fa-sign-out"></span><span class="fa fa-signal" data-group="fontawesome" data-tags="fa fa-signal"></span><span class="fa fa-simplybuilt" data-group="fontawesome" data-tags="fa fa-simplybuilt"></span><span class="fa fa-sitemap" data-group="fontawesome" data-tags="fa fa-sitemap"></span><span class="fa fa-skyatlas" data-group="fontawesome" data-tags="fa fa-skyatlas"></span><span class="fa fa-skype" data-group="fontawesome" data-tags="fa fa-skype"></span><span class="fa fa-slack" data-group="fontawesome" data-tags="fa fa-slack"></span><span class="fa fa-sliders" data-group="fontawesome" data-tags="fa fa-sliders"></span><span class="fa fa-slideshare" data-group="fontawesome" data-tags="fa fa-slideshare"></span><span class="fa fa-smile-o" data-group="fontawesome" data-tags="fa fa-smile-o"></span><span class="fa fa-snapchat" data-group="fontawesome" data-tags="fa fa-snapchat"></span><span class="fa fa-snapchat-ghost" data-group="fontawesome" data-tags="fa fa-snapchat-ghost"></span><span class="fa fa-snapchat-square" data-group="fontawesome" data-tags="fa fa-snapchat-square"></span><span class="fa fa-snowflake-o" data-group="fontawesome" data-tags="fa fa-snowflake-o"></span><span class="fa fa-sort" data-group="fontawesome" data-tags="fa fa-sort"></span><span class="fa fa-sort-alpha-asc" data-group="fontawesome" data-tags="fa fa-sort-alpha-asc"></span><span class="fa fa-sort-alpha-desc" data-group="fontawesome" data-tags="fa fa-sort-alpha-desc"></span><span class="fa fa-sort-amount-asc" data-group="fontawesome" data-tags="fa fa-sort-amount-asc"></span><span class="fa fa-sort-amount-desc" data-group="fontawesome" data-tags="fa fa-sort-amount-desc"></span><span class="fa fa-sort-asc" data-group="fontawesome" data-tags="fa fa-sort-asc"></span><span class="fa fa-sort-desc" data-group="fontawesome" data-tags="fa fa-sort-desc"></span><span class="fa fa-sort-numeric-asc" data-group="fontawesome" data-tags="fa fa-sort-numeric-asc"></span><span class="fa fa-sort-numeric-desc" data-group="fontawesome" data-tags="fa fa-sort-numeric-desc"></span><span class="fa fa-soundcloud" data-group="fontawesome" data-tags="fa fa-soundcloud"></span><span class="fa fa-space-shuttle" data-group="fontawesome" data-tags="fa fa-space-shuttle"></span><span class="fa fa-spinner" data-group="fontawesome" data-tags="fa fa-spinner"></span><span class="fa fa-spoon" data-group="fontawesome" data-tags="fa fa-spoon"></span><span class="fa fa-spotify" data-group="fontawesome" data-tags="fa fa-spotify"></span><span class="fa fa-square" data-group="fontawesome" data-tags="fa fa-square"></span><span class="fa fa-square-o" data-group="fontawesome" data-tags="fa fa-square-o"></span><span class="fa fa-stack-exchange" data-group="fontawesome" data-tags="fa fa-stack-exchange"></span><span class="fa fa-stack-overflow" data-group="fontawesome" data-tags="fa fa-stack-overflow"></span><span class="fa fa-star" data-group="fontawesome" data-tags="fa fa-star"></span><span class="fa fa-star-half" data-group="fontawesome" data-tags="fa fa-star-half"></span><span class="fa fa-star-half-o" data-group="fontawesome" data-tags="fa fa-star-half-o"></span><span class="fa fa-star-o" data-group="fontawesome" data-tags="fa fa-star-o"></span><span class="fa fa-steam" data-group="fontawesome" data-tags="fa fa-steam"></span><span class="fa fa-steam-square" data-group="fontawesome" data-tags="fa fa-steam-square"></span><span class="fa fa-step-backward" data-group="fontawesome" data-tags="fa fa-step-backward"></span><span class="fa fa-step-forward" data-group="fontawesome" data-tags="fa fa-step-forward"></span><span class="fa fa-stethoscope" data-group="fontawesome" data-tags="fa fa-stethoscope"></span><span class="fa fa-sticky-note" data-group="fontawesome" data-tags="fa fa-sticky-note"></span><span class="fa fa-sticky-note-o" data-group="fontawesome" data-tags="fa fa-sticky-note-o"></span><span class="fa fa-stop" data-group="fontawesome" data-tags="fa fa-stop"></span><span class="fa fa-stop-circle" data-group="fontawesome" data-tags="fa fa-stop-circle"></span><span class="fa fa-stop-circle-o" data-group="fontawesome" data-tags="fa fa-stop-circle-o"></span><span class="fa fa-street-view" data-group="fontawesome" data-tags="fa fa-street-view"></span><span class="fa fa-strikethrough" data-group="fontawesome" data-tags="fa fa-strikethrough"></span><span class="fa fa-stumbleupon" data-group="fontawesome" data-tags="fa fa-stumbleupon"></span><span class="fa fa-stumbleupon-circle" data-group="fontawesome" data-tags="fa fa-stumbleupon-circle"></span><span class="fa fa-subscript" data-group="fontawesome" data-tags="fa fa-subscript"></span><span class="fa fa-subway" data-group="fontawesome" data-tags="fa fa-subway"></span><span class="fa fa-suitcase" data-group="fontawesome" data-tags="fa fa-suitcase"></span><span class="fa fa-sun-o" data-group="fontawesome" data-tags="fa fa-sun-o"></span><span class="fa fa-superpowers" data-group="fontawesome" data-tags="fa fa-superpowers"></span><span class="fa fa-superscript" data-group="fontawesome" data-tags="fa fa-superscript"></span><span class="fa fa-table" data-group="fontawesome" data-tags="fa fa-table"></span><span class="fa fa-tablet" data-group="fontawesome" data-tags="fa fa-tablet"></span><span class="fa fa-tachometer" data-group="fontawesome" data-tags="fa fa-tachometer"></span><span class="fa fa-tag" data-group="fontawesome" data-tags="fa fa-tag"></span><span class="fa fa-tags" data-group="fontawesome" data-tags="fa fa-tags"></span><span class="fa fa-tasks" data-group="fontawesome" data-tags="fa fa-tasks"></span><span class="fa fa-taxi" data-group="fontawesome" data-tags="fa fa-taxi"></span><span class="fa fa-telegram" data-group="fontawesome" data-tags="fa fa-telegram"></span><span class="fa fa-television" data-group="fontawesome" data-tags="fa fa-television"></span><span class="fa fa-tencent-weibo" data-group="fontawesome" data-tags="fa fa-tencent-weibo"></span><span class="fa fa-terminal" data-group="fontawesome" data-tags="fa fa-terminal"></span><span class="fa fa-text-height" data-group="fontawesome" data-tags="fa fa-text-height"></span><span class="fa fa-text-width" data-group="fontawesome" data-tags="fa fa-text-width"></span><span class="fa fa-th" data-group="fontawesome" data-tags="fa fa-th"></span><span class="fa fa-th-large" data-group="fontawesome" data-tags="fa fa-th-large"></span><span class="fa fa-th-list" data-group="fontawesome" data-tags="fa fa-th-list"></span><span class="fa fa-themeisle" data-group="fontawesome" data-tags="fa fa-themeisle"></span><span class="fa fa-thermometer-empty" data-group="fontawesome" data-tags="fa fa-thermometer-empty"></span><span class="fa fa-thermometer-full" data-group="fontawesome" data-tags="fa fa-thermometer-full"></span><span class="fa fa-thermometer-half" data-group="fontawesome" data-tags="fa fa-thermometer-half"></span><span class="fa fa-thermometer-quarter" data-group="fontawesome" data-tags="fa fa-thermometer-quarter"></span><span class="fa fa-thermometer-three-quarters" data-group="fontawesome" data-tags="fa fa-thermometer-three-quarters"></span><span class="fa fa-thumb-tack" data-group="fontawesome" data-tags="fa fa-thumb-tack"></span><span class="fa fa-thumbs-down" data-group="fontawesome" data-tags="fa fa-thumbs-down"></span><span class="fa fa-thumbs-o-down" data-group="fontawesome" data-tags="fa fa-thumbs-o-down"></span><span class="fa fa-thumbs-o-up" data-group="fontawesome" data-tags="fa fa-thumbs-o-up"></span><span class="fa fa-thumbs-up" data-group="fontawesome" data-tags="fa fa-thumbs-up"></span><span class="fa fa-ticket" data-group="fontawesome" data-tags="fa fa-ticket"></span><span class="fa fa-times" data-group="fontawesome" data-tags="fa fa-times"></span><span class="fa fa-times-circle" data-group="fontawesome" data-tags="fa fa-times-circle"></span><span class="fa fa-times-circle-o" data-group="fontawesome" data-tags="fa fa-times-circle-o"></span><span class="fa fa-tint" data-group="fontawesome" data-tags="fa fa-tint"></span><span class="fa fa-toggle-off" data-group="fontawesome" data-tags="fa fa-toggle-off"></span><span class="fa fa-toggle-on" data-group="fontawesome" data-tags="fa fa-toggle-on"></span><span class="fa fa-trademark" data-group="fontawesome" data-tags="fa fa-trademark"></span><span class="fa fa-train" data-group="fontawesome" data-tags="fa fa-train"></span><span class="fa fa-transgender" data-group="fontawesome" data-tags="fa fa-transgender"></span><span class="fa fa-transgender-alt" data-group="fontawesome" data-tags="fa fa-transgender-alt"></span><span class="fa fa-trash" data-group="fontawesome" data-tags="fa fa-trash"></span><span class="fa fa-trash-o" data-group="fontawesome" data-tags="fa fa-trash-o"></span><span class="fa fa-tree" data-group="fontawesome" data-tags="fa fa-tree"></span><span class="fa fa-trello" data-group="fontawesome" data-tags="fa fa-trello"></span><span class="fa fa-tripadvisor" data-group="fontawesome" data-tags="fa fa-tripadvisor"></span><span class="fa fa-trophy" data-group="fontawesome" data-tags="fa fa-trophy"></span><span class="fa fa-truck" data-group="fontawesome" data-tags="fa fa-truck"></span><span class="fa fa-try" data-group="fontawesome" data-tags="fa fa-try"></span><span class="fa fa-tty" data-group="fontawesome" data-tags="fa fa-tty"></span><span class="fa fa-tumblr" data-group="fontawesome" data-tags="fa fa-tumblr"></span><span class="fa fa-tumblr-square" data-group="fontawesome" data-tags="fa fa-tumblr-square"></span><span class="fa fa-twitch" data-group="fontawesome" data-tags="fa fa-twitch"></span><span class="fa fa-twitter" data-group="fontawesome" data-tags="fa fa-twitter"></span><span class="fa fa-twitter-square" data-group="fontawesome" data-tags="fa fa-twitter-square"></span><span class="fa fa-umbrella" data-group="fontawesome" data-tags="fa fa-umbrella"></span><span class="fa fa-underline" data-group="fontawesome" data-tags="fa fa-underline"></span><span class="fa fa-undo" data-group="fontawesome" data-tags="fa fa-undo"></span><span class="fa fa-universal-access" data-group="fontawesome" data-tags="fa fa-universal-access"></span><span class="fa fa-university" data-group="fontawesome" data-tags="fa fa-university"></span><span class="fa fa-unlock" data-group="fontawesome" data-tags="fa fa-unlock"></span><span class="fa fa-unlock-alt" data-group="fontawesome" data-tags="fa fa-unlock-alt"></span><span class="fa fa-upload" data-group="fontawesome" data-tags="fa fa-upload"></span><span class="fa fa-usb" data-group="fontawesome" data-tags="fa fa-usb"></span><span class="fa fa-usd" data-group="fontawesome" data-tags="fa fa-usd"></span><span class="fa fa-user" data-group="fontawesome" data-tags="fa fa-user"></span><span class="fa fa-user-circle" data-group="fontawesome" data-tags="fa fa-user-circle"></span><span class="fa fa-user-circle-o" data-group="fontawesome" data-tags="fa fa-user-circle-o"></span><span class="fa fa-user-md" data-group="fontawesome" data-tags="fa fa-user-md"></span><span class="fa fa-user-o" data-group="fontawesome" data-tags="fa fa-user-o"></span><span class="fa fa-user-plus" data-group="fontawesome" data-tags="fa fa-user-plus"></span><span class="fa fa-user-secret" data-group="fontawesome" data-tags="fa fa-user-secret"></span><span class="fa fa-user-times" data-group="fontawesome" data-tags="fa fa-user-times"></span><span class="fa fa-users" data-group="fontawesome" data-tags="fa fa-users"></span><span class="fa fa-venus" data-group="fontawesome" data-tags="fa fa-venus"></span><span class="fa fa-venus-double" data-group="fontawesome" data-tags="fa fa-venus-double"></span><span class="fa fa-venus-mars" data-group="fontawesome" data-tags="fa fa-venus-mars"></span><span class="fa fa-viacoin" data-group="fontawesome" data-tags="fa fa-viacoin"></span><span class="fa fa-viadeo" data-group="fontawesome" data-tags="fa fa-viadeo"></span><span class="fa fa-viadeo-square" data-group="fontawesome" data-tags="fa fa-viadeo-square"></span><span class="fa fa-video-camera" data-group="fontawesome" data-tags="fa fa-video-camera"></span><span class="fa fa-vimeo" data-group="fontawesome" data-tags="fa fa-vimeo"></span><span class="fa fa-vimeo-square" data-group="fontawesome" data-tags="fa fa-vimeo-square"></span><span class="fa fa-vine" data-group="fontawesome" data-tags="fa fa-vine"></span><span class="fa fa-vk" data-group="fontawesome" data-tags="fa fa-vk"></span><span class="fa fa-volume-control-phone" data-group="fontawesome" data-tags="fa fa-volume-control-phone"></span><span class="fa fa-volume-down" data-group="fontawesome" data-tags="fa fa-volume-down"></span><span class="fa fa-volume-off" data-group="fontawesome" data-tags="fa fa-volume-off"></span><span class="fa fa-volume-up" data-group="fontawesome" data-tags="fa fa-volume-up"></span><span class="fa fa-weibo" data-group="fontawesome" data-tags="fa fa-weibo"></span><span class="fa fa-weixin" data-group="fontawesome" data-tags="fa fa-weixin"></span><span class="fa fa-whatsapp" data-group="fontawesome" data-tags="fa fa-whatsapp"></span><span class="fa fa-wheelchair" data-group="fontawesome" data-tags="fa fa-wheelchair"></span><span class="fa fa-wheelchair-alt" data-group="fontawesome" data-tags="fa fa-wheelchair-alt"></span><span class="fa fa-wifi" data-group="fontawesome" data-tags="fa fa-wifi"></span><span class="fa fa-wikipedia-w" data-group="fontawesome" data-tags="fa fa-wikipedia-w"></span><span class="fa fa-window-close" data-group="fontawesome" data-tags="fa fa-window-close"></span><span class="fa fa-window-close-o" data-group="fontawesome" data-tags="fa fa-window-close-o"></span><span class="fa fa-window-maximize" data-group="fontawesome" data-tags="fa fa-window-maximize"></span><span class="fa fa-window-minimize" data-group="fontawesome" data-tags="fa fa-window-minimize"></span><span class="fa fa-window-restore" data-group="fontawesome" data-tags="fa fa-window-restore"></span><span class="fa fa-windows" data-group="fontawesome" data-tags="fa fa-windows"></span><span class="fa fa-wordpress" data-group="fontawesome" data-tags="fa fa-wordpress"></span><span class="fa fa-wpbeginner" data-group="fontawesome" data-tags="fa fa-wpbeginner"></span><span class="fa fa-wpexplorer" data-group="fontawesome" data-tags="fa fa-wpexplorer"></span><span class="fa fa-wpforms" data-group="fontawesome" data-tags="fa fa-wpforms"></span><span class="fa fa-wrench" data-group="fontawesome" data-tags="fa fa-wrench"></span><span class="fa fa-xing" data-group="fontawesome" data-tags="fa fa-xing"></span><span class="fa fa-xing-square" data-group="fontawesome" data-tags="fa fa-xing-square"></span><span class="fa fa-y-combinator" data-group="fontawesome" data-tags="fa fa-y-combinator"></span><span class="fa fa-yahoo" data-group="fontawesome" data-tags="fa fa-yahoo"></span><span class="fa fa-yelp" data-group="fontawesome" data-tags="fa fa-yelp"></span><span class="fa fa-yoast" data-group="fontawesome" data-tags="fa fa-yoast"></span><span class="fa fa-youtube" data-group="fontawesome" data-tags="fa fa-youtube"></span><span class="fa fa-youtube-play" data-group="fontawesome" data-tags="fa fa-youtube-play"></span><span class="fa fa-youtube-square" data-group="fontawesome" data-tags="fa fa-youtube-square"></span> \
						<span class="dashicons dashicons-menu" data-group="dashicons" data-tags="dashicons dashicons-menu"></span> \
						<span class="dashicons dashicons-admin-site" data-group="dashicons" data-tags="dashicons dashicons-admin-site"></span> \
						<span class="dashicons dashicons-dashboard" data-group="dashicons" data-tags="dashicons dashicons-dashboard"></span> \
						<span class="dashicons dashicons-admin-post" data-group="dashicons" data-tags="dashicons dashicons-admin-post"></span> \
						<span class="dashicons dashicons-admin-media" data-group="dashicons" data-tags="dashicons dashicons-admin-media"></span> \
						<span class="dashicons dashicons-admin-links" data-group="dashicons" data-tags="dashicons dashicons-admin-links"></span> \
						<span class="dashicons dashicons-admin-page" data-group="dashicons" data-tags="dashicons dashicons-admin-page"></span> \
						<span class="dashicons dashicons-admin-comments" data-group="dashicons" data-tags="dashicons dashicons-admin-comments"></span> \
						<span class="dashicons dashicons-admin-appearance" data-group="dashicons" data-tags="dashicons dashicons-admin-appearance"></span> \
						<span class="dashicons dashicons-admin-plugins" data-group="dashicons" data-tags="dashicons dashicons-admin-plugins"></span> \
						<span class="dashicons dashicons-admin-users" data-group="dashicons" data-tags="dashicons dashicons-admin-users"></span> \
						<span class="dashicons dashicons-admin-tools" data-group="dashicons" data-tags="dashicons dashicons-admin-tools"></span> \
						<span class="dashicons dashicons-admin-settings" data-group="dashicons" data-tags="dashicons dashicons-admin-settings"></span> \
						<span class="dashicons dashicons-admin-network" data-group="dashicons" data-tags="dashicons dashicons-admin-network"></span> \
						<span class="dashicons dashicons-admin-home" data-group="dashicons" data-tags="dashicons dashicons-admin-home"></span> \
						<span class="dashicons dashicons-admin-generic" data-group="dashicons" data-tags="dashicons dashicons-admin-generic"></span> \
						<span class="dashicons dashicons-admin-collapse" data-group="dashicons" data-tags="dashicons dashicons-admin-collapse"></span> \
						<span class="dashicons dashicons-filter" data-group="dashicons" data-tags="dashicons dashicons-filter"></span> \
						<span class="dashicons dashicons-admin-customizer" data-group="dashicons" data-tags="dashicons dashicons-admin-customizer"></span> \
						<span class="dashicons dashicons-admin-multisite" data-group="dashicons" data-tags="dashicons dashicons-admin-multisite"></span> \
						<span class="dashicons dashicons-welcome-write-blog" data-group="dashicons" data-tags="dashicons dashicons-welcome-write-blog"></span> \
						<span class="dashicons dashicons-welcome-add-page" data-group="dashicons" data-tags="dashicons dashicons-welcome-add-page"></span> \
						<span class="dashicons dashicons-welcome-view-site" data-group="dashicons" data-tags="dashicons dashicons-welcome-view-site"></span> \
						<span class="dashicons dashicons-welcome-widgets-menus" data-group="dashicons" data-tags="dashicons dashicons-welcome-widgets-menus"></span> \
						<span class="dashicons dashicons-welcome-comments" data-group="dashicons" data-tags="dashicons dashicons-welcome-comments"></span> \
						<span class="dashicons dashicons-welcome-learn-more" data-group="dashicons" data-tags="dashicons dashicons-welcome-learn-more"></span> \
						<span class="dashicons dashicons-format-aside" data-group="dashicons" data-tags="dashicons dashicons-format-aside"></span> \
						<span class="dashicons dashicons-format-image" data-group="dashicons" data-tags="dashicons dashicons-format-image"></span> \
						<span class="dashicons dashicons-format-gallery" data-group="dashicons" data-tags="dashicons dashicons-format-gallery"></span> \
						<span class="dashicons dashicons-format-video" data-group="dashicons" data-tags="dashicons dashicons-format-video"></span> \
						<span class="dashicons dashicons-format-status" data-group="dashicons" data-tags="dashicons dashicons-format-status"></span> \
						<span class="dashicons dashicons-format-quote" data-group="dashicons" data-tags="dashicons dashicons-format-quote"></span> \
						<span class="dashicons dashicons-format-chat" data-group="dashicons" data-tags="dashicons dashicons-format-chat"></span> \
						<span class="dashicons dashicons-format-audio" data-group="dashicons" data-tags="dashicons dashicons-format-audio"></span> \
						<span class="dashicons dashicons-camera" data-group="dashicons" data-tags="dashicons dashicons-camera"></span> \
						<span class="dashicons dashicons-images-alt" data-group="dashicons" data-tags="dashicons dashicons-images-alt"></span> \
						<span class="dashicons dashicons-images-alt2" data-group="dashicons" data-tags="dashicons dashicons-images-alt2"></span> \
						<span class="dashicons dashicons-video-alt" data-group="dashicons" data-tags="dashicons dashicons-video-alt"></span> \
						<span class="dashicons dashicons-video-alt2" data-group="dashicons" data-tags="dashicons dashicons-video-alt2"></span> \
						<span class="dashicons dashicons-video-alt3" data-group="dashicons" data-tags="dashicons dashicons-video-alt3"></span> \
						<span class="dashicons dashicons-media-archive" data-group="dashicons" data-tags="dashicons dashicons-media-archive"></span> \
						<span class="dashicons dashicons-media-audio" data-group="dashicons" data-tags="dashicons dashicons-media-audio"></span> \
						<span class="dashicons dashicons-media-code" data-group="dashicons" data-tags="dashicons dashicons-media-code"></span> \
						<span class="dashicons dashicons-media-default" data-group="dashicons" data-tags="dashicons dashicons-media-default"></span> \
						<span class="dashicons dashicons-media-document" data-group="dashicons" data-tags="dashicons dashicons-media-document"></span> \
						<span class="dashicons dashicons-media-interactive" data-group="dashicons" data-tags="dashicons dashicons-media-interactive"></span> \
						<span class="dashicons dashicons-media-spreadsheet" data-group="dashicons" data-tags="dashicons dashicons-media-spreadsheet"></span> \
						<span class="dashicons dashicons-media-text" data-group="dashicons" data-tags="dashicons dashicons-media-text"></span> \
						<span class="dashicons dashicons-media-video" data-group="dashicons" data-tags="dashicons dashicons-media-video"></span> \
						<span class="dashicons dashicons-playlist-audio" data-group="dashicons" data-tags="dashicons dashicons-playlist-audio"></span> \
						<span class="dashicons dashicons-playlist-video" data-group="dashicons" data-tags="dashicons dashicons-playlist-video"></span> \
						<span class="dashicons dashicons-controls-play" data-group="dashicons" data-tags="dashicons dashicons-controls-play"></span> \
						<span class="dashicons dashicons-controls-pause" data-group="dashicons" data-tags="dashicons dashicons-controls-pause"></span> \
						<span class="dashicons dashicons-controls-forward" data-group="dashicons" data-tags="dashicons dashicons-controls-forward"></span> \
						<span class="dashicons dashicons-controls-skipforward" data-group="dashicons" data-tags="dashicons dashicons-controls-skipforward"></span> \
						<span class="dashicons dashicons-controls-back" data-group="dashicons" data-tags="dashicons dashicons-controls-back"></span> \
						<span class="dashicons dashicons-controls-skipback" data-group="dashicons" data-tags="dashicons dashicons-controls-skipback"></span> \
						<span class="dashicons dashicons-controls-repeat" data-group="dashicons" data-tags="dashicons dashicons-controls-repeat"></span> \
						<span class="dashicons dashicons-controls-volumeon" data-group="dashicons" data-tags="dashicons dashicons-controls-volumeon"></span> \
						<span class="dashicons dashicons-controls-volumeoff" data-group="dashicons" data-tags="dashicons dashicons-controls-volumeoff"></span> \
						<span class="dashicons dashicons-image-crop" data-group="dashicons" data-tags="dashicons dashicons-image-crop"></span> \
						<span class="dashicons dashicons-image-rotate" data-group="dashicons" data-tags="dashicons dashicons-image-rotate"></span> \
						<span class="dashicons dashicons-image-rotate-left" data-group="dashicons" data-tags="dashicons dashicons-image-rotate-left"></span> \
						<span class="dashicons dashicons-image-rotate-right" data-group="dashicons" data-tags="dashicons dashicons-image-rotate-right"></span> \
						<span class="dashicons dashicons-image-flip-vertical" data-group="dashicons" data-tags="dashicons dashicons-image-flip-vertical"></span> \
						<span class="dashicons dashicons-image-flip-horizontal" data-group="dashicons" data-tags="dashicons dashicons-image-flip-horizontal"></span> \
						<span class="dashicons dashicons-image-filter" data-group="dashicons" data-tags="dashicons dashicons-image-filter"></span> \
						<span class="dashicons dashicons-undo" data-group="dashicons" data-tags="dashicons dashicons-undo"></span> \
						<span class="dashicons dashicons-redo" data-group="dashicons" data-tags="dashicons dashicons-redo"></span> \
						<span class="dashicons dashicons-editor-bold" data-group="dashicons" data-tags="dashicons dashicons-editor-bold"></span> \
						<span class="dashicons dashicons-editor-italic" data-group="dashicons" data-tags="dashicons dashicons-editor-italic"></span> \
						<span class="dashicons dashicons-editor-ul" data-group="dashicons" data-tags="dashicons dashicons-editor-ul"></span> \
						<span class="dashicons dashicons-editor-ol" data-group="dashicons" data-tags="dashicons dashicons-editor-ol"></span> \
						<span class="dashicons dashicons-editor-quote" data-group="dashicons" data-tags="dashicons dashicons-editor-quote"></span> \
						<span class="dashicons dashicons-editor-alignleft" data-group="dashicons" data-tags="dashicons dashicons-editor-alignleft"></span> \
						<span class="dashicons dashicons-editor-aligncenter" data-group="dashicons" data-tags="dashicons dashicons-editor-aligncenter"></span> \
						<span class="dashicons dashicons-editor-alignright" data-group="dashicons" data-tags="dashicons dashicons-editor-alignright"></span> \
						<span class="dashicons dashicons-editor-insertmore" data-group="dashicons" data-tags="dashicons dashicons-editor-insertmore"></span> \
						<span class="dashicons dashicons-editor-spellcheck" data-group="dashicons" data-tags="dashicons dashicons-editor-spellcheck"></span> \
						<span class="dashicons dashicons-editor-expand" data-group="dashicons" data-tags="dashicons dashicons-editor-expand"></span> \
						<span class="dashicons dashicons-editor-contract" data-group="dashicons" data-tags="dashicons dashicons-editor-contract"></span> \
						<span class="dashicons dashicons-editor-kitchensink" data-group="dashicons" data-tags="dashicons dashicons-editor-kitchensink"></span> \
						<span class="dashicons dashicons-editor-underline" data-group="dashicons" data-tags="dashicons dashicons-editor-underline"></span> \
						<span class="dashicons dashicons-editor-justify" data-group="dashicons" data-tags="dashicons dashicons-editor-justify"></span> \
						<span class="dashicons dashicons-editor-textcolor" data-group="dashicons" data-tags="dashicons dashicons-editor-textcolor"></span> \
						<span class="dashicons dashicons-editor-paste-word" data-group="dashicons" data-tags="dashicons dashicons-editor-paste-word"></span> \
						<span class="dashicons dashicons-editor-paste-text" data-group="dashicons" data-tags="dashicons dashicons-editor-paste-text"></span> \
						<span class="dashicons dashicons-editor-removeformatting" data-group="dashicons" data-tags="dashicons dashicons-editor-removeformatting"></span> \
						<span class="dashicons dashicons-editor-video" data-group="dashicons" data-tags="dashicons dashicons-editor-video"></span> \
						<span class="dashicons dashicons-editor-customchar" data-group="dashicons" data-tags="dashicons dashicons-editor-customchar"></span> \
						<span class="dashicons dashicons-editor-outdent" data-group="dashicons" data-tags="dashicons dashicons-editor-outdent"></span> \
						<span class="dashicons dashicons-editor-indent" data-group="dashicons" data-tags="dashicons dashicons-editor-indent"></span> \
						<span class="dashicons dashicons-editor-help" data-group="dashicons" data-tags="dashicons dashicons-editor-help"></span> \
						<span class="dashicons dashicons-editor-strikethrough" data-group="dashicons" data-tags="dashicons dashicons-editor-strikethrough"></span> \
						<span class="dashicons dashicons-editor-unlink" data-group="dashicons" data-tags="dashicons dashicons-editor-unlink"></span> \
						<span class="dashicons dashicons-editor-rtl" data-group="dashicons" data-tags="dashicons dashicons-editor-rtl"></span> \
						<span class="dashicons dashicons-editor-break" data-group="dashicons" data-tags="dashicons dashicons-editor-break"></span> \
						<span class="dashicons dashicons-editor-code" data-group="dashicons" data-tags="dashicons dashicons-editor-code"></span> \
						<span class="dashicons dashicons-editor-paragraph" data-group="dashicons" data-tags="dashicons dashicons-editor-paragraph"></span> \
						<span class="dashicons dashicons-editor-table" data-group="dashicons" data-tags="dashicons dashicons-editor-table"></span> \
						<span class="dashicons dashicons-align-left" data-group="dashicons" data-tags="dashicons dashicons-align-left"></span> \
						<span class="dashicons dashicons-align-right" data-group="dashicons" data-tags="dashicons dashicons-align-right"></span> \
						<span class="dashicons dashicons-align-center" data-group="dashicons" data-tags="dashicons dashicons-align-center"></span> \
						<span class="dashicons dashicons-align-none" data-group="dashicons" data-tags="dashicons dashicons-align-none"></span> \
						<span class="dashicons dashicons-lock" data-group="dashicons" data-tags="dashicons dashicons-lock"></span> \
						<span class="dashicons dashicons-unlock" data-group="dashicons" data-tags="dashicons dashicons-unlock"></span> \
						<span class="dashicons dashicons-calendar" data-group="dashicons" data-tags="dashicons dashicons-calendar"></span> \
						<span class="dashicons dashicons-calendar-alt" data-group="dashicons" data-tags="dashicons dashicons-calendar-alt"></span> \
						<span class="dashicons dashicons-visibility" data-group="dashicons" data-tags="dashicons dashicons-visibility"></span> \
						<span class="dashicons dashicons-hidden" data-group="dashicons" data-tags="dashicons dashicons-hidden"></span> \
						<span class="dashicons dashicons-post-status" data-group="dashicons" data-tags="dashicons dashicons-post-status"></span> \
						<span class="dashicons dashicons-edit" data-group="dashicons" data-tags="dashicons dashicons-edit"></span> \
						<span class="dashicons dashicons-trash" data-group="dashicons" data-tags="dashicons dashicons-trash"></span> \
						<span class="dashicons dashicons-sticky" data-group="dashicons" data-tags="dashicons dashicons-sticky"></span> \
						<span class="dashicons dashicons-external" data-group="dashicons" data-tags="dashicons dashicons-external"></span> \
						<span class="dashicons dashicons-arrow-up" data-group="dashicons" data-tags="dashicons dashicons-arrow-up"></span> \
						<span class="dashicons dashicons-arrow-down" data-group="dashicons" data-tags="dashicons dashicons-arrow-down"></span> \
						<span class="dashicons dashicons-arrow-right" data-group="dashicons" data-tags="dashicons dashicons-arrow-right"></span> \
						<span class="dashicons dashicons-arrow-left" data-group="dashicons" data-tags="dashicons dashicons-arrow-left"></span> \
						<span class="dashicons dashicons-arrow-up-alt" data-group="dashicons" data-tags="dashicons dashicons-arrow-up-alt"></span> \
						<span class="dashicons dashicons-arrow-down-alt" data-group="dashicons" data-tags="dashicons dashicons-arrow-down-alt"></span> \
						<span class="dashicons dashicons-arrow-right-alt" data-group="dashicons" data-tags="dashicons dashicons-arrow-right-alt"></span> \
						<span class="dashicons dashicons-arrow-left-alt" data-group="dashicons" data-tags="dashicons dashicons-arrow-left-alt"></span> \
						<span class="dashicons dashicons-arrow-up-alt2" data-group="dashicons" data-tags="dashicons dashicons-arrow-up-alt2"></span> \
						<span class="dashicons dashicons-arrow-down-alt2" data-group="dashicons" data-tags="dashicons dashicons-arrow-down-alt2"></span> \
						<span class="dashicons dashicons-arrow-right-alt2" data-group="dashicons" data-tags="dashicons dashicons-arrow-right-alt2"></span> \
						<span class="dashicons dashicons-arrow-left-alt2" data-group="dashicons" data-tags="dashicons dashicons-arrow-left-alt2"></span> \
						<span class="dashicons dashicons-sort" data-group="dashicons" data-tags="dashicons dashicons-sort"></span> \
						<span class="dashicons dashicons-leftright" data-group="dashicons" data-tags="dashicons dashicons-leftright"></span> \
						<span class="dashicons dashicons-randomize" data-group="dashicons" data-tags="dashicons dashicons-randomize"></span> \
						<span class="dashicons dashicons-list-view" data-group="dashicons" data-tags="dashicons dashicons-list-view"></span> \
						<span class="dashicons dashicons-exerpt-view" data-group="dashicons" data-tags="dashicons dashicons-exerpt-view"></span> \
						<span class="dashicons dashicons-grid-view" data-group="dashicons" data-tags="dashicons dashicons-grid-view"></span> \
						<span class="dashicons dashicons-move" data-group="dashicons" data-tags="dashicons dashicons-move"></span> \
						<span class="dashicons dashicons-share" data-group="dashicons" data-tags="dashicons dashicons-share"></span> \
						<span class="dashicons dashicons-share-alt" data-group="dashicons" data-tags="dashicons dashicons-share-alt"></span> \
						<span class="dashicons dashicons-share-alt2" data-group="dashicons" data-tags="dashicons dashicons-share-alt2"></span> \
						<span class="dashicons dashicons-twitter" data-group="dashicons" data-tags="dashicons dashicons-twitter"></span> \
						<span class="dashicons dashicons-rss" data-group="dashicons" data-tags="dashicons dashicons-rss"></span> \
						<span class="dashicons dashicons-email" data-group="dashicons" data-tags="dashicons dashicons-email"></span> \
						<span class="dashicons dashicons-email-alt" data-group="dashicons" data-tags="dashicons dashicons-email-alt"></span> \
						<span class="dashicons dashicons-facebook" data-group="dashicons" data-tags="dashicons dashicons-facebook"></span> \
						<span class="dashicons dashicons-facebook-alt" data-group="dashicons" data-tags="dashicons dashicons-facebook-alt"></span> \
						<span class="dashicons dashicons-googleplus" data-group="dashicons" data-tags="dashicons dashicons-googleplus"></span> \
						<span class="dashicons dashicons-networking" data-group="dashicons" data-tags="dashicons dashicons-networking"></span> \
						<span class="dashicons dashicons-hammer" data-group="dashicons" data-tags="dashicons dashicons-hammer"></span> \
						<span class="dashicons dashicons-art" data-group="dashicons" data-tags="dashicons dashicons-art"></span> \
						<span class="dashicons dashicons-migrate" data-group="dashicons" data-tags="dashicons dashicons-migrate"></span> \
						<span class="dashicons dashicons-performance" data-group="dashicons" data-tags="dashicons dashicons-performance"></span> \
						<span class="dashicons dashicons-universal-access" data-group="dashicons" data-tags="dashicons dashicons-universal-access"></span> \
						<span class="dashicons dashicons-universal-access-alt" data-group="dashicons" data-tags="dashicons dashicons-universal-access-alt"></span> \
						<span class="dashicons dashicons-tickets" data-group="dashicons" data-tags="dashicons dashicons-tickets"></span> \
						<span class="dashicons dashicons-nametag" data-group="dashicons" data-tags="dashicons dashicons-nametag"></span> \
						<span class="dashicons dashicons-clipboard" data-group="dashicons" data-tags="dashicons dashicons-clipboard"></span> \
						<span class="dashicons dashicons-heart" data-group="dashicons" data-tags="dashicons dashicons-heart"></span> \
						<span class="dashicons dashicons-megaphone" data-group="dashicons" data-tags="dashicons dashicons-megaphone"></span> \
						<span class="dashicons dashicons-schedule" data-group="dashicons" data-tags="dashicons dashicons-schedule"></span> \
						<span class="dashicons dashicons-wordpress" data-group="dashicons" data-tags="dashicons dashicons-wordpress"></span> \
						<span class="dashicons dashicons-wordpress-alt" data-group="dashicons" data-tags="dashicons dashicons-wordpress-alt"></span> \
						<span class="dashicons dashicons-pressthis" data-group="dashicons" data-tags="dashicons dashicons-pressthis"></span> \
						<span class="dashicons dashicons-update" data-group="dashicons" data-tags="dashicons dashicons-update"></span> \
						<span class="dashicons dashicons-screenoptions" data-group="dashicons" data-tags="dashicons dashicons-screenoptions"></span> \
						<span class="dashicons dashicons-info" data-group="dashicons" data-tags="dashicons dashicons-info"></span> \
						<span class="dashicons dashicons-cart" data-group="dashicons" data-tags="dashicons dashicons-cart"></span> \
						<span class="dashicons dashicons-feedback" data-group="dashicons" data-tags="dashicons dashicons-feedback"></span> \
						<span class="dashicons dashicons-cloud" data-group="dashicons" data-tags="dashicons dashicons-cloud"></span> \
						<span class="dashicons dashicons-translation" data-group="dashicons" data-tags="dashicons dashicons-translation"></span> \
						<span class="dashicons dashicons-tag" data-group="dashicons" data-tags="dashicons dashicons-tag"></span> \
						<span class="dashicons dashicons-category" data-group="dashicons" data-tags="dashicons dashicons-category"></span> \
						<span class="dashicons dashicons-archive" data-group="dashicons" data-tags="dashicons dashicons-archive"></span> \
						<span class="dashicons dashicons-tagcloud" data-group="dashicons" data-tags="dashicons dashicons-tagcloud"></span> \
						<span class="dashicons dashicons-text" data-group="dashicons" data-tags="dashicons dashicons-text"></span> \
						<span class="dashicons dashicons-yes" data-group="dashicons" data-tags="dashicons dashicons-yes"></span> \
						<span class="dashicons dashicons-no" data-group="dashicons" data-tags="dashicons dashicons-no"></span> \
						<span class="dashicons dashicons-no-alt" data-group="dashicons" data-tags="dashicons dashicons-no-alt"></span> \
						<span class="dashicons dashicons-plus" data-group="dashicons" data-tags="dashicons dashicons-plus"></span> \
						<span class="dashicons dashicons-plus-alt" data-group="dashicons" data-tags="dashicons dashicons-plus-alt"></span> \
						<span class="dashicons dashicons-minus" data-group="dashicons" data-tags="dashicons dashicons-minus"></span> \
						<span class="dashicons dashicons-dismiss" data-group="dashicons" data-tags="dashicons dashicons-dismiss"></span> \
						<span class="dashicons dashicons-marker" data-group="dashicons" data-tags="dashicons dashicons-marker"></span> \
						<span class="dashicons dashicons-star-filled" data-group="dashicons" data-tags="dashicons dashicons-star-filled"></span> \
						<span class="dashicons dashicons-star-half" data-group="dashicons" data-tags="dashicons dashicons-star-half"></span> \
						<span class="dashicons dashicons-star-empty" data-group="dashicons" data-tags="dashicons dashicons-star-empty"></span> \
						<span class="dashicons dashicons-flag" data-group="dashicons" data-tags="dashicons dashicons-flag"></span> \
						<span class="dashicons dashicons-warning" data-group="dashicons" data-tags="dashicons dashicons-warning"></span> \
						<span class="dashicons dashicons-location" data-group="dashicons" data-tags="dashicons dashicons-location"></span> \
						<span class="dashicons dashicons-location-alt" data-group="dashicons" data-tags="dashicons dashicons-location-alt"></span> \
						<span class="dashicons dashicons-vault" data-group="dashicons" data-tags="dashicons dashicons-vault"></span> \
						<span class="dashicons dashicons-shield" data-group="dashicons" data-tags="dashicons dashicons-shield"></span> \
						<span class="dashicons dashicons-shield-alt" data-group="dashicons" data-tags="dashicons dashicons-shield-alt"></span> \
						<span class="dashicons dashicons-sos" data-group="dashicons" data-tags="dashicons dashicons-sos"></span> \
						<span class="dashicons dashicons-search" data-group="dashicons" data-tags="dashicons dashicons-search"></span> \
						<span class="dashicons dashicons-slides" data-group="dashicons" data-tags="dashicons dashicons-slides"></span> \
						<span class="dashicons dashicons-analytics" data-group="dashicons" data-tags="dashicons dashicons-analytics"></span> \
						<span class="dashicons dashicons-chart-pie" data-group="dashicons" data-tags="dashicons dashicons-chart-pie"></span> \
						<span class="dashicons dashicons-chart-bar" data-group="dashicons" data-tags="dashicons dashicons-chart-bar"></span> \
						<span class="dashicons dashicons-chart-line" data-group="dashicons" data-tags="dashicons dashicons-chart-line"></span> \
						<span class="dashicons dashicons-chart-area" data-group="dashicons" data-tags="dashicons dashicons-chart-area"></span> \
						<span class="dashicons dashicons-groups" data-group="dashicons" data-tags="dashicons dashicons-groups"></span> \
						<span class="dashicons dashicons-businessman" data-group="dashicons" data-tags="dashicons dashicons-businessman"></span> \
						<span class="dashicons dashicons-id" data-group="dashicons" data-tags="dashicons dashicons-id"></span> \
						<span class="dashicons dashicons-id-alt" data-group="dashicons" data-tags="dashicons dashicons-id-alt"></span> \
						<span class="dashicons dashicons-products" data-group="dashicons" data-tags="dashicons dashicons-products"></span> \
						<span class="dashicons dashicons-awards" data-group="dashicons" data-tags="dashicons dashicons-awards"></span> \
						<span class="dashicons dashicons-forms" data-group="dashicons" data-tags="dashicons dashicons-forms"></span> \
						<span class="dashicons dashicons-testimonial" data-group="dashicons" data-tags="dashicons dashicons-testimonial"></span> \
						<span class="dashicons dashicons-portfolio" data-group="dashicons" data-tags="dashicons dashicons-portfolio"></span> \
						<span class="dashicons dashicons-book" data-group="dashicons" data-tags="dashicons dashicons-book"></span> \
						<span class="dashicons dashicons-book-alt" data-group="dashicons" data-tags="dashicons dashicons-book-alt"></span> \
						<span class="dashicons dashicons-download" data-group="dashicons" data-tags="dashicons dashicons-download"></span> \
						<span class="dashicons dashicons-upload" data-group="dashicons" data-tags="dashicons dashicons-upload"></span> \
						<span class="dashicons dashicons-backup" data-group="dashicons" data-tags="dashicons dashicons-backup"></span> \
						<span class="dashicons dashicons-clock" data-group="dashicons" data-tags="dashicons dashicons-clock"></span> \
						<span class="dashicons dashicons-lightbulb" data-group="dashicons" data-tags="dashicons dashicons-lightbulb"></span> \
						<span class="dashicons dashicons-microphone" data-group="dashicons" data-tags="dashicons dashicons-microphone"></span> \
						<span class="dashicons dashicons-desktop" data-group="dashicons" data-tags="dashicons dashicons-desktop"></span> \
						<span class="dashicons dashicons-laptop" data-group="dashicons" data-tags="dashicons dashicons-laptop"></span> \
						<span class="dashicons dashicons-tablet" data-group="dashicons" data-tags="dashicons dashicons-tablet"></span> \
						<span class="dashicons dashicons-smartphone" data-group="dashicons" data-tags="dashicons dashicons-smartphone"></span> \
						<span class="dashicons dashicons-phone" data-group="dashicons" data-tags="dashicons dashicons-phone"></span> \
						<span class="dashicons dashicons-index-card" data-group="dashicons" data-tags="dashicons dashicons-index-card"></span> \
						<span class="dashicons dashicons-carrot" data-group="dashicons" data-tags="dashicons dashicons-carrot"></span> \
						<span class="dashicons dashicons-building" data-group="dashicons" data-tags="dashicons dashicons-building"></span> \
						<span class="dashicons dashicons-store" data-group="dashicons" data-tags="dashicons dashicons-store"></span> \
						<span class="dashicons dashicons-album" data-group="dashicons" data-tags="dashicons dashicons-album"></span> \
						<span class="dashicons dashicons-palmtree" data-group="dashicons" data-tags="dashicons dashicons-palmtree"></span> \
						<span class="dashicons dashicons-tickets-alt" data-group="dashicons" data-tags="dashicons dashicons-tickets-alt"></span> \
						<span class="dashicons dashicons-money" data-group="dashicons" data-tags="dashicons dashicons-money"></span> \
						<span class="dashicons dashicons-smiley" data-group="dashicons" data-tags="dashicons dashicons-smiley"></span> \
						<span class="dashicons dashicons-thumbs-up" data-group="dashicons" data-tags="dashicons dashicons-thumbs-up"></span> \
						<span class="dashicons dashicons-thumbs-down" data-group="dashicons" data-tags="dashicons dashicons-thumbs-down"></span> \
						<span class="dashicons dashicons-layout" data-group="dashicons" data-tags="dashicons dashicons-layout"></span> \
						<span class="dashicons dashicons-paperclip" data-group="dashicons" data-tags="dashicons dashicons-paperclip"></span> \
						<span class="ion-ionic" data-group="ion" data-tags="ion-ionic"></span> \
						<span class="ion-arrow-up-a" data-group="ion" data-tags="ion-arrow-up-a"></span> \
						<span class="ion-arrow-right-a" data-group="ion" data-tags="ion-arrow-right-a"></span> \
						<span class="ion-arrow-down-a" data-group="ion" data-tags="ion-arrow-down-a"></span> \
						<span class="ion-arrow-left-a" data-group="ion" data-tags="ion-arrow-left-a"></span> \
						<span class="ion-arrow-up-b" data-group="ion" data-tags="ion-arrow-up-b"></span> \
						<span class="ion-arrow-right-b" data-group="ion" data-tags="ion-arrow-right-b"></span> \
						<span class="ion-arrow-down-b" data-group="ion" data-tags="ion-arrow-down-b"></span> \
						<span class="ion-arrow-left-b" data-group="ion" data-tags="ion-arrow-left-b"></span> \
						<span class="ion-arrow-up-c" data-group="ion" data-tags="ion-arrow-up-c"></span> \
						<span class="ion-arrow-right-c" data-group="ion" data-tags="ion-arrow-right-c"></span> \
						<span class="ion-arrow-down-c" data-group="ion" data-tags="ion-arrow-down-c"></span> \
						<span class="ion-arrow-left-c" data-group="ion" data-tags="ion-arrow-left-c"></span> \
						<span class="ion-arrow-return-right" data-group="ion" data-tags="ion-arrow-return-right"></span> \
						<span class="ion-arrow-return-left" data-group="ion" data-tags="ion-arrow-return-left"></span> \
						<span class="ion-arrow-swap" data-group="ion" data-tags="ion-arrow-swap"></span> \
						<span class="ion-arrow-shrink" data-group="ion" data-tags="ion-arrow-shrink"></span> \
						<span class="ion-arrow-expand" data-group="ion" data-tags="ion-arrow-expand"></span> \
						<span class="ion-arrow-move" data-group="ion" data-tags="ion-arrow-move"></span> \
						<span class="ion-arrow-resize" data-group="ion" data-tags="ion-arrow-resize"></span> \
						<span class="ion-chevron-up" data-group="ion" data-tags="ion-chevron-up"></span> \
						<span class="ion-chevron-right" data-group="ion" data-tags="ion-chevron-right"></span> \
						<span class="ion-chevron-down" data-group="ion" data-tags="ion-chevron-down"></span> \
						<span class="ion-chevron-left" data-group="ion" data-tags="ion-chevron-left"></span> \
						<span class="ion-navicon-round" data-group="ion" data-tags="ion-navicon-round"></span> \
						<span class="ion-navicon" data-group="ion" data-tags="ion-navicon"></span> \
						<span class="ion-drag" data-group="ion" data-tags="ion-drag"></span> \
						<span class="ion-log-in" data-group="ion" data-tags="ion-log-in"></span> \
						<span class="ion-log-out" data-group="ion" data-tags="ion-log-out"></span> \
						<span class="ion-checkmark-round" data-group="ion" data-tags="ion-checkmark-round"></span> \
						<span class="ion-checkmark" data-group="ion" data-tags="ion-checkmark"></span> \
						<span class="ion-checkmark-circled" data-group="ion" data-tags="ion-checkmark-circled"></span> \
						<span class="ion-close-round" data-group="ion" data-tags="ion-close-round"></span> \
						<span class="ion-close" data-group="ion" data-tags="ion-close"></span> \
						<span class="ion-close-circled" data-group="ion" data-tags="ion-close-circled"></span> \
						<span class="ion-plus-round" data-group="ion" data-tags="ion-plus-round"></span> \
						<span class="ion-plus" data-group="ion" data-tags="ion-plus"></span> \
						<span class="ion-plus-circled" data-group="ion" data-tags="ion-plus-circled"></span> \
						<span class="ion-minus-round" data-group="ion" data-tags="ion-minus-round"></span> \
						<span class="ion-minus" data-group="ion" data-tags="ion-minus"></span> \
						<span class="ion-minus-circled" data-group="ion" data-tags="ion-minus-circled"></span> \
						<span class="ion-information" data-group="ion" data-tags="ion-information"></span> \
						<span class="ion-information-circled" data-group="ion" data-tags="ion-information-circled"></span> \
						<span class="ion-help" data-group="ion" data-tags="ion-help"></span> \
						<span class="ion-help-circled" data-group="ion" data-tags="ion-help-circled"></span> \
						<span class="ion-backspace-outline" data-group="ion" data-tags="ion-backspace-outline"></span> \
						<span class="ion-backspace" data-group="ion" data-tags="ion-backspace"></span> \
						<span class="ion-help-buoy" data-group="ion" data-tags="ion-help-buoy"></span> \
						<span class="ion-asterisk" data-group="ion" data-tags="ion-asterisk"></span> \
						<span class="ion-alert" data-group="ion" data-tags="ion-alert"></span> \
						<span class="ion-alert-circled" data-group="ion" data-tags="ion-alert-circled"></span> \
						<span class="ion-refresh" data-group="ion" data-tags="ion-refresh"></span> \
						<span class="ion-loop" data-group="ion" data-tags="ion-loop"></span> \
						<span class="ion-shuffle" data-group="ion" data-tags="ion-shuffle"></span> \
						<span class="ion-home" data-group="ion" data-tags="ion-home"></span> \
						<span class="ion-search" data-group="ion" data-tags="ion-search"></span> \
						<span class="ion-flag" data-group="ion" data-tags="ion-flag"></span> \
						<span class="ion-star" data-group="ion" data-tags="ion-star"></span> \
						<span class="ion-heart" data-group="ion" data-tags="ion-heart"></span> \
						<span class="ion-heart-broken" data-group="ion" data-tags="ion-heart-broken"></span> \
						<span class="ion-gear-a" data-group="ion" data-tags="ion-gear-a"></span> \
						<span class="ion-gear-b" data-group="ion" data-tags="ion-gear-b"></span> \
						<span class="ion-toggle-filled" data-group="ion" data-tags="ion-toggle-filled"></span> \
						<span class="ion-toggle" data-group="ion" data-tags="ion-toggle"></span> \
						<span class="ion-settings" data-group="ion" data-tags="ion-settings"></span> \
						<span class="ion-wrench" data-group="ion" data-tags="ion-wrench"></span> \
						<span class="ion-hammer" data-group="ion" data-tags="ion-hammer"></span> \
						<span class="ion-edit" data-group="ion" data-tags="ion-edit"></span> \
						<span class="ion-trash-a" data-group="ion" data-tags="ion-trash-a"></span> \
						<span class="ion-trash-b" data-group="ion" data-tags="ion-trash-b"></span> \
						<span class="ion-document" data-group="ion" data-tags="ion-document"></span> \
						<span class="ion-document-text" data-group="ion" data-tags="ion-document-text"></span> \
						<span class="ion-clipboard" data-group="ion" data-tags="ion-clipboard"></span> \
						<span class="ion-scissors" data-group="ion" data-tags="ion-scissors"></span> \
						<span class="ion-funnel" data-group="ion" data-tags="ion-funnel"></span> \
						<span class="ion-bookmark" data-group="ion" data-tags="ion-bookmark"></span> \
						<span class="ion-email" data-group="ion" data-tags="ion-email"></span> \
						<span class="ion-email-unread" data-group="ion" data-tags="ion-email-unread"></span> \
						<span class="ion-folder" data-group="ion" data-tags="ion-folder"></span> \
						<span class="ion-filing" data-group="ion" data-tags="ion-filing"></span> \
						<span class="ion-archive" data-group="ion" data-tags="ion-archive"></span> \
						<span class="ion-reply" data-group="ion" data-tags="ion-reply"></span> \
						<span class="ion-reply-all" data-group="ion" data-tags="ion-reply-all"></span> \
						<span class="ion-forward" data-group="ion" data-tags="ion-forward"></span> \
						<span class="ion-share" data-group="ion" data-tags="ion-share"></span> \
						<span class="ion-paper-airplane" data-group="ion" data-tags="ion-paper-airplane"></span> \
						<span class="ion-link" data-group="ion" data-tags="ion-link"></span> \
						<span class="ion-paperclip" data-group="ion" data-tags="ion-paperclip"></span> \
						<span class="ion-compose" data-group="ion" data-tags="ion-compose"></span> \
						<span class="ion-briefcase" data-group="ion" data-tags="ion-briefcase"></span> \
						<span class="ion-medkit" data-group="ion" data-tags="ion-medkit"></span> \
						<span class="ion-at" data-group="ion" data-tags="ion-at"></span> \
						<span class="ion-pound" data-group="ion" data-tags="ion-pound"></span> \
						<span class="ion-quote" data-group="ion" data-tags="ion-quote"></span> \
						<span class="ion-cloud" data-group="ion" data-tags="ion-cloud"></span> \
						<span class="ion-upload" data-group="ion" data-tags="ion-upload"></span> \
						<span class="ion-more" data-group="ion" data-tags="ion-more"></span> \
						<span class="ion-grid" data-group="ion" data-tags="ion-grid"></span> \
						<span class="ion-calendar" data-group="ion" data-tags="ion-calendar"></span> \
						<span class="ion-clock" data-group="ion" data-tags="ion-clock"></span> \
						<span class="ion-compass" data-group="ion" data-tags="ion-compass"></span> \
						<span class="ion-pinpoint" data-group="ion" data-tags="ion-pinpoint"></span> \
						<span class="ion-pin" data-group="ion" data-tags="ion-pin"></span> \
						<span class="ion-navigate" data-group="ion" data-tags="ion-navigate"></span> \
						<span class="ion-location" data-group="ion" data-tags="ion-location"></span> \
						<span class="ion-map" data-group="ion" data-tags="ion-map"></span> \
						<span class="ion-lock-combination" data-group="ion" data-tags="ion-lock-combination"></span> \
						<span class="ion-locked" data-group="ion" data-tags="ion-locked"></span> \
						<span class="ion-unlocked" data-group="ion" data-tags="ion-unlocked"></span> \
						<span class="ion-key" data-group="ion" data-tags="ion-key"></span> \
						<span class="ion-arrow-graph-up-right" data-group="ion" data-tags="ion-arrow-graph-up-right"></span> \
						<span class="ion-arrow-graph-down-right" data-group="ion" data-tags="ion-arrow-graph-down-right"></span> \
						<span class="ion-arrow-graph-up-left" data-group="ion" data-tags="ion-arrow-graph-up-left"></span> \
						<span class="ion-arrow-graph-down-left" data-group="ion" data-tags="ion-arrow-graph-down-left"></span> \
						<span class="ion-stats-bars" data-group="ion" data-tags="ion-stats-bars"></span> \
						<span class="ion-connection-bars" data-group="ion" data-tags="ion-connection-bars"></span> \
						<span class="ion-pie-graph" data-group="ion" data-tags="ion-pie-graph"></span> \
						<span class="ion-chatbubble" data-group="ion" data-tags="ion-chatbubble"></span> \
						<span class="ion-chatbubble-working" data-group="ion" data-tags="ion-chatbubble-working"></span> \
						<span class="ion-chatbubbles" data-group="ion" data-tags="ion-chatbubbles"></span> \
						<span class="ion-chatbox" data-group="ion" data-tags="ion-chatbox"></span> \
						<span class="ion-chatbox-working" data-group="ion" data-tags="ion-chatbox-working"></span> \
						<span class="ion-chatboxes" data-group="ion" data-tags="ion-chatboxes"></span> \
						<span class="ion-person" data-group="ion" data-tags="ion-person"></span> \
						<span class="ion-person-add" data-group="ion" data-tags="ion-person-add"></span> \
						<span class="ion-person-stalker" data-group="ion" data-tags="ion-person-stalker"></span> \
						<span class="ion-woman" data-group="ion" data-tags="ion-woman"></span> \
						<span class="ion-man" data-group="ion" data-tags="ion-man"></span> \
						<span class="ion-female" data-group="ion" data-tags="ion-female"></span> \
						<span class="ion-male" data-group="ion" data-tags="ion-male"></span> \
						<span class="ion-transgender" data-group="ion" data-tags="ion-transgender"></span> \
						<span class="ion-fork" data-group="ion" data-tags="ion-fork"></span> \
						<span class="ion-knife" data-group="ion" data-tags="ion-knife"></span> \
						<span class="ion-spoon" data-group="ion" data-tags="ion-spoon"></span> \
						<span class="ion-soup-can-outline" data-group="ion" data-tags="ion-soup-can-outline"></span> \
						<span class="ion-soup-can" data-group="ion" data-tags="ion-soup-can"></span> \
						<span class="ion-beer" data-group="ion" data-tags="ion-beer"></span> \
						<span class="ion-wineglass" data-group="ion" data-tags="ion-wineglass"></span> \
						<span class="ion-coffee" data-group="ion" data-tags="ion-coffee"></span> \
						<span class="ion-icecream" data-group="ion" data-tags="ion-icecream"></span> \
						<span class="ion-pizza" data-group="ion" data-tags="ion-pizza"></span> \
						<span class="ion-power" data-group="ion" data-tags="ion-power"></span> \
						<span class="ion-mouse" data-group="ion" data-tags="ion-mouse"></span> \
						<span class="ion-battery-full" data-group="ion" data-tags="ion-battery-full"></span> \
						<span class="ion-battery-half" data-group="ion" data-tags="ion-battery-half"></span> \
						<span class="ion-battery-low" data-group="ion" data-tags="ion-battery-low"></span> \
						<span class="ion-battery-empty" data-group="ion" data-tags="ion-battery-empty"></span> \
						<span class="ion-battery-charging" data-group="ion" data-tags="ion-battery-charging"></span> \
						<span class="ion-wifi" data-group="ion" data-tags="ion-wifi"></span> \
						<span class="ion-bluetooth" data-group="ion" data-tags="ion-bluetooth"></span> \
						<span class="ion-calculator" data-group="ion" data-tags="ion-calculator"></span> \
						<span class="ion-camera" data-group="ion" data-tags="ion-camera"></span> \
						<span class="ion-eye" data-group="ion" data-tags="ion-eye"></span> \
						<span class="ion-eye-disabled" data-group="ion" data-tags="ion-eye-disabled"></span> \
						<span class="ion-flash" data-group="ion" data-tags="ion-flash"></span> \
						<span class="ion-flash-off" data-group="ion" data-tags="ion-flash-off"></span> \
						<span class="ion-qr-scanner" data-group="ion" data-tags="ion-qr-scanner"></span> \
						<span class="ion-image" data-group="ion" data-tags="ion-image"></span> \
						<span class="ion-images" data-group="ion" data-tags="ion-images"></span> \
						<span class="ion-wand" data-group="ion" data-tags="ion-wand"></span> \
						<span class="ion-contrast" data-group="ion" data-tags="ion-contrast"></span> \
						<span class="ion-aperture" data-group="ion" data-tags="ion-aperture"></span> \
						<span class="ion-crop" data-group="ion" data-tags="ion-crop"></span> \
						<span class="ion-easel" data-group="ion" data-tags="ion-easel"></span> \
						<span class="ion-paintbrush" data-group="ion" data-tags="ion-paintbrush"></span> \
						<span class="ion-paintbucket" data-group="ion" data-tags="ion-paintbucket"></span> \
						<span class="ion-monitor" data-group="ion" data-tags="ion-monitor"></span> \
						<span class="ion-laptop" data-group="ion" data-tags="ion-laptop"></span> \
						<span class="ion-ipad" data-group="ion" data-tags="ion-ipad"></span> \
						<span class="ion-iphone" data-group="ion" data-tags="ion-iphone"></span> \
						<span class="ion-ipod" data-group="ion" data-tags="ion-ipod"></span> \
						<span class="ion-printer" data-group="ion" data-tags="ion-printer"></span> \
						<span class="ion-usb" data-group="ion" data-tags="ion-usb"></span> \
						<span class="ion-outlet" data-group="ion" data-tags="ion-outlet"></span> \
						<span class="ion-bug" data-group="ion" data-tags="ion-bug"></span> \
						<span class="ion-code" data-group="ion" data-tags="ion-code"></span> \
						<span class="ion-code-working" data-group="ion" data-tags="ion-code-working"></span> \
						<span class="ion-code-download" data-group="ion" data-tags="ion-code-download"></span> \
						<span class="ion-fork-repo" data-group="ion" data-tags="ion-fork-repo"></span> \
						<span class="ion-network" data-group="ion" data-tags="ion-network"></span> \
						<span class="ion-pull-request" data-group="ion" data-tags="ion-pull-request"></span> \
						<span class="ion-merge" data-group="ion" data-tags="ion-merge"></span> \
						<span class="ion-xbox" data-group="ion" data-tags="ion-xbox"></span> \
						<span class="ion-playstation" data-group="ion" data-tags="ion-playstation"></span> \
						<span class="ion-steam" data-group="ion" data-tags="ion-steam"></span> \
						<span class="ion-closed-captioning" data-group="ion" data-tags="ion-closed-captioning"></span> \
						<span class="ion-videocamera" data-group="ion" data-tags="ion-videocamera"></span> \
						<span class="ion-film-marker" data-group="ion" data-tags="ion-film-marker"></span> \
						<span class="ion-disc" data-group="ion" data-tags="ion-disc"></span> \
						<span class="ion-headphone" data-group="ion" data-tags="ion-headphone"></span> \
						<span class="ion-music-note" data-group="ion" data-tags="ion-music-note"></span> \
						<span class="ion-radio-waves" data-group="ion" data-tags="ion-radio-waves"></span> \
						<span class="ion-speakerphone" data-group="ion" data-tags="ion-speakerphone"></span> \
						<span class="ion-mic-a" data-group="ion" data-tags="ion-mic-a"></span> \
						<span class="ion-mic-b" data-group="ion" data-tags="ion-mic-b"></span> \
						<span class="ion-mic-c" data-group="ion" data-tags="ion-mic-c"></span> \
						<span class="ion-volume-high" data-group="ion" data-tags="ion-volume-high"></span> \
						<span class="ion-volume-medium" data-group="ion" data-tags="ion-volume-medium"></span> \
						<span class="ion-volume-low" data-group="ion" data-tags="ion-volume-low"></span> \
						<span class="ion-volume-mute" data-group="ion" data-tags="ion-volume-mute"></span> \
						<span class="ion-levels" data-group="ion" data-tags="ion-levels"></span> \
						<span class="ion-play" data-group="ion" data-tags="ion-play"></span> \
						<span class="ion-pause" data-group="ion" data-tags="ion-pause"></span> \
						<span class="ion-stop" data-group="ion" data-tags="ion-stop"></span> \
						<span class="ion-record" data-group="ion" data-tags="ion-record"></span> \
						<span class="ion-skip-forward" data-group="ion" data-tags="ion-skip-forward"></span> \
						<span class="ion-skip-backward" data-group="ion" data-tags="ion-skip-backward"></span> \
						<span class="ion-eject" data-group="ion" data-tags="ion-eject"></span> \
						<span class="ion-bag" data-group="ion" data-tags="ion-bag"></span> \
						<span class="ion-card" data-group="ion" data-tags="ion-card"></span> \
						<span class="ion-cash" data-group="ion" data-tags="ion-cash"></span> \
						<span class="ion-pricetag" data-group="ion" data-tags="ion-pricetag"></span> \
						<span class="ion-pricetags" data-group="ion" data-tags="ion-pricetags"></span> \
						<span class="ion-thumbsup" data-group="ion" data-tags="ion-thumbsup"></span> \
						<span class="ion-thumbsdown" data-group="ion" data-tags="ion-thumbsdown"></span> \
						<span class="ion-happy-outline" data-group="ion" data-tags="ion-happy-outline"></span> \
						<span class="ion-happy" data-group="ion" data-tags="ion-happy"></span> \
						<span class="ion-sad-outline" data-group="ion" data-tags="ion-sad-outline"></span> \
						<span class="ion-sad" data-group="ion" data-tags="ion-sad"></span> \
						<span class="ion-bowtie" data-group="ion" data-tags="ion-bowtie"></span> \
						<span class="ion-tshirt-outline" data-group="ion" data-tags="ion-tshirt-outline"></span> \
						<span class="ion-tshirt" data-group="ion" data-tags="ion-tshirt"></span> \
						<span class="ion-trophy" data-group="ion" data-tags="ion-trophy"></span> \
						<span class="ion-podium" data-group="ion" data-tags="ion-podium"></span> \
						<span class="ion-ribbon-a" data-group="ion" data-tags="ion-ribbon-a"></span> \
						<span class="ion-ribbon-b" data-group="ion" data-tags="ion-ribbon-b"></span> \
						<span class="ion-university" data-group="ion" data-tags="ion-university"></span> \
						<span class="ion-magnet" data-group="ion" data-tags="ion-magnet"></span> \
						<span class="ion-beaker" data-group="ion" data-tags="ion-beaker"></span> \
						<span class="ion-erlenmeyer-flask" data-group="ion" data-tags="ion-erlenmeyer-flask"></span> \
						<span class="ion-egg" data-group="ion" data-tags="ion-egg"></span> \
						<span class="ion-earth" data-group="ion" data-tags="ion-earth"></span> \
						<span class="ion-planet" data-group="ion" data-tags="ion-planet"></span> \
						<span class="ion-lightbulb" data-group="ion" data-tags="ion-lightbulb"></span> \
						<span class="ion-cube" data-group="ion" data-tags="ion-cube"></span> \
						<span class="ion-leaf" data-group="ion" data-tags="ion-leaf"></span> \
						<span class="ion-waterdrop" data-group="ion" data-tags="ion-waterdrop"></span> \
						<span class="ion-flame" data-group="ion" data-tags="ion-flame"></span> \
						<span class="ion-fireball" data-group="ion" data-tags="ion-fireball"></span> \
						<span class="ion-bonfire" data-group="ion" data-tags="ion-bonfire"></span> \
						<span class="ion-umbrella" data-group="ion" data-tags="ion-umbrella"></span> \
						<span class="ion-nuclear" data-group="ion" data-tags="ion-nuclear"></span> \
						<span class="ion-no-smoking" data-group="ion" data-tags="ion-no-smoking"></span> \
						<span class="ion-thermometer" data-group="ion" data-tags="ion-thermometer"></span> \
						<span class="ion-speedometer" data-group="ion" data-tags="ion-speedometer"></span> \
						<span class="ion-model-s" data-group="ion" data-tags="ion-model-s"></span> \
						<span class="ion-plane" data-group="ion" data-tags="ion-plane"></span> \
						<span class="ion-jet" data-group="ion" data-tags="ion-jet"></span> \
						<span class="ion-load-a" data-group="ion" data-tags="ion-load-a"></span> \
						<span class="ion-load-b" data-group="ion" data-tags="ion-load-b"></span> \
						<span class="ion-load-c" data-group="ion" data-tags="ion-load-c"></span> \
						<span class="ion-load-d" data-group="ion" data-tags="ion-load-d"></span> \
						<span class="ion-ios-ionic-outline" data-group="ion" data-tags="ion-ios-ionic-outline"></span> \
						<span class="ion-ios-arrow-back" data-group="ion" data-tags="ion-ios-arrow-back"></span> \
						<span class="ion-ios-arrow-forward" data-group="ion" data-tags="ion-ios-arrow-forward"></span> \
						<span class="ion-ios-arrow-up" data-group="ion" data-tags="ion-ios-arrow-up"></span> \
						<span class="ion-ios-arrow-right" data-group="ion" data-tags="ion-ios-arrow-right"></span> \
						<span class="ion-ios-arrow-down" data-group="ion" data-tags="ion-ios-arrow-down"></span> \
						<span class="ion-ios-arrow-left" data-group="ion" data-tags="ion-ios-arrow-left"></span> \
						<span class="ion-ios-arrow-thin-up" data-group="ion" data-tags="ion-ios-arrow-thin-up"></span> \
						<span class="ion-ios-arrow-thin-right" data-group="ion" data-tags="ion-ios-arrow-thin-right"></span> \
						<span class="ion-ios-arrow-thin-down" data-group="ion" data-tags="ion-ios-arrow-thin-down"></span> \
						<span class="ion-ios-arrow-thin-left" data-group="ion" data-tags="ion-ios-arrow-thin-left"></span> \
						<span class="ion-ios-circle-filled" data-group="ion" data-tags="ion-ios-circle-filled"></span> \
						<span class="ion-ios-circle-outline" data-group="ion" data-tags="ion-ios-circle-outline"></span> \
						<span class="ion-ios-checkmark-empty" data-group="ion" data-tags="ion-ios-checkmark-empty"></span> \
						<span class="ion-ios-checkmark-outline" data-group="ion" data-tags="ion-ios-checkmark-outline"></span> \
						<span class="ion-ios-checkmark" data-group="ion" data-tags="ion-ios-checkmark"></span> \
						<span class="ion-ios-plus-empty" data-group="ion" data-tags="ion-ios-plus-empty"></span> \
						<span class="ion-ios-plus-outline" data-group="ion" data-tags="ion-ios-plus-outline"></span> \
						<span class="ion-ios-plus" data-group="ion" data-tags="ion-ios-plus"></span> \
						<span class="ion-ios-close-empty" data-group="ion" data-tags="ion-ios-close-empty"></span> \
						<span class="ion-ios-close-outline" data-group="ion" data-tags="ion-ios-close-outline"></span> \
						<span class="ion-ios-close" data-group="ion" data-tags="ion-ios-close"></span> \
						<span class="ion-ios-minus-empty" data-group="ion" data-tags="ion-ios-minus-empty"></span> \
						<span class="ion-ios-minus-outline" data-group="ion" data-tags="ion-ios-minus-outline"></span> \
						<span class="ion-ios-minus" data-group="ion" data-tags="ion-ios-minus"></span> \
						<span class="ion-ios-information-empty" data-group="ion" data-tags="ion-ios-information-empty"></span> \
						<span class="ion-ios-information-outline" data-group="ion" data-tags="ion-ios-information-outline"></span> \
						<span class="ion-ios-information" data-group="ion" data-tags="ion-ios-information"></span> \
						<span class="ion-ios-help-empty" data-group="ion" data-tags="ion-ios-help-empty"></span> \
						<span class="ion-ios-help-outline" data-group="ion" data-tags="ion-ios-help-outline"></span> \
						<span class="ion-ios-help" data-group="ion" data-tags="ion-ios-help"></span> \
						<span class="ion-ios-search" data-group="ion" data-tags="ion-ios-search"></span> \
						<span class="ion-ios-search-strong" data-group="ion" data-tags="ion-ios-search-strong"></span> \
						<span class="ion-ios-star" data-group="ion" data-tags="ion-ios-star"></span> \
						<span class="ion-ios-star-half" data-group="ion" data-tags="ion-ios-star-half"></span> \
						<span class="ion-ios-star-outline" data-group="ion" data-tags="ion-ios-star-outline"></span> \
						<span class="ion-ios-heart" data-group="ion" data-tags="ion-ios-heart"></span> \
						<span class="ion-ios-heart-outline" data-group="ion" data-tags="ion-ios-heart-outline"></span> \
						<span class="ion-ios-more" data-group="ion" data-tags="ion-ios-more"></span> \
						<span class="ion-ios-more-outline" data-group="ion" data-tags="ion-ios-more-outline"></span> \
						<span class="ion-ios-home" data-group="ion" data-tags="ion-ios-home"></span> \
						<span class="ion-ios-home-outline" data-group="ion" data-tags="ion-ios-home-outline"></span> \
						<span class="ion-ios-cloud" data-group="ion" data-tags="ion-ios-cloud"></span> \
						<span class="ion-ios-cloud-outline" data-group="ion" data-tags="ion-ios-cloud-outline"></span> \
						<span class="ion-ios-cloud-upload" data-group="ion" data-tags="ion-ios-cloud-upload"></span> \
						<span class="ion-ios-cloud-upload-outline" data-group="ion" data-tags="ion-ios-cloud-upload-outline"></span> \
						<span class="ion-ios-cloud-download" data-group="ion" data-tags="ion-ios-cloud-download"></span> \
						<span class="ion-ios-cloud-download-outline" data-group="ion" data-tags="ion-ios-cloud-download-outline"></span> \
						<span class="ion-ios-upload" data-group="ion" data-tags="ion-ios-upload"></span> \
						<span class="ion-ios-upload-outline" data-group="ion" data-tags="ion-ios-upload-outline"></span> \
						<span class="ion-ios-download" data-group="ion" data-tags="ion-ios-download"></span> \
						<span class="ion-ios-download-outline" data-group="ion" data-tags="ion-ios-download-outline"></span> \
						<span class="ion-ios-refresh" data-group="ion" data-tags="ion-ios-refresh"></span> \
						<span class="ion-ios-refresh-outline" data-group="ion" data-tags="ion-ios-refresh-outline"></span> \
						<span class="ion-ios-refresh-empty" data-group="ion" data-tags="ion-ios-refresh-empty"></span> \
						<span class="ion-ios-reload" data-group="ion" data-tags="ion-ios-reload"></span> \
						<span class="ion-ios-loop-strong" data-group="ion" data-tags="ion-ios-loop-strong"></span> \
						<span class="ion-ios-loop" data-group="ion" data-tags="ion-ios-loop"></span> \
						<span class="ion-ios-bookmarks" data-group="ion" data-tags="ion-ios-bookmarks"></span> \
						<span class="ion-ios-bookmarks-outline" data-group="ion" data-tags="ion-ios-bookmarks-outline"></span> \
						<span class="ion-ios-book" data-group="ion" data-tags="ion-ios-book"></span> \
						<span class="ion-ios-book-outline" data-group="ion" data-tags="ion-ios-book-outline"></span> \
						<span class="ion-ios-flag" data-group="ion" data-tags="ion-ios-flag"></span> \
						<span class="ion-ios-flag-outline" data-group="ion" data-tags="ion-ios-flag-outline"></span> \
						<span class="ion-ios-glasses" data-group="ion" data-tags="ion-ios-glasses"></span> \
						<span class="ion-ios-glasses-outline" data-group="ion" data-tags="ion-ios-glasses-outline"></span> \
						<span class="ion-ios-browsers" data-group="ion" data-tags="ion-ios-browsers"></span> \
						<span class="ion-ios-browsers-outline" data-group="ion" data-tags="ion-ios-browsers-outline"></span> \
						<span class="ion-ios-at" data-group="ion" data-tags="ion-ios-at"></span> \
						<span class="ion-ios-at-outline" data-group="ion" data-tags="ion-ios-at-outline"></span> \
						<span class="ion-ios-pricetag" data-group="ion" data-tags="ion-ios-pricetag"></span> \
						<span class="ion-ios-pricetag-outline" data-group="ion" data-tags="ion-ios-pricetag-outline"></span> \
						<span class="ion-ios-pricetags" data-group="ion" data-tags="ion-ios-pricetags"></span> \
						<span class="ion-ios-pricetags-outline" data-group="ion" data-tags="ion-ios-pricetags-outline"></span> \
						<span class="ion-ios-cart" data-group="ion" data-tags="ion-ios-cart"></span> \
						<span class="ion-ios-cart-outline" data-group="ion" data-tags="ion-ios-cart-outline"></span> \
						<span class="ion-ios-chatboxes" data-group="ion" data-tags="ion-ios-chatboxes"></span> \
						<span class="ion-ios-chatboxes-outline" data-group="ion" data-tags="ion-ios-chatboxes-outline"></span> \
						<span class="ion-ios-chatbubble" data-group="ion" data-tags="ion-ios-chatbubble"></span> \
						<span class="ion-ios-chatbubble-outline" data-group="ion" data-tags="ion-ios-chatbubble-outline"></span> \
						<span class="ion-ios-cog" data-group="ion" data-tags="ion-ios-cog"></span> \
						<span class="ion-ios-cog-outline" data-group="ion" data-tags="ion-ios-cog-outline"></span> \
						<span class="ion-ios-gear" data-group="ion" data-tags="ion-ios-gear"></span> \
						<span class="ion-ios-gear-outline" data-group="ion" data-tags="ion-ios-gear-outline"></span> \
						<span class="ion-ios-settings" data-group="ion" data-tags="ion-ios-settings"></span> \
						<span class="ion-ios-settings-strong" data-group="ion" data-tags="ion-ios-settings-strong"></span> \
						<span class="ion-ios-toggle" data-group="ion" data-tags="ion-ios-toggle"></span> \
						<span class="ion-ios-toggle-outline" data-group="ion" data-tags="ion-ios-toggle-outline"></span> \
						<span class="ion-ios-analytics" data-group="ion" data-tags="ion-ios-analytics"></span> \
						<span class="ion-ios-analytics-outline" data-group="ion" data-tags="ion-ios-analytics-outline"></span> \
						<span class="ion-ios-pie" data-group="ion" data-tags="ion-ios-pie"></span> \
						<span class="ion-ios-pie-outline" data-group="ion" data-tags="ion-ios-pie-outline"></span> \
						<span class="ion-ios-pulse" data-group="ion" data-tags="ion-ios-pulse"></span> \
						<span class="ion-ios-pulse-strong" data-group="ion" data-tags="ion-ios-pulse-strong"></span> \
						<span class="ion-ios-filing" data-group="ion" data-tags="ion-ios-filing"></span> \
						<span class="ion-ios-filing-outline" data-group="ion" data-tags="ion-ios-filing-outline"></span> \
						<span class="ion-ios-box" data-group="ion" data-tags="ion-ios-box"></span> \
						<span class="ion-ios-box-outline" data-group="ion" data-tags="ion-ios-box-outline"></span> \
						<span class="ion-ios-compose" data-group="ion" data-tags="ion-ios-compose"></span> \
						<span class="ion-ios-compose-outline" data-group="ion" data-tags="ion-ios-compose-outline"></span> \
						<span class="ion-ios-trash" data-group="ion" data-tags="ion-ios-trash"></span> \
						<span class="ion-ios-trash-outline" data-group="ion" data-tags="ion-ios-trash-outline"></span> \
						<span class="ion-ios-copy" data-group="ion" data-tags="ion-ios-copy"></span> \
						<span class="ion-ios-copy-outline" data-group="ion" data-tags="ion-ios-copy-outline"></span> \
						<span class="ion-ios-email" data-group="ion" data-tags="ion-ios-email"></span> \
						<span class="ion-ios-email-outline" data-group="ion" data-tags="ion-ios-email-outline"></span> \
						<span class="ion-ios-undo" data-group="ion" data-tags="ion-ios-undo"></span> \
						<span class="ion-ios-undo-outline" data-group="ion" data-tags="ion-ios-undo-outline"></span> \
						<span class="ion-ios-redo" data-group="ion" data-tags="ion-ios-redo"></span> \
						<span class="ion-ios-redo-outline" data-group="ion" data-tags="ion-ios-redo-outline"></span> \
						<span class="ion-ios-paperplane" data-group="ion" data-tags="ion-ios-paperplane"></span> \
						<span class="ion-ios-paperplane-outline" data-group="ion" data-tags="ion-ios-paperplane-outline"></span> \
						<span class="ion-ios-folder" data-group="ion" data-tags="ion-ios-folder"></span> \
						<span class="ion-ios-folder-outline" data-group="ion" data-tags="ion-ios-folder-outline"></span> \
						<span class="ion-ios-paper" data-group="ion" data-tags="ion-ios-paper"></span> \
						<span class="ion-ios-paper-outline" data-group="ion" data-tags="ion-ios-paper-outline"></span> \
						<span class="ion-ios-list" data-group="ion" data-tags="ion-ios-list"></span> \
						<span class="ion-ios-list-outline" data-group="ion" data-tags="ion-ios-list-outline"></span> \
						<span class="ion-ios-world" data-group="ion" data-tags="ion-ios-world"></span> \
						<span class="ion-ios-world-outline" data-group="ion" data-tags="ion-ios-world-outline"></span> \
						<span class="ion-ios-alarm" data-group="ion" data-tags="ion-ios-alarm"></span> \
						<span class="ion-ios-alarm-outline" data-group="ion" data-tags="ion-ios-alarm-outline"></span> \
						<span class="ion-ios-speedometer" data-group="ion" data-tags="ion-ios-speedometer"></span> \
						<span class="ion-ios-speedometer-outline" data-group="ion" data-tags="ion-ios-speedometer-outline"></span> \
						<span class="ion-ios-stopwatch" data-group="ion" data-tags="ion-ios-stopwatch"></span> \
						<span class="ion-ios-stopwatch-outline" data-group="ion" data-tags="ion-ios-stopwatch-outline"></span> \
						<span class="ion-ios-timer" data-group="ion" data-tags="ion-ios-timer"></span> \
						<span class="ion-ios-timer-outline" data-group="ion" data-tags="ion-ios-timer-outline"></span> \
						<span class="ion-ios-clock" data-group="ion" data-tags="ion-ios-clock"></span> \
						<span class="ion-ios-clock-outline" data-group="ion" data-tags="ion-ios-clock-outline"></span> \
						<span class="ion-ios-time" data-group="ion" data-tags="ion-ios-time"></span> \
						<span class="ion-ios-time-outline" data-group="ion" data-tags="ion-ios-time-outline"></span> \
						<span class="ion-ios-calendar" data-group="ion" data-tags="ion-ios-calendar"></span> \
						<span class="ion-ios-calendar-outline" data-group="ion" data-tags="ion-ios-calendar-outline"></span> \
						<span class="ion-ios-photos" data-group="ion" data-tags="ion-ios-photos"></span> \
						<span class="ion-ios-photos-outline" data-group="ion" data-tags="ion-ios-photos-outline"></span> \
						<span class="ion-ios-albums" data-group="ion" data-tags="ion-ios-albums"></span> \
						<span class="ion-ios-albums-outline" data-group="ion" data-tags="ion-ios-albums-outline"></span> \
						<span class="ion-ios-camera" data-group="ion" data-tags="ion-ios-camera"></span> \
						<span class="ion-ios-camera-outline" data-group="ion" data-tags="ion-ios-camera-outline"></span> \
						<span class="ion-ios-reverse-camera" data-group="ion" data-tags="ion-ios-reverse-camera"></span> \
						<span class="ion-ios-reverse-camera-outline" data-group="ion" data-tags="ion-ios-reverse-camera-outline"></span> \
						<span class="ion-ios-eye" data-group="ion" data-tags="ion-ios-eye"></span> \
						<span class="ion-ios-eye-outline" data-group="ion" data-tags="ion-ios-eye-outline"></span> \
						<span class="ion-ios-bolt" data-group="ion" data-tags="ion-ios-bolt"></span> \
						<span class="ion-ios-bolt-outline" data-group="ion" data-tags="ion-ios-bolt-outline"></span> \
						<span class="ion-ios-color-wand" data-group="ion" data-tags="ion-ios-color-wand"></span> \
						<span class="ion-ios-color-wand-outline" data-group="ion" data-tags="ion-ios-color-wand-outline"></span> \
						<span class="ion-ios-color-filter" data-group="ion" data-tags="ion-ios-color-filter"></span> \
						<span class="ion-ios-color-filter-outline" data-group="ion" data-tags="ion-ios-color-filter-outline"></span> \
						<span class="ion-ios-grid-view" data-group="ion" data-tags="ion-ios-grid-view"></span> \
						<span class="ion-ios-grid-view-outline" data-group="ion" data-tags="ion-ios-grid-view-outline"></span> \
						<span class="ion-ios-crop-strong" data-group="ion" data-tags="ion-ios-crop-strong"></span> \
						<span class="ion-ios-crop" data-group="ion" data-tags="ion-ios-crop"></span> \
						<span class="ion-ios-barcode" data-group="ion" data-tags="ion-ios-barcode"></span> \
						<span class="ion-ios-barcode-outline" data-group="ion" data-tags="ion-ios-barcode-outline"></span> \
						<span class="ion-ios-briefcase" data-group="ion" data-tags="ion-ios-briefcase"></span> \
						<span class="ion-ios-briefcase-outline" data-group="ion" data-tags="ion-ios-briefcase-outline"></span> \
						<span class="ion-ios-medkit" data-group="ion" data-tags="ion-ios-medkit"></span> \
						<span class="ion-ios-medkit-outline" data-group="ion" data-tags="ion-ios-medkit-outline"></span> \
						<span class="ion-ios-medical" data-group="ion" data-tags="ion-ios-medical"></span> \
						<span class="ion-ios-medical-outline" data-group="ion" data-tags="ion-ios-medical-outline"></span> \
						<span class="ion-ios-infinite" data-group="ion" data-tags="ion-ios-infinite"></span> \
						<span class="ion-ios-infinite-outline" data-group="ion" data-tags="ion-ios-infinite-outline"></span> \
						<span class="ion-ios-calculator" data-group="ion" data-tags="ion-ios-calculator"></span> \
						<span class="ion-ios-calculator-outline" data-group="ion" data-tags="ion-ios-calculator-outline"></span> \
						<span class="ion-ios-keypad" data-group="ion" data-tags="ion-ios-keypad"></span> \
						<span class="ion-ios-keypad-outline" data-group="ion" data-tags="ion-ios-keypad-outline"></span> \
						<span class="ion-ios-telephone" data-group="ion" data-tags="ion-ios-telephone"></span> \
						<span class="ion-ios-telephone-outline" data-group="ion" data-tags="ion-ios-telephone-outline"></span> \
						<span class="ion-ios-drag" data-group="ion" data-tags="ion-ios-drag"></span> \
						<span class="ion-ios-location" data-group="ion" data-tags="ion-ios-location"></span> \
						<span class="ion-ios-location-outline" data-group="ion" data-tags="ion-ios-location-outline"></span> \
						<span class="ion-ios-navigate" data-group="ion" data-tags="ion-ios-navigate"></span> \
						<span class="ion-ios-navigate-outline" data-group="ion" data-tags="ion-ios-navigate-outline"></span> \
						<span class="ion-ios-locked" data-group="ion" data-tags="ion-ios-locked"></span> \
						<span class="ion-ios-locked-outline" data-group="ion" data-tags="ion-ios-locked-outline"></span> \
						<span class="ion-ios-unlocked" data-group="ion" data-tags="ion-ios-unlocked"></span> \
						<span class="ion-ios-unlocked-outline" data-group="ion" data-tags="ion-ios-unlocked-outline"></span> \
						<span class="ion-ios-monitor" data-group="ion" data-tags="ion-ios-monitor"></span> \
						<span class="ion-ios-monitor-outline" data-group="ion" data-tags="ion-ios-monitor-outline"></span> \
						<span class="ion-ios-printer" data-group="ion" data-tags="ion-ios-printer"></span> \
						<span class="ion-ios-printer-outline" data-group="ion" data-tags="ion-ios-printer-outline"></span> \
						<span class="ion-ios-game-controller-a" data-group="ion" data-tags="ion-ios-game-controller-a"></span> \
						<span class="ion-ios-game-controller-a-outline" data-group="ion" data-tags="ion-ios-game-controller-a-outline"></span> \
						<span class="ion-ios-game-controller-b" data-group="ion" data-tags="ion-ios-game-controller-b"></span> \
						<span class="ion-ios-game-controller-b-outline" data-group="ion" data-tags="ion-ios-game-controller-b-outline"></span> \
						<span class="ion-ios-americanfootball" data-group="ion" data-tags="ion-ios-americanfootball"></span> \
						<span class="ion-ios-americanfootball-outline" data-group="ion" data-tags="ion-ios-americanfootball-outline"></span> \
						<span class="ion-ios-baseball" data-group="ion" data-tags="ion-ios-baseball"></span> \
						<span class="ion-ios-baseball-outline" data-group="ion" data-tags="ion-ios-baseball-outline"></span> \
						<span class="ion-ios-basketball" data-group="ion" data-tags="ion-ios-basketball"></span> \
						<span class="ion-ios-basketball-outline" data-group="ion" data-tags="ion-ios-basketball-outline"></span> \
						<span class="ion-ios-tennisball" data-group="ion" data-tags="ion-ios-tennisball"></span> \
						<span class="ion-ios-tennisball-outline" data-group="ion" data-tags="ion-ios-tennisball-outline"></span> \
						<span class="ion-ios-football" data-group="ion" data-tags="ion-ios-football"></span> \
						<span class="ion-ios-football-outline" data-group="ion" data-tags="ion-ios-football-outline"></span> \
						<span class="ion-ios-body" data-group="ion" data-tags="ion-ios-body"></span> \
						<span class="ion-ios-body-outline" data-group="ion" data-tags="ion-ios-body-outline"></span> \
						<span class="ion-ios-person" data-group="ion" data-tags="ion-ios-person"></span> \
						<span class="ion-ios-person-outline" data-group="ion" data-tags="ion-ios-person-outline"></span> \
						<span class="ion-ios-personadd" data-group="ion" data-tags="ion-ios-personadd"></span> \
						<span class="ion-ios-personadd-outline" data-group="ion" data-tags="ion-ios-personadd-outline"></span> \
						<span class="ion-ios-people" data-group="ion" data-tags="ion-ios-people"></span> \
						<span class="ion-ios-people-outline" data-group="ion" data-tags="ion-ios-people-outline"></span> \
						<span class="ion-ios-musical-notes" data-group="ion" data-tags="ion-ios-musical-notes"></span> \
						<span class="ion-ios-musical-note" data-group="ion" data-tags="ion-ios-musical-note"></span> \
						<span class="ion-ios-bell" data-group="ion" data-tags="ion-ios-bell"></span> \
						<span class="ion-ios-bell-outline" data-group="ion" data-tags="ion-ios-bell-outline"></span> \
						<span class="ion-ios-mic" data-group="ion" data-tags="ion-ios-mic"></span> \
						<span class="ion-ios-mic-outline" data-group="ion" data-tags="ion-ios-mic-outline"></span> \
						<span class="ion-ios-mic-off" data-group="ion" data-tags="ion-ios-mic-off"></span> \
						<span class="ion-ios-volume-high" data-group="ion" data-tags="ion-ios-volume-high"></span> \
						<span class="ion-ios-volume-low" data-group="ion" data-tags="ion-ios-volume-low"></span> \
						<span class="ion-ios-play" data-group="ion" data-tags="ion-ios-play"></span> \
						<span class="ion-ios-play-outline" data-group="ion" data-tags="ion-ios-play-outline"></span> \
						<span class="ion-ios-pause" data-group="ion" data-tags="ion-ios-pause"></span> \
						<span class="ion-ios-pause-outline" data-group="ion" data-tags="ion-ios-pause-outline"></span> \
						<span class="ion-ios-recording" data-group="ion" data-tags="ion-ios-recording"></span> \
						<span class="ion-ios-recording-outline" data-group="ion" data-tags="ion-ios-recording-outline"></span> \
						<span class="ion-ios-fastforward" data-group="ion" data-tags="ion-ios-fastforward"></span> \
						<span class="ion-ios-fastforward-outline" data-group="ion" data-tags="ion-ios-fastforward-outline"></span> \
						<span class="ion-ios-rewind" data-group="ion" data-tags="ion-ios-rewind"></span> \
						<span class="ion-ios-rewind-outline" data-group="ion" data-tags="ion-ios-rewind-outline"></span> \
						<span class="ion-ios-skipbackward" data-group="ion" data-tags="ion-ios-skipbackward"></span> \
						<span class="ion-ios-skipbackward-outline" data-group="ion" data-tags="ion-ios-skipbackward-outline"></span> \
						<span class="ion-ios-skipforward" data-group="ion" data-tags="ion-ios-skipforward"></span> \
						<span class="ion-ios-skipforward-outline" data-group="ion" data-tags="ion-ios-skipforward-outline"></span> \
						<span class="ion-ios-shuffle-strong" data-group="ion" data-tags="ion-ios-shuffle-strong"></span> \
						<span class="ion-ios-shuffle" data-group="ion" data-tags="ion-ios-shuffle"></span> \
						<span class="ion-ios-videocam" data-group="ion" data-tags="ion-ios-videocam"></span> \
						<span class="ion-ios-videocam-outline" data-group="ion" data-tags="ion-ios-videocam-outline"></span> \
						<span class="ion-ios-film" data-group="ion" data-tags="ion-ios-film"></span> \
						<span class="ion-ios-film-outline" data-group="ion" data-tags="ion-ios-film-outline"></span> \
						<span class="ion-ios-flask" data-group="ion" data-tags="ion-ios-flask"></span> \
						<span class="ion-ios-flask-outline" data-group="ion" data-tags="ion-ios-flask-outline"></span> \
						<span class="ion-ios-lightbulb" data-group="ion" data-tags="ion-ios-lightbulb"></span> \
						<span class="ion-ios-lightbulb-outline" data-group="ion" data-tags="ion-ios-lightbulb-outline"></span> \
						<span class="ion-ios-wineglass" data-group="ion" data-tags="ion-ios-wineglass"></span> \
						<span class="ion-ios-wineglass-outline" data-group="ion" data-tags="ion-ios-wineglass-outline"></span> \
						<span class="ion-ios-pint" data-group="ion" data-tags="ion-ios-pint"></span> \
						<span class="ion-ios-pint-outline" data-group="ion" data-tags="ion-ios-pint-outline"></span> \
						<span class="ion-ios-nutrition" data-group="ion" data-tags="ion-ios-nutrition"></span> \
						<span class="ion-ios-nutrition-outline" data-group="ion" data-tags="ion-ios-nutrition-outline"></span> \
						<span class="ion-ios-flower" data-group="ion" data-tags="ion-ios-flower"></span> \
						<span class="ion-ios-flower-outline" data-group="ion" data-tags="ion-ios-flower-outline"></span> \
						<span class="ion-ios-rose" data-group="ion" data-tags="ion-ios-rose"></span> \
						<span class="ion-ios-rose-outline" data-group="ion" data-tags="ion-ios-rose-outline"></span> \
						<span class="ion-ios-paw" data-group="ion" data-tags="ion-ios-paw"></span> \
						<span class="ion-ios-paw-outline" data-group="ion" data-tags="ion-ios-paw-outline"></span> \
						<span class="ion-ios-flame" data-group="ion" data-tags="ion-ios-flame"></span> \
						<span class="ion-ios-flame-outline" data-group="ion" data-tags="ion-ios-flame-outline"></span> \
						<span class="ion-ios-sunny" data-group="ion" data-tags="ion-ios-sunny"></span> \
						<span class="ion-ios-sunny-outline" data-group="ion" data-tags="ion-ios-sunny-outline"></span> \
						<span class="ion-ios-partlysunny" data-group="ion" data-tags="ion-ios-partlysunny"></span> \
						<span class="ion-ios-partlysunny-outline" data-group="ion" data-tags="ion-ios-partlysunny-outline"></span> \
						<span class="ion-ios-cloudy" data-group="ion" data-tags="ion-ios-cloudy"></span> \
						<span class="ion-ios-cloudy-outline" data-group="ion" data-tags="ion-ios-cloudy-outline"></span> \
						<span class="ion-ios-rainy" data-group="ion" data-tags="ion-ios-rainy"></span> \
						<span class="ion-ios-rainy-outline" data-group="ion" data-tags="ion-ios-rainy-outline"></span> \
						<span class="ion-ios-thunderstorm" data-group="ion" data-tags="ion-ios-thunderstorm"></span> \
						<span class="ion-ios-thunderstorm-outline" data-group="ion" data-tags="ion-ios-thunderstorm-outline"></span> \
						<span class="ion-ios-snowy" data-group="ion" data-tags="ion-ios-snowy"></span> \
						<span class="ion-ios-moon" data-group="ion" data-tags="ion-ios-moon"></span> \
						<span class="ion-ios-moon-outline" data-group="ion" data-tags="ion-ios-moon-outline"></span> \
						<span class="ion-ios-cloudy-night" data-group="ion" data-tags="ion-ios-cloudy-night"></span> \
						<span class="ion-ios-cloudy-night-outline" data-group="ion" data-tags="ion-ios-cloudy-night-outline"></span> \
						<span class="ion-android-arrow-up" data-group="ion" data-tags="ion-android-arrow-up"></span> \
						<span class="ion-android-arrow-forward" data-group="ion" data-tags="ion-android-arrow-forward"></span> \
						<span class="ion-android-arrow-down" data-group="ion" data-tags="ion-android-arrow-down"></span> \
						<span class="ion-android-arrow-back" data-group="ion" data-tags="ion-android-arrow-back"></span> \
						<span class="ion-android-arrow-dropup" data-group="ion" data-tags="ion-android-arrow-dropup"></span> \
						<span class="ion-android-arrow-dropup-circle" data-group="ion" data-tags="ion-android-arrow-dropup-circle"></span> \
						<span class="ion-android-arrow-dropright" data-group="ion" data-tags="ion-android-arrow-dropright"></span> \
						<span class="ion-android-arrow-dropright-circle" data-group="ion" data-tags="ion-android-arrow-dropright-circle"></span> \
						<span class="ion-android-arrow-dropdown" data-group="ion" data-tags="ion-android-arrow-dropdown"></span> \
						<span class="ion-android-arrow-dropdown-circle" data-group="ion" data-tags="ion-android-arrow-dropdown-circle"></span> \
						<span class="ion-android-arrow-dropleft" data-group="ion" data-tags="ion-android-arrow-dropleft"></span> \
						<span class="ion-android-arrow-dropleft-circle" data-group="ion" data-tags="ion-android-arrow-dropleft-circle"></span> \
						<span class="ion-android-add" data-group="ion" data-tags="ion-android-add"></span> \
						<span class="ion-android-add-circle" data-group="ion" data-tags="ion-android-add-circle"></span> \
						<span class="ion-android-remove" data-group="ion" data-tags="ion-android-remove"></span> \
						<span class="ion-android-remove-circle" data-group="ion" data-tags="ion-android-remove-circle"></span> \
						<span class="ion-android-close" data-group="ion" data-tags="ion-android-close"></span> \
						<span class="ion-android-cancel" data-group="ion" data-tags="ion-android-cancel"></span> \
						<span class="ion-android-radio-button-off" data-group="ion" data-tags="ion-android-radio-button-off"></span> \
						<span class="ion-android-radio-button-on" data-group="ion" data-tags="ion-android-radio-button-on"></span> \
						<span class="ion-android-checkmark-circle" data-group="ion" data-tags="ion-android-checkmark-circle"></span> \
						<span class="ion-android-checkbox-outline-blank" data-group="ion" data-tags="ion-android-checkbox-outline-blank"></span> \
						<span class="ion-android-checkbox-outline" data-group="ion" data-tags="ion-android-checkbox-outline"></span> \
						<span class="ion-android-checkbox-blank" data-group="ion" data-tags="ion-android-checkbox-blank"></span> \
						<span class="ion-android-checkbox" data-group="ion" data-tags="ion-android-checkbox"></span> \
						<span class="ion-android-done" data-group="ion" data-tags="ion-android-done"></span> \
						<span class="ion-android-done-all" data-group="ion" data-tags="ion-android-done-all"></span> \
						<span class="ion-android-menu" data-group="ion" data-tags="ion-android-menu"></span> \
						<span class="ion-android-more-horizontal" data-group="ion" data-tags="ion-android-more-horizontal"></span> \
						<span class="ion-android-more-vertical" data-group="ion" data-tags="ion-android-more-vertical"></span> \
						<span class="ion-android-refresh" data-group="ion" data-tags="ion-android-refresh"></span> \
						<span class="ion-android-sync" data-group="ion" data-tags="ion-android-sync"></span> \
						<span class="ion-android-wifi" data-group="ion" data-tags="ion-android-wifi"></span> \
						<span class="ion-android-call" data-group="ion" data-tags="ion-android-call"></span> \
						<span class="ion-android-apps" data-group="ion" data-tags="ion-android-apps"></span> \
						<span class="ion-android-settings" data-group="ion" data-tags="ion-android-settings"></span> \
						<span class="ion-android-options" data-group="ion" data-tags="ion-android-options"></span> \
						<span class="ion-android-funnel" data-group="ion" data-tags="ion-android-funnel"></span> \
						<span class="ion-android-search" data-group="ion" data-tags="ion-android-search"></span> \
						<span class="ion-android-home" data-group="ion" data-tags="ion-android-home"></span> \
						<span class="ion-android-cloud-outline" data-group="ion" data-tags="ion-android-cloud-outline"></span> \
						<span class="ion-android-cloud" data-group="ion" data-tags="ion-android-cloud"></span> \
						<span class="ion-android-download" data-group="ion" data-tags="ion-android-download"></span> \
						<span class="ion-android-upload" data-group="ion" data-tags="ion-android-upload"></span> \
						<span class="ion-android-cloud-done" data-group="ion" data-tags="ion-android-cloud-done"></span> \
						<span class="ion-android-cloud-circle" data-group="ion" data-tags="ion-android-cloud-circle"></span> \
						<span class="ion-android-favorite-outline" data-group="ion" data-tags="ion-android-favorite-outline"></span> \
						<span class="ion-android-favorite" data-group="ion" data-tags="ion-android-favorite"></span> \
						<span class="ion-android-star-outline" data-group="ion" data-tags="ion-android-star-outline"></span> \
						<span class="ion-android-star-half" data-group="ion" data-tags="ion-android-star-half"></span> \
						<span class="ion-android-star" data-group="ion" data-tags="ion-android-star"></span> \
						<span class="ion-android-calendar" data-group="ion" data-tags="ion-android-calendar"></span> \
						<span class="ion-android-alarm-clock" data-group="ion" data-tags="ion-android-alarm-clock"></span> \
						<span class="ion-android-time" data-group="ion" data-tags="ion-android-time"></span> \
						<span class="ion-android-stopwatch" data-group="ion" data-tags="ion-android-stopwatch"></span> \
						<span class="ion-android-watch" data-group="ion" data-tags="ion-android-watch"></span> \
						<span class="ion-android-locate" data-group="ion" data-tags="ion-android-locate"></span> \
						<span class="ion-android-navigate" data-group="ion" data-tags="ion-android-navigate"></span> \
						<span class="ion-android-pin" data-group="ion" data-tags="ion-android-pin"></span> \
						<span class="ion-android-compass" data-group="ion" data-tags="ion-android-compass"></span> \
						<span class="ion-android-map" data-group="ion" data-tags="ion-android-map"></span> \
						<span class="ion-android-walk" data-group="ion" data-tags="ion-android-walk"></span> \
						<span class="ion-android-bicycle" data-group="ion" data-tags="ion-android-bicycle"></span> \
						<span class="ion-android-car" data-group="ion" data-tags="ion-android-car"></span> \
						<span class="ion-android-bus" data-group="ion" data-tags="ion-android-bus"></span> \
						<span class="ion-android-subway" data-group="ion" data-tags="ion-android-subway"></span> \
						<span class="ion-android-train" data-group="ion" data-tags="ion-android-train"></span> \
						<span class="ion-android-boat" data-group="ion" data-tags="ion-android-boat"></span> \
						<span class="ion-android-plane" data-group="ion" data-tags="ion-android-plane"></span> \
						<span class="ion-android-restaurant" data-group="ion" data-tags="ion-android-restaurant"></span> \
						<span class="ion-android-bar" data-group="ion" data-tags="ion-android-bar"></span> \
						<span class="ion-android-cart" data-group="ion" data-tags="ion-android-cart"></span> \
						<span class="ion-android-camera" data-group="ion" data-tags="ion-android-camera"></span> \
						<span class="ion-android-image" data-group="ion" data-tags="ion-android-image"></span> \
						<span class="ion-android-film" data-group="ion" data-tags="ion-android-film"></span> \
						<span class="ion-android-color-palette" data-group="ion" data-tags="ion-android-color-palette"></span> \
						<span class="ion-android-create" data-group="ion" data-tags="ion-android-create"></span> \
						<span class="ion-android-mail" data-group="ion" data-tags="ion-android-mail"></span> \
						<span class="ion-android-drafts" data-group="ion" data-tags="ion-android-drafts"></span> \
						<span class="ion-android-send" data-group="ion" data-tags="ion-android-send"></span> \
						<span class="ion-android-archive" data-group="ion" data-tags="ion-android-archive"></span> \
						<span class="ion-android-delete" data-group="ion" data-tags="ion-android-delete"></span> \
						<span class="ion-android-attach" data-group="ion" data-tags="ion-android-attach"></span> \
						<span class="ion-android-share" data-group="ion" data-tags="ion-android-share"></span> \
						<span class="ion-android-share-alt" data-group="ion" data-tags="ion-android-share-alt"></span> \
						<span class="ion-android-bookmark" data-group="ion" data-tags="ion-android-bookmark"></span> \
						<span class="ion-android-document" data-group="ion" data-tags="ion-android-document"></span> \
						<span class="ion-android-clipboard" data-group="ion" data-tags="ion-android-clipboard"></span> \
						<span class="ion-android-list" data-group="ion" data-tags="ion-android-list"></span> \
						<span class="ion-android-folder-open" data-group="ion" data-tags="ion-android-folder-open"></span> \
						<span class="ion-android-folder" data-group="ion" data-tags="ion-android-folder"></span> \
						<span class="ion-android-print" data-group="ion" data-tags="ion-android-print"></span> \
						<span class="ion-android-open" data-group="ion" data-tags="ion-android-open"></span> \
						<span class="ion-android-exit" data-group="ion" data-tags="ion-android-exit"></span> \
						<span class="ion-android-contract" data-group="ion" data-tags="ion-android-contract"></span> \
						<span class="ion-android-expand" data-group="ion" data-tags="ion-android-expand"></span> \
						<span class="ion-android-globe" data-group="ion" data-tags="ion-android-globe"></span> \
						<span class="ion-android-chat" data-group="ion" data-tags="ion-android-chat"></span> \
						<span class="ion-android-textsms" data-group="ion" data-tags="ion-android-textsms"></span> \
						<span class="ion-android-hangout" data-group="ion" data-tags="ion-android-hangout"></span> \
						<span class="ion-android-happy" data-group="ion" data-tags="ion-android-happy"></span> \
						<span class="ion-android-sad" data-group="ion" data-tags="ion-android-sad"></span> \
						<span class="ion-android-person" data-group="ion" data-tags="ion-android-person"></span> \
						<span class="ion-android-people" data-group="ion" data-tags="ion-android-people"></span> \
						<span class="ion-android-person-add" data-group="ion" data-tags="ion-android-person-add"></span> \
						<span class="ion-android-contact" data-group="ion" data-tags="ion-android-contact"></span> \
						<span class="ion-android-contacts" data-group="ion" data-tags="ion-android-contacts"></span> \
						<span class="ion-android-playstore" data-group="ion" data-tags="ion-android-playstore"></span> \
						<span class="ion-android-lock" data-group="ion" data-tags="ion-android-lock"></span> \
						<span class="ion-android-unlock" data-group="ion" data-tags="ion-android-unlock"></span> \
						<span class="ion-android-microphone" data-group="ion" data-tags="ion-android-microphone"></span> \
						<span class="ion-android-microphone-off" data-group="ion" data-tags="ion-android-microphone-off"></span> \
						<span class="ion-android-notifications-none" data-group="ion" data-tags="ion-android-notifications-none"></span> \
						<span class="ion-android-notifications" data-group="ion" data-tags="ion-android-notifications"></span> \
						<span class="ion-android-notifications-off" data-group="ion" data-tags="ion-android-notifications-off"></span> \
						<span class="ion-android-volume-mute" data-group="ion" data-tags="ion-android-volume-mute"></span> \
						<span class="ion-android-volume-down" data-group="ion" data-tags="ion-android-volume-down"></span> \
						<span class="ion-android-volume-up" data-group="ion" data-tags="ion-android-volume-up"></span> \
						<span class="ion-android-volume-off" data-group="ion" data-tags="ion-android-volume-off"></span> \
						<span class="ion-android-hand" data-group="ion" data-tags="ion-android-hand"></span> \
						<span class="ion-android-desktop" data-group="ion" data-tags="ion-android-desktop"></span> \
						<span class="ion-android-laptop" data-group="ion" data-tags="ion-android-laptop"></span> \
						<span class="ion-android-phone-portrait" data-group="ion" data-tags="ion-android-phone-portrait"></span> \
						<span class="ion-android-phone-landscape" data-group="ion" data-tags="ion-android-phone-landscape"></span> \
						<span class="ion-android-bulb" data-group="ion" data-tags="ion-android-bulb"></span> \
						<span class="ion-android-sunny" data-group="ion" data-tags="ion-android-sunny"></span> \
						<span class="ion-android-alert" data-group="ion" data-tags="ion-android-alert"></span> \
						<span class="ion-android-warning" data-group="ion" data-tags="ion-android-warning"></span> \
						<span class="ion-social-twitter" data-group="ion" data-tags="ion-social-twitter"></span> \
						<span class="ion-social-twitter-outline" data-group="ion" data-tags="ion-social-twitter-outline"></span> \
						<span class="ion-social-facebook" data-group="ion" data-tags="ion-social-facebook"></span> \
						<span class="ion-social-facebook-outline" data-group="ion" data-tags="ion-social-facebook-outline"></span> \
						<span class="ion-social-googleplus" data-group="ion" data-tags="ion-social-googleplus"></span> \
						<span class="ion-social-googleplus-outline" data-group="ion" data-tags="ion-social-googleplus-outline"></span> \
						<span class="ion-social-google" data-group="ion" data-tags="ion-social-google"></span> \
						<span class="ion-social-google-outline" data-group="ion" data-tags="ion-social-google-outline"></span> \
						<span class="ion-social-dribbble" data-group="ion" data-tags="ion-social-dribbble"></span> \
						<span class="ion-social-dribbble-outline" data-group="ion" data-tags="ion-social-dribbble-outline"></span> \
						<span class="ion-social-octocat" data-group="ion" data-tags="ion-social-octocat"></span> \
						<span class="ion-social-github" data-group="ion" data-tags="ion-social-github"></span> \
						<span class="ion-social-github-outline" data-group="ion" data-tags="ion-social-github-outline"></span> \
						<span class="ion-social-instagram" data-group="ion" data-tags="ion-social-instagram"></span> \
						<span class="ion-social-instagram-outline" data-group="ion" data-tags="ion-social-instagram-outline"></span> \
						<span class="ion-social-whatsapp" data-group="ion" data-tags="ion-social-whatsapp"></span> \
						<span class="ion-social-whatsapp-outline" data-group="ion" data-tags="ion-social-whatsapp-outline"></span> \
						<span class="ion-social-snapchat" data-group="ion" data-tags="ion-social-snapchat"></span> \
						<span class="ion-social-snapchat-outline" data-group="ion" data-tags="ion-social-snapchat-outline"></span> \
						<span class="ion-social-foursquare" data-group="ion" data-tags="ion-social-foursquare"></span> \
						<span class="ion-social-foursquare-outline" data-group="ion" data-tags="ion-social-foursquare-outline"></span> \
						<span class="ion-social-pinterest" data-group="ion" data-tags="ion-social-pinterest"></span> \
						<span class="ion-social-pinterest-outline" data-group="ion" data-tags="ion-social-pinterest-outline"></span> \
						<span class="ion-social-rss" data-group="ion" data-tags="ion-social-rss"></span> \
						<span class="ion-social-rss-outline" data-group="ion" data-tags="ion-social-rss-outline"></span> \
						<span class="ion-social-tumblr" data-group="ion" data-tags="ion-social-tumblr"></span> \
						<span class="ion-social-tumblr-outline" data-group="ion" data-tags="ion-social-tumblr-outline"></span> \
						<span class="ion-social-wordpress" data-group="ion" data-tags="ion-social-wordpress"></span> \
						<span class="ion-social-wordpress-outline" data-group="ion" data-tags="ion-social-wordpress-outline"></span> \
						<span class="ion-social-reddit" data-group="ion" data-tags="ion-social-reddit"></span> \
						<span class="ion-social-reddit-outline" data-group="ion" data-tags="ion-social-reddit-outline"></span> \
						<span class="ion-social-hackernews" data-group="ion" data-tags="ion-social-hackernews"></span> \
						<span class="ion-social-hackernews-outline" data-group="ion" data-tags="ion-social-hackernews-outline"></span> \
						<span class="ion-social-designernews" data-group="ion" data-tags="ion-social-designernews"></span> \
						<span class="ion-social-designernews-outline" data-group="ion" data-tags="ion-social-designernews-outline"></span> \
						<span class="ion-social-yahoo" data-group="ion" data-tags="ion-social-yahoo"></span> \
						<span class="ion-social-yahoo-outline" data-group="ion" data-tags="ion-social-yahoo-outline"></span> \
						<span class="ion-social-buffer" data-group="ion" data-tags="ion-social-buffer"></span> \
						<span class="ion-social-buffer-outline" data-group="ion" data-tags="ion-social-buffer-outline"></span> \
						<span class="ion-social-skype" data-group="ion" data-tags="ion-social-skype"></span> \
						<span class="ion-social-skype-outline" data-group="ion" data-tags="ion-social-skype-outline"></span> \
						<span class="ion-social-linkedin" data-group="ion" data-tags="ion-social-linkedin"></span> \
						<span class="ion-social-linkedin-outline" data-group="ion" data-tags="ion-social-linkedin-outline"></span> \
						<span class="ion-social-vimeo" data-group="ion" data-tags="ion-social-vimeo"></span> \
						<span class="ion-social-vimeo-outline" data-group="ion" data-tags="ion-social-vimeo-outline"></span> \
						<span class="ion-social-twitch" data-group="ion" data-tags="ion-social-twitch"></span> \
						<span class="ion-social-twitch-outline" data-group="ion" data-tags="ion-social-twitch-outline"></span> \
						<span class="ion-social-youtube" data-group="ion" data-tags="ion-social-youtube"></span> \
						<span class="ion-social-youtube-outline" data-group="ion" data-tags="ion-social-youtube-outline"></span> \
						<span class="ion-social-dropbox" data-group="ion" data-tags="ion-social-dropbox"></span> \
						<span class="ion-social-dropbox-outline" data-group="ion" data-tags="ion-social-dropbox-outline"></span> \
						<span class="ion-social-apple" data-group="ion" data-tags="ion-social-apple"></span> \
						<span class="ion-social-apple-outline" data-group="ion" data-tags="ion-social-apple-outline"></span> \
						<span class="ion-social-android" data-group="ion" data-tags="ion-social-android"></span> \
						<span class="ion-social-android-outline" data-group="ion" data-tags="ion-social-android-outline"></span> \
						<span class="ion-social-windows" data-group="ion" data-tags="ion-social-windows"></span> \
						<span class="ion-social-windows-outline" data-group="ion" data-tags="ion-social-windows-outline"></span> \
						<span class="ion-social-html5" data-group="ion" data-tags="ion-social-html5"></span> \
						<span class="ion-social-html5-outline" data-group="ion" data-tags="ion-social-html5-outline"></span> \
						<span class="ion-social-css3" data-group="ion" data-tags="ion-social-css3"></span> \
						<span class="ion-social-css3-outline" data-group="ion" data-tags="ion-social-css3-outline"></span> \
						<span class="ion-social-javascript" data-group="ion" data-tags="ion-social-javascript"></span> \
						<span class="ion-social-javascript-outline" data-group="ion" data-tags="ion-social-javascript-outline"></span> \
						<span class="ion-social-angular" data-group="ion" data-tags="ion-social-angular"></span> \
						<span class="ion-social-angular-outline" data-group="ion" data-tags="ion-social-angular-outline"></span> \
						<span class="ion-social-nodejs" data-group="ion" data-tags="ion-social-nodejs"></span> \
						<span class="ion-social-sass" data-group="ion" data-tags="ion-social-sass"></span> \
						<span class="ion-social-python" data-group="ion" data-tags="ion-social-python"></span> \
						<span class="ion-social-chrome" data-group="ion" data-tags="ion-social-chrome"></span> \
						<span class="ion-social-chrome-outline" data-group="ion" data-tags="ion-social-chrome-outline"></span> \
						<span class="ion-social-codepen" data-group="ion" data-tags="ion-social-codepen"></span> \
						<span class="ion-social-codepen-outline" data-group="ion" data-tags="ion-social-codepen-outline"></span> \
						<span class="ion-social-markdown" data-group="ion" data-tags="ion-social-markdown"></span> \
						<span class="ion-social-tux" data-group="ion" data-tags="ion-social-tux"></span> \
						<span class="ion-social-freebsd-devil" data-group="ion" data-tags="ion-social-freebsd-devil"></span> \
						<span class="ion-social-usd" data-group="ion" data-tags="ion-social-usd"></span> \
						<span class="ion-social-usd-outline" data-group="ion" data-tags="ion-social-usd-outline"></span> \
						<span class="ion-social-bitcoin" data-group="ion" data-tags="ion-social-bitcoin"></span> \
						<span class="ion-social-bitcoin-outline" data-group="ion" data-tags="ion-social-bitcoin-outline"></span> \
						<span class="ion-social-yen" data-group="ion" data-tags="ion-social-yen"></span> \
						<span class="ion-social-yen-outline" data-group="ion" data-tags="ion-social-yen-outline"></span> \
						<span class="ion-social-euro" data-group="ion" data-tags="ion-social-euro"></span> \
						<span class="ion-social-euro-outline" data-group="ion" data-tags="ion-social-euro-outline"></span> \
						<span data-tags="ti-arrow-up" data-group="themify" class="ti-arrow-up"></span> \
						<span data-tags="ti-arrow-right" data-group="themify" class="ti-arrow-right"></span> \
						<span data-tags="ti-arrow-left" data-group="themify" class="ti-arrow-left"></span> \
						<span data-tags="ti-arrow-down" data-group="themify" class="ti-arrow-down"></span> \
						<span data-tags="ti-arrows-vertical" data-group="themify" class="ti-arrows-vertical"></span> \
						<span data-tags="ti-arrows-horizontal" data-group="themify" class="ti-arrows-horizontal"></span> \
						<span data-tags="ti-angle-up" data-group="themify" class="ti-angle-up"></span> \
						<span data-tags="ti-angle-right" data-group="themify" class="ti-angle-right"></span> \
						<span data-tags="ti-angle-left" data-group="themify" class="ti-angle-left"></span> \
						<span data-tags="ti-angle-down" data-group="themify" class="ti-angle-down"></span> \
						<span data-tags="ti-angle-double-up" data-group="themify" class="ti-angle-double-up"></span> \
						<span data-tags="ti-angle-double-right" data-group="themify" class="ti-angle-double-right"></span> \
						<span data-tags="ti-angle-double-left" data-group="themify" class="ti-angle-double-left"></span> \
						<span data-tags="ti-angle-double-down" data-group="themify" class="ti-angle-double-down"></span> \
						<span data-tags="ti-move" data-group="themify" class="ti-move"></span> \
						<span data-tags="ti-fullscreen" data-group="themify" class="ti-fullscreen"></span> \
						<span data-tags="ti-arrow-top-right" data-group="themify" class="ti-arrow-top-right"></span> \
						<span data-tags="ti-arrow-top-left" data-group="themify" class="ti-arrow-top-left"></span> \
						<span data-tags="ti-arrow-circle-up" data-group="themify" class="ti-arrow-circle-up"></span> \
						<span data-tags="ti-arrow-circle-right" data-group="themify" class="ti-arrow-circle-right"></span> \
						<span data-tags="ti-arrow-circle-left" data-group="themify" class="ti-arrow-circle-left"></span> \
						<span data-tags="ti-arrow-circle-down" data-group="themify" class="ti-arrow-circle-down"></span> \
						<span data-tags="ti-arrows-corner" data-group="themify" class="ti-arrows-corner"></span> \
						<span data-tags="ti-split-v" data-group="themify" class="ti-split-v"></span> \
						<span data-tags="ti-split-v-alt" data-group="themify" class="ti-split-v-alt"></span> \
						<span data-tags="ti-split-h" data-group="themify" class="ti-split-h"></span> \
						<span data-tags="ti-hand-point-up" data-group="themify" class="ti-hand-point-up"></span> \
						<span data-tags="ti-hand-point-right" data-group="themify" class="ti-hand-point-right"></span> \
						<span data-tags="ti-hand-point-left" data-group="themify" class="ti-hand-point-left"></span> \
						<span data-tags="ti-hand-point-down" data-group="themify" class="ti-hand-point-down"></span> \
						<span data-tags="ti-back-right" data-group="themify" class="ti-back-right"></span> \
						<span data-tags="ti-back-left" data-group="themify" class="ti-back-left"></span> \
						<span data-tags="ti-exchange-vertical" data-group="themify" class="ti-exchange-vertical"></span> \
						<span data-tags="ti-wand" data-group="themify" class="ti-wand"></span> \
						<span data-tags="ti-save" data-group="themify" class="ti-save"></span> \
						<span data-tags="ti-save-alt" data-group="themify" class="ti-save-alt"></span> \
						<span data-tags="ti-direction" data-group="themify" class="ti-direction"></span> \
						<span data-tags="ti-direction-alt" data-group="themify" class="ti-direction-alt"></span> \
						<span data-tags="ti-user" data-group="themify" class="ti-user"></span> \
						<span data-tags="ti-link" data-group="themify" class="ti-link"></span> \
						<span data-tags="ti-unlink" data-group="themify" class="ti-unlink"></span> \
						<span data-tags="ti-trash" data-group="themify" class="ti-trash"></span> \
						<span data-tags="ti-target" data-group="themify" class="ti-target"></span> \
						<span data-tags="ti-tag" data-group="themify" class="ti-tag"></span> \
						<span data-tags="ti-desktop" data-group="themify" class="ti-desktop"></span> \
						<span data-tags="ti-tablet" data-group="themify" class="ti-tablet"></span> \
						<span data-tags="ti-mobile" data-group="themify" class="ti-mobile"></span> \
						<span data-tags="ti-email" data-group="themify" class="ti-email"></span> \
						<span data-tags="ti-star" data-group="themify" class="ti-star"></span> \
						<span data-tags="ti-spray" data-group="themify" class="ti-spray"></span> \
						<span data-tags="ti-signal" data-group="themify" class="ti-signal"></span> \
						<span data-tags="ti-shopping-cart" data-group="themify" class="ti-shopping-cart"></span> \
						<span data-tags="ti-shopping-cart-full" data-group="themify" class="ti-shopping-cart-full"></span> \
						<span data-tags="ti-settings" data-group="themify" class="ti-settings"></span> \
						<span data-tags="ti-search" data-group="themify" class="ti-search"></span> \
						<span data-tags="ti-zoom-in" data-group="themify" class="ti-zoom-in"></span> \
						<span data-tags="ti-zoom-out" data-group="themify" class="ti-zoom-out"></span> \
						<span data-tags="ti-cut" data-group="themify" class="ti-cut"></span> \
						<span data-tags="ti-ruler" data-group="themify" class="ti-ruler"></span> \
						<span data-tags="ti-ruler-alt-2" data-group="themify" class="ti-ruler-alt-2"></span> \
						<span data-tags="ti-ruler-pencil" data-group="themify" class="ti-ruler-pencil"></span> \
						<span data-tags="ti-ruler-alt" data-group="themify" class="ti-ruler-alt"></span> \
						<span data-tags="ti-bookmark" data-group="themify" class="ti-bookmark"></span> \
						<span data-tags="ti-bookmark-alt" data-group="themify" class="ti-bookmark-alt"></span> \
						<span data-tags="ti-reload" data-group="themify" class="ti-reload"></span> \
						<span data-tags="ti-plus" data-group="themify" class="ti-plus"></span> \
						<span data-tags="ti-minus" data-group="themify" class="ti-minus"></span> \
						<span data-tags="ti-close" data-group="themify" class="ti-close"></span> \
						<span data-tags="ti-pin" data-group="themify" class="ti-pin"></span> \
						<span data-tags="ti-pencil" data-group="themify" class="ti-pencil"></span> \
						<span data-tags="ti-pencil-alt" data-group="themify" class="ti-pencil-alt"></span> \
						<span data-tags="ti-paint-roller" data-group="themify" class="ti-paint-roller"></span> \
						<span data-tags="ti-paint-bucket" data-group="themify" class="ti-paint-bucket"></span> \
						<span data-tags="ti-na" data-group="themify" class="ti-na"></span> \
						<span data-tags="ti-medall" data-group="themify" class="ti-medall"></span> \
						<span data-tags="ti-medall-alt" data-group="themify" class="ti-medall-alt"></span> \
						<span data-tags="ti-marker" data-group="themify" class="ti-marker"></span> \
						<span data-tags="ti-marker-alt" data-group="themify" class="ti-marker-alt"></span> \
						<span data-tags="ti-lock" data-group="themify" class="ti-lock"></span> \
						<span data-tags="ti-unlock" data-group="themify" class="ti-unlock"></span> \
						<span data-tags="ti-location-arrow" data-group="themify" class="ti-location-arrow"></span> \
						<span data-tags="ti-layout" data-group="themify" class="ti-layout"></span> \
						<span data-tags="ti-layers" data-group="themify" class="ti-layers"></span> \
						<span data-tags="ti-layers-alt" data-group="themify" class="ti-layers-alt"></span> \
						<span data-tags="ti-key" data-group="themify" class="ti-key"></span> \
						<span data-tags="ti-image" data-group="themify" class="ti-image"></span> \
						<span data-tags="ti-heart" data-group="themify" class="ti-heart"></span> \
						<span data-tags="ti-heart-broken" data-group="themify" class="ti-heart-broken"></span> \
						<span data-tags="ti-hand-stop" data-group="themify" class="ti-hand-stop"></span> \
						<span data-tags="ti-hand-open" data-group="themify" class="ti-hand-open"></span> \
						<span data-tags="ti-hand-drag" data-group="themify" class="ti-hand-drag"></span> \
						<span data-tags="ti-flag" data-group="themify" class="ti-flag"></span> \
						<span data-tags="ti-flag-alt" data-group="themify" class="ti-flag-alt"></span> \
						<span data-tags="ti-flag-alt-2" data-group="themify" class="ti-flag-alt-2"></span> \
						<span data-tags="ti-eye" data-group="themify" class="ti-eye"></span> \
						<span data-tags="ti-import" data-group="themify" class="ti-import"></span> \
						<span data-tags="ti-export" data-group="themify" class="ti-export"></span> \
						<span data-tags="ti-cup" data-group="themify" class="ti-cup"></span> \
						<span data-tags="ti-crown" data-group="themify" class="ti-crown"></span> \
						<span data-tags="ti-comments" data-group="themify" class="ti-comments"></span> \
						<span data-tags="ti-comment" data-group="themify" class="ti-comment"></span> \
						<span data-tags="ti-comment-alt" data-group="themify" class="ti-comment-alt"></span> \
						<span data-tags="ti-thought" data-group="themify" class="ti-thought"></span> \
						<span data-tags="ti-clip" data-group="themify" class="ti-clip"></span> \
						<span data-tags="ti-check" data-group="themify" class="ti-check"></span> \
						<span data-tags="ti-check-box" data-group="themify" class="ti-check-box"></span> \
						<span data-tags="ti-camera" data-group="themify" class="ti-camera"></span> \
						<span data-tags="ti-announcement" data-group="themify" class="ti-announcement"></span> \
						<span data-tags="ti-brush" data-group="themify" class="ti-brush"></span> \
						<span data-tags="ti-brush-alt" data-group="themify" class="ti-brush-alt"></span> \
						<span data-tags="ti-palette" data-group="themify" class="ti-palette"></span> \
						<span data-tags="ti-briefcase" data-group="themify" class="ti-briefcase"></span> \
						<span data-tags="ti-bolt" data-group="themify" class="ti-bolt"></span> \
						<span data-tags="ti-bolt-alt" data-group="themify" class="ti-bolt-alt"></span> \
						<span data-tags="ti-blackboard" data-group="themify" class="ti-blackboard"></span> \
						<span data-tags="ti-bag" data-group="themify" class="ti-bag"></span> \
						<span data-tags="ti-world" data-group="themify" class="ti-world"></span> \
						<span data-tags="ti-wheelchair" data-group="themify" class="ti-wheelchair"></span> \
						<span data-tags="ti-car" data-group="themify" class="ti-car"></span> \
						<span data-tags="ti-truck" data-group="themify" class="ti-truck"></span> \
						<span data-tags="ti-timer" data-group="themify" class="ti-timer"></span> \
						<span data-tags="ti-ticket" data-group="themify" class="ti-ticket"></span> \
						<span data-tags="ti-thumb-up" data-group="themify" class="ti-thumb-up"></span> \
						<span data-tags="ti-thumb-down" data-group="themify" class="ti-thumb-down"></span> \
						<span data-tags="ti-stats-up" data-group="themify" class="ti-stats-up"></span> \
						<span data-tags="ti-stats-down" data-group="themify" class="ti-stats-down"></span> \
						<span data-tags="ti-shine" data-group="themify" class="ti-shine"></span> \
						<span data-tags="ti-shift-right" data-group="themify" class="ti-shift-right"></span> \
						<span data-tags="ti-shift-left" data-group="themify" class="ti-shift-left"></span> \
						<span data-tags="ti-shift-right-alt" data-group="themify" class="ti-shift-right-alt"></span> \
						<span data-tags="ti-shift-left-alt" data-group="themify" class="ti-shift-left-alt"></span> \
						<span data-tags="ti-shield" data-group="themify" class="ti-shield"></span> \
						<span data-tags="ti-notepad" data-group="themify" class="ti-notepad"></span> \
						<span data-tags="ti-server" data-group="themify" class="ti-server"></span> \
						<span data-tags="ti-pulse" data-group="themify" class="ti-pulse"></span> \
						<span data-tags="ti-printer" data-group="themify" class="ti-printer"></span> \
						<span data-tags="ti-power-off" data-group="themify" class="ti-power-off"></span> \
						<span data-tags="ti-plug" data-group="themify" class="ti-plug"></span> \
						<span data-tags="ti-pie-chart" data-group="themify" class="ti-pie-chart"></span> \
						<span data-tags="ti-panel" data-group="themify" class="ti-panel"></span> \
						<span data-tags="ti-package" data-group="themify" class="ti-package"></span> \
						<span data-tags="ti-music" data-group="themify" class="ti-music"></span> \
						<span data-tags="ti-music-alt" data-group="themify" class="ti-music-alt"></span> \
						<span data-tags="ti-mouse" data-group="themify" class="ti-mouse"></span> \
						<span data-tags="ti-mouse-alt" data-group="themify" class="ti-mouse-alt"></span> \
						<span data-tags="ti-money" data-group="themify" class="ti-money"></span> \
						<span data-tags="ti-microphone" data-group="themify" class="ti-microphone"></span> \
						<span data-tags="ti-menu" data-group="themify" class="ti-menu"></span> \
						<span data-tags="ti-menu-alt" data-group="themify" class="ti-menu-alt"></span> \
						<span data-tags="ti-map" data-group="themify" class="ti-map"></span> \
						<span data-tags="ti-map-alt" data-group="themify" class="ti-map-alt"></span> \
						<span data-tags="ti-location-pin" data-group="themify" class="ti-location-pin"></span> \
						<span data-tags="ti-light-bulb" data-group="themify" class="ti-light-bulb"></span> \
						<span data-tags="ti-info" data-group="themify" class="ti-info"></span> \
						<span data-tags="ti-infinite" data-group="themify" class="ti-infinite"></span> \
						<span data-tags="ti-id-badge" data-group="themify" class="ti-id-badge"></span> \
						<span data-tags="ti-hummer" data-group="themify" class="ti-hummer"></span> \
						<span data-tags="ti-home" data-group="themify" class="ti-home"></span> \
						<span data-tags="ti-help" data-group="themify" class="ti-help"></span> \
						<span data-tags="ti-headphone" data-group="themify" class="ti-headphone"></span> \
						<span data-tags="ti-harddrives" data-group="themify" class="ti-harddrives"></span> \
						<span data-tags="ti-harddrive" data-group="themify" class="ti-harddrive"></span> \
						<span data-tags="ti-gift" data-group="themify" class="ti-gift"></span> \
						<span data-tags="ti-game" data-group="themify" class="ti-game"></span> \
						<span data-tags="ti-filter" data-group="themify" class="ti-filter"></span> \
						<span data-tags="ti-files" data-group="themify" class="ti-files"></span> \
						<span data-tags="ti-file" data-group="themify" class="ti-file"></span> \
						<span data-tags="ti-zip" data-group="themify" class="ti-zip"></span> \
						<span data-tags="ti-folder" data-group="themify" class="ti-folder"></span> \
						<span data-tags="ti-envelope" data-group="themify" class="ti-envelope"></span> \
						<span data-tags="ti-dashboard" data-group="themify" class="ti-dashboard"></span> \
						<span data-tags="ti-cloud" data-group="themify" class="ti-cloud"></span> \
						<span data-tags="ti-cloud-up" data-group="themify" class="ti-cloud-up"></span> \
						<span data-tags="ti-cloud-down" data-group="themify" class="ti-cloud-down"></span> \
						<span data-tags="ti-clipboard" data-group="themify" class="ti-clipboard"></span> \
						<span data-tags="ti-calendar" data-group="themify" class="ti-calendar"></span> \
						<span data-tags="ti-book" data-group="themify" class="ti-book"></span> \
						<span data-tags="ti-bell" data-group="themify" class="ti-bell"></span> \
						<span data-tags="ti-basketball" data-group="themify" class="ti-basketball"></span> \
						<span data-tags="ti-bar-chart" data-group="themify" class="ti-bar-chart"></span> \
						<span data-tags="ti-bar-chart-alt" data-group="themify" class="ti-bar-chart-alt"></span> \
						<span data-tags="ti-archive" data-group="themify" class="ti-archive"></span> \
						<span data-tags="ti-anchor" data-group="themify" class="ti-anchor"></span> \
						<span data-tags="ti-alert" data-group="themify" class="ti-alert"></span> \
						<span data-tags="ti-alarm-clock" data-group="themify" class="ti-alarm-clock"></span> \
						<span data-tags="ti-agenda" data-group="themify" class="ti-agenda"></span> \
						<span data-tags="ti-write" data-group="themify" class="ti-write"></span> \
						<span data-tags="ti-wallet" data-group="themify" class="ti-wallet"></span> \
						<span data-tags="ti-video-clapper" data-group="themify" class="ti-video-clapper"></span> \
						<span data-tags="ti-video-camera" data-group="themify" class="ti-video-camera"></span> \
						<span data-tags="ti-vector" data-group="themify" class="ti-vector"></span> \
						<span data-tags="ti-support" data-group="themify" class="ti-support"></span> \
						<span data-tags="ti-stamp" data-group="themify" class="ti-stamp"></span> \
						<span data-tags="ti-slice" data-group="themify" class="ti-slice"></span> \
						<span data-tags="ti-shortcode" data-group="themify" class="ti-shortcode"></span> \
						<span data-tags="ti-receipt" data-group="themify" class="ti-receipt"></span> \
						<span data-tags="ti-pin2" data-group="themify" class="ti-pin2"></span> \
						<span data-tags="ti-pin-alt" data-group="themify" class="ti-pin-alt"></span> \
						<span data-tags="ti-pencil-alt2" data-group="themify" class="ti-pencil-alt2"></span> \
						<span data-tags="ti-eraser" data-group="themify" class="ti-eraser"></span> \
						<span data-tags="ti-more" data-group="themify" class="ti-more"></span> \
						<span data-tags="ti-more-alt" data-group="themify" class="ti-more-alt"></span> \
						<span data-tags="ti-microphone-alt" data-group="themify" class="ti-microphone-alt"></span> \
						<span data-tags="ti-magnet" data-group="themify" class="ti-magnet"></span> \
						<span data-tags="ti-line-double" data-group="themify" class="ti-line-double"></span> \
						<span data-tags="ti-line-dotted" data-group="themify" class="ti-line-dotted"></span> \
						<span data-tags="ti-line-dashed" data-group="themify" class="ti-line-dashed"></span> \
						<span data-tags="ti-ink-pen" data-group="themify" class="ti-ink-pen"></span> \
						<span data-tags="ti-info-alt" data-group="themify" class="ti-info-alt"></span> \
						<span data-tags="ti-help-alt" data-group="themify" class="ti-help-alt"></span> \
						<span data-tags="ti-headphone-alt" data-group="themify" class="ti-headphone-alt"></span> \
						<span data-tags="ti-gallery" data-group="themify" class="ti-gallery"></span> \
						<span data-tags="ti-face-smile" data-group="themify" class="ti-face-smile"></span> \
						<span data-tags="ti-face-sad" data-group="themify" class="ti-face-sad"></span> \
						<span data-tags="ti-credit-card" data-group="themify" class="ti-credit-card"></span> \
						<span data-tags="ti-comments-smiley" data-group="themify" class="ti-comments-smiley"></span> \
						<span data-tags="ti-time" data-group="themify" class="ti-time"></span> \
						<span data-tags="ti-share" data-group="themify" class="ti-share"></span> \
						<span data-tags="ti-share-alt" data-group="themify" class="ti-share-alt"></span> \
						<span data-tags="ti-rocket" data-group="themify" class="ti-rocket"></span> \
						<span data-tags="ti-new-window" data-group="themify" class="ti-new-window"></span> \
						<span data-tags="ti-rss" data-group="themify" class="ti-rss"></span> \
						<span data-tags="ti-rss-alt" data-group="themify" class="ti-rss-alt"></span> \
						<span data-tags="ti-control-stop" data-group="themify" class="ti-control-stop"></span> \
						<span data-tags="ti-control-shuffle" data-group="themify" class="ti-control-shuffle"></span> \
						<span data-tags="ti-control-play" data-group="themify" class="ti-control-play"></span> \
						<span data-tags="ti-control-pause" data-group="themify" class="ti-control-pause"></span> \
						<span data-tags="ti-control-forward" data-group="themify" class="ti-control-forward"></span> \
						<span data-tags="ti-control-backward" data-group="themify" class="ti-control-backward"></span> \
						<span data-tags="ti-volume" data-group="themify" class="ti-volume"></span> \
						<span data-tags="ti-control-skip-forward" data-group="themify" class="ti-control-skip-forward"></span> \
						<span data-tags="ti-control-skip-backward" data-group="themify" class="ti-control-skip-backward"></span> \
						<span data-tags="ti-control-record" data-group="themify" class="ti-control-record"></span> \
						<span data-tags="ti-control-eject" data-group="themify" class="ti-control-eject"></span> \
						<span data-tags="ti-paragraph" data-group="themify" class="ti-paragraph"></span> \
						<span data-tags="ti-uppercase" data-group="themify" class="ti-uppercase"></span> \
						<span data-tags="ti-underline" data-group="themify" class="ti-underline"></span> \
						<span data-tags="ti-text" data-group="themify" class="ti-text"></span> \
						<span data-tags="ti-Italic" data-group="themify" class="ti-Italic"></span> \
						<span data-tags="ti-smallcap" data-group="themify" class="ti-smallcap"></span> \
						<span data-tags="ti-list" data-group="themify" class="ti-list"></span> \
						<span data-tags="ti-list-ol" data-group="themify" class="ti-list-ol"></span> \
						<span data-tags="ti-align-right" data-group="themify" class="ti-align-right"></span> \
						<span data-tags="ti-align-left" data-group="themify" class="ti-align-left"></span> \
						<span data-tags="ti-align-justify" data-group="themify" class="ti-align-justify"></span> \
						<span data-tags="ti-align-center" data-group="themify" class="ti-align-center"></span> \
						<span data-tags="ti-quote-right" data-group="themify" class="ti-quote-right"></span> \
						<span data-tags="ti-quote-left" data-group="themify" class="ti-quote-left"></span> \
						<span data-tags="ti-layout-width-full" data-group="themify" class="ti-layout-width-full"></span> \
						<span data-tags="ti-layout-width-default" data-group="themify" class="ti-layout-width-default"></span> \
						<span data-tags="ti-layout-width-default-alt" data-group="themify" class="ti-layout-width-default-alt"></span> \
						<span data-tags="ti-layout-tab" data-group="themify" class="ti-layout-tab"></span> \
						<span data-tags="ti-layout-tab-window" data-group="themify" class="ti-layout-tab-window"></span> \
						<span data-tags="ti-layout-tab-v" data-group="themify" class="ti-layout-tab-v"></span> \
						<span data-tags="ti-layout-tab-min" data-group="themify" class="ti-layout-tab-min"></span> \
						<span data-tags="ti-layout-slider" data-group="themify" class="ti-layout-slider"></span> \
						<span data-tags="ti-layout-slider-alt" data-group="themify" class="ti-layout-slider-alt"></span> \
						<span data-tags="ti-layout-sidebar-right" data-group="themify" class="ti-layout-sidebar-right"></span> \
						<span data-tags="ti-layout-sidebar-none" data-group="themify" class="ti-layout-sidebar-none"></span> \
						<span data-tags="ti-layout-sidebar-left" data-group="themify" class="ti-layout-sidebar-left"></span> \
						<span data-tags="ti-layout-placeholder" data-group="themify" class="ti-layout-placeholder"></span> \
						<span data-tags="ti-layout-menu" data-group="themify" class="ti-layout-menu"></span> \
						<span data-tags="ti-layout-menu-v" data-group="themify" class="ti-layout-menu-v"></span> \
						<span data-tags="ti-layout-menu-separated" data-group="themify" class="ti-layout-menu-separated"></span> \
						<span data-tags="ti-layout-menu-full" data-group="themify" class="ti-layout-menu-full"></span> \
						<span data-tags="ti-layout-media-right" data-group="themify" class="ti-layout-media-right"></span> \
						<span data-tags="ti-layout-media-right-alt" data-group="themify" class="ti-layout-media-right-alt"></span> \
						<span data-tags="ti-layout-media-overlay" data-group="themify" class="ti-layout-media-overlay"></span> \
						<span data-tags="ti-layout-media-overlay-alt" data-group="themify" class="ti-layout-media-overlay-alt"></span> \
						<span data-tags="ti-layout-media-overlay-alt-2" data-group="themify" class="ti-layout-media-overlay-alt-2"></span> \
						<span data-tags="ti-layout-media-left" data-group="themify" class="ti-layout-media-left"></span> \
						<span data-tags="ti-layout-media-left-alt" data-group="themify" class="ti-layout-media-left-alt"></span> \
						<span data-tags="ti-layout-media-center" data-group="themify" class="ti-layout-media-center"></span> \
						<span data-tags="ti-layout-media-center-alt" data-group="themify" class="ti-layout-media-center-alt"></span> \
						<span data-tags="ti-layout-list-thumb" data-group="themify" class="ti-layout-list-thumb"></span> \
						<span data-tags="ti-layout-list-thumb-alt" data-group="themify" class="ti-layout-list-thumb-alt"></span> \
						<span data-tags="ti-layout-list-post" data-group="themify" class="ti-layout-list-post"></span> \
						<span data-tags="ti-layout-list-large-image" data-group="themify" class="ti-layout-list-large-image"></span> \
						<span data-tags="ti-layout-line-solid" data-group="themify" class="ti-layout-line-solid"></span> \
						<span data-tags="ti-layout-grid4" data-group="themify" class="ti-layout-grid4"></span> \
						<span data-tags="ti-layout-grid3" data-group="themify" class="ti-layout-grid3"></span> \
						<span data-tags="ti-layout-grid2" data-group="themify" class="ti-layout-grid2"></span> \
						<span data-tags="ti-layout-grid2-thumb" data-group="themify" class="ti-layout-grid2-thumb"></span> \
						<span data-tags="ti-layout-cta-right" data-group="themify" class="ti-layout-cta-right"></span> \
						<span data-tags="ti-layout-cta-left" data-group="themify" class="ti-layout-cta-left"></span> \
						<span data-tags="ti-layout-cta-center" data-group="themify" class="ti-layout-cta-center"></span> \
						<span data-tags="ti-layout-cta-btn-right" data-group="themify" class="ti-layout-cta-btn-right"></span> \
						<span data-tags="ti-layout-cta-btn-left" data-group="themify" class="ti-layout-cta-btn-left"></span> \
						<span data-tags="ti-layout-column4" data-group="themify" class="ti-layout-column4"></span> \
						<span data-tags="ti-layout-column3" data-group="themify" class="ti-layout-column3"></span> \
						<span data-tags="ti-layout-column2" data-group="themify" class="ti-layout-column2"></span> \
						<span data-tags="ti-layout-accordion-separated" data-group="themify" class="ti-layout-accordion-separated"></span> \
						<span data-tags="ti-layout-accordion-merged" data-group="themify" class="ti-layout-accordion-merged"></span> \
						<span data-tags="ti-layout-accordion-list" data-group="themify" class="ti-layout-accordion-list"></span> \
						<span data-tags="ti-widgetized" data-group="themify" class="ti-widgetized"></span> \
						<span data-tags="ti-widget" data-group="themify" class="ti-widget"></span> \
						<span data-tags="ti-widget-alt" data-group="themify" class="ti-widget-alt"></span> \
						<span data-tags="ti-view-list" data-group="themify" class="ti-view-list"></span> \
						<span data-tags="ti-view-list-alt" data-group="themify" class="ti-view-list-alt"></span> \
						<span data-tags="ti-view-grid" data-group="themify" class="ti-view-grid"></span> \
						<span data-tags="ti-upload" data-group="themify" class="ti-upload"></span> \
						<span data-tags="ti-download" data-group="themify" class="ti-download"></span> \
						<span data-tags="ti-loop" data-group="themify" class="ti-loop"></span> \
						<span data-tags="ti-layout-sidebar-2" data-group="themify" class="ti-layout-sidebar-2"></span> \
						<span data-tags="ti-layout-grid4-alt" data-group="themify" class="ti-layout-grid4-alt"></span> \
						<span data-tags="ti-layout-grid3-alt" data-group="themify" class="ti-layout-grid3-alt"></span> \
						<span data-tags="ti-layout-grid2-alt" data-group="themify" class="ti-layout-grid2-alt"></span> \
						<span data-tags="ti-layout-column4-alt" data-group="themify" class="ti-layout-column4-alt"></span> \
						<span data-tags="ti-layout-column3-alt" data-group="themify" class="ti-layout-column3-alt"></span> \
						<span data-tags="ti-layout-column2-alt" data-group="themify" class="ti-layout-column2-alt"></span> \
						<span data-tags="ti-flickr" data-group="themify" class="ti-flickr"></span> \
						<span data-tags="ti-flickr-alt" data-group="themify" class="ti-flickr-alt"></span> \
						<span data-tags="ti-instagram" data-group="themify" class="ti-instagram"></span> \
						<span data-tags="ti-google" data-group="themify" class="ti-google"></span> \
						<span data-tags="ti-github" data-group="themify" class="ti-github"></span> \
						<span data-tags="ti-facebook" data-group="themify" class="ti-facebook"></span> \
						<span data-tags="ti-dropbox" data-group="themify" class="ti-dropbox"></span> \
						<span data-tags="ti-dropbox-alt" data-group="themify" class="ti-dropbox-alt"></span> \
						<span data-tags="ti-dribbble" data-group="themify" class="ti-dribbble"></span> \
						<span data-tags="ti-apple" data-group="themify" class="ti-apple"></span> \
						<span data-tags="ti-android" data-group="themify" class="ti-android"></span> \
						<span data-tags="ti-yahoo" data-group="themify" class="ti-yahoo"></span> \
						<span data-tags="ti-trello" data-group="themify" class="ti-trello"></span> \
						<span data-tags="ti-stack-overflow" data-group="themify" class="ti-stack-overflow"></span> \
						<span data-tags="ti-soundcloud" data-group="themify" class="ti-soundcloud"></span> \
						<span data-tags="ti-sharethis" data-group="themify" class="ti-sharethis"></span> \
						<span data-tags="ti-sharethis-alt" data-group="themify" class="ti-sharethis-alt"></span> \
						<span data-tags="ti-reddit" data-group="themify" class="ti-reddit"></span> \
						<span data-tags="ti-microsoft" data-group="themify" class="ti-microsoft"></span> \
						<span data-tags="ti-microsoft-alt" data-group="themify" class="ti-microsoft-alt"></span> \
						<span data-tags="ti-linux" data-group="themify" class="ti-linux"></span> \
						<span data-tags="ti-jsfiddle" data-group="themify" class="ti-jsfiddle"></span> \
						<span data-tags="ti-joomla" data-group="themify" class="ti-joomla"></span> \
						<span data-tags="ti-html5" data-group="themify" class="ti-html5"></span> \
						<span data-tags="ti-css3" data-group="themify" class="ti-css3"></span> \
						<span data-tags="ti-drupal" data-group="themify" class="ti-drupal"></span> \
						<span data-tags="ti-wordpress" data-group="themify" class="ti-wordpress"></span> \
						<span data-tags="ti-tumblr" data-group="themify" class="ti-tumblr"></span> \
						<span data-tags="ti-tumblr-alt" data-group="themify" class="ti-tumblr-alt"></span> \
						<span data-tags="ti-skype" data-group="themify" class="ti-skype"></span> \
						<span data-tags="ti-youtube" data-group="themify" class="ti-youtube"></span> \
						<span data-tags="ti-vimeo" data-group="themify" class="ti-vimeo"></span> \
						<span data-tags="ti-vimeo-alt" data-group="themify" class="ti-vimeo-alt"></span> \
						<span data-tags="ti-twitter" data-group="themify" class="ti-twitter"></span> \
						<span data-tags="ti-twitter-alt" data-group="themify" class="ti-twitter-alt"></span> \
						<span data-tags="ti-linkedin" data-group="themify" class="ti-linkedin"></span> \
						<span data-tags="ti-pinterest" data-group="themify" class="ti-pinterest"></span> \
						<span data-tags="ti-pinterest-alt" data-group="themify" class="ti-pinterest-alt"></span> \
						<span data-tags="ti-themify-logo" data-group="themify" class="ti-themify-logo"></span> \
						<span data-tags="ti-themify-favicon" data-group="themify" class="ti-themify-favicon"></span> \
						<span data-tags="ti-themify-favicon-alt" data-group="themify" class="ti-themify-favicon-alt"></span> \
						<span class="typcn typcn-adjust-brightness" data-group="typeicons" data-tags="sun adjust brightness "></span><span class="typcn typcn-adjust-contrast" data-group="typeicons" data-tags="half adjust contrast "></span><span class="typcn typcn-anchor-outline" data-group="typeicons" data-tags=" anchor outline "></span><span class="typcn typcn-anchor" data-group="typeicons" data-tags=" anchor "></span><span class="typcn typcn-archive" data-group="typeicons" data-tags=" archive "></span><span class="typcn typcn-arrow-back-outline" data-group="typeicons" data-tags=" arrow back outline "></span><span class="typcn typcn-arrow-back" data-group="typeicons" data-tags=" arrow back "></span><span class="typcn typcn-arrow-down-outline" data-group="typeicons" data-tags=" arrow down outline "></span><span class="typcn typcn-arrow-down-thick" data-group="typeicons" data-tags=" arrow down thick "></span><span class="typcn typcn-arrow-down" data-group="typeicons" data-tags=" arrow down "></span><span class="typcn typcn-arrow-forward-outline" data-group="typeicons" data-tags=" arrow forward outline "></span><span class="typcn typcn-arrow-forward" data-group="typeicons" data-tags=" arrow forward "></span><span class="typcn typcn-arrow-left-outline" data-group="typeicons" data-tags=" arrow left outline "></span><span class="typcn typcn-arrow-left-thick" data-group="typeicons" data-tags=" arrow left thick "></span><span class="typcn typcn-arrow-left" data-group="typeicons" data-tags=" arrow left "></span><span class="typcn typcn-arrow-loop-outline" data-group="typeicons" data-tags=" arrow loop outline "></span><span class="typcn typcn-arrow-loop" data-group="typeicons" data-tags=" arrow loop "></span><span class="typcn typcn-arrow-maximise-outline" data-group="typeicons" data-tags=" arrow maximise outline "></span><span class="typcn typcn-arrow-maximise" data-group="typeicons" data-tags=" arrow maximise "></span><span class="typcn typcn-arrow-minimise-outline" data-group="typeicons" data-tags=" arrow minimise outline "></span><span class="typcn typcn-arrow-minimise" data-group="typeicons" data-tags=" arrow minimise "></span><span class="typcn typcn-arrow-move-outline" data-group="typeicons" data-tags=" arrow move outline "></span><span class="typcn typcn-arrow-move" data-group="typeicons" data-tags=" arrow move "></span><span class="typcn typcn-arrow-repeat-outline" data-group="typeicons" data-tags=" arrow repeat outline "></span><span class="typcn typcn-arrow-repeat" data-group="typeicons" data-tags=" arrow repeat "></span><span class="typcn typcn-arrow-right-outline" data-group="typeicons" data-tags=" arrow right outline "></span><span class="typcn typcn-arrow-right-thick" data-group="typeicons" data-tags=" arrow right thick "></span><span class="typcn typcn-arrow-right" data-group="typeicons" data-tags=" arrow right "></span><span class="typcn typcn-arrow-shuffle" data-group="typeicons" data-tags=" arrow shuffle "></span><span class="typcn typcn-arrow-sorted-down" data-group="typeicons" data-tags=" arrow sorted down "></span><span class="typcn typcn-arrow-sorted-up" data-group="typeicons" data-tags=" arrow sorted up "></span><span class="typcn typcn-arrow-sync-outline" data-group="typeicons" data-tags=" arrow sync outline "></span><span class="typcn typcn-arrow-sync" data-group="typeicons" data-tags=" arrow sync "></span><span class="typcn typcn-arrow-unsorted" data-group="typeicons" data-tags=" arrow unsorted "></span><span class="typcn typcn-arrow-up-outline" data-group="typeicons" data-tags=" arrow up outline "></span><span class="typcn typcn-arrow-up-thick" data-group="typeicons" data-tags=" arrow up thick "></span><span class="typcn typcn-arrow-up" data-group="typeicons" data-tags=" arrow up "></span><span class="typcn typcn-at" data-group="typeicons" data-tags=" at "></span><span class="typcn typcn-attachment-outline" data-group="typeicons" data-tags=" attachment outline "></span><span class="typcn typcn-attachment" data-group="typeicons" data-tags=" attachment "></span><span class="typcn typcn-backspace-outline" data-group="typeicons" data-tags="delete backspace outline "></span><span class="typcn typcn-backspace" data-group="typeicons" data-tags="delete backspace "></span><span class="typcn typcn-battery-charge" data-group="typeicons" data-tags="power battery charge "></span><span class="typcn typcn-battery-full" data-group="typeicons" data-tags="power battery full "></span><span class="typcn typcn-battery-high" data-group="typeicons" data-tags="power battery high "></span><span class="typcn typcn-battery-low" data-group="typeicons" data-tags="power battery low "></span><span class="typcn typcn-battery-mid" data-group="typeicons" data-tags="power battery mid "></span><span class="typcn typcn-beaker" data-group="typeicons" data-tags="lab,beta,experiment beaker "></span><span class="typcn typcn-beer" data-group="typeicons" data-tags="ale,lager beer "></span><span class="typcn typcn-bell" data-group="typeicons" data-tags="tone,alarm bell "></span><span class="typcn typcn-book" data-group="typeicons" data-tags=" book "></span><span class="typcn typcn-bookmark" data-group="typeicons" data-tags="banner,flag bookmark "></span><span class="typcn typcn-briefcase" data-group="typeicons" data-tags=" briefcase "></span><span class="typcn typcn-brush" data-group="typeicons" data-tags=" brush "></span><span class="typcn typcn-business-card" data-group="typeicons" data-tags="id business card "></span><span class="typcn typcn-calculator" data-group="typeicons" data-tags=" calculator "></span><span class="typcn typcn-calendar-outline" data-group="typeicons" data-tags=" calendar outline "></span><span class="typcn typcn-calendar" data-group="typeicons" data-tags=" calendar "></span><span class="typcn typcn-camera-outline" data-group="typeicons" data-tags=" camera outline "></span><span class="typcn typcn-camera" data-group="typeicons" data-tags="photo camera "></span><span class="typcn typcn-cancel-outline" data-group="typeicons" data-tags="photo cancel outline "></span><span class="typcn typcn-cancel" data-group="typeicons" data-tags=" cancel "></span><span class="typcn typcn-chart-area-outline" data-group="typeicons" data-tags="graph chart area outline "></span><span class="typcn typcn-chart-area" data-group="typeicons" data-tags="graph chart area "></span><span class="typcn typcn-chart-bar-outline" data-group="typeicons" data-tags="graph chart bar outline "></span><span class="typcn typcn-chart-bar" data-group="typeicons" data-tags="graph chart bar "></span><span class="typcn typcn-chart-line-outline" data-group="typeicons" data-tags="graph chart line outline "></span><span class="typcn typcn-chart-line" data-group="typeicons" data-tags="graph chart line "></span><span class="typcn typcn-chart-pie-outline" data-group="typeicons" data-tags="graph chart pie outline "></span><span class="typcn typcn-chart-pie" data-group="typeicons" data-tags="graph chart pie "></span><span class="typcn typcn-chevron-left-outline" data-group="typeicons" data-tags="less than chevron left outline "></span><span class="typcn typcn-chevron-left" data-group="typeicons" data-tags="less than chevron left "></span><span class="typcn typcn-chevron-right-outline" data-group="typeicons" data-tags="greater than chevron right outline "></span><span class="typcn typcn-chevron-right" data-group="typeicons" data-tags="greater than chevron right "></span><span class="typcn typcn-clipboard" data-group="typeicons" data-tags="copy clipboard "></span><span class="typcn typcn-cloud-storage" data-group="typeicons" data-tags="data,upload cloud storage "></span><span class="typcn typcn-cloud-storage-outline" data-group="typeicons" data-tags="data,upload cloud storage outline "></span><span class="typcn typcn-code-outline" data-group="typeicons" data-tags="tag code outline "></span><span class="typcn typcn-code" data-group="typeicons" data-tags="tag code "></span><span class="typcn typcn-coffee" data-group="typeicons" data-tags="beverage coffee "></span><span class="typcn typcn-cog-outline" data-group="typeicons" data-tags="settings cog outline "></span><span class="typcn typcn-cog" data-group="typeicons" data-tags="settings cog "></span><span class="typcn typcn-compass" data-group="typeicons" data-tags="safari compass "></span><span class="typcn typcn-contacts" data-group="typeicons" data-tags="address,book contacts "></span><span class="typcn typcn-credit-card" data-group="typeicons" data-tags="payment credit card "></span><span class="typcn typcn-css3" data-group="typeicons" data-tags=" css3 "></span><span class="typcn typcn-database" data-group="typeicons" data-tags="db database "></span><span class="typcn typcn-delete-outline" data-group="typeicons" data-tags="cross,close delete outline "></span><span class="typcn typcn-delete" data-group="typeicons" data-tags="cross,close delete "></span><span class="typcn typcn-device-desktop" data-group="typeicons" data-tags="pc,mac device desktop "></span><span class="typcn typcn-device-laptop" data-group="typeicons" data-tags="notebook,macbook device laptop "></span><span class="typcn typcn-device-phone" data-group="typeicons" data-tags="iphone device phone "></span><span class="typcn typcn-device-tablet" data-group="typeicons" data-tags="ipad device tablet "></span><span class="typcn typcn-directions" data-group="typeicons" data-tags=" directions "></span><span class="typcn typcn-divide-outline" data-group="typeicons" data-tags="division divide outline "></span><span class="typcn typcn-divide" data-group="typeicons" data-tags="division divide "></span><span class="typcn typcn-document-add" data-group="typeicons" data-tags="file document add "></span><span class="typcn typcn-document-delete" data-group="typeicons" data-tags="file document delete "></span><span class="typcn typcn-document-text" data-group="typeicons" data-tags="file document text "></span><span class="typcn typcn-document" data-group="typeicons" data-tags="file document "></span><span class="typcn typcn-download-outline" data-group="typeicons" data-tags=" download outline "></span><span class="typcn typcn-download" data-group="typeicons" data-tags=" download "></span><span class="typcn typcn-dropbox" data-group="typeicons" data-tags=" dropbox "></span><span class="typcn typcn-edit" data-group="typeicons" data-tags="pencil edit "></span><span class="typcn typcn-eject-outline" data-group="typeicons" data-tags="export,log,off,out eject outline "></span><span class="typcn typcn-eject" data-group="typeicons" data-tags="export,log,off,out eject "></span><span class="typcn typcn-equals-outline" data-group="typeicons" data-tags=" equals outline "></span><span class="typcn typcn-equals" data-group="typeicons" data-tags=" equals "></span><span class="typcn typcn-export-outline" data-group="typeicons" data-tags="share export outline "></span><span class="typcn typcn-export" data-group="typeicons" data-tags="share export "></span><span class="typcn typcn-eye-outline" data-group="typeicons" data-tags="view eye outline "></span><span class="typcn typcn-eye" data-group="typeicons" data-tags="view eye "></span><span class="typcn typcn-feather" data-group="typeicons" data-tags=" feather "></span><span class="typcn typcn-film" data-group="typeicons" data-tags="strip film "></span><span class="typcn typcn-filter" data-group="typeicons" data-tags="funnel,refine filter "></span><span class="typcn typcn-flag-outline" data-group="typeicons" data-tags=" flag outline "></span><span class="typcn typcn-flag" data-group="typeicons" data-tags=" flag "></span><span class="typcn typcn-flash-outline" data-group="typeicons" data-tags="power,lightning flash outline "></span><span class="typcn typcn-flash" data-group="typeicons" data-tags="power,lightning flash "></span><span class="typcn typcn-flow-children" data-group="typeicons" data-tags=" flow children "></span><span class="typcn typcn-flow-merge" data-group="typeicons" data-tags=" flow merge "></span><span class="typcn typcn-flow-parallel" data-group="typeicons" data-tags=" flow parallel "></span><span class="typcn typcn-flow-switch" data-group="typeicons" data-tags=" flow switch "></span><span class="typcn typcn-folder-add" data-group="typeicons" data-tags="directory folder add "></span><span class="typcn typcn-folder-delete" data-group="typeicons" data-tags="directory folder delete "></span><span class="typcn typcn-folder-open" data-group="typeicons" data-tags="directory folder open "></span><span class="typcn typcn-folder" data-group="typeicons" data-tags="directory folder "></span><span class="typcn typcn-gift" data-group="typeicons" data-tags="present gift "></span><span class="typcn typcn-globe-outline" data-group="typeicons" data-tags=" globe outline "></span><span class="typcn typcn-globe" data-group="typeicons" data-tags=" globe "></span><span class="typcn typcn-group-outline" data-group="typeicons" data-tags="users group outline "></span><span class="typcn typcn-group" data-group="typeicons" data-tags="users group "></span><span class="typcn typcn-headphones" data-group="typeicons" data-tags=" headphones "></span><span class="typcn typcn-heart-full-outline" data-group="typeicons" data-tags="like,favourite,love heart full outline "></span><span class="typcn typcn-heart-half-outline" data-group="typeicons" data-tags="like,favourite,love heart half outline "></span><span class="typcn typcn-heart-outline" data-group="typeicons" data-tags="like,favourite,love heart outline "></span><span class="typcn typcn-heart" data-group="typeicons" data-tags="like,favourite,love heart "></span><span class="typcn typcn-home-outline" data-group="typeicons" data-tags=" home outline "></span><span class="typcn typcn-home" data-group="typeicons" data-tags=" home "></span><span class="typcn typcn-html5" data-group="typeicons" data-tags=" html5 "></span><span class="typcn typcn-image-outline" data-group="typeicons" data-tags="picture,photo image outline "></span><span class="typcn typcn-image" data-group="typeicons" data-tags="picture,photo image "></span><span class="typcn typcn-infinity-outline" data-group="typeicons" data-tags=" infinity outline "></span><span class="typcn typcn-infinity" data-group="typeicons" data-tags=" infinity "></span><span class="typcn typcn-info-large-outline" data-group="typeicons" data-tags=" info large outline "></span><span class="typcn typcn-info-large" data-group="typeicons" data-tags=" info large "></span><span class="typcn typcn-info-outline" data-group="typeicons" data-tags=" info outline "></span><span class="typcn typcn-info" data-group="typeicons" data-tags=" info "></span><span class="typcn typcn-input-checked-outline" data-group="typeicons" data-tags="tick,correct input checked outline "></span><span class="typcn typcn-input-checked" data-group="typeicons" data-tags="tick,correct input checked "></span><span class="typcn typcn-key-outline" data-group="typeicons" data-tags="password,login key outline "></span><span class="typcn typcn-key" data-group="typeicons" data-tags="password,login key "></span><span class="typcn typcn-keyboard" data-group="typeicons" data-tags=" keyboard "></span><span class="typcn typcn-leaf" data-group="typeicons" data-tags=" leaf "></span><span class="typcn typcn-lightbulb" data-group="typeicons" data-tags="idea lightbulb "></span><span class="typcn typcn-link-outline" data-group="typeicons" data-tags="chain link outline "></span><span class="typcn typcn-link" data-group="typeicons" data-tags="chain link "></span><span class="typcn typcn-location-arrow-outline" data-group="typeicons" data-tags="direction location arrow outline "></span><span class="typcn typcn-location-arrow" data-group="typeicons" data-tags="direction location arrow "></span><span class="typcn typcn-location-outline" data-group="typeicons" data-tags="map,pin location outline "></span><span class="typcn typcn-location" data-group="typeicons" data-tags="map,pin location "></span><span class="typcn typcn-lock-closed-outline" data-group="typeicons" data-tags="locked lock closed outline "></span><span class="typcn typcn-lock-closed" data-group="typeicons" data-tags="locked lock closed "></span><span class="typcn typcn-lock-open-outline" data-group="typeicons" data-tags=" lock open outline "></span><span class="typcn typcn-lock-open" data-group="typeicons" data-tags=" lock open "></span><span class="typcn typcn-mail" data-group="typeicons" data-tags="email mail "></span><span class="typcn typcn-map" data-group="typeicons" data-tags="brochure,pamphlet map "></span><span class="typcn typcn-media-eject-outline" data-group="typeicons" data-tags=" media eject outline "></span><span class="typcn typcn-media-eject" data-group="typeicons" data-tags=" media eject "></span><span class="typcn typcn-media-fast-forward-outline" data-group="typeicons" data-tags=" media fast forward outline "></span><span class="typcn typcn-media-fast-forward" data-group="typeicons" data-tags=" media fast forward "></span><span class="typcn typcn-media-pause-outline" data-group="typeicons" data-tags=" media pause outline "></span><span class="typcn typcn-media-pause" data-group="typeicons" data-tags=" media pause "></span><span class="typcn typcn-media-play-outline" data-group="typeicons" data-tags=" media play outline "></span><span class="typcn typcn-media-play-reverse-outline" data-group="typeicons" data-tags=" media play reverse outline "></span><span class="typcn typcn-media-play-reverse" data-group="typeicons" data-tags=" media play reverse "></span><span class="typcn typcn-media-play" data-group="typeicons" data-tags=" media play "></span><span class="typcn typcn-media-record-outline" data-group="typeicons" data-tags=" media record outline "></span><span class="typcn typcn-media-record" data-group="typeicons" data-tags=" media record "></span><span class="typcn typcn-media-rewind-outline" data-group="typeicons" data-tags=" media rewind outline "></span><span class="typcn typcn-media-rewind" data-group="typeicons" data-tags=" media rewind "></span><span class="typcn typcn-media-stop-outline" data-group="typeicons" data-tags=" media stop outline "></span><span class="typcn typcn-media-stop" data-group="typeicons" data-tags=" media stop "></span><span class="typcn typcn-message-typing" data-group="typeicons" data-tags="msg,chat message typing "></span><span class="typcn typcn-message" data-group="typeicons" data-tags="msg,chat message "></span><span class="typcn typcn-messages" data-group="typeicons" data-tags="msg,chat messages "></span><span class="typcn typcn-microphone-outline" data-group="typeicons" data-tags="record microphone outline "></span><span class="typcn typcn-microphone" data-group="typeicons" data-tags="record microphone "></span><span class="typcn typcn-minus-outline" data-group="typeicons" data-tags="subtract minus outline "></span><span class="typcn typcn-minus" data-group="typeicons" data-tags="subtract minus "></span><span class="typcn typcn-mortar-board" data-group="typeicons" data-tags=" mortar board "></span><span class="typcn typcn-news" data-group="typeicons" data-tags="article news "></span><span class="typcn typcn-notes-outline" data-group="typeicons" data-tags="music notes outline "></span><span class="typcn typcn-notes" data-group="typeicons" data-tags="music notes "></span><span class="typcn typcn-pen" data-group="typeicons" data-tags="write,compose pen "></span><span class="typcn typcn-pencil" data-group="typeicons" data-tags="write,compose pencil "></span><span class="typcn typcn-phone-outline" data-group="typeicons" data-tags="call,ring phone outline "></span><span class="typcn typcn-phone" data-group="typeicons" data-tags="call,ring phone "></span><span class="typcn typcn-pi-outline" data-group="typeicons" data-tags=" pi outline "></span><span class="typcn typcn-pi" data-group="typeicons" data-tags=" pi "></span><span class="typcn typcn-pin-outline" data-group="typeicons" data-tags=" pin outline "></span><span class="typcn typcn-pin" data-group="typeicons" data-tags=" pin "></span><span class="typcn typcn-pipette" data-group="typeicons" data-tags="picker pipette "></span><span class="typcn typcn-plane-outline" data-group="typeicons" data-tags="flight plane outline "></span><span class="typcn typcn-plane" data-group="typeicons" data-tags="flight plane "></span><span class="typcn typcn-plug" data-group="typeicons" data-tags="connect plug "></span><span class="typcn typcn-plus-outline" data-group="typeicons" data-tags="add plus outline "></span><span class="typcn typcn-plus" data-group="typeicons" data-tags="add plus "></span><span class="typcn typcn-point-of-interest-outline" data-group="typeicons" data-tags="command point of interest outline "></span><span class="typcn typcn-point-of-interest" data-group="typeicons" data-tags="command point of interest "></span><span class="typcn typcn-power-outline" data-group="typeicons" data-tags="on,off power outline "></span><span class="typcn typcn-power" data-group="typeicons" data-tags="on,off power "></span><span class="typcn typcn-printer" data-group="typeicons" data-tags="fax printer "></span><span class="typcn typcn-puzzle-outline" data-group="typeicons" data-tags="jigsaw puzzle outline "></span><span class="typcn typcn-puzzle" data-group="typeicons" data-tags="jigsaw puzzle "></span><span class="typcn typcn-radar-outline" data-group="typeicons" data-tags="position radar outline "></span><span class="typcn typcn-radar" data-group="typeicons" data-tags="position radar "></span><span class="typcn typcn-refresh-outline" data-group="typeicons" data-tags="arrow refresh outline "></span><span class="typcn typcn-refresh" data-group="typeicons" data-tags="arrow refresh "></span><span class="typcn typcn-rss-outline" data-group="typeicons" data-tags="feed rss outline "></span><span class="typcn typcn-rss" data-group="typeicons" data-tags="feed rss "></span><span class="typcn typcn-scissors-outline" data-group="typeicons" data-tags="cut scissors outline "></span><span class="typcn typcn-scissors" data-group="typeicons" data-tags="cut scissors "></span><span class="typcn typcn-shopping-bag" data-group="typeicons" data-tags=" shopping bag "></span><span class="typcn typcn-shopping-cart" data-group="typeicons" data-tags=" shopping cart "></span><span class="typcn typcn-social-at-circular" data-group="typeicons" data-tags="@,mail social at circular "></span><span class="typcn typcn-social-dribbble-circular" data-group="typeicons" data-tags=" social dribbble circular "></span><span class="typcn typcn-social-dribbble" data-group="typeicons" data-tags=" social dribbble "></span><span class="typcn typcn-social-facebook-circular" data-group="typeicons" data-tags=" social facebook circular "></span><span class="typcn typcn-social-facebook" data-group="typeicons" data-tags=" social facebook "></span><span class="typcn typcn-social-flickr-circular" data-group="typeicons" data-tags=" social flickr circular "></span><span class="typcn typcn-social-flickr" data-group="typeicons" data-tags=" social flickr "></span><span class="typcn typcn-social-github-circular" data-group="typeicons" data-tags=" social github circular "></span><span class="typcn typcn-social-github" data-group="typeicons" data-tags=" social github "></span><span class="typcn typcn-social-google-plus-circular" data-group="typeicons" data-tags=" social google plus circular "></span><span class="typcn typcn-social-google-plus" data-group="typeicons" data-tags=" social google plus "></span><span class="typcn typcn-social-instagram-circular" data-group="typeicons" data-tags=" social instagram circular "></span><span class="typcn typcn-social-instagram" data-group="typeicons" data-tags=" social instagram "></span><span class="typcn typcn-social-last-fm-circular" data-group="typeicons" data-tags=" social last fm circular "></span><span class="typcn typcn-social-last-fm" data-group="typeicons" data-tags=" social last fm "></span><span class="typcn typcn-social-linkedin-circular" data-group="typeicons" data-tags=" social linkedin circular "></span><span class="typcn typcn-social-linkedin" data-group="typeicons" data-tags=" social linkedin "></span><span class="typcn typcn-social-pinterest-circular" data-group="typeicons" data-tags=" social pinterest circular "></span><span class="typcn typcn-social-pinterest" data-group="typeicons" data-tags=" social pinterest "></span><span class="typcn typcn-social-skype-outline" data-group="typeicons" data-tags=" social skype outline "></span><span class="typcn typcn-social-skype" data-group="typeicons" data-tags=" social skype "></span><span class="typcn typcn-social-tumbler-circular" data-group="typeicons" data-tags=" social tumbler circular "></span><span class="typcn typcn-social-tumbler" data-group="typeicons" data-tags=" social tumbler "></span><span class="typcn typcn-social-twitter-circular" data-group="typeicons" data-tags=" social twitter circular "></span><span class="typcn typcn-social-twitter" data-group="typeicons" data-tags=" social twitter "></span><span class="typcn typcn-social-vimeo-circular" data-group="typeicons" data-tags=" social vimeo circular "></span><span class="typcn typcn-social-vimeo" data-group="typeicons" data-tags=" social vimeo "></span><span class="typcn typcn-social-youtube-circular" data-group="typeicons" data-tags=" social youtube circular "></span><span class="typcn typcn-social-youtube" data-group="typeicons" data-tags=" social youtube "></span><span class="typcn typcn-sort-alphabetically-outline" data-group="typeicons" data-tags="a-z sort alphabetically outline "></span><span class="typcn typcn-sort-alphabetically" data-group="typeicons" data-tags="a-z sort alphabetically "></span><span class="typcn typcn-sort-numerically-outline" data-group="typeicons" data-tags="123 sort numerically outline "></span><span class="typcn typcn-sort-numerically" data-group="typeicons" data-tags="123 sort numerically "></span><span class="typcn typcn-spanner-outline" data-group="typeicons" data-tags="settings spanner outline "></span><span class="typcn typcn-spanner" data-group="typeicons" data-tags="settings spanner "></span><span class="typcn typcn-spiral" data-group="typeicons" data-tags="curve spiral "></span><span class="typcn typcn-star-full-outline" data-group="typeicons" data-tags="like,favourite,love,rate star full outline "></span><span class="typcn typcn-star-half-outline" data-group="typeicons" data-tags="like,favourite,love,rate star half outline "></span><span class="typcn typcn-star-half" data-group="typeicons" data-tags="like,favourite,love,rate star half "></span><span class="typcn typcn-star-outline" data-group="typeicons" data-tags="like,favourite,love,rate star outline "></span><span class="typcn typcn-star" data-group="typeicons" data-tags="like,favourite,love,rate star "></span><span class="typcn typcn-starburst-outline" data-group="typeicons" data-tags="banner,ribbon starburst outline "></span><span class="typcn typcn-starburst" data-group="typeicons" data-tags="banner,ribbon starburst "></span><span class="typcn typcn-stopwatch" data-group="typeicons" data-tags="time stopwatch "></span><span class="typcn typcn-support" data-group="typeicons" data-tags="life,ring support "></span><span class="typcn typcn-tabs-outline" data-group="typeicons" data-tags="expand,merge tabs outline "></span><span class="typcn typcn-tag" data-group="typeicons" data-tags=" tag "></span><span class="typcn typcn-tags" data-group="typeicons" data-tags=" tags "></span><span class="typcn typcn-th-large-outline" data-group="typeicons" data-tags="square,grid th large outline "></span><span class="typcn typcn-th-large" data-group="typeicons" data-tags="square,grid th large "></span><span class="typcn typcn-th-list-outline" data-group="typeicons" data-tags="thumbnail th list outline "></span><span class="typcn typcn-th-list" data-group="typeicons" data-tags="thumbnail th list "></span><span class="typcn typcn-th-menu-outline" data-group="typeicons" data-tags=" th menu outline "></span><span class="typcn typcn-th-menu" data-group="typeicons" data-tags=" th menu "></span><span class="typcn typcn-th-small-outline" data-group="typeicons" data-tags="square,grid th small outline "></span><span class="typcn typcn-th-small" data-group="typeicons" data-tags="square,grid th small "></span><span class="typcn typcn-thermometer" data-group="typeicons" data-tags="temperature thermometer "></span><span class="typcn typcn-thumbs-down" data-group="typeicons" data-tags="dislike thumbs down "></span><span class="typcn typcn-thumbs-ok" data-group="typeicons" data-tags="average thumbs ok "></span><span class="typcn typcn-thumbs-up" data-group="typeicons" data-tags="like thumbs up "></span><span class="typcn typcn-tick-outline" data-group="typeicons" data-tags="ok,done,correct tick outline "></span><span class="typcn typcn-tick" data-group="typeicons" data-tags="ok,done,correct tick "></span><span class="typcn typcn-ticket" data-group="typeicons" data-tags="pass ticket "></span><span class="typcn typcn-time" data-group="typeicons" data-tags="watch,clock time "></span><span class="typcn typcn-times-outline" data-group="typeicons" data-tags="cross,x times outline "></span><span class="typcn typcn-times" data-group="typeicons" data-tags="cross,x times "></span><span class="typcn typcn-trash" data-group="typeicons" data-tags="garbage,rubbish,delete trash "></span><span class="typcn typcn-tree" data-group="typeicons" data-tags=" tree "></span><span class="typcn typcn-upload-outline" data-group="typeicons" data-tags=" upload outline "></span><span class="typcn typcn-upload" data-group="typeicons" data-tags=" upload "></span><span class="typcn typcn-user-add-outline" data-group="typeicons" data-tags="person user add outline "></span><span class="typcn typcn-user-add" data-group="typeicons" data-tags="person user add "></span><span class="typcn typcn-user-delete-outline" data-group="typeicons" data-tags="person user delete outline "></span><span class="typcn typcn-user-delete" data-group="typeicons" data-tags="person user delete "></span><span class="typcn typcn-user-outline" data-group="typeicons" data-tags="person user outline "></span><span class="typcn typcn-user" data-group="typeicons" data-tags="person user "></span><span class="typcn typcn-vendor-android" data-group="typeicons" data-tags=" vendor android "></span><span class="typcn typcn-vendor-apple" data-group="typeicons" data-tags=" vendor apple "></span><span class="typcn typcn-vendor-microsoft" data-group="typeicons" data-tags=" vendor microsoft "></span><span class="typcn typcn-video-outline" data-group="typeicons" data-tags=" video outline "></span><span class="typcn typcn-video" data-group="typeicons" data-tags=" video "></span><span class="typcn typcn-volume-down" data-group="typeicons" data-tags="sound volume down "></span><span class="typcn typcn-volume-mute" data-group="typeicons" data-tags="sound volume mute "></span><span class="typcn typcn-volume-up" data-group="typeicons" data-tags="sound volume up "></span><span class="typcn typcn-volume" data-group="typeicons" data-tags="sound volume "></span><span class="typcn typcn-warning-outline" data-group="typeicons" data-tags="error,alert warning outline "></span><span class="typcn typcn-warning" data-group="typeicons" data-tags="error,alert warning "></span><span class="typcn typcn-watch" data-group="typeicons" data-tags="time watch "></span><span class="typcn typcn-waves-outline" data-group="typeicons" data-tags=" waves outline "></span><span class="typcn typcn-waves" data-group="typeicons" data-tags=" waves "></span><span class="typcn typcn-weather-cloudy" data-group="typeicons" data-tags=" weather cloudy "></span><span class="typcn typcn-weather-downpour" data-group="typeicons" data-tags=" weather downpour "></span><span class="typcn typcn-weather-night" data-group="typeicons" data-tags=" weather night "></span><span class="typcn typcn-weather-partly-sunny" data-group="typeicons" data-tags=" weather partly sunny "></span><span class="typcn typcn-weather-shower" data-group="typeicons" data-tags=" weather shower "></span><span class="typcn typcn-weather-snow" data-group="typeicons" data-tags=" weather snow "></span><span class="typcn typcn-weather-stormy" data-group="typeicons" data-tags=" weather stormy "></span><span class="typcn typcn-weather-sunny" data-group="typeicons" data-tags=" weather sunny "></span><span class="typcn typcn-weather-windy-cloudy" data-group="typeicons" data-tags=" weather windy cloudy "></span><span class="typcn typcn-weather-windy" data-group="typeicons" data-tags=" weather windy "></span><span class="typcn typcn-wi-fi-outline" data-group="typeicons" data-tags="internet,connection wi fi outline "></span><span class="typcn typcn-wi-fi" data-group="typeicons" data-tags="internet,connection wi fi "></span><span class="typcn typcn-wine" data-group="typeicons" data-tags="drink,beverage wine "></span><span class="typcn typcn-world-outline" data-group="typeicons" data-tags=" world outline "></span><span class="typcn typcn-world" data-group="typeicons" data-tags=" world "></span><span class="typcn typcn-zoom-in-outline" data-group="typeicons" data-tags=" zoom in outline "></span><span class="typcn typcn-zoom-in" data-group="typeicons" data-tags=" zoom in "></span><span class="typcn typcn-zoom-out-outline" data-group="typeicons" data-tags=" zoom out outline "></span><span class="typcn typcn-zoom-out" data-group="typeicons" data-tags=" zoom out "></span><span class="typcn typcn-zoom-outline" data-group="typeicons" data-tags=" zoom outline "></span><span class="typcn typcn-zoom" data-group="typeicons" data-tags=" zoom "></span>';
			string += '</div>';
			string += ' \
					<div class="icons_navigtation"> \
						<span class="icons_prev">« </span> \
						<span class="icons_pagination"></span> \
						<span class="icons_next"> » </span> \
					</div>';
			string += '</div>';

			return string;
		}

		var onNextClick = function () {
			var currentPage = parseInt(elements.itemsWrapper.attr("data-page"));
			if (currentPage == pagesNumber)
				return;

			elements.itemsWrapper.attr("data-page", currentPage + 1);

			currentPage = elements.itemsWrapper.attr("data-page");

			var newX = (currentPage - 1) * elements.itemsWrapper.width();

			mainWrapper.find(".icons_wrapper div:first-child, .icons_search_wrapper div:first-child").stop(true, false).animate({
				'margin-left' : '-' + newX + 'px'
			}, 500, function () {
				// Update pagination
				elements.pagination.text(currentPage + " / " + pagesNumber);
			});
		}

		var onKeyUp = function (e) {
			elements.itemsWrapper.find(".found_items").removeClass("found_items");

			var val = jQuery(this).val().toLowerCase();

			// if there is any input
			if (val.length > 0) {
				var group = elements.itemsWrapper.attr("data-group");
				var selector = (group == "all") ? "" : "[data-group='" + group + "']";
				var foundItems = elements.itemsWrapper.find(".icons_wrapper").find("span" + selector + "[class*='" + val + "']");

				// get the number of icons we need
				var searchIcons = foundItems.length;
				pagesNumber = Math.ceil(searchIcons / settings.itemsPerPage);

				// clone foundItems to search wrapper
				elements.itemsSearchWrapper.html(foundItems.clone());

				// Update pagination
				var firstPage = (searchIcons > 0) ? 1 : 0;
				elements.pagination.text(firstPage + " / " + pagesNumber);
				elements.itemsWrapper.attr("data-page", firstPage);

				// Add sections (pages) to icons
				for (i = 0; i <= pagesNumber; i++) {
					var from = settings.itemsPerPage * i;
					var to = (settings.itemsPerPage * i) + settings.itemsPerPage;
					elements.itemsWrapper.find('.icons_search_wrapper span').slice(from, to).wrapAll("<div></div>");
				}

				// update visuals
				elements.itemsWrapper.find(".icons_wrapper").hide();
				elements.itemsSearchWrapper.show();

			} else {

				// There is no input, show it all
				var currentDataGroup = elements.itemsWrapper.attr("data-group");
				elements.typesWrapper.find("span[data-type='" + currentDataGroup + "']").trigger("click");

				// update visuals
				elements.itemsWrapper.find(".icons_wrapper").show();

				elements.itemsSearchWrapper.hide().html("");
			}

			elements.itemsWrapper.find(".icons_wrapper div:first-child").css('margin-left', '0px');

		};

		var onPrevClick = function () {
			var currentPage = parseInt(elements.itemsWrapper.attr("data-page"));

			if (currentPage > 1) {
				elements.itemsWrapper.attr("data-page", currentPage - 1);
				currentPage = currentPage - 1;
			}

			var newX = (currentPage - 1) * elements.itemsWrapper.width();

			mainWrapper.find(".icons_wrapper div:first-child, .icons_search_wrapper div:first-child").stop(true, false).animate({
				'margin-left' : '-' + newX + 'px'
			}, 500, function () {
				// Update pagination
				elements.pagination.text(currentPage + " / " + pagesNumber);
			});
		};

		/*
		Show icons that belong to each icon group (fontawesome, dashicons, etc)
		 */
		var onTypesClick = function () {
			var item = jQuery(this);
			var val = item.attr("data-type");
			elements.types.removeClass("active");
			item.addClass("active");

			if (item.attr("data-type") != 'all') {

				// Find all items
				var items = mainWrapper.find("span[data-group='" + val + "']");
				elements.itemsWrapper.attr("data-group", val);

				// Get the page number
				var searchIcons = items.length;
				pagesNumber = Math.ceil(searchIcons / settings.itemsPerPage);

				// Update pagination
				var firstPage = (searchIcons > 0) ? 1 : 0;
				elements.pagination.text(firstPage + " / " + pagesNumber);
				elements.itemsWrapper.attr("data-page", firstPage);

				// clone items to search wrapper
				elements.itemsSearchWrapper.html(items.clone());

				// Add sections (pages) to icons
				for (i = 0; i <= pagesNumber; i++) {
					var from = settings.itemsPerPage * i;
					var to = (settings.itemsPerPage * i) + settings.itemsPerPage;
					elements.itemsWrapper.find('.icons_search_wrapper span').slice(from, to).wrapAll("<div></div>");
				}

				// update visuals
				elements.itemsWrapper.find(".icons_wrapper").hide();
				elements.itemsSearchWrapper.show();
			} else {
				elements.itemsWrapper.attr("data-group", "all");

				var searchIcons = elements.items.length;

				pagesNumber = Math.ceil(searchIcons / settings.itemsPerPage);

				// Update pagination
				var firstPage = (searchIcons > 0) ? 1 : 0;
				elements.pagination.text(firstPage + " / " + pagesNumber);
				elements.itemsWrapper.attr("data-page", firstPage);

				// update visuals
				elements.itemsWrapper.find(".icons_wrapper").show();
				elements.itemsSearchWrapper.hide().html("");
			}

			elements.itemsWrapper.find(".icons_wrapper div:first-child").css('margin-left', '0px');
		};

		var onItemsClick = function () {
			var item = jQuery(this);
			targetElement.val(item.attr("class"));
			displayElement.attr("class", item.attr("class"));
			mainWrapper.hide().remove();
		};

	});

};
