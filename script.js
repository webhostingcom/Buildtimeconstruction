/* =========================================
   BUILDTIME CONSTRUCTION
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            // Change hamburger into X
            const lines = menuButton.querySelectorAll("span");

            if (isOpen) {

                lines[0].style.transform =
                    "translateY(7px) rotate(45deg)";

                lines[1].style.opacity = "0";

                lines[2].style.transform =
                    "translateY(-7px) rotate(-45deg)";

            } else {

                lines[0].style.transform = "";
                lines[1].style.opacity = "";
                lines[2].style.transform = "";

            }

        });


        // Close mobile menu after clicking a link
        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const lines =
                    menuButton.querySelectorAll("span");

                lines[0].style.transform = "";
                lines[1].style.opacity = "";
                lines[2].style.transform = "";

            });

        });

    }


    /* =========================================
       SERVICE ACCORDIONS
    ========================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {

        const header =
            card.querySelector(".service-header");

        if (!header) return;

        header.addEventListener("click", () => {

            const wasActive =
                card.classList.contains("active");


            // Close all service cards
            serviceCards.forEach((item) => {
                item.classList.remove("active");
            });


            // Open clicked card
            if (!wasActive) {
                card.classList.add("active");
            }

        });

    });


    /* =========================================
       OWNERSHIP GUIDANCE ACCORDIONS
    ========================================== */

    const guideItems =
        document.querySelectorAll(".guide-item");

    guideItems.forEach((item) => {

        const header =
            item.querySelector(".guide-header");

        if (!header) return;

        header.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");


            // Close all
            guideItems.forEach((guide) => {
                guide.classList.remove("active");
            });


            // Open selected
            if (!wasActive) {
                item.classList.add("active");
            }

        });

    });


    /* =========================================
       QUOTE FORM PROGRESS
    ========================================== */

    const quoteForm =
        document.getElementById("quoteForm");

    const progressBar =
        document.getElementById("formProgress");


    if (quoteForm && progressBar) {

        const fields =
            quoteForm.querySelectorAll(
                "input:not([type='hidden']), select, textarea"
            );


        function updateProgress() {

            let completed = 0;

            fields.forEach((field) => {

                if (field.value.trim() !== "") {
                    completed++;
                }

            });


            const percentage =
                (completed / fields.length) * 100;

            progressBar.style.width =
                percentage + "%";

        }


        fields.forEach((field) => {

            field.addEventListener(
                "input",
                updateProgress
            );

            field.addEventListener(
                "change",
                updateProgress
            );

        });


        updateProgress();


        /* =========================================
           FORMSPREE SUBMISSION
        ========================================== */

        quoteForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const submitButton =
                    quoteForm.querySelector(
                        ".submit-button"
                    );

                const message =
                    document.getElementById(
                        "formMessage"
                    );


                if (!submitButton || !message) {
                    return;
                }


                const originalText =
                    submitButton.innerHTML;


                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";


                message.textContent = "";

                message.style.color = "";


                try {

                    const formData =
                        new FormData(quoteForm);


                    const response =
                        await fetch(
                            quoteForm.action,
                            {
                                method: "POST",
                                body: formData,
                                headers: {
                                    Accept:
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        message.textContent =
                            "Thank you. Your request has been sent successfully.";

                        message.style.color =
                            "#3d8b40";


                        quoteForm.reset();

                        updateProgress();


                        submitButton.innerHTML =
                            "Request Sent ✓";


                        setTimeout(() => {

                            submitButton.innerHTML =
                                originalText;

                            submitButton.disabled =
                                false;

                        }, 4000);


                    } else {

                        throw new Error(
                            "Form submission failed."
                        );

                    }


                } catch (error) {

                    console.error(error);


                    message.textContent =
                        "Something went wrong. Please try again or call us directly.";

                    message.style.color =
                        "#b42318";


                    submitButton.innerHTML =
                        originalText;

                    submitButton.disabled =
                        false;

                }

            }
        );

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const navbar =
                document.querySelector(".navbar");


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    const navbar =
        document.querySelector(".navbar");


    if (navbar) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 40) {

                    navbar.style.background =
                        "rgba(5, 5, 5, 0.97)";

                } else {

                    navbar.style.background =
                        "rgba(8, 8, 8, 0.9)";

                }

            },
            { passive: true }
        );

    }


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

                image.style.background =
                    "#222";

            }
        );

    });


    /* =========================================
       VIDEO FALLBACK
    ========================================== */

    const video =
        document.querySelector(".video-section video");


    if (video) {

        video.addEventListener(
            "error",
            () => {

                console.warn(
                    "Background video could not be loaded."
                );

            }
        );

    }

});