function ModeFast(container) {
    const modeContent = document.createElement('div');
    modeContent.innerHTML = `
        <div id="containerFastMode">
            <button id="sortear">Sortear</button>
            <button id="botaoContador">Pergunta Nº 10</button>
            <div id="resultado"></div>
            <div id="resultadoDica" style="display: none;"></div>
        </div>
    `;

    container.appendChild(modeContent);

    let listaDeTextos = [...personagens];

    const botaoSortear = document.getElementById("sortear");
    const botaoContador = document.getElementById("botaoContador");
    let contador = 10;

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
            contador = 10;
            botaoContador.textContent = "Pergunta Nº " + contador;
            sortearTexto();
            botaoContador.disabled = false;
        }
    });
}

window.startedMode1 = ModeFast;
