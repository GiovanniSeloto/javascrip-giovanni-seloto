function ModeFast(container) {
    const modeContent = document.createElement('div');
    modeContent.innerHTML = `
        <div id="containerFastMode">
            <div id="containerBotao">
                <button id="sortear">Sortear</button>
                <button id="botaoContador">Pergunta Nº 10</button>
            </div>
            <div id="tempo"></div>
            <div id="resultado"></div>
            <div id="resultadoDica" style="display: none;"></div>
            <div id="aviso"></div>
        </div>
    `;

    container.appendChild(modeContent);

    let listaDeTextos = [...personagens];
    const fast = document.getElementById('fast');
    const desafio = document.getElementById('challenger');
    const botaoSortear = document.getElementById("sortear");
    const botaoContador = document.getElementById("botaoContador");
    const tempoDiv = document.getElementById('tempo');
    const aviso = document.getElementById('aviso');
    const body = document.body;
    let contador = 10;
    let tempo = 60;
    let intervaloTempo;

    fast.style.display = 'none';
    desafio.style.display = 'none';

    function sortearTexto() {
        if (listaDeTextos.length === 0) {
            document.getElementById("resultado").textContent = "Todos os textos já foram sorteados! Recarregue a página para reiniciar.";
            contador = 10;
            botaoContador.textContent = "Pergunta Nº " + contador;
            botaoContador.disabled = false;
            return;
        }

        const indiceAleatorio = Math.floor(Math.random() * listaDeTextos.length);
        const textoSorteado = listaDeTextos[indiceAleatorio];

        listaDeTextos.splice(indiceAleatorio, 1);
        let partes = textoSorteado.split('(');

        document.getElementById("resultado").textContent = partes[0];
        document.getElementById("resultadoDica").textContent = `Dica: ${partes[1]}`;
        document.getElementById("resultadoDica").style.display = 'none';

        contador = 10;
        botaoContador.textContent = "Pergunta Nº " + contador;
        botaoContador.disabled = false;

        if (intervaloTempo) {
            clearInterval(intervaloTempo);
            aviso.textContent=""
        }

        tempo = 60;
        tempoDiv.textContent = `Tempo restante ${tempo}s`;

        function atualizarCorDeFundo() {
            const tempoProporcao = tempo / 60; 
            const matizInicial = 120; // Verde
            const matizFinal = 0;     // Vermelho
            const matizAtual = matizInicial * tempoProporcao + matizFinal * (1 - tempoProporcao);
            body.style.backgroundColor = `hsl(${matizAtual}, 100%, 50%)`;
        }

        atualizarCorDeFundo();

        intervaloTempo = setInterval(() => {
            tempo--;
            tempoDiv.textContent = `Tempo restante ${tempo}s`;
            atualizarCorDeFundo();

            if (tempo <= 0) {
                clearInterval(intervaloTempo);
                botaoContador.disabled = true;
                tempoDiv.textContent = "Tempo Esgotado";
                document.getElementById('resultado').textContent = "Você perdeu! O tempo se esgotou.";
            }
        }, 1000);
    }

    botaoSortear.addEventListener("click", sortearTexto);

    botaoContador.addEventListener("click", function () {
        contador--;
        botaoContador.textContent = "Pergunta Nº " + contador;

        if (contador === 5) {
            document.getElementById("resultadoDica").style.display = 'block';
        }

        if (contador === 0) {
            botaoContador.disabled = true;
            contador = 0;
            botaoContador.textContent = "Pergunta Nº " + contador;
            botaoContador.disabled = true;
            aviso.textContent = "Agora é com você, já foram feitas todas as perguntas!";
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const jogar = document.getElementById('fast');

    if (jogar) {
        jogar.addEventListener('click', () => {
            const container = document.getElementById('modeContainer');
            if (container) {
                ModeFast(container);
            }
        });
    }
});
