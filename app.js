function gerarNumeroAleatorio(arrays) {
    if (arrays.length >= 10) {
        arrays.length = 0; // Reseta o array se todos os números já foram usados
    }
    let numeroAleatorio;
    do{
        numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    } while (arrays.includes(numeroAleatorio));

    arrays.push(numeroAleatorio);
    return numeroAleatorio;
}

let historico = [];
let numeroSecreto = gerarNumeroAleatorio(historico);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2
    });
}

function exibirMensagem(
) {
exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagem();

function verificarChute() {
    let chute = Number(document.querySelector('input').value);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', '🎉 Você acertou!');
        let MensagemTentativas = tentativas === 1 ? 'tentativa' : 'tentativas';
        exibirTextoNaTela('p',`Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s).`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', '❌ Você errou!');
        
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampoInput();
    }
}

function limparCampoInput() {
    chute = document.querySelector('input');
    chute.value = '';
    chute.focus();
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(historico);
    tentativas = 1;
    console.log("Histórico de números gerados:", historico);
    console.log('reiniciou'); // para testes
    exibirMensagem();
    limparCampoInput();

    // trava o botão novamente
    document.getElementById('reiniciar').setAttribute('disabled', true);
}