const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyHp3LPztWZA-Kjn9QPu21e3uqfv9ck1iDP3B-JwZ0IjLMgabshrb-e3ulE7DjvSvENKw/exec";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        // ==============================
        // GET FORM DETAILS
        // ==============================

        const fullName =
            document.getElementById("fullName").value.trim();

        const registerNo =
            document.getElementById("registerNo").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const qualification =
            document.querySelector(
                'input[name="qualification"]:checked'
            );

        const event =
            document.querySelector(
                'input[name="event"]:checked'
            );

        // ==============================
        // VALIDATION
        // ==============================

        if (fullName === "") {
            alert("Enter your full name");
            return;
        }

        if (registerNo === "") {
            alert("Enter your register number");
            return;
        }

        if (!/^[0-9]{10}$/.test(mobile)) {
            alert("Enter valid 10 digit mobile number");
            return;
        }

        if (email === "") {
            alert("Enter your email");
            return;
        }

        if (!qualification) {
            alert("Select UG or PG");
            return;
        }

        if (!event) {
            alert("Select an event");
            return;
        }

        // ==============================
        // CREATE DATA
        // ==============================

        const data = {
            fullName: fullName,
            registerNo: registerNo,
            mobile: mobile,
            email: email,
            qualification: qualification.value,
            event: event.value
        };

        // ==============================
        // SAVE DATA FOR SUCCESS PAGE
        // ==============================

        sessionStorage.setItem(
            "technovaRegistration",
            JSON.stringify(data)
        );

        // ==============================
        // SEND DATA TO GOOGLE SHEET
        // ==============================

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data),
                keepalive: true
            });

            // ==============================
            // REDIRECT ONLY AFTER FETCH
            // ==============================

            window.location.replace("success.html");

        } catch (error) {

            console.error("Error saving registration:", error);

            alert(
                "Unable to submit your registration. Please check your internet connection and try again."
            );
        }

    });

});