var buttonSearchMain = document.getElementById('main-btn');
var buttonSearchSecondary = document.getElementById('secondary-btn');
var mainSeachBar = document.getElementById('main-search');

var userSearchMain = "";
var userSearchSecondary = "";


var apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var randomURL = "https://www.themealdb.com/api/json/v1/1/random.php";
var queryURL;
var categoriesURL = "https://www.themealdb.com/api/json/v1/1/categories.php";



//MAIN SEARCH BUTTON.

buttonSearchMain.addEventListener('click', function () {

    fetch(categoriesURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);})

});

//SEARCH BUTTON ON THE TOP RIGHT HAND CORNER.

buttonSearchSecondary.addEventListener('click', function () {

    
    console.log('secondary button works');
    var userSearchSecondary = document.getElementById("secondaryInput").value;
    console.log(userSearchSecondary);





});

