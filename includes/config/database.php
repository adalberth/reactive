<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Choose the connection for the Model Query Builder class.
    | Choices: wpdb, mysql
    |
    | CAUTION: If choosing mysql a seperate PDO connection to the database is
    |          made and the Wordpress core still uses the wpdb mysqli connection.
    |
    */

    'default' => env('DB_CONNECTION', 'wpdb'),
];
