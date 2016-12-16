<?php
$router->resource('setting','SettingController',['only' => ['index','store']]);