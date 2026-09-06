/* ==========================================
   TECHNOVA 1.0
   SUCCESS PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadParticipant();

    createParticles();

    launchConfetti();

});


/* ==========================================
   LOAD PARTICIPANT
========================================== */

function loadParticipant() {

    const participant = JSON.parse(
        sessionStorage.getItem("technovaRegistration")
    );

    const successWrapper =
        document.getElementById("successWrapper");

    const noRegistration =
        document.getElementById("noRegistration");

    if (!participant) {

        if (successWrapper)
            successWrapper.style.display = "none";

        if (noRegistration)
            noRegistration.style.display = "block";

        return;
    }

    document.getElementById("participantName").textContent =
        participant.fullName || "-";

    document.getElementById("registerNo").textContent =
        participant.registerNo || "-";

    document.getElementById("eventName").textContent =
        participant.event || "-";

}


/* ==========================================
   PARTICLES
========================================== */

function createParticles() {

    const container =
        document.getElementById("particles");

    if (!container) return;

    container.innerHTML = "";

    const total =
        window.innerWidth <= 700 ? 20 : 40;

    for (let i = 0; i < total; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (8 + Math.random() * 8) + "s";

        particle.style.animationDelay =
            (-Math.random() * 10) + "s";

        container.appendChild(particle);

    }

}


/* ==========================================
   CONFETTI
========================================== */

function launchConfetti() {

    if (typeof confetti !== "function")
        return;

    confetti({

        particleCount: 180,

        spread: 90,

        origin: {

            y: 0.6

        }

    });

}


/* ==========================================
   BUTTONS
========================================== */

document.addEventListener("click", function(e){

    if(e.target.closest(".register")){

        sessionStorage.removeItem(
            "technovaRegistration"
        );

    }

});