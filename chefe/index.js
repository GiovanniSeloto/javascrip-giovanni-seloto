document.addEventListener('DOMContentLoaded', () => {
    const modeFast = document.getElementById('fast')
    const modeCuston = document.getElementById('custon')

    if(modeFast){
        modeFast.addEventListener('click', ()=>{
            loadMode('modeFast')
            modeFast.style.display = 'none'
            modeCuston.style.display = 'none'
        })  
    }
    if(modeCuston){
        modeCuston.addEventListener('click', () => {
            loadMode('modeCuston');
            modeCuston.style.display = 'none'
            modeFast.style.display = 'none'
        })
    }      
})

async function loadMode(mode) {
    const modeContainer = document.getElementById('modeContainer');
    modeContainer.innerHTML = ''

    if (mode === 'modeFast') {
        window.startedMode1(modeContainer)
    }
    else if (mode === 'modeCuston') {
        window.startedMode2(modeContainer)
    }
}
