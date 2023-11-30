var x="https://www.themealdb.com/api/json/v1/1/search.php?s=beans"
var y = "https://www.themealdb.com/api/json/v1/1/random.php"
var searchBar= document.getElementById("searchBar")
function formInput(){
    
    fetch(x)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data)})
    }
    formInput()

function getInput(event){
    event.preventDefault
    var q=searchBar.value
    console.log(q)
}
    
