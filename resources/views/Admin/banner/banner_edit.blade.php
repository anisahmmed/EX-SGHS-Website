@extends('Admin.master')
@section('title')
    Edit Banner
@endsection
@section('content')
<div class="col-12">
    <div class="card mb-4">
        <div class="card-header"><strong>Edit Banner Form</strong><span class="small ms-1"></span></div>
        <div class="card-body">
            <a class="btn btn-success text-white" href="{{ route('banners') }}"><i class="fa-solid fa-backward"></i> Back</a>
                <div class="example">
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
                    <div class="tab-content rounded-bottom">
                    <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                        <form action="{{ route('banner_update') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-262">
                            <div class="mb-3">
                                <label class="form-label" for="formFile">Upload Banner</label>
                                <input class="form-control" id="formFile" type="text" name="id" value="{{ $single_banner->id }}" hidden>
                                <input class="form-control" id="formFile" type="file" name="banner_image">
                                <div id="emailHelp" class="form-text text-danger">Maximum file size should be 512 kb</div>
                                <img src="{{ asset('Uploads/Banner/'.$single_banner->banner_image) }}" alt="" width="70px" height="px">
                            </div>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection