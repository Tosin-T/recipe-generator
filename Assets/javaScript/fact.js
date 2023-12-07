var funTriviaButton = document.getElementById("fun-trivia-btn");
var funTriviaParagraph = document.getElementById("fun-trivia");
// var apiKey = "6e541e32e504436f9123d0aaa6b143a4";

funTriviaButton.addEventListener("click", function () {
    var apiKey = "6e541e32e504436f9123d0aaa6b143a4"; 
    var apiUrl = "https://api.spoonacular.com/food/trivia/random?apiKey=6e541e32e504436f9123d0aaa6b143a4";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the entire response to the console

            // Check if the trivia text property exists in the response
            const triviaText = data.text || "No food trivia available";

            // Display the trivia text
            funTriviaParagraph.textContent = triviaText;
        })
        .catch(error => {
            console.error("Error fetching food trivia:", error);
            // Optionally, display an error message to the user
            funTriviaParagraph.textContent = "Sorry, we couldn't fetch a fun food trivia at the moment.";
        });
});


