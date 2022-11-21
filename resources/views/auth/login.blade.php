<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">
    <title>Login</title>
    <link rel="shortcut icon" type="image/x-icon" href="https://ex-students-sghs.org/old_website/assets/uploads/media-uploader/screenshot-41667242655.png">
    <link rel="manifest" href="dashboard_assets/assets/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="dashboard_assets/assets/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!-- Vendors styles-->
    <link rel="stylesheet" href="dashboard_assets/vendors/simplebar/css/simplebar.css">
    <link rel="stylesheet" href="dashboard_assets/css/vendors/simplebar.css">
    <!-- Main styles for this application-->
    <link href="dashboard_assets/css/style.css" rel="stylesheet">
    <!-- We use those styles to show code examples, you should remove them in your application.-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism.css">
    <link href="css/examples.css" rel="stylesheet">
    <!-- Global site tag (gtag.js) - Google Analytics-->
    <script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-118965717-3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      // Shared ID
      gtag('config', 'UA-118965717-3');
      // Bootstrap ID
      gtag('config', 'UA-118965717-5');
    </script>
  </head>
  <body>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card-group d-block d-md-flex row">
              <div class="card col-md-6 p-4 mb-0">
                <div class="card-body">
                  <h1 class="text-center">Login</h1>
                  <p class="text-medium-emphasis"></p>
                  <form method="POST" action="{{ route('login') }}">
                    @csrf
                  <div class="input-group mb-3"><span class="input-group-text">
                      <svg class="icon">
                        <use xlink:href="dashboard_assets/vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                      </svg></span>
                        
                            <input class="form-control" type="email" name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                            </div>
                            <div class="input-group mb-4"><span class="input-group-text">
                                <svg class="icon">
                                    <use xlink:href="dashboard_assets/vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                </svg></span>
                                <input class="form-control @error('password') is-invalid @enderror" type="password" name="password" placeholder="Password" >
                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="row">
                                <div class="col-6">
                                <button class="btn btn-primary px-4" type="submit">Login</button>
                                </div>
                                {{-- <div class="col-6 text-end">
                                    @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                                </div> --}}
                            </div>
                        </form>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CoreUI and necessary plugins-->
    <script src="dashboard_assets/vendors/@coreui/coreui/js/coreui.bundle.min.js"></script>
    <script src="dashboard_assets/vendors/simplebar/js/simplebar.min.js"></script>
    <script>
    </script>

  </body>
</html>
