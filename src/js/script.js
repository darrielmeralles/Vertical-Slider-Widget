let element = $('.widget-abc123');
let data = {
	device: 'desktop', //desktop, tablet, mobile
	inEditor: true,
	siteId: '',
	elementId: '',
	config: {
		sampleList: [{}],
		sample:''
	}
};

let device = data.device;
let sampleList = data.config.sampleList;
let sample = data.config.sample;

let noCollectMessage = 'No data was found.' ///data.config.noCollectMessage
let noCollectSubMessage = 'This will be hidden on preview and live site.' ///data.config.noCollectSubMessage
let sampleListData;

switch (device) {
	case 'desktop':
		$(element).width("960px");
		break;
	case 'tablet':
		$(element).width("875px");
		break;
	default:
		$(element).width("326px");
}

//ADD MULTIPLE LINK SOURCE HERE


dmAPI.runOnReady('init', function () {
	
	
})

$(document).ready(function () {
    const slider = $(".timeline-slider");

    // Initialize Slick Slider
    slider.slick({
        dots: false, // Custom dots will be used
        arrows: false,
        infinite: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: false,
        cssEase: "ease-in-out",
    });

    gsap.registerPlugin(ScrollTrigger);

    let totalSlides = $(".timeline-slider .slick-slide").length - 1;
    let currentIndex = 0;

    ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: `+=${totalSlides * window.innerHeight}`,
        pin: true,
        scrub: false,
        snap: {
            snapTo: (progress) => Math.round(progress * totalSlides) / totalSlides,
            duration: 0.5,
            ease: "power2.inOut",
        },
        onUpdate: (self) => {
            let newSlide = Math.round(self.progress * totalSlides);
            if (newSlide !== currentIndex) {
                currentIndex = newSlide;
                slider.slick("slickGoTo", currentIndex);
                updatePagination(currentIndex);

                // Smooth content & image transition
                $(".timeline-banner").css({ opacity: 0, transform: "translateY(50px)" });
                gsap.to(".slick-current .timeline-banner", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                });
            }
        },
    });

    // Pagination Dots Setup
    function createPaginationDots() {
        const dotContainer = $(".pagination-dots");
        for (let i = 0; i <= totalSlides; i++) {
            dotContainer.append(`<div data-index="${i}"></div>`);
        }
        $(".pagination-dots div").first().addClass("active");

        $(".pagination-dots div").on("click", function () {
            let index = $(this).data("index");
            slider.slick("slickGoTo", index);
            updatePagination(index);
        });
    }

    function updatePagination(index) {
        $(".pagination-dots div").removeClass("active");
        $(".pagination-dots div").eq(index).addClass("active");
    }

    // Ensure content updates smoothly when slide changes
    slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        gsap.to(".timeline-banner", { opacity: 0, y: 50, duration: 0.5, ease: "power1.in" });
    });

    slider.on("afterChange", function (event, slick, currentSlide) {
        gsap.to(".slick-current .timeline-banner", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
        });
        updatePagination(currentSlide);
    });

    createPaginationDots();
});



