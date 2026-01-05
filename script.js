const toggleBtn = document.querySelector('.menu-toggle');
const modal = document.getElementById('menuModal');
const closeBtn = document.querySelector('.close-btn');

// Abrir Janelinha
toggleBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

//Fechar Janelinha
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar clicando fora da janelinha
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

    }
});