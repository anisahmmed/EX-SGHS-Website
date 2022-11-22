@extends('Admin.master')
@section('title')
    Announcements
@endsection
@section('content')
<div class="col-12">
    <div class="card mb-4">
        <div class="card-header"><strong>Announcements</strong><span class="small ms-1"></span></div>
        <div class="card-body">
                <a class="btn btn-primary text-white" href="{{ route('announcement_input_form') }}"><i class="fa-solid fa-plus"></i> New</a>
                <div class="example">
                    @if(session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div class="tab-content rounded-bottom">
                    <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-398">
                        <table class="table table-bordered border-primary">
                        <thead>
                            <tr>
                            <th >SL</th>
                            <th > Title</th>
                            <th > Description</th>
                            <th > Image</th>
                            <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                            $sl = 1;  
                            @endphp
                            @foreach ($all_announcements as $item)
                            <tr>
                            <td>{{ $sl++ }}</td>
                            <td>{{ $item->announcement_title }}</td>
                            <td>{{ $item->announcement_description }}</td>
                            <td>
                                <img src="{{ asset('Uploads/Announcement/'. $item-> announcement_image) }}" width="70px" height="70px" alt="No Image">
                            </td>
                            <td>
                                <a href="{{ url('/announcement-edit') }}/{{ $item->id }}" class="btn btn-primary">Edit</a>
                                <a href="{{ url('/announcement-delete') }}/{{ $item->id }}" class="btn btn-danger">Delete</a>
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