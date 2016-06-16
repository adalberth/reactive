<?php
/*
 * Static Url
 * --------------------------------------------------
 */
defined('STATIC_URL') or define('STATIC_URL',  get_stylesheet_directory_uri() ."/build");

/*
 * CSS Url
 * --------------------------------------------------
 */
defined('LIB_URL') or define('LIB_URL', STATIC_URL. "/css");

/*
 * Image Url
 * --------------------------------------------------
 */
defined('IMAGE_URL') or define('IMAGE_URL', STATIC_URL . "/images");

/*
 * JS Url
 * --------------------------------------------------
 */
defined('JS_URL') or define('JS_URL', STATIC_URL. "/js");

/*
 * Lib Url
 * --------------------------------------------------
 */
defined('LIB_URL') or define('LIB_URL', STATIC_URL. "/lib");

/*
 * Library Path
 * --------------------------------------------------
 */
defined('CHILD_LIBRARY_PATH') or define('CHILD_LIBRARY_PATH',  dirname(__DIR__));

/*
 * Library Path
 * --------------------------------------------------
 */
defined('CHILD_PATH') or define('CHILD_PATH',  dirname(CHILD_LIBRARY_PATH));

/*
 * Static Path
 * --------------------------------------------------
 */
defined('STATIC_PATH') or define('STATIC_PATH',  dirname(CHILD_LIBRARY_PATH) . "/build");

/*
 * Config Path
 * --------------------------------------------------
 */
defined('CONFIG_PATH') or define('CONFIG_PATH', CHILD_LIBRARY_PATH."/config");

/*
 * Lang Path
 * --------------------------------------------------
 */
defined('LANG_PATH') or define('LANG_PATH', STATIC_PATH."/lang");

/*
 * Views
 * --------------------------------------------------
 */
defined('VIEW_PATH') or define('VIEW_PATH', dirname(CHILD_LIBRARY_PATH)."/views");

defined('SECTION') 	or define('SECTION', 	VIEW_PATH . "/sections");
defined('PARTIAL') 	or define('PARTIAL', 	VIEW_PATH . "/partials");
defined('PART') 	or define('PART', 		VIEW_PATH . "/parts");
defined('TEMPLATE') or define('TEMPLATE', 	VIEW_PATH . "/templates");
defined('PAGE') 	or define('PAGE', 		VIEW_PATH . "/pages");
defined('LAYOUT') 	or define('LAYOUT', 	VIEW_PATH . "/layouts");
defined('CONTENT') 	or define('CONTENT', 	VIEW_PATH . "/content");