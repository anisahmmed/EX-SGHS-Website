<?php

namespace App\Http\Controllers;
use App\Models\Banner;
use App\Models\Announcement;
use App\Models\MobileBanner;
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
        $all_mobile_banner = MobileBanner::all();
        return view('Admin.banner.all_banner', compact('all_banner','all_mobile_banner'));
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
        $single_banner = Banner::findOrFail($id);
        $destinaiton = 'Uploads/Banner/'. $single_banner->banner_image;
            if(File::exists($destinaiton)){
                File::delete($destinaiton);
            }
        $single_banner->delete();

        return redirect(route('banners'))->with('status', 'Banner Deleted!');
    }

    //Mobile banner input
    public function mobile_banner(Request $request)
    {
        $request->validate([
            'mobile_banner' => 'required|image',
        ]);

        $mobile_banners = new MobileBanner;

        if($request->hasfile('mobile_banner')){
            $file = $request->file('mobile_banner');
            $extention = $file->getClientOriginalExtension();
            $filename = time().'.'.$extention;
            $file->move('Uploads/Banner/', $filename);
            $mobile_banners->MobileBanner = $filename;
        }
        $mobile_banners->save();
        return back()->with('status', 'New Mobile Banner added!');
    }
    //edit mobile banner
    public function edit_mobile_banner($id)
    {
        $single_mobile_banner = MobileBanner::findOrFail($id);
        return view('Admin.banner.edit_mobileBanner', compact('single_mobile_banner'));
    }
    //Update MobileBanner
    public function update_MobileBanner(Request $request)
    {
        $request->validate([
            'MobileBanner' => 'required|image'
        ]);
        $mobile_banners = MobileBanner::find($request->id);

        if($request->hasfile('MobileBanner')){
            $destinaiton = 'Uploads/Banner/'. $mobile_banners->MobileBanner;
            if(File::exists($destinaiton)){
                File::delete($destinaiton);
            }
            $file = $request->file('MobileBanner');
            $extention = $file->getClientOriginalExtension();
            $filename = time().'.'.$extention;
            $file->move('Uploads/Banner/', $filename);
            $mobile_banners->MobileBanner = $filename;
        }
        $mobile_banners->update();
        return redirect(route('banners'))->with('status', 'Mobile Banner Updated Successfully!');
    }
    //MobileBanner Delete
    public function mobileBanner_delete($id)
    {
        $single_mobileBanner = MobileBanner::findOrFail($id);
        $destinaiton = 'Uploads/Banner/'. $single_mobileBanner->MobileBanner;
            if(File::exists($destinaiton)){
                File::delete($destinaiton);
            }
        $single_mobileBanner->delete();

        return redirect(route('banners'))->with('status', 'Banner Deleted!');
    }
    

    //news announcement input form view
    public function announcement_input_form()
    {
        return view('Admin.announcement.input');
    }
    //announcement insert
    public function announcement_insert(Request $request)
    {
        $request->validate([
            'announcement_title' => 'required',
            'announcement_description' => 'required',
            'announcement_image' => 'required|image|max:300',
        ]);
        $announcements = new Announcement;
        $announcements->announcement_title = $request->announcement_title;
        $announcements->announcement_description =$request->announcement_description;

        if($request->hasfile('announcement_image')){
            $file = $request->file('announcement_image');
            $extention = $file->getClientOriginalExtension();
            $filename = time().'.'.$extention;
            $file->move('Uploads/Announcement/', $filename);
            $announcements->announcement_image = $filename;
        }
        $announcements->save();
        return back()->with('status', 'New News/Announcement added!');
    }
    //All announcements view
    public function announcements()
    {
        $all_announcements = Announcement::all();
        return view('Admin.announcement.all_announcements', compact('all_announcements'));
    }
    //announcement edit
    public function announcement_edit($id)
    {
        $single_announcement = Announcement::findOrFail($id);
        return view('Admin.announcement.announcement_edit', compact('single_announcement'));
    }
    //Announcement Uodate
    public function announcement_update(Request $request)
    {
        $request->validate([
            
            'announcement_image' => 'image|max:300'
        ]);
        $single_announcement = Announcement::findOrFail($request->id);

        $single_announcement->announcement_title = $request->announcement_title;
        $single_announcement->announcement_description = $request->announcement_description;

        if($request->hasfile('announcement_image')){
            $destinaiton = 'Uploads/Announcement/'. $single_announcement->announcement_image;
            if(File::exists($destinaiton)){
                File::delete($destinaiton);
            }
            $file = $request->file('announcement_image');
            $extention = $file->getClientOriginalExtension();
            $filename = time().'.'.$extention;
            $file->move('Uploads/Announcement/', $filename);
            $single_announcement->announcement_image = $filename;
        }
        $single_announcement->update();
        return redirect(route('announcements'))->with('status', 'Announcement Updated Successfully!');
    }
    //announcement delete
    public function announcement_delete($id)
    {
        $single_announcement = Announcement::findOrFail($id);
        $destination = 'Uploads/Announcement/'. $single_announcement->announcement_image;
        if(File::exists($destination)){
            File::delete($destination);
        }
        $single_announcement->delete();
        return redirect(route('announcements'))->with('status', 'Announcement Deleted!');
    }
}
