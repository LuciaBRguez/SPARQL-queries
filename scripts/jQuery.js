$(document).ready(function(){
    
    // Initial state
    $('#get-1').hide();
    $('#get-2').hide();
    $('#get-3').hide();
    $('#get-4').hide();
    $('#get-5').hide();
    
    // Click header
    $('#get-header-1').click(function(){
        $('#get-1').slideToggle();
    });
    $('#get-header-2').click(function(){
        $('#get-2').slideToggle();
    });
    $('#get-header-3').click(function(){
        $('#get-3').slideToggle();
    });
    $('#get-header-4').click(function(){
        $('#get-4').slideToggle();
    });
    $('#get-header-5').click(function(){
        $('#get-5').slideToggle();
    });

});