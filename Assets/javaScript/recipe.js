var specific ="https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
var random = "https://www.themealdb.com/api/json/v1/1/random.php"
var categories = "https://www.themealdb.com/api/json/v1/1/categories.php"


function formInput(){
    
    fetch(categories)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data)})
    }
    formInput()