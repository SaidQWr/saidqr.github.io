const siButton = document.getElementById("si");
const noButton = document.getElementById("no");
const resultado = document.getElementById("resultado");

siButton.addEventListener("click", () => {
  resultado.textContent = "¡Soy la persona más FELIZ del MUNDOOO!";
  resultado.style.color = "#000"; /*  */
  noButton.style.display = "none"; /* Hide the "No" button after selection */
});

noButton.addEventListener("click", () => {
  resultado.textContent = "Respuesta incorrecta, vuelve a intentarlo.";
  resultado.style.color = "#000"; /*  */
});

noButton.addEventListener("mouseover", () => {
  const buttonRect = noButton.getBoundingClientRect();
  const maxX = window.innerWidth - buttonRect.width;
  const maxY = window.innerHeight - buttonRect.height;
  const randomX = Math.max(0, Math.random() * maxX);
  const randomY = Math.max(0, Math.random() * maxY);

  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
});
