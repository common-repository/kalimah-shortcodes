<?php
/*
 * Plugin Name: Kalimah Shortcodes
 * Plugin URI: http://english.kalimah-apps.com
 * Description: A premium shortcodes plugin with 40 amazingly designed shortcodes for free!
 * Version: 1.3.3
 * Author: Kalimah Apps
 * Text Domain: kalimah-shortcodes
 * Author URI: http://english.kalimah-apps.com
 */
 
/*
[Shorcodes TOC]
1. General Functions 
   1.1 Add shortcode custom button 
   1.2 Paragraph fix 
   1.3 Add inline popup 
   1.4 Homepage Shortcode
2. Shortcodes Functions 
   2.1 Boxes 
   2.2 Dropcap  
   2.3 Divider 
   2.4 List  
   2.5 Heading 
   2.6 Highlight 
   2.7 Quote 
   2.8 YouTube 
   2.9 Vimeo 
   2.10 Audio 
   2.11 Maps 
   2.12 Video 
   2.13 Soundcloud 
   2.14 Dummy Text 
   2.15 QrCode 
   2.16 Accordion 
   2.17 Accordion section 
   2.18 Single tab section 
   2.19 Tabs 
   2.20 Author_info 
   2.21 Buttons 
   2.22 Members Only 
   2.23 Tooltip shortcode 
   2.24 Columns 
   2.25 Single column 
   2.26 Flickr 
   2.27 Padding 
   2.28 Kalimah Progress Bar 
   2.29 Kalimah Content Box 
   2.30 Counter 
*/

include_once('includes/color.php');


class kalimah_shortcodes
{
	private $tabs_titles = array();
	private $tabs_contents = array();
	private $tabs_unique = '';
	private $list_icon ='';
	private $list_color ='';
	private $list_bg_color ='';
	private $list_style ='';
	private $tabs_text_color;
	private $tabs_bg_color;
	private $settings_array;
	private $slider_title;
	
