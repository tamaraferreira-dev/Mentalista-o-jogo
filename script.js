// SELEÇÃO DE ELEMENTOS

const campoChute = document.getElementById('chute-usuario');
const botaoChutar = document.getElementById('btn-chutar');
const mensagemDica = document.getElementById('mensagem-dica');
const textoTentativas = document.getElementById('tentativas-restantes');
const botaoReiniciar = document.getElementById('btn-reiniciar');

// ESTADO DO JOGO

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativasRestantes = 7;

// LÓGICA PRINCIPAL

botaoChutar.addEventListener('click', () => {
    // Captura o valor do input e converte-o para um número inteiro
    const chute = parseInt(campoChute.value);

    // Validação de segurança: o utilizador introduziu um número válido?
    if (isNaN(chute) || chute < 1 || chute > 100) {
        mensagemDica.innerText = "⚠️ Introduz um número válido entre 1 e 100!";
        mensagemDica.style.color = "#ff4d6d"; // Destaca o aviso em vermelho
        return; // Interrompe a execução da função
    }

    // Restaura a cor padrão do texto de dicas
    mensagemDica.style.color = "white";

    // Verifica se o utilizador acertou
    if (chute === numeroSecreto) {
        mensagemDica.innerText = "🎉 Parabéns! Você conseguiu adivinhar o número!";
        mensagemDica.style.color = "#00f2fe";
        finalizarJogo();
    } else {
        // Reduz as tentativas disponíveis
        tentativasRestantes--;
        textoTentativas.innerHTML = `Tentativas restantes: <b>${tentativasRestantes}</b>`;

        // Dá a dica se o número secreto é maior ou menor
        if (chute < numeroSecreto) {
            mensagemDica.innerText = "🔮 O número secreto é MAIOR!";
        } else {
            mensagemDica.innerText = "🔮 O número secreto é MENOR!";
        }

        // Se acabarem as tentativas, o utilizador perde
        if (tentativasRestantes === 0) {
            mensagemDica.innerText = `💥 Game Over! O número secreto era o ${numeroSecreto}.`;
            mensagemDica.style.color = "#f8f538";
            finalizarJogo();
        }
    }

    // Limpa o campo de texto para facilitar o próximo chute
    campoChute.value = "";
    campoChute.focus(); // Coloca o cursor de volta no campo automaticamente
});

// =================================================================
// FUNÇÕES AUXILIARES
// =================================================================
function finalizarJogo() {
    // Desativa o input e o botão para o utilizador não continuar a jogar
    campoChute.disabled = true;
    botaoChutar.disabled = true;

    // Mostra o botão de reiniciar retirando a classe "escondido"
    botaoReiniciar.classList.remove('escondido');
}

// LÓGICA DE REINICIAR (A mágica da Etapa 3)
// =================================================================

// Avisamos ao botão que quando ele receber um 'click', ele deve executar a função de reiniciar
botaoReiniciar.addEventListener('click', reiniciarJogo);

function reiniciarJogo() {
    // 1. Sorteamos um número completamente novo
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    console.log("Novo número secreto gerado: " + numeroSecreto);

    // 2. Voltamos as tentativas de volta para 7 na memória e na tela
    tentativasRestantes = 7;
    textoTentativas.innerHTML = `Tentativas restantes: <b>7</b>`;

    // 3. Destravamos os botões e limpamos a caixa de chute
    campoChute.disabled = false;
    botaoChutar.disabled = false;
    campoChute.value = "";

    // 4. Restauramos o texto inicial das dicas
    mensagemDica.innerText = "Boa sorte! Digite um número acima.";
    mensagemDica.style.color = "white";

    // 5. Adicionamos a classe "escondido" de volta para o botão sumir da tela
    botaoReiniciar.classList.add('escondido');

    // 6. Coloca o cursor de volta na caixinha de texto automaticamente
    campoChute.focus();
}