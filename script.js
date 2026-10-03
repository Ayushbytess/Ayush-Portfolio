// =====================================================
// AYUSH PATIL PORTFOLIO - JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Get all portfolio sections
    const sections = document.querySelectorAll("section");

    // Get navbar links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");


    // =====================================================
    // 1. SMOOTH NAVIGATION
    // =====================================================

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const targetSection =
                    document.querySelector(targetId);

                if (targetSection) {

                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    // =====================================================
    // 2. ACTIVE NAVBAR LINK
    // =====================================================

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= window.innerHeight * 0.45 &&
                sectionTop >= -window.innerHeight * 0.55) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

        updateSlideNumber(currentSection);
    }


    window.addEventListener("scroll", updateActiveNavigation);


    // =====================================================
    // 3. SLIDE NUMBER
    // =====================================================

    const slideCounter = document.createElement("div");

    slideCounter.id = "slideCounter";

    slideCounter.innerHTML =
        "SLIDE <span>1</span> / " + sections.length;

    document.body.appendChild(slideCounter);


    function updateSlideNumber(currentSection) {

        let currentIndex = 0;

        sections.forEach(function (section, index) {

            if (
                section.getAttribute("id") ===
                currentSection
            ) {

                currentIndex = index;

            }

        });


        slideCounter.querySelector("span").textContent =
            currentIndex + 1;

    }


    // =====================================================
    // 4. NAVIGATION DOTS
    // =====================================================

    const dotsContainer =
        document.createElement("div");

    dotsContainer.id = "slideDots";

    document.body.appendChild(dotsContainer);


    sections.forEach(function (section, index) {

        const dot = document.createElement("button");

        dot.className = "slide-dot";

        dot.setAttribute(
            "aria-label",
            "Go to " + section.id
        );


        dot.addEventListener("click", function () {

            section.scrollIntoView({
                behavior: "smooth"
            });

        });


        dotsContainer.appendChild(dot);

    });


    // Update active dot
    function updateDots() {

        let activeIndex = 0;

        sections.forEach(function (section, index) {

            const position =
                section.getBoundingClientRect().top;

            if (
                Math.abs(position) <
                Math.abs(
                    sections[activeIndex]
                        .getBoundingClientRect()
                        .top
                )
            ) {

                activeIndex = index;

            }

        });


        const dots =
            document.querySelectorAll(".slide-dot");


        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === activeIndex
            );

        });

    }


    window.addEventListener("scroll", updateDots);


    // =====================================================
    // 5. KEYBOARD SLIDE NAVIGATION
    // =====================================================

    let currentSlide = 0;

    document.addEventListener("keydown", function (event) {

        // Don't control slides when typing in form fields
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }


        if (event.key === "ArrowDown") {

            event.preventDefault();

            if (currentSlide < sections.length - 1) {

                currentSlide++;

                sections[currentSlide].scrollIntoView({
                    behavior: "smooth"
                });

            }

        }


        if (event.key === "ArrowUp") {

            event.preventDefault();

            if (currentSlide > 0) {

                currentSlide--;

                sections[currentSlide].scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });


    // Keep current slide synchronized with scrolling
    window.addEventListener("scroll", function () {

        sections.forEach(function (section, index) {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2
            ) {

                currentSlide = index;

            }

        });

    });


    // =====================================================
    // 6. SCROLL PROGRESS BAR
    // =====================================================

    const progressBar =
        document.createElement("div");

    progressBar.id = "scrollProgress";

    document.body.appendChild(progressBar);


    window.addEventListener("scroll", function () {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            progress + "%";

    });


    // =====================================================
    // 7. SECTION REVEAL ANIMATION
    // =====================================================

    const revealElements =
        document.querySelectorAll(
            ".about-card, .skill-card, .project-card, .education-card, .contact-card"
        );


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });


    // =====================================================
    // 8. PROJECT CARD HOVER EFFECT
    // =====================================================

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.style.transform =
                "translateY(-8px) scale(1.02)";

        });


        card.addEventListener("mouseleave", function () {

            this.style.transform =
                "translateY(0) scale(1)";

        });

    });


    // =====================================================
    // 9. CONTACT FORM
    // =====================================================

    const contactForm =
        document.querySelector("form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const message =
                    document.createElement("div");

                message.className =
                    "success-message";

                message.innerHTML =
                    "✓ Message sent successfully! Thank you for contacting me.";


                contactForm.appendChild(message);


                setTimeout(function () {

                    message.remove();

                }, 4000);


                contactForm.reset();

            }
        );

    }


    // =====================================================
    // 10. INITIALIZE
    // =====================================================

    updateActiveNavigation();
    updateDots();

});