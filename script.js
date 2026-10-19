// Selecionando os elementos do HTML
const btnAbrir = document.getElementById('btn-abrir');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const overlay = document.getElementById('overlay');

// Função para abrir o menu
function abrirMenu() {
  menuLateral.classList.add('aberto');
  overlay.classList.add('ativo');
}

// Função para fechar o menu
function fecharMenu() {
  menuLateral.classList.remove('aberto');
  overlay.classList.remove('ativo');
}

// Escutando os eventos de clique
btnAbrir.addEventListener('click', abrirMenu);
btnFechar.addEventListener('click', fecharMenu);

// Fecha o menu se o usuário clicar no fundo escuro
overlay.addEventListener('click', fecharMenu);

// 1. Criamos um Array com todas as perguntas, respostas e explicações
const perguntas = [
  {
    texto: "A Terra é o centro do Sistema Solar?",
    respostaCorreta: false,
    explicacao: "O Sol é o centro do nosso Sistema Solar (Heliocentrismo)."
  },
  {
    texto: "O corpo humano tem 206 ossos na fase adulta?",
    respostaCorreta: true,
    explicacao: "Correto! Embora nasçamos com quase 300, muitos se fundem durante o crescimento."
  },
  {
    texto: "A água ferve a 100°C em qualquer altitude?",
    respostaCorreta: false,
    explicacao: "Em maiores altitudes, a pressão atmosférica é menor, fazendo a água ferver abaixo de 100°C."
  }
];

// 2. Variáveis de controle de estado
let indiceAtual = 0;
let acertos = 0;

// 3. Função para carregar a pergunta na tela
function carregarPergunta() {
  const elementoPergunta = document.getElementById('pergunta');
  const botoes = document.getElementById('botoes');
  const btnProxima = document.getElementById('btn-proxima');

  // Verifica se o quiz acabou
  if (indiceAtual >= perguntas.length) {
    elementoPergunta.innerText = `Fim do Quiz! Você acertou ${acertos} de ${perguntas.length}.`;
    botoes.style.display = 'none'; // Esconde os botões de certo/errado
    return;
  }

  // Se não acabou, carrega a pergunta atual
  const q = perguntas[indiceAtual];
  elementoPergunta.innerText = q.texto;
  document.getElementById('explicacao').innerText = q.explicacao;
  
  // Se for a última pergunta, muda o texto do botão de avançar
  if (indiceAtual === perguntas.length - 1) {
    btnProxima.innerText = "Ver Resultado Final";
  }
}

// 4. Função para validar o clique do usuário
function verificarResposta(respostaDoUsuario) {
  const q = perguntas[indiceAtual];
  const flashcard = document.getElementById('myFlashcard');
  const feedbackText = document.getElementById('feedback');

  if (respostaDoUsuario === q.respostaCorreta) {
    feedbackText.innerText = "🎉 Você acertou!";
    feedbackText.style.color = "#4CAF50";
    acertos++;
  } else {
    feedbackText.innerText = "❌ Você errou!";
    feedbackText.style.color = "#f44336";
  }

  // Gira o cartão
  flashcard.classList.add('virado');
}

// 5. Função para avançar de pergunta
function proximaPergunta() {
  const flashcard = document.getElementById('myFlashcard');
  
  // Desvira o cartão
  flashcard.classList.remove('virado');
  
  // Avança o índice
  indiceAtual++;
  
  // O SEGREDO: Esperamos a animação do CSS terminar (600ms) antes de trocar o texto
  // para que o usuário não veja o texto mudando enquanto o cartão gira
  setTimeout(() => {
    carregarPergunta();
  }, 600); 
}

// 6. Inicializa o quiz carregando a primeira pergunta assim que o script rodar
carregarPergunta();

