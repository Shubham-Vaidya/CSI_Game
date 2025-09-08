// === Quiz Data: Teacher edits this array ===
const questions = [
  {
    question: "What is Ohm's Law formula?",
    answer: "V=IR"
  },
  {
    question: "Name the process of joining metals using heat.",
    answer: "welding"
  },
  {
    question: "What does CPU stand for?",
    answer: "central processing unit"
  }
];

// On page load
document.addEventListener('DOMContentLoaded', () => {
  const savedIndex = localStorage.getItem('quiz-index');

  if (savedIndex !== null && parseInt(savedIndex, 10) < questions.length) {
    showQuizPage(parseInt(savedIndex, 10));
  } else {
    showWelcomePage();
  }
});

// Display welcome page with start button
function showWelcomePage() {
  document.body.innerHTML = `
    <div class="welcome-container">
      <h1>Welcome, First Year Engineers!</h1>
      <p class="tagline">Embark on the Treasure Hunt and Challenge Your Wits!</p>
      <button id="startQuiz">Start the Quiz</button>
    </div>
  `;

  document.getElementById('startQuiz').addEventListener('click', () => {
    localStorage.removeItem('quiz-index'); // clear any old progress
    showQuizPage(0); // start fresh
  });
}

// Show quiz page starting at given question index
function showQuizPage(startIndex = 0) {
  document.body.innerHTML = `
    <div class="quiz-container">
      <h2 id="quizTitle">Treasure Hunt Quiz</h2>
      <div id="questionArea"></div>
      <input type="text" id="answerInput" autocomplete="off" placeholder="Type your answer here...">
      <div class="feedback" id="feedback"></div>
      <button id="nextBtn">Submit</button>
    </div>
  `;

  let current = startIndex;

  showQuestion(current);

  document.getElementById('nextBtn').addEventListener('click', () => {
    const input = document.getElementById('answerInput').value.trim().toLowerCase();
    const correct = questions[current].answer.toLowerCase();

    if (input === correct) {
      document.getElementById('feedback').textContent = "";
      current++;
      localStorage.setItem('quiz-index', current);

      if (current < questions.length) {
        showQuestion(current);
        document.getElementById('answerInput').value = "";
      } else {
        localStorage.removeItem('quiz-index'); // clear progress on completion
        document.getElementById('questionArea').innerHTML = `<h3>Congratulations! You completed the treasure hunt!</h3>`;
        document.getElementById('answerInput').style.display = "none";
        document.getElementById('nextBtn').style.display = "none";
      }
    } else {
      document.getElementById('feedback').textContent = "You have entered a wrong answer, try again!";
    }
  });
}

// Show question text and reset feedback
function showQuestion(idx) {
  document.getElementById('questionArea').innerHTML = `<p>${questions[idx].question}</p>`;
  document.getElementById('feedback').textContent = "";
  document.getElementById('answerInput').focus();
  localStorage.setItem('quiz-index', idx);
}
