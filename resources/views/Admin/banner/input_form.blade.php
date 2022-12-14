

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
    <a class="btn btn-success text-white" href="{{ route('banners') }}"><i class="fa-solid fa-backward"></i> Back</a>
</div><br><br>
<div class="col-6">
    
    <div class="card mb-4">
        <div class="card-header"><strong>Web Banner Insert Form</strong><span class="small ms-1"></span></div>
            <div class="card-body">
                
                    <div class="example">
                        
                        <div class="tab-content rounded-bottom">
                            <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                                <form action="{{ route('banner_submit') }}" method="POST" enctype="multipart/form-data">
                                    @csrf
                                    <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-262">
                                    <div class="mb-3">
                                        <label class="form-label" for="formFile">Upload Web Banner</label>
                                        <input class="form-control" id="formFile" type="file" name="banner_image">
                                        <div id="emailHelp" class="form-text text-danger">Maximum file size should be 512 kb</div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </div><br><br>
    <div class="col-6">
        <div class="card mb-4">
            <div class="card-header"><strong>Mobile Banner Insert Form</strong><span class="small ms-1"></span></div>
                <div class="card-body">
                        <div class="example">
                            <div class="tab-content rounded-bottom">
                                <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                                    <form action="{{ route('mobile_banner') }}" method="POST" enctype="multipart/form-data">
                                        @csrf
                                        <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-262">
                                        <div class="mb-3">
                                            <label class="form-label" for="formFile">Upload Mobile Banner</label>
                                            <input class="form-control" id="formFile" type="file" name="mobile_banner">
                                            <div id="emailHelp" class="form-text text-danger">Maximum file size should be 512 kb</div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
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