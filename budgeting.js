let currentQuestion = 1; 
const totalQuestions = 11; 
const answers = {}; 

async function displayResults(answers) {
    // Create a new div element to store responses from the GPT API
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'gptResponse');
    // Append the new div to the document body
    document.body.appendChild(newDiv);
    // Call the sendAnswersToGPT function with the answers object
    const gptResponse = await sendAnswersToGPT(answers);
    // Use the response from the GPT API
    // Displaying the response in the newly created 'gptResponse' element
    newDiv.innerHTML = gptResponse;
}
async function sendAnswersToGPT(answers) {
    const prompt = JSON.stringify(answers);
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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" // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "assistant", content: `Based on these questions and answers provide me with some finacial advise. Be sure to mention this person's name and their specific stats to make it seem like you took note of their information. ${prompt}`}],
                temperature: 0.7,
                max_tokens: 150,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0
            })
        });
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
        nextQuestionInput.parentElement.style.display = 'block';
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

document.getElementById('nextQuestion').addEventListener('click', goToNextQuestion);


