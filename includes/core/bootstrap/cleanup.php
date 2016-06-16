<?php

/*
|--------------------------------------------------------------------------
| Remove the generator
|--------------------------------------------------------------------------
|
| Remove the meta tag applied to the header by Wordpress.
|
*/
add_filter('the_generator', function () { return ''; });

remove_action('wp_head', 'wp_generator');

/*
|--------------------------------------------------------------------------
| Remove Windows Live Writer manifest
|--------------------------------------------------------------------------
|
| Remove the link tag applied to the header by Wordpress.
| The wlwmainifest enabels tagging for WLW. We don't need that.
|
*/
remove_action('wp_head', 'wlwmanifest_link');

/*
|--------------------------------------------------------------------------
| Remove Really Simple Discovery
|--------------------------------------------------------------------------
|
| Remove the link to the Really Simple Discovery service endpoint,
| EditURI link.
|
*/
remove_action('wp_head', 'rsd_link');

/*
|--------------------------------------------------------------------------
| Remove Admin Bar
|--------------------------------------------------------------------------
|
| Remove the Admin Bar from the frontend.
|
*/
show_admin_bar(false);

/*
|--------------------------------------------------------------------------
| Remove comments
|--------------------------------------------------------------------------
|
| Remove the comments from the admin menu.
|
*/
add_action('admin_init', function () {
    @remove_menu_page('edit-comments.php');
});

/*
|--------------------------------------------------------------------------
| Allow mime types
|--------------------------------------------------------------------------
|
| Allow mime type in the Wordpress media uploader.
|
*/
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});

/*
|--------------------------------------------------------------------------
| Remove emoji
|--------------------------------------------------------------------------
|
| Like WTF?!
|
*/
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/*
|--------------------------------------------------------------------------
| Remove comments
|--------------------------------------------------------------------------
|
| Remove comments from backend
|
*/
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});

/*
|--------------------------------------------------------------------------
| Init theme support
|--------------------------------------------------------------------------
|
| Initialize default theme support
|
*/
add_theme_support('post-thumbnails');
add_theme_support('menus');
