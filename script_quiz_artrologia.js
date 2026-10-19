const questions = [
    {
        question: "Qual tecido caracteriza uma sincondrose?",
        options: [
            "Tecido Ósseo",
            "Fibrocartilagem",
            "Cartilagem Hialina",
            "Cartilagem Elástica"
        ],
        answer: "Cartilagem Hialina"
    },
    {
        question: "Qual alternativa apresenta um exemplo clássico de sincondrose associado ao crescimento ósseo?",
        options: [
            "Disco Intervertebral",
            "Placa Epifisária",
            "Sínfise Pélvica",
            "Ligamento Periodontal"
        ],
        answer: "Placa Epifisária"
    },
    {
        question: "Nas sínfises, qual tecido realiza a união entre os componentes ósseos?",
        options: [
            "Cartilagem Hialina",
            "Fibrocartilagem",
            "Tecido Conjuntivo Frouxo",
            "Cartilagem Elástica"
        ],
        answer: "Fibrocartilagem"
    },
    {
        question: "Qual associação está correta?",
        options: [
            "Sultura serreada - fibrocartilagem; gonfose - cartilagem hialina",
            "Sínfise - cartilagem elástica; sincondrose - ligamento periodontal",
            "Sincondrose - cartilagem hialina; sínfise - fibrocartilagem",
            "Gonfose - disco intervertebral; sutura plana - placa epifisária"
        ],
        answer: "Sincondrose - cartilagem hialina; sínfise - fibrocartilagem"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");


function loadQuestion() {
    const question = questions[currentQuestion];

    questionEl.textContent =
        `${currentQuestion + 1}. ${question.question}`;

    optionsEl.innerHTML = "";

    question.options.forEach(option => {
        const div = document.createElement("div");

        div.classList.add("option");
        div.textContent = option;

        div.addEventListener("click", () => {

            document
                .querySelectorAll(".option")
                .forEach(item => {
                    item.classList.remove("selected");
                });

            div.classList.add("selected");
            selectedAnswer = option;
        });

        optionsEl.appendChild(div);
    });
}

function nextQuestion() {

    if (!selectedAnswer) {
        alert("Selecione uma resposta.");
        return;
    }

    if (
        selectedAnswer ===
        questions[currentQuestion].answer
    ) {
        score++;
    }

    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {

    document.getElementById("quiz").style.display = "none";

    resultEl.style.display = "block";

    resultEl.innerHTML = `
        <p>🎉 Você acertou ${score} de ${questions.length} perguntas!</p>
        <br>
        <button onclick="location.reload()">
            Jogar Novamente
        </button>
    `;
}

function nextQuestion() {

    if (!selectedAnswer) {
        alert("Selecione uma resposta.");
        return;
    }

    const options = document.querySelectorAll(".option");
    const correctAnswer = questions[currentQuestion].answer;

    options.forEach(option => {

        option.classList.add("disabled");

        if (option.textContent === correctAnswer) {
            option.classList.add("correct");
        }

        if (
            option.textContent === selectedAnswer &&
            selectedAnswer !== correctAnswer
        ) {
            option.classList.add("wrong");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    setTimeout(() => {

        currentQuestion++;
        selectedAnswer = null;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }

    }, 1500);
}

loadQuestion();
