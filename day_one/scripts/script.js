document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLocaleLowerCase()) //captura a tecla presionada no teclado
})

document.querySelector('.composer button').addEventListener('click', () => { //adiciona evento no button para tocar a musica dgigitada
    let song = document.querySelector('#input').value //pega o que foi digitado no input

    if(song !== '') { // se song for diferente de vaazio
        let songArrays = song.split('') // criar uma array seprando letra por letra
        playComposition(songArrays)
    }
})

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`) // pefa o audio a ser executado
    let keyElement = document.querySelector(`div[data-key="${sound}"]`) // pega apenas as teclas com data-key a serem precionadas

    if(audioElement) {
        audioElement.currentTime = 0 // reseta o audio quando a teccla precionado bem rapido
        audioElement.play() // executa o arquivo de audio
    }

    if(keyElement) {
        keyElement.classList.add('active') // adiciona a classe active para mudar a cor da letra e da borda

        setTimeout(() => {
            keyElement.classList.remove('active') // remove a classe active para mudar a cor da letra e da borda
        }, 300) //espera 300 milisegundos antes de remover a classe active
    }
}

function playComposition(songArrays) {
    let wait = 0 //tempo entre as teclas

    for(let songItem of songArrays) { // loop de repetição
        setTimeout(() => {
            playSound(`key${songItem}`) // toca o som dad letra
        }, wait)

        wait += 250 // adiona 250 milisegundos a cada letra
    }
}