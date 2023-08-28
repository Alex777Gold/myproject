// Load data fromn Local Storage in savedDataArray
const savedDataArray = JSON.parse(localStorage.getItem('ApiDataArray')) || [];
// Data display
if (savedDataArray.length > 0) {
  console.log('Data found:', savedDataArray);

  savedDataArray.forEach(jsonObject => {
    const taskItem = $("<li>").data("id", jsonObject.id).append(
      "<span>" +
        "Name: " +
        jsonObject.name +
        " Data create: " +
        jsonObject.data_create +
        "</span></br><img src=" +
        jsonObject.account_img +
        " alt='account img'></br><button>Delete</button></li>"
    );
    $("#taskList").append(taskItem);
  });

  $("#taskInput").val("");
} else {
  console.log('No data');
}



$(document).ready(function () {
  //api request
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
            "secret key", //secret key
          "X-RapidAPI-Host": "twitter241.p.rapidapi.com",
        },
      };

      //get data api
      $.ajax(settings).done(function (response) {
        let dataList = [];
        let name = response.data.user.result.legacy.name;
        let data_create = response.data.user.result.legacy.created_at;
        let account_img =
          response.data.user.result.legacy.profile_image_url_https;

        //add user to list
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
              " alt='account img'></br><button>Delete</button></li>"
          );
          $("#taskList").append(taskItem);
          $("#taskInput").val("");
        }

        //Save data
        let apiDataArray = JSON.parse(localStorage.getItem('ApiDataArray')) || [];
        const dataToSave = { id: generateUniqueId(), name: name, data_create: data_create, account_img: account_img };
        apiDataArray.push(dataToSave);
        localStorage.setItem('ApiDataArray', JSON.stringify(apiDataArray));

        function generateUniqueId() {
          return Date.now();
        };

      });
    });
    //Delete data
    $("#taskList").on("click", "button", function () {
      const liElement = $(this).closest("li");
      const idToDelete = liElement.data("id");
  
      let apiDataArray = JSON.parse(localStorage.getItem('ApiDataArray')) || [];

      apiDataArray = apiDataArray.filter(item => item.id !== idToDelete);
  
      localStorage.setItem('ApiDataArray', JSON.stringify(apiDataArray));

      liElement.remove();
    });
  });