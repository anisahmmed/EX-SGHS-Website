@extends('Admin.master')
@section('title')
    Banners
@endsection
@section('content')
<div class="col-12">
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    @if(session('status'))
        <div class="alert alert-success">
            {{ session('status') }}
        </div>
    @endif
</div>
<div class="col-12">
    <a class="btn btn-primary text-white" href="{{ route('banner_input') }}"><i class="fa-solid fa-plus"></i> New Banner</a>
</div><br><br>
<div class="col-6">
    <div class="card mb-4">
        <div class="card-header"><strong>Web Banners</strong><span class="small ms-1"></span></div>
        <div class="card-body">
                
                <div class="example">
                    
                    <div class="tab-content rounded-bottom">
                    <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                        <table class="table table-bordered border-primary">
                        <thead>
                            <tr>
                            <th >SL</th>
                            <th >Banner Image</th>
                            <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                            $sl = 1;  
                            @endphp
                            @foreach ($all_banner as $item)
                            <tr>
                            <th scope="row">{{ $sl++ }}</th>
                            <td>
                                <img src="{{ asset('Uploads/Banner/'. $item-> banner_image) }}" width="70px" height="70px" alt="No Image">
                            </td>
                            <td>
                                <a href="{{ url('/banner/edit') }}/{{ $item->id }}" class="btn btn-primary">Edit</a>
                                <a href="{{ url('/banner/delete') }}/{{ $item->id }}" class="btn btn-danger" onclick="return confirm('are you sure?')">Delete</a>
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
    </div>

<div class="col-6">
    <div class="card mb-4">
        <div class="card-header"><strong>Mobile Banners</strong><span class="small ms-1"></span></div>
        <div class="card-body">
                <div class="example">
                    <div class="tab-content rounded-bottom">
                    <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                        <table class="table table-bordered border-primary">
                        <thead>
                            <tr>
                            <th >SL</th>
                            <th >Mobile Banner Image</th>
                            <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                            $sl = 1;  
                            @endphp
                            @foreach ($all_mobile_banner as $item)
                            <tr>
                            <th scope="row">{{ $sl++ }}</th>
                            <td>
                                <img src="{{ asset('Uploads/Banner/'. $item->MobileBanner) }}" width="70px" height="70px" alt="No Image">
                            </td>
                            <td>
                                <a href="{{ url('/mobile-banner-edit') }}/{{ $item->id }}" class="btn btn-primary">Edit</a>
                                <a href="{{ url('/mobile-banner/delete') }}/{{ $item->id }}" class="btn btn-danger" onclick="return confirm('are you sure?')">Delete</a>
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
    </div>
</div>
@endsection