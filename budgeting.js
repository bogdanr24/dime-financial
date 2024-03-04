document.addEventListener('DOMContentLoaded', function () {
    let currentQuestion = 1; // Start with the first question
    const totalQuestions = 11; // Total number of questions
    const answers = {}; // Object to store answers

    // Function to go to the next question
    function goToNextQuestion() {
        // Save the current answer
        const answerInput = document.getElementById(`question${currentQuestion}`);
        answers[`Question ${currentQuestion}`] = answerInput.value;

        // Hide the current question
        answerInput.parentElement.style.display = 'none';

        if (currentQuestion < totalQuestions) {
            // Show the next question
            currentQuestion += 1;
            const nextQuestionInput = document.getElementById(`question${currentQuestion}`);
            nextQuestionInput.parentElement.style.display = 'block';
        } else {
            // All questions answered, process the answers or show the results
            console.log('All answers:', answers);
            // Here you can call a function to create a pie chart and display recommendations
        }
    }

    // Initially, hide all questions except the first one
    for (let i = 2; i <= totalQuestions; i++) {
        const questionInput = document.getElementById(`question${i}`);
        if (questionInput && questionInput.parentElement) {
            questionInput.parentElement.style.display = 'none';
        }
    }

    // Add event listener to the button (make sure to have a button with an id 'nextQuestion')
    document.getElementById('nextQuestion').addEventListener('click', goToNextQuestion);

});
