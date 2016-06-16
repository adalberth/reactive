<?php

/*
 * Enqueue various resources.
 * --------------------------------------------------
 */
add_action('wp_enqueue_scripts', function(){
    wp_enqueue_style("style.css", get_stylesheet_directory_uri()."/build/css/style.css",  [], APP_VERSION);
    wp_enqueue_script('bundle.js', get_stylesheet_directory_uri()."/build/js/bundle.js", [], APP_VERSION, true);
}, 15);



/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
|
| Register Nav Menues for the application.
|
*/
add_action( 'init', function () {
    register_nav_menu('primary-navigation', __('Primary navigation'));
});
