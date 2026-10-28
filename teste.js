// Banco de perguntas (pode ser expandido conforme necessário)
        const questions = [
            {
                question: "1. Qual tecido caracteriza uma sincondrose?",
                options: ["Tecido Ósseo", "Fibrocartilagem", "Cartilagem Hialina", "Cartilagem Elástica"],
                answer: 2 // O índice correto (0 a 3). 2 = Cartilagem Hialina
            },
            {
                question: "2. Qual estrutura é essencial para absorção de choques nas articulações sinoviais complexas?",
                options: ["Cápsula articular", "Menisco", "Bolsa sinovial", "Ligamento colateral"],
                answer: 1 // 1 = Menisco
            }
        ];

        let currentQuestionIndex = 0;
        let selectedOptionIndex = null;
        let isAnswerConfirmed = false;

        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const nextBtn = document.getElementById('next-btn');
        const quizContent = document.getElementById('quiz-content');

        function loadQuestion() {
            selectedOptionIndex = null;
            isAnswerConfirmed = false;
            nextBtn.disabled = true;
            nextBtn.textContent = "Próxima";
            
            const currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ''; 
            
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                button.textContent = option;
                
                // Animação em cascata (delay progressivo) para as opções aparecerem
                button.style.animation = `slideUpFade 0.4s ease forwards ${index * 0.1}s`;
                
                button.addEventListener('click', () => selectOption(index, button));
                optionsContainer.appendChild(button);
            });
            
            quizContent.classList.remove('fade-out');
        }

        function selectOption(index, selectedButton) {
            // Ignora o clique se a resposta já foi confirmada
            if (isAnswerConfirmed) return;

            selectedOptionIndex = index;
            nextBtn.disabled = false;
            nextBtn.textContent = "Confirmar";

            const buttons = optionsContainer.querySelectorAll('.option-btn');
            buttons.forEach(btn => btn.classList.remove('selected'));

            selectedButton.classList.add('selected');
        }

        function checkAnswer() {
            isAnswerConfirmed = true;
            const buttons = optionsContainer.querySelectorAll('.option-btn');
            const correctIndex = questions[currentQuestionIndex].answer;

            buttons.forEach((btn, index) => {
                // Desativa o hover após confirmar
                btn.style.pointerEvents = 'none'; 
                
                if (index === correctIndex) {
                    btn.classList.add('correct');
                } else if (index === selectedOptionIndex) {
                    btn.classList.add('wrong');
                }
            });

            nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Continuar";
        }

        nextBtn.addEventListener('click', () => {
            if (!isAnswerConfirmed) {
                // Primeira etapa: confirmar a resposta e mostrar feedback visual
                checkAnswer();
            } else {
                // Segunda etapa: avançar para a próxima tela com animação
                quizContent.classList.add('fade-out');
                
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        loadQuestion();
                    } else {
                        // Tela de finalização
                        questionText.textContent = "Revisão Concluída!";
                        optionsContainer.innerHTML = '<p style="text-align:center; color:#555; font-size:1.1rem; margin-top:20px;">Excelente trabalho!</p>';
                        nextBtn.style.display = 'none';
                        quizContent.classList.remove('fade-out');
                    }
                }, 300); // Sincronizado com o tempo da transição CSS (.fade-out)
            }
        });

        // Inicializar a primeira pergunta
        loadQuestion();