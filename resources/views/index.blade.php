@extends('layouts.master')
@section('title')
Home | EX-SGHS
@endsection

@section('content')
    

    <div class="w-100 d-block p-0 m-0">
        
        
        <div class="slider banner-slider d-none d-md-block">
            @foreach($all_banner as $banners)
            
            <div><a class="p-0 m-0" href="#">
                
                <img src="{{ asset('Uploads/Banner/'.$banners->banner_image) }}" class="w-100 m-0 d-none" /></a>
                
            </div>
            @endforeach
        </div>
        
        <div class="slider banner-slider d-block d-md-none">
            @foreach($all_mobileBanner as $mobileBanner)
            <div>
                <a class="p-0 m-0" href="#">
                    <img src="{{ asset('Uploads/Banner/'.$mobileBanner->MobileBanner) }}" class="w-100 m-0 d-none" />
                </a>
            </div>
            @endforeach
            {{-- <div><a class="p-0 m-0" href="#"><img src="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/20221122-140313-00001669104276.png" class="w-100 m-0 d-none" /></a></div>
            <div><a class="p-0 m-0" href="#"><img src="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/20221122-135800-00001669104276.png" class="w-100 m-0" /></a></div>
            <div><a class="p-0 m-0" href="#"><img src="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/whatsapp-image-2022-11-28-at-14930-pm1669622053.jpeg" class="w-100 m-0" /></a></div> --}}
           <!-- <div><a class="p-0 m-0" href="#"><img src="#" class="w-100 m-0" /></a></div>-->
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
        
        <h3 class="w-100 mg-b-0 mg-t-5 text-center">News/Announcement</h3>

        <div class="col-12">
            <div class="card mb-4">
                {{-- <div class="card-header"><strong>Announcements</strong><span class="small ms-1"></span></div> --}}
                <style>
                    #div1 {
                        height: 600px;
                        /* width:800px; */
                        overflow: scroll; 
                        
                    }
                </style>
                <div class="card-body" id="div1">
                    <div class="example">
                        <div class="tab-content rounded-bottom">
                        <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                            <table class="table table-bordered border-primary">
                            <thead style="background-color: #239e08; color: white; text-align:center;">
                                <tr>
                                <th >SL</th>
                                <th >Date</th>
                                <th >Image</th>
                                <th >Title</th>
                                <th >View</th>
                                </tr>
                            </thead>
                            <tbody style="text-align:center;">
                                @php
                                $sl = 1;  
                                @endphp
                                @foreach ($all_announcement as $item)
                                    <tr>
                                    <td>{{ $sl++ }}</td>
                                    <td>{{ date('d-m-Y', strtotime($item->created_at)); }}</td>
                                    <td>
                                        <img src="{{ asset('Uploads/Announcement/'. $item-> announcement_image) }}" width="70px" height="70px" alt="No Image">
                                    </td>
                                    <td>{{ $item->announcement_title }}</td>
                                    
                                    <td>
                                        <!--<a href="{{ route('news_announcement') }}" class="btn btn-primary">View</a>-->
                                        <a href="{{ url('/news-announcement-detail') }}/{{ $item->id }}" class="btn btn-theme">View</a>
                                    </td>
                                    </tr>
                                @endforeach
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
@endsection