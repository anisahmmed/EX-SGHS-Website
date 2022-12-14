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
                height: 170px;
            }
        </style>
        <div class="col-md-12 offset-md- col-12">
            @forelse ($all_announcements as $item)
            <div class="row card-item p-0 mg-b-10 d-flex align-items-center mg-l-0 mg-r-0">
                
                <div class="news">
                    <div class="author">
                        <img class="" height="200px" width="150px" style="" src="{{ asset('Uploads/Announcement/'.$item-> announcement_image) }}" />
                    </div>
                    <div class="description">
                        <Span class="font-weight-bold text-danger">Published Date: {{ date('d-m-Y', strtotime($item->created_at)); }}</Span>
                        <a href="{{ url('/news-announcement-detail') }}/{{ $item->id }}"><h5>{{ Illuminate\Support\Str::limit($item->announcement_title, 46, '...see more') }}</h5></a>
                        <a style="color: black;" href="{{ url('/news-announcement-detail') }}/{{ $item->id }}"><p>{{ Illuminate\Support\Str::limit($item->announcement_description, 70, '...see more') }}</p></a>
                    </div>
                </div>
                
            </div>
            @empty
            <p class="font-weight-bold">We don't have any announcement right now.</p>
            @endforelse
        </div>
    </div>
@endsection