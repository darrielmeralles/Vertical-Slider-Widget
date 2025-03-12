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
        dots: true,
        arrows: false,
        infinite: false,
        speed: 800, // Smooth transition speed
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: false, // Disable native Slick scrolling
        cssEase: "ease-in-out", // Smooth transition effect
    });

    gsap.registerPlugin(ScrollTrigger);

    let totalSlides = $(".timeline-slider .slick-slide").length - 1; // Last slide index
    let currentIndex = 0; // Track current slide index

    ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: `+=${totalSlides * window.innerHeight}`, // Full height of all slides
        pin: true,
        scrub: false, // Disable smooth scrolling
        snap: {
            snapTo: (progress) => Math.round(progress * totalSlides) / totalSlides,
            duration: 0.5, // Smooth snap duration
            ease: "power2.out",
        },
        onUpdate: (self) => {
            let newSlide = Math.round(self.progress * totalSlides);
            if (newSlide !== currentIndex) {
                currentIndex = newSlide;
                slider.slick("slickGoTo", currentIndex);

                // Smooth fade transition for content
                $(".timeline-banner").css({ opacity: 0, transform: "translateY(50px)" });
                gsap.to(".slick-current .timeline-banner", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                });
            }
        },
    });

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

        $(".slick-dots li").removeClass("active");
        $(".slick-dots li").eq(currentSlide).addClass("active");
    });
});

