// ✿◠‿◠💖 Quiz Questions
const quizes = [
        {
          question: "Which country has the largest number of time zones in the world (including overseas territories)?",
          answer: "France",
          selections: ["Russia", "France", "United States"],
        },
        {
          question: "What is the only sea in the world with no coastline?",
          answer: "Sargasso Sea",
          selections: ["Sargasso Sea", "Philippine Sea", "Coral Sea"],
        },
        {
          question: "Which country is home to the world’s northernmost capital city?",
          answer: "Iceland",
          selections: ["Norway", "Iceland", "Canada"],
        },
        {
          question: "The Danakil Depression, one of the hottest places on Earth, is located in which country?",
          answer: "Ethiopia",
          selections: ["Ethiopia", "Djibouti", "Sudan"],
        },
        {
          question: "Which river crosses the equator twice?",
          answer: "Congo River",
          selections: ["Amazon River", "Congo River", "Nile River"],
        },
        {
          question: "What is the highest mountain outside of Asia?",
          answer: "Aconcagua",
          selections: ["Denali", "Aconcagua", "Kilimanjaro"],
        },
        {
          question: "Which country has the southernmost permanently inhabited settlement in the world?",
          answer: "Chile",
          selections: ["Argentina", "Chile", "New Zealand"],
        },
        {
          question: "Which desert is the coldest desert on Earth?",
          answer: "Antarctic Desert",
          selections: ["Gobi Desert", "Antarctic Desert", "Patagonian Desert"],
        },
        {
          question: "Which strait separates Asia from North America?",
          answer: "Bering Strait",
          selections: ["Bering Strait", "Davis Strait", "Cook Strait"],
        },
        {
          question: "Which landlocked country has the most lakes in the world?",
          answer: "Kazakhstan",
          selections: ["Kazakhstan", "Mongolia", "Bolivia"],
        },
];


// (｡•́‿•̀｡)🌺 GET HTML ELEMENTS
const progressBar = document.getElementById("progressBar");
const progress = document.querySelector('.progress');
const timer = document.querySelector('#timeDisplay');
const questionCard = document.querySelector('.question-card');
const optionsDiv = document.querySelector('#options');
const feedback = document.querySelector('.feedback');
const nextBtn = document.querySelector('#nextBtn');
const left = document.querySelector('#left');

// (⁄⁄>‿<⁄⁄)💗 GAME STATE VARIABLES
let intervalId;
let timeLeft;
let currentIndex = 0; 
let point = 0;

// (⌒‿⌒)⏳ INITIAL TIMER TEXT
timer.textContent = `Time Left: ${timeLeft}s`;

// (≧▽≦)✨ START TIMER FUNCTION
function startTimer() {
    timer.textContent = `Time Left: ${timeLeft}s`;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        timeLeft--;
        timer.textContent = `Time Left: ${timeLeft}s`;
        progressBar.style.transform = `scaleX(${timeLeft/10})`;

        if (timeLeft <= 0) {
            clearInterval(intervalId);
            disableOptionButtons(true);
            timer.textContent = "Time's up";
            nextBtn.style.display = 'block';
        }
    }, 1000);
}

// \(❁´◡`❁\)🌼 CHECK ANSWER FUNCTION
function checkAnswer(selected, correct) {
    if (selected === correct) {
        point++;
        feedback.textContent = `Wow... you got it right!`;
    } else {
        feedback.textContent = `Not quite. The correct answer is ${correct}.`;
    }
    nextBtn.style.display = "block";
    disableOptionButtons(true);
    clearInterval(intervalId);
}

// (^o^)/🌷 LOAD QUESTION FUNCTION
function loadQuestion(index) {
    clearInterval(intervalId);
    timeLeft = 10;
    startTimer();
    
    const { question, answer, selections } = quizes[index];
    
    optionsDiv.innerHTML = "";
    feedback.textContent = "";
    nextBtn.style.display = 'none';
    progressBar.style.transform = `scaleX(${timeLeft/10})`;
    left.textContent = `${index+1}/${quizes.length}`;
    questionCard.textContent = question;

    // Create answer option buttons
    selections.forEach(opt => {
        const button = document.createElement('button');
        button.textContent = opt;
        button.addEventListener('click', () => checkAnswer(opt, answer));
        optionsDiv.appendChild(button);
    });
}

// (⊙_☉)💫 DISABLE OPTION BUTTONS FUNCTION
function disableOptionButtons(disable) {
    const allButtons = document.querySelectorAll('#options button');
    allButtons.forEach(btn => {
        btn.disabled = disable;
        btn.style.backgroundColor = "lightgray";
        btn.style.color = "gray";
    });
}

// (❀◕‿◕)👉 NEXT BUTTON CLICK LOGIC
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < quizes.length) {
        loadQuestion(currentIndex);
    } else {
        // End of quiz
        timer.textContent = "";
        optionsDiv.innerHTML = "";
        nextBtn.style.display = "none";
        feedback.textContent = "";
        questionCard.textContent = `Quiz finished. Your score was ${point} out of ${quizes.length}`;
        questionCard.style.color = "";
        progress.innerHTML = "";
        progress.style.backgroundColor = "transparent";
        clearInterval(intervalId);
    }
});

// 🌼 START THE FIRST QUESTION
loadQuestion(currentIndex);
