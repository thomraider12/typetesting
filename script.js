// Variável global para a linguagem atual
let currentLanguage = "pt"; // Definir o idioma principal como "pt"

// Função para alterar o idioma
function changeLanguage() {
    const languageSelect = document.getElementById("language-select");
    currentLanguage = languageSelect.value; // Atualizar a linguagem com a seleção
    renderNewQuote(); // Buscar nova citação no idioma selecionado
}

// Função para buscar uma citação em uma linguagem específica
const renderNewQuote = async () => {
    // URL da API atualizada com base na linguagem selecionada
    const quoteApiUrl = `https://quotes15.p.rapidapi.com/quotes/random/?language_code=${currentLanguage}`;
    
    try {
        const response = await fetch(quoteApiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '048a4133aemsh2df067cfa2b7840p15d0f6jsnf62e37548f2a',
                'x-rapidapi-host': 'quotes15.p.rapidapi.com'
            }
        });
        const data = await response.json();
        quote = data.content;

        // Array de caracteres da citação
        let arr = quote.split("").map((value) => {
            return "<span class='quote-chars'>" + value + "</span>";
        });
        quoteSection.innerHTML = arr.join(""); // Limpa e insere nova citação
    } catch (error) {
        console.error("Erro ao buscar a citação:", error);
    }
};

// Chamando a função de alteração de idioma na primeira renderização
window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote(); // Inicializar com a citação em português
};


// API settings
const quoteApiUrl = "https://quotes15.p.rapidapi.com/quotes/random/?language_code=pt";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;


// Logic to compare input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    // Array of user input chars
    let userInputChars = userInput.value.split("");
    // Loop through each char in quote
    quoteChars.forEach((char, index) => {
        // Check chars with quote chars
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        // If user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        // If user entered wrong char
        else {
            if (!char.classList.contains("fail")) {
                // Increment and displaying mistakes
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        // Return true if all chars are correct
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        // End test if all chars are correct
        if (check) {
            displayResult();
        }

    });

});

// Update timer
function updateTimer() {
    if (time == 0) {
        // End test if reaches 0
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

// Set timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

// End test
const displayResult = () => {
    // Display result div
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
    document.getElementById("refresh").innerText = "Faz refresh para recomeçar!";
};

// Start test
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};
