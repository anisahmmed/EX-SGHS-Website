<?php

namespace App\Http\Controllers;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AdminController extends Controller
{
    public function __construct()
    {
    //   $this->middleware('restrict_user');
      $this->middleware('auth');
    }
    public function admin_dashboard()
    {
        return view('Admin.index');
    }

    //banner input form view
    public function banner_input()
    {
        return view('Admin.banner.input_form');
    }

    //banner view
    public function banners()
    {
        $all_banner = Banner::all();
        return view('Admin.banner.all_banner', compact('all_banner'));
    }
    //Banner submit
    public function banner_submit(Request $request)
    {
        $request->validate([
            'banner_image' => 'required|image'
        ]);
        $banners = new Banner;

        if($request->hasfile('banner_image')){
            $file = $request->file('banner_image');
            $extention = $file->getClientOriginalExtension();
            $filename = time().'.'.$extention;
            $file->move('Uploads/Banner/', $filename);
            $banners->banner_image = $filename;
        }
        $banners->save();
        return back()->with('status', 'New Banner added!');
    }

    //Edit banner
    public function edit_banner($id)
    {
        $single_banner = Banner::findOrFail($id);
        return view('Admin.banner.banner_edit', compact('single_banner'));
    }
    //Banner Update
    public function banner_update(Request $request)
    {
        $request->validate([
            'banner_image' => 'required|image'
        ]);
        $banners = Banner::find($request->id);

        if($request->hasfile('banner_image')){
            $destinaiton = 'Uploads/Banner/'. $banners->banner_image;
            if(File::exists($destinaiton)){
                File::delete($destinaiton);
            }
            $file = $request->file('banner_image');
            $extention = $file->getClientOriginalExtension();
            $filename = time().'.'.$extention;
            $file->move('Uploads/Banner/', $filename);
            $banners->banner_image = $filename;
        }
        $banners->update();
        return redirect(route('banners'))->with('status', 'Banner Updated Successfully!');
    }

    //Banner Delete
    public function banner_delete($id)
    {
        Banner::findOrFail($id)->delete();
        return redirect(route('banners'))->with('status', 'Banner Deleted!');
    }
}
