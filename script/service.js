$(document).ready(function () {
    $("#addTaskBtn").click(function () {
      var inputValue = $("#taskInput").val();
      const settings = {
        async: true,
        crossDomain: true,
        url:
          "https://twitter241.p.rapidapi.com/user?username=" + inputValue,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "secret key",
          "X-RapidAPI-Host": "twitter241.p.rapidapi.com",
        },
      };

      $.ajax(settings).done(function (response) {
        let name = response.data.user.result.legacy.name;
        let data_create = response.data.user.result.legacy.created_at;
        let account_img =
          response.data.user.result.legacy.profile_image_url_https;
        // $("#name").text("Name: " + name);
        // $("#data").text("Data create: " + data_create);

        const taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
          const taskItem = $("<li>").append(
            "<span>" +
              "Name: " +
              name +
              " Data create: " +
              data_create +
              "</span></br><img src=" +
              account_img +
              " alt='No image'></br><button>Delete</button>"
          );
          $("#taskList").append(taskItem);
          $("#taskInput").val("");
        }
      });
    });

    $("#taskList").on("click", "button", function () {
      $(this).closest("li").remove();
    });
  });