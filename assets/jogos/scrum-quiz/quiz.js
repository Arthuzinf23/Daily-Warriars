const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const feedbackBox = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const summaryEl = document.getElementById("summary");

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timer;
let seconds = 0;

// Perguntas do Quiz (exemplo Scrum)
const questions = [
  {
    question: "01-Quem é responsável por garantir que o Scrum seja compreendido e aplicado?",
    options: ["Scrum Master", "Product Owner", "Equipe de Desenvolvimento"],
    answer: "Scrum Master"
  },
  {
    question: "02-Qual a duração máxima recomendada para a Daily Scrum?",
    options: ["15 minutos", "30 minutos", "1 hora"],
    answer: "15 minutos"
  },
  {
    question: "03-O Product Backlog é de responsabilidade de quem?",
    options: ["Scrum Master", "Product Owner", "Equipe de Desenvolvimento"],
    answer: "Product Owner"
  },
  {
    question: "04-O que é entregue ao final de cada Sprint?",
    options: ["Documentação completa", "Incremento do produto", "Plano detalhado"],
    answer: "Incremento do produto"
  },
  {
    question: "05-Qual das opções representa corretamente o propósito do Sprint Goal?",
    options: ["Definir todas as tarefas técnicas que serão feitas na Sprint", " Descrever o valor que a Sprint pretende entregar", "Detalhar todas as histórias do Product Backlog", "Registrar impedimentos encontrados na Sprint anterior"],
    answer: "Descrever o valor que a Sprint pretende entregar"
  },
  {
    question: "06-Quem é responsável por maximizar o valor do produto?",
    options: ["Scrum Master", " Product Owner", "Desenvolvedor mais experiente", "Stakeholder"],
    answer: "Product Owner"
  },
  {
    question: "07-Qual evento possui timebox máximo de 15 minutos?",
    options: ["Sprint Review", "Daily Scrum", "Sprint Planning", "Retrospective"],
    answer: "Daily Scrum"
  },
  {
    question: "08-Qual é a duração recomendada de uma Sprint?",
    options: ["Entre 1 e 4 semanas", "Exatamente 2 semanas", "No mínimo 1 mês", "Exatamente 30 dias"],
    answer: "Entre 1 e 4 semanas"
  },
  {
    question: "09-O que é o Product Backlog?",
    options: ["Lista ordenada de tudo que pode ser necessário no produto", "Lista de tarefas diárias", "Lista de impedimentos", "Documentação obrigatória do projeto"],
    answer: "Lista ordenada de tudo que pode ser necessário no produto"
  },
  {
    question: "10-Quem cria o Sprint Backlog?",
    options: ["Product Owner", "Scrum Master", "Time de Desenvolvimento", "Cliente"],
    answer: "Time de Desenvolvimento"
  },
  {
    question: "11-Qual é o objetivo principal da Sprint Retrospective?",
    options: ["Demonstrar o produto ao cliente", "Criar o backlog da próxima Sprint", "Melhorar processos e colaboração", "Revisar histórias não concluídas"],
    answer: "Melhorar processos e colaboração"
  },
  {
    question: "12-O Incremento deve ser:",
    options: ["Apenas planejado", "Testado, mas não necessariamente utilizável", "Um conjunto de funcionalidades em rascunho", "Potencialmente utilizável e pronto"],
    answer: "Potencialmente utilizável e pronto"
  },
  {
    question: "13-Quem é responsável por facilitar os eventos do Scrum?",
    options: ["Product Owner", "Scrum Master", "Sponsor", "Usuário final"],
    answer: "Scrum Master"
  },
  {
    question: "14-O que caracteriza um time Scrum?",
    options: ["Hierarquia rígida", "Tamanhos variando de 20 a 30 pessoas", "Auto-organização e multifuncionalidade", "Funções definidas pelo gerente de projetos"],
    answer: "Auto-organização e multifuncionalidade"
  },
  {
    question: "15-No Sprint Planning, o que é decidido?",
    options: ["Como será o produto final", "O que pode ser entregue na Sprint e como o trabalho será feito", "Quais defeitos serão corrigidos no projeto", "Apenas o prazo da Sprint"],
    answer: "O que pode ser entregue na Sprint e como o trabalho será feito"
  },
];

// Iniciar jogo
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  startTimer();
  showQuestion();
});

// Reiniciar
restartBtn.addEventListener("click", () => {
  location.reload();
});

// Mostrar pergunta
function showQuestion() {
  feedbackBox.innerHTML = "";
  let q = questions[currentQuestion];
  questionBox.textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.answer);
    optionsBox.appendChild(btn);
  });
}

// Checar resposta
function checkAnswer(selected, correct) {
  let buttons = optionsBox.querySelectorAll("button");
  buttons.forEach(b => (b.disabled = true));

  if (selected === correct) {
    feedbackBox.innerHTML = `<p class="correct">✅ Correto!</p>`;
    score += 10;
    correctAnswers++;
  } else {
    feedbackBox.innerHTML = `<p class="wrong">❌ Errado! Resposta correta: <b>${correct}</b></p>`;
    wrongAnswers++;
  }

  scoreEl.textContent = score;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1500);
}

// Timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    let min = String(Math.floor(seconds / 60)).padStart(2, "0");
    let sec = String(seconds % 60).padStart(2, "0");
    timerEl.textContent = `⏱ ${min}:${sec}`;
  }, 1000);
}

// Final de jogo
function endGame() {
  clearInterval(timer);
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  summaryEl.innerHTML = `
    Acertos: ${correctAnswers} <br>
    Erros: ${wrongAnswers} <br>
    Pontuação final: ${score} <br><br>
    ${score >= 30 ? "🎉 Excelente! Você domina o Scrum!" : "💡 Continue estudando para melhorar!"}
  `;
}
