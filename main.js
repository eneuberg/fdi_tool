
/* global AOS */
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({



    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation


});

/* scrollable navbar*/
document.addEventListener("scroll", function() {
    var sections = document.querySelectorAll("section");
    var scrollPosition = window.scrollY;

    sections.forEach(function(currentSection) {
        var sectionTop = currentSection.offsetTop;
        var sectionHeight = currentSection.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            var id = currentSection.getAttribute("id");
            var correspondingLink = document.querySelector("a[href='#" + id + "']");
            var links = document.querySelectorAll("nav a");
            links.forEach(function(link) {
                link.style.fontWeight = "normal";
            });
            correspondingLink.style.fontWeight = "bold";
        }
    });
});

/*share Website*/
document.addEventListener("DOMContentLoaded", function() {
    var facebookShareBtn = document.getElementById('facebookShareBtn');
    if (facebookShareBtn) {
        facebookShareBtn.addEventListener('click', function(event) {
            event.preventDefault();
            var url = encodeURIComponent(window.location.href);
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'facebook-share-dialog', 'width=626,height=436');
        });
    }

    var googleShareBtn = document.getElementById('googleShareBtn');
    if (googleShareBtn) {
        googleShareBtn.addEventListener('click', function(event) {
            event.preventDefault();
            var url = encodeURIComponent(window.location.href);
            window.open('https://plus.google.com/share?url=' + url, 'google-share-dialog', 'width=626,height=436');
        });
    }

    var twitterShareBtn = document.getElementById('twitterShareBtn');
    if (twitterShareBtn) {
        twitterShareBtn.addEventListener('click', function(event) {
            event.preventDefault();
            var url = encodeURIComponent(window.location.href);
            var text = encodeURIComponent("Check out this website!");
            window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, 'twitter-share-dialog', 'width=626,height=436');
        });
    }

    var envelopeShareBtn = document.getElementById('envelopeShareBtn');
    if (envelopeShareBtn) {
        envelopeShareBtn.addEventListener('click', function(event) {
            event.preventDefault();
            var subject = encodeURIComponent("Check out this website!");
            var body = encodeURIComponent(window.location.href);
            window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
        });
    }
});



