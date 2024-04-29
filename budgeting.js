const answers = {};
let currentQuestion = 1; 
const totalQuestions = 11; 

var animation = lottie.loadAnimation({
    container: document.getElementById('loading'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'loading.json' // the path to the animation json
});


async function displayResults(answers) {
    // Use the response from the GPT API
    // Displaying the response in the newly created 'gptResponse' element
    const gptResponse = await sendAnswersToGPT(answers);
        // Save the gpt response in local storage
        localStorage.setItem('gptResponse', gptResponse);
        // Display the response on the page
        displayResponse(gptResponse);
        // Display the pie chart
        pieChart(answers);
    }
    
    // Function to display the response on the page
    function displayResponse(response) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'gptResponse');
        newDiv.innerHTML = response;
        document.body.appendChild(newDiv);
    
        // Create a restart button
        const restartButton = document.createElement('button');
        newbutton.setAttribute('id', 'restartButton');
        restartButton.innerHTML = 'Restart';
        restartButton.addEventListener('click', function() {
            currentQuestion = 1;
        });
    }
    
    // Function to check if there is a saved response in local storage when the page loads if so load in the response
    window.addEventListener('load', function() {
        const savedResponse = localStorage.getItem('gptResponse');
        if (savedResponse) {
            displayResponse(savedResponse);
        }
    });
    
async function sendAnswersToGPT(answers) {
    document.getElementById('loading').style.height = '300px';
    animation.play();
    const prompt = JSON.stringify(answers);
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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" // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "assistant", content: `Based on these questions and answers provide me with some finacial advise. Be sure to adress this person as if you are talking to them. Net income is how muchthis person makes after taxes. Gross is before detucting the taxes. Mention their name and their specific stats they entered to make it seem like you took note of their information. ${prompt}`}],
                temperature: 0.7,
                max_tokens: 150,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0
            })
        });
        document.getElementById('loading').style.height = '0px';
        animation.stop();
        // Check if the API call was successful, if not throw an error code
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        return data.choices[0].message.content;
}


function goToNextQuestion() {
    const answerInput = document.getElementById(`question${currentQuestion}`);

    // Check if the answer is empty and alert the user if it is
    if (answerInput.value.trim() === '') {
        alert('Please answer the question before moving on');
        return; // Stop the function from proceeding further
    }

    const questionText = answerInput.previousElementSibling.textContent;

    // Save both the question and the answer in the answers object
    answers[`Question ${currentQuestion}`] = {
        question: questionText,
        answer: answerInput.value
    };

    answerInput.parentElement.style.display = 'none';

    if (currentQuestion < totalQuestions) {
        currentQuestion += 1;
        const nextQuestionInput = document.getElementById(`question${currentQuestion}`);
        if (nextQuestionInput) {
            nextQuestionInput.parentElement.style.display = 'block';
        }
    } else {
        console.log('All answers:', answers);
        document.getElementById('intro').innerHTML = 'Thanks for taking this survey, here are some suggestions based on your responses:';
        document.getElementById('nextQuestion').remove();
        displayResults(answers);
    }
}

for (let i = 2; i <= totalQuestions; i++) {
    const questionInput = document.getElementById(`question${i}`);
    if (questionInput && questionInput.parentElement) {
        questionInput.parentElement.style.display = 'none';
    }

}
async function pieChart(answers) {
    const dataValues = [
        parseFloat(answers[`Question 8`].answer),
        parseFloat(answers[`Question 9`].answer),
        parseFloat(answers[`Question 10`].answer),
        parseFloat(answers[`Question 11`].answer)
    ];
    var data = {
        labels: ["Food", "Rent/Mortgage", "Hobbies/Wants", "Investing"],
        datasets: [{
          data: dataValues,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#65bf4d"], // Colors for each category
        }]
      };
      
      // Get the context of the canvas element
      var ctx = document.getElementById("pieChart").getContext("2d");
    
      

      // Create a pie chart
      var pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        }
        }
      });
      
}
document.getElementById('nextQuestion').addEventListener('click', goToNextQuestion);

