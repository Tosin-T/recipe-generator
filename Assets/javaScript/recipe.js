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

//-----------------------------------------------------------------------------------------------------------

//Checkbox filters

    let checkVegetarian = document.getElementById("vegetarian");
    let checkVegan = document.getElementById("vegan");

    let arrOfCategories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    //console.log(checkVegetarian.value)

    checkVegetarian.addEventListener('click', function () {
        fetch(categoriesURL)
            .then(function (response) {
                return response.json();

            }).then(function (data) {
                //console.log(data.categories);
                if(checkVegetarian.value == "true") {
                    checkVegetarian.value = "false";
                    console.log(`check is now false!`)

                } else if (checkVegetarian.value == "false") {
                    checkVegetarian.value = "true";
                    console.log(`check is now true!`)

                }
            })
        })


//MAIN SEARCH BUTTON.

buttonSearchMain.addEventListener('click', function () {

    document.getElementById('main-content').setAttribute('class', 'show');

    console.log('main button works');
    mainSeachBar.setAttribute('class', 'hide');
    var userSearchMain = document.getElementById('mainInput').value;
    console.log(userSearchMain);

    if (userSearchMain == '') {

    }

    queryURL = apiURL + userSearchMain;


    // fetch(queryURL)
    //     .then(function (response) {
    //         return response.json();
    //     }).then(function (data) {

    //         //Function to pull a different recipe if more than 1 is returned from API.
    //         function getRandomArray(array) {
    //             for (i = 0; i < data.meals.length; i++) {
    //                 var randomArray = Math.floor(Math.random() * array.length);
    //                 return array[randomArray];
    //             }
    //         }

    //         var dish = getRandomArray(data.meals);


    //         document.getElementById("instructions").textContent = dish.strInstructions;;
    //         document.getElementById("recipe-name").textContent = dish.strMeal;
    //         document.getElementById("image").setAttribute('src', dish.strMealThumb);


    //         //Function to get ingredients.
    //         var ingredientsArray = Object.keys(dish)
    //             .filter(key => key.startsWith('strIngredient'))
    //             .map(key => dish[key])
    //             .filter(ingredient => ingredient.trim() !== '');
    //         console.log(ingredientsArray);

    //         for (var i = 0; i < ingredientsArray.length; i++) {

    //             var ListEl = document.querySelector('#ingredients');

    //             var ingredient = ingredientsArray[i];


    //             var li = document.createElement("li");
    //             li.textContent = ingredient;
    //             li.setAttribute('class', 'ingredients');
    //             ListEl.appendChild(li);

    //         }

    //     })

});


//SEARCH BUTTON ON THE TOP RIGHT HAND CORNER.

buttonSearchSecondary.addEventListener('click', function () {


    console.log('secondary button works');
    var userSearchSecondary = document.getElementById("secondaryInput").value;
    console.log(userSearchSecondary);





});

