<?php

/*
|--------------------------------------------------------------------------
| Version
|--------------------------------------------------------------------------
|
| Set the theme version.
|
*/
defined('STUPID_VERSION') or define('STUPID_VERSION', '2.0.0');

/*
|--------------------------------------------------------------------------
| Encoding
|--------------------------------------------------------------------------
|
| Set internal encoding
|
*/
mb_internal_encoding('UTF-8');

/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
|
| Define default paths and urls to the application.
|
*/
require_once(__DIR__."/paths.php");

/*
|--------------------------------------------------------------------------
| Enviroments
|--------------------------------------------------------------------------
|
| Load enviroment variables.
|
*/
require_once(__DIR__."/bootstrap/dotenv.php");


/*
|--------------------------------------------------------------------------
| Clean up Wordpress
|--------------------------------------------------------------------------
|
| Do generic cleanup of what wordpress put in the header etc.
|
*/
require_once(__DIR__."/bootstrap/cleanup.php");

/*
|--------------------------------------------------------------------------
| Advanced Custom Fields
|--------------------------------------------------------------------------
|
| Initialize Advanced Custom Fields json save.
|
*/
require_once(__DIR__."/bootstrap/acf.php");

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
|
| Add helper functions.
|
*/
require_once(__DIR__."/bootstrap/helpers.php");

/*
|--------------------------------------------------------------------------
| Inversion of Control Container
|--------------------------------------------------------------------------
|
| Initialize the IoC Container to bootsrap the application.
|
*/
require_once(__DIR__."/bootstrap/ioc.php");

/*
|--------------------------------------------------------------------------
| Options
|--------------------------------------------------------------------------
|
| Load Wordpress options, like, register_nav_menu and wp_enqueue.
|
*/
require_once(__DIR__."/../options.php");