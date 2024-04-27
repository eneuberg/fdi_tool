$(document).ready(function(){
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > 50) { // Adjust this value according to how much you want to scroll before the header becomes opaque
            $(".navbar").removeClass("transparent-header");
        } else {
            $(".navbar").addClass("transparent-header");
        }
    });
});