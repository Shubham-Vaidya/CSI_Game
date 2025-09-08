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

// Save elements after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startQuiz');
  if (startBtn) startBtn.addEventListener('click', showQuizPage);

  // Quiz page generation
  function showQuizPage() {
    document.body.innerHTML = `
      <div class="quiz-container">
        <h2 id="quizTitle">Treasure Hunt Quiz</h2>
        <div id="questionArea"></div>
        <input type="text" id="answerInput" autocomplete="off" placeholder="Type your answer here...">
        <div class="feedback" id="feedback"></div>
        <button id="nextBtn">Submit</button>
      </div>
    `;
    let current = 0;
    showQuestion(current);

    document.getElementById('nextBtn').addEventListener('click', () => {
      const input = document.getElementById('answerInput').value.trim().toLowerCase();
      const correct = questions[current].answer.toLowerCase();
      if (input === correct) {
        document.getElementById('feedback').textContent = "";
        current++;
        if (current < questions.length) {
          showQuestion(current);
          document.getElementById('answerInput').value = "";
        } else {
          document.getElementById('questionArea').innerHTML = `<h3>Congratulations! You completed the treasure hunt!</h3>`;
          document.getElementById('answerInput').style.display = "none";
          document.getElementById('nextBtn').style.display = "none";
        }
      } else {
        document.getElementById('feedback').textContent = "You have entered a wrong answer, try again!";
      }
    });
  }

  function showQuestion(idx) {
    document.getElementById('questionArea').innerHTML = `<p>${questions[idx].question}</p>`;
    document.getElementById('feedback').textContent = "";
    document.getElementById('answerInput').focus();
  }
});
