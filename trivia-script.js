const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome"
        },
        correctAnswer: "c"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: {
            a: "Harper Lee",
            b: "Jane Austen",
            c: "Mark Twain",
            d: "Ernest Hemingway"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: {
            a: "Earth",
            b: "Mars",
            c: "Mercury",
            d: "Venus"
        },
        correctAnswer: "c"
    }
];

function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    const output = [];
    
    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        
        output.push(
            `<div class="question"> <h3>${currentQuestion.question}</h3> </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });
    
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const quizContainer = document.getElementById('quiz');
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const resultsContainer = document.getElementById('results');
    let numCorrect = 0;
    
    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    
    resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
}

buildQuiz();
