var buttonSearchMain = document.getElementById('main-btn');
var buttonSearchSecondary = document.getElementById('secondary-btn');
var mainSeachBar = document.getElementById('main-search');
var favouriteButton = document.getElementById("favouriteButton");
var userSearchMain = "";
var userSearchSecondary = "";
var dishObject = {};
var newFavouriteButton = document.createElement("button");

var apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var y = "https://www.themealdb.com/api/json/v1/1/random.php";
var queryURL;

var favouriteRecipe = [];
var favouriteRecipeListID = document.getElementById("favoritesList");
// Load favourite buttons on loading
document.addEventListener("DOMContentLoaded", LoadingFavourite);

function LoadingFavourite() {
  var storedFavourites = localStorage.getItem("Favourite Recipes");
  if (storedFavourites) {
    favouriteRecipe = JSON.parse(storedFavourites);
    if (favouriteRecipe.length > 0) {
      renderFavouriteRecipeButtonpreload();
    }
  }
}

// Fav button function
newFavouriteButton.addEventListener("click", callFavourite);

// MAIN SEARCH BUTTON.
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
    })
    .then(function (data) {
      function getRandomArray(array) {
        for (i = 0; i < data.meals.length; i++) {
          var randomArray = Math.floor(Math.random() * array.length);
          return array[randomArray];
        }
      }

      var dish = getRandomArray(data.meals);

      dishObject.id = dish.idMeal;
      dishObject.recipeName = dish.strMeal;

      document.getElementById("instructions").textContent = dish.strInstructions;
      var RandomMealname = document.getElementById("recipe-name").textContent = dish.strMeal;
      document.getElementById("image").setAttribute('src', dish.strMealThumb);

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

      var measureArray = Object.keys(dish)
        .filter(key => key.startsWith('strMeasure'))
        .map(key => dish[key])
        .filter(measure => measure !== '')
        .filter(measure => measure !== null);

      for (var x = 0; x < measureArray.length; x++) {
        var ListElementMeasure = document.querySelector('#measure');
        var measure = measureArray[x];
        var li2 = document.createElement("li");
        li2.textContent = measure;
        li2.setAttribute('class', 'measure');
        ListElementMeasure.appendChild(li2);
      }
    });
}

// SEARCH BUTTON ON THE TOP RIGHT-HAND CORNER.
buttonSearchSecondary.addEventListener('click', function (event) {
  event.preventDefault();
  PresentContent();
  console.log('secondary button works');
});

// Create button feature
var favouriteRecipe = [];

function renderFavouriteRecipeButton() {
  if (!localStorage.getItem("Favourite Recipes")) {
    localStorage.setItem("Favourite Recipes", JSON.stringify([]));
  }

  var storedFavourites = JSON.parse(localStorage.getItem("Favourite Recipes"));

  storedFavourites.push(dishObject);
  localStorage.setItem("Favourite Recipes", JSON.stringify(storedFavourites));

  favouriteRecipeListID.innerHTML = '';

  for (i = 0; i < storedFavourites.length; i++) {
    const recipe = storedFavourites[i];
    console.log(recipe);
    var favouriteButton = document.createElement("button");
    favouriteButton.classList.add("recipies");
    favouriteButton.setAttribute("data-recipeId", recipe.id);
    favouriteButton.textContent = recipe.recipeName;
    favouriteRecipeListID.append(favouriteButton);

    favouriteButton.addEventListener("click", callFavourite);
  }
}

function renderFavouriteRecipeButtonpreload() {
  localStorage.setItem("Favourite Recipes", JSON.stringify(favouriteRecipe));
  console.log(favouriteRecipe);
  favouriteRecipeListID.innerHTML = '';

  for (i = 0; i < favouriteRecipe.length; i++) {
    const recipe = favouriteRecipe[i];
    console.log(recipe);
    var newFavouriteButton = document.createElement("button");
    newFavouriteButton.classList.add("recipies");
    newFavouriteButton.setAttribute("data-recipeId", recipe.id);
    newFavouriteButton.textContent = recipe.recipeName;
    favouriteRecipeListID.append(newFavouriteButton);

    newFavouriteButton.addEventListener("click", callFavourite);
  }
}

// Fav button function
favouriteButton.addEventListener('click', function () {
  renderFavouriteRecipeButton();
});

// GET RANDOM MEAL BUTTON
var getRandomMeal = document.getElementById("get-meal");

getRandomMeal.addEventListener('click', function (event) {
  event.preventDefault();
  mainSeachBar.setAttribute('class', 'hide');

  document.getElementById('main-content').setAttribute('class', 'show');
  fetch(y)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dish = data.meals[0];
      console.log(dish);
      document.getElementById("instructions").textContent = dish.strInstructions;
      document.getElementById("recipe-name").textContent = dish.strMeal;
      document.getElementById("image").setAttribute('src', dish.strMealThumb);

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

      var measureArray = Object.keys(dish)
        .filter(key => key.startsWith('strMeasure'))
        .map(key => dish[key])
        .filter(measure => measure !== '')
        .filter(measure => measure !== null);

      for (var x = 0; x < measureArray.length; x++) {
        var ListElementMeasure = document.querySelector('#measure');
        var measure = measureArray[x];
        var li2 = document.createElement("li");
        li2.textContent = measure;
        li2.setAttribute('class', 'measure');
        ListElementMeasure.appendChild(li2);
      }
    });
});

function callFavourite() {
  var mealID = this.getAttribute("data-recipeId");
  var querryurlSearch = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

  var querryurlcallback = querryurlSearch + mealID;
  console.log(querryurlcallback);

  fetch(querryurlcallback)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var dish = data.meals[0];
      console.log(dish);
      document.getElementById("instructions").textContent = dish.strInstructions;
      document.getElementById("recipe-name").textContent = dish.strMeal;
      document.getElementById("image").setAttribute('src', dish.strMealThumb);

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

      var measureArray = Object.keys(dish)
        .filter(key => key.startsWith('strMeasure'))
        .map(key => dish[key])
        .filter(measure => measure !== '')
        .filter(measure => measure !== null);

      for (var x = 0; x < measureArray.length; x++) {
        var ListElementMeasure = document.querySelector('#measure');
        var measure = measureArray[x];
        var li2 = document.createElement("li");
        li2.textContent = measure;
        li2.setAttribute('class', 'measure');
        ListElementMeasure.appendChild(li2);
      }
    });
}
