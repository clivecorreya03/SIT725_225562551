$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();

  $.get("/api/projects", function (response) {
    console.log(response);

    let cards = "";

    response.data.forEach(function (project) {
      cards += `
        <div class="col s12 m6 l4">
          <div class="card medium">

            <div class="card-image waves-effect waves-block waves-light">
              <img
                class="activator"
                src="${project.image}"
                alt="${project.title}"
              >
            </div>

            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">
                ${project.title}
                <i class="material-icons right">more_vert</i>
              </span>

              <p>
                <a href="#!">${project.link}</a>
              </p>
            </div>

            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">
                ${project.title}
                <i class="material-icons right">close</i>
              </span>

              <p>${project.description}</p>
            </div>

          </div>
        </div>
      `;
    });

    $("#card-section").html(cards);
  });

  $("#formSubmit").click(function (event) {
    event.preventDefault();

    M.toast({
      html: "Form submitted successfully"
    });
  });
});