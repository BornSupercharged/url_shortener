<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\SpaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes();

// Route::post('/login', [LoginController::class, 'login']);
Route::get('url/{code}', [SpaController::class, 'index']);
Route::get('url/{code}/stats', [SpaController::class, 'stats']);
Route::get('user/{id}', [SpaController::class, 'user_stats']);

Route::get('{path}', SpaController::class)->where('path', '(.*)');
