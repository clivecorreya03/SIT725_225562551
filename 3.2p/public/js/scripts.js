const addCards = (items) => {
    $("#card-section").empty();

    items.forEach((item) => {
        const card = `
            <div class="col s12 m4">
                <div class="card medium">

                    <div class="card-image waves-effect waves-block waves-light">
                        <img
                            class="activator threat-image"
                            src="${item.image}"
                            alt="${item.title}"
                            onerror="this.onerror=null; this.src='/images/cybersecurity.jpeg';"
                        >
                    </div>

                    <div class="card-content center-align">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}

                            <i class="material-icons right">
                                more_vert
                            </i>
                        </span>

                        <p>
                            <a href="#!">${item.link}</a>
                        </p>
                    </div>

                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.title}

                            <i class="material-icons right">
                                close
                            </i>
                        </span>

                        <p>${item.description}</p>
                    </div>

                </div>
            </div>
        `;

        $("#card-section").append(card);
    });
};

const getThreats = async () => {
    try {
        const response = await fetch("/api/threats");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

        console.log("Threat data:", result);

        addCards(result.data);
    } catch (error) {
        console.error("Cards could not be loaded:", error);

        M.toast({
            html: "Cards could not be loaded."
        });
    }
};

$(document).ready(function () {
    $(".materialboxed").materialbox();
    $(".modal").modal();

    getThreats();

    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        const formData = {
            firstName: $("#first_name").val(),
            lastName: $("#last_name").val(),
            password: $("#password").val(),
            email: $("#email").val(),
            message: $("#message").val()
        };

        console.log("Form Data Submitted:", formData);

        M.toast({
            html: "Form submitted successfully."
        });
    });
});