<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PublicController;
use App\Models\Banner;
use App\Models\MobileBanner;
use App\Models\Announcement;
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

    $all_announcement = Announcement::latest()->paginate(5);
    $all_banner = Banner::all();
    $all_mobileBanner = MobileBanner::all();
    return view('index', compact('all_banner','all_announcement','all_mobileBanner'));
});

//Terms and policy view
Route::get('/terms-and-policy', [PublicController::class, 'terms_policy'])->name('terms_policy');
//News/Announcement view
Route::get('/news-announcement', [PublicController::class, 'news_announcement'])->name('news_announcement');
Route::get('/news-announcement-detail/{id}', [PublicController::class, 'news_announcement_detail'])->name('news_announcement_detail');

//Admin dashboard view
Route::get('/Dashboard', [AdminController::class, 'admin_dashboard'])->name('admin_dashboard');

// ***New Added start***
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

//Mobile Banner Insert
Route::post('/mobile-banner-input', [AdminController::class, 'mobile_banner'])->name('mobile_banner');
//Edit Mobile Banner
Route::get('/mobile-banner-edit/{id}', [AdminController::class, 'edit_mobile_banner'])->name('edit_mobile_banner');
//Update Mobile Banner
Route::post('/mobile-banner-update', [AdminController::class, 'update_MobileBanner'])->name('update_MobileBanner');
//delete mobileBanner
Route::get('/mobile-banner/delete/{id}', [AdminController::class, 'mobileBanner_delete'])->name('mobileBanner_delete');
// ***New Added END***

//Announcement form view
Route::get('/announcements-input', [AdminController::class, 'announcement_input_form'])->name('announcement_input_form');
//announcement insert
Route::post('/announcement-insert', [AdminController::class, 'announcement_insert'])->name('announcement_insert');
//all announcements view
Route::get('/announcements', [AdminController::class, 'announcements'])->name('announcements');
//Announcement Edit
Route::get('/announcement-edit/{id}', [AdminController::class, 'announcement_edit'])->name('announcement_edit');
//update announcement
Route::post('/announcement-update', [AdminController::class, 'announcement_update'])->name('announcement_update');
//Announcement Delete
Route::get('/announcement-delete/{id}', [AdminController::class, 'announcement_delete'])->name('announcement_delete');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
