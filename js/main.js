document.addEventListener('DOMContentLoaded', function () {
    // 1. Contact Form Redirection
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            setTimeout(function () {
                window.location.href = 'pages/thank-you.html';
            }, 1500);
        });
    }

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.about-card, .product-card, .box, .vision-text, section h2, .contact-wrap');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });


    // Fallback: Ensure elements are visible if observer fails or on quick scroll
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 500);

    // 3. Gallery Slideshow Logic
    let slideIndex = 1;
    let slideInterval;

    // Initialize gallery if it exists on the page
    if (document.querySelector('.gallery-slider')) {
        showSlides(slideIndex);
        startAutoSlide();
    }

    // Next/previous controls
    window.changeSlide = function (n) {
        showSlides(slideIndex += n);
        resetAutoSlide();
    }

    // Thumbnail image controls
    window.currentSlide = function (n) {
        showSlides(slideIndex = n);
        resetAutoSlide();
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("gallery-slide");
        let dots = document.getElementsByClassName("dot");

        if (!slides.length) return;

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
    }

    function startAutoSlide() {
        slideInterval = setInterval(function () {
            showSlides(slideIndex += 1);
        }, 4000); // Change image every 4 seconds
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
});
