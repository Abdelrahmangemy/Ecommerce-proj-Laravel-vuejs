<?php

use Illuminate\Http\Request;

<<<<<<< HEAD
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


/* 
=======
>>>>>>> 6c15941e38876e10178e6348b85514b5fc412749
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); 
*/




Route::apiResources(['user' => 'API\UserController']);
Route::get('profile','API\UserController@profile');
Route::get('findUser','API\UserController@search');
Route::put('profile','API\UserController@updateProfile');