<?php

add_filter('acf/settings/save_json', function ($path) {
    $path = STATIC_PATH . '/acf';
    return $path;
});

add_filter('acf/settings/load_json', function ($paths) {
    unset($paths[0]);
    $paths[] = STATIC_PATH . '/acf';
    return $paths;
});
