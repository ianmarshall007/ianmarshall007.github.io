jQuery( document ).ready( function ( $ ) {

    "use strict";

    // Config
    //-------------------------------------------------------------------------------
    var companyName = 'Spa and Wellness Center';
    var address = '3861 Sepulveda Blvd., Culver City, CA 90230'; // Enter your Address
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
        $.support.transition = false;
    }


    function loadImage( src, f ) {
        var img = new Image();

        $( img ).load( function () {
            $( this ).hide();
            if ( f )
                f( img );
        } ).error( function () {
            return false;
        } ).attr( 'src', src );
    }

    //-------------------------------------------------------------
    // Fixes inrto height
    //-------------------------------------------------------------

    var windowWidth = $( window ).width();

    function fixIntroHeight( H ) {
        var intro = $( '.intro-full-screen' );
        var onepage = $( '.onepage-home' );
        if ( intro.find( '.carousel' ).length > 0 ) {
            intro.addClass( 'intro-slider-top-fix' );
        }
        if ( onepage.find( '.rev_slider' ).length > 0 ) {
            intro.addClass( 'rev-slider-fix' );
            $( '.scroll-down' ).hide();
            onepage.removeClass( 'intro-full-screen' );
            onepage.css( 'margin', 0 );
        } else {
            intro.css( { height: H } );
        }

        //If you dont want to use Auto height change H to '650px'

        $( '.intro-full-screen' ).find( '.carousel' ).css( { height: H } );
    }
    if ( windowWidth > 1000 ) {
        var H = $( window ).height();

        fixIntroHeight( H );

        $( window ).resize( function () {
            H = $( window ).height();
            fixIntroHeight( H );
        } );

    }
    // Fixing full width divider
    //-------------------------------------------------------------
    $( '.fw-divider-full-width' ).closest( 'section' ).addClass( 'divider-section' );


    // Fixing call-to-action
    //-------------------------------------------------------------
    $( '.fw-call-to-action' ).closest( 'section' ).addClass( 'call-to-action' );

    // Fixing review
    //-------------------------------------------------------------
    $( '.review-slider' ).parents( 'section.no-spacing' ).find( '.fw-container-fluid' ).addClass( 'no-padding' );


    // Modal Scrolling Fixes on iOS
    //-------------------------------------------------------------	
    if ( navigator.userAgent.match( /iPhone|iPad|iPod/i ) ) {
        var styleEl = document.createElement( 'style' ), styleSheet;
        document.head.appendChild( styleEl );
        styleSheet = styleEl.sheet;
        styleSheet.insertRule( ".modal, body .booked-modal { position:absolute; bottom:auto; background-color:transparent;}", 0 );

    }

    // Preloader
    //-------------------------------------------------------------------------------

    $( window ).load( function () {
        setTimeout( function () {
            $( '#page-preloader' ).addClass( 'slideOutUp' );

            // Fix for IE 9
            setTimeout( function () {
                $( '#page-preloader' ).addClass( 'hidden' );
            }, 700 );

        }, 100 );

    } );

    // Disable Preloader
    //-------------------------------------------------------------------------------

    $( '#disable-preloader' ).on( 'click', function () {
        $( '#page-preloader' ).addClass( 'slideOutUp' );
    } );

    // pagination fixing
    //-------------------------------------------------------------
    $( '.pagination li' ).find( '.current' ).parent().addClass( 'active' );
    $( '#menu-testing-menu' ).find( '.active' ).removeClass( 'active' );


    // Initialize Tooltip
    //-------------------------------------------------------------
    $( '.my-tooltip' ).tooltip();


    // Fixing header logo padding
    //-------------------------------------------------------------
    loadImage( $( '.nav-logo img' ).attr( 'src' ), function ( image ) {
        if ( image.naturalHeight < 54 ) {
            var paddingTop = ( 54 - image.naturalHeight ) / 2;
            $( '.nav-logo' ).css( { 'padding-top': paddingTop } );
        }
    } );


    // Initialize Datetimepicker
    //-------------------------------------------------------------------------------
    $( '.datepicker' ).datepicker().on( 'changeDate', function () {
        $( this ).datepicker( 'hide' );
    } );


    // Show Appointment Modal
    //-------------------------------------------------------------------------------
    $( '.show-appointment-modal' ).on( 'click', function () {
        var service = $( this ).data( 'service' );
        if ( service ) {
            $( "#appointment-service" ).val( service );
        }
        $( '#appointmentModal' ).modal( 'show' );
        return false;
    } );


    // Scroll To Animation
    //-------------------------------------------------------------------------------
    $( 'body' ).scrollspy( { target: '#navigation-top', offset: 88 } );

    $( '#navigation-top' ).find( 'a[href*="#"]:not([href="#"])' ).click( function () {
        if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
            var target = $( this.hash );
            target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
            if ( target.length ) {
                $( 'html,body' ).animate( {
                    scrollTop: ( target.offset().top - 80 )
                }, 1000 );
                if ( $( '.navbar-toggle' ).css( 'display' ) != 'none' ) {
                    $( this ).parents( '.container' ).find( ".navbar-toggle" ).trigger( "click" );
                }
                return false;
            }
        }
    } );

    var scrollTo = $( ".scroll-to" );

    scrollTo.click( function ( event ) {
        $( '.modal' ).modal( 'hide' );
        var position = $( document ).scrollTop();
        var scrollOffset = 87;

        var marker = $( this ).attr( 'href' );
        $( 'html, body' ).animate( { scrollTop: $( marker ).offset().top - scrollOffset }, 1000 );
        return false;
    } );



// Mega Menu
    //-------------------------------------------------------------
    function megaMenuXs() {
        var winW = jQuery( window ).width();
        jQuery( '.mega-menu-activated .mega-menu' ).each( function ( a, b ) {
            var o = jQuery( this ).offset(),
                r = jQuery( this ).css( 'right' );

            if ( o.left < 0 ) {
                r = parseInt( r ) + o.left - 15;
                jQuery( this ).css( { right: r } );
            }
        } );

        if ( winW < 992 ) {

            jQuery( '.mega-menu-activated .navbar-nav>.menu-item-has-children>a' ).click( function ( e ) {
                jQuery( this ).parent().find( '.sub-menu, .mega-menu' ).toggleClass( 'open' );
                return false;
            } );

            jQuery( 'body:not(.mega-menu-activated .navbar-nav a)' ).click( function ( e ) {
                jQuery( '.mega-menu-activated .navbar-nav .open' ).removeClass( 'open' );
            } );

        }
    }

    var resizeId;
    jQuery( window ).resize( function () {
        clearTimeout( resizeId );
        resizeId = setTimeout( megaMenuXs, 500 );
    } );
    megaMenuXs();


    jQuery( '.hidden.cross-fire' ).remove();
    jQuery( '#menu-main-menu' ).find( '.menu-item' ).removeClass( 'current-menu-item' );






    // Scroll Up Btn
    //-------------------------------------------------------------------------------
    $( window ).scroll( function () {
        if ( $( this ).scrollTop() > 100 ) {
            $( '.scroll-up-btn' ).removeClass( "animated fadeOutRight" );
            $( '.scroll-up-btn' ).fadeIn().addClass( "animated fadeInRight" );
        } else {
            $( '.scroll-up-btn' ).removeClass( "animated fadeInRight" );
            $( '.scroll-up-btn' ).fadeOut().addClass( "animated fadeOutRight" );
        }
    } );

    $( '.scroll-up-btn' ).click( function () {
        $( 'html, body' ).animate( { scrollTop: 0 }, 'slow' )
        return false;
    } );

    $( '.scroll-next-btn' ).click( function () {
        var toNext = $( '.intro-full-screen' ).height() + 50;
        $( 'html, body' ).animate( { scrollTop: toNext }, 'slow' )
        return false;
    } );

    // Navigation Top
    //-------------------------------------------------------------
    $( document ).scroll( function () {
        var y = $( this ).scrollTop();
        if ( y > 300 ) {
            $( '.navbar-hidden' ).fadeIn();
        } else {
            $( '.navbar-hidden' ).fadeOut();
        }
    } );


    // Gallery
    //-------------------------------------------------------------
    $( ".fancybox" ).fancybox( {
        maxWidth: 800,
        maxHeight: 600,
        fitToView: true,
        width: '70%',
        height: '70%',
        autoSize: true,
        closeClick: true,
        openEffect: 'none',
        closeEffect: 'none'
    } );


    /* fix vertical when not overflow
     call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix() {
        var h = $( 'body' ).height();
        // set .fullscreen height
        $( ".content-b" ).each( function ( i ) {
            if ( $( this ).innerHeight() <= h ) {
                $( this ).closest( ".fullscreen" ).addClass( "not-overflow" );
            }
        } );
    }

    $( window ).resize( fullscreenFix );
    fullscreenFix();



    // Appointment Form
    //-------------------------------------------------------------
    $( ".visual-form-builder" ).submit( function () {

        var action = $( this ).attr( 'action' );
        var form = $( this );
        var successText = $( '#xs_form_success' ).html();

        if ( form.valid() == true ) {
            form.find( '.vfb-submit' ).val( 'wait..' );
            $.ajax( {
                type: "POST",
                url: action,
                data: form.serialize(),
                success: function ( data ) {
                    $( '#appointmentModal' ).find( '.modal-body' ).html( successText );
                }
            } );

            return false;
        }
    } );


    // Newsletter Form
    //-------------------------------------------------------------------------------

    $( "#newsletter-form" ).submit( function () {

        var resultDiv = $( '#newsletter-form-msg' );
        var action = $( this ).attr( 'action' );
        var form = $( this );

        resultDiv.html( ' ' ).hide();

        $.ajax( {
            url: action,
            type: 'POST',
            data: form.serialize(),
            success: function ( data ) {
                resultDiv.html( data ).show();
            }
        } );

        return false;
    } );



    // Load Contact Gmap
    //-------------------------------------------------------------
    if ( typeof wellnessSettings.onScroll !== 'undefined' ) {
        if ( ( wellnessSettings.onScroll == 'yes' ) && ( $( window ).width() > 992 ) ) {
            new WOW( { mobile: false } ).init();
        }
    }

//    $('#submit-request-appointment').click(function () {
//        alert('bhh');
//    });

    /* ==========================================================================
     Contact Form
     ========================================================================== */

    fwForm.initAjaxSubmit( {
        //selector: 'form[some-custom-attribute].or-some-class'
        selector: 'form[data-fw-form-id="fw_form"]',
        ajaxUrl: adminAjax
    } );


//Multi step menu

    $( 'ul.dropdown-menu [data-toggle=dropdown]' ).on( 'click', function ( event ) {
        // Avoid following the href location when clicking
        event.preventDefault();
        // Avoid having the menu to close when clicking
        event.stopPropagation();
        // If a menu is already open we close it
        //$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
        // opening the one you clicked on
        $( this ).parent().addClass( 'open' );

        var menu = $( this ).parent().find( "ul" );
        var menupos = menu.offset();

        if ( ( menupos.left + menu.width() ) + 30 > $( window ).width() ) {
            var newpos = -menu.width();
        } else {
            var newpos = $( this ).parent().width();
        }
        menu.css( { left: newpos } );

    } );
    var sticky = $( ".sticky_header" );
    $( window ).on( 'scroll', function () {
        if ( $( window ).scrollTop() > 1 )
        {
            sticky.addClass( 'navbar-fixed-top' );
        } else
        {
            sticky.removeClass( 'navbar-fixed-top' );
        }
    } );



// end document ready
} );



// Fixing booking plugin
//-------------------------------------------------------------
jQuery( document ).on( "booked-on-requested-appointment", function ( e, p ) {
    if ( typeof profilePage !== 'undefined' && profilePage ) {
    } else {
        ( function ( $ ) {
            var successText = $( '#xs_form_success' ).html();
            $( '#appointmentModal' ).find( '.modal-body' ).html( successText );
        } )( jQuery );
    }
    close_booked_modal();
} );

var org_create_booked_modal = window.create_booked_modal;
window.create_booked_modal = function () {
    jQuery( 'body' ).addClass( 'new-appt-opened' );
    org_create_booked_modal();
};

var org_close_booked_modal = window.close_booked_modal;
window.close_booked_modal = function () {
    jQuery( 'body' ).removeClass( 'new-appt-opened' );
    org_close_booked_modal();
};

var org_adjust_calendar_boxes = window.adjust_calendar_boxes;
window.adjust_calendar_boxes = function () {
    org_adjust_calendar_boxes();
};




