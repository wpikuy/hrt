<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function (){
	return redirect('/viewall');
});

Route::get('/viewall', function (){
	return view('viewall');
});

Route::get('/upload', function (){
	return view('upload');
});

Route::get('/search', function (){
	return view('search');
});

Route::get('/getallinfoes', 'info@getAllInfoes');
Route::get('/deleteinfo', 'info@deleteInfo');
Route::get('/saveinfo', 'info@saveInfo');
Route::get('/searchinfo', 'info@searchInfo');
Route::post('/uploadinfo', 'info@uploadInfo');
