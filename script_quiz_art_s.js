const questions = [
    {
        question: "Em uma articulação sinovial saudável, onde se encontra o líquido sinovial?",
        options: [
            "Exclusivamente no interior dos ossos",
            "Somente entre as fibras do ligamentos extracapsulares",
            "Dentro da medula óssea, junto a cartilagem articular",
            "No interior da cavidade articular"
        ],
        answer: "No interior da cavidade articular"
    },
    {
        question: "Um ligamento articular que corresponde a um espessamento da própria capsula articular é classificado como:",
        options: [
            "Capsular",
            "Extracapsular",
            "Intra-articular",
            "Interósseo"
        ],
        answer: "Capsular"
    },
    {
        question: "O ligamento cruzado do joelho é um exemplo clássico de qual categoria de ligamento articular?",
        options: [
            "Ligamento capsular",
            "ligamento periodontal",
            "ligamento intra-articular",
            "Ligamento extracapsular"
        ],
        answer: "ligamento intra-articular"
    },
    {
        question: "Qual alternatiza descreve corretamente os ligamentos extracapsulares?",
        options: [
            "São placas fibrocartilaginosas entre superfícies articulares",
            "São estruturas necessariamente imersas no líquido sinovial",
            "Localizam-se externamente à cápsula articular",
            "São espessamentos da cápsula articular"
        ],
        answer: "Localizam-se externamente à cápsula articular"
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
