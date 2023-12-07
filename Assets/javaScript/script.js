var buttonSearchMain = document.getElementById('main-btn');
var buttonSearchSecondary = document.getElementById('secondary-btn');
var mainSeachBar = document.getElementById('main-search');

var userSearchMain = "";
var userSearchSecondary = "";

//URL Minus dynamically generated SearchWord for recipe
var apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
//user Search to be added to apiURL
var queryURL;

//random API 
var randomURL = "https://www.themealdb.com/api/json/v1/1/random.php";
var categoriesURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
var lookUpURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";

//-----------------------------------------------------------------------------------------------------------

//Function taken from password generator challenge project. 
//This function is used onload in the body of the html to uncheck all checkboxes to prevent undesired behaviour.
const uncheckAll = () => { 
    let w = document.getElementsByTagName('input'); 

    for (var i = 0; i < w.length; i++) { 

        if (w[i].type=='radio') { 

            w[i].checked = false; 
            allDishes.checked = true;
        }
    }
} 


// //Checkbox filters
let allDishes = document.getElementById("allDishes");
let checkVegetarian = document.getElementById("vegetarian");
let checkMeatDishes = document.getElementById("meatDishes");


let dishType = "allDishes";

//--------------------------------------EVENT LISTENERS------------------------------------------------

//TODO: SAVE ALL CHECKBOXES TO VARIABLE. EVENT LISTENER SHOULD USE IF STATEMENTS TO SELECT CORRECT ID.

//checkbox eventListener

allDishes.addEventListener('click', function (event) {

    console.log(event.target.value)
    if(allDishes.value == "false") {
    
        allDishes.value = true;
        checkVegetarian.value = false;
        checkMeatDishes.value = false;
        
        dishType = "allDishes";
        console.log(`dishType: ${dishType}`);
    }
});

//Vegetarian only. Not DRY but for MVP purposes.
checkVegetarian.addEventListener('click', function (event) {

    console.log(event.target.value)
    if(checkVegetarian.value == "false") {
    
        checkVegetarian.value = true;
        checkMeatDishes.value = false;
        allDishes.value = false;
        
        dishType = "Vegetarian";
        console.log(`dishType: ${dishType}`);
    }
});


//MeatDishes only. Not DRY but for MVP purposes.
checkMeatDishes.addEventListener('click', function () {

    if(checkMeatDishes.value == "false") {

        checkMeatDishes.value = true;
        checkVegetarian.value = false;
        allDishes.value = false;

        dishType = "MeatDishes";
        console.log(`dishType: ${dishType}`);
    }
});



//-----------------------MAIN SEARCH BUTTON--------------------------------------------------------------------------
buttonSearchMain.addEventListener('click', function () {
console.log("I got clicked")

document.getElementById('main-content').setAttribute('class', 'show');

//console.log('main button works');
mainSeachBar.setAttribute('class', 'hide');
var userSearchMain = document.getElementById('mainInput').value;
//console.log(userSearchMain);

if (userSearchMain == '') {

}

queryURL = apiURL + userSearchMain;


fetch(queryURL)
    .then(function (response) {
        return response.json();

    }).then(function (data) {
        // console.log(data)

        let mealsData = data.meals;

        if (dishType == "allDishes") {
            console.log("all dishes selected");
    
        } else if (dishType == "Vegetarian") {
            console.log("Vegetarian Selected.");
            mealsData = data.meals.filter(foodCategory => foodCategory.strCategory === "Vegetarian" || foodCategory.strCategory === "Vegan");

        } else if (dishType == "MeatDishes") {
            console.log("Meat Dishes Selected");
            mealsData = data.meals.filter(foodCategory => foodCategory.strCategory === "Beef" || foodCategory.strCategory === "Chicken" || foodCategory.strCategory === "Lamb" || foodCategory.strCategory === "Pork" || foodCategory.strCategory === "Goat" || foodCategory.strCategory === "Seafood"); 

        } else {
            console.log("Error: check conditionals");
        }


        function getRandomArray(array) {
            for (i = 0; i < data.meals.length; i++) {

                var randomArray = Math.floor(Math.random() * array.length);
                return array[randomArray];
            }
        }
        
        var dish = getRandomArray(mealsData);
        console.log(mealsData)

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

buttonSearchSecondary.addEventListener('click', function () {


    console.log('secondary button works');
    var userSearchSecondary = document.getElementById("secondaryInput").value;
    console.log(userSearchSecondary);





});
