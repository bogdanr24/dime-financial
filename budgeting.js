let currentQuestion = 1; 
const totalQuestions = 11; 
const answers = {}; 

function displayResults(answers) {

}

function goToNextQuestion() {
    const answerInput = document.getElementById(`question${currentQuestion}`);
    // Assuming the question text is in a <p> or <label> element just before the input field
    // You may need to adjust the selector based on your actual HTML structure
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
        displayResults(answers); // Make sure to pass the answers object to displayResults
    }
}
for (let i = 2; i <= totalQuestions; i++) {
    const questionInput = document.getElementById(`question${i}`);
    if (questionInput && questionInput.parentElement) {
        questionInput.parentElement.style.display = 'none';
    }

}

document.getElementById('nextQuestion').addEventListener('click', goToNextQuestion);


