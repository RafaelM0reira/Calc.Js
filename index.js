const main = document.querySelector("main");

// variável do css
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

// criar um array com todos os cracteres permitidos na calculadora
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

// adicionando a utilidade dos botões
// quando não se coloca um data específico no dataset ele seleciona todos os datas
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

// adicionando a função de limpar a calculadora
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";

  // depois que aperta o botão o input irá estar selecionado depois da ação
  input.focus();
});

// adicionando a função de se usar apenas os botões requisitados
// o evento keydown se refere a quando você pressiona uma tecla
input.addEventListener("keydown", function (ev) {
  ev.preventDefault();

  // ev.key se refere a tecla associda ao evente(a tecla pressionada)
  // se a tecla estiver inclusa no array então ela é um caracter válido
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "enter") {
    calculate();
  }
});

document.getElementById("equal").addEventListener("click", calculate);

// adicionando a função de calcular
function calculate() {
  // aqui é colocar uma propriedade de erro que no caso
  // altera o valor do resultado e adiciona uma clase que pinta ele
  // porém se o eval executar corretamente ele segue o resto do codigo
  // alterando o valor de novo e removendo a classe
  // porem se o eval nao executar corretamente ele para no resultInput.classList.add("error")
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  // a função eval avalia o código js e executa o código ou seja,
  // nesse caso o eval avalia a string do input e a excuta como um programa js ou como no console
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}

// botão de alterar tema
document.getElementById("themeSwitcher").addEventListener("click", function () {
  // para selecionar o data theme se usa: main.dataset.theme
  if (main.dataset.theme === "dark") {
    // o set property é usdo para alterar propriedade, ou seja, mudar valores
    // que nesse caso foram as variáveis :root do css
    // primeira se fala a variavel a ser mudada e depois o valor para mudar
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    // esta variável seleciona quem acionou o evento que no caso é o botão copy
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";

      // adiciona uma classe a variável
      button.classList.add("success");

      // navigator clipboard é usado para copiar para a área de transferência
      // o writeText irá escrever o texto para a área de transferência
      // que no caso é o resultado da operação matemática
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });
