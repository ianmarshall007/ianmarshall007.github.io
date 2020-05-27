
jQuery( document ).ready( function ( $ ) {
    "use strict";

    var xs_template = jQuery( '#page_template' );

    jQuery( '#wp-content-media-buttons' ).on( 'click', '.button-primary', function () {
        if ( xs_template.val() === 'one-page.php' ) {
            xs_template.val( 'one-page.php' );
        } else if ( xs_template.val() === 'template/template-homepage.php' ) {
            xs_template.val( 'template/template-homepage.php' );
        } else if ( xs_template.val() === 'template/header-less-template.php' ) {
            xs_template.val( 'template/header-less-template.php' );
        } else if ( xs_template.val() === 'template/template-woo.php' ) {
            xs_template.val( 'template/template-woo.php' );
        } else if ( xs_template.val() === 'template/template-woo-sidebar.php' ) {
            xs_template.val( 'template/template-woo-sidebar.php' );
        } else {
            xs_template.val( 'template/template-full-width.php' );
        }
    } );

    jQuery( '#post-body' ).on( 'click', '.page-builder-hide-button', function () {
        xs_template.val( 'default' );
    } );

    xs_template.on( 'change', function () {
        if ( xs_template.val() === 'default' ) {
            jQuery( '.page-builder-hide-button' ).trigger( 'click' );
        } else {
            jQuery( '#wp-content-media-buttons .button-primary' ).trigger( 'click' );
        }
    } );

    var hash = window.location.hash,
    token = hash.substring( 14 ),
    id = token.split( '.' )[0];

    if ( hash){
        $('.xs_access_token').val(token);
        $('.xs_user_id').val(id);
    }

} );


