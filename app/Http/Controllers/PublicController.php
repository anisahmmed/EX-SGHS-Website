<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;

class PublicController extends Controller
{
    function terms_policy()
    {
        return view('terms_and_policy');
    }

    //News and announcemet view
    function news_announcement()
    {
        $all_announcements = Announcement::all();
        return view('news_and_announcement', compact('all_announcements'));
    }
}
