@extends('layouts.master')
@section('title')
Home | Ex-SGHS
@endsection

@section('content')
    

    <div class="w-100 d-block p-0 m-0">
        
        <div class="slider banner-slider d-none d-md-block">
            @foreach($all_banner as $banners)
                
                <div><a class="p-0 m-0" href="#">
                    
                    <img src="{{ asset('Uploads/Banner/'.$banners->banner_image) }}" class="w-100 m-0 d-none" /></a>
                    
                </div>
            @endforeach
            
          <!--  <div><a class="p-0 m-0" href="#"><img src="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/556e116f-4d46-4456-9cbc-153107c38db31667400678.jpeg" class="w-100 m-0" /></a></div>
            <div><a class="p-0 m-0" href="#"><img src="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/556e116f-4d46-4456-9cbc-153107c38db31667400678.jpeg" class="w-100 m-0" /></a></div>-->
        </div>
        
        <div class="slider banner-slider d-block d-md-none">
            {{-- <div><a class="p-0 m-0" href="#"><img src="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/556e116f-4d46-4456-9cbc-153107c38db31667400678.jpeg" class="w-100 m-0 d-none" /></a></div> --}}
           <!-- <div><a class="p-0 m-0" href="#"><img src="#" class="w-100 m-0" /></a></div>
            <div><a class="p-0 m-0" href="#"><img src="#" class="w-100 m-0" /></a></div>-->
        </div>
        
        
    </div>
    
    
    <div class="container">

        

        <div class="row row-xs">
        

            <div class="w-100 d-block pd-20">

                <div class="w-100 mg-b-0 text-justify d-block">
                    <h6>Here we are trying to accommodate all Ex-Students of Satkhira Govt. High School so that we can share our nostalgic memory and get school information and more importantly friends we lost long before. EX-SGHS do social activities for its members along and society.</h6>
                </div>

                <div class="w-100 d-inline-block mg-b-25 mg-t-0 p-0 text-center">
                    <a href="#" class="pd-10 text-primary rounded-5 mg-t-2 mg-r-2 d-inline-block">Read More About Us -></a>
                </div>
            

            </div>

        </div>
@endsection