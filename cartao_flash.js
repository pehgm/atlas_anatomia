const cards = document.querySelectorAll(".caixa_voce_sabia");

cards.forEach((card) => {
  function virar() {
    const virado = card.classList.toggle("virado");
    card.setAttribute("aria-pressed", String(virado));
  }

  card.addEventListener("click", virar);

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      virar();
    }
  });
});