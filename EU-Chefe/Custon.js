function ModeChallenger(container) {
    const fast = document.getElementById('fast');
    const desafio = document.getElementById('challenger');
    fast.style.display = 'none';
    desafio.style.display = 'none';

    const modeContent = document.createElement('div');
    modeContent.innerHTML = `
        <div>ESTÃO PRONTOS PARA O DESAFIO ?</div>
        <div>Insira o nome dos participantes:</div>
        <div id="participantes"> 
            <input type="text" placeholder="Participante" class="participante">
            <input type="text" placeholder="Participante" class="participante">
            <input type="text" placeholder="Participante" class="participante">
        </div>
        <button id="adicionar">Adicionar Participante</button>
        <button id="iniciar">Iniciar</button>
        <div id="dica"></div>
        <div id="resultado"></div>
        <div id="personagens"></div>
        <div id="turno"></div>
        <div id="contador"></div>
        <button id="proximoTurno" style="display:none">Próximo Turno</button>
    `;

    container.appendChild(modeContent);

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

    function ProximoTurno() {
        turnoAtual = (turnoAtual + 1) % participantes.length;
        SortearPersonagens();
        AtualizarPersonagens();
        AtualizarTurno();
    }

    function AtualizarPersonagens() {
        const personagensContainer = document.getElementById('personagens');
        personagensContainer.innerHTML = personagensSorteados.map(personagem => `<div>${personagem}</div>`).join('');
    }

    const proximoTurnoButton = document.getElementById('proximoTurno');
    proximoTurnoButton.addEventListener('click', () => {
        ProximoTurno();
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
