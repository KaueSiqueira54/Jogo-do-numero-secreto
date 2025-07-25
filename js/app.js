let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let reiniciar = document.getElementById("reiniciar");

//Exemplo de funções
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  //Falando com responseVoice
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do Número Secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10:");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativa = `Você descobriu o número secreto! ${palavraTentativa}: ${tentativas}`;
    exibirTextoNaTela("p", mensagemTentativa);

    //Botão de reiniciar o jogo
    reiniciar.removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor que o digitado.");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior que o digitado.");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosLista == numeroEscolhido) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    //Adicionando elementos na lista
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  reiniciar.setAttribute("disabled", true);
}
