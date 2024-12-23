function ModeChallengeSelect(container) {
    const modeContent = document.createElement('div');
    modeContent.innerHTML = `
        <div id="containerChallengeMode">
            <h3>Quem sou eu? - Modo Desafio</h3>
            <button id="iniciarDesafio">Iniciar Desafio</button>
            <div id="personagensSorteados" style="display: none;">
                <div id="personagem1"></div>
                <div id="personagem2"></div>
                <div id="personagem3"></div>
            </div>
            <button id="pedirDica" style="display: none;">Pedir Dica</button>
            <button id="botaoContador" style="display: none;">Pergunta Nº 1</button>
            <div id="tempoRestante" style="display: none;">Tempo restante: 60s</div>
            <div id="resultado"></div>
            <div id="resultadoDica" style="display: none;"></div>
        </div>
    `;
    container.appendChild(modeContent);

    let listaDeTextos = [...personagens];
    let faseAtual = 1;
    let contador = 1;
    let personagensSorteados = [];

    const botaoIniciar = document.getElementById("iniciarDesafio");
    const botaoPedirDica = document.getElementById("pedirDica");
    const botaoContador = document.getElementById("botaoContador");
    const tempoRestanteDiv = document.getElementById("tempoRestante");
    const personagensDiv = document.getElementById("personagensSorteados");

    botaoIniciar.addEventListener("click", () => {
        botaoIniciar.style.display = 'none';
        personagensDiv.style.display = 'block';
        botaoPedirDica.style.display = 'block';
        botaoContador.style.display = 'block';
        tempoRestanteDiv.style.display = 'block';

        sortearPersonagens();
        iniciarFase(faseAtual);
    });

    function sortearPersonagens() {
        personagensSorteados = [];
        for (let i = 0; i < 3; i++) {
            const indiceAleatorio = Math.floor(Math.random() * listaDeTextos.length);
            const textoSorteado = listaDeTextos[indiceAleatorio];
            listaDeTextos.splice(indiceAleatorio, 1);
            personagensSorteados.push(textoSorteado);
        }
        document.getElementById("personagem1").textContent = personagensSorteados[0].split('(')[0];
        document.getElementById("personagem2").textContent = personagensSorteados[1].split('(')[0];
        document.getElementById("personagem3").textContent = personagensSorteados[2].split('(')[0];
    }

    function iniciarFase(fase) {
        let tempoRestante;
        switch(fase) {
            case 1:
                tempoRestante = 60;
                break;
            case 2:
                tempoRestante = 45;
                break;
            case 3:
                tempoRestante = 30;
                break;
            default:
                tempoRestante = 60;
        }

        tempoRestanteDiv.textContent = `Tempo restante: ${tempoRestante}s`;

        const intervaloTempo = setInterval(() => {
            tempoRestante--;
            tempoRestanteDiv.textContent = `Tempo restante: ${tempoRestante}s`;

            if (tempoRestante <= 0) {
                clearInterval(intervaloTempo);
                botaoContador.disabled = true;
                botaoPedirDica.disabled = true;
                tempoRestanteDiv.textContent = 'Tempo esgotado!';
                document.getElementById("resultado").textContent = "Você perdeu! O tempo acabou.";
            }
        }, 1000);
    }

    let dicaUsada = false;

    botaoPedirDica.addEventListener("click", () => {
        if (!dicaUsada) {
            const dicas = personagensSorteados.map(p => `Dica: ${p.split('(')[1]}`);
            document.getElementById("resultadoDica").textContent = dicas.join(' | ');
            document.getElementById("resultadoDica").style.display = 'block';
            dicaUsada = true;
        } else {
            alert("Você já usou a dica para esta fase.");
        }
    });

    botaoContador.addEventListener("click", () => {
        contador--;
        botaoContador.textContent = "Pergunta Nº " + contador;

        if (contador === 0) {
            botaoContador.disabled = true;
            faseAtual++;
            iniciarFase(faseAtual);
            sortearPersonagens();
            botaoContador.disabled = false;
            botaoContador.textContent = "Pergunta Nº " + 1;
            contador = 1;
        }
    });
}
