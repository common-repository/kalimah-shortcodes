jQuery(document).ready(function () {

	/* Display popup */
	jQuery(".kalimah-shortcodes-button").click(function () {
		jQuery("#kalimah_shortcodes_popup_container").fadeIn(function () {
			jQuery(document).one("click", ".popup_on", function (e) {
				if (jQuery(e.target).closest("#kalimah_shortcodes_popup_container").length == 0) {
					jQuery("#kalimah_shortcodes_popup_container").fadeOut();
					jQuery("body").removeClass('popup_on');
				}
			});
		});
		jQuery("body").addClass('popup_on');

		if (jQuery("#wp-content-wrap").hasClass("tmce-active"))
			jQuery("#kalimah_shortcodes_popup_container textarea[name='content']").val(tinyMCE.activeEditor.selection.getContent());
		else
			jQuery("#kalimah_shortcodes_popup_container textarea[name='content']").val(jQuery('#content').range().text);

	});

	jQuery("#kalimah_shortcodes_popup_container .kalimah-shortcodes-header-close").click(function () {
		jQuery("#kalimah_shortcodes_popup_container").fadeOut();
		jQuery("body").removeClass('popup_on');
		jQuery(document).off("click", ".popup_on");
	});

	// 5.1 Handle Shortcode main view
	jQuery(".kalimah-shortcode-list-container").on("click", "li", function (e) {

		jQuery('.kalimah-shortcode-list-container').addClass("animate");
		jQuery('.kalimah-shortcode-options').addClass("animate");

		// Animate header
		jQuery(".kalimah-displayed-shortcode").html("<span>«</span> " + jQuery(this).html()).addClass("animate");
		jQuery(".kalimah-select-shortcode").addClass("animate");

		// this  replace is mailny for gallery:) shortcode
		// this is necessay as gallery shortcode is reserved in WordPress
		// and ^_^ charchaters are not allowed in css as selectors unless escaped
		var title = jQuery(this).attr("title").replace("^_^", "\\^_\\^");
		jQuery('#' + title).show().siblings().hide();
	});

	// Display shortcode global settings
	jQuery(".kalimah-select-shortcode").on("click", ".fa.fa-cogs", function (e) {

		jQuery('.kalimah-shortcode-list-container').addClass("animate");
		jQuery('.kalimah-shortcode-options').addClass("animate");

		// Animate header
		jQuery(".kalimah-displayed-shortcode").html("<span>«</span><span class='" + jQuery(this).attr('class') + "'></span> " + jQuery(this).attr('data-title')).addClass("animate");
		jQuery(".kalimah-select-shortcode").addClass("animate");

		jQuery('#' + jQuery(this).attr("title")).siblings().hide();
		jQuery('#' + jQuery(this).attr("title")).show();
	});

	// Submit settings to save
	jQuery("#kalimah-shortcodes-settings-shortcode input[type='submit']").click(function () {
		jQuery.ajax({
			type : "POST",
			cache : false,
			url : ajaxurl,
			data : {
				"action" : "kalimah_ajax_update_settings",
				"prefix" : jQuery('.kalimah-shortcode-options input[name="kalimah-shortcode-prefix"]').val(),
				"custom_css" : jQuery('.kalimah-shortcode-options textarea[name="kalimah-shortcodes-custom-css"]').val()
			},
			success : function (data) {
				var success = "<div class='kalimah-box success'><span class='fa fa-check-circle-o'></span><span>Settings have been saved</span></div>";
				jQuery(success).hide().appendTo(".kalimah-shortcode-body").fadeIn().delay(5000).fadeOut(function () {
					jQuery(this).remove()
				});
			}
		})
	});

	jQuery(document).on("click", ".kalimah-displayed-shortcode", function (e) {
		jQuery('.kalimah-shortcode-list-container').removeClass("animate");
		jQuery('.kalimah-shortcode-options').removeClass("animate");

		// Animate header
		jQuery(".kalimah-displayed-shortcode").removeClass("animate");
		jQuery(".kalimah-select-shortcode").removeClass("animate");
	})

	jQuery.expr[':'].icontains = function (a, i, m) {
		return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0;
	};

	jQuery('.kalimah-shortcode-body').on("input", ".kalimah-search-shortcodes", function () {
		jQuery(".kalimah-shortcodes-list li").hide();
		jQuery(".kalimah-shortcodes-list li:icontains('" + jQuery(this).val() + "')").show();

	})

	// 5.3 Submit shortcode to editor
	jQuery(".kalimah-settings-section-start:not(:first-child) input[type='submit']").click(function () {
		var subTag;

		var topClass = jQuery(this).closest('.kalimah-shortcode-body .kalimah-settings-section-start');
		var shortcode = "[" + topClass.attr("data-id") + " ";
		var elements = topClass.find(
				'input[type="radio"]:checked, input[type="text"]:not([name="no-shortcode"]), select,input[type="range"], .kalimah-settings-media input[type="hidden"],' +
				'.shortcode-icon-picker input[type="hidden"], input[type="color"], input[type="checkbox"], input[name="start_tag"], input[name="end_tag"],' +
				'textarea, .kalimah-settings-icons input[type="hidden"],' +
				'.kalimah-settings-columns input[type="hidden"], .kalimah-shortcodes-sections-container input[type="hidden"]');

		elements.each(function (i, e) {
			var attr = jQuery(e).attr("data-name");
			var parent = jQuery(e).parent();
			var name = (typeof attr !== typeof undefined && attr !== false) ? attr : jQuery(e).attr("name");

			// Hidden elements mean that the user chose an option that hid the section this element belongs to
			if (!parent.is(":visible"))
				return;

			if (name == "content") {
				shortcode += "]" + jQuery(e).val() + "[/" + topClass.attr("data-id");
			} else if (name == "start_tag") {
				subTag = jQuery(e).val();
				shortcode += "]\r\n&nbsp;&nbsp;[" + jQuery(e).val() + " ";
			} else if (name == "end_tag") {
				shortcode += "[/" + jQuery(e).val();

				// are there any following elements?
				// if not close the tag
				if (elements.eq(i + 1).length == 0)
					shortcode += "]\r\n\t[/" + topClass.attr("data-id");

			} else if (name.indexOf(subTag) != -1) {
				var val = jQuery(e).val();

				var indexLeftBracket = name.indexOf("[") + 1;
				var indexRightBracket = name.indexOf("]");
				var field_name = name.substr(indexLeftBracket, indexRightBracket - indexLeftBracket);

				// For checkbox we changed "on" to true and not checked to false
				if (jQuery(e).attr("type") == 'checkbox')
					val = (jQuery(e).prop("checked") == true) ? 'true' : 'false';

				// if the field name is content then close the shortcode and add the content
				// Otherwise just close the shortcode
				if (field_name == "content")
					shortcode += "]" + val;
				else
					shortcode += field_name + "=\"" + val + "\" ";

			} else {
				// Make sure it is not empty
				if (jQuery(e).val() != null && jQuery(e).val().length != 0) {
					// Get the value
					val = jQuery(e).attr("value");

					// For checkbox we changed "checked" to true and not to false
					if (jQuery(e).attr("type") == 'checkbox') {
						val = (jQuery(e).prop("checked") == true) ? 'true' : 'false';
					}

					// For select with multiple selection enabled
					// join all elements with a comma
					if (jQuery(e).attr("multiple") == 'multiple') {
						val = jQuery.map(jQuery(e).find("option:selected"), function (element) {
								return jQuery(element).val()
							}).join(',');
					}

					// For range elements we add the units after the number
					var units = jQuery(e).siblings('.kalimah-range-units.multiple');

					if (jQuery(e).attr("type") == 'range' && units.length > 0) {
						var val = jQuery(e).val();

						// We want to keep only the element name to add to shortcode
						// First we find the bracket [
						// Then we subtract the name from there
						var indexOfBracket = name.indexOf("[");
						var result = name.substr(0, indexOfBracket);
						shortcode += result + "=\"" + val + units.val() + "\" ";

					} else {
						shortcode += name + "=\"" + val + "\" ";
					}
				}
			}
		});

		shortcode += "]";

		//This javascript code removes all 3 types of line breaks
		shortcode = shortcode.replace(/(\r\n|\n|\r)/gm, "<br>");

		if (jQuery("#wp-content-wrap").hasClass("tmce-active"))
			tinymce.execCommand('mceInsertContent', false, shortcode);
		else
			jQuery('#content').range(shortcode);

		jQuery("#kalimah_shortcodes_popup_container .kalimah-shortcodes-header-close").trigger("click");
		jQuery.ajax({
			type : "POST",
			cache : false,
			url : ajaxurl,
			data : {
				"action" : "kalimah_ajax_update_popular",
				"id" : topClass.attr("data-id")
			},
			success : function (data) {
				console.log("success");
			}
		})
	})

	// 4.5 Images selector
	jQuery('.kalimah-settings-images .image-selector, .kalimah-settings-images .css-selector').click(function () {
		jQuery(this).siblings(".image-selected").removeClass("image-selected");
		jQuery(this).addClass("image-selected");
	});

	// 4.7 Display value for range and precise movement
	jQuery(document).on("change mousemove", 'input[type="range"]', function (e) {
		jQuery(this).siblings(".data-slider-value").text(jQuery(this).val());
	})

	// 4.5 Get scroll event to tune range
	jQuery(document).on('mousewheel DOMMouseScroll', 'input[type="range"]', function (event) {
		// Get the step, if not step is set use 1
		var step = (typeof jQuery(this).attr('step') === 'undefined' ? 1 : parseFloat(jQuery(this).attr('step')));

		var value = parseFloat(jQuery(this).attr('value'));

		// Check if scroll up or down and trigger or add number as required
		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
			var newValue = step + value;
			jQuery(this).val(newValue);
			jQuery(this).trigger("change");

		} else {
			var newValue = value - step;
			jQuery(this).val(newValue);
			jQuery(this).trigger("change");
		}

		return false;
	});

	// 4.8 Colorpicker
	jQuery('.color-picker input[type="text"]').colpick({
		layout : 'hex',
		color : jQuery(this).val(),
		onSubmit : function (hsb, hex, rgb, el) {

			jQuery(el).css('background-color', '#' + hex);
			jQuery(el).val('#' + hex);
			jQuery(el).colpickHide();
		}
	});

	// 4.10 Media uploader
	jQuery('.upload-btn').click(function (e) {
		var img = jQuery(this).siblings('img');
		var input = jQuery(this).siblings('input');
		var multiple = jQuery(this).attr("data-multiple");
		
		e.preventDefault();

		media_uploader = wp.media({
				frame:  'post',
				multiple : (multiple == 'true') ? true : false
			});

		media_uploader.on("insert", function () {
		
			if (multiple == 'true') {
				var images_array = Array();
				
				var length = media_uploader.state().get("selection").length;
				var images = media_uploader.state().get("selection").models

					for(var iii = 0; iii < length; iii++)
					{
						var image_url = images[iii].changed.url;
						var image_caption = images[iii].changed.caption;
						var image_title = images[iii].changed.title;
						
						images_array.push(images[iii].id);
					}
					
				input.val(images_array.join(","));
				
			} else {
				// This will return the selected image from the Media Uploader, the result is an object
				var uploaded_image = media_uploader.state().get('selection').first();

				// We convert uploaded_image to a JSON object to make accessing it easier
				// Output to the console uploaded_image
				var image_url = uploaded_image.toJSON().url;

				// Let's assign the url value to the input field
				input.val(image_url);
				img.attr("src", image_url);

				// show it
				img.css("opacity", "1");
			}
		});

		media_uploader.open();
		/*
		media_uploader.open();
		var image = wp.media({
		title : 'Upload Image',
		frame:      'post',
		state:    "insert",
		multiple: true
		// Set to true to allow multiple files to be selected
		//multiple : true
		}).open()
		.on('select', function (e) {

		});*/
	});

	// 4.11 Delete Media
	jQuery('.remove_media_image').click(function (e) {
		_this = jQuery(this);
		_this.siblings("input[type='hidden']").attr("value", "");
		jQuery(this).siblings(".media_image").attr("src", "").css("opacity", "0");

	});

	// 4.12 Loop through the units
	jQuery('.data-slider-units.multiple span').click(function (e) {
		var parent = jQuery(this).parent();

		// Get next element
		var nextElement = jQuery(this).next();

		// If there is not next element it means we have reached the end, so go to first element
		if (nextElement.length == 0)
			var nextElement = parent.children('span:first-child');

		// Fade in next element and fadeOut last element
		nextElement.fadeIn("fast", function () {
			jQuery(this).addClass('active');
		});
		jQuery(this).fadeOut("fast", function () {
			jQuery(this).removeClass('active')
		});

		parent.siblings('.kalimah-range-units.multiple').val(nextElement.attr('data-value'));
	});

	// 3.1 Handle click new add section (accordion, tab, slider .. etc)
	jQuery('.add_section').click(function () {
		var clickedElement = jQuery(this);
		var titleElement = clickedElement.siblings(".shortcode_section_title");
		var titleElementVal = titleElement.val();
		var uniqueID = new Date().valueOf();

		if (titleElementVal.length != 0) {
			var newElement = jQuery(clickedElement.parent().siblings('script').html()).clone();
			newElement.find('.text').text(titleElementVal);
			newElement.find('.title_hidden').val(titleElementVal);

			// is there icon span?
			var icon = newElement.find(".section-icon");
			var iconId = icon.attr("id");

			// is there color picker?
			var colpicker = newElement.find(".color-picker");

			newElement.appendTo(clickedElement.parent().siblings('.kalimah-shortcodes-sections-container')).hide().slideDown("normal", function () {
				// We wait until element is attached then we intiate icon picker
				if (icon.length > 0) {
					var newID = iconId + "-" + uniqueID;
					var targetID = iconId + "-input-" + uniqueID;

					icon.attr("id", newID);
					icon.attr("data-display", "#" + newID);
					icon.attr("data-target", "#" + targetID);
					newElement.find(".section_icon_input").attr("id", targetID);
					jQuery("#" + newID).kalimah_icon_picker();
				}

				if (colpicker.length > 0) {
					colpicker.colpick({
						layout : 'hex',
						color : jQuery(this).val(),
						onSubmit : function (hsb, hex, rgb, el) {

							jQuery(el).css('background-color', '#' + hex);
							jQuery(el).val('#' + hex);
							jQuery(el).colpickHide();
						}
					});
				}
				// Fade in to show
				jQuery(this).fadeTo("normal", 1);
			});

			// Clear title element
			titleElement.val("");
		}
	});

	// 3.2 Delete section
	jQuery('.kalimah-shortcodes-sections-container').on("click", ".delete", function () {
		jQuery(this).closest(".kalimah-shortcodes-section-single").animate({
			opacity : "0"
		}, function () {
			jQuery(this).slideUp(function () {
				jQuery(this).remove()
			})
		});
	});

	jQuery('.kalimah-shortcodes-sections-container').on("click", "input[type='checkbox']", function () {
		jQuery(this).closest('.kalimah-shortcodes-sections-container').find('input[type="checkbox"]').prop("checked", false).parent().removeClass('selected');
		jQuery(this).prop("checked", true).parent().addClass('selected');
	});

	/*------------------------------------------------------------------
	Columns shortcode admin
	-------------------------------------------------------------------*/
	var clicked = false;
	var lastClickedXPosition = null;
	var lastMovingXPosition = null;
	var wrapperWidth = jQuery(".columns_wrapper").outerWidth();
	var eleme = null;
	var nextElem = null;
	var prevElem = null;
	var originalColumnWidth = 0;
	var deleteColumnTimer = 0;
	var columnClicked = false;

	var originalWidth = {};
	var elementsWidth = {};
	var columnsElements = {};
	var sepratorElements = {};
	var hiddenElement = {};

	function columnClick() {
		var element = jQuery(".columns_wrapper .single_column").last();
		element.after(jQuery("#column_single").html());

		var columnCount = jQuery(".columns_wrapper .single_column").length;
		var newWidth = 100 / columnCount;
		// readjust width
		jQuery(".columns_wrapper .single_column").each(function (i, e) {
			var elem = jQuery(e);

			if (columnCount > 2)
				elem.css("cursor", "pointer");
			else
				elem.css("cursor", "default");

			elem.width(newWidth + "%");
			elem.attr("data-width", newWidth);
			elem.find(".single_column_percentage").text(newWidth.toFixed(2) + "%");
			elem.find("input[type='hidden'][name='column[size]']").val(newWidth.toFixed(2) + "%");
		});

		if (jQuery('.columns_wrapper .single_column').length == 6)
			jQuery(".columns_container").off("click", ".add_column");
	};

	jQuery(".columns_container").on("click", ".add_column", columnClick);

	// Handle mousedown on the seprator div
	// in this function we set values to be used when mousemove occur
	// We set values for next and prev elements, x position and other elements.
	jQuery(".columns_container").on("mousedown", ".single_column_seprator", function (e) {
		clicked = true;
		lastClickedXPosition = e.pageX;
		lastMovingXPosition = e.pageX;

		columnsElements.mainElement = jQuery(this).parent();
		columnsElements.nextElement = columnsElements.mainElement.next();
		columnsElements.prevElement = columnsElements.mainElement.prev();

		/* This object is used to find serpator div in each element
		It is more effieicnt to do it here than doing in every user mouse move
		 */
		sepratorElements.mainElement = columnsElements.mainElement.find(".single_column_percentage");
		sepratorElements.nextElement = columnsElements.nextElement.find(".single_column_percentage");
		sepratorElements.prevElement = columnsElements.prevElement.find(".single_column_percentage");

		/* This object is used to find hidden input in each element
		 */
		hiddenElement.mainElement = columnsElements.mainElement.find("input[type='hidden'][name='column[size]']");
		hiddenElement.nextElement = columnsElements.nextElement.find("input[type='hidden'][name='column[size]']");
		hiddenElement.prevElement = columnsElements.prevElement.find("input[type='hidden'][name='column[size]']");

		// update wrapper width
		wrapperWidth = jQuery(".columns_wrapper").width();

		originalWidth.mainElement = parseFloat(columnsElements.mainElement.attr("data-width"));
		originalWidth.nextElement = parseFloat(columnsElements.nextElement.attr("data-width"));
		originalWidth.prevElement = parseFloat(columnsElements.prevElement.attr("data-width"));

	});

	/* When mouse leaves (for examble out of viewport) we reset all values
	that were set in mousedonw
	 */
	jQuery(document).on("mouseleave mouseup", function () {

		/* Clicked is for the user clicks on seprator
		In this function we check if the user has clicked on the seprator
		 */
		if (clicked) {
			// Set default values
			columnsElements.mainElement.attr("data-width", elementsWidth.mainElement);
			columnsElements.prevElement.attr("data-width", elementsWidth.prevElement);
			columnsElements.nextElement.attr("data-width", elementsWidth.nextElement);

			hiddenElement.mainElement.val(elementsWidth.mainElement.toFixed(2) + "%");
			hiddenElement.nextElement.val(elementsWidth.nextElement.toFixed(2) + "%");
			hiddenElement.prevElement.val(elementsWidth.prevElement.toFixed(2) + "%");

			clearTimeout(deleteColumnTimer);
			clicked = false;
			lastClickedXPosition = null;
		}

		/* Clicked is for the user clicks on column itself (and not the sperator)
		In this function we check if the user has clicked on the column
		This is used to delete the column.
		 */
		if (columnClicked) {
			clearTimeout(deleteColumnTimer);
			columnsElements.mainElement.removeClass("remove_column");
		}
	});

	// Handle user mouse movement after clicking on separtor
	jQuery(document).on("mousemove", ".columns_wrapper", function (event) {
		if (clicked) {
			var movemenet = event.pageX - lastMovingXPosition;
			var distance = event.pageX - lastClickedXPosition;
			var percentage = (distance * 100) / wrapperWidth;

			if (movemenet > 0) {
				// right movement
				mainElementWidth = originalWidth.mainElement + percentage;
				nextElementWidth = originalWidth.nextElement - percentage;
				prevElementWidth = originalWidth.prevElement - percentage;

			} else {
				// left movement
				percentage = percentage * -1; // Convert to positive value
				mainElementWidth = originalWidth.mainElement - percentage;
				nextElementWidth = originalWidth.nextElement + percentage;
				prevElementWidth = originalWidth.prevElement + percentage;
			}

			// Make sure elements dont shrink less than the minimum amount
			if (mainElementWidth < 16.67 || nextElementWidth < 16.67 || prevElementWidth < 16.67)
				return;

			elementsWidth.mainElement = mainElementWidth;
			elementsWidth.nextElement = nextElementWidth;
			elementsWidth.prevElement = prevElementWidth;

			// Set visual for main elements (width and width text)
			columnsElements.mainElement.width(elementsWidth.mainElement + "%");
			sepratorElements.mainElement.text(elementsWidth.mainElement.toFixed(2) + "%");

			// Set visual for prev and next elements (width and width text)
			if (columnsElements.nextElement != null) {
				columnsElements.nextElement.width(elementsWidth.nextElement + "%");
				sepratorElements.nextElement.text(elementsWidth.nextElement.toFixed(2) + "%");
			} else {
				columnsElements.prevElement.width(elementsWidth.prevElement + "%");
				sepratorElements.prevElement.text(elementsWidth.prevElement.toFixed(2) + "%");
			}

			// Set this var for next mousemove event
			lastMovingXPosition = event.pageX;
		}
	});

	// Mousewheel events for prices measurement
	jQuery(".columns_wrapper").on("DOMMouseScroll mousewheel", ".single_column", function (event) {
		var mainElement = jQuery(this);
		var nextElement = mainElement.next('.single_column');
		var prevElement = mainElement.prev('.single_column');

		var otherElement = (nextElement.length > 0) ? nextElement : prevElement;

		var elemWidth = parseFloat(mainElement.attr("data-width"));
		var otherElementWidth = parseFloat(otherElement.attr("data-width"));

		// Text classes
		var elemText = mainElement.find(".single_column_percentage");
		var otherText = otherElement.find(".single_column_percentage");

		if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
			// Down
			var newValue = elemWidth - 0.05;
			if (newValue < 16.67)
				return;

			mainElement.width(newValue + "%");
			mainElement.attr("data-width", newValue + "%");
			elemText.text(newValue.toFixed(2) + "%");

			var otherElemValue = otherElementWidth + 0.05;
			otherElement.width(otherElemValue + "%");
			otherElement.attr("data-width", otherElemValue + "%");
			otherText.text(otherElemValue.toFixed(2) + "%");

		} else {
			// up
			var newValue = elemWidth + 0.05;
			var otherElemValue = otherElementWidth - 0.05;

			if (otherElemValue < 16.67)
				return;

			mainElement.width(newValue + "%");
			mainElement.attr("data-width", newValue + "%");
			elemText.text(newValue.toFixed(2) + "%");

			otherElement.width(otherElemValue + "%");
			otherElement.attr("data-width", otherElemValue + "%");
			otherText.text(otherElemValue.toFixed(2) + "%");
		}
	});

	/* Here we handle the click on textarea element inside the container
	Without handling focus the element will bubble up and it will delete the column if long press*/
	jQuery(".columns_container").on("mousedown", "textarea", function (e) {
		jQuery(this).focus();
		return false;
	});

	/* Delete column*/
	jQuery(".columns_container").on("mousedown", ".single_column .single_column_inner", function (e) {
		// We well trigger this action only when there are more than two elements
		var columnCount = jQuery(".columns_wrapper .single_column").length;
		if (columnCount < 3)
			return;

		columnsElements.mainElement = jQuery(this).parent();
		columnsElements.mainElement.addClass("remove_column");
		columnClicked = true;

		deleteColumnTimer = setTimeout(function () {
				columnClicked = false;

				// delete column
				columnsElements.mainElement.remove();
				// readjust columns
				var columnCount = jQuery(".columns_wrapper .single_column").length;
				var newWidth = 100 / columnCount;
				// readjust width
				jQuery(".columns_wrapper .single_column").each(function (i, e) {
					var elem = jQuery(e);

					elem.width(newWidth + "%");
					elem.attr("data-width", newWidth);
					if (columnCount > 2)
						elem.css("cursor", "pointer");
					else
						elem.css("cursor", "default");

					elem.find(".single_column_percentage").text(newWidth.toFixed(2) + "%");
					elem.find("input[type='hidden'][name='column[size]']").val(newWidth.toFixed(2) + "%");
				});

				if (columnCount + 1 == 6) {
					jQuery(".columns_container").on("click", ".add_column", columnClick);
				}
			}, 800);
	});

	/***********************
	Icon Picker
	 ************************/
	jQuery(".button.icon-picker").kalimah_icon_picker();

	/***********************
	Multiple select dropdown
	Make the default bhavior for user to select multiple without the need for ctrl or shift
	 ************************/
	jQuery(".kalimah-settings-select select[multiple='multiple'] option").mousedown(function (e) {
		e.preventDefault();
		jQuery(this).prop('selected', jQuery(this).prop('selected') ? false : true);
		return false;
	});

	/***********************
	Handle radio hide and show
	 ************************/
	jQuery('.radio-enable-hide input[type="radio"]:first-child').trigger("change");
	jQuery('.radio-enable-hide input[type="radio"]').change(function () {
		var parent = jQuery(this).closest("label");

		// Slide up (hide) all sibling elements
		parent.siblings('label').each(function (index, value) {
			var uniqeid = jQuery(this).attr('data-uniqeid');
			jQuery('[data-radio-uniqeid="' + uniqeid + '"]').stop().stop().slideUp('slow');
		});

		var uniqeid = parent.attr('data-uniqeid');

		// Show the needed element
		jQuery('[data-radio-uniqeid="' + uniqeid + '"]').stop().stop().slideDown('slow');
	});

	/***********************
	Typography (bold, italics, font-type, ...etc)
	 ************************/
	// Handle font family change
	jQuery(".kalimah-shortcodes-typography .font-type select").on("change", function (e) {
		var textarea = jQuery(this).closest(".kalimah-settings-section-start").find("textarea[name='content']");

		// Get the font name
		var fontFamily = jQuery(this).val();

		// Add it to header
		jQuery("head").append("<link href='https://fonts.googleapis.com/css?family=" + fontFamily + "' rel='stylesheet' type='text/css'>");

		// apply it to textarea
		textarea.css('font-family', fontFamily);
		console.log("ASD");
	});

	// Handle bold, italics, strikethrough and underline
	jQuery(".kalimah-shortcodes-typography .format-btns input[type='checkbox']").change(function (e) {
		var textarea = jQuery(this).closest(".kalimah-settings-section-start").find("textarea[name='content']");
		var element = jQuery(this);
		var status = element.is(':checked');
		var data = element.attr("data-type");

		if (data == "bold") {
			textarea.css('font-weight', (status) ? 'bold' : 'normal');
		} else if (data == "italics") {
			textarea.css('font-style', (status) ? 'italic' : 'normal');
		} else if (data == "strikethrough") {
			textarea.css('text-decoration', (status) ? 'line-through' : 'unset');

			// disable underline button
			element.parent().children('[data-type="underline"]').prop("checked", "");
		} else if (data == "underline") {
			textarea.css('text-decoration', (status) ? 'underline' : 'unset');
			// disable strikethrough button
			element.parent().children('[data-type="strikethrough"]').prop("checked", "");
		}
	});

	// Handle size range change
	jQuery('#typography-shortcode .kalimah-settings-range input[type="range"]').on("change mousemove", function (e) {
		var textarea = jQuery(this).closest(".kalimah-settings-section-start").find("textarea[name='content']");

		textarea.css('font-size', jQuery(this).val() + 'px');
	});

});
