var x="https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
var y = "https://www.themealdb.com/api/json/v1/1/random.php"
function formInput(){
    
    fetch(y)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data)})
    }
    formInput()