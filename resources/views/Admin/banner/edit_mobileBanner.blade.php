@extends('Admin.master')
@section('title')
    Edit Mobile Banner
@endsection
@section('content')
<div class="col-12">
    <a class="btn btn-success text-white" href="{{ route('banners') }}"><i class="fa-solid fa-backward"></i> Back</a>
</div><br><br>
<div class="col-12">
    <div class="card mb-4">
        <div class="card-header"><strong>Edit Mobile Banner Form</strong><span class="small ms-1"></span></div>
        <div class="card-body">
            
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
                        <form action="{{ route('update_MobileBanner') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-262">
                            <div class="mb-3">
                                <label class="form-label" for="formFile">Upload Mobile Banner</label>
                                <input class="form-control" id="formFile" type="text" name="id" value="{{ $single_mobile_banner->id }}" hidden>
                                <input class="form-control" id="formFile" type="file" name="MobileBanner"><br>
                                {{-- <div id="emailHelp" class="form-text text-danger">Maximum file size should be 512 kb</div> --}}
                                <img src="{{ asset('Uploads/Banner/'.$single_mobile_banner->MobileBanner) }}" alt="" width="70px" height="70px">
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