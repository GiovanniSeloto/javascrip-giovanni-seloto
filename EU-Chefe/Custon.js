function ModeChallenger(container) {
    const fast = document.getElementById('fast');
    const desafio = document.getElementById('challenger');
    fast.style.display = 'none';
    desafio.style.display = 'none';

    const modeContent = document.createElement('div');
    modeContent.innerHTML = `
    <div>   
        <div id="participantes"> 
            <input type="text" placeholder="Participante" class="participante">
            <input type="text" placeholder="Participante" class="participante">
            <input type="text" placeholder="Participante" class="participante">
        </div>
        <div class="title">ESTÃO PRONTOS PARA O DESAFIO?</div>
        <div id="container">
            <button id="adicionar">Adicionar</button>
            <button id="iniciar">Iniciar</button>
        </div>
        <div id="game">
            <div id="personagens"></div>
            <div id="turno"></div>
            <div id="contador"></div>
        </div>
        <div id="containerTurno">
            <button id="proximoTurno" style="display:none">Próximo Turno</button>
            <button id="botaoContador" style="display:none">Pergunta Nº 6</button>
        </div>
        <div id="resultado"></div>
        <div id="resultadoDica" style="display:none;"></div>
        <div id="aviso"></div>
    </div>
    `;

    container.appendChild(modeContent);

    let contador = 6;
    const botaoContador = document.getElementById("botaoContador");
    const aviso = document.getElementById('aviso');

    const adicionar = document.getElementById('adicionar');
    adicionar.addEventListener('click', () => {
        const novoInput = document.createElement('input');
        novoInput.type = 'text';
        novoInput.placeholder = `Participante ${document.querySelectorAll('.participante').length + 1}`;
        novoInput.className = "participante";
        document.getElementById("participantes").appendChild(novoInput);
    });

    const iniciar = document.getElementById('iniciar');
    iniciar.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.participante');
        const participantes = Array.from(inputs).map(input => input.value.trim()).filter(nome => nome !== "");

        if (participantes.length < 3) {
            alert("Adicione ao menos 3 participantes.");
            return;
        }

        IniciarDesafio(participantes);
    });

    let turnoAtual = 0;
    let intervalo;
    let participantes = [];
    let personagensSorteados = [];

    function IniciarDesafio(participants) {
        participantes = participants;
        SortearPersonagens();
        AtualizarPersonagens();
        AtualizarTurno();
        document.getElementById('proximoTurno').style.display = 'block';
        document.getElementById('botaoContador').style.display = 'block';
    }

    function SortearPersonagens() {
        const listaPersonagens = [...personagens];
        personagensSorteados = [];

        for (let i = 0; i < 3; i++) {
            const indiceAleatorio = Math.floor(Math.random() * listaPersonagens.length);
            personagensSorteados.push(listaPersonagens[indiceAleatorio]);
            listaPersonagens.splice(indiceAleatorio, 1);
        }
    }

    function AtualizarTurno() {
        clearInterval(intervalo);

        const turnoDiv = document.getElementById('turno');
        turnoDiv.textContent = `Turno de: ${participantes[turnoAtual]}`;

        const contadorDiv = document.getElementById('contador');
        let tempo = 60;
        contadorDiv.textContent = `Tempo restante: ${tempo} segundos`;

        intervalo = setInterval(() => {
            tempo--;
            contadorDiv.textContent = `Tempo restante: ${tempo} segundos`;
            if (tempo <= 0) {
                clearInterval(intervalo);
                ProximoTurno();
            }
        }, 1000);
    }

    function AtualizarPersonagens() {
        const personagensContainer = document.getElementById('personagens');
        personagensContainer.innerHTML = personagensSorteados.map(personagem => {
             const partes = personagem.split('(');
            return `<div>${partes[0]}</div>`
        }).join('');
    }

    function ProximoTurno() {
        turnoAtual = (turnoAtual + 1) % participantes.length;
        SortearPersonagens();
        AtualizarPersonagens();
        AtualizarTurno();
    }

    const proximoTurnoButton = document.getElementById('proximoTurno');
    proximoTurnoButton.addEventListener('click', () => {
        ProximoTurno();
    });

    botaoContador.addEventListener("click", function () {
        contador--;
        botaoContador.textContent = "Pergunta Nº " + contador;

        if (contador === 3) {
            document.getElementById("resultadoDica").style.display = 'block'; 
            const dicaPersonagem = personagensSorteados.map(personagem => {
                const partes = personagem.split('(');
                return partes[1];
            }).join(', ');
    
            document.getElementById("resultado").innerHTML =`Dica: ${dicaPersonagem}` ;
            document.getElementById("resultadoDica").textContent = "";
        }

        if (contador === 0) {
            botaoContador.disabled = true;
            aviso.textContent = "Agora é com você, já foram feitas todas as perguntas!";
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const jogar = document.getElementById('challenger');
    if (jogar) {
        jogar.addEventListener('click', () => {
            const container = document.getElementById('modeContainer');
            if (container) {
                ModeChallenger(container);
            }
        });
    }
});
