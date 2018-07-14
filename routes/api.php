<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Parse CSV
Route::post('/importer/csv', 'API\ImporterController@handleCSVFile');

// Orders
Route::get('/orders', 'API\OrdersController@index');
Route::post('/orders/create', 'API\OrdersController@store');
