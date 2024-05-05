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


document.addEventListener("scroll", function() {
    var sections = document.querySelectorAll("section");
    var scrollPosition = window.scrollY + 200;

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


