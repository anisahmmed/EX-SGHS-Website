<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PublicController;
use App\Models\Banner;
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

Route::get('/', function () {
    $all_banner = Banner::all();
    return view('index', compact('all_banner'));
});

//Terms and policy view
Route::get('/terms-and-policy', [PublicController::class, 'terms_policy'])->name('terms_policy');

//Admin dashboard view
Route::get('/Dashboard', [AdminController::class, 'admin_dashboard'])->name('admin_dashboard');

//Banner input form view
Route::get('/banner-form', [AdminController::class, 'banner_input'])->name('banner_input');
//Banner form submit
Route::post('/banner-form/submit', [AdminController::class, 'banner_submit'])->name('banner_submit');
//All banner view
Route::get('/banners', [AdminController::class, 'banners'])->name('banners');
//Edit banner
Route::get('/banner/edit/{id}', [AdminController::class, 'edit_banner'])->name('edit_banner');
//Update Banner
Route::post('/banner/update', [AdminController::class, 'banner_update'])->name('banner_update');
//delete banner
Route::get('/banner/delete/{id}', [AdminController::class, 'banner_delete'])->name('banner_delete');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
