var buttonSearchMain = document.getElementById('main-btn');
var buttonSearchSecondary = document.getElementById('secondary-btn');
var mainSeachBar = document.getElementById('main-search');

var userSearchMain = "";
var userSearchSecondary = "";


var apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="
var y = "https://www.themealdb.com/api/json/v1/1/random.php"
var queryURL;



//MAIN SEARCH BUTTON.

buttonSearchMain.addEventListener('click', function () {
   
    console.log('main button works');
    mainSeachBar.setAttribute('class', 'hide');
    var userSearchMain = document.getElementById('mainInput').value;
    console.log(userSearchMain);

    queryURL = apiURL + userSearchMain;

    fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                
                 function getRandomArray(array) {
                    for (i = 0; i < data.meals.length; i++) {
                     var randomArray = Math.floor(Math.random() * array.length);
                     return array[randomArray];
                 }}

                var dish= getRandomArray(data.meals);

            

                console.log(dish);})

    



});


//SEARCH BUTTON ON THE TOP RIGHT HAND CORNER.

buttonSearchSecondary.addEventListener('click', function (event) {

    event.preventDefault()
    console.log('secondary button works');
    var userSearchSecondary = document.getElementById("secondaryInput").value;
    console.log(userSearchSecondary);





});

// create button feature
var favouriteRecipe=[]
var favouriteRecipeListID= document.getElementById("favoritesList")

function renderFavouriteRecipeButton(){
favouriteRecipeListID.innerHTML=''

for (i=0;i<favouriteRecipe.length;i++){
    var favouriteButton= document.createElement("button")
favouriteButton.classList.add("recipies")
favouriteButton.setAttribute("data-recipeName",favouriteRecipe[i]);
favouriteButton.textContent=favouriteRecipe[i]
favouriteRecipeListID.append(favouriteButton)

}
}
// buttonSearchMain.addEventListener("click",test )
buttonSearchSecondary.addEventListener("click",test )

// buttonSearchMain.addEventListener('click', renderFavouriteRecipeButton)

function test(){
var userSearchMain = document.getElementById('mainInput').value;
var userSearchSecondary=document.getElementById('secondaryInput').value;
favouriteRecipe.push(userSearchMain||userSearchSecondary)
console.log(userSearchMain)
renderFavouriteRecipeButton();
console.log(favouriteRecipe)
}

