
/*

Site Main Javascript file
www.dhopaghat.com

*/

var ajax_root = "../";

$(document).ready(function() {
    
    if($("#ltsmBatchWiseChart").length != 0) {
        
        $.ajax({
            url: ajax_root + "get-ltsm-graph-data.php",
            method:"POST",
            data: {},
            dataType: "json",
            cache:false,
            beforeSend: function () {
                
            },
            complete: function () {
                
            }, 
            error: function(xhr, status, error) {
                console.log(error);
            },
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    $('.content-filler').remove();
                    
                    var ctxLabel = $.map(data.labels, function(value, index){
                                        return [value];
                                    });
                    var ctxDataBatch = $.map(data.valuesBatch, function(value, index){
                                        return [value];
                                    });
                    var ctxData = $.map(data.values, function(value, index){
                        return [value];
                    });
                    var ctxColor = '#c04137';
                    var ctxColorBatch = '#fffbfb';
                
                    var ctx3 = document.getElementById('ltsmBatchWiseChart').getContext('2d');
                    new Chart(ctx3, {
                        type: 'bar',
                        data: {
                          labels: ctxLabel,
                          datasets: [{
                            data: ctxData,
                            backgroundColor: ctxColor
                          },
                          {
                            data: ctxDataBatch,
                            backgroundColor: ctxColorBatch
                          }]
                        },
                        options: {
                          maintainAspectRatio: false,
                          responsive: true,
                          legend: {
                            display: false,
                            labels: {
                              display: false
                            }
                          },
                          scales: {
                            yAxes: [{
                              stacked: true,
                              gridLines: {
                                color: '#e5e9f2'
                              },
                              ticks: {
                                beginAtZero:true,
                                fontSize: 9,
                                fontColor: '#182b49'
                              }
                            }],
                            xAxes: [{
                              stacked: true,
                              gridLines: {
                                display: false
                              },
                              barPercentage: 0.85,
                              ticks: {
                                beginAtZero:true,
                                fontSize: 8,
                                fontColor: '#182b49'
                              }
                            }]
                          }
                        }
                    });

                } else {

                    $('.content-filler').html(data.msg);

                }
            }
        });
      
    }
    
    
    $(document).on("click", '#btn-check-membership', function(e) {
        e.preventDefault();
        
        $('button#btn-check-membership').html('Processing. Please wait ...');
        $('button#btn-check-membership').addClass('disabled');
        
        var batch_no = parseInt($('#batch_no').val());
        var cadet_no = parseInt($('#cadet_no').val());
        
        if(batch_no > 0 && cadet_no > 0){

            $.ajax({
                url: ajax_root + "get-membership-status.php",
                method:"POST",
                data: { batch_no:batch_no, cadet_no:cadet_no },
                dataType: "json",
                cache:false,
                beforeSend: function () {
                    // $('button#btn-check-membership').html('Processing. Please wait ...');
                    // $('button#btn-check-membership').addClass('disabled');
                },
                complete: function () {
                    // $('button#btn-check-membership').html('CHECK STATUS');
                    // $('button#btn-check-membership').removeClass('disabled');
                }, 
                error: function(xhr, status, error) {
                    console.log(error);
                },
                success:function(data){ 
                
                    console.log(data);
                    if(data.status == 'success'){
                        
                        $('#membership-status-container').html(data.full_response);
                        
                        $('button#btn-check-membership').html('CHECK STATUS');
                        $('button#btn-check-membership').removeClass('disabled');
                        return;
    
                    } else {
    
                        $('button#btn-check-membership').html('CHECK STATUS');
                        $('button#btn-check-membership').removeClass('disabled');
                        alert(data.msg);
    
                    }
                }
            });

        } else {
            alert('Please enter your cadet no and batch no to proceed');
            $('button#btn-check-membership').html('CHECK STATUS');
            $('button#btn-check-membership').removeClass('disabled');
        }
        
    });
    
    
    $(document).on("click", '#proceed_reg', function(e) {
        e.preventDefault();

        $('button#proceed_reg').html('Processing. Please wait ...');
        $('button#proceed_reg').addClass('disabled');
        
        var batch_no = parseInt($('#batch_no').val());
        var cadet_no = parseInt($('#cadet_no').val());
        var event_id = parseInt($('#event_id').val());
        
        if(batch_no > 0 && cadet_no > 0 && event_id > 0){

            $.ajax({
                url: ajax_root + "../generate-registration-panel.php",
                method:"POST",
                data: { batch_no:batch_no, cadet_no:cadet_no },
                dataType: "json",
                cache:false,
                beforeSend: function () {
                    // $('button#proceed_reg').html('Processing. Please wait ...');
                    // $('button#proceed_reg').addClass('disabled');
                },
                complete: function () {
                    // $('button#proceed_reg').html('Proceed');
                    // $('button#proceed_reg').removeClass('disabled');
                }, 
                error: function(xhr, status, error) {
                    console.log(error);
                },
                success:function(data){ 
                
                    console.log(data);
                    if(data.status == 'success'){
                        
                        console.log("./registration/" + event_id + "/" + batch_no + "/" + cadet_no);
                        window.location.replace("../registration/" + event_id + "/" + batch_no + "/" + cadet_no);
                        return;
    
                    } else {
    
                        $('button#proceed_reg').html('Proceed');
                        $('button#proceed_reg').removeClass('disabled');
                        alert(data.msg);
    
                    }
                }
            });

        } else {
            alert('Please enter your cadet no and batch no to proceed');
            $('button#proceed_reg').html('Proceed');
            $('button#proceed_reg').removeClass('disabled');
        }

    });
    
    
    $('#table-pricelist').DataTable({
        responsive: false,
        pageLength: 150,
        paging:   false,
        ordering: false,
        info:     false,
        columns: [
          { orderable: true },
          { orderable: false },
          { orderable: false },
          { orderable: false }
        ]
    });


    $('.basic-table').DataTable({
        responsive: false,
        pageLength: 10,
        paging:   true,
        ordering: false,
        info:     false,
        stateSave: true,
        bLengthChange: false,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });


    $('.lazy').Lazy({
        // your configuration goes here
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        }
    });


    $('#members').DataTable({
        responsive: true,
        pageLength: 10,
        paging:   true,
        ordering: false,
        info:     false,
        stateSave: true,
        bLengthChange: false,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });


    var blood_group_table = $('#members-blood-group').DataTable({
        dom: 'lrtip',
        responsive: true,
        pageLength: 10,
        paging:   true,
        ordering: false,
        info:     false,
        stateSave: false,
        bLengthChange: false,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
     });


     $('.blood-group-buttons .group-btn').on('click', function(e){
        blood_group_table.column(3).search('^' + $(this).data('value') + '$', true, false).draw();
        $('.group-btn').removeClass('btn-theme').addClass('btn-white'); 
        $(this).removeClass('btn-white').addClass('btn-theme'); 
     });


    $('.table-all-items').DataTable({
        responsive: false,
        pageLength: 200,
        paging:   false,
        ordering: false,
        info:     false,
        columns: [
          { orderable: false }
        ]
    });

    
    
    $('#items-nav-tab .nav-link').on('click', function(e){
        e.preventDefault();

        $('#items-nav-tab .nav-link').removeClass('active');
        $('#items-nav-tabContent .tab-pane').removeClass('active');
        $('#items-nav-tabContent .tab-pane').removeClass('show');

        $(this).addClass('active');
        var target = $(this).data('bs-target');
        $(target).addClass('active');
        $(target).addClass('show');

    });

    $(document).on('change', '#place_order_assignanotherperson', function() {
        if(this.checked) {
            $('#assignanotherperson_content').removeClass('d-none');
        } else {
            $('#assignanotherperson_content').addClass('d-none');
        }
    });


    $(".pickup_datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 1,
        weekStart: 6,
        startDate: 1,
        daysOfWeekDisabled: "0,1,3,4",
        beforeShowDay: function(date) {
            return [date.getDay() == 6 || date.getDay() == 2 || date.getDay() == 5];
        },
        onSelect: function() {
            $('#place_order_delivery_date').val('');
        }
    });

    $(".delivery_datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 1,
        weekStart: 6,
        startDate: 1,
        daysOfWeekDisabled: "0,1,3,4",
        beforeShowDay: function(date) {
            return [date.getDay() == 6 || date.getDay() == 2 || date.getDay() == 5];
        },
        onSelect: function() {
            var end = $(this).val().split('-');
            var start = $('#place_order_pickup_date').val().split('-');
            console.log(end + '/' + start);
            var diff = new Date(new Date(end[2]+'-'+end[1]+'-'+end[0]) - new Date(start[2]+'-'+start[1]+'-'+start[0]));
            console.log(diff);
            var days = parseInt(diff/1000/60/60/24);
            if(days <= 2){
                $(this).val('');
                alert('Delivery date must be 3 days after pickup date.');
            }
        }
    });

    

    $(document).on("click", 'button#submit-login-phone-no', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-login.php",
            method:"POST",
            data: { login_country_code:$('#login_country_code').val(), login_phone_no:$('#login_phone_no').val(), action:"login-phone-no" },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-login-phone-no').html('Processing. Please wait ...');
                $('button#submit-login-phone-no').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-login-phone-no').html('Submit');
                // $('button#submit-login-phone-no').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    $('div#login-step-1').addClass('d-none');
                    if(data.already_registered == 'yes'){
                        $('#login_phone_no_login').val(data.login_phone_no_full);
                        $('div#login-step-2').removeClass('d-none');
                    } else {
                        $('#login_phone_no_otp').text(data.login_phone_no_full);
                        $('div#login-step-3').removeClass('d-none');
                    }
                    
                } else {

                    $('button#submit-login-phone-no').html('Submit');
                    $('button#submit-login-phone-no').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });


    $(document).on("click", 'button#submit-login-password', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-login.php",
            method:"POST",
            data: { login_password:$('#login_password').val(), action:"login-password" },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-login-password').html('Processing. Please wait ...');
                $('button#submit-login-password').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-login-password').html('Submit');
                // $('button#submit-login-password').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    //Will be redirected to requested page.
                    redirect_to(data.redirect_to);
                    
                } else {

                    $('button#submit-login-password').html('Submit');
                    $('button#submit-login-password').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });


    $(document).on("click", 'button#submit-login-otp', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-login.php",
            method:"POST",
            data: { login_otp:$('#login_otp').val(), action:"login-otp" },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-login-otp').html('Processing. Please wait ...');
                $('button#submit-login-otp').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-login-otp').html('Submit');
                // $('button#submit-login-otp').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    $('#login_phone_no_register').val(data.login_phone_no_full);
                    $('div#login-step-3').addClass('d-none');
                    $('div#login-step-4').removeClass('d-none');
                    
                } else {

                    $('button#submit-login-otp').html('Submit');
                    $('button#submit-login-otp').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });


    $(document).on("click", 'button#submit-login-register', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-login.php",
            method:"POST",
            data: { login_new_password:$('#login_new_password').val(), login_retype_password:$('#login_retype_password').val(), action:"login-register" },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-login-register').html('Processing. Please wait ...');
                $('button#submit-login-register').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-login-register').html('Submit');
                // $('button#submit-login-register').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    //Will be redirected to requested page.
                    redirect_to(data.redirect_to);
                    
                } else {

                    $('button#submit-login-register').html('Submit');
                    $('button#submit-login-register').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });


    $(document).on("click", 'a#clicked-forgot-password', function(e) {
    
        e.preventDefault();

        $('div#login-step-2').addClass('d-none');
        $('div#login-step-5').removeClass('d-none');
    
    });


    $(document).on("click", 'button#submit-forgot-password', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-login.php",
            method:"POST",
            data: { login_country_code_forgot_password:$('#login_country_code_forgot_password').val(), login_phone_no_forgot_password:$('#login_phone_no_forgot_password').val(), login_email_forgot_password:$('#login_email_forgot_password').val(), action:"login-forgot-password" },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-forgot-password').html('Processing. Please wait ...');
                $('button#submit-forgot-password').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-forgot-password').html('Submit');
                // $('button#submit-forgot-password').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    $('div#login-step-5').addClass('d-none');
                    $('#login_phone_no_otp').text(data.login_phone_no_full);
                    $('div#login-step-3').removeClass('d-none');
                
                } else {

                    $('button#submit-forgot-password').html('Submit');
                    $('button#submit-forgot-password').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });


    $(document).on("click", 'button#submit-change-password', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-change-password.php",
            method:"POST",
            data: { password:$('#account_new_password').val(), repassword:$('#account_retype_new_password').val() },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-change-password').html('Processing. Please wait ...');
                $('button#submit-change-password').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-change-password').html('Update Password');
                // $('button#submit-change-password').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    $('#c_msg').removeClass('d-none').html(data.msg);
                    $('#account_new_password').val('');
                    $('#account_retype_new_password').val('');
                    $('button#submit-change-password').html('Update Password');
                    $('button#submit-change-password').removeClass('disabled');
                    
                } else {

                    $('button#submit-change-password').html('Update Password');
                    $('button#submit-change-password').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });

    
    $(document).on("click", 'button#submit-update-profile', function(e) {
    
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-update-profile.php",
            method:"POST",
            data: { name:$('#account_user_name').val(), a_phone_no:$('#account_user_additional_phone_no').val(), email:$('#account_user_email').val(), area:$('#account_user_area').val(), address:$('#account_user_address').val() },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-update-profile').html('Processing. Please wait ...');
                $('button#submit-update-profile').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-update-profile').html('Update Info');
                // $('button#submit-update-profile').removeClass('disabled');
            }, 
            success:function(data){ 
            
                console.log(data);
                if(data.status == 'success'){
                    
                    $('#c_msg').removeClass('d-none').html(data.msg);
                    $('button#submit-update-profile').html('Update Info');
                    $('button#submit-update-profile').removeClass('disabled');
                    
                } else {

                    $('button#submit-update-profile').html('Update Info');
                    $('button#submit-update-profile').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });

    });

    
    $('.off-canvas-menu').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        $(target).addClass('show');
    });


    $('.off-canvas .close').on('click', function(e){
        e.preventDefault();
        $(this).closest('.off-canvas').removeClass('show');
    });

    // $(document).on('click touchstart', function(e){
        
    //     e.stopPropagation();
    //     //alert('Triggerred');
    //     // closing of sidebar menu when clicking outside of it
    //     if(!$(e.target).closest('.off-canvas-menu').length) {
    //         var offCanvas = $(e.target).closest('.off-canvas').length;
    //         if(!offCanvas) {
    //             $('.off-canvas.show').removeClass('show');
    //         }
    //     }
    // });


    $(document).on('click','button#submit-schedule-pickup', function(e){
        e.preventDefault();
        var form = jQuery('form#schedule-pickup-form');
        var formData = new FormData(form[0]);
        $.ajax({
            url: ajax_root + "submit-schedule-pickup.php",
            method:"POST",
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('button#submit-request-stock').html('Processing. Please wait ...');
                $('button#submit-request-stock').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-request-stock').html('Submit');
                // $('button#submit-request-stock').removeClass('disabled');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.msg == 'success'){
                
                    window.location.replace("<?php echo SITE_ROOT; ?>/schedule-pickup?success=" + data.value);
                    return;

                } else {

                    $('button#submit-request-stock').html('Submit');
                    $('button#submit-request-stock').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });
    });
    
    $(document).on('click','button#submit-contact-form', function(e){
        e.preventDefault();
        
        $('button#submit-contact-form').html('processing. Please wait ...');
        $('button#submit-contact-form').addClass('disabled');
        
        var form = jQuery('form#contact-form');
        var formData = new FormData(form[0]);
        $.ajax({
            url: ajax_root + "submit-contact-form.php",
            method:"POST",
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                //$('button#submit-contact-form').html('processing. Please wait ...');
                //$('button#submit-contact-form').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-contact-form').html('Submit');
                // $('button#submit-contact-form').removeClass('disabled');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.msg == 'success'){
                
                    window.location.replace("./contact-us?success=" + data.value);
                    return;

                } else {

                    $('button#submit-contact-form').html('Submit');
                    $('button#submit-contact-form').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });
    });
    
    
    $(document).on('click','button#submit-agent-form', function(e){
        e.preventDefault();
        var form = jQuery('form#agent-form');
        var formData = new FormData(form[0]);
        $.ajax({
            url: ajax_root + "submit-agent-form.php",
            method:"POST",
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('button#submit-contact-form').html('processing. Please wait ...');
                $('button#submit-contact-form').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-contact-form').html('Submit');
                // $('button#submit-contact-form').removeClass('disabled');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.msg == 'success'){
                
                    window.location.replace("<?php echo SITE_ROOT; ?>/agent-application?success=" + data.value);
                    return;

                } else {

                    $('button#submit-agent-form').html('Submit');
                    $('button#submit-agent-form').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });
    });


    $(document).on('click','button#submit-place-order', function(e){
        
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-place-order.php",
            method:"POST",
            data:{ name:$('#place_order_name').val(), phone_no:$('#place_order_phone_no').val(), is_pickup_person:(($('input[type=checkbox]#place_order_assignanotherperson').is(':checked'))?'Yes':'No'), pickup_person_name:$('#place_order_pickup_person_name').val(), pickup_person_phone_no:$('#place_order_pickup_person_phone_no').val(), pickup_date:$('#place_order_pickup_date').val(), pickup_time:$('#place_order_pickup_time').val(), delivery_date:$('#place_order_delivery_date').val(), delivery_time:$('#place_order_delivery_time').val(), pickup_area:$('#place_order_pickup_area').val(), pickup_address:$('#place_order_pickup_address').val(), message:$('#place_order_message').val(), is_terms_agreed:(($('input[type=checkbox]#place_order_agree_terms').is(':checked'))?'Yes':'No') },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-place-order').html('Processing. Please wait ...');
                $('button#submit-place-order').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-place-order').html('PLACE ORDER');
                // $('button#submit-place-order').removeClass('disabled');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.status == 'success'){
                
                    //Will be redirected to requested page.
                    redirect_to(data.redirect_to);

                } else {

                    $('button#submit-place-order').html('PLACE ORDER');
                    $('button#submit-place-order').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });
    });


    $(document).on('click','#account-packages-upcoming button.pay_button', function(e){
        
        e.preventDefault();
        $('#offScheduledGeneralPayNow').addClass('show');
        
    });



    $(document).on('click','button#submit-subscribe-now', function(e){
        
        e.preventDefault();
        $.ajax({
            url: ajax_root + "submit-subscribe-now.php",
            method:"POST",
            data:{ package_id:$('#package_id').val(), name:$('#place_order_name').val(), phone_no:$('#place_order_phone_no').val(), pickup_date:$('#place_order_pickup_date').val(), pickup_time:$('#place_order_pickup_time').val(), pickup_area:$('#place_order_pickup_area').val(), pickup_address:$('#place_order_pickup_address').val(), message:$('#place_order_message').val(), is_terms_agreed:(($('input[type=checkbox]#place_order_agree_terms').is(':checked'))?'Yes':'No') },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('button#submit-subscribe-now').html('Processing. Please wait ...');
                $('button#submit-subscribe-now').addClass('disabled');
            },
            complete: function () {
                // $('button#submit-subscribe-now').html('PLACE ORDER');
                // $('button#submit-subscribe-now').removeClass('disabled');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.status == 'success'){
                
                    //Will be redirected to requested page.
                    redirect_to(data.redirect_to);

                } else {

                    $('button#submit-subscribe-now').html('PLACE ORDER');
                    $('button#submit-subscribe-now').removeClass('disabled');
                    alert(data.msg);

                }
            }
        });
    });



    $(document).on('click','#account-orders-upcoming button.detail_button', function(e){
        
        e.preventDefault();
        var row_id = $(this).data('row-id');
        //alert(row_id);
        $('#offScheduledPickupDetails').addClass('show');
        
        $.ajax({
            url: ajax_root + "get-orders-upcoming-details.php",
            method:"POST",
            data:{ row_id:row_id },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                //$('#scheduled_pickup_code').html('<span class="tx-10">Processing ...</span>');
                //$('#scheduled_pickup_details').html('<div class="w-100 pd-t-100 text-center tx-10">Processing ...</div>');
            },
            complete: function () {
                // $('#scheduled_pickup_code').html('<span class="tx-10">Processing ...</span>');
                // $('#scheduled_pickup_details').html('<div class="w-100 pd-t-100 text-center tx-10">Processing ...</div>');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.status == 'success'){
                
                    //Will be redirected to requested page.
                    $('#scheduled_pickup_code').html(data.code);
                    $('#scheduled_pickup_details').html(data.details);

                } else {

                    $('#scheduled_pickup_code').html('<span class="tx-10">!!!</span>');
                    $('#scheduled_pickup_details').html('<div class="w-100 pd-t-100 text-center tx-10">'+ data.msg +'</div>');
                    alert(data.msg);

                }
            }
        });
    });
    
    
    
    $(document).on('click','#account-orders a.customer-order-clothes-details-button', function(e){
        
        e.preventDefault();
        var row_id = $(this).data('row-id');
        //alert(row_id);
        $('#offOrderClothesDetails').addClass('show');
        
        $.ajax({
            url: ajax_root + "get-order-clothes-details.php",
            method:"POST",
            data:{ row_id:row_id },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('#order_clothes_code').html('<span class="tx-10">Processing ...</span>');
                $('#order_clothes_details').html('<div class="w-100 pd-t-100 text-center tx-10">Processing ...</div>');
            },
            complete: function () {
                // $('#order_clothes_code').html('<span class="tx-10">Processing ...</span>');
                // $('#order_clothes_code').html('<div class="w-100 pd-t-100 text-center tx-10">Processing ...</div>');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.status == 'success'){
                
                    //Will be redirected to requested page.
                    $('#order_clothes_code').html(data.code);
                    $('#order_clothes_details').html(data.details);

                } else {

                    $('#order_clothes_code').html('<span class="tx-10">!!!</span>');
                    $('#order_clothes_details').html('<div class="w-100 pd-t-100 text-center tx-10">'+ data.msg +'</div>');
                    alert(data.msg);

                }
            }
        });
    });


    $(document).on('click','#account-orders a.customer-order-pay-button', function(e){
        
        e.preventDefault();
        var row_id = $(this).data('row-id');
        //alert(row_id);
        $('#offThisOrderPaymentDetails').addClass('show');
        
        $.ajax({
            url: ajax_root + "get-order-clothes-details.php",
            method:"POST",
            data:{ row_id:row_id },
            dataType: "json",
            cache:false,
            beforeSend: function () {
                $('#this_order_payment_code').html('<span class="tx-10">Processing ...</span>');
                //$('#this_order_payment_details').html('<div class="w-100 pd-t-100 text-center tx-10">Processing ...</div>');
            },
            complete: function () {
                // $('#this_order_payment_code').html('<span class="tx-10">Processing ...</span>');
                // $('#this_order_payment_details').html('<div class="w-100 pd-t-100 text-center tx-10">Processing ...</div>');
            }, 
            success:function(data){ 
                
                console.log(data);
                if(data.status == 'success'){
                
                    //Will be redirected to requested page.
                    $('#this_order_payment_code').html(data.code);
                    //$('#this_order_payment_details').html(data.details);

                } else {

                    $('#this_order_payment_code').html('<span class="tx-10">!!!</span>');
                    $('#this_order_payment_details').html('<div class="w-100 pd-t-100 text-center tx-10">Something is wrong</div>');
                    alert(data.msg);

                }
            }
        });
    });


    $(document).on('click','button#track-order', function(e){
        
        e.preventDefault();
        var order_code = $('#order-code').val().trim();
        if(order_code != ''){
            
            window.location.replace(ajax_root + "track-order?order-code=" + order_code);
            return;
            
        } else {
            
            alert('Please enter your order no'); 
            
        }
        
    });


    $(document).on('click','button.increase-count', function(e){
        
        e.preventDefault();
        var attendee_id = $(this).data('attendee-id');
        
        var current_value = parseInt($('#attendee-count-' + attendee_id).text());
        var new_value = current_value;
        var new_value = new_value + 1;
        
        var unit_charge = parseInt($('#attendee-unit-charge-' + attendee_id).text());
        var total_charge = unit_charge * new_value;
        
        $('#attendee-count-' + attendee_id).html(new_value);
        $('#attendee-total-charge-' + attendee_id).html(total_charge);

        calculate_checkout_sum();
        
    });

    $(document).on('click','button.decrease-count', function(e){
        
        e.preventDefault();
        var attendee_id = $(this).data('attendee-id');
        
        var current_value = parseInt($('#attendee-count-' + attendee_id).text());
        var new_value = current_value;
        if(current_value > 0){ var new_value = new_value - 1; }
        
        var unit_charge = parseInt($('#attendee-unit-charge-' + attendee_id).text());
        var total_charge = unit_charge * new_value;
        
        $('#attendee-count-' + attendee_id).html(new_value);
        $('#attendee-total-charge-' + attendee_id).html(total_charge);

        calculate_checkout_sum();
        
    });

    $(document).on('click','input[type="radio"][name="membership_type"]', function(e){
        //var radioValue = $("input[name='memnership_type']:checked").val();
        calculate_checkout_sum();
    });

    $(document).on('click','input[type="radio"][name="contribution_type"]', function(e){
        //var radioValue = $("input[name='contribution_type']:checked").val();
        calculate_checkout_sum();
    });


    function calculate_checkout_sum(){
        var total_count = 0;
        var transport_count = 0;
        $('.attendee-count').each(function(i, obj) {
            if($(this).hasClass('transport')){
                transport_count = transport_count + parseInt($(this).text());
            } else {
                total_count = total_count + parseInt($(this).text());
            }
        });
        $('#attendee-count-total').html(total_count);
        $('#transport-count-total').html(transport_count);

        var total_charge = 0;
        $('.attendee-total').each(function(i, obj) {
            total_charge = total_charge + parseInt($(this).text());
        });

        var subscriptionvalue = 0;
        var subscriptionID = $("input[name='membership_type']:checked").val();
        var subscriptionCode = $("input[name='membership_type']:checked").data('type');
        var subscriptionvalue = parseInt($("#" + subscriptionID).text())?parseInt($("#" + subscriptionID).text()):0;

        var contributionvalue = 0;
        var contributionID = $("input[name='contribution_type']:checked").val();
        var contributionvalue = parseInt($("#" + contributionID).text())?parseInt($("#" + contributionID).text()):0;

        console.log(total_charge);
        console.log(subscriptionvalue);
        console.log(contributionvalue);

        if(subscriptionvalue > 0){
            $('#is_subscription').val(subscriptionCode);
        } else {
            $('#is_subscription').val('0');
        }

        if(contributionvalue > 0){
            $('#is_donation').val('1');
        } else {
            $('#is_donation').val('0');
        }

        total_charge = total_charge + subscriptionvalue + contributionvalue;
        $('#attendee-charge-total').html(total_charge);
        $('#total_amount').val(total_charge);

        
    }


    $(document).on('click','button#complete-registration', function(e){
        
        e.preventDefault();

        $('button#complete-registration').html('Processing ...');
        $('button#complete-registration').attr('disabled','disabled');

        var name = $('#your_name').val(); 
        var phone_only = $('#your_phone_no').val(); 
        var phone = $('#country_code').val() + "" + phone_only; 
        var email = $('#your_email_address').val(); 
        var total_amount = parseInt($('#total_amount').val()); 
        var total_attandee = parseInt($('#attendee-count-total').text());
        var total_transport = parseInt($('#transport-count-total').text());
        var cadet_no = parseInt($('#cadet_no').val()); 
        var batch_no = parseInt($('#batch_no').val()); 
        var is_event = parseInt($('#is_event').val()); 
        var is_subscription = parseInt($('#is_subscription').val()); 
        var is_donation = parseInt($('#is_donation').val()); 
        var is_life_member = parseInt($('#is_life_member').val()); 
        var value_a = $('#value_a').val(); 
        var value_b = $('#value_b').val(); 
        var value_c = $('#value_c').val(); 
        var value_d = $('#value_d').val();
        var checked_contribution_type = $("input[name='contribution_type']:checked");
        var checked_membership_type = $("input[name='membership_type']:checked");
        var is_transport_available = parseInt($('#is_transport_available').val()); 

        if(name != '' && phone_only != '' && email != '' && total_amount >= 0 && 
            cadet_no > 0 && batch_no > 0 && is_event > 0 && total_attandee > 0){

                var full_config = {};
                
                var contribution = {};
                var subscription = {};
                if(is_life_member){
                    contribution['type'] = checked_contribution_type.data('type');
                    contribution['value'] = checked_contribution_type.data('value');
                } else {
                    subscription['type'] = checked_membership_type.data('type');
                    subscription['value'] = checked_membership_type.data('value');
                }
                full_config['contribution'] = contribution;
                full_config['subscription'] = subscription;

                var attandee_person = {};
                $('.attandee-person').each(function(ex){
                    var aid = $(this).data('id');
                    var this_attandee = {};
                    this_attandee['id'] = aid;
                    this_attandee['name'] = $('#attandee-name-' + aid).text();
                    this_attandee['charge'] = $('#attendee-unit-charge-' + aid).text();
                    this_attandee['count'] = $('#attendee-count-' + aid).text();
                    this_attandee['total'] = $('#attendee-total-charge-' + aid).text();
                    attandee_person[aid] = this_attandee;
                });
                full_config['attandee_person'] = attandee_person;

                var attandee_transport = {};
                if(is_transport_available){
                    $('.attandee-transport').each(function(ex){
                        var aid = $(this).data('id');
                        var this_attandee = {};
                        this_attandee['id'] = aid;
                        this_attandee['name'] = $('#attandee-name-' + aid).text();
                        this_attandee['charge'] = $('#attendee-unit-charge-' + aid).text();
                        this_attandee['count'] = $('#attendee-count-' + aid).text();
                        this_attandee['total'] = $('#attendee-total-charge-' + aid).text();
                        attandee_transport[aid] = this_attandee;
                    });
                }
                full_config['attandee_transport'] = attandee_transport;
                //console.log(full_config);

                if(confirm('Are you sure?')){
                
                    $.ajax({
                        url: ajax_root + "../../process-registration.php",
                        method: "POST",
                        data: { batch_no:batch_no, cadet_no:cadet_no, name:name, phone:phone, email:email, total_amount:total_amount, is_event:is_event, is_subscription:is_subscription, is_donation:is_donation, value_a:value_a, value_b:value_b, value_c:value_c, value_d:value_d, config:full_config },
                        dataType: "json",
                        cache:false,
                        beforeSend: function () {
                            // $('button#complete-registration').html('Processing. Please wait ...');
                            // $('button#complete-registration').removeAttr('disabled');
                        },
                        complete: function () {
                            // $('button#complete-registration').html('Complete Registration');
                            // $('button#complete-registration').removeAttr('disabled');
                        }, 
                        error: function(xhr, status, error) {
                            console.log(error);
                            $('button#complete-registration').html('Complete Registration');
                            $('button#complete-registration').removeAttr('disabled');
                            alert('Something went wrong. Please refresh and try again.');
                        },
                        success:function(data){ 
                        
                            console.log(data);
                            if(data.status == 'success'){
                                
                                window.location.replace(data.redirect_to);
                                return;
            
                            } else {
            
                                $('button#complete-registration').html('Complete Registration');
                                $('button#complete-registration').removeAttr('disabled');
                                alert(data.msg);
            
                            }
                        }
                    });

                } else {
                    $('button#complete-registration').html('Complete Registration');
                    $('button#complete-registration').removeAttr('disabled');
                    alert(data.msg);
                }

        } else {

            $('button#complete-registration').html('Complete Registration');
            $('button#complete-registration').removeAttr('disabled');
            alert('All * marked fields are mandatory');

        }
        
    });



    // Gets the video src from the data-src on each button
    var $videoSrc;
    $(".start-process-video").click(function() {
      $videoSrc = $(this).attr("data-src");
      console.log("button clicked" + $videoSrc);
    });

    // when the modal is opened autoplay it
    $("#myModalVideoProcess").on("shown.bs.modal", function(e) {
      console.log("modal opened" + $videoSrc);
      // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
      $("#processVideo").attr(
        "src",
        $videoSrc + "?autoplay=1&showinfo=0&modestbranding=1&rel=0&mute=1"
      );
    });

    // stop playing the youtube video when I close the modal
    $("#myModalVideoProcess").on("hide.bs.modal", function(e) {
      // a poor man's stop video
      $("#processVideo").attr("src", $videoSrc);
    });

    $('[data-toggle="tooltip"]').tooltip();


    if(localStorage.getItem('monthlyPackageOfferPromo') != 'shown'){
        $('#monthly-package-modal').modal({
          keyboard: false
        });
        //$j('#card-on-delivery-modal').delay(2000).fadeIn();
        localStorage.setItem('monthlyPackageOfferPromo','shown');
    }

    $('#monthly-package-modal').on('hidden.bs.modal', function (e) {
        localStorage.setItem('monthlyPackageOfferPromo','shown');
    });


    $('.fbsharelink').click( function(){
        var shareurl = $(this).data('shareurl');
        window.open('https://www.facebook.com/sharer/sharer.php?u='+escape(shareurl)+'&t='+document.title, '', 
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    });
    
    
    // $('.logo-carousel').slick({
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 4000,
    //     arrows: true,
    //     dots: false,
    //     pauseOnHover: false,
    //     responsive: [{
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 2
    //       }
    //     }, {
    //       breakpoint: 520,
    //       settings: {
    //         slidesToShow: 2
    //       }
    //     }]
    // });
    
    
    $('.banner-slider').slick({

      // Enables tabbing and arrow key navigation
      accessibility: true,
    
      // Adapts slider height to the current slide
      adaptiveHeight: false,
    
      // Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
      //appendArrows: $(element),
    
      // Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
      //appendDots: $(element),
    
      // Enable Next/Prev arrows
      arrows: false,
    
      // Sets the slider to be the navigation of other slider (Class or ID Name)
      asNavFor: null,
    
      // prev arrow
      prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
    
      // next arrow
      nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
    
      // Enables auto play of slides
      autoplay: true,
    
      // Auto play change interval
      autoplaySpeed: 4000,
    
      // Enables centered view with partial prev/next slides. 
      // Use with odd numbered slidesToShow counts.
      centerMode: false,
    
      // Side padding when in center mode. (px or %)
      centerPadding: '50px',
    
      // CSS3 easing
      cssEase: 'ease',
    
      // Custom paging templates. 
      customPaging: function(slider, i) {
        return '<button type="button" data-role="none">' + (i + 1) + '</button>';
      },
    
      // Current slide indicator dots
      dots: true,
    
      // Class for slide indicator dots container
      dotsClass: 'slick-dots',
    
      // Enables desktop dragging
      draggable: true,
    
      // animate() fallback easing
      easing: 'linear',
    
      // Resistance when swiping edges of non-infinite carousels
      edgeFriction: 0.35,
    
      // Enables fade
      fade: true,
    
      // Focus on select and/or change
      focusOnSelect: false,
      focusOnChange: false,
    
      // Infinite looping
      infinite: true,
    
      // Initial slide
      initialSlide: 0,
    
      // Accepts 'ondemand' or 'progressive' for lazy load technique
      lazyLoad: 'progressive',
    
      // Mobile first
      mobileFirst: false,
    
      // Pauses autoplay on hover
      pauseOnHover: true,
    
      // Pauses autoplay on focus
      pauseOnFocus: true,
    
      // Pauses autoplay when a dot is hovered
      pauseOnDotsHover: false,
    
      // Target containet to respond to
      respondTo: 'window',
    
      // Breakpoint triggered settings
      /* eg
      responsive: [{
    
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true
        }
    
      }, {
    
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true
        }
    
      }, {
    
        breakpoint: 300,
        settings: "unslick" // destroys slick
    
      }]
      */
      responsive: null,
    
      // Setting this to more than 1 initializes <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> mode. 
      // Use slidesPerRow to set how many slides should be in each row.
      rows: 1,
    
      // Change the slider's direction to become right-to-left
      rtl: false,
    
      // Slide element query
      slide: '',
    
      // # of slides to show at a time
      slidesToShow: 1,
    
      // With grid mode intialized via the rows option, this sets how many slides are in each grid row.
      slidesPerRow: 1,
    
      // # of slides to scroll at a time
      slidesTo: 1,
    
      // Transition speed
      speed: 500,
    
      // Enables touch swipe
      swipe: true,
    
      // Swipe to slide irrespective of slidesToScroll
      swipeToSlide: false,
    
      // Enables slide moving with touch
      touchMove: true,
    
      // To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider.
      touchThreshold: 5,
    
      // Enable/Disable CSS Transitions
      useCSS: true,
    
      // Enable/Disable CSS Transforms
      useTransform: true,
    
      // Disables automatic slide width calculation
      variableWidth: false,
    
      // Vertical slide direction
      vertical: false,
    
      // hanges swipe direction to vertical
      verticalSwiping: false,
    
      // Ignores requests to advance the slide while animating
      waitForAnimate: true,
    
      // Set the zIndex values for slides, useful for IE9 and lower
      zIndex: 1000
    
    });
    
    $('.discount-product-slider').slick({

      // Enables tabbing and arrow key navigation
      accessibility: true,
    
      // Adapts slider height to the current slide
      adaptiveHeight: false,
    
      // Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
      //appendArrows: $(element),
    
      // Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
      //appendDots: $(element),
    
      // Enable Next/Prev arrows
      arrows: false,
    
      // Sets the slider to be the navigation of other slider (Class or ID Name)
      asNavFor: null,
    
      // prev arrow
      prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
    
      // next arrow
      nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
    
      // Enables auto play of slides
      autoplay: true,
    
      // Auto play change interval
      autoplaySpeed: 2500,
    
      // Enables centered view with partial prev/next slides. 
      // Use with odd numbered slidesToShow counts.
      centerMode: false,
    
      // Side padding when in center mode. (px or %)
      centerPadding: '50px',
    
      // CSS3 easing
      cssEase: 'ease',
    
      // Custom paging templates. 
      customPaging: function(slider, i) {
        return '<button type="button" data-role="none">' + (i + 1) + '</button>';
      },
    
      // Current slide indicator dots
      dots: false,
    
      // Class for slide indicator dots container
      dotsClass: 'slick-dots',
    
      // Enables desktop dragging
      draggable: true,
    
      // animate() fallback easing
      easing: 'linear',
    
      // Resistance when swiping edges of non-infinite carousels
      edgeFriction: 0.35,
    
      // Enables fade
      fade: false,
    
      // Focus on select and/or change
      focusOnSelect: false,
      focusOnChange: false,
    
      // Infinite looping
      infinite: true,
    
      // Initial slide
      initialSlide: 0,
    
      // Accepts 'ondemand' or 'progressive' for lazy load technique
      lazyLoad: 'progressive',
    
      // Mobile first
      mobileFirst: false,
    
      // Pauses autoplay on hover
      pauseOnHover: true,
    
      // Pauses autoplay on focus
      pauseOnFocus: true,
    
      // Pauses autoplay when a dot is hovered
      pauseOnDotsHover: false,
    
      // Target containet to respond to
      respondTo: 'window',
    
      // Breakpoint triggered settings
      responsive: [{
    
        breakpoint: 990,
        settings: {
          slidesToShow: 4
        }
    
      }, {
    
        breakpoint: 700,
        settings: {
          slidesToShow: 3
        }
    
      }, {
    
        breakpoint: 500,
        settings: {
          slidesToShow: 2
        }
        
      }],
      
      //responsive: null,
    
      // Setting this to more than 1 initializes <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> mode. 
      // Use slidesPerRow to set how many slides should be in each row.
      rows: 1,
    
      // Change the slider's direction to become right-to-left
      rtl: false,
    
      // Slide element query
      slide: '',
    
      // # of slides to show at a time
      slidesToShow: 5,

      // # of slides to scroll at a time
      slidesToScroll: 1,
    
      // With grid mode intialized via the rows option, this sets how many slides are in each grid row.
      slidesPerRow: 1,
    
      // # of slides to scroll at a time
      slidesTo: 1,
    
      // Transition speed
      speed: 500,
    
      // Enables touch swipe
      swipe: true,
    
      // Swipe to slide irrespective of slidesToScroll
      swipeToSlide: false,
    
      // Enables slide moving with touch
      touchMove: true,
    
      // To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider.
      touchThreshold: 5,
    
      // Enable/Disable CSS Transitions
      useCSS: true,
    
      // Enable/Disable CSS Transforms
      useTransform: true,
    
      // Disables automatic slide width calculation
      variableWidth: false,
    
      // Vertical slide direction
      vertical: false,
    
      // hanges swipe direction to vertical
      verticalSwiping: false,
    
      // Ignores requests to advance the slide while animating
      waitForAnimate: true,
    
      // Set the zIndex values for slides, useful for IE9 and lower
      zIndex: 1000
    
    });
    
    $('.beauty-health-product-slider').slick({

      // Enables tabbing and arrow key navigation
      accessibility: true,
    
      // Adapts slider height to the current slide
      adaptiveHeight: false,
    
      // Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
      //appendArrows: $(element),
    
      // Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
      //appendDots: $(element),
    
      // Enable Next/Prev arrows
      arrows: false,
    
      // Sets the slider to be the navigation of other slider (Class or ID Name)
      asNavFor: null,
    
      // prev arrow
      prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
    
      // next arrow
      nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
    
      // Enables auto play of slides
      autoplay: true,
    
      // Auto play change interval
      autoplaySpeed: 3500,
    
      // Enables centered view with partial prev/next slides. 
      // Use with odd numbered slidesToShow counts.
      centerMode: false,
    
      // Side padding when in center mode. (px or %)
      centerPadding: '50px',
    
      // CSS3 easing
      cssEase: 'ease',
    
      // Custom paging templates. 
      customPaging: function(slider, i) {
        return '<button type="button" data-role="none">' + (i + 1) + '</button>';
      },
    
      // Current slide indicator dots
      dots: false,
    
      // Class for slide indicator dots container
      dotsClass: 'slick-dots',
    
      // Enables desktop dragging
      draggable: true,
    
      // animate() fallback easing
      easing: 'linear',
    
      // Resistance when swiping edges of non-infinite carousels
      edgeFriction: 0.35,
    
      // Enables fade
      fade: false,
    
      // Focus on select and/or change
      focusOnSelect: false,
      focusOnChange: false,
    
      // Infinite looping
      infinite: true,
    
      // Initial slide
      initialSlide: 0,
    
      // Accepts 'ondemand' or 'progressive' for lazy load technique
      lazyLoad: 'progressive',
    
      // Mobile first
      mobileFirst: false,
    
      // Pauses autoplay on hover
      pauseOnHover: true,
    
      // Pauses autoplay on focus
      pauseOnFocus: true,
    
      // Pauses autoplay when a dot is hovered
      pauseOnDotsHover: false,
    
      // Target containet to respond to
      respondTo: 'window',
    
      // Breakpoint triggered settings
      responsive: [{
    
        breakpoint: 990,
        settings: {
          slidesToShow: 4
        }
    
      }, {
    
        breakpoint: 700,
        settings: {
          slidesToShow: 3
        }
    
      }, {
    
        breakpoint: 500,
        settings: {
          slidesToShow: 2
        }
        
      }],
      
      //responsive: null,
    
      // Setting this to more than 1 initializes <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> mode. 
      // Use slidesPerRow to set how many slides should be in each row.
      rows: 1,
    
      // Change the slider's direction to become right-to-left
      rtl: false,
    
      // Slide element query
      slide: '',
    
      // # of slides to show at a time
      slidesToShow: 4,

      // # of slides to scroll at a time
      slidesToScroll: 1,
    
      // With grid mode intialized via the rows option, this sets how many slides are in each grid row.
      slidesPerRow: 1,
    
      // # of slides to scroll at a time
      slidesTo: 1,
    
      // Transition speed
      speed: 500,
    
      // Enables touch swipe
      swipe: true,
    
      // Swipe to slide irrespective of slidesToScroll
      swipeToSlide: false,
    
      // Enables slide moving with touch
      touchMove: true,
    
      // To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider.
      touchThreshold: 5,
    
      // Enable/Disable CSS Transitions
      useCSS: true,
    
      // Enable/Disable CSS Transforms
      useTransform: true,
    
      // Disables automatic slide width calculation
      variableWidth: false,
    
      // Vertical slide direction
      vertical: false,
    
      // hanges swipe direction to vertical
      verticalSwiping: false,
    
      // Ignores requests to advance the slide while animating
      waitForAnimate: true,
    
      // Set the zIndex values for slides, useful for IE9 and lower
      zIndex: 1000
    
    });

    $(document).on('input','textarea.auto-grow', function(e){
    //$("textarea.auto-grow").on('input', function() {
        var scroll_height = $("textarea.auto-grow").get(0).scrollHeight - 10;
        $("textarea.auto-grow").css('height', scroll_height + 'px');
    });
        
    $('.slider div img').removeClass('d-none');

  });


//   $('div.content-body').scroll(function() {
//         var y = $('div.content-body').scrollTop();
//         if(y > 200){
//             $('.package-buttons').show();
//         } else {
//             $('.package-buttons').hide();
//         }
//   });
  
  
  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }


  function redirect_to(url){
    $(location).attr("href", url);
    return;
  }