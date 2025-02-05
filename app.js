let amigos = [];

function exibirTexto(texto) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function iniciarJogo() {
    const mensagemInicial = "Digite o nome dos seus amigos!";
    exibirTexto(mensagemInicial);
}

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    // Verifica se o nome está vazio
    if (nome === "") {
        alert("Informe um nome válido!");
        exibirTexto("Informe um nome válido!");
        return;
    }

    // Verifica se o nome contém apenas letras
    if (!/^[A-Za-z]+$/.test(nome)) {
        alert("Nome inválido! Digite novamente.");
        exibirTexto("Nome inválido! Digite novamente.");
        input.value = "";
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";
    exibirTexto(`Amigo ${nome} adicionado!`);
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach(nome => {
        const li = document.createElement("li");
        li.textContent = nome;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Informe mais um nome de amigo!");
        exibirTexto("Informe mais um nome de amigo!");
        return;
    }
    
    const sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<li class="resultado-nome">${sorteado}</li>`;
    exibirTexto(`Amigo sorteado: ${sorteado}`);
}

function novoSorteio() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    exibirTexto("Lista de amigos resetada. Novo sorteio pronto!");
}