	function __construct()
	{
		
/*--- 1. General Functions ---*/
# add a button to the content editor, next to the media button
# this button will show a popup that contains inline content
add_action('media_buttons_context', array($this, 'kalimah_shortcode_custom_button'));

# add some content to the bottom of the page 
# This will be shown in the inline modal
add_action('admin_footer', array($this, 'kalimah_add_inline_popup_content'));

//remove_filter( 'the_content', 'wpautop' );
//add_filter( 'the_content', 'wpautop' , 12);

add_filter('the_content', array($this, 'kalimah_shortcode_empty_paragraph_fix'));
//add_filter("the_content",  array($this, "the_content_filter"));

$this->settings_array = get_option('kalimah_shortcodes_options');
$prefix = $this->settings_array['settings']['prefix'];

$shortcodes_actions = array(
  
    $prefix.'counter' => array(
        $this,
        'kalimah_shortcode_counter'
    ),
    $prefix.'content_box' => array(
        $this,
        'kalimah_shortcode_contentbox'
    ),
    $prefix.'progress_bar' => array(
        $this,
        'kalimah_shortcode_progressbar'
    ),
    $prefix.'padding' => array(
        $this,
        'kalimah_shortcode_padding'
    ),
    $prefix.'flickr' => array(
        $this,
        'kalimah_shortcode_flickr'
    ),
    $prefix.'columns_css' => array(
        $this,
        'kalimah_shortcode_columns_css'
    ),
	$prefix.'column' => array(
	$this,
        'kalimah_shortcode_columns_single'
    ),
    $prefix.'columns' => array(
        $this,
        'kalimah_shortcode_columns'
    ),
    $prefix.'tooltip' => array(
        $this,
        'kalimah_shortcode_tooltip'
    ), 
	$prefix.'icon' => array(
        $this,
        'kalimah_icon_shortcode'
    ),
    $prefix.'restricted' => array(
        $this,
        'kalimah_shortcode_members_only'
    ),
    $prefix.'button' => array(
        $this,
        'kalimah_shortcode_button'
    ),
    $prefix.'author' => array(
        $this,
        'kalimah_shortcode_author_info'
    ),
    $prefix.'tabs' => array(
        $this,
        'kalimah_shortcode_tabs'
    ),
    $prefix.'tab' => array(
        $this,
        'kalimah_shortcode_tabs_section'
    ),
    $prefix.'accordion_section' => array(
        $this,
        'kalimah_shortcode_accordion_section'
    ),
    $prefix.'accordion' => array(
        $this,
        'kalimah_shortcode_accordion'
    ),
	$prefix.'slider' => array(
        $this,
        'kalimah_shortcode_slider'
    ),
	$prefix.'slide' => array(
        $this,
        'kalimah_shortcode_slide'
    ),
	$prefix.'spoiler' => array(
        $this,
        'kalimah_shortcode_spoiler'
    ),
    $prefix.'dummytext' => array(
        $this,
        'kalimah_dummytext_shortcode'
    ),
    $prefix.'soundcloud' => array(
        $this,
        'kalimah_soundcloud_shortcode'
    ),
    $prefix.'video_player' => array(
        $this,
        'kalimah_video_player_shortcode'
    ),
    $prefix.'google_maps' => array(
        $this,
        'kalimah_google_maps_shortcode'
    ),
    $prefix.'audio_player' => array(
        $this,
        'kalimah_audio_player_shortcode'
    ),
    $prefix.'vimeo' => array(
        $this,
        'kalimah_vimeo_shortcode'
    ),
    $prefix.'youtube' => array(
        $this,
        'kalimah_youtube_shortcode'
    ),
    $prefix.'quote' => array(
        $this,
        'kalimah_quote_shortcode'
    ),
    $prefix.'highlight' => array(
        $this,
        'kalimah_highlight_shortcode'
    ),
    $prefix.'heading' => array(
        $this,
        'kalimah_shortcode_heading'
    ),
    $prefix.'list' => array(
        $this,
        'kalimah_shortcode_list'
    ),
	$prefix.'list_item' => array(
        $this,
        'kalimah_shortcode_list_item'
    ),
    $prefix.'divider' => array(
        $this,
        'kalimah_shortcode_divider'
    ),
    $prefix.'dropcap' => array(
        $this,
        'kalimah_dropcap_shortcode'
    ),
    $prefix.'box' => array(
        $this,
        'kalimah_shortcode_box'
    ),
    $prefix.'qrcode' => array(
        $this,
        'kalimah_qrcode_shortcode'
    ),
	$prefix.'image' => array(
        $this,
        'kalimah_image_shortcode'
    ),
	$prefix.'environment' => array(
        $this,
        'kalimah_environment_shortcode'
    ),
	$prefix.'animation' => array(
        $this,
        'kalimah_animation_shortcode'
    ),
	$prefix.'features_list' => array(
        $this,
        'kalimah_features_list_shortcode'
    ),
	$prefix.'features_list_item' => array(
        $this,
        'kalimah_features_list_item_shortcode'
    ),
	$prefix.'pricing_tables' => array(
        $this,
        'kalimah_pricing_table_shortcode'
    ),
	$prefix.'pricing_tables_section' => array(
        $this,
        'kalimah_pricing_table_section_shortcode'
    ),
	$prefix.'typography' => array(
        $this,
        'kalimah_typography_shortcode'
    ),
	$prefix.'mockup' => array(
        $this,
        'kalimah_mockup_shortcode'
    ),
	$prefix.'dummy_image' => array(
        $this,
        'kalimah_dummy_image_shortcode'
    ),
	$prefix.'^_^gallery' => array(
        $this,
        'kalimah_gallery_shortcode'
    )
);

foreach($shortcodes_actions as $key => $value)
{
	add_shortcode($key , $value);
}

add_action('wp_ajax_kalimah_ajax_update_settings' , array($this, 'kalimah_update_settings'));
add_action('wp_ajax_kalimah_ajax_update_popular' , array($this, 'kalimah_update_popular'));
add_action('wp_head', array($this, 'kalimah_wp_enqueue'));
add_action('admin_enqueue_scripts', array($this, 'kalimah_wp_admin_enqueue'));

add_action('plugins_loaded', array($this, 'load_language'));
}


function load_language() {
	load_plugin_textdomain( 'kalimah-shortcodes', FALSE, basename( dirname( __FILE__ ) ) . '/languages' );
}

/**--- 1.1 Add shortcode custom button ---*/
function kalimah_shortcode_custom_button($context) {
  
  $file_dir = plugin_dir_url( __FILE__ );
  
  // The id of the container
  $container_id = 'kalimah_shortcodes_popup_container';
  
  // Our popup's title
  $title = __('Shortcode Selection', 'kalimah-shortcodes');

  // Append the icon
  $context .= "<div class='kalimah-shortcodes-button' title='{$title}'>
	<img src='{$file_dir}/icon-small.png'>
  <span class='kalimah-shortcodes-button-text'>".__('Kalimah Shortocdes', 'kalimah-shortcodes') ."<span></div>";
  
  return $context;
}

function the_content_filter($content) {
    $block = join("|",array("one_third", "button"));
    $rep = preg_replace("/(<p>)?\[($block)(\s[^\]]+)?\](<\/p>|<br \/>)?/","[$2$3]",$content);
    $rep = preg_replace("/(<p>)?\[\/($block)](<\/p>|<br \/>)?/","[/$2]",$rep);
return $rep;
}

/**--- 1.2 Paragraph fix ---*/
function kalimah_shortcode_empty_paragraph_fix($content)
{
    // define your shortcodes to filter, '' filters all shortcodes
    $shortcodes = array(
        'accordion',
        'accordion_section',
        'highlight',
        'heading',
        'dummytext',
        'quote',
        'columns',
        'column',
        'divider',
		'box',
		'list_item',
		'list',
		'tabs',
		'tab',
		'slide',
		'slider'
    );
    
    foreach ($shortcodes as $shortcode) {
        $from = array(
            '<p>[' . $shortcode,
            '<p>[/' . $shortcode,
            $shortcode . ']</p>',
            $shortcode . ']<br />'
        );
        $to   = array(
            '[' . $shortcode,
            '[/' . $shortcode,
            $shortcode . ']',
            $shortcode . ']'
        );
        
        $content = str_replace($from, $to, $content);
    }
    
    return $content;
}



/**--- 1.3 Add inline popup ---*/
function kalimah_add_inline_popup_content() {
	$prefix = $this->settings_array['settings']['prefix'];
	
	$kalimah_shortcodes_list = array(
		$prefix.'audio_player' => array('icon' => 'fa fa-music', 'text'=> __("Audio", 'kalimah-shortcodes')),
		$prefix.'animation' => array('icon' => 'fa fa-bolt', 'text'=> __("Animation", 'kalimah-shortcodes')),
		$prefix.'accordion' => array('icon' => 'ti-layout-accordion-merged', 'text'=> __("Accordion", 'kalimah-shortcodes')),
		$prefix.'author' => array('icon' => 'fa fa-user', 'text'=> __("Author Box", 'kalimah-shortcodes')),
		$prefix.'box' => array('icon' => 'fa fa-square-o', 'text'=> __("Box", 'kalimah-shortcodes')),
		$prefix.'button' => array('icon' => 'fa fa-dot-circle-o', 'text'=> __("Button", 'kalimah-shortcodes')),
		$prefix.'columns' => array('icon' => 'fa fa-columns', 'text'=> __("Columns", 'kalimah-shortcodes')),
		$prefix.'columns_css' => array('icon' => 'fa fa-columns', 'text'=> __("Columns CSS", 'kalimah-shortcodes')),
		$prefix.'content_box' => array('icon' => 'fa fa-list-alt', 'text'=> __("Content Box", 'kalimah-shortcodes')),
		$prefix.'counter' => array('icon' => 'fa fa-sort-numeric-asc', 'text'=> __("Count", 'kalimah-shortcodes')),
		$prefix.'divider' => array('icon' => 'ti-more-alt', 'text'=> __("Divider", 'kalimah-shortcodes')),
		$prefix.'dropcap' => array('icon' => 'fa fa-bold', 'text'=> __("Dropcap", 'kalimah-shortcodes')),
		$prefix.'dummytext' => array('icon' => 'fa fa-file-text-o', 'text'=> __("Dummy Text", 'kalimah-shortcodes')),
		$prefix.'dummy_image' => array('icon' => 'ion-images', 'text'=> __("Dummy Image", 'kalimah-shortcodes')),
		$prefix.'environment' => array('icon' => 'ion-monitor', 'text'=> __("Environment", 'kalimah-shortcodes')),
		$prefix.'flickr' => array('icon' => 'fa fa-flickr', 'text'=> __("Flickr", 'kalimah-shortcodes')),
		$prefix.'highlight' => array('icon' => 'fa fa-pencil', 'text'=> __("Highlight", 'kalimah-shortcodes')),
		$prefix.'heading' => array('icon' => 'fa fa-header', 'text'=> __("Heading", 'kalimah-shortcodes')),
		$prefix.'image' => array('icon' => 'fa fa-image', 'text'=> __("Image", 'kalimah-shortcodes')),
		$prefix.'icon' => array('icon' => 'ion-eye', 'text'=> __("Icon", 'kalimah-shortcodes')),
		$prefix.'list' => array('icon' => 'fa fa-th-list', 'text'=> __("List", 'kalimah-shortcodes')),
		$prefix.'features_list' => array('icon' => 'ion-clipboard', 'text'=> __("Features List", 'kalimah-shortcodes')),
		$prefix.'google_maps' => array('icon' => 'fa fa-map-o', 'text'=> __("Google Maps", 'kalimah-shortcodes')),
		$prefix.'^_^gallery' => array('icon' => 'dashicons dashicons-images-alt2', 'text'=> __("Gallery", 'kalimah-shortcodes')),
		$prefix.'mockup' => array('icon' => 'ti-mobile', 'text'=> __("Mockup", 'kalimah-shortcodes')),
		$prefix.'padding' => array('icon' => 'fa fa-outdent', 'text'=> __("Padding", 'kalimah-shortcodes')),
		$prefix.'progress_bar' => array('icon' => 'fa fa-tasks', 'text'=> __("Progress Bar", 'kalimah-shortcodes')),
		$prefix.'pricing_tables' => array('icon' => 'ti-layout-column3', 'text'=> __("Pricing Table", 'kalimah-shortcodes')),
		$prefix.'qrcode' => array('icon' => 'fa fa-qrcode', 'text'=> __("QR Code", 'kalimah-shortcodes')),
		$prefix.'quote' => array('icon' => 'fa fa-quote-right', 'text'=> __("Quote", 'kalimah-shortcodes')),
		$prefix.'restricted' => array('icon' => 'fa fa-users', 'text'=> __("Restricted Content", 'kalimah-shortcodes')),
		$prefix.'slider' => array('icon' => 'ti-layout-slider', 'text'=> __("Slider", 'kalimah-shortcodes')),
		$prefix.'spoiler' => array('icon' => 'ti-view-list', 'text'=> __("Spoiler", 'kalimah-shortcodes')),
		$prefix.'soundcloud' => array('icon' => 'fa fa-soundcloud', 'text'=> __("Soundcloud", 'kalimah-shortcodes')),
		$prefix.'tabs' => array('icon' => 'ti-layout-tab', 'text'=> __("Tabs", 'kalimah-shortcodes')),
		$prefix.'tooltip' => array('icon' => 'ti-comment-alt', 'text'=> __("Tooltip", 'kalimah-shortcodes')),
		$prefix.'typography' => array('icon' => 'fa fa-font', 'text'=> __("Typography", 'kalimah-shortcodes')),
		$prefix.'vimeo' => array('icon' => 'fa fa-vimeo', 'text'=> __("Vimeo", 'kalimah-shortcodes')),
		$prefix.'video_player' => array('icon' => 'fa fa-video-camera', 'text'=> __("Video", 'kalimah-shortcodes')),
		$prefix.'youtube' => array('icon' => 'fa fa-youtube', 'text'=> __("Youtube", 'kalimah-shortcodes'))
	);
?>
<div id="kalimah_shortcodes_popup_container" style="display:none;">
  <div class='kalimah-shortcodes-header-close'>×</div>
  <div class='kalimah-shortcodes-header'>
	<h1 class='kalimah-select-shortcode'><?php _e('Select Shortcode', 'kalimah-shortcodes'); ?>
		<span title='kalimah-shortcodes-settings-shortcode' class='fa fa-cogs kalimah-shortcodes-settings-icon' data-title='Shortcodes Settings'></span></h1>
	<h1 class='kalimah-displayed-shortcode'></h1>
	<hr>
  </div>
  
<div class='kalimah-shortcode-body'>
<div class='kalimah-shortcode-list-container'>
<input type='text' class='kalimah-search-shortcodes' id='kalimah-search-shortcodes' placeholder='<?php _e("Search Shortcodes", 'kalimah-shortcodes'); ?>'>
  <h3><?php _e("Popular", 'kalimah-shortcodes'); ?></h3>
  <ul class='kalimah-shortcodes-list-popular clearfix'>
	<?php
	$saved_options = get_option('kalimah_shortcodes_options');
	if(is_array($saved_options['popular']))
	{
		arsort($saved_options['popular']);
		$i = 0;
		foreach ($saved_options['popular'] as $key => $value)
		{
			$element = $kalimah_shortcodes_list[$key];
			if($i < 6)
				echo "<li title='{$key}-shortcode'><span class='{$element['icon']}'></span><span class='text'>{$element['text']}</span></li>";
			
			$i++;
		}
	}
	?>
  </ul>
  <h3><?php _e("Shortcodes", 'kalimah-shortcodes'); ?></h3>
  <ul class='kalimah-shortcodes-list clearfix'>
  <?php
	foreach ($kalimah_shortcodes_list as $key => $value)
	{
		echo "<li title='{$key}-shortcode'><span class='{$value['icon']}'></span><span class='text'>{$value['text']}</span></li>";
	}
	?>
  </ul>
 </div>
  <div class='kalimah-shortcode-options'>
	<?php


$shortcode_settings = array(
    array(
        "name" => __('Settings', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "kalimah-shortcodes-settings"
    ),
    array(
        "name" => __('Shortcodes Prefix', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "kalimah-shortcode-prefix",
        "type" => "text",
        "std" => ''
    ),
    array(
        "name" => __('Custom CSS', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "kalimah-shortcodes-custom-css",
        "type" => "textarea",
        "std" => $saved_options['settings']['custom_css']
    ),
	array(
        "text" => __('Update Settings', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($shortcode_settings);



$image = array(
    array(
        "name" => __('Animation', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "image"
    ),
	array(
        "name" => __('Image Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "image_url",
        "type" => "media",
        "std" => ""
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "step" => "1",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
			'%'
        ),
        "origianl_unites" => array(
            'px',
			'%'
        ),
        "units_std" => '%'
    ),
	 array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "step" => "1",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
			'%'
        ),
        "origianl_unites" => array(
            'px',
			'%'
        ),
        "units_std" => '%'
    ),
	array(
        "name" => __('Title', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "title",
        "type" => "text",
        "class" => ""
    ),
	array(
        "name" => __('Description', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "description",
        "type" => "textarea",
		"rows" => "4",
        "class" => ""
    ),
	array(
        "name" => __('Link', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "url",
        "type" => "text",
        "class" => ""
    ),
    array(
        "name" => __('Hover Effect', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "effect",
        "type" => "select",
        "std" => "none",
        "options" => array(
            "none" => __('None', 'kalimah-shortcodes'),
            "first-effect" => __('First Effect', 'kalimah-shortcodes'),
            "second-effect" => __('Second Effect', 'kalimah-shortcodes'),
            "third-effect" => __('Third Effect', 'kalimah-shortcodes'),
            "fourth-effect" => __('Fourth Effect', 'kalimah-shortcodes'),
            "fifth-effect" => __('Fifth Effect', 'kalimah-shortcodes'),
            "sixth-effect" => __('Sixth Effect', 'kalimah-shortcodes'),
            "seventh-effect" => __('Seventh Effect', 'kalimah-shortcodes'),
            "eighth-effect" => __('Eighth Effect', 'kalimah-shortcodes'),
            "ninth-effect" => __('Ninth  Effect', 'kalimah-shortcodes'),
            "tenth-effect" => __('Tenth Effect', 'kalimah-shortcodes'),
            "eleventh-effect" => __('Eleventh Effect', 'kalimah-shortcodes'),
            "twelfth-effect" => __('Twelfth Effect', 'kalimah-shortcodes')
        )
    ), 
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($image);

$mockup = array(
	array(
		"name" => __('Mockups', 'kalimah-shortcodes') ,
		"type" => "section_start",
		"id" => "mockup"
	) ,
	array(
		"name" => __('Type', 'kalimah-shortcodes') ,
		"desc" => '',
		"id" => "type",
		"type" => "select",
		"std" => "none",
		"options" => array(
			__("Mobile", 'kalimah-shortcodes') => array(
				"iphone5s" => __('iPhone 5S', 'kalimah-shortcodes') ,
				"iphone5c" => __('iPhone 5C', 'kalimah-shortcodes') ,
				"iphone6" => __('iPhone 6', 'kalimah-shortcodes') ,
				"iphone6plus" => __('iPhone 6 Plus', 'kalimah-shortcodes') ,
				"nexus5" => __('Nexus 5', 'kalimah-shortcodes') ,
				"lumia920" => __('Lumia 920', 'kalimah-shortcodes'),
				"galaxys5" => __('Samsung Galaxy S5', 'kalimah-shortcodes'),
				"htc-one" => __('HTC One', 'kalimah-shortcodes')
			),
			__("Tablets", 'kalimah-shortcodes') => array(
				"ipad" => __('iPad', 'kalimah-shortcodes')
			),
			__("Computers", 'kalimah-shortcodes') => array(
				"imac" => __('iMac', 'kalimah-shortcodes'),
				"macbook_pro" => __('MacBook Pro', 'kalimah-shortcodes')
			),
			__("Browsers", 'kalimah-shortcodes') => array(
				"firefox" => __('Firefox', 'kalimah-shortcodes') ,
				"chrome" => __('Chrome', 'kalimah-shortcodes') ,
				"safari" => __('Safari', 'kalimah-shortcodes') ,
				"ie" => __('IE', 'kalimah-shortcodes'),
			)
		)
	) ,
	array(
        "name" => __('Orientation', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "orientation",
        "type" => "radio",
		"std" => "portrait",
		"options" => array("portrait" => __("Portrait", 'kalimah-shortcodes'),
						  "landscape" => __("Landscape", 'kalimah-shortcodes')
		),
		"radio-switch" => "true"
    ),
	array(
        "name" => __('Display', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "display",
        "type" => "radio",
		"std" => "image",
		"options" => array("image" => __("Image", 'kalimah-shortcodes'),
						  "url" => __("URL", 'kalimah-shortcodes')
		),
		"enable-hide" => "true",
		"radio-switch" => "true"
    ),
	array(
        "type" => "softsection_start",
        "id" => "image"
    ),
	array(
		"name" => __('Image', 'kalimah-shortcodes'),
		"desc" => '',
		"id" => "image",
		"type" => "media",
		"std" => ""
	),
	 array(
        "type" => "softsection_end",
    ),
	array(
        "type" => "softsection_start",
        "id" => "url"
    ),
		array(
		"name" => __('URL', 'kalimah-shortcodes') ,
		"desc" => '',
		"id" => "url",
		"type" => "text",
		"std" => ""
	) ,
	 array(
        "type" => "softsection_end",
    ),
	array(
		"name" => __('Additional Class', 'kalimah-shortcodes') ,
		"desc" => '',
		"id" => "class",
		"type" => "text",
		"std" => ""
	) ,
	array(
		"text" => __('Insert Shortcode', 'kalimah-shortcodes') ,
		"desc" => '',
		"id" => "submit",
		"type" => "submit"
	) ,
	array(
		"type" => "section_end"
	)
);
echo $this->kalimah_options_process($mockup);

$animation = array(
    array(
        "name" => __('Animation', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "animation"
    ),

	array(
        "name" => __('Trigger', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "trigger",
        "type" => "radio",
		"std" => "hover",
		"options" => array("hover" => __("Hover", 'kalimah-shortcodes'),
						  "click" => __("Click", 'kalimah-shortcodes'),
						  "inview" => __("In View", 'kalimah-shortcodes'),
						  "delay" => __("Delay", 'kalimah-shortcodes')
		),
		"enable-hide" => "true",
		"radio-switch" => "true"
    ),
	 array(
        "type" => "softsection_start",
        "id" => "delay"
    ),
	array(
        "name" => __('Delay', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "delay",
        "type" => "range",
		"range" => "1,60",
		"units" => array(
            __('Minutes', 'kalimah-shortcodes'),
			__('Seconds', 'kalimah-shortcodes'),
        ),
		"std" => "10",
        "origianl_unites" => array(
            'm',
            's'
        ),
        "units_std" => __('Seconds', 'kalimah-shortcodes')
    ),
	 array(
        "type" => "softsection_end",
    ),

    array(
        "name" => __('Effect', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "effect",
        "type" => "select",
        "std" => "none",
        "options" => array(
             'bounce' => __('bounce', 'kalimah-shortcodes'),
			'flash' => __('flash', 'kalimah-shortcodes'),
			'pulse' => __('pulse', 'kalimah-shortcodes'),
			'rubberBand' => __('rubberBand', 'kalimah-shortcodes'),
			'shake' => __('shake', 'kalimah-shortcodes'),
			'swing' => __('swing', 'kalimah-shortcodes'),
			'tada' => __('tada', 'kalimah-shortcodes'),
			'wobble' => __('wobble', 'kalimah-shortcodes'),
			'jello' => __('jello', 'kalimah-shortcodes'),
			'bounceIn' => __('bounceIn', 'kalimah-shortcodes'),
			'bounceInDown' => __('bounceInDown', 'kalimah-shortcodes'),
			'bounceInLeft' => __('bounceInLeft', 'kalimah-shortcodes'),
			'bounceInRight' => __('bounceInRight', 'kalimah-shortcodes'),
			'bounceInUp' => __('bounceInUp', 'kalimah-shortcodes'),
			'bounceOut' => __('bounceOut', 'kalimah-shortcodes'),
			'bounceOutDown' => __('bounceOutDown', 'kalimah-shortcodes'),
			'bounceOutLeft' => __('bounceOutLeft', 'kalimah-shortcodes'),
			'bounceOutRight' => __('bounceOutRight', 'kalimah-shortcodes'),
			'bounceOutUp' => __('bounceOutUp', 'kalimah-shortcodes'),
			'fadeIn' => __('fadeIn', 'kalimah-shortcodes'),
			'fadeInDown' => __('fadeInDown', 'kalimah-shortcodes'),
			'fadeInDownBig' => __('fadeInDownBig', 'kalimah-shortcodes'),
			'fadeInLeft' => __('fadeInLeft', 'kalimah-shortcodes'),
			'fadeInLeftBig' => __('fadeInLeftBig', 'kalimah-shortcodes'),
			'fadeInRight' => __('fadeInRight', 'kalimah-shortcodes'),
			'fadeInRightBig' => __('fadeInRightBig', 'kalimah-shortcodes'),
			'fadeInUp' => __('fadeInUp', 'kalimah-shortcodes'),
			'fadeInUpBig' => __('fadeInUpBig', 'kalimah-shortcodes'),
			'fadeOut' => __('fadeOut', 'kalimah-shortcodes'),
			'fadeOutDown' => __('fadeOutDown', 'kalimah-shortcodes'),
			'fadeOutDownBig' => __('fadeOutDownBig', 'kalimah-shortcodes'),
			'fadeOutLeft' => __('fadeOutLeft', 'kalimah-shortcodes'),
			'fadeOutLeftBig' => __('fadeOutLeftBig', 'kalimah-shortcodes'),
			'fadeOutRight' => __('fadeOutRight', 'kalimah-shortcodes'),
			'fadeOutRightBig' => __('fadeOutRightBig', 'kalimah-shortcodes'),
			'fadeOutUp' => __('fadeOutUp', 'kalimah-shortcodes'),
			'fadeOutUpBig' => __('fadeOutUpBig', 'kalimah-shortcodes'),
			'flip' => __('flip', 'kalimah-shortcodes'),
			'flipInX' => __('flipInX', 'kalimah-shortcodes'),
			'flipInY' => __('flipInY', 'kalimah-shortcodes'),
			'flipOutX' => __('flipOutX', 'kalimah-shortcodes'),
			'flipOutY' => __('flipOutY', 'kalimah-shortcodes'),
			'lightSpeedIn' => __('lightSpeedIn', 'kalimah-shortcodes'),
			'lightSpeedOut' => __('lightSpeedOut', 'kalimah-shortcodes'),
			'rotateIn' => __('rotateIn', 'kalimah-shortcodes'),
			'rotateInDownLeft' => __('rotateInDownLeft', 'kalimah-shortcodes'),
			'rotateInDownRight' => __('rotateInDownRight', 'kalimah-shortcodes'),
			'rotateInUpLeft' => __('rotateInUpLeft', 'kalimah-shortcodes'),
			'rotateInUpRight' => __('rotateInUpRight', 'kalimah-shortcodes'),
			'rotateOut' => __('rotateOut', 'kalimah-shortcodes'),
			'rotateOutDownLeft' => __('rotateOutDownLeft', 'kalimah-shortcodes'),
			'rotateOutDownRight' => __('rotateOutDownRight', 'kalimah-shortcodes'),
			'rotateOutUpLeft' => __('rotateOutUpLeft', 'kalimah-shortcodes'),
			'rotateOutUpRight' => __('rotateOutUpRight', 'kalimah-shortcodes'),
			'slideInUp' => __('slideInUp', 'kalimah-shortcodes'),
			'slideInDown' => __('slideInDown', 'kalimah-shortcodes'),
			'slideInLeft' => __('slideInLeft', 'kalimah-shortcodes'),
			'slideInRight' => __('slideInRight', 'kalimah-shortcodes'),
			'slideOutUp' => __('slideOutUp', 'kalimah-shortcodes'),
			'slideOutDown' => __('slideOutDown', 'kalimah-shortcodes'),
			'slideOutLeft' => __('slideOutLeft', 'kalimah-shortcodes'),
			'slideOutRight' => __('slideOutRight', 'kalimah-shortcodes'),
			'zoomIn' => __('zoomIn', 'kalimah-shortcodes'),
			'zoomInDown' => __('zoomInDown', 'kalimah-shortcodes'),
			'zoomInLeft' => __('zoomInLeft', 'kalimah-shortcodes'),
			'zoomInRight' => __('zoomInRight', 'kalimah-shortcodes'),
			'zoomInUp' => __('zoomInUp', 'kalimah-shortcodes'),
			'zoomOut' => __('zoomOut', 'kalimah-shortcodes'),
			'zoomOutDown' => __('zoomOutDown', 'kalimah-shortcodes'),
			'zoomOutLeft' => __('zoomOutLeft', 'kalimah-shortcodes'),
			'zoomOutRight' => __('zoomOutRight', 'kalimah-shortcodes'),
			'zoomOutUp' => __('zoomOutUp', 'kalimah-shortcodes'),
			'hinge' => __('hinge', 'kalimah-shortcodes'),
			'rollIn' => __('rollIn', 'kalimah-shortcodes'),
			'rollOut' => __('rollOut', 'kalimah-shortcodes')
        )
    ), 
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
	array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($animation);

$heading = array(
    array(
        "name" => __('Heading', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "heading"
    ),
    array(
        "name" => __('Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "size",
        "type" => "range",
        "range" => "1,50",
        "step" => "1",
        "std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            'em',
			__('pt', 'kalimah-shortcodes'),
			'%'
        ),
        "origianl_unites" => array(
            'px',
            'rem',
			'pt',
			'%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker"
    ),
	array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "class" => "color-picker"
    ),
	array(
        "name" => __('Icon', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "heading_icon",
          "type" => "icons",
        "class" => "shortcode-icon-picker"
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "first-style",
        "options" => array(
            "no-style" => __('No Style', 'kalimah-shortcodes'),
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes')
        )
    ), 
	array(
        "name" => __('Align', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "align",
        "type" => "radio",
        "std" => "left",
        "options" => array(
            "left" => __('Left', 'kalimah-shortcodes'),
            "right" => __('Right', 'kalimah-shortcodes'),
            "center" => __('Center', 'kalimah-shortcodes')
        ),
		"radio-switch" => "true"
    ),
    
    array(
        "name" => __('Margin', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "margin",
        "type" => "range",
        "range" => "1,200",
        "step" => "1",
        "std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
        
    ),
    
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "text",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($heading);

# Get all categories and place them into array
$categories = get_categories('hide_empty=0&orderby=count&order=desc');
$wp_cats    = array();
foreach ($categories as $category_list) {
    $wp_cats[$category_list->cat_ID] = $category_list->cat_name . " (" . $category_list->count . ")";
}

# Get all tags and place them into aray
$tags    = get_tags('hide_empty=0&orderby=count&order=desc');
$wp_tags = array();
foreach ($tags as $tags_list) {
    $wp_tags[$tags_list->term_id] = $tags_list->name . " (" . $tags_list->count . ")";
}
$args = array(
    'post_type' => 'slides'
);

$gallery = array(
    array(
        "name" => __('Gallery', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "^_^gallery"
    ),
  array(
        "name" => __('Source', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "source",
        "type" => "radio",
        "std" => "media",
        "options" => array(
            "media" => __('Media', 'kalimah-shortcodes'),
            "categories" => __('Categories', 'kalimah-shortcodes'),
            "tags" => __('Tags', 'kalimah-shortcodes')
        ),
		"radio-switch" => "true",
		"enable-hide" => "true"
    ),
	array(
        "type" => "softsection_start",
        "id" => "media"
    ),
	array(
        "name" => __('Media', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "images",
        "type" => "media",
        "std" => "",
		"multiple" => "true"
    ),
	 array(
        "type" => "softsection_end",
    ),
	array(
        "type" => "softsection_start",
        "id" => "categories"
    ),
	 array(
        "name" => __('Categories', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "categories",
        "type" => "select",
        "options" => $wp_cats,
		"multiple" => "yes"
    ), 
	  array(
        "name" => __('Number', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "number",
        "type" => "range",
        "range" => "1,100",
        "std" => "10"
    ), 
	 array(
        "type" => "softsection_end",
    ),
	
	array(
        "type" => "softsection_start",
        "id" => "tags"
    ),
	 array(
        "name" => __('Tags', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "tags",
        "type" => "select",
        "options" => $wp_tags,
		"multiple" => "yes"
    ), 
	 array(
        "name" => __('Number', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "number",
        "type" => "range",
        "range" => "1,100",
        "std" => "10"
    ), 
	 array(
        "type" => "softsection_end",
    ),
	array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "first-style",
        "options" => array(
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($gallery);

$dummy_image = array(
    array(
        "name" => __('Dummy Image', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "dummy_image"
    ),
	  array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "first-style",
        "options" => array(
            "none" => __('None', 'kalimah-shortcodes'),
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes'),
            "fourth-style" => __('Fourth Style', 'kalimah-shortcodes')
        )
    ), 
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "step" => "1",
        "std" => "300"
    ), 
	array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "step" => "1",
        "std" => "300"
    ),
  
	array(
        "name" => __('Theme', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "theme",
        "type" => "select",
        "std" => "abstract",
        "options" => array(
            "random" => __('Random', 'kalimah-shortcodes'),
            "abstract" => __('Abstract', 'kalimah-shortcodes'),
            "animals" => __('Animals', 'kalimah-shortcodes'),
            "business" => __('Business', 'kalimah-shortcodes'),
            "cats" => __('Cats', 'kalimah-shortcodes'),
            "city" => __('City', 'kalimah-shortcodes'),
            "people" => __('People', 'kalimah-shortcodes'),
            "food" => __('Food', 'kalimah-shortcodes'),
            "nature" => __('Nature', 'kalimah-shortcodes'),
            "sports" => __('Sports', 'kalimah-shortcodes'),
            "technics" => __('Technology', 'kalimah-shortcodes'),
            "transport" => __('Trasnport', 'kalimah-shortcodes')
        )
    ), 
	array(
        "name" => __('Filter', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "filter",
        "type" => "select",
        "std" => "sepia",
        "options" => array(
            "none" => __('None', 'kalimah-shortcodes'),
            "blur" => __('Blur', 'kalimah-shortcodes'),
            "brightness" => __('Brightness', 'kalimah-shortcodes'),
            "contrast" => __('Contrast', 'kalimah-shortcodes'),
            "grayscale" => __('Grayscale', 'kalimah-shortcodes'),
            "hue-rotate" => __('Hue Rotate', 'kalimah-shortcodes'),
            "invert" => __('Invert', 'kalimah-shortcodes'),
            "opacity" => __('Opacity', 'kalimah-shortcodes'),
            "saturate" => __('Saturate', 'kalimah-shortcodes'),
            "sepia" => __('Sepia', 'kalimah-shortcodes')
        )
    ), 
	array(
        "name" => __('Filter level', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "level",
        "type" => "range",
        "range" => "1,100",
        "step" => "1",
        "std" => "20"
    ),
    
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($dummy_image);

$environment_content = array(
    array(
        "name" => __('Environment Specific Content', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "environment"
    ),
	  array(
        "name" => __('Operating System', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "os",
        "type" => "select",
		"options" => array('all' => __('All', 'kalimah-shortcodes'),
			'windows_10' => __('Windows 10', 'kalimah-shortcodes'),
			'windows_8' => __('Windows 8', 'kalimah-shortcodes'),
			'windows_7' => __('Windows 7', 'kalimah-shortcodes'),
			'windows_vista' => __('Windows VISTA', 'kalimah-shortcodes'),
			'windows_phone' => __('Windows Phone', 'kalimah-shortcodes'),
			'max_os_x' => __('Mac OS X', 'kalimah-shortcodes'),
			'max_os_9' => __('Mac OS 9', 'kalimah-shortcodes'),
			'linux' => __('Linux', 'kalimah-shortcodes'),
			'ubuntu' => __('Ubuntu', 'kalimah-shortcodes'),
			'android' => __('Android', 'kalimah-shortcodes'),
			'blackberry' => __('BlackBerry', 'kalimah-shortcodes')
		),
		"multiple" => "yes"
      ), 
	  array(
        "name" => __('Browser', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "browser",
        "type" => "select",
		"options" => array('all' => __('All', 'kalimah-shortcodes'),
			'firefox' => __('FireFox', 'kalimah-shortcodes'),
			'chrome' => __('Chrome', 'kalimah-shortcodes'),
			'edge' => __('Edge', 'kalimah-shortcodes'),
			'ie11' => __('Internet Explorer 11', 'kalimah-shortcodes'),
			'ie10' => __('Internet Explorer 10', 'kalimah-shortcodes'),
			'ie10' => __('Internet Explorer 10', 'kalimah-shortcodes'),
			'safari' => __('Safari', 'kalimah-shortcodes'),
			'opera' => __('Opera', 'kalimah-shortcodes'),
			'netscape' => __('Netscape', 'kalimah-shortcodes'),
			'konqueror' => __('Konqueror', 'kalimah-shortcodes')
		),
		"multiple" => "yes"
	),
	 array(
        "name" => __('Device', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "device",
        "type" => "select",
		"options" => array('all' =>__('All', 'kalimah-shortcodes'),
		'computer' =>__('Computer', 'kalimah-shortcodes'),
		'tablet' =>__('Tablet', 'kalimah-shortcodes'),
		'phone' =>__('Phone', 'kalimah-shortcodes')),
		"multiple" => "yes"
      ), 
	 array(
        "name" => __('Brand', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "brand",
        "type" => "select",
		"options" => array('all' => __('All', 'kalimah-shortcodes'),
			'samsung' => __('Samsung', 'kalimah-shortcodes'),
			'iphone' => __('iPhone', 'kalimah-shortcodes'),
			'ipad' => __('iPad', 'kalimah-shortcodes'),
			'lg' => __('LG', 'kalimah-shortcodes'),
			'nokia' => __('Nokia', 'kalimah-shortcodes'),
			'blackberry' => __('BlackBerry', 'kalimah-shortcodes'),
			'kindle' => __('Kindle', 'kalimah-shortcodes')
		),
		"multiple" => "yes"
      ), 
	   array(
        "name" => __('Continent', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "continent",
        "type" => "select",
		"options" => array('all' => __('All', 'kalimah-shortcodes'),
			'asia' => __('Asia', 'kalimah-shortcodes'),
			'africa' => __('Africa', 'kalimah-shortcodes'),
			'north_america' => __('North America', 'kalimah-shortcodes'),
			'south_america' => __('South America', 'kalimah-shortcodes'),
			'europe,' => __('Europe', 'kalimah-shortcodes'),
			'oceania' => __('Oceania', 'kalimah-shortcodes'),
			'antarctica' => __('Antarctica', 'kalimah-shortcodes')
		),
		"multiple" => "yes"
      ), 
    array(
        "name" => __('Content Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
		"options" => array('general' => __('General', 'kalimah-shortcodes'),
			'css' => __('CSS', 'kalimah-shortcodes')
			),
        "std" => "general",
		"radio-switch" => "true"
    ),
	array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($environment_content);

$divider = array(
    array(
        "name" => __('Divider', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "divider"
    ),
    array(
        "name" => __('Text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text",
        "type" => "text"
    ),
    array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "solid",
        "options" => array(
            "solid" => __('Default', 'kalimah-shortcodes'),
            "dotted" => __('Dotted', 'kalimah-shortcodes'),
            "dashed" => __('Dashed', 'kalimah-shortcodes'),
            "double" => __('Double', 'kalimah-shortcodes')
        )
    ),
	 array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "first-style",
        "options" => array(
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes')	

        )
    ),
    array(
        "name" => __('Divider Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Target Anchor', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "anchor",
        "type" => "text",
        "std" => "#"
    ), 
	array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "id" => "height",
        "type" => "range",
        "range" => "1,30",
        "std" => "3",
        "units" => __('px', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Margin', 'kalimah-shortcodes'),
        "id" => "margin",
        "type" => "range",
        "range" => "1,30",
        "std" => "3",
        "units" => __('px', 'kalimah-shortcodes')
    ),
    
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($divider);

$box = array(
    array(
        "name" => __('Box', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "box"
    ),
	array(
        "name" => __('Title', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "title",
        "type" => "text"
    ),
    array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "select",
        "options" => array(
            "shadow" => __('Shadow', 'kalimah-shortcodes'),
            "info" => __('Info', 'kalimah-shortcodes'),
            "success" => __('Success', 'kalimah-shortcodes'),
            "warning" => __('Warning', 'kalimah-shortcodes'),
            "error" => __('Error', 'kalimah-shortcodes'),
            "download" => __('Download', 'kalimah-shortcodes'),
            "note" => __('Note', 'kalimah-shortcodes')
        )
    ), 
	array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "options" => array(
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,600",
        "step" => "1",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => "%"
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,600",
        "step" => "1",
        "std" => "150",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
     array(
        "name" => __('Dismissable', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "dismissable",
        "type" => "switch",
        "std" => ""
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($box);


$button = array(
    array(
        "name" => __('Button', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "button"
    ),
    array(
        "name" => __('Icon', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "btn_icon",
        "type" => "icons",
        "class" => "shortcode-icon-picker"
    ),
    array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "size",
        "type" => "select",
        "std" => "small",
        "options" => array(
            "small" => __('Small', 'kalimah-shortcodes'),
            "medium" => __('Medium', 'kalimah-shortcodes'),
            "large" => __('Large', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "flat",
        "options" => array(
            "flat" => __('Flat', 'kalimah-shortcodes'),
            "gradient" => __('Gradient', 'kalimah-shortcodes'),
            "3d" => __('3D', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Link', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "link",
        "type" => "text",
        "std" => "http://"
    ),
    array(
        "name" => __('New Window', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "target",
        "type" => "switch",
        "std" => "checked"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "text",
        "std" => ''
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($button);

$tabs = array(
    array(
        "name" => __('Tabs', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "tabs"
    ),
    array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "horizontal",
        "options" => array(
            "horizontal" => __('Horizontal', 'kalimah-shortcodes'),
            "vertical" => __('Vertical', 'kalimah-shortcodes')
        ),
        "radio-switch" => 'true'
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Active tab bg color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "active_background_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Active tab text color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "active_text_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Tabs bg color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Tabs text color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Animation', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "animation",
        "type" => "select",
        "std" => "",
        "options" => array(
            'fade' => __('Fade', 'kalimah-shortcodes'),
            'vanish' => __('Vanish', 'kalimah-shortcodes'),
            'perspective' => __('Perspective', 'kalimah-shortcodes'),
            'space' => __('Space', 'kalimah-shortcodes'),
            'roll' => __('Roll', 'kalimah-shortcodes'),
            'rotate' => __('Rotate', 'kalimah-shortcodes'),
            'slide' => __('Slide', 'kalimah-shortcodes'),
            'tin' => __('Tin', 'kalimah-shortcodes'),
            'twist' => __('Twist', 'kalimah-shortcodes'),
            'hinge' => __('Hinge', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Tabs Align', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "tabs_align",
        "type" => "select",
        "std" => "",
        "options" => array(
            'start' => _x('Start', 'tabs', 'kalimah-shortcodes'),
            'center' => __('Center', 'kalimah-shortcodes'),
            'end' => _x('End', 'tabs', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes'),
            'third-style' => __('Third Style', 'kalimah-shortcodes'),
            'fourth-style' => __('Fourth Style', 'kalimah-shortcodes'),
            'fifth-style' => __('Fifth Style', 'kalimah-shortcodes'),
            'sixth-style' => __('Sixth Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
	 "name" => __('Tabs', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "tabs-sections",
        "type" => "sections",
		"main-class" => 'kalimah-shortcodes-tabs kalimah-shortcodes-sections',
        "std" => "",
		"section" => "
<script id='tab_section' language='text'>
<div class='tab-single-container kalimah-shortcodes-section-single'>
<span id='section-icon' data-target='section_icon' data-display='section-icon' class='section-icon'></span>
<input type='hidden' name='start_tag' value='tab'><span class='text'></span>
<input type='hidden' id='' name='tab[icon]' class='section_icon_input'>
<label>
<input type='radio' name='tab[active]'>
<span class='dashicons dashicons-yes'></span>
</label> 
<span class='delete dashicons dashicons-trash'></span> 
<input type='hidden' name='tab[title]' value='' class='title_hidden'> 
<textarea cols='45' rows='3' name='tab[content]'>".__('Content', 'kalimah-shortcodes')."</textarea> 
<input type='hidden' name='end_tag' value='tab'></div>
</script>"
		
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($tabs);

$pricing_table = array(
    array(
        "name" => __('Pricing Tables', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "pricing_tables"
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes'),
            'third-style' => __('Third Style', 'kalimah-shortcodes'),
            'fourth-style' => __('Fourth Style', 'kalimah-shortcodes'),
            'fifth-style' => __('Fifth Style', 'kalimah-shortcodes'),
            'sixth-style' => __('Sixth Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
	 "name" => __('Tables', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "pricing-sections",
        "type" => "sections",
		"main-class" => 'kalimah-shortcodes-pricing-sections kalimah-shortcodes-sections',
        "std" => "",
		"section" => "
<script id='pricing_tables_section' language='text'>
<div class='pricing_tables-single-container kalimah-shortcodes-section-single'>
<span id='section-icon' data-target='section_icon' data-display='section-icon' class='section-icon'></span>
<input type='hidden' name='start_tag' value='pricing_tables_section'><span class='text'></span>
<input type='hidden' id='' name='pricing_tables_section[icon]' class='section_icon_input'>
<label>
<input type='radio' name='pricing_tables_section[active]'>
<span class='dashicons dashicons-yes'></span>
</label> 
<span class='delete dashicons dashicons-trash'></span> 
<input type='hidden' name='pricing_tables_section[title]' value='' class='title_hidden'> 
<input name='pricing_tables_section[color]' class='color-picker' type='text' placeholder='".__('Color', 'kalimah-shortcodes')."'/>
<input name='pricing_tables_section[price]' type='text' placeholder='".__('Price', 'kalimah-shortcodes')."'/>
<input name='pricing_tables_section[unit]' type='text' placeholder='".__('Unit', 'kalimah-shortcodes')."'/>
<input name='pricing_tables_section[special]' type='text' placeholder='".__('Special Text', 'kalimah-shortcodes')."'/>
<input name='pricing_tables_section[btn_text]' type='text' placeholder='".__('Button Text', 'kalimah-shortcodes')."'/>
<input name='pricing_tables_section[link]' type='text' placeholder='".__('Link', 'kalimah-shortcodes')."'/>
<textarea cols='45' rows='3' name='pricing_tables_section[content]' placeholder='".__('Content', 'kalimah-shortcodes')."'></textarea> 
<input type='hidden' name='end_tag' value='pricing_tables_section'></div>
</script>"
		
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($pricing_table);

$tooltip = array(
    array(
        "name" => __('Tooltip', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "tooltip"
    ),
    array(
        "name" => __('Title', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "title",
        "type" => "text",
        "std" => ""
    ),
	 array(
        "name" => __('Text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text",
        "type" => "textarea",
        "rows" => "3",
        "placeholder" => __('Tooltip Text', 'kalimah-shortcodes')
    ),
   array(
        "name" => __('Trigger', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "trigger",
        "type" => "radio",
		"std" => "hover",
		"options" => array("hover" => __("Hover", 'kalimah-shortcodes'),
						  "click" => __("Click", 'kalimah-shortcodes'),
						  "inview" => __("In View", 'kalimah-shortcodes'),
						  "delay" => __("Delay", 'kalimah-shortcodes')
		),
		"enable-hide" => "true",
		"radio-switch" => "true"
    ),
	 array(
        "type" => "softsection_start",
        "id" => "delay"
    ),
	array(
        "name" => __('Delay', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "delay",
        "type" => "range",
		"range" => "1,60",
		"units" => array(
            __('Minutes', 'kalimah-shortcodes'),
			__('Seconds', 'kalimah-shortcodes'),
        ),
		"std" => "10",
        "origianl_unites" => array(
            'm',
            's'
        ),
        "units_std" => __('Seconds', 'kalimah-shortcodes')
    ),
	 array(
        "type" => "softsection_end",
    ),
	array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker",
    ),
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "bg_color",
        "type" => "text",
        "class" => "color-picker",
    ),
	array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes'),
            'third-style' => __('Third Style', 'kalimah-shortcodes')
        )
    ),
   array(
        "name" => __('Position', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "position",
        "type" => "radio",
		"std" => "top",
		"options" => array("top" => __("Top", 'kalimah-shortcodes'),
						  "right" => __("Right", 'kalimah-shortcodes'),
						  "bottom" => __("Bottom", 'kalimah-shortcodes'),
						  "left" => __("Left", 'kalimah-shortcodes')
		),
		"radio-switch" => "true"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "rows" => "3",
        "placeholder" => __('Tooltip Content', 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($tooltip);

$icon = array(
    array(
        "name" => __('Icon', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "icon"
    ),
    array(
        "name" => __('Icon', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "icon",
        "type" => "icons",
        "class" => "shortcode-icon-picker"
    ),
	array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker",
    ),
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "bg_color",
        "type" => "text",
        "class" => "color-picker",
    ),
	array(
        "name" => __('Hover Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'none' => __('None', 'kalimah-shortcodes'),
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes'),
            'third-style' => __('Third Style', 'kalimah-shortcodes'),
            'fourth-style' => __('Fourth Style', 'kalimah-shortcodes')
        )
    ),
   array(
        "name" => __('Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "size",
        "type" => "range",
		"std" => "20"
    ),
    array(
        "name" => __('Link', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "link",
        "type" => "text"
    ),
	array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($icon);

$list = array(
    array(
        "name" => __('List', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "list"
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes')
        )
    ),
	array(
        "name" => __('Icon', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "list_icon",
        "type" => "icons",
        "class" => "shortcode-icon-picker"
    ),
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "bg_color",
        "type" => "text",
        "class" => "color-picker"
    ),
	array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker"
    ),
    
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
	 array(
        "name" => __('List', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "list-section",
        "type" => "sections",
		"main-class" => 'kalimah-shortcodes-list kalimah-shortcodes-sections',
        "std" => "",
		"section" => "
<script id='list_section' language='text'>
<div class='list kalimah-shortcodes-section-single'>
<input type='hidden' name='start_tag' value='list_item'><span class='text'></span>
<span class='delete dashicons dashicons-trash'></span> 
<input type='hidden' name='list_item[content]' value='' class='title_hidden'> 
<input type='hidden' name='end_tag' value='list_item'></div>
</script>"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($list);

$features_list = array(
    array(
        "name" => __('Features List', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "features_list"
    ),
    array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "",
        "options" => array(
            'horizontal' => __('Horizontal', 'kalimah-shortcodes'),
            'vertical' => __('Vertical', 'kalimah-shortcodes')
        ),
		"std" => "horizontal",
		"radio-switch" => "true"
    ), 
	 array(
        "name" => __('Animation', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "animation",
        "type" => "select",
        "std" => "",
        "options" => array(
            'fadeIn' => __('Fade', 'kalimah-shortcodes'),
            'vanishIn' => __('Vanish', 'kalimah-shortcodes'),
            'perspectiveDownRetourn' => __('Perspective', 'kalimah-shortcodes'),
            'spaceInDown' => __('Space', 'kalimah-shortcodes'),
            'openDownRightRetourn' => __('Roll', 'kalimah-shortcodes'),
            'rotateUpIn' => __('Rotate', 'kalimah-shortcodes'),
            'slideUpIn' => __('Slide', 'kalimah-shortcodes'),
            'tinUpIn' => __('Tin', 'kalimah-shortcodes'),
            'twisterInDown' => __('Twist', 'kalimah-shortcodes')
        )
    ),
	array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker"
    ),
	
    	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "bg_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
	 array(
        "name" => __('List', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "features_list_item",
        "type" => "sections",
		"main-class" => 'kalimah-shortcodes-feature-list kalimah-shortcodes-sections',
        "std" => "",
		"section" => "
<script id='features_list_item' language='text'>
<div class='features-list kalimah-shortcodes-section-single'>
<span id='section-icon' data-target='features_list_section_icon' data-display='features-list-section-icon' class='section-icon'></span>
<input type='hidden' name='start_tag' value='features_list_item'><span class='text'></span>
<input type='hidden' id='features_list_section_icon' name='features_list_item[icon]' class='section_icon_input'>
<input type='hidden' id='' name='features_list_item[title]' class='title_hidden'>
<span class='delete dashicons dashicons-trash'></span> 
<input name='features_list_item[link]' type='text' placeholder='".__('Link', 'kalimah-shortcodes')."'/>
<textarea cols='45' rows='3' name='features_list_item[content]' placeholder='".__('Content', 'kalimah-shortcodes')."'></textarea> 
<input type='hidden' name='end_tag' value='features_list_item'></div>
</script>"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($features_list);

$highlight = array(
    array(
        "name" => __('Highlight', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "highlight"
    ),
    array(
        "name" => __('Highlight type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "background",
        "options" => array(
            'background' => __('Background Color', 'kalimah-shortcodes'),
            'underline' => __('Underline', 'kalimah-shortcodes')
        ),
        "radio-switch" => "yes"
    ),
    array(
        "name" => __('Highlight Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "highlight_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => __('Highlighted text', 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($highlight);

$typography = array(
    array(
        "name" => __('Typography', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "typography"
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "typography"
    ),
    array(
        "name" => __('Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "size",
        "type" => "range",
		"std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            'em',
			__('pt', 'kalimah-shortcodes'),
			'%'
        ),
        "origianl_unites" => array(
            'px',
            'rem',
			'pt',
			'%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
	
	 array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "std" => "",
        "class" => "color-picker"
    ),
	array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
		"rows" => "3",
        "std" => __('Content', 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($typography);

$members = array(
    array(
        "name" => __('Restricted Content', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "restricted"
    ),
    array(
        "name" => __('Text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "restrict_text",
        "type" => "text",
        "std" => __("This content is restricted for members only. Please %login% to view", 'kalimah-shortcodes')
    ),
    
    array(
        "name" => __('Login link text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "login_text",
        "type" => "text",
        "std" => __('Login', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Login link', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "login_link",
        "type" => "text",
        "std" => wp_login_url()
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => __('Restricted Content', 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($members);

$quote = array(
    array(
        "name" => __('Quote', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "quote"
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    
    array(
        "name" => __('Cite', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "cite",
        "type" => "text"
    ),
    array(
        "name" => __('Cite url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "cite_url",
        "type" => "text"
    ),
    array(
        "name" => __('Quote type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "block",
        "options" => array(
            'block' => __('Block Quote', 'kalimah-shortcodes'),
            'pull' => __('Pull Quote', 'kalimah-shortcodes')
        ),
        "radio-switch" => "yes",
        "enable-hide" => "true"
    ),
    array(
        "id" => "block",
        "type" => "softsection_start"
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes'),
            'third-style' => __('Third Style', 'kalimah-shortcodes'),
            'fourth-style' => __('Fourth Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "type" => "softsection_end"
    ),
    array(
        "id" => "pull",
        "type" => "softsection_start"
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes'),
            'third-style' => __('Third Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Align', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "align",
        "type" => "radio",
        "std" => "right",
        "options" => array(
            'left' => __('Left', 'kalimah-shortcodes'),
            'right' => __('Right', 'kalimah-shortcodes')
        )
    ),
    array(
        "type" => "softsection_end"
    ),
    array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "std" => "",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "std" => "",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => __('Quote', 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($quote);

$dropcap = array(
    array(
        "name" => __('Dropcap', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "dropcap"
    ),
    array(
        "name" => __('Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "size",
        "type" => "range",
        "range" => "1,7",
        "std" => "7"
    ), 
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker",
        "std" => ""
    ),
	array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "class" => "color-picker",
        "std" => "#000000"
    ),
	 array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "first-style",
        "options" => array(
            'first-style' => __('First Style', 'kalimah-shortcodes'),
            'second-style' => __('Second Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "text",
        "std" => __('D', 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($dropcap);

$youtube = array(
    array(
        "name" => 'Youtube',
        "type" => "section_start",
        "id" => "youtube"
    ),
    array(
        "name" => __('Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "url",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Auto Play', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "autoplay",
        "type" => "switch",
        "std" => 'n'
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($youtube);

$vimeo = array(
    array(
        "name" => 'Vimeo',
        "type" => "section_start",
        "id" => "vimeo"
    ),
    array(
        "name" => __('Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "url",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Auto Play', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "autoplay",
        "type" => "switch"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($vimeo);

$flickr_options = array(
    array(
        "name" => __('Flickr', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "flickr"
    ),
    array(
        "name" => __('User ID', 'kalimah-shortcodes'),
        "desc" => sprintf('<a target="_blank" href="//idgettr.com/">%s</a>', __('Get Flicker ID', 'kalimah-shortcodes')),
        "id" => 'user_id',
        "type" => "text",
        "std" => ''
    ),
    array(
        "name" => __('Order By', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => 'orderby',
        "type" => "radio",
        "std" => 'latest',
        "options" => array(
            "latest" => __('Latest Posts', 'kalimah-shortcodes'),
            "random" => __('Random Posts', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Display', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => 'number',
        "type" => "range",
        "range" => "1,10",
        "step" => "1",
        "std" => '6',
        "units" => __('Photos', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Photo Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => 'photo_size',
        "type" => "select",
        "std" => 'small',
        "options" => array(
            "thumb" => __('Thumbnail', 'kalimah-shortcodes'),
            "small" => __('Small', 'kalimah-shortcodes'),
            "medium" => __('Medium', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Flickr Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => 'size',
        "type" => "range",
        "range" => "1,100",
        "step" => "1",
        "std" => '100',
        "units" => "%"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);

echo $this->kalimah_options_process($flickr_options, false);

$audio = array(
    array(
        "name" => __('Audio', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "audio_player"
    ),
    array(
        "name" => __('Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "url",
        "type" => "text",
        "std" => ""
    ),
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Auto Play', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "autoplay",
        "type" => "switch"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($audio);

$video = array(
    array(
        "name" => __('Video', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "video_player"
    ),
    array(
        "name" => __('Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "url",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "300",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Auto Play', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "autoplay",
        "type" => "switch"
    ),
	array(
        "name" => __('Add Border', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "border",
        "type" => "switch",
		"std" => "false"
    ),
	array(
        "name" => __('Add Shadow', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "shadow",
        "type" => "switch",
		"std" => "true"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($video);

$soundcloud = array(
    array(
        "name" => 'Soundcloud',
        "type" => "section_start",
        "id" => "soundcloud"
    ),
    array(
        "name" => __('Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "url",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Auto Play', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "autoplay",
        "type" => "switch"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($soundcloud);

$slider = array(
    array(
        "name" => __('Slider', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "slider"
    ),
    array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "300",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "options" => array(
            'first-style' => __("First Style", 'kalimah-shortcodes'),
            'second-style' => __("Second Style", 'kalimah-shortcodes'),
            'third-style' => __("Third Style", 'kalimah-shortcodes')
        ),
        "std" => "first-style"
    ),
    array(
        "name" => __('Transition', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "transition",
        "type" => "select",
        "options" => array(
            'fade' => __('Fade', 'kalimah-shortcodes'),
            'vanish' => __('Vanish', 'kalimah-shortcodes'),
            'perspective' => __('Perspective', 'kalimah-shortcodes'),
            'space' => __('Space', 'kalimah-shortcodes'),
            'roll' => __('Roll', 'kalimah-shortcodes'),
            'rotate' => __('Rotate', 'kalimah-shortcodes'),
            'slide_vertical' => __('Slide Vertical', 'kalimah-shortcodes'),
            'slide_horizontal' => __('Slide Horizontal', 'kalimah-shortcodes'),
            'tin' => __('Tin', 'kalimah-shortcodes'),
            'twist' => __('Twist', 'kalimah-shortcodes'),
            'hinge' => __('Hinge', 'kalimah-shortcodes')
        ),
        "std" => "fade"
    ),
    array(
        "name" => __('Transition Interval', 'kalimah-shortcodes'),
        "id" => "interval",
        "type" => "range",
        "std" => "5",
        "range" => "1,15",
        "step" => "1",
        "units" => __("Seconds", 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Show Controls', 'kalimah-shortcodes'),
        "id" => "controls",
        "type" => "switch",
        "std" => "checked"
    ), 
	array(
        "name" => __('Show Title', 'kalimah-shortcodes'),
        "id" => "title",
        "type" => "switch",
        "std" => "checked"
    ),
    
    array(
        "name" => __('Display Bar', 'kalimah-shortcodes'),
        "id" => "bar",
        "type" => "switch",
        "std" => "checked"
    ),
    array(
        "name" => __('Auto Play', 'kalimah-shortcodes'),
        "id" => "autoplay",
        "type" => "switch",
        "std" => "checked"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
	 array(
        "name" => __('Slider', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "slider-section",
        "type" => "sections",
		"main-class" => 'kalimah-shortcodes-slider kalimah-shortcodes-sections',
        "std" => "",
		"section" => "
			<script id='slider_section' language='text'>
			<div class='slider kalimah-shortcodes-section-single'>
			<input type='hidden' name='start_tag' value='slide'><span class='text'></span>
			<label>
			<input type='radio' name='slide[active]'>
			<span class='dashicons dashicons-yes'></span>
			</label> 
			<span class='delete dashicons dashicons-trash'></span> 
			<input type='hidden' name='slide[title]' value='' class='title_hidden'> 
			<textarea cols='45' rows='3' name='slide[content]'>".__('Content', 'kalimah-shortcodes')."</textarea> 
			<input type='hidden' name='end_tag' value='slide'></div>
			</script>"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($slider);

$spoiler = array(
    array(
        "name" => __('Spoiler', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "spoiler"
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Title', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "title",
        "type" => "text"
    ), 
	array(
        "name" => __('Open Icon', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "open_icon",
        "type" => "icons",
        "class" => "icon-picker"
    ), 
	array(
        "name" => __('Close Icon', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "close_icon",
        "type" => "icons",
        "class" => "icon-picker"
    ), 
	array(
        "name" => __('Icon Alignment', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "align_icon",
        "type" => "radio",
        "std" => "left",
		"options"=> array('left' => __("Left",'kalimah-shortcodes'), 'right' => __("Right",'kalimah-shortcodes')), 
		"radio-switch" => "true"
    ), 
	array(
        "name" => __('Opened', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "opened",
        "type" => "switch",
    ), 
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
		"class" => "color-picker"
    ), 
	array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
		"class" => "color-picker"
    ), 
	array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
		"options"=> array('first-style' => __("First Style",'kalimah-shortcodes'), 'second-style' => __("Second Style",'kalimah-shortcodes'), 'third-style' => __("Third Style",'kalimah-shortcodes'))
    ), 
	array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ), 
	array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($spoiler);


$google_maps = array(
    array(
        "name" => __('Google Maps', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "google_maps"
    ),
    array(
        "name" => __('Address', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "address",
        "type" => "text",
        "std" => "",
        "class" => "geocomplete"
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "400",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => 'px'
    ),
    array(
        "name" => __('Show Marker', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "marker",
        "type" => "switch",
		"std" => "true"
    ), 
	array(
        "name" => __('Show Title', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "title",
        "type" => "switch",
		"std" => "true"
    ),
	array(
        "name" => __('Map Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
		"std" => "roadmap",
		"options" => array(
			'roadmap' => __("Roadmap", 'kalimah-shortcodes'),
			'satellite' => __("Satellite", 'kalimah-shortcodes'),
			'hybrid' => __("Hybrid", 'kalimah-shortcodes'),
			'terrain' => __("Terrain", 'kalimah-shortcodes')
		)
    ),
	array(
        "name" => __('Zoom', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "zoom",
        "type" => "range",
		"std" => "10",
		"range" =>"1,20"
    ),
	array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($google_maps);

$dummy_text = array(
    array(
        "name" => __('Dummy Text', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "dummytext"
    ),
    array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "words",
        "options" => array(
            "paras" => __('Paragraphs', 'kalimah-shortcodes'),
            "words" => __('Words', 'kalimah-shortcodes')
        ),
	"radio-switch" => "true"
    ),
    array(
        "name" => __('Amount', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "amount",
        "type" => "range",
        "std" => "10",
        "range" => "1,500"
    ),
    array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "color"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($dummy_text, false);

$args = array(
    'orderby' => 'name',
    'order' => 'ASC',
    'exclude_admin' => false,
    'hide_empty' => false,
    'echo' => false, //set to false so we can put the output into a variable
    'style' => 'none', //set to 'none' so it will jsut return the names (without the <li> tags)
    'html' => false
);

$authors_array = explode(',', wp_list_authors($args));
array_unshift($authors_array, __('Current Author', 'kalimah-shortcodes'));

$author = array(
    array(
        "name" => __('Author Box', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "author"
    ),
    array(
        "name" => __('Author Name', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "id",
        "type" => "select",
        "std" => "",
        "options" => $authors_array
    ),
	
	array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "std" => "first-style",
        "options" => array(
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes'),
            "fourth-style" => __('Fourth Style', 'kalimah-shortcodes'),
            "fifth-style" => __('Fifth Style', 'kalimah-shortcodes')
        )
    ),
	array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "class" => "color-picker",
    ),
	array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "class" => "color-picker",
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($author);

$qrcode = array(
    array(
        "name" => __('QR Code', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "qrcode"
    ),
    array(
        "name" => __('Text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text",
        "type" => "text",
        "std" => ""
    ), 
	array(
        "name" => __('Show Text', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "show_text",
        "type" => "switch",
        "std" => "false"
    ),
    array(
        "name" => __('Size', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "size",
        "type" => "range",
        "range" => "1,500",
        "std" => "300",
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($qrcode);

$columns = array(
    array(
        "name" => __('Columns', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "columns"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "columns"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($columns);

$columns_css = array(
    array(
        "name" => __('Columns CSS', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "columns_css"
    ),
    array(
        "name" => __('Counter', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "count",
        "type" => "range",
        "range" => "2,10",
		"std" => "3"
    ), 
	array(
        "name" => __('Gap', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "gap",
        "type" => "range",
        "range" => "1,100",
		"std" => "4",
		"units" => __("px", 'kalimah-shortcodes')
    ),
	array(
        "name" => __('Divider Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "0,20",
		"std" => "0",
		"units" => __("px", 'kalimah-shortcodes')
    ),
	array(
        "name" => __('Divider Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "select",
		"std" => "solid",
		 "options" => array(
            "solid" => __('Solid', 'kalimah-shortcodes'),
            "dotted" => __('Dotted', 'kalimah-shortcodes'),
            "dashed" => __('Dashed', 'kalimah-shortcodes'),
            "double" => __('Double', 'kalimah-shortcodes')
        )
    ),
	array(
        "name" => __('Divider Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "class" => "color-picker"
    ),
	array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($columns_css);

$accordion = array(
    array(
        "name" => __('Accordion', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "accordion"
    ),
    array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "horizontal",
        "options" => array(
            "horizontal" => __('Horizontal', 'kalimah-shortcodes'),
            "vertical" => __('Vertical', 'kalimah-shortcodes')
        ),
        "radio-switch" => 'true'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "0,1000",
        "step" => "10",
        "std" => "350",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => __('px', 'kalimah-shortcodes')
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "0,1000",
        "step" => "10",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
	 array(
        "name" => __('Trigger', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "trigger",
        "type" => "radio",
        "std" => "click",
        "options" => array(
            "click" => __('Click', 'kalimah-shortcodes'),
            "hover" => __('Hover', 'kalimah-shortcodes')
        ),
	"radio-switch" => "true"
    ),
	  array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "options" => array(
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes')
        )
    ),
	 array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "std" => "#195685",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "name" => __('Accordion', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "accordion-title",
        "type" => "sections",
		"main-class" => 'kalimah-shortcodes-accordion kalimah-shortcodes-sections',
        "std" => "",
		"section" => "
<script id='accordion_section' language='text'>
<div class='accordion kalimah-shortcodes-section-single'>
<input type='hidden' name='start_tag' value='accordion_section'><span class='text'></span>
<label>
<input type='radio' name='accordion_section[active]'>
<span class='dashicons dashicons-yes'></span>
</label> 
<span class='delete dashicons dashicons-trash'></span> 
<input type='hidden' name='accordion_section[title]' value='' class='title_hidden'> 
<textarea cols='45' rows='3' name='accordion_section[content]'>".__('Content', 'kalimah-shortcodes')."</textarea> 
<input type='hidden' name='end_tag' value='accordion_section'></div>
</script>"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($accordion);

$padding = array(
    array(
        "name" => __('Padding', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "padding"
    ),
    array(
        "name" => __('Top', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "top",
        "type" => "range",
        "range" => "1,100",
        "step" => "1",
        "std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Bottom', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "bottom",
        "type" => "range",
        "range" => "1,100",
        "step" => "1",
        "std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
	"name" => __('Left', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "left",
        "type" => "range",
        "range" => "1,100",
        "step" => "1",
        "std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Right', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "right",
        "type" => "range",
        "range" => "1,100",
        "step" => "1",
        "std" => "20",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => ""
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($padding);



$progress_bar = array(
    array(
        "name" => __('Progress Bars', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "progress_bar"
    ),
	array(
        "name" => __('Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "options" => array(
            "horizontal" => __('Horizontal', 'kalimah-shortcodes'),
            "vertical" => __('Vertical', 'kalimah-shortcodes'),
            "circualr" => __('Circular', 'kalimah-shortcodes')
        ),
		"radio-switch" => "true",
		"std" => "horizontal"
    ),
    array(
        "name" => __('Heading', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "heading",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ), 
	array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Percentage', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "percentage",
        "type" => "range",
        "range" => "1,100",
        "std" => "50",
        "units" => '%'
    ),
    array(
        "name" => __('Style', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "style",
        "type" => "select",
        "options" => array(
            "first-style" => __('First Style', 'kalimah-shortcodes'),
            "second-style" => __('Second Style', 'kalimah-shortcodes'),
            "third-style" => __('Third Style', 'kalimah-shortcodes'),
            "fourth-style" => __('Fourth Style', 'kalimah-shortcodes'),
            "fifth-style" => __('Fifth Style', 'kalimah-shortcodes')
        )
    ),
    array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "background_color",
        "type" => "text",
        "std" => "#195685",
        "class" => "color-picker"
    ),
    array(
        "name" => __('Show Percentage', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "show_percentage",
        "type" => "switch",
        "std" => "checked"
    ),
    array(
        "name" => __('Striped', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "show_stripes",
        "type" => "switch",
        "std" => "n"
    ),
    array(
        "name" => __('Animated', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "animated",
        "type" => "switch",
        "std" => "checked"
    ),
    array(
        "name" => __('Additional Class', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "class",
        "type" => "text"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($progress_bar);

$content_box = array(
    array(
        "name" => __('Content Box', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "content_box"
    ),
    array(
        "name" => __('Width', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "width",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Height', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "height",
        "type" => "range",
        "range" => "1,1000",
        "std" => "100",
        "units" => array(
            __('px', 'kalimah-shortcodes'),
            '%'
        ),
        "origianl_unites" => array(
            'px',
            '%'
        ),
        "units_std" => '%'
    ),
    array(
        "name" => __('Background Type', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "type",
        "type" => "radio",
        "std" => "pattern",
        "options" => array(
            "pattern" => __("Pattern", 'kalimah-shortcodes'),
            "image" => __("Image", 'kalimah-shortcodes'),
            "color" => __("Color", 'kalimah-shortcodes'),
            "video" => __("Video", 'kalimah-shortcodes')
        ),
        "enable-hide" => "yes"
    ),
    array(
        "name" => __('Text Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_color",
        "type" => "text",
        "std" => "#000000",
        "class" => "color-picker"
    ),
    array(
        "id" => "pattern",
        "type" => "softsection_start"
    ),
    array(
        "name" => __('Pattern', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "pattern_name",
        "type" => "images",
        "options" => array(
            'black_thread' => 'includes/patterns/black_thread.png',
            'congruent_outline' => 'includes/patterns/congruent_outline.png',
            'eight_horns' => 'includes/patterns/eight_horns.png',
            'escheresque_ste' => 'includes/patterns/escheresque_ste.png',
            'footer_lodyas' => 'includes/patterns/footer_lodyas.png',
            'gplaypattern' => 'includes/patterns/gplaypattern.png',
            'paisley' => 'includes/patterns/paisley.png',
            'gplaypattern' => 'includes/patterns/gplaypattern.png',
            'retina_wood' => 'includes/patterns/retina_wood.png',
            'tree_bark' => 'includes/patterns/tree_bark.png',
            'VF_aa01' => 'includes/patterns/VF_aa01.png',
            'VF_aa02' => 'includes/patterns/VF_aa02.png',
            'VF_aa03' => 'includes/patterns/VF_aa03.png',
            'VF_aa04' => 'includes/patterns/VF_aa04.png',
            'VF_aa05' => 'includes/patterns/VF_aa05.png',
            'VF_aa06' => 'includes/patterns/VF_aa06.png',
            'VF_aa07' => 'includes/patterns/VF_aa07.png',
            'VF_aa08' => 'includes/patterns/VF_aa08.png',
            'VF_aa09' => 'includes/patterns/VF_aa09.png',
            'VF_aa11' => 'includes/patterns/VF_aa11.png',
            'VF_aa12' => 'includes/patterns/VF_aa12.png',
            'VF_aa13' => 'includes/patterns/VF_aa13.png',
            'floral-1' => 'includes/patterns/floral-1.png',
            'floral-2' => 'includes/patterns/floral-2.png',
            'floral-3' => 'includes/patterns/floral-3.png',
            'floral-4' => 'includes/patterns/floral-4.png',
            'floral-5' => 'includes/patterns/floral-5.png',
            'floral-6' => 'includes/patterns/floral-6.png',
            'floral-7' => 'includes/patterns/floral-7.png',
            'floral-8' => 'includes/patterns/floral-8.png',
            'floral-9' => 'includes/patterns/floral-9.png',
            'stripes1' => 'includes/patterns/stripes1.png',
            'stripes2' => 'includes/patterns/stripes2.png',
            'stripes3' => 'includes/patterns/stripes3.png',
            'stripes4' => 'includes/patterns/stripes4.png',
            'stripes5' => 'includes/patterns/stripes5.png',
            'stripes6' => 'includes/patterns/stripes6.png',
            'stripes7' => 'includes/patterns/stripes7.png',
            'stripes8' => 'includes/patterns/stripes8.png',
            'stripes9' => 'includes/patterns/stripes9.png',
            'stripes10' => 'includes/patterns/stripes10.png',
            'Dotted1' => 'includes/patterns/Dotted1.png',
            'Dotted2' => 'includes/patterns/Dotted2.png',
            'Dotted3' => 'includes/patterns/Dotted3.png',
            'Dotted4' => 'includes/patterns/Dotted4.png',
            'Dotted5' => 'includes/patterns/Dotted5.png',
            'Dotted6' => 'includes/patterns/Dotted6.png',
            'Dotted7' => 'includes/patterns/Dotted7.png',
            'Dotted8' => 'includes/patterns/Dotted8.png',
            'Dotted9' => 'includes/patterns/Dotted9.png',
            'Dotted10' => 'includes/patterns/Dotted10.png',
            'Dotted11' => 'includes/patterns/Dotted11.png',
            'Dotted12' => 'includes/patterns/Dotted12.png',
            'Dotted13' => 'includes/patterns/Dotted13.png',
            'Dotted14' => 'includes/patterns/Dotted14.png',
            'Dotted15' => 'includes/patterns/Dotted15.png',
            'Dotted16' => 'includes/patterns/Dotted16.png',
            'Dotted17' => 'includes/patterns/Dotted17.png',
            'Dotted18' => 'includes/patterns/Dotted18.png',
            'green01' => 'includes/patterns/green01.png',
            'green02' => 'includes/patterns/green02.png',
            'green03' => 'includes/patterns/green03.png',
            'green04' => 'includes/patterns/green04.png',
            'green05' => 'includes/patterns/green05.png',
            'green06' => 'includes/patterns/green06.png',
            'green07' => 'includes/patterns/green07.png',
            'green08' => 'includes/patterns/green08.png',
            'green09' => 'includes/patterns/green09.png',
            'green10' => 'includes/patterns/green10.png',
            'green11' => 'includes/patterns/green11.png',
            'green12' => 'includes/patterns/green12.png',
            'green13' => 'includes/patterns/green13.png',
            'green14' => 'includes/patterns/green14.png',
            'green15' => 'includes/patterns/green15.png',
            'green16' => 'includes/patterns/green16.png',
            'green17' => 'includes/patterns/green17.png',
            'green18' => 'includes/patterns/green18.png',
            'green19' => 'includes/patterns/green19.png',
            'green20' => 'includes/patterns/green20.png',
            'green21' => 'includes/patterns/green21.png',
            'green22' => 'includes/patterns/green22.png',
            'blue01' => 'includes/patterns/blue01.png',
            'blue02' => 'includes/patterns/blue02.png',
            'blue03' => 'includes/patterns/blue03.png',
            'blue04' => 'includes/patterns/blue04.png',
            'blue05' => 'includes/patterns/blue05.png',
            'blue06' => 'includes/patterns/blue06.png',
            'blue07' => 'includes/patterns/blue07.png',
            'blue08' => 'includes/patterns/blue08.png',
            'blue09' => 'includes/patterns/blue09.png',
            'blue10' => 'includes/patterns/blue10.png',
            'blue11' => 'includes/patterns/blue11.png',
            'blue12' => 'includes/patterns/blue12.png',
            'blue13' => 'includes/patterns/blue13.png',
            'blue14' => 'includes/patterns/blue14.png',
            'blue15' => 'includes/patterns/blue15.png',
            'blue16' => 'includes/patterns/blue16.png',
            'blue17' => 'includes/patterns/blue17.png',
            'blue18' => 'includes/patterns/blue18.png',
            'blue19' => 'includes/patterns/blue19.png',
            'blue20' => 'includes/patterns/blue20.png',
            'blue21' => 'includes/patterns/blue21.png',
            'blue22' => 'includes/patterns/blue22.png',
            'blue23' => 'includes/patterns/blue23.png',
            'blue24' => 'includes/patterns/blue24.png',
            'blue25' => 'includes/patterns/blue25.png',
            'blue26' => 'includes/patterns/blue26.png',
            'blue27' => 'includes/patterns/blue27.png'
        ),
        "std" => ""
    ),
    array(
        "type" => "softsection_end"
    ),
    array(
        "id" => "image",
        "type" => "softsection_start"
    ),
    array(
        "name" => __('Image Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "image_url",
        "type" => "media",
        "std" => ""
    ),
    array(
        "type" => "softsection_end"
    ),
    array(
        "id" => "video",
        "type" => "softsection_start"
    ),
    array(
        "name" => __('Video Url', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "video_url",
        "type" => "text",
        "std" => ""
    ),
    array(
        "type" => "softsection_end"
    ),
    array(
        "id" => "color",
        "type" => "softsection_start"
    ),
    array(
        "name" => __('Background Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "bg_color",
        "type" => "text",
        "std" => "#f5f5f5",
        "class" => "color-picker"
    ),
    array(
        "type" => "softsection_end"
    ),
      array(
        "name" => __('Enable parallax', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "parallax",
        "type" => "switch",
        "std" => "true"
    ),
    array(
        "name" => __('Content', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "content",
        "type" => "textarea",
        "std" => "",
        "rows" => "3"
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($content_box);

$counter = array(
    array(
        "name" => __('Counter', 'kalimah-shortcodes'),
        "type" => "section_start",
        "id" => "counter"
    ),
    array(
        "name" => _x('Start', 'counter', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "start",
        "type" => "text",
        "std" => "0"
    ),
    array(
        "name" => _x('End', 'counter','kalimah-shortcodes'),
        "desc" => '',
        "id" => "end",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Prefix', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "prefix",
        "type" => "icons",
        "std" => ""
    ),
    array(
        "name" => __('Suffix', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "suffix",
        "type" => "icons",
        "std" => ""
    ),
    array(
        "name" => __('Text above', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_above",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Text below', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "text_below",
        "type" => "text",
        "std" => ""
    ),
    array(
        "name" => __('Color', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "color",
        "type" => "text",
        "std" => "",
        'class' => 'color-picker'
    ),
    array(
        "name" => __('Zero Padding', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "zero_padding",
        "type" => "switch",
        "std" => "checked"
    ), 
	array(
        "name" => __('Add Comma', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "comma",
        "type" => "switch",
        "std" => "checked"
    ),
    array(
        "name" => __('Animation Speed', 'kalimah-shortcodes'),
        "desc" => __('The total speed of entire animation', 'kalimah-shortcodes'),
        "id" => "speed",
        "type" => "range",
        "std" => "5",
        "range" => "1,25",
        "step" => "0.5",
        "units" => __("Seconds", 'kalimah-shortcodes')
    ),
    array(
        "text" => __('Insert Shortcode', 'kalimah-shortcodes'),
        "desc" => '',
        "id" => "submit",
        "type" => "submit"
    ),
    array(
        "type" => "section_end"
    )
);
echo $this->kalimah_options_process($counter);

	?>
  </div>
  </div>
</div>
<?php
}



/*--- 2. Shortcodes Functions ---*/
/**--- 2.1 Boxes ---*/
function kalimah_shortcode_box( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'type' => 'success',
		'title' => '',
		'class' => '',
		'style' => 'first-style',
		'dismissable' => 'false',
		'width' => '100%',
		'height' => '150px',
	), $atts));	

	$style_inline = " style='width:{$width}; height:{$height};'";

	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-box {$type} {$class} {$align} {$style}' {$style_inline}>";
	$shortcode .= "<div class='kalimah-shortcodes-box-inner'><i class='fa box-icon'></i>";
	
	if($title != '')
		$shortcode .= '<span class="title">'.do_shortcode($title).'</span>';
	
	if($dismissable == 'true')
		$shortcode .= '<span class="close">×</span>';
	
	$shortcode .= '<span>' .do_shortcode($content). '</span></div></div>';
    return $shortcode;
}


/**--- 2.2 Dropcap  ---*/
function kalimah_dropcap_shortcode( $atts, $content = null ) { 
		extract(shortcode_atts(array(
		'style' => 'first-style',
		'size' => '5',
		'class' => '',
		'background_color' => '',
		'text_color' => '#000000'
	), $atts));	

	if($style == 'second-style')
		$style_inline = "background-color: {$background_color};";
	
	$size = ($size * 100) + 100;
    return "<span class='kalimah-shortcodes kalimah-shortcodes-dropcap {$style}' style='font-size: {$size}%; color:{$text_color};{$style_inline}'>".do_shortcode($content)."</span>";  
}  


/**--- 2.3 Divider ---*/
function kalimah_shortcode_divider( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'type' => 'solid',
		'style' => 'first-style',
		'margin' => '5',
		'class' => '',
		'height' => '',
		'text' => '',
		'anchor' => '#',
		'color' => '#000000',
		'text_color' => '#000000'
	), $atts));	

	
	$shortcode .= "<div class='kalimah-shortcodes kalimah-shortcodes-divider {$class} {$style}' style='margin-top:{$margin}px; margin-bottom:{$margin}px;'>";
	
	if($text != "")
		$shortcode .="<span class='kalimah-shortcodes-top-text' data-anchor='{$anchor}' style='color:{$text_color};'>{$text}</span>";
	
   if($type == 'double' && $height < 3)
	   $height = 3;
   
   $shortcode .= "<hr style='border: 0px; border-bottom: {$height}px {$type} {$color};'>";
   $shortcode .= "</div>";
   return $shortcode;
}

/**--- 2.4 List  ---*/
function kalimah_shortcode_list( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'list_icon' => 'checkbox',
		'color' => '#000000',
		'bg_color' => '',
		'style' => 'first-style',
		'class' => ''
	), $atts));	
	
	$this->list_icon = $list_icon;
	$this->list_color = $color;
	$this->list_bg_color = $bg_color;
	$this->list_style = $style;
	
    return "<div class='kalimah-shortcodes {$style} kalimah-shortcodes-list'><ul>".do_shortcode($content)."</ul></div>";
}

function kalimah_shortcode_list_item( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'class' => ''
	), $atts));	
	
	if($this->list_style == 'second-style')
		$css = "background-color:{$this->list_bg_color};";
	
	return "<li class='kalimah-shortcodes kalimah-shortcodes-list-item'><i class='{$this->list_icon}' style='color:{$this->list_color}; {$css}'></i><span>".do_shortcode($content)."</span></li>";
}



/**--- 2.5 Heading ---*/
function kalimah_shortcode_heading( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'style' => 'solid',
		'margin' => '10px',
		'style' => 'first-style',
		'background_color' => '#000000',
		'text_color' => '#000000',
		'class' => '',
		'heading_icon' => '',
		'align' => 'center',
		'size' => '15px'
	), $atts));

	$unique_heading_style = uniqid('heading_style');
	
	$background_color_object = new Color($background_color);
	$style_css = ".kalimah-shortcodes-heading.third-style.{$unique_heading_style},
				 .kalimah-shortcodes-heading.second-style.{$unique_heading_style} > span
					 {
						background-color: {$background_color};
						color: {$text_color};
					}
				
					 .kalimah-shortcodes-heading.third-style.{$unique_heading_style}::after
						 {
						background-color: #{$background_color_object->darken(15)};
					}
					
					.kalimah-shortcodes-heading.first-style.{$unique_heading_style} > span,
					.kalimah-shortcodes-heading.second-style.{$unique_heading_style},
					 .kalimah-shortcodes-heading.first-style.{$unique_heading_style}
					 {
						border-bottom-color: {$background_color};
						color: {$text_color};
					}";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
    $shortcode = "<div style='text-align:{$align}; font-size:{$size}; line-height:{$size}; margin-top:{$margin}; margin-bottom:{$margin};'";
	$shortcode .= " class='kalimah-shortcodes kalimah-shortcodes-heading {$style} {$class} {$unique_heading_style}'>";
	$shortcode .= "<span><i class='{$heading_icon}'></i>";
	$shortcode .= "<span>".do_shortcode($content)."</span></span>";
	$shortcode .= "</div>";
	
   return $shortcode;
}


/**--- 2.6 Highlight ---*/
function kalimah_highlight_shortcode( $atts, $content = null ) {
   extract(shortcode_atts(array(
		'color' => '',
		'type' => 'background',
		'highlight_color' => '',
		'class' => ''
	), $atts));
	
	if($type == 'background')
		$style = "background-color: {$highlight_color};";
	else if($type == 'underline')
		$style = "border-bottom: 1px dashed {$highlight_color};";
		
    return "<span class='kalimah-shortcodes kalimah-shortcodes-highlight {$class}' style='{$style} color: {$color}; padding: 1px;'>".do_shortcode($content)."</span>";  
}



/**--- 2.7 Quote ---*/
function kalimah_quote_shortcode( $atts, $content = null ) {
	 extract(shortcode_atts(array(
		'height' => '100%',
		'width' => '100%',
		'type' => 'block',
		'background_color' => '#ffffff',
		'text_color' => '',
		'style' => 'first-style',
		'align' => 'right',
		'cite' => '',
		'cite_url' => '',
		'class' => ''
	), $atts));

	$border_color = new Color($background_color);
	
	$unique_quote_style = uniqid('quote_style');
	$style_css = "
	
	.kalimah-shortcodes-quote.$unique_quote_style
	{
		height: $height;
		width: $width;
	}
	
	.kalimah-shortcodes-quote.block.first-style.$unique_quote_style
	{
		background-color: $background_color;
		color: $text_color;
		border-left-color: $text_color;
	}
	
	.kalimah-shortcodes-quote.block.first-style.$unique_quote_style::before {
	 color: $text_color;
	}
	
	.kalimah-shortcodes-quote.block.second-style.$unique_quote_style
	{
		border-left-color: $text_color;
		background-color: $background_color;
		color: $text_color;
	}
	
	.kalimah-shortcodes-quote.block.second-style.$unique_quote_style .quote-body::before {
	 color: $text_color;
	}
	
	.kalimah-shortcodes-quote.block.third-style.$unique_quote_style
	{
		border-top-color: $text_color;
		background-color: $background_color;
		color: $text_color;
	}
	
	.kalimah-shortcodes-quote.block.third-style.$unique_quote_style .quote-body::before {
	 color: $background_color;
	}
	
	.kalimah-shortcodes-quote.block.fourth-style.$unique_quote_style
	{
		background-color: $background_color;
		color: $text_color;
		border: 1px solid #".$border_color->darken(15).";
	}
	
	.kalimah-shortcodes-quote.block.fourth-style.$unique_quote_style cite
	{
		background-color: $text_color;
		color: $background_color;
	}
	
	.kalimah-shortcodes-quote.block.fourth-style.$unique_quote_style .quote-body::before {
	 color: $background_color;
	}
	
	.kalimah-shortcodes-quote.pull.first-style.$unique_quote_style
	{
		background-color: $background_color;
		color: $text_color;
		border-left-color: $text_color;
	}
	
	.kalimah-shortcodes-quote.pull.first-style.$unique_quote_style::before {
	 color: $text_color;
	}
	
	.kalimah-shortcodes-quote.pull.second-style.$unique_quote_style
	{
		border-top-color: $text_color;
		background-color: $background_color;
		color: $text_color;
	}
	
	.kalimah-shortcodes-quote.pull.second-style.$unique_quote_style .quote-body::before {
	 color: $background_color;
	}
	
	.kalimah-shortcodes-quote.pull.third-style.$unique_quote_style
	{
		background-color: $background_color;
		color: $text_color;
		border: 1px solid #".$border_color->darken(15).";
	}
	
	.kalimah-shortcodes-quote.pull.third-style.$unique_quote_style cite
	{
		background-color: $text_color;
		color: $background_color;
	}
	
	.kalimah-shortcodes-quote.pull.third-style.$unique_quote_style cite::before
	{
	 color: $text_color;
	}
	
	";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
    $quote = "<blockquote class='kalimah-shortcodes kalimah-shortcodes-quote {$type} {$unique_quote_style} {$class} {$style} {$align}'><span class='quote-body'>".do_shortcode($content)."</span><cite>";
	
	if($cite_url != "")
		$quote .= "<a href='$cite_url'>$cite</a>";
	else
		$quote .= $cite;
	
    $quote .= "</cite></blockquote>";
	
	return $quote;
}  

/**--- 2.8 YouTube ---*/
function kalimah_youtube_shortcode( $atts, $content = null ) {
    if( is_array( $atts ) ) extract($atts);

    $url = parse_url($url);
	parse_str($url['query'], $query);

	return '<iframe class="kalimah-shortcodes kalimah-shortcodes-youtube '.$class.'" width="'.$width.'" height="'.$height.'px" src="https://www.youtube.com/embed/'.$query['v'].'?autoplay='.$autoplay.'" allowfullscreen></iframe>';
}  

/**--- 2.9 Vimeo ---*/
function kalimah_vimeo_shortcode( $atts, $content = null ) {
	$class=' ';
    if( is_array( $atts ) ) extract($atts);


    $data = wp_remote_get("https://vimeo.com/api/oembed.json?url=".$url);
	$data = wp_remote_retrieve_body($data);
	$data = json_decode($data);

	return "<iframe class='kalimah-shortcodes kalimah-shortcodes-vimeo {$class}' src='https://player.vimeo.com/video/{$data->video_id}?autoplay={$autoplay}' width='{$width}' height='{$height}' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

}  

/**--- 2.10 Audio ---*/
function kalimah_audio_player_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'autoplay' => 'false',
		'width' => '100%',
		'background_color' => '',
		'url' => '',
		'height' => '',
		'class' => ''
	), $atts));	

	if($autoplay == 'true')
		$play = 'autoplay';
	
	return "<audio {$play} class='kalimah-shortcodes kalimah-shortcodes-audio {$class}' controls='controls' style='width:{$width}; background-color: {$background_color};'>
			<source src='{$url}' /> 
			Your browser does not support the audio element.			
		</audio>";

}  

/**--- 2.11 Maps ---*/
function kalimah_google_maps_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'api_key' 		=> false,
		'address' 		=> '',
		'lat' 			=> '',
		'lng' 			=> '',
		'zoom' 			=> '15',
		'type' 			=> 'roadmap',
		'height'    	=> '350px',
		'width'			=> '350px',
		'marker'    	=> 'true',
		'title'    	    => 'true'
	), $atts));	
	
	
	$uniqid = uniqid( 'google_maps' );
	
	// show marker or not
	$marker = ($marker == 'true') ? true : false;
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-maps {$class}'>";
	
	if($title == 'true')
		$shortcode .= "<div class='kalimah-shortcodes-maps-title {$class}'>{$address}</div>";
	
	$shortcode .= "<div id='{$uniqid}' class='kalimah-shortcodes-maps-map {$class}' style='height:{$height}; width:{$width}; '></div>";
	
	// Find lan/lat for address
     $address = str_replace(" ", "+", $address);

	$response = wp_remote_get("http://maps.google.com/maps/api/geocode/json?address=".$address."&sensor=false&marker=true");
	$json = json_decode($response['body']);
	

	$lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
	$lng = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};

	
	ob_start();
	?>
    <script type="text/javascript">
	jQuery(document).ready(function() {

		var map_<?php echo $uniqid; ?>;
		var marker_<?php echo $uniqid; ?>;
		var geocoder = new google.maps.Geocoder();
		
		var location = new google.maps.LatLng("<?php echo $lat; ?>", "<?php echo $lng; ?>");
		var map_options = {
			zoom: <?php echo $zoom; ?>,
			center: location,
			mapTypeId: '<?php echo $type; ?>',
		}
		
		map_<?php echo $uniqid; ?> = new google.maps.Map(document.getElementById("<?php echo $uniqid; ?>"), map_options);
		
		<?php if ( $marker ): ?>
			marker_<?php echo $uniqid ?> = new google.maps.Marker({
				position: location,
				map: map_<?php echo $uniqid; ?>
			});
		<?php endif; ?>
	});
		
	</script>
	<?php
	
	$shortcode .= ob_get_clean();
	$shortcode .= '</div>';
	return $shortcode;
	
	//return '<iframe class="kalimah-shortcodes kalimah-shortcodes-maps '.$class.'" width="'.$width.'" height="'.$height.'" marginheight="0" marginwidth="0" src="http://my.ctrlq.org/maps/#roadmap|17|'.$lat.'|'.$long.'"></iframe>';
}  

/**--- 2.12 Video ---*/
function kalimah_video_player_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'autoplay' => 'false',
		'width' => '100%',
		'height' => '',
		'shadow' => 'true',
		'border' => 'false',
		'url' => '',
		'class' => ''
	), $atts));	
	
	$play = 'none';
	
	if($autoplay == 'true')
		$play = 'autoplay';
	
	if($shadow == 'true')
		$style = 'box-shadow: 0 0 9px black;';
	
	if($border == 'true')
		$style .= ' border: 1px solid black;';
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-video {$class}' style='{$style} width:{$width}; height:{$height};'  >";
	$shortcode .= "<video controls='controls' autplay='{$play}' >";
	$shortcode .= "<source src='{$url}' /> ";
	$shortcode .= "Your browser does not support the video element.	</video>";
	$shortcode .= "</div>";
	
	return $shortcode;
		
}  

/**--- 2.13 Soundcloud ---*/
function kalimah_soundcloud_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'autoplay' => 'false',
		'width' => '100%',
		'height' => '',
		'url' => '',
		'class' => ''
	), $atts));	
	

		$protocol = is_ssl() ? 'https' : 'http';
		$data = wp_remote_get($protocol."://soundcloud.com/oembed?url=".$url."&format=json&auto_play=".$autoplay."&show_artwork=true&maxheight='{$height}'&show_comments=true");
		$data = wp_remote_retrieve_body($data);
		$data = json_decode($data);
		
		return "<div class='kalimah-shortcodes-soundcloud' style='width: {$width}; height: {$height}; margin: 10px 0;'>".$data->html."</div>";

}  

/**--- 2.14 Dummy Text ---*/
function kalimah_dummytext_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'type' => 'paras',
		'amount' => '3',
		'color' => '',
		'class' => ''
	), $atts));
	
	include_once("includes/LipsumGenerator.php");
	$lg = new LipsumGenerator();
	
	$minAmout = 150;
	$maxAmout = 200;
	$paras = $amount;
		
	
	if($type == 'words')
	{
		$minAmout = 0;
		$maxAmout = $amount;
		$paras = 1;
	}
	
	(get_locale() == 'ar') ? $lg->setLanguage('Arabic') : '';
	
	return "<span class='kalimah-shortcodes-dummytext {$class}' style='color: {$color};'>".$lg->generateHTML($minAmout, $maxAmout, $paras, true)."</span>";

}  

/**--- 2.15 QrCode ---*/
function kalimah_qrcode_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'text' => '',
		'show_text' => 'false',
		'size' => '300',
		'class' => ''
	), $atts));

	require_once("includes/qrcode.php");
	
	$qr = QRCode::getMinimumQRCode($text, QR_ERROR_CORRECT_LEVEL_L);
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-qrcode {$class}' style='width: {$size}px;'>";
	$shortcode .= "<div class='kalimah-shortcodes-qrcode-display' style='width: {$size}px; height:{$size}px'>";
	$shortcode .= $qr->returnHTML($size);
	$shortcode .= '</div>';
	
	if($show_text == 'true')
		$shortcode .= "<div class='kalimah-shortcodes-qrcode-title'>$text</div>";

	$shortcode .= "</div>";
	
	return $shortcode;
}  


/**--- 2.16 Slider ---*/
function kalimah_shortcode_slider( $atts, $content = null ) {
   extract(shortcode_atts(array(
		'width' => '100%',
		'height' => '100%',
		'background_color' => 'white',
		'style' => 'third-style',
		'class' => '',
		'controls' => "true",
		'dots' => "true",
		'bar' => "true",
		'autoplay' => "true",
		'transition' => 'slide_vertical',
		'interval' => '10',
		'title' => 'true'
	), $atts));	
	
	$interval_seconds = $interval * 1000;
	// An array of animation each containng the entry and exit animation
	$animation_array['vanish'] = array('vanishIn', 'vanishOut');
	$animation_array['boing'] = array('boingInUp magicDelayHalf', 'boingOutDown');
	$animation_array['perspective'] = array('perspectiveDownRetourn', 'perspectiveUp');
	$animation_array['space'] = array('spaceInDown', 'spaceOutUp');
	$animation_array['roll'] = array('openDownRightRetourn', 'openDownLeft');
	$animation_array['slide_vertical'] = array('slideUpIn', 'slideUpOut', 'slideDownIn', 'slideDownOut');
	$animation_array['slide_horizontal'] = array('slideRightIn', 'slideLeftOut', 'slideLeftIn', 'slideRightOut');
	$animation_array['tin'] = array('tinUpIn', 'slideDownOut');
	$animation_array['twist'] = array('twisterInDown', 'slideUpOut');
	$animation_array['rotate'] = array('rotateUpIn', 'rotateUp');
	$animation_array['hinge'] = array('slideUpIn magicDelay1', 'hinge');
	$animation_array['fade'] = array('fadeIn', 'fadeOut');
	
	$this->slider_title = ($title == 'true') ? true : false;
	
	$unique_slider_style = uniqid('slider_style');
	
	$style_css = ".kalimah-shortcodes-slider.third-style.{$unique_slider_style} .kalimah-shortcodes-slider-navigation .prev::before,
				 .kalimah-shortcodes-slider.third-style.{$unique_slider_style} .kalimah-shortcodes-slider-navigation .next::before{
				 	background-color: {$background_color};
				}";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	$shortcode .= "<div class='kalimah-shortcodes kalimah-shortcodes-slider {$type} {$class} {$style} {$unique_slider_style}'";
	$shortcode .= "data-enter-animation='{$animation_array[$transition][0]}' data-exit-animation='{$animation_array[$transition][1]}' data-wait-duration='{$interval_seconds}'";
	
	if($animation_array[$transition][2])
		$shortcode .= "data-enter-inverse-animation='{$animation_array[$transition][2]}' data-exit-inverse-animation='{$animation_array[$transition][3]}' ";
	
	$shortcode .= "data-active-index='0' data-prev-index = '-1' data-auto-play='{$autoplay}' data-next-index = '1'";
	$shortcode .= "style='width: {$width}; height: {$height}; background-color: {$background_color};'>";
	
	if($controls == 'true')
	{
		$shortcode .= "<div class='kalimah-shortcodes-slider-navigation'>";
		$shortcode .= "<span class='ion-ios-arrow-back prev' data-direction='left' ></span>";
		$shortcode .= "<span class='ion-ios-arrow-forward next' data-direction='right' ></span></div>";
	}	
	
	if($bar == 'true')
		$shortcode .= "<div class='kalimah-shortcodes-slider-bar' data-width='0'></div>";
		
		
	if($dots == 'true')
		$shortcode .= "<div class='kalimah-shortcodes-slider-dots'></div>";
	
	$shortcode .= "<div class='kalimah-shortcodes-slider-slides'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";
	
	$shortcode .= "</div>";
	
    return $shortcode;
}


/**--- 2.17 Slide ---*/
function kalimah_shortcode_slide( $atts, $content = null ) {
     extract(shortcode_atts(array(
		'active' => 'false',
		'title' => ''
	), $atts));

	$shortcode .= "<div class='slide_content_outer magictime'>";
	
	if(!empty($title) && $this->slider_title == true)
		$shortcode .= "<div class='slide_title'>".do_shortcode($title)."</div>";
	
	$shortcode .= "<div class='slide_content_inner'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= '</div>';
	$shortcode .= '</div>';
	
    return $shortcode;
}


/**--- 2.16 Accordion ---*/
function kalimah_shortcode_accordion( $atts, $content = null ) {
   extract(shortcode_atts(array(
		'type' => 'vertical',
		'width' => '100%',
		'height' => '100%',
		'trigger' => 'click',
		'style' => 'first-style',
		'background_color' => '#000000',
		'title' => 'true',
		'class' => ''
		
	), $atts));	


	$unique_accordion_style = uniqid('accordion_style');
	$background_color_object = new Color($background_color);
	
	$style_css = "
	.kalimah-shortcodes-accordion.fourth-style.vertical.{$unique_accordion_style} .accordion_outer .title::after {
	  border-color: {$background_color} transparent transparent;
	}
	
	.kalimah-shortcodes-accordion.fourth-style.horizontal.{$unique_accordion_style} .accordion_outer .title::after {
	  border-color: transparent transparent transparent {$background_color};
	}
	
	.kalimah-shortcodes-accordion.{$unique_accordion_style} .accordion_outer:not(.active) .title,
	.kalimah-shortcodes-accordion.fourth-style.{$unique_accordion_style} .accordion_outer .title,
	.kalimah-shortcodes-accordion.first-style.{$unique_accordion_style}
	{
	  background-color: {$background_color};
	}
	
	.kalimah-shortcodes-accordion.{$unique_accordion_style} .accordion_outer:not(.active) .title:hover
	{
		background-color: #{$background_color_object->lighten()};
	}
	
	";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	if($trigger == 'hover')
		$trigger = 'mouseenter';
	
	$title_class = ($title == "false") ? "accordion-no-title": "";
	
	$shortcode .= "<div class='kalimah-shortcodes-accordion {$type} {$class} {$style} {$unique_accordion_style} {$title_class}' data-type='{$type}' data-trigger='{$trigger}' style='width: {$width}; height: {$height};'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";
	
    return $shortcode;
}

/**--- 2.17 Accordion section ---*/
function kalimah_shortcode_accordion_section( $atts, $content = null ) {
     extract(shortcode_atts(array(
		'active' => 'false',
		'title' => ''
	), $atts));

	if($active == 'true')
		$active_style = " active";
		
		
		
	$shortcode .= "<div class='accordion_outer{$active_style}'>";
	
	$shortcode .= "<span class='title'>".do_shortcode($title)."</span>";
	
	$shortcode .= "<div class='accordion_inner'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= '</div>';
	$shortcode .= '</div>';
	
    return $shortcode;
}

/**--- 2.18 Single tab section ---*/
function kalimah_shortcode_tabs_section( $atts, $content ){
	global $options;

	extract(shortcode_atts(array(
		'title' => '',
		'icon' => ''
	), $atts));	
	
		$count = count($this->tabs_titles);
	
		$current = $checked = '';
		
		if($count == $active_tab)
		{
			$current = ' active';
			$checked = ' checked';
			
		}
		$tabs_unique = uniqid();
		
		$content_id = $count + 1;
		$this->tabs_titles[] = "<input type='radio' {$checked} name='tab_radio_{$this->tabs_unique}'> <li data-target='tab{$content_id}_{$tabs_unique}' class='shortcode_tabs_title{$current}'><span class='noselect'><i class='$icon'></i><span class='tabs_title'>".do_shortcode($title)."</span></span></li>";
		
		$this->tabs_contents[] = "<div class='magictime shortcode_tab_content{$current}' data-id='tab{$content_id}_{$tabs_unique}' style='margin-bottom: 10px;'>".do_shortcode( $content )."</div>";
	
	return $shortcode;
}


/**--- 2.19 Tabs ---*/
function kalimah_shortcode_tabs( $atts, $content ){
	global $options;
	extract(shortcode_atts(array(
		'title' => 'Tab %d',
		'active_tab' => '1',
		'height' => '240',
		'animation' => 'vanish',
		'width' => '100%',
		'tabs_align' => 'flex-start',
		'style' => 'first-style',
		'type' => 'horizontal',
		'active_background_color' => '',
		'active_text_color' => '',
		'background_color' => '#000000',
		'text_color' => '#ffffff'
	), $atts));	
	
	// An array of animation each containng the entry and exit animation
	$animation_array['vanish'] = array('vanishIn', 'vanishOut');
	$animation_array['boing'] = array('boingInUp magicDelayHalf', 'boingOutDown');
	$animation_array['perspective'] = array('perspectiveDownRetourn', 'perspectiveUp');
	$animation_array['space'] = array('spaceInDown', 'spaceOutUp');
	$animation_array['roll'] = array('openDownRightRetourn', 'openDownLeft');
	$animation_array['slide'] = array('slideUpIn', 'slideUpOut');
	$animation_array['tin'] = array('tinUpIn', 'slideDownOut');
	$animation_array['twist'] = array('twisterInDown', 'slideUpOut');
	$animation_array['rotate'] = array('rotateUpIn', 'rotateUp');
	$animation_array['hinge'] = array('slideUpIn magicDelay1', 'hinge');
	$animation_array['fade'] = array('fadeIn', 'fadeOut');
	
	if($tabs_align == 'start')
		$align = 'flex-start';
	elseif($tabs_align == 'end')
		$align = 'flex-end';
	else
		$align = 'center';
	
	$unique_tab_style = uniqid('tab_style');
	$this->tabs_unique = uniqid('tabs_radio');

	$background_color_object = new Color($background_color);
	
	$style_css = "
	.kalimah-shortcodes-tabs.first-style.$unique_tab_style .shortcode_tabs_title.active, .kalimah-shortcodes-tabs.first-style.$unique_tab_style .shortcode_tab_content
	{
		  background-color: $active_background_color;
		  color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.first-style.$unique_tab_style .shortcode_tabs_title:not(.active)
	{
		  background-color: $background_color;
		  color: $text_color;
	}
		
	.kalimah-shortcodes-tabs.second-style.$unique_tab_style .shortcode_tab_content {
	    background-color: $active_background_color;
		color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.second-style.$unique_tab_style .shortcode_tabs_title {
		color: $text_color;
	}
	
	.kalimah-shortcodes-tabs.second-style.$unique_tab_style .shortcode_tabs_title.active::after {
	   background-color: $active_background_color;
	}
	
	.kalimah-shortcodes-tabs.second-style.$unique_tab_style .shortcode_tabs_title.active {
	   color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.second-style.$unique_tab_style .shortcode_tabs_title.active {
	   color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.second-style.$unique_tab_style .shortcode_tabs_title::before {
	   background-color: $background_color;
	}
	
	.kalimah-shortcodes-tabs.third-style.$unique_tab_style .shortcode_tabs_title.active,
	.kalimah-shortcodes-tabs.third-style.$unique_tab_style {
	  background-color: $active_background_color;
	   color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.third-style.$unique_tab_style .shortcode_tabs_title {
	  background-color: $background_color;
	   color: $text_color;
	}

	.kalimah-shortcodes-tabs.third-style.$unique_tab_style .kalimah-shortcodes-tabs-titles {
		background-color: #".$background_color_object->lighten(20).";
	}
	
	.kalimah-shortcodes-tabs.horizontal.third-style.$unique_tab_style .kalimah-shortcodes-tabs-titles::after,
	.kalimah-shortcodes-tabs.horizontal.third-style.$unique_tab_style .kalimah-shortcodes-tabs-titles::before{
		border-top-color: $background_color;
	}
	
	.kalimah-shortcodes-tabs.vertical.third-style.$unique_tab_style .kalimah-shortcodes-tabs-titles::before{
		border-bottom-color: $background_color;
	}
	
	.kalimah-shortcodes-tabs.vertical.third-style.$unique_tab_style .kalimah-shortcodes-tabs-titles::after
	{
		border-top-color: $background_color;
	}
	
	.kalimah-shortcodes-tabs.fourth-style.$unique_tab_style .shortcode_tabs_title.active,
	.kalimah-shortcodes-tabs.fourth-style.$unique_tab_style .shortcode_tabs_title.active::after,
	.kalimah-shortcodes-tabs.fourth-style.$unique_tab_style .shortcode_tab_content{
	  background-color: $active_background_color;
	  color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.fourth-style.$unique_tab_style .shortcode_tabs_title,
	.kalimah-shortcodes-tabs.fourth-style.$unique_tab_style .shortcode_tabs_title::after
	{
	  background-color: $background_color;
	  color: $text_color;
	}
	

	.kalimah-shortcodes-tabs.fifth-style.$unique_tab_style .shortcode_tabs_title.active, .kalimah-shortcodes-tabs.fifth-style.$unique_tab_style .shortcode_tab_content {
	  background-color: $active_background_color;
	   color: $active_text_color;
	}
	
	.kalimah-shortcodes-tabs.fifth-style.$unique_tab_style .shortcode_tabs_title {
	   color: $text_color;
	    background-color: $background_color;
		border-color: $text_color;
	}
	
	.kalimah-shortcodes-tabs.sixth-style.$unique_tab_style .shortcode_tabs_title{
	  border-color: $text_color;
	  color: $text_color;
	    background-color: $background_color;
	}
	
	.kalimah-shortcodes-tabs.horizontal.sixth-style.$unique_tab_style .shortcode_tabs_title.active::before {
	  border-top-color: $text_color;
	}
	
	
	.kalimah-shortcodes-tabs.sixth-style.$unique_tab_style .shortcode_tabs_title.active, .kalimah-shortcodes-tabs.sixth-style.$unique_tab_style .shortcode_tab_content {
	   color: $active_text_color;
	    background-color: $active_background_color;
	}
	
	.kalimah-shortcodes-tabs.horizontal.sixth-style.$unique_tab_style .shortcode_tabs_title.active::after {
	  border-top-color: $active_background_color;
	}
	";
	
	if(get_locale() == "ar")
	{
		$style_css .=".kalimah-shortcodes-tabs.vertical.sixth-style.$unique_tab_style .shortcode_tabs_title.active::before {
			  border-right-color: $text_color;
			}

			.kalimah-shortcodes-tabs.vertical.sixth-style.$unique_tab_style .shortcode_tabs_title.active::after
			{
				border-right-color: $active_background_color;
			}
	";
	}else
	{

	$style_css .=".kalimah-shortcodes-tabs.vertical.sixth-style.$unique_tab_style .shortcode_tabs_title.active::before {
			  border-left-color: $text_color;
			}

			.kalimah-shortcodes-tabs.vertical.sixth-style.$unique_tab_style .shortcode_tabs_title.active::after
			{
				border-left-color: $active_background_color;
			}
	";
	}
	
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	
	$shortcode .= "<div class='kalimah-shortcodes kalimah-shortcodes-tabs {$unique_tab_style} {$type} {$style}' data-type='{$type}' data-enter-animation='{$animation_array[$animation][0]}' data-exit-animation='{$animation_array[$animation][1]}' style=' width:{$width}; height:{$height}; '>";
	$shortcode .= "<input type='checkbox' checked='checked'>";
	
	$shortcode .= "<div class='kalimah-shortcodes-tabs-titles {$align}'>";
	
	$shortcode .= do_shortcode($content);
	foreach($this->tabs_titles as $title)
	{
		$shortcode .= $title;
	}
	$shortcode .= '</div>';
	
	
	$shortcode .= "<div class='kalimah-shortcodes-tabs-content'>";
	foreach($this->tabs_contents as $content)
	{
		$shortcode .= $content;
	}
	$shortcode .= '</div>';
	
	$shortcode .= '</div>';
	
	// reset arrays 
	$this->tabs_titles = array();
	$this->tabs_contents = array();
	$this->tabs_unique = '';
	
	return $shortcode;
}


/**--- 2.20 Author_info ---*/
function kalimah_shortcode_author_info( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'id' => '',
		'style' => 'first-style',
		'background_color' => '',
		'text_color' => '',
		'class' => ''
	), $atts));	

	if(is_numeric($id))
		$user_id = $id;
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-author {$style} {$class}' style='background-color: {$background_color}; color: {$text_color};'>";
	$shortcode .= "<span class='kalimah-shortcodes-author-avatar'>";
	$shortcode .= get_avatar($user_id, 265 );
	$shortcode .= "</span>";
	$shortcode .= "<span class='kalimah-shortcodes-author-name'>";
	$shortcode .= "<span>". __( 'Author:', 'kalimah-shortcodes' ). "</span> <a href='" . get_author_posts_url( get_the_author_meta( 'ID', $user_id ) ) . "' title='" . esc_attr( get_the_author_meta( 'display_name' , $user_id) ) . "' rel='me'>" . get_the_author_meta( 'display_name' , $user_id) . "</a>";
	$shortcode .= "</span>";
	$shortcode .= '<span class="kalimah-shortcodes-author-description">';
	$shortcode .= get_the_author_meta( 'description', $user_id );
    $shortcode .= '</span>';
	
	
	$social_networks['user_email'] = 'fa fa-envelope-o';
    $social_networks['user_url']   = 'fa fa-external-link';
    $social_networks['facebook']   = 'fa fa-facebook';
    $social_networks['twitter']    = 'fa fa-twitter';
    $social_networks['gplus']      = 'fa fa-google-plus';
    $social_networks['phone']      = 'fa fa-mobile';
    $social_networks['linkedin']   = 'fa fa-linkedin-square';
    
    foreach ($social_networks as $key => $value) {
        $author_meta = $url = get_the_author_meta($key, $user_id);
        
        if ($key == 'user_email')
            $url = "mailto:$author_meta";
        
        if ($key == 'phone')
            $url = "tel:$author_meta";
        
        if (!empty($author_meta))
            $social_networks_html .= "<a href='{$url}'><i class='{$value}' title='$author_meta'></i></a>";
        
    }
    $shortcode .= "<span class='kalimah-shortcodes-author-social'>{$social_networks_html}</span>";
    $shortcode .= '</div>';
	

	return $shortcode;
}

/**--- 2.21 Buttons ---*/
function kalimah_shortcode_button( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'text_color' => '#b32db3',
		'background_color' => '#b32db3',
		'size' => 'medium',
		'target' => 'true',
		'style' => 'flat',
		'btn_icon' => '',
		'class' => '',
		'link' => ''
	), $atts));	

	$target = ($target == 'true') ? '_blank': '_self';
	
	$gradient_color = new Color($background_color);
	if($style == 'flat')
	{
		$background = "background-color: {$background_color};";
		}
	else if($style == '3d')
	{
		$background = "background-color: {$background_color};";
		$style = 'three-dimen';
	}
	else 
	{
		$background = "background: linear-gradient(to bottom, #".$gradient_color->lighten(20)." 0%, #".$gradient_color->lighten(10)." 40%, $background_color 100%);";
	}	
	$shortcode = "<a href='{$link}' target='{$target}' class='kalimah-shortcodes kalimah-shortcodes-button {$size} {$class} {$style}' style='{$background} color: {$text_color};'>";
	$shortcode .= "<i class='{$btn_icon}'></i><span>". do_shortcode($content). "</span></a>";
    return $shortcode;
}


/**--- 2.22 Members Only ---*/
function kalimah_shortcode_members_only( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'login_link' => '',
		'login_text' => '',
		'restrict_text' => ''
	), $atts));	
	
	global $user_ID ;
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-members'>";
	$shortcode .= "<i class='ion-person-stalker'></i>";
	$shortcode .= "<span>".str_replace('%login%', "<a href={$login_link}'>{$login_text}</a>", $restrict_text)."<span>";
	$shortcode .= "</div>";
	
	
	if(is_user_logged_in())
		$shortcode = do_shortcode($content);
	
	return $shortcode;
}

/**--- 2.23 Tooltip shortcode ---*/
function kalimah_shortcode_tooltip( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'title' => '',
		'trigger' => 'hover',
		'position' => 'top',
		'color' => '',
		'bg_color' => '',
		'text' => '',
		'style' => 'first-style',
		'delay' => '',
		'class' => ''
	), $atts));	

	
	$delay_duration = (strpos($delay, "s")) ? str_replace("s", "", $delay) * 1000 : str_replace("m", "", $delay) * 60 * 1000;
	
	$unique_tootlip_style = uniqid('tooltip_');
	
	$background_color_object = new Color($bg_color);
	$first_color = "#".$background_color_object->darken(25);
	
	$style_css = "
					.kalimah-shortcodes-tooltip.third-style.{$unique_tootlip_style} .kalimah-shortcodes-tooltip-body {
						 border-color: {$first_color};
						 color: {$color};
					}
					
					.kalimah-shortcodes-tooltip.third-style.{$unique_tootlip_style} .kalimah-shortcodes-tooltip-text,
					.kalimah-shortcodes-tooltip.third-style.{$unique_tootlip_style} .kalimah-shortcodes-tooltip-title
					{
						background-color: {$bg_color}
					}
					
					.kalimah-shortcodes-tooltip.third-style.{$unique_tootlip_style} .kalimah-shortcodes-tooltip-body::after
					{
						background-color: {$first_color};
					}
					";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	
	$shortcode .= "<div class='kalimah-shortcodes kalimah-shortcodes-tooltip {$class} {$style} {$unique_tootlip_style}' data-trigger='{$trigger}' data-delay='{$delay_duration}'>";
	$shortcode .= "<div class='kalimah-shortcodes-tooltip-content'>".do_shortcode($content)."</div>";
	$shortcode .= "<div class='kalimah-shortcodes-tooltip-body {$position}' style='background-color: {$bg_color}; color: {$color};'>";
	$shortcode .= "<div class='kalimah-shortcodes-tooltip-close'>×</div>";
	$shortcode .= "<div class='kalimah-shortcodes-tooltip-title'>{$title}</div>";
	$shortcode .= "<div class='kalimah-shortcodes-tooltip-text'>{$text}</div>";
	$shortcode .= "</div>";
	$shortcode .= "</div>";
	
	return $shortcode;
}


/**--- 2.24 Columns CSS ---*/
function kalimah_shortcode_columns_css( $atts, $content ){
	extract(shortcode_atts(array(
		'count' => '3',
		'gap' => '3px',
		'width' => '0',
		'type' => 'solid',
		'color' => '#000000',
		'class' => ''
		
	), $atts));	
	
	$style = "column-count:{$count}; column-gap:{$gap}px; column-rule: {$width}px {$type} {$color};";
	$style .= "-moz-column-count:{$count}; -moz-column-gap:{$gap}px; -moz-column-rule: {$width}px {$type} {$color};";
	$style .= "-webkit-column-count:{$count}; -webkit-column-gap:{$gap}px; -webkit-column-rule: {$width}px {$type} {$color};";
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-column-css' style='{$style}'>".do_shortcode( $content )."</div>";
	return $shortcode;
}


/**--- 2.24 Columns ---*/
function kalimah_shortcode_columns( $atts, $content ){
		extract(shortcode_atts(array(
			'class' => '',
		), $atts));
	
		$shortcode = "<div class='kalimah-shortcodes-columns clearfix {$class}'>".
		$shortcode .= do_shortcode( $content );
		$shortcode .= '</div>';
		return $shortcode;
}


/**--- 2.25 Single column ---*/
function kalimah_shortcode_columns_single( $atts, $content ){
	extract(shortcode_atts(array(
		'size' => '50%',
	), $atts));	
	
	$shortcode = "<div style='width:{$size};'>".do_shortcode( $content )."</div>";
	return $shortcode;
}

/**--- 2.26 Flickr ---*/
function kalimah_shortcode_flickr( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'orderby' => 'random',
		'number' => '6',
		'photo_size' => 'thumb',
		'user_id' => ''
	), $atts));	
	
	$protocol = is_ssl() ? 'https' : 'http';
	
	if($photo_size == 'small') $photo_size = "s";
	
	if($photo_size == 'medium') $photo_size = "m";
	
	$shortcode = "<div class='kalimah-shortcodes-flickr flickr-wrapper clearfix'>
	<script type='text/javascript' src='{$protocol}://www.flickr.com/badge_code_v2.gne?count={$number}&amp;display={$orderby}&amp;size={$photo_size}&amp;layout=x&amp;source=user&amp;user={$user_id}'></script>
	</div>";       
	

    return $shortcode;
}



/**--- 2.27 Padding ---*/
function kalimah_shortcode_padding( $atts, $content = null ) {
	$left = $right = $top = $bottom = '10%';
    if( is_array( $atts ) ) extract($atts);
	
	$shortcode ='<div class="kalimah-shortcodes-padding" style="padding-left:'.$left.'; padding-right:'.$right.'; padding-top:'.$top.'; padding-bottom:'.$bottom.';">'.do_shortcode($content).'</div>';
    return $shortcode;
}

/**--- 2.28 Kalimah Progress Bar ---*/
function kalimah_shortcode_progressbar( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'percentage' => '50',
		'animated' => 'true',
		'show_stripes' => 'false',
		'show_percentage' => 'true',
		'width' => '100%',
		'height' => '100%',
		'heading' => '',
		'type' => 'horizontal',
		'style' => 'first-style',
		'background_color' => ''
	), $atts));	
	
	// check which type the progress is
	if($type == 'horizontal')
	{
		// if type is horizontal then set the percentage for width
		$new_percentage = "width:{$percentage}%";
		
		// if animated WIDTH needs to be zero
		if($animated == 'true')
			$new_percentage = "width:0px";
	}else if($type == 'vertical')
	{
		// Same as horizontal except HEIGHT value should get the changes
		$new_percentage = "height:{$percentage}%";
		
		if($animated == 'true')
			$new_percentage = "height:0px";
	}else if($type == 'circular')
	{
		
		$circular_bg_color = "background-color: {$background_color};";
		$background_color = "#ffffff";
		// for circular first we calcuate the degree of the percentage
		$degree = (360 * $percentage) / 100;
		
		if($degree < 181)
		{
			$rotate_right = $data_rotate_right = (180 - $degree) * -1;
			$hide = "display: none;";
		}else
		{
			$rotate_right = $data_rotate_right = 0;
			$rotate_left = $data_rotate_left = $degree;
			$hide_concealer = "display: none;";
		}
		
		if($animated == 'true')
		{
			$rotate_left = "0";
			$rotate_right = "-180";
			$hide_concealer = "display: block;";
		}
	}
	
	
	if($show_stripes == 'true')
		$striped = ' striped';
	

	if($style == 'fifth-style')
	{
		$style_stripped = $striped;
		$bg_color = "background-color: {$background_color};";
	}	
		
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-progress-bar {$style}{$style_stripped} {$type}' style='width:{$width}; height:{$height}; {$bg_color}'>";
	$shortcode .= "<div class='kalimah-progress-bar-heading'>{$heading}</div>";
	$shortcode .= "<div class='kalimah-progress-bar-element-bg'>";
	$shortcode .= "<div class='kalimah-progress-bar-element-color{$striped}'  data-degree='{$degree}' data-animated='{$animated}' data-type='{$type}' data-percentage='{$percentage}' style='{$new_percentage}; background-color: {$background_color};'>";
	
	if($show_percentage == 'true')
		$shortcode .= "<span class='no-select percentage'>{$percentage}%</span>";
	
	$shortcode .= "<div class='kalimah-progress-circular-left' data-rotate='{$data_rotate_left}'  style='{$circular_bg_color} {$hide} transform:rotate({$rotate_left}deg);'></div>";
	$shortcode .= "<div class='kalimah-progress-circular-right' data-rotate='{$data_rotate_right}' style='{$circular_bg_color} transform:rotate({$rotate_right}deg);'></div>";
	$shortcode .= "<div class='kalimah-progress-circular-left-concealer' style='{$hide_concealer}'></div>";
	
	$shortcode .= "</div>";
	$shortcode .= "</div>";
	$shortcode .= "</div>";

    return $shortcode;
}


/**--- 2.29 Kalimah Content Box ---*/
function kalimah_shortcode_contentbox( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'width' => '100%',
		'height' => '100%',
		'type' => 'color',
		'pattern_name' => '',
		'bg_color' => '',
		'text_color' => '',
		'video_url' => '',
		'image_url' => '',
		'parallax' => 'true'
	), $atts));	
	
	$file_dir = plugin_dir_url( __FILE__ );
	$style = "width:{$width}; height:{$height}; color:{$text_color};";
	
	if($parallax == 'true')
		$parallax_css = 'parallax';
		
	switch($type)
	{
		case 'color':
			$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-content-box {$class}' style='background-color:{$bg_color}; {$style}'>";
			$shortcode .= do_shortcode($content);
			$shortcode .= "</div>";
		break;

		case 'video':
			$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-content-box {$class}' style='{$style}'>";
			$shortcode .= "<video autoplay='autoplay' loop muted poster=''>
					<source src='{$video_url}' type='video/mp4'>
				</video>";
			$shortcode .= "<div class='video_content'>".do_shortcode($content)."</div>";
			$shortcode .= "</div>";
		break;

		case 'image':
			$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-content-box kalimah-shortcodes-content-box-image {$class} {$parallax_css}' style='background-image: url({$image_url});  {$style}'>";
			$shortcode .= do_shortcode($content);
			$shortcode .= "</div>";
		break;

		case 'pattern':
		
			$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-content-box kalimah-shortcodes-content-box-pattern {$class} {$parallax_css} {$parallax}' style='{$style} background-image: url({$file_dir}/includes/patterns/$pattern_name.png);'>";
			$shortcode .= do_shortcode($content);
			$shortcode .= "</div>";
		break;
	}

    return $shortcode;
}


/**--- 2.30 Counter ---*/
function kalimah_shortcode_counter( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'start' => '0',
		'end' => '',
		'text_above' => '',
		'text_below' => '',
		'suffix' => '',
		'prefix' => '',
		'color' => '',
		'comma' => '',
		'zero_padding' => 'true',
		'speed' => '5'
	), $atts));	

		if($zero_padding == 'true')
			$padding_count = strlen($end);
		
		
	$shortcode = '<div class="kalimah-shortcodes kalimah-shortcodes-counter">';
	
	if(!empty($text_above))
		$shortcode .= "<span class='text_above' style='color:{$color};'>{$text_above}</span>";
	
	$shortcode .= "<div class='counter_container'>";
	
	if(!empty($prefix))
		$shortcode .= "<span class='$prefix prefix' style='color:{$color};'></span>";
	
	
	$shortcode .= "<span class='counter' data-zero-padding='{$padding_count}' data-comma='{$comma}' data-start='{$start}' data-end='{$end}' data-speed='{$speed}' style='color:{$color};'>{$start}</span>";
	
	if(!empty($suffix))
		$shortcode .= "<span class='$suffix suffix' style='color:{$color};'></span>";

	
	//$shortcode .= "";
	
	//if(!empty($text_below))
		$shortcode .= "</div><span class='text_below' style='color:{$color};'>{$text_below}</span>";
	
	$shortcode .= '</div>';
    return $shortcode;
}

/**--- 2.31 Spoiler ---*/
function kalimah_shortcode_spoiler( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'width' => '100%',
		'opened' => 'true',
		'open_icon' => '',
		'close_icon' => '',
		'style' => 'first-style',
		'align_icon' => 'left',
		'background_color' => '#018a9c',
		'text_color' => '#ffffff',
		'class' => '',
		'title' => ''
	), $atts));	

	$opened_class = ($opened == 'true') ? 'opened_spoiler' : 'closed_spoiler';
	$border_color = new Color($background_color);
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-spoiler {$class} {$style} {$opened_class}' style='width: {$width}; border-color: #{$border_color->darken(15)};'>";
	$shortcode .= "<div class='kalimah-shortcodes-spoiler-title' style='background-color: {$background_color}; color: {$text_color}; border-color: #{$border_color->darken(15)};'>";
	$shortcode .= "<span class='title'>".do_shortcode($title)."</span>";
	$shortcode .= "<i class='{$open_icon} open_icon' style='float: {$align_icon};'></i><i class='{$close_icon} close_icon' style='float: {$align_icon};'></i>";
	$shortcode .= '</div>';
	$shortcode .= '<div class="kalimah-shortcodes-spoiler-content">';
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";
	$shortcode .= "</div>";

    return $shortcode;
}

/**--- 2.32 Image ---*/
function kalimah_image_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'width' => '100%',
		'height' => '100%',
		'image_url' => '',
		'url' => '',
		'title' => '',
		'description' => '',
		'effect' => 'none',
		'class' => ''
	), $atts));	

	
	$shortcode .= "<div class='kalimah-shortcodes kalimah-shortcodes-image {$effect}' style='width: {$width}; height: {$height};'>";
	
	if($url != '')
		$shortcode .= "<a href='{$url}'></a>";

	$shortcode .= "<img class='kalimah-shortcodes-image-image' src='{$image_url}'>";
	
	$shortcode .= "<div class='kalimah-shortcodes-image-details'>";
	$shortcode .= "<div class='kalimah-shortcodes-image-title'>".do_shortcode($title)."</div>";
	$shortcode .= "<div class='kalimah-shortcodes-image-description'>{$description}</div>";

	$shortcode .= "</div>";
	$shortcode .= "</div>";

    return $shortcode;
}

/**--- 2.33 Environment ---*/
function kalimah_environment_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'browser' => 'all',
		'os' => 'all',
		'device' => 'all',
		'brand' => 'all',
		'continent' => 'all',
		'type' => 'general',
		'class' => ''
	), $atts));	

	
	require_once 'includes/detect.php';
	require_once 'includes/CountriesArray.php';
	
	$browsers = explode(",", $browser);
	$oss = explode(",", $os);
	$devices = explode(",", $device);
	$brands = explode(",", $brand);
	$continents = explode(",", $continent);
	
	$browser_status = false;
	$os_status = false;
	$device_status = false;
	$brand_status = false;
	$continent_status = false;
	
	$current_browser = strtolower(Detect::browser());
	$current_os = strtolower(Detect::os());
	$current_device = strtolower(Detect::deviceType());
	$current_brand = strtolower(Detect::brand());
	$current_country_code = strtoupper (Detect::ipCountry());
	
	
	$country_continenet = CountriesArray::get( 'alpha2', 'continent');
	$current_continenet = strtolower($country_continenet[$current_country_code]);
	
	// Match user selected browsers
	foreach ($browsers as $browser)
	{
		if($browser == 'all' or strstr($current_browser, $browser))
		{
			$browser_status = true;
			break;
		}
	}
	
	// Match user selected os
	foreach ($oss as $os)
	{
		if($os == 'all' or strstr($current_os, str_replace('_', ' ', $os)))
		{
			$os_status = true;
			break;
		}
	}
	
	// Match user selected devices
	foreach ($devices as $device)
	{
		if($device == 'all' or strstr($current_device, $device))
		{
			$device_status = true;
			break;
		}
	}
	
	// Match user selected brand
	foreach ($brands as $brand)
	{
		if($brand == 'all' or strstr($current_brand, $brand))
		{
			$brand_status = true;
			break;
		}
	}
	
	// Match user selected brand
	foreach ($continents as $continent)
	{
		if($continent == 'all' or $current_continenet == $continent)
		{
			$continent_status = true;
			break;
		}
	}
	
	
	// Add inline style
	if($browser_status && $os_status && $device_status && $brand_status && $continent_status && $type == 'css')
		wp_add_inline_style('kalimah-shortcodes', preg_replace("/[\n\r]/","",strip_tags($content)));
	
	// Display content of three are matching 
	if($browser_status && $os_status && $device_status && $brand_status && $continent_status && $type == 'general')
	{
		$shortcode .= "<div class='kalimah-shortcodes kalimah-shortcodes-environment'>";
		$shortcode .= do_shortcode($content);
		$shortcode .= "</div>";
	}

    return $shortcode;
}


/**--- 2.34 Animation ---*/
function kalimah_animation_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'effect' => '',
		'trigger' => 'click',
		'delay' => '0s',
		'class' => ''
	), $atts));	

	
	$delay_duration = (strpos($delay, "s")) ? str_replace("s", "", $delay) * 1000 : str_replace("m", "", $delay) * 60 * 1000;
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-animation {$class}' data-trigger='{$trigger}' data-effect='{$effect}' data-delay='{$delay_duration}'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";

    return $shortcode;
}

/**--- 2.35 Features List ---*/
function kalimah_features_list_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'type' => 'vertical',
		'animation' => 'none',
		'color' => '#000000',
		'bg_color' => '#ffffff',
		'class' => ''
	), $atts));	

	$unique_features_style = uniqid('features_list');
	
	$background_color_object = new Color($bg_color);
	$style_css = ".kalimah-shortcodes-features-list.{$unique_features_style} i
					{
						color: {$color};
						border-color: {$bg_color};
					}
					
					.kalimah-shortcodes-features-list.{$unique_features_style} .kalimah-shortcodes-features-list-item:hover i
					{
						background-color: {$bg_color};
						border-color: {$bg_color};
						color: #{$background_color_object->complementary()};
					}
					";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-features-list {$class} {$type} {$unique_features_style}' data-animation='{$animation}'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";

    return $shortcode;
}

function kalimah_features_list_item_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'icon' => '',
		'title' => '',
		'link' => ''
	), $atts));	

	if($link != '')
		$link_href = "<a href='{$link}'></a>";
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-features-list-item magictime'>";
	$shortcode .= "<i class='{$icon} kalimah-shortcodes-features-icon'>$link_href</i>";
	$shortcode .= "<div class='kalimah-shortcodes-features-body'>";
	$shortcode .= "<div class='kalimah-shortcodes-features-title'>".do_shortcode($title)."</div>";
	$shortcode .= "<div class='kalimah-shortcodes-features-content'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";
	$shortcode .= "</div>";
	$shortcode .= "</div>";

    return $shortcode;
}

/* Pricing Tables */
function kalimah_pricing_table_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'style' => '',
		'class' => ''
	), $atts));	

	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-pricing-table {$style} {$class}'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</div>";

    return $shortcode;
}

function kalimah_pricing_table_section_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'icon' => '',
		'color' => '#153867',
		'title' => '',
		'price' => '',
		'unit' => '',
		'special' => '',
		'btn_text' => '',
		'active' => '',
		'link' => ''
	), $atts));	

	
	$color_obj = new Color($color);
	
	$first_color = $color_obj->lighten(20);
	$second_color = $color_obj->darken(20);
	$text_color = ($color_obj->isDark("2c2926")) ? "#ffffff" : "#000000"; 
	$second_text_color = ($color_obj->isDark($second_color)) ? "#ffffff" : "#000000"; 
	
	$table_uniqid = uniqid('pricing_table_');
	
	$style_css = "
	.kalimah-shortcodes-pricing-table.first-style .{$table_uniqid} .kalimah-shortcodes-pricing-title::after
	{
		border-top-color: {$color};
	}
	
	.kalimah-shortcodes-pricing-table.first-style .{$table_uniqid} .kalimah-shortcodes-pricing-title,
	.kalimah-shortcodes-pricing-table.first-style .{$table_uniqid} .kalimah-shortcodes-pricing-button a
	{
		background-color: {$color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.first-style .{$table_uniqid} .kalimah-shortcodes-pricing-price-unit
	{
		background-color: #{$first_color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.second-style .{$table_uniqid} .kalimah-shortcodes-pricing-title,
	.kalimah-shortcodes-pricing-table.second-style .{$table_uniqid} .kalimah-shortcodes-pricing-price-unit
	{
		background-color: {$color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.second-style .{$table_uniqid} .kalimah-shortcodes-pricing-button > a {
	  background-color: #{$first_color};
	  border-color: {$color};
	  color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.third-style .{$table_uniqid} .kalimah-shortcodes-pricing-title
	{
	  background-color: {$color};
	  color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.third-style .{$table_uniqid} .kalimah-shortcodes-pricing-price-unit,
	.kalimah-shortcodes-pricing-table.third-style .{$table_uniqid}.active .kalimah-shortcodes-pricing-title,
	.kalimah-shortcodes-pricing-table.third-style .{$table_uniqid} .kalimah-shortcodes-pricing-button a {
		background-color: #{$second_color};
		border-color: {$color};
		color: {$second_text_color};
	}
	
	.kalimah-shortcodes-pricing-table.fourth-style .{$table_uniqid} .kalimah-shortcodes-pricing-title,
	.kalimah-shortcodes-pricing-table.fourth-style .{$table_uniqid} .kalimah-shortcodes-pricing-button a
	{
		background-color: {$color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.fourth-style .{$table_uniqid}.kalimah-shortcodes-pricing-table-sections
	{
		background-color: #{$first_color};
		color: {$second_text_color};
	}
	
	.kalimah-shortcodes-pricing-table.fifth-style .{$table_uniqid}.kalimah-shortcodes-pricing-table-sections,
	.kalimah-shortcodes-pricing-table.fifth-style .{$table_uniqid} .kalimah-shortcodes-pricing-content,
	.kalimah-shortcodes-pricing-table.fifth-style .{$table_uniqid} .kalimah-shortcodes-pricing-price-unit{
		background-color: {$color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.fifth-style .{$table_uniqid} .kalimah-shortcodes-pricing-title
	{
		background-color: #{$first_color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.fifth-style .{$table_uniqid} .kalimah-shortcodes-pricing-button a::after
	{
		border-bottom-color: #{$first_color};
	}
	
	
	.kalimah-shortcodes-pricing-table.sixth-style .{$table_uniqid}
	{
		border-color: {$color};
	}
	
	.kalimah-shortcodes-pricing-table.sixth-style .{$table_uniqid} .kalimah-shortcodes-pricing-title
	{
		background-color: #{$first_color};
		color: {$text_color};
	}
	
	.kalimah-shortcodes-pricing-table.sixth-style .kalimah-shortcodes-pricing-price-unit::before {
	  background-color:  #{$second_color};
	  color: {$second_text_color};
	}

	.kalimah-shortcodes-pricing-table.sixth-style .{$table_uniqid} .kalimah-shortcodes-pricing-button a
	{
		background-color: #{$first_color};
		color: {$text_color};
	}
	";
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	if($active == 'on')
		$active_class = 'active';
	
	$shortcode = "<div class='kalimah-shortcodes kalimah-shortcodes-pricing-table-sections {$table_uniqid} {$active_class}'>";
	$shortcode .= "<div class='kalimah-shortcodes-pricing-title'><i class='{$icon}'></i>".do_shortcode($title)."</div>";
	$shortcode .= "<div class='kalimah-shortcodes-pricing-price-unit'><span class='kalimah-shortcodes-pricing-price'>{$price}</span><span class='kalimah-shortcodes-pricing-unit'>{$unit}</span></div>";
	
	if($special != '')
		$shortcode .= "<div class='kalimah-shortcodes-pricing-special'>{$special}</div>";
	
	$shortcode .= "<div class='kalimah-shortcodes-pricing-content'>";
	
	$features = explode("\n", $content);
	foreach($features as $line)
	{
		if($line != '')
		$shortcode .= "<li>{$line}</li>";
	}
	
	$shortcode .= "</div>";
	$shortcode .= "<div class='kalimah-shortcodes-pricing-button'><a href='{$link}'>{$btn_text}</a></div>";
	$shortcode .= "</div>";

    return $shortcode;
}



/* Icon shortcode */
function kalimah_icon_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'icon' => '',
		'color' => '',
		'bg_color' => '',
		'effect' => '',
		'style' => '',
		'size' => '15',
		'link' => '',
		'class' => ''
	), $atts));	

	$unique_icon_style = uniqid('icon_');
	
	$style_css = ".kalimah-shortcodes-icon.first-style.{$unique_icon_style}::after
					{
						border-color: {$bg_color};
					}
					
				  .kalimah-shortcodes-icon.first-style.{$unique_icon_style}:hover
					{
						background-color: {$color} !important;
						color: {$bg_color} !important;
					}
					";
	// Add inline style
	wp_add_inline_style('kalimah-shortcodes', $style_css);
	
	$shortcode = "<i class='{$icon} kalimah-shortcodes kalimah-shortcodes-icon {$style} {$effect} {$class} {$unique_icon_style}' style='color: {$color}; background-color: {$bg_color}; font-size: {$size}px; width: calc({$size}px + 35px); height: calc({$size}px + 35px);'>";
	
	if($link != '')
		$shortcode .= "<a href='{$link}'></a>";
	
	$shortcode .= "</i>";

    return $shortcode;
}

/* Typography shortcode */
function kalimah_typography_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'color' => '',
		'size' => '',
		'italics' => '',
		'bold' => '',
		'strikethrough' => '',
		'underline' => '',
		'font_family' => '',
		'class' => ''
	), $atts));	
	
	wp_enqueue_style( uniqid('font-'), 'http://fonts.googleapis.com/css?family='.str_replace(' ', '+', $font_family));
	
	if($bold == 'true')
		$bold_style = 'font-weight: bold;';
	
	if($italics == 'true')
		$italics_style = 'font-style: italic;';
	
	if($underline == 'true')
		$underline_style = 'text-decoration: underline;';
	
	if($strikethrough == 'true')
		$strikethrough_style = 'text-decoration: line-through;';
	
	$shortcode = "<span class='kalimah-shortcodes kalimah-shortcodes-typography {$class}' style='{$italics_style} {$bold_style} {$strikethrough_style} {$underline_style} color: {$color}; font-family: {$font_family}; font-size: {$size};'>";
	$shortcode .= do_shortcode($content);
	$shortcode .= "</span>";

    return $shortcode;
}

/* Device shortcode */
function kalimah_mockup_shortcode( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'type' => 'iphone6',
		'orientation' => 'orientation',
		'display' => 'url',
		'url' => 'http://www.kalimah-apps.com/',
		'image' => '',
		'class' => ''
	), $atts));	
	
	if($display == 'url')
	{
		$attr = $url;
	}
	elseif ($display == 'image')
	{
		$path = pathinfo($image);
		$attr = $path['basename'];
	}
	
	$shortcode = "<div class='marvel-device {$type} {$orientation}'>
		<div class='top-bar'></div>
		<div class='sleep'></div>
		<div class='volume' name='{$attr}'></div>
		<div class='camera'></div>
		<div class='sensor'></div>
		<div class='speaker'></div>
		<div class='screen'>";
		
		if($display == 'url')
			$shortcode .= "<iframe src='{$url}' width='100%' height='100%'></iframe>";
		elseif ($display == 'image')
			$shortcode .= "<img src='{$image}'>";
			
		$shortcode .= "</div>
		<div class='home'></div>
		<div class='bottom-bar'></div>
	</div>";

					
    return $shortcode;
}

/* Dummy Image */
function kalimah_dummy_image_shortcode($atts, $content = null ) {
	extract(shortcode_atts(array(
		'width'  => 500,
		'height' => 300,
		'style'  => 'any',
		'theme'  => 'any',
		'filter'  => 'none',
		'level'  => '',
		'class'  => ''
	), $atts));	
	
	// For random theme pick
	$themes =  array( "abstract" ,
            "animal",
            "business" ,
            "cats",
            "city" ,
            "people",
            "food",
            "nature",
            "sports",
            "technics",
            "transport"
		);
	
	$unit = '%';
	
	if($filter == 'blur')
		$unit = 'px';
	if($filter == 'hue-rotate')
		$unit = 'deg';
	
	if($theme == 'random')
	{
		$theme_random = array_rand($themes);
		$theme = $theme_random[0];
	}
	
	$shortcodes = "<div class='kalimah-shortcodes kalimah-shortcodes-dummy-image {$style} {$class}' style='width: {$width}px; height: {$height}px;'>";
	$shortcodes .= "<img src='http://lorempixel.com/{$width}/{$height}/{$theme}' style='filter: {$filter}({$level}{$unit})'>";
	$shortcodes .= '</div>';
	return $shortcodes;
}

/* Gallery */
function kalimah_gallery_shortcode($atts, $content = null ) {
	extract(shortcode_atts(array(
		'source'  => 'media',
		'images' => '',
		'tags' => '',
		'categories'  => '',
		'number'  => '',
		'style'  => 'first-style',
		'class'  => ''
	), $atts));	
	
	if($source == 'media')
	{
		$images = explode(",", $images);
		foreach($images as $id)
		{
			$attachment_full = wp_get_attachment_image_src($id, 'full');
			$attachment = wp_get_attachment_image_src($id);
			
			$images_array[] = "<img src='{$attachment_full[0]}'>";
			$images_attachment[] = "<img src='{$attachment[0]}'>";
		}
	}else if($source == 'categories')
	{
		$args = array(
			'posts_per_page' => $number,
			'category' => $categories
		);
		
		$postslist = get_posts($args);
		foreach ($postslist as $post):
		    setup_postdata($post);
			 if (has_post_thumbnail( $post->ID ) ):
				 $attachment_full = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ), 'full');
				$attachment = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ));
			
				$images_array[] = "<img src='{$attachment_full[0]}'>";
				$images_attachment[] = "<img src='{$attachment[0]}'>";
			endif;
		endforeach;
		

	}else if($source == 'tags')
	{
		$args = array(
			'posts_per_page' => $number,
			'tag__in' => $tags
		);
		
		$postslist = get_posts($args);
		foreach ($postslist as $post):
		    setup_postdata($post);
			 if (has_post_thumbnail( $post->ID ) ):
			    $attachment_full = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ), 'full');
				$attachment = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ));
				
				$images_array[] = "<img src='{$attachment_full[0]}'>";
				$images_attachment[] = "<img src={$attachment[0]}'>";
			endif;
		endforeach;
	}
	
	$shortcodes = "<div class='kalimah-shortcodes kalimah-shortcodes-gallery {$style} {$class}'>";
	$shortcodes .= "<div class='kalimah-shortcodes-gallery-images'>";
		foreach($images_array as $image)
		{
			$shortcodes .= $image;
		}
	$shortcodes .= "</div>";
	
	$shortcodes .= "<div class='kalimah-shortcodes-gallery-thumbs'>";
		foreach($images_attachment as $image)
		{
			$shortcodes .= $image;
		}
	$shortcodes .= "</div>";
	$shortcodes .= "<div class='kalimah-shortcodes-gallery-navigation'><span class='prev'></span><span class='next'></span></div>";
	$shortcodes .= "</div>";
	return $shortcodes;
}

function kalimah_wp_admin_enqueue($hook)
{
		if($hook != 'post.php' && $hook != 'post-new.php')
			return;
		
        wp_enqueue_style('kalimah-shortcodes', plugin_dir_url( __FILE__ ) . "css/kalimah-admin-shortcodes.css", array(), '', 'all');
		
		if(get_locale() == 'ar')
			wp_enqueue_style('kalimah-shortcodes-rtl', plugin_dir_url( __FILE__ ) . "css/kalimah-admin-shortcodes-rtl.css", array(), '', 'all');
			
        wp_enqueue_style('kalimah-icons', plugin_dir_url( __FILE__ ) . "css/icons.css", array(), '', 'all');
        wp_enqueue_style('colpick', plugin_dir_url( __FILE__ ) . "css/colpick.css", array(), '', 'all');
		wp_enqueue_style('kalimah-icon-picker', plugin_dir_url( __FILE__ )  . "css/icon-picker.css", array(), '', 'all');
		
		
        wp_enqueue_script('kalimah-icon-picker', plugin_dir_url( __FILE__ )  . "js/icon-picker.js", '', false, true);
        wp_enqueue_script('colpick', plugin_dir_url( __FILE__ )  . "js/colpick.js", '', false, true);
		
        wp_enqueue_script('kalimah-shortcodes', plugin_dir_url( __FILE__ )  . "js/kalimah-admin-shortcodes.js", array(
            'jquery'
        ), false, true);
		
		wp_enqueue_script('caret', plugin_dir_url( __FILE__ )  . "js/jquery.caret.js", array(
            'jquery'
        ), false, true); 
		
		wp_enqueue_script('places', "http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places", array(), false, true);  
				
		wp_enqueue_script('geocomplete', plugin_dir_url( __FILE__ )  . "js/jquery.geocomplete.js", array(
            'jquery'
        ), false, true);
		
		wp_enqueue_media();
    return true;
}


function kalimah_wp_enqueue()
{
        wp_enqueue_style('kalimah-shortcodes', plugin_dir_url( __FILE__ ) . "css/kalimah-shortcodes.css", array(), '', 'all');
		
		if(get_locale() == 'ar')
			wp_enqueue_style('kalimah-shortcodes-rtl', plugin_dir_url( __FILE__ ) . "css/kalimah-shortcodes-rtl.css", array(), '', 'all');
		
        wp_enqueue_style('kalimah-magictime', plugin_dir_url( __FILE__ ) . "css/magictime.css", array(), '', 'all');
		wp_enqueue_style('kalimah-icons', plugin_dir_url( __FILE__ ) . "css/icons.css", array(), '', 'all');
		wp_enqueue_style('kalimah-device', plugin_dir_url( __FILE__ ) . "css/kalimah-device.css", array(), '', 'all');
        wp_enqueue_script('kalimah-shortcodes', plugin_dir_url( __FILE__ )  . "js/kalimah-shortcodes.js", array(
            'jquery'
        ), false, true); 
		
		wp_enqueue_style('kalimah-animation', plugin_dir_url( __FILE__ ) . "css/animation.css", array(), '', 'all');
		
		  wp_enqueue_script('kalimah-inview', plugin_dir_url( __FILE__ )  . "js/jquery.inview.js", array(
            'jquery'
        ), false, true); 
		

		wp_enqueue_script('kalimah-shortcodes-frontend', plugin_dir_url( __FILE__ )  . "js/kalimah-frontend.js", array(
            'jquery'
        ), false, true);
		
		wp_enqueue_script('kalimah-google_maps', '//maps.google.com/maps/api/js?sensor=false', array(), false, true);
		
		// Load inline css
		$settings_array = get_option('kalimah_shortcodes_options');
		$style_css = $settings_array['settings']['custom_css'];
		
		wp_add_inline_style('kalimah-shortcodes', $style_css);
    return true;
}


function kalimah_options_process($array)
{
	global $hide_array;
	$file_dir =  plugin_dir_url( __FILE__ );

	if(!isset($hide_array))
		$hide_array = array();
	
    # Loop through each section to get form type and display it accordingly
    foreach ($array as $item) {
        # Set defaults
        $rows_count = (isset($item['rows'])) ? $item['rows'] : '10';
        $cols_count = (isset($item['cols'])) ? $item['cols'] : '45';
		
		# Check if slang exit for item
		$item_name = isset($item['slang']) ? $item['slang'] : $item['id'];
		
        $option_value = $item['std'];
		
        # Check if the divs should be hidden on first load and hide them (For divs that related to switch button)
        if (is_array($hide_array)){
			$switch_link = "";
			if(isset($hide_array[$item['id']]))
			{
				if($hide_array[$item_name]['switch_value'] == "n")
					$hide_div = "style='display: none;'";

				# Also add a uniqe id for JS hide/show toggle
				$switch_link = "data-switch-uniqeid='{$hide_array[$item['id']]['uniqe_id']}'";
			}
		}

		# Check if the DIVs should be hidden on first load and hide them (For DIVs that related to radio buttons)
		if(is_array($array_radio_options))
		{
			$item_id = $item['id'];
			$radio_link = "";
			if(array_key_exists($item_id, $array_radio_options) && $last_type != 'softsection_start')
			{
				$radio_hide_div = ($selected_radio_option != $item_name)? "style='display: none;'" : "";
				
				# Get the uniqe id
				$radio_link = "data-radio-uniqeid='{$radio_uniqeid_array[$item_id]}'";
			}
		}
		
		
        switch ($item['type']) {
            # Text input
            case "text":
			if(!isset($item['size']))
				$item['size'] = 50;
			
                $form .= "<div id='{$item['id']}' class='kalimah-settings-input clearfix {$item['class']}' {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
                $form .= "<input name='{$item_name}' type='{$item['type']}' size='{$item['size']}' value='{$option_value}'/>";
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span>';
              
                $form .= '</div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break; 
				
			# Columns
            case "columns":
                $form .= "<div id='{$item['id']}' class='kalimah-settings-columns clearfix {$item['class']}' {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
                $form .= '<script id="column_single" language="text">
						<div class="single_column" data-width="50">
							<input name="start_tag" type="hidden" value="column"/>
							  <span class="single_column_inner">
							    <input name="column[size]" type="hidden" value="50%"/>
								<span class="single_column_percentage">50.00%</span>
								<textarea name="column[content]"></textarea>
								</span>
							  <span class="single_column_seprator"></span>
							  <input name="end_tag" type="hidden" value="column"/>
							</div>
							</script>
						<div class="columns_container">
						  <div class="columns_wrapper">
							<div class="single_column" data-width="50">
							<input name="start_tag" type="hidden" value="column"/>
							  <span class="single_column_inner">
							    <input name="column[size]" type="hidden" value="50%"/>
								<span class="single_column_percentage">50.00%</span>
								<textarea name="column[content]"></textarea>
								</span>
							  <span class="single_column_seprator"></span>
							  <input name="end_tag" type="hidden" value="column"/>
							</div>
							<div class="single_column" data-width="50">
							<input name="start_tag" type="hidden" value="column"/>
							  <span class="single_column_inner">
							    <input name="column[size]" type="hidden" value="50%"/>
								<span class="single_column_percentage">50.00%</span>
								<textarea name="column[content]"></textarea>
								</span>
							  <span class="single_column_seprator"></span>
							  <input name="end_tag" type="hidden" value="column"/>
							</div>
							</div>
						  <span class="add_column">+</span>
						</div>
						';
                $form .= '</span>';
              
                $form .= '</div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break; 
				
				
		
				
			# sections (for accordion, tabs and sliders)
            case "sections":
                $form .= "<div id='{$item['id']}' class='{$item['main-class']} clearfix'  {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
                $form .= "<div class='add_section_wrapper'><input class='shortcode_section_title' name='{$item_name}' type='text' size='{$item['size']}' value=''/>";
                $form .= "<div id='add_section' class='add_section'/>+</div></div>";
                $form .= $item['section'];
				$form .= "<span class='desc'>{$item['desc']}</span>";
				$form .= "<div class='kalimah-shortcodes-sections-container'/>";
				$form .= "</div>";
                $form .= '</span>';
                $form .= '</div>';
				
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
				
		
			# Media Uploader
            case "media":
		/*	$placeholder = plugin_dir_url( __FILE__ ).'/images/media_none.png';
			if($option_value == '')
				$src = plugin_dir_url( __FILE__ ).'/images/media_none.png';
			else
				$src = $option_value;
			*/
			if(empty($item['multiple']))
				$item['multiple'] = 'false';
			
                $form .= "<div id='{$item['id']}' class='kalimah-settings-media clearfix' data-multiple='{$item['multiple']}' {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
               
				$form .= "<div class='kalimah-settings-media-image-multiple'>";
				$form .= "<span class='upload-btn' data-multiple='{$item['multiple']}'></span>";
                $form .= "<input name='{$item_name}' id='{$item['id']}' type='text' size='{$item['size']}' value='{$option_value}'/>";
                $form .= "</div>";
                $form .= "<div class='kalimah-settings-media-image'>";
				$form .= "<input name='{$item_name}' id='{$item['id']}' type='hidden'/>";
                $form .= "<img class='media_image' name='{$item_name}'/>";
				$form .= "<span class='remove_media_image' data-id='{$item['id']}'></span>";
                $form .= "<span name='upload-btn' id='{$item["id"]}' class='upload-btn' data-multiple='{$item['multiple']}'></span>";
                $form .= '<span class="kalimah-settings-media-image-icon"></span>';
                $form .= '</div>';
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span></div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;

			
            # Radio buttons
            case 'radio':
				# Does this radio group show/hide other elements?
				# Add class so we can use it through jQuery
				$class = (isset($item['enable-hide'])) ? "radio-enable-hide" : "";
				$class .= (!isset($item['radio-switch'])) ? " kalimah-settings-radio" : " kalimah-settings-radio-switch";
				if(isset($item['enable-hide']))
				{
					$array_radio_options = $item['options'];
					$selected_radio_option = $option_value;
				}
				
	
				# Display group
                $form .= "<div id='{$item['id']}' class='{$class} clearfix ' {$switch_link} {$radio_link} {$radio_hide_div} {$hide}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
				
				// radio unique value for each radio group
				$radio_group_uniqid = uniqid('radio');
				
                foreach ($item['options'] as $key => $value) {
					# We also need a uniqe value to link both items. This is more reliable than using an ID or class name
					$radio_uniqeid = uniqid();
					$uniqe_id = (isset($item['enable-hide'])) ? "data-uniqeid='{$radio_uniqeid}'" : "";

					# create an array of IDs to use it later
					$radio_uniqeid_array[$key] = $radio_uniqeid;
					
					
					
                    $radio_checked = ($option_value == $key) ? 'checked="checked"' : "";
                    $form .= "<label data-id='{$key}' {$uniqe_id}><input type='radio' name='{$item_name}-{$radio_group_uniqid}' data-name='{$item_name}' value='{$key}' {$radio_checked}> ";
                    $form .= "<span>{$value}</span></label>";
                }
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span></div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
			# Icons
            case "icons":
				$uniqe_id = uniqid();
				
                $form .= "<div id='{$item['id']}' class='kalimah-settings-icons clearfix  {$item['class']}' data-number='{$item['id']}' {$radio_hide_div} {$select_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
				$form .= "<input class='regular-text' type='hidden' id='icons-{$uniqe_id}' name='{$item_name}' value=''/>";
				$form .= "<span id='preview-icon-{$item['id']}' data-target='#icons-{$uniqe_id}' data-display='#preview-icon-{$item['id']}' class='button icon-picker {$value}'></span>";
                $form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span>';
                
                $form .= '</div>';
               
                break;
				
            # Multiple selection
            case "select":
				unset($multiple);
				
				$name = $item_name;
				
                if ($item['multiple'] == 'yes')
				   $multiple = 'multiple="multiple"';
				   //$name = $item_name."[]";
				
				
				$form .= "<div id='{$name}' class='kalimah-settings-select clearfix' {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
				$form .= "<select name='{$name}' {$multiple}>";

				// Clear selected value
				$selected = '';
						
				if(is_array($item['options']))
				{
					
					foreach ($item['options'] as $key => $array_or_single_values) {
						if (is_array($array_or_single_values)) {
							$form .= "<optgroup label='{$key}'>{$key}";
							foreach ($array_or_single_values as $group_key => $group_value) {
								# Check that we have an array of values for this option 
								if (is_array($option_value)) {
									# Check if the item is selected
									foreach ($option_value as $selected_key) {
										if ($group_value == $selected_key) {
											// if item is selected create the variable and its value
											// break the loop as we don't need it any more for this field
											$selected = "selected";
											break;
										}
									}
								} else {
									$selected = ($option_value == $group_value) ? "selected" : "";
								}
								
								$form .= "<option value='{$group_key}' {$selected}>{$group_value}</option>";
							}
							$form .= "</optgroup>";
						}else
						{
							# Check that we have an array of values for this option 
							if (is_array($option_value)) {
								# Check if the item is selected
								foreach ($option_value as $selected_key) {
									if ($array_or_single_values == $selected_key) {
										// if item is selected create the variable and its value
										// break the loop as we don't need it any more for this field
										$selected = "selected";
										break;
									}
								}
							} else {
								$selected = ($option_value == $array_or_single_values) ? "selected" : "";
							}
							
							$form .= "<option value='{$key}' {$selected}>{$array_or_single_values}</option>";
						}
					}
				}
                $form .= '</select>';
				$form .= "<span class='desc'>{$item['desc']}</span>";
				$form .= '</span></div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
				 # Typography
				case "typography":
                //wp_enqueue_style( 'font', 'http://fonts.googleapis.com/css?family='.str_replace(' ', '+', $font_type));
				
				
				$form .= "<span class='form-title'>{$item['name']}</span>";
				$form .= "<span class='form-bit'>";
                $form .= "<div id='{$item['id']}' class='kalimah-shortcodes-typography contrast_bg clearfix color-picker'>";
                $form .= "<span class='form-bit'>";
                $form .= "<div class='format-btns'>";
				$form .= "<input type='checkbox' data-type='bold' id='kalimah-shortcodes-typography-bold' value='bold' name='bold'/><label for='kalimah-shortcodes-typography-bold' class='kalimah-shortcodes-typography-bold no-select'>B</label>";
                $form .= "<input type='checkbox' data-type='underline' id='kalimah-shortcodes-typography-underline' value='underline' name='underline'/><label for='kalimah-shortcodes-typography-underline' class='kalimah-shortcodes-typography-underline no-select'>U</label>";
                $form .= "<input type='checkbox' data-type='italics' id='kalimah-shortcodes-typography-italics' value='italics' name='italics'/><label for='kalimah-shortcodes-typography-italics' class='kalimah-shortcodes-typography-italics no-select'>I</label>";
				$form .= "<input type='checkbox' data-type='strikethrough' id='kalimah-shortcodes-typography-strikethrough' value='strikethrough' name='strikethrough'/><label for='kalimah-shortcodes-typography-strikethrough' class='kalimah-shortcodes-typography-strikethrough no-select'>S</label>";
                $form .= "</div>";
				
				$form .= "<div class='font-type'>"; 
				$form .= $this->shortcode_typography_fonts($item, $option_value);
				$form .= "</div>";
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span></div>';  
                $form .= '</span>';  
                break;
            
			
            # Textarea type
            case "textarea":
                $form .= "<div id='{$item['id']}' class='kalimah-settings-textarea clearfix' {$switch_link} {$radio_link} {$radio_hide_div}>";
				
				if(isset($item['name']))
                $form .= "<span class='form-title'>{$item['name']}</span>";
				
                $form .= "<span class='form-bit'>";
                $form .= "<textarea name='{$item_name}' rows='{$rows_count}' cols='{$cols_count}' placeholder='{$item['placeholder']}' >{$option_value}";
                $form .= '</textarea>';
				$form .= "<span class='desc'>{$item['desc']}</span>";
				$form .= "</span></div>";
				
				unset($radio_hide_div);
                break;
            
            # Checkbox type
            case "checkbox":
		
                $form .= "<div id='{$item['id']}' class='kalimah-settings-checkbox clearfix' {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
                foreach ($item['options'] as $key => $value) {
                    // Clear checked value
                    $checked = '';
                    
                    # Check that we don't have empty values for this option 
                    if (is_array($option_value)) {
                        # Check if the item is selected
                        foreach ($option_value as $checked_key) {
                            if ($key == $checked_key) {
                                // if item is checked create the variable and its value
                                // break the loop as we don't need it anymore for this field
                                $checked = "checked";
                                break;
                            }
                        }
                    }
                    // Outpot the form
                    
                    $form .= "<label>";
					$form .= "<input type='checkbox' name='{$item['id']}[]' value='{$key}' id='{$key}' {$checked}>";
					$form .= "{$value}</label>";
                }
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span>';
				$form .= '</div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
			# Range type
            case "range":
				if($item['step'] != '')
					$step =   "step='{$item['step']}'";
				
				$range = explode(',', $item['range']);
				$min = $range[0];
				$max = $range[1];
				
				if(is_array($item['units']))
					$multiple = 'multiple';
				
                $form .= "<div id='{$item['id']}' class='kalimah-settings-range $multiple clearfix' {$switch_link} {$radio_link} {$radio_hide_div}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
               
			   
				# if units is an array it means that we have to give options
				if(is_array($item['units']))
				{
					$std_unit = (isset($option_value['units'])) ? $option_value['units'] : $item['units_std'];
					$range_value = (!empty($option_value['value'])) ? $option_value['value'] : $option_value;
					
					// get the index of the std_unit
					$index = array_search($std_unit, $item['units']);
					$std_hidden_value = (!empty($item['origianl_unites'][$index])) ? $item['origianl_unites'][$index] : $std_unit;
					
					$form .= "<input id='{$item['id']}' name='{$item_name}[value]' type='range' min='{$min}' max='{$max}' value='{$range_value}' {$step}>";
					$form .= "<span class='data-slider-value'>{$range_value}</span>";
					
					$form .= "<input class='kalimah-range-units multiple' type='hidden' name='{$item_name}[units]' value='{$std_hidden_value}' />";
					$form .= "<span class='data-slider-units multiple'>";
					
					
					# loop through elements and check which unit has been selected and saved by user
					foreach($item['units'] as $key => $unit)
					{
						if($std_unit == $unit)
							$form .= "<span class='active no-select' data-value='{$item['origianl_unites'][$key]}'>".$unit."</span>";
						else
							$form .= "<span class='no-select' data-value='{$item['origianl_unites'][$key]}'>".$unit."</span>";
					}

					$form .= "</span>";
				}else
				{
					
					$form .= "<input id='{$item['id']}' name='{$item_name}' type='range' min='{$min}' max='{$max}' value='{$option_value}' {$step}>";
					$form .= "<span class='data-slider-value no-select'>{$option_value}</span>";
					$form .= "<span class='data-slider-units no-select'>{$item['units']}</span>";
				}
                $form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span></div>';
				unset($radio_hide_div);
                break;
				
				
            # On/off type
            case "switch":
				# We need a uniqe value to link both items. This is more reliable than using an ID or class name
				$switch_uniqeid = uniqid();
				$uniqe_Id = ($item['hide']) ? "data-uniqeid='{$switch_uniqeid}'" : "";
				
				# add unique id to each element in hide array
				if(is_array($item['hide']))
				{
					foreach ($item['hide'] as $key)
					{
						$hide_array[$key] = array('switch_value' => $option_value, 'uniqe_id' => $switch_uniqeid);
					}
				}
		
				
                # Prepare hide/show spcified divs on switch click
                $hide    = ($item['hide']) ? "data-hide='" . implode(',', $item['hide']) . "'" : "";
                $checked = ($option_value == "checked") ? "checked='checked'" : " ";
                
				$form .= "<div id='{$item['id']}' class='kalimah-settings-checkbox switch switch-info clearfix' {$uniqe_Id} {$switch_link} {$radio_link} {$hide}>";
                $form .= "<span class='form-title'>{$item['name']}</span>";
                $form .= "<span class='form-bit'>";
                
                # We add hidden form to submit value if the box is unchecked (it has to have same name as the checbox)
                $form .= "<input type='hidden' name='{$item_name}' value='n' />";
				
                $form .= "<label><input data-id='{$item['id']}' type='checkbox' name='{$item_name}' value='checked' {$checked} />";
                $form .= "<span></span></label>";
				
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span></div>';
				unset($radio_hide_div);
				unset($hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
            # Images selector
            case 'images':

                $form .= "<div id='{$item['id']}' class='kalimah-settings-images clearfix' {$switch_link} {$radio_link} {$radio_hide_div}>";
                
                if(isset($item['name']))
                $form .= "<span class='form-title'>{$item['name']}</span>";
			
                $form .= "<span class='form-bit'>";
                foreach ($item['options'] as $key => $value) {
                    // Clear checked value
                    $radio_checked = '';
                    $radio_class   = '';
                    
                    # Check if the item is selected
                    if ($option_value == $key) {
                        // if item is checked create the variable and its value
                        // break the loop as we don't need it anymore for this field
                        $radio_checked = "checked = 'checked'";
                        $radio_class   = " image-selected";
                    }
                    $form .= "<input type='radio' name='{$item_name}' value='{$key}' id='{$key}' {$radio_checked}>";
					if($item['selector-type'] == 'css')
						$form .= "<label class='images css-selector{$radio_class}' for='{$key}'><div class='{$value}'><span></span><span></span><span></span><span></span></div></label>";
					else
						$form .= "<label class='images image-selector{$radio_class}' for='{$key}'><img src='{$file_dir}/{$value}'></label>";
                }
				//
				$form .= "<span class='desc'>{$item['desc']}</span>";
                $form .= '</span></div>';
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
           
            # Section Start
            case "hidden":
                $form .= "<input type='hidden' value='{$item['value']}' name='{$item_name}' />";
                break;
            
			# Submit Button
			case "submit":
                $form .= "<div id='{$item['id']}' class='kalimah-settings-submit clearfix {$item['class']}'>";
               // $form .= "<span class='form-title'></span>";
              //  $form .= "<span class='form-bit'>";
                $form .= "<input id='".$item['id']."' name='".$item['id']."' type='{$item['type']}' size='{$item['size']}' value='{$item['text']}'/>";
              //  $form .= '</span>';
                $form .= '</div>';
                break; 
				
            # Section Start
            case "section_start":
				#header type
				$header = (isset($item['header'])) ? $item['header'] : "h2";
				
				# check if section is a group of divs 
				if(isset($item['group']) AND $item['group'] == 'yes')
				{
					$form .= "<div id='{$item['id']}-shortcode' data-id='{$item['id']}' class='clearfix'  {$switch_link} {$radio_link} {$radio_hide_div}>";
				}
				else
				{
					$form .= "<div id='{$item['id']}-shortcode' data-id='{$item['id']}' class='kalimah-settings-section-start kalimah-shortcodes clearfix'  {$switch_link} {$radio_link} {$radio_hide_div}>";
					$form .= "<{$header}>{$item['name']}</{$header}><hr>";
				}
				
				# We don't need the variable here so unset
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
            # Section End
            case "section_end":
                $form .= "</div>";
                break;
            
            # Sub-section Start
			# We mainly need this for the home builder options page
            case "subsection_start":
                if ($item['status'] == 'hide')
                    $style = "style='opacity: 0; display:none;'";
                
                $form .= "<li id='{$item['id']}' class='sortable-element clearfix' {$style}>";
                $form .= "<div class='kalimah-settings-subsection-start solid clearfix'>";
                $form .= "<div class='options-header border-radius-two-corners-top clearfix'>";
                $form .= "<h3 class='handle'>{$item['name']}</h3><span class='toggle'> - </span>";
                $form .= '<span class="delete dashicons dashicons-trash"></span>';
                $form .= "</div>";
                $form .= "<div class='options-box clearfix'>";
                break;
            
            # sub-section End
            case "subsection_end":
                $form .= "</div></div>";
                break;
				
			# Soft-section Start
			# We mainly need this for hide/unhiding divs
            case "softsection_start":
                $form .= "<div id='{$item['id']}' class='kalimah-settings-softsection-start clearfix' {$switch_link} {$radio_link} {$radio_hide_div}>";
				
				# We don't need the variable here so unset
				unset($radio_hide_div);
				unset($radio_link);
				unset($switch_link);
                break;
            
            # sub-section End
            case "softsection_end":
                $form .= "</div>";
                break;
            
            # Upload type
            case "upload":
                $form .= "$item[name] => $item[type]<br>";
                break;
				
			
        }
		
		$last_type = $item['type'];
    }
		
   return $form;
}


function shortcode_typography_fonts()
{
    require_once('includes/google_fonts.php');
	
    $form .= "<select name='font_family' >";
    foreach ($google_fonts_array as $group_name => $group_fonts) {
        $form .= "<optgroup label='{$group_name}'>";
        
        foreach ($group_fonts as $font) {
            $form .= "<option value='{$font}'>{$font}</option>";
        }
        $form .= '</optgroup>';
    }
    $form .= '</select>';
    return $form;
    
}

function kalimah_update_popular() {

	$saved_popluar_array = get_option('kalimah_shortcodes_options');
	
	$id = $_POST['id'];
	$saved_popluar_array['popular'][$id]++;
	
	update_option('kalimah_shortcodes_options', $saved_popluar_array);
	
	die();
}

function kalimah_update_settings() {

	$settings_array = get_option('kalimah_shortcodes_options');
	
	$id = $_POST['id'];
	
	$settings_array['settings']['prefix'] = $_POST['prefix'];
	$settings_array['settings']['custom_css'] = $_POST['custom_css'];
	
	update_option('kalimah_shortcodes_options', $settings_array);
	
	
	print_r(get_option('kalimah_shortcodes_options'));
}
}

new kalimah_shortcodes();

?>