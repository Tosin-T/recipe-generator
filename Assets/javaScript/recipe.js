var buttonSearchMain = document.getElementById('main-btn');
var buttonSearchSecondary = document.getElementById('secondary-btn');
var mainSeachBar = document.getElementById('main-search');
var favouriteButton=document.getElementById("favouriteButton")
var favourites= document.getElementsByClassName("recipies")
var userSearchMain = "";
var userSearchSecondary = "";
var dishObject={}
var newFavouriteButton= document.createElement("button")



var apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="
var y = "https://www.themealdb.com/api/json/v1/1/random.php"
var queryURL;


// load favourite buttons on loading 
document.addEventListener("DOMContentLoaded", LoadingFavourite)

function LoadingFavourite(){
    var storedFavourites = localStorage.getItem("Favourite Recipes")
    if (storedFavourites){
favouriteRecipe=JSON.parse(storedFavourites)
        if (favouriteRecipe.length>0){
            renderFavouriteRecipeButtonpreload()
        }

    }
}
// Fav button function
newFavouriteButton.addEventListener("click", callFavourite)
//MAIN SEARCH BUTTON.

buttonSearchMain.addEventListener('click', PresentContent);


    function PresentContent() {
        
    
    document.getElementById('main-content').setAttribute('class', 'show');

    console.log('main button works');
    mainSeachBar.setAttribute('class', 'hide');
    var userSearchMain = document.getElementById('mainInput').value;
    console.log(userSearchMain);

    

    queryURL = apiURL + userSearchMain;



    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {

            //Function to pull a different recipe if more than 1 is returned from API.
            function getRandomArray(array) {
                for (i = 0; i < data.meals.length; i++) {
                    var randomArray = Math.floor(Math.random() * array.length);
                    return array[randomArray];
                }
            }
           
            var dish = getRandomArray(data.meals);

            dishObject.id= dish.idMeal,
            dishObject.recipeName=dish.strMeal
            
console.log(dishObject)



            document.getElementById("instructions").textContent = dish.strInstructions;;
            var RandomMealname=document.getElementById("recipe-name").textContent = dish.strMeal;
            document.getElementById("image").setAttribute('src', dish.strMealThumb);


console.log(data)

            //Function to get ingredients.
            var ingredientsArray = Object.keys(dish)
                .filter(key => key.startsWith('strIngredient'))
                .map(key => dish[key])
                .filter(ingredient => ingredient !== '')
                .filter(ingredient => ingredient !== null);
            

            for (var i = 0; i < ingredientsArray.length; i++) {

                var ListEl = document.querySelector('#ingredients');

                var ingredient = ingredientsArray[i];


                var li = document.createElement("li");
                li.textContent = ingredient;
                li.setAttribute('class', 'ingredients');
                ListEl.appendChild(li);


            }

            //Function to get measures.
            var measureArray = Object.keys(dish)
            .filter(key => key.startsWith('strMeasure'))
            .map(key => dish[key])
            .filter(measure =>measure !=='')
            .filter(measure => measure !== null);


            for (var x = 0; x < measureArray.length; x++) {
                
                var ListElementMeasure =document.querySelector ('#measure');
                var measure = measureArray[x];
                var li2 = document.createElement("li");
                li2.textContent = measure;
                li2.setAttribute('class', 'measure');
                ListElementMeasure.appendChild(li2);




            }





        })





}; 
 function displayCopy(){
    var dish = data.meals;

    document.getElementById("instructions").textContent = dish.strInstructions;;
    var RandomMealname=document.getElementById("recipe-name").textContent = dish.strMeal;
    document.getElementById("image").setAttribute('src', dish.strMealThumb);


console.log(data)

    //Function to get ingredients.
    var ingredientsArray = Object.keys(dish)
        .filter(key => key.startsWith('strIngredient'))
        .map(key => dish[key])
        .filter(ingredient => ingredient !== '')
        .filter(ingredient => ingredient !== null);
    

    for (var i = 0; i < ingredientsArray.length; i++) {

        var ListEl = document.querySelector('#ingredients');

        var ingredient = ingredientsArray[i];


        var li = document.createElement("li");
        li.textContent = ingredient;
        li.setAttribute('class', 'ingredients');
        ListEl.appendChild(li);


    }

    //Function to get measures.
    var measureArray = Object.keys(dish)
    .filter(key => key.startsWith('strMeasure'))
    .map(key => dish[key])
    .filter(measure =>measure !=='')
    .filter(measure => measure !== null);


    for (var x = 0; x < measureArray.length; x++) {
        
        var ListElementMeasure =document.querySelector ('#measure');
        var measure = measureArray[x];
        var li2 = document.createElement("li");
        li2.textContent = measure;
        li2.setAttribute('class', 'measure');
        ListElementMeasure.appendChild(li2);




    }





}



 



// create button feature
var favouriteRecipe=[]
var favouriteRecipeListID= document.getElementById("favoritesList")

function renderFavouriteRecipeButton(){
    favouriteRecipe.push(dishObject)
localStorage.setItem("Favourite Recipes", JSON.stringify(favouriteRecipe))    
console.log(favouriteRecipe)
favouriteRecipeListID.innerHTML=''

for (i=0;i<favouriteRecipe.length;i++){
    const recipe=favouriteRecipe[i]
    console.log(recipe)
    var favouriteButton= document.createElement("button")
favouriteButton.classList.add("recipies")
favouriteButton.setAttribute("data-recipeId",recipe.id);
favouriteButton.textContent=recipe.recipeName
favouriteRecipeListID.append(favouriteButton)
}
}

function renderFavouriteRecipeButtonpreload(){
    
localStorage.setItem("Favourite Recipes", JSON.stringify(favouriteRecipe))    
console.log(favouriteRecipe)
favouriteRecipeListID.innerHTML=''

for (i=0;i<favouriteRecipe.length;i++){
    const recipe=favouriteRecipe[i]
    console.log(recipe)
    var newFavouriteButton= document.createElement("button")
newFavouriteButton.classList.add("recipies")
newFavouriteButton.setAttribute("data-recipeId",recipe.id);
newFavouriteButton.textContent=recipe.recipeName
favouriteRecipeListID.append(newFavouriteButton)

newFavouriteButton.addEventListener("click", callFavourite)
}
}
// buttonSearchMain.addEventListener("click",test )
favouriteButton.addEventListener('click', function() {
    renderFavouriteRecipeButton();
});



    // GET RANDOM MEAL BUTTON

var getRandomMeal= document.getElementById("get-meal"); 

getRandomMeal.addEventListener('click', function (event) {
    event.preventDefault();
    mainSeachBar.setAttribute('class', 'hide');


document.getElementById('main-content').setAttribute('class', 'show');
    fetch(y)
        .then(function (response) {
            return response.json();
        }).then(function (data) {

            var dish = data.meals[0];

            console.log(dish);
            document.getElementById("instructions").textContent = dish.strInstructions;
            document.getElementById("recipe-name").textContent = dish.strMeal;
            document.getElementById("image").setAttribute('src', dish.strMealThumb);
           
            //Function to get ingredients.
            var ingredientsArray = Object.keys(dish)
                .filter(key => key.startsWith('strIngredient'))
                .map(key => dish[key])
                .filter(ingredient => ingredient !== '')
                .filter(ingredient => ingredient !== null);
            

            for (var i = 0; i < ingredientsArray.length; i++) {

                var ListEl = document.querySelector('#ingredients');

                var ingredient = ingredientsArray[i];


                var li = document.createElement("li");
                li.textContent = ingredient;
                li.setAttribute('class', 'ingredients');
                ListEl.appendChild(li);


            }

            //Function to get measures.
            var measureArray = Object.keys(dish)
            .filter(key => key.startsWith('strMeasure'))
            .map(key => dish[key])
            .filter(measure =>measure !=='')
            .filter(measure => measure !== null);


            for (var x = 0; x < measureArray.length; x++) {
                
                var ListElementMeasure =document.querySelector ('#measure');
                var measure = measureArray[x];
                var li2 = document.createElement("li");
                li2.textContent = measure;
                li2.setAttribute('class', 'measure');
                ListElementMeasure.appendChild(li2);




            }


        
            
        })
 });

function callFavourite(){
  
    var mealID= this.getAttribute("data-recipeId")
    var querryurlSearch="https://www.themealdb.com/api/json/v1/1/lookup.php?i="
    var querryurlcallback=querryurlSearch+mealID
    console.log(querryurlcallback)
    fetch(querryurlcallback)
           .then(function (response) {
               return response.json();
           }).then(function (data) {
            console.log(data) 
            var dish = data.meals[0];
            console.log(dish);
            document.getElementById("instructions").textContent = dish.strInstructions;
            document.getElementById("recipe-name").textContent = dish.strMeal;
            document.getElementById("image").setAttribute('src', dish.strMealThumb);
            //Function to get ingredients.
            var ingredientsArray = Object.keys(dish)
                .filter(key => key.startsWith('strIngredient'))
                .map(key => dish[key])
                .filter(ingredient => ingredient !== '')
                .filter(ingredient => ingredient !== null);
            for (var i = 0; i < ingredientsArray.length; i++) {
                var ListEl = document.querySelector('#ingredients');
                var ingredient = ingredientsArray[i];
                var li = document.createElement("li");
                li.textContent = ingredient;
                li.setAttribute('class', 'ingredients');
                ListEl.appendChild(li);
            }
            //Function to get measures.
            var measureArray = Object.keys(dish)
            .filter(key => key.startsWith('strMeasure'))
            .map(key => dish[key])
            .filter(measure =>measure !=='')
            .filter(measure => measure !== null);
            for (var x = 0; x < measureArray.length; x++) {
                var ListElementMeasure =document.querySelector ('#measure');
                var measure = measureArray[x];
                var li2 = document.createElement("li");
                li2.textContent = measure;
                li2.setAttribute('class', 'measure');
                ListElementMeasure.appendChild(li2);
            }
        })
           }
           
