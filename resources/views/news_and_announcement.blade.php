@extends('layouts.master')
@section('title')
    News/Announcement
@endsection
@section('content')
<div class="container">
    
    <div class="row row-xs mg-b-25">
        <div class="mg-b-0 mg-t-10 col-4 offset-4 col-md-2 offset-md-5 text-center">
            {{-- <img class="w-50 h-auto" src="{{asset('assets/img/page-img/br.png')}}" /> --}}
        </div>
        <h3 class="w-100 mg-b-0 mg-t-5 text-center">News/Announcement</h3>
        <hr class="w-100" />

        <style>
            .author{
                flex-basis: 150px;
                height: 150px;
                width: 150px;
                min-width: 150px;
                max-width: 150px;
                margin: 0 0 20px;
                overflow: hidden;
            }
            .description{
                margin-left: 20px;
            }
            .news{
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                -ms-flex-direction: row;
                flex-direction: row;
                -ms-flex-wrap: nowrap;
                flex-wrap: nowrap;
                width: 100%;
                padding: 0px;
                height: 103px;
            }
        </style>
        <div class="col-md-12 offset-md- col-12">
            @foreach ($all_announcements as $item)
            <div class="row card-item p-0 mg-b-10 d-flex align-items-center mg-l-0 mg-r-0">
                {{-- <div class="col-2 col-md-2 pd-5 d-flex justify-content-center align-items-center">
                    <div class="pd-10 border rounded-circle bg-white tx-14 d-flex wd-60 ht-60 font-weight-bold justify-content-center align-items-center"><p class="h1 mg-b-0">{{ $sl++ }}</h3></div>
                </div> --}}
                
                
                    
                
                <div class="news">
                    <div class="author">
                        <img class="" height="100px" width="100px" style="" src="{{ asset('Uploads/Announcement/'.$item-> announcement_image) }}" />
                        {{-- <span>Description</span> --}}
                    </div>
                    <div class="description">
                        <h3>{{ $item->announcement_title }}</h3>
                        <p>{{ Illuminate\Support\Str::limit($item->announcement_description, 30) }}</p>
                    </div>
                </div>
                
            </div>
            @endforeach
        </div>
    </div>
@endsection