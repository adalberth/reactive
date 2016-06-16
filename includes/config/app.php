<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */

    'locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | The fallback locale determines the locale to use when the current one
    | is not available. You may change the value to correspond to any of
    | the language folders that are provided through your application.
    |
    */

    'fallback_local' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'providers' => [
        /*
         * System Service Providers...
         */
        Stupid\Support\Config\ConfigServiceProvider::class,
        Stupid\Support\Session\SessionServiceProvider::class,
        Stupid\Support\Translation\TranslationServiceProvider::class,
        Stupid\Support\Validation\ValidationServiceProvider::class,
        Stupid\Database\DatabaseServiceProvider::class,
        Stupid\Support\Facade\FacadeServiceProvider::class,

        /*
         * Application Service Providers...
         */
        
        App\Test\TestServiceProvider::class
    ],

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */

    'aliases' => [
        'Session'   => Stupid\Support\Session\Facade::class,
        'Config'    => Stupid\Support\Config\Facade::class,
        'Locale'    => Stupid\Support\Translation\Facade::class,
        'Validator' => Stupid\Support\Validation\Facade::class,
    ]
];
