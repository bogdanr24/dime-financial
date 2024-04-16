// Modified by Shone Mathew, 4/12/24
// From Free Code Camp ChatGPT Course by AniaKubow, 4/19/2023
function insertText(text) {
    var inputBox = document.querySelector("input");
    inputBox.value = text;
}

function handleSubmit(event) {
    //Prevent default form of submission behavior
    event.preventDefault();
    //get value of textarea
    var userInput = document.getElementById("prompt").value;
    //do something with user input:
    console.log("User input:",userInput); 
    // Reset the textarea input to empty string
    document.getElementById("prompt").value = "";
}