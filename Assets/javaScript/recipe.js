var buttonSearchMain = document.getElementById('mainInput');
var buttonSearchSecondary = document.getElementById('secondaryInput');
var mainSeachBar = document.getElementById('main-search');
var goSearchButtonMain=document.getElementById("main-btn")
var goSearchButton2nd=document.getElementById("secondary-btn")
var userSearchMain = "";
var userSearchSecondary = "";


var apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="
var y = "https://www.themealdb.com/api/json/v1/1/random.php"
var queryURL;



//MAIN SEARCH BUTTON.

buttonSearchMain.addEventListener('click', function () {

    document.getElementById('main-content').setAttribute('class', 'show');

    console.log('main button works');
    buttonSearchMain.setAttribute('class', 'hide');
    var userSearchMain = buttonSearchMain.value
    console.log(userSearchMain);

    if (userSearchMain == '') {

    }

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


            document.getElementById("instructions").textContent = dish.strInstructions;;
            document.getElementById("recipe-name").textContent = dish.strMeal;
            document.getElementById("image").setAttribute('src', dish.strMealThumb);


            //Function to get ingredients.
            var ingredientsArray = Object.keys(dish)
                .filter(key => key.startsWith('strIngredient'))
                .map(key => dish[key])
                .filter(ingredient => ingredient.trim() !== '');
            console.log(ingredientsArray);

            for (var i = 0; i < ingredientsArray.length; i++) {

                var ListEl = document.querySelector('#ingredients');

                var ingredient = ingredientsArray[i];


                var li = document.createElement("li");
                li.textContent = ingredient;
                li.setAttribute('class', 'ingredients');
                ListEl.appendChild(li);


            }






        })





});


//SEARCH BUTTON ON THE TOP RIGHT HAND CORNER.

goSearchButton2nd.addEventListener('click', function (event) {

    event.preventDefault()
    console.log('secondary button works');
    buttonSearchSecondary.value
    console.log(buttonSearchSecondary);
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
goSearchButtonMain.addEventListener("click",test )
goSearchButton2nd.addEventListener("click",test)

// buttonSearchMain.addEventListener('click', renderFavouriteRecipeButton)

function test(){
var userSearchMain = buttonSearchMain.value;
var userSearchSecondary=buttonSearchSecondary.value;
favouriteRecipe.push(userSearchMain||userSearchSecondary)
console.log(userSearchMain)
renderFavouriteRecipeButton();
console.log(favouriteRecipe)
}

