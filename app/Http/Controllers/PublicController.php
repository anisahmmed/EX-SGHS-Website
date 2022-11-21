<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PublicController extends Controller
{
    function terms_policy()
    {
        return view('terms_and_policy');
    }
}
