const grid = document.getElementById("grid");
const input = document.getElementById("numeroInput");
const ultimoNumeroEl = document.getElementById("ultimoNumero");
const ultimosCincoEl = document.getElementById("ultimosCinco");
const bingoBtn = document.getElementById("bingoBtn");
const resetBtn = document.getElementById("resetBtn");
const bingoOverlay = document.getElementById("bingoOverlay");

let numeros = JSON.parse(localStorage.getItem("numerosBingo")) || [];

// Criar grid 1–75
for (let i = 1; i <= 75; i++) {
  const div = document.createElement("div");
  div.classList.add("number");
  div.id = `num-${i}`;
  div.textContent = i;
  grid.appendChild(div);
}

// Restaurar estado
numeros.forEach(n => {
  document.getElementById(`num-${n}`).classList.add("sorteado");
});
if (numeros.length > 0) {
  ultimoNumeroEl.textContent = numeros[numeros.length - 1];
  renderUltimosCinco();
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") adicionarNumero();
});

function adicionarNumero() {
  const n = Number(input.value);
  if (n < 1 || n > 75 || numeros.includes(n)) {
    input.value = "";
    return;
  }

  numeros.push(n);
  localStorage.setItem("numerosBingo", JSON.stringify(numeros));

  ultimoNumeroEl.textContent = n;
  document.getElementById(`num-${n}`).classList.add("sorteado");

  renderUltimosCinco();
  input.value = "";
}

function renderUltimosCinco() {
  ultimosCincoEl.innerHTML = "";
  numeros.slice(-5).forEach(n => {
    const box = document.createElement("div");
    box.textContent = n;
    ultimosCincoEl.appendChild(box);
  });
}

bingoBtn.addEventListener("click", () => {
  bingoOverlay.classList.remove("hidden");
  confetti({
    particleCount: 300,
    spread: 120,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    bingoOverlay.classList.add("hidden");
  }, 3000);
});

resetBtn.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja reiniciar o bingo?")) {
    localStorage.removeItem("numerosBingo");
    location.reload();
  }
});
