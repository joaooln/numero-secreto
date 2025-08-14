let listaDeNumerosSorteados = [];
const numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Cache dos elementos do DOM para melhor performance e legibilidade.
const inputChute = document.querySelector('input');
const botaoReiniciar = document.getElementById('reiniciar');


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    // Converte o valor do input para número e usa comparação estrita (===).
    let chute = parseInt(inputChute.value);
    
    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        botaoReiniciar.removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; // Incrementa as tentativas apenas se o jogador errar.
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Substitui a recursão por um loop para evitar estouro de pilha (stack overflow).
    let numeroEscolhido;
    do {
        numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
}

function limparCampo() {
    // Usa a variável já cacheada e evita criar uma variável global implícita.
    inputChute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    botaoReiniciar.setAttribute('disabled', true);
}
