

@extends('Admin.master')
@section('title')
    News/Announcement Edit
@endsection
@section('content')
<div class="col-12">
<div class="card mb-4">
    <div class="card-header"><strong>News/Announcement Edit Insert Form</strong><span class="small ms-1"></span></div>
        <div class="card-body">
            <a class="btn btn-success text-white" href="{{ route('announcements') }}"><i class="fa-solid fa-backward"></i> Back</a>
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
                        <form action="{{ route('announcement_update') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-262">
                            <div class="mb-3">
                                <label class="form-label" for="announcement_title">Announcement Title</label>
                                <input class="form-control" id="announcement_title" type="text" name="announcement_title" value="{{ $single_announcement->announcement_title }}">
                                <input class="form-control" id="announcement_title" type="text" name="id" value="{{ $single_announcement->id }}" hidden>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="announcement_description">Description</label>
                                <textarea name="announcement_description" id="announcement_description" class="form-control" cols="4" rows="4" >{{ $single_announcement->announcement_description }}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="announcement_image">Upload Photo</label>
                                <input class="form-control" id="announcement_image" type="file" name="announcement_image">
                                <div id="emailHelp" class="form-text text-danger">Maximum file size should be 300 kb</div>
                                <img src="{{ asset('Uploads/Announcement/'. $single_announcement->announcement_image) }}" alt="" height="80px" width="80px">
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