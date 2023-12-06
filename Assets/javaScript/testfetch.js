var categoriesURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
var allURL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";


fetch(allURL)
    .then(function (response) {
        return response.json();

    }).then(function (data) {
        console.log(data)      

});



