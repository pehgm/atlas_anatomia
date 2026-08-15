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