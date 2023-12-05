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

//Checkbox filters

    let checkVegetarian = document.getElementById("vegetarian");
    let checkVegan = document.getElementById("vegan");

    let categoriesArr = [
                            "Beef", 
                            "Chicken", 
                            "Dessert", 
                            "Lamb", 
                            "Miscellaneous", 
                            "Pasta",
                            "Pork",
                            "SeaFood",
                            "Side",
                            "Starter",
                            "Vegan",
                            "Vegetarian",
                            "Breakfast",
                            "Goat"
                        ];

    let chosenCategories = [];
    let spliceByIndex;

    //function to remove an element from an array based on its name
    const removeByValue = (arr, value) => {
        let indexOf = arr.indexOf(value);
    
        for(i=0; i<arr.length; i++) {
            if(value == arr[i]) {
                console.log(`value: ${value} arr[i]: ${arr[i]}`);
                spliceByIndex = arr.splice(indexOf, 1);
                //console.log(`Spliced value: ${spliceByIndex}`);

            }
        }
        
        console.log(`Array values: ${arr}`);
        return arr   
    };

    //function to add an element to an array
    const addByValue = (arr, value) => {
    
        //checking value is not already in array before pushing
        if(arr.includes(value) != true) {
            arr.push(value);
            console.log(`Pushed value: ${value}`);

        }

        //removes element from array of chosen categories
        removeByValue(chosenCategories, value);
        

        console.log(`Your chosen categories are now: ${chosenCategories}`);

        console.log(`Array values: ${arr}`);
        return arr   
    };

    //--------------------------------------EVENT LISTENERS------------------------------------------------

    //checkbox eventListener
    checkVegetarian.addEventListener('click', function () {

        fetch(lookUpURL)
            .then(function (response) {
                return response.json();

            }).then(function (data) {
                console.log(data)
                //console.log(data.categories);
                if(checkVegetarian.value == "true") {
                    checkVegetarian.value = "false";
                    console.log(`check is now false!`);

                    //function call to add value to array
                    addByValue(categoriesArr, "Vegetarian");

                    

                } else if (checkVegetarian.value == "false") {
                    checkVegetarian.value = "true";
                    console.log(`check is now true!`);

                    //function call to remove value from array
                    removeByValue(categoriesArr, "Vegetarian");

                    chosenCategories.push(spliceByIndex);
                    console.log(`Your chosen categories are now: ${chosenCategories}`);

                }
            })
        });


//MAIN SEARCH BUTTON.

buttonSearchMain.addEventListener('click', function () {

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
        console.log(data)
        //Function to pull a different recipe if more than 1 is returned from API.
        function getRandomArray(array) {
            for (i = 0; i < data.meals.length; i++) {

                //TODO: SHOULD ONLY CALL ASSIGNED STRCATEGORIES (IE VEGETARIAN) 
                var randomArray = Math.floor(Math.random() * array.length);
                return array[randomArray];
            }
        }

        var dish = getRandomArray(data.meals);
        const dishCategory = dish.strCategory;

        //checking if any filters are being used
        if(chosenCategories.length != 0) {
            if(chosenCategories.includes(dishCategory) == false) {

                //console.log(`chosenCategories length is ${chosenCategories.length}!`)
                console.log(`this dish is a ${dishCategory} dish.`)
                //function is called until meal with category within chosenCategories is found
                getRandomArray(data.meals);
            }
        } else {
            console.log(`Outside of if block. No filters should be being used.`)
        }
        


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

