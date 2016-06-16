<?php

use Stupid\Foundation\Application;
use Illuminate\Filesystem\Filesystem;

/*
|--------------------------------------------------------------------------
| Initialize
|--------------------------------------------------------------------------
|
| Start application and assing instance to the class.
|
*/

// Set chache path
Application::$cachePath = STATIC_PATH . "/.manifest.json";

// Create a new instance the Application
$app = new Application(new Filesystem());

// Set instance
Application::setInstance($app);

/*
|--------------------------------------------------------------------------
| Helper function
|--------------------------------------------------------------------------
|
| Register the app() helper function if not already exists.
|
*/

if (!function_exists('app')) {
    /**
     * Get the available container instance.
     *
     * @param  string  $make
     * @param  array   $parameters
     * @return mixed|\Stupid\Foundation\Application
     */
    function app($make = null, $parameters = [])
    {
        if (is_null($make)) {
            return Application::getInstance();
        }

        return Application::getInstance()->make($make, $parameters);
    }
}

/*
|--------------------------------------------------------------------------
| Register service providers
|--------------------------------------------------------------------------
|
| Register all service providers from config file.
|
*/

$_providers = include(CONFIG_PATH.'/app.php');

$providers = apply_filters('stupid.providers.register', $_providers['providers']);

$app->registerConfiguredProviders($providers);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Register all middlewares.
|
*/

$request = Illuminate\Http\Request::capture();

foreach(apply_filters('stupid.http.middleware', []) as $class) {
    add_action('template_redirect', function () use($app, $class, $request) {
        call_user_func_array([app($class), 'handle'], [$request]);
    });
}