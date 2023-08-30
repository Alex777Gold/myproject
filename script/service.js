//Display data
function display(id, name, data_create, account_img) {
  const taskItem = $("<li>").data("id", id).append(
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
}

// Load data fromn Local Storage in savedDataArray
const savedDataArray = JSON.parse(localStorage.getItem('ApiDataArray')) || [];
// Data display
if (savedDataArray.length > 0) {
  console.log('Data found:', savedDataArray);

  savedDataArray.forEach(jsonObject => {
    display(jsonObject.id, jsonObject.name, jsonObject.data_create, jsonObject.account_img)
  });

  $("#taskInput").val("");
} else {
  console.log('No data');
}



$(document).ready(function () {
  //api request
    $("#addTaskBtn").click(function () {
      let inputValue = $("#taskInput").val();
      let secretKey = $("#secretkey").val();
      const settings = {
        async: true,
        crossDomain: true,
        url:
          "https://twitter241.p.rapidapi.com/user?username=" + inputValue,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
          secretKey, //secret key
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

          function generateUniqueId() {
            return Date.now();
          };

        let id = generateUniqueId();

        //add user to list
        const taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
          display(id, name, data_create, account_img)
          $("#taskInput").val("");
        }

        //Save data
        let apiDataArray = JSON.parse(localStorage.getItem('ApiDataArray')) || [];
        const dataToSave = { id: id, name: name, data_create: data_create, account_img: account_img };
        apiDataArray.push(dataToSave);
        localStorage.setItem('ApiDataArray', JSON.stringify(apiDataArray));

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