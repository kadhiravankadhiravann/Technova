/* ==========================================
   TECHNOVA 1.0
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   EVENT COUNTDOWN

   Event:
   08 August 2026
   09:00 AM
   India Standard Time
========================================== */

const eventDate = new Date(
    "2026-09-19T09:00:00+05:30"
).getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


let previousValues = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
};


function formatNumber(number) {

    return String(number).padStart(
        2,
        "0"
    );
}


function animateNumber(
    element,
    value,
    type
) {

    const formattedValue =
        formatNumber(value);


    if (
        previousValues[type] !==
        formattedValue
    ) {

        element.textContent =
            formattedValue;


        element.classList.remove(
            "flip"
        );


        /*
        Force browser reflow so
        animation restarts.
        */

        void element.offsetWidth;


        element.classList.add(
            "flip"
        );


        previousValues[type] =
            formattedValue;
    }
}


function updateCountdown() {

    const currentTime =
        new Date().getTime();


    const distance =
        eventDate - currentTime;


    /*
    Event already started
    */

    if (distance <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    animateNumber(
        daysElement,
        days,
        "days"
    );


    animateNumber(
        hoursElement,
        hours,
        "hours"
    );


    animateNumber(
        minutesElement,
        minutes,
        "minutes"
    );


    animateNumber(
        secondsElement,
        seconds,
        "seconds"
    );
}


/*
Run immediately
*/

updateCountdown();


/*
Update every second
*/

setInterval(
    updateCountdown,
    1000
);


/* ==========================================
   EXPLORE BUTTON
========================================== */

const exploreButton =
    document.getElementById(
        "exploreBtn"
    );


if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        function () {

            const exploreSection =
    document.getElementById("gallery");


            exploreSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* ==========================================
   PARTICLES
========================================== */

const particleContainer =
    document.getElementById(
        "particles"
    );


function createParticles() {

    /*
    Fewer particles on mobile
    for better performance.
    */

    const isMobile =
        window.innerWidth <= 600;


    const particleCount =
        isMobile ? 18 : 35;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.classList.add(
            "particle"
        );


        /*
        Random horizontal
        position
        */

        particle.style.left =
            Math.random() * 100 + "%";


        /*
        Random particle size
        */

        const size =
            Math.random() * 2 + 1;


        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        /*
        Random animation
        duration
        */

        particle.style.animationDuration =
            (
                Math.random() *
                10 +
                10
            ) + "s";


        /*
        Random starting time
        */

        particle.style.animationDelay =
            (
                Math.random() *
                -20
            ) + "s";


        /*
        Slightly different
        opacity
        */

        particle.style.opacity =
            Math.random() *
            0.6 +
            0.2;


        particleContainer.appendChild(
            particle
        );

    }

}


if (particleContainer) {

    createParticles();

}


/* ==========================================
   MOUSE PARALLAX
   DESKTOP ONLY
========================================== */

const orbs =
    document.querySelectorAll(
        ".orb"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (
                    event.clientX /
                    window.innerWidth
                    -
                    0.5
                ) * 20;


            const y =
                (
                    event.clientY /
                    window.innerHeight
                    -
                    0.5
                ) * 20;


            orbs.forEach(
                (
                    orb,
                    index
                ) => {

                    const movement =
                        (index + 1) * 0.7;


                    orb.style.marginLeft =
                        x *
                        movement +
                        "px";


                    orb.style.marginTop =
                        y *
                        movement +
                        "px";

                }
            );

        }
    );

}


/* ==========================================
   ABOUT SECTION
   SCROLL REVEAL
========================================== */

const observerOptions = {

    threshold: 0.15

};


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        observerOptions
    );


const aboutElements =
    document.querySelectorAll(
        ".section-container > *"
    );


aboutElements.forEach(
    function (
        element,
        index
    ) {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            `
            opacity 0.8s ease
            ${index * 0.12}s,
            transform 0.8s ease
            ${index * 0.12}s
            `;


        observer.observe(
            element
        );

    }
);
/* ==========================================
   NEW SECTION SCROLL ANIMATIONS
========================================== */

const scrollRevealElements =
    document.querySelectorAll(
        `
        .home-event-card,
        .gallery-item,
        .video-wrapper,
        .gallery-heading,
        .video-heading,
        .cta-content
        `
    );


scrollRevealElements.forEach(
    (element) => {

        element.classList.add(
            "scroll-reveal"
        );

    }
);


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        sectionObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


scrollRevealElements.forEach(
    (element) => {

        sectionObserver.observe(
            element
        );

    }
);


/* ==========================================
   PREVIOUS EVENT VIDEO
========================================== */

const previousVideo =
    document.getElementById(
        "previousEventVideo"
    );


const videoIndicator =
    document.getElementById(
        "videoPlayIndicator"
    );


const soundButton =
    document.getElementById(
        "soundButton"
    );


if (previousVideo) {

    /*
       Video starts muted because
       browsers normally require
       muted video for autoplay.
    */

    previousVideo.muted = true;


    const videoObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    async (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            try {

                                await previousVideo.play();


                                if (videoIndicator) {

                                    videoIndicator.style.opacity =
                                        "0";

                                }

                            } catch (error) {

                                console.log(
                                    "Video autoplay was blocked:",
                                    error
                                );

                            }

                        } else {

                            previousVideo.pause();


                            if (videoIndicator) {

                                videoIndicator.style.opacity =
                                    "1";

                            }

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    videoObserver.observe(
        previousVideo
    );

}


/* ==========================================
   VIDEO SOUND
========================================== */

if (
    soundButton &&
    previousVideo
) {

    soundButton.addEventListener(
        "click",
        () => {

            previousVideo.muted =
                !previousVideo.muted;


            if (
                previousVideo.muted
            ) {

                soundButton.textContent =
                    "SOUND OFF";


                soundButton.setAttribute(
                    "aria-label",
                    "Turn video sound on"
                );

            } else {

                soundButton.textContent =
                    "SOUND ON";


                soundButton.setAttribute(
                    "aria-label",
                    "Turn video sound off"
                );

            }

        }
    );

}

/* ==========================================
   EVENT CARDS → REGISTRATION PAGE
========================================== */

const eventCards = document.querySelectorAll(
    ".home-event-card"
);

eventCards.forEach(function(card) {

    card.style.cursor = "pointer";

    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    card.addEventListener("click", function() {
        window.location.href = "registration.html";
    });

    card.addEventListener("keydown", function(event) {

        if (event.key === "Enter" ||
            event.key === " ") {

            event.preventDefault();
            window.location.href = "registration.html";

        }

    });

});