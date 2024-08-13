const questions = [
    ["What is the largest ocean on Earth?", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean", "none", 4],
    ["Which element has the chemical symbol 'Au'?", "Silver", "Gold", "Copper", "Iron", "none", 2],
    ["What is the hardest natural substance on Earth?", "Gold", "Iron", "Diamond", "Platinum", "none", 3],
    ["Who wrote '1984'?", "George Orwell", "Aldous Huxley", "J.K. Rowling", "Ernest Hemingway", "none", 1],
    ["Which planet is known as the Red Planet?", "Mars", "Venus", "Saturn", "Jupiter", "none", 1],
    ["What is the capital of Canada?", "Toronto", "Vancouver", "Montreal", "Ottawa", "none", 4],
    ["Who painted the Mona Lisa?", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet", "none", 3],
    ["What is the largest planet in our solar system?", "Earth", "Mars", "Jupiter", "Saturn", "none", 3],
    ["Which country is the birthplace of the Olympic Games?", "Italy", "Greece", "Egypt", "China", "none", 2],
    ["What is the smallest unit of life that can replicate independently?", "Tissue", "Organ", "Cell", "Virus", "none", 3]
];

const levels = [1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000, 160000, 320000];
let money = 0;
let currentQuestion = 0;
let shuffledQuestions = [];

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-button');
const actionsContainer = document.getElementById('actions');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    const question = shuffledQuestions[currentQuestion];
    questionElement.innerHTML = `<strong>Question for Rs. ${levels[currentQuestion]}</strong><br>${question[0]}`;
    
    optionsContainer.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = question[i];
        optionDiv.setAttribute('data-option', i);
        optionDiv.addEventListener('click', () => checkAnswer(i));
        optionsContainer.appendChild(optionDiv);
    }
}

function checkAnswer(selectedOption) {
    const question = shuffledQuestions[currentQuestion];
    const correctOption = question[6];

    if (selectedOption === correctOption) {
        money = levels[currentQuestion];
        resultElement.innerHTML = `<span class="winning-animation">Correct answer! You earned Rs. ${money}</span>`;
        setTimeout(() => {
            resultElement.innerHTML = '';
            currentQuestion++;
            if (currentQuestion < shuffledQuestions.length) {
                loadQuestion();
            } else {
                resultElement.innerHTML = `<span class="win-message">Congratulations! You've completed the quiz.</span><br><span class="win-amount">You take Rs. ${money} to home.</span>`;
                actionsContainer.style.display = 'flex';
                optionsContainer.style.display = 'none';
                questionElement.style.display = 'none';
            }
        }, 2000);
    } else {
        optionsContainer.style.display = 'none';
        questionElement.style.display = 'none';
        resultElement.innerHTML = `<span class="winning-animation">Wrong answer! You earned Rs. ${money}. Reloading from the beginning.</span>`;
        setTimeout(() => {
            resultElement.innerHTML = '';
            actionsContainer.style.display = 'flex';
            restartButton.style.display = 'block';
        }, 2000);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    money = 0;
    shuffledQuestions = [...questions];
    shuffleArray(shuffledQuestions);
    actionsContainer.style.display = 'none';
    optionsContainer.style.display = 'grid'; // Ensure options are displayed as a grid
    questionElement.style.display = 'block'; // Ensure question is displayed
    restartButton.style.display = 'none';
    loadQuestion();
}

restartButton.addEventListener('click', resetQuiz);

resetQuiz(); // Initialize the quiz on page load
