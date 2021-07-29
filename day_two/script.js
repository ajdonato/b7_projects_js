// Relógio Digital

let digitalElement = document.querySelector('.digital')
let sElement = document.querySelector('.p_s')
let mElement = document.querySelector('.p_m')
let hElement = document.querySelector('.p_h')

function updateClock() { // função para atualizar a hora
    let now = new Date() // Date manipula as horas e datas no js
    let hour = now.getHours() // pega horas
    let minute = now.getMinutes() //pega minutos
    let second = now.getSeconds() // pega segundos

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`

    // Relógio Analógico => INICIO

    let sDeg = ((360 / 60) * second) + 270  // faz o calculo dos segundos em graus e retira 90 graus para alinhar o ponteiro do segundo
    let mDeg = ((360 / 60) * minute) - 90
    let hDeg = ((360 / 12) * hour)  - 90

    sElement.style.transform = `rotate(${sDeg}deg)` // faz o ponteiro segundo girar
    mElement.style.transform = `rotate(${mDeg}deg)` // faz o ponteiro minuto girar
    hElement.style.transform = `rotate(${hDeg}deg)` // faz o ponteiro hora girar

    // Relógio Analógico => FIM
}

function fixZero(time) { // função para acrescentar o zero antes
    if (time < 10) {
        return '0'+time  // versão longa
    } else {
        return time
    }

    // return time < 10 ? `0${time}` : time // versão curta
}

setInterval(updateClock, 1000); // executa a função a cada um segundo, 1000ms = 1s
updateClock() // permite atulizar a tela e as horas não resetam