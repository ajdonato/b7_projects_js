document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault(); //previne que o form não seja enviado

    let input = document.querySelector('#searchInput').value; // pega p que foi digitando dentro do input

    if (input !== '') { // SE(if) o valor for DIFERENTE(!==) de zero
        clearInfo(); // limpa a tela
        showWarning('Carregando...'); // coloca o aviso de carregando

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=62758dcec7ebacb9d4fb43af452e0089&units=metric&lang=pt_br` //encodeURI permite enviar dados sem acentos e espaçs para o navegador
        
        let results = await fetch(url); // pegar e guardar a url
        let json = await results.json(); // transformar em json

        if(json.cod === 200) {
            showInfo({ // mostrar os dados no site mostrar
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos essa localização');
        }
    } else {
        clearInfo(); // limpa a tela
        showWarning('Digite o nome de uma cidade');
    }

});

function showInfo(json) { //função para mostrar os dados na tela
    showWarning(''); // remove o carregando

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`; // mostra o nome da cidade e pais
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`; // mostra a temp
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`; // mostra velocidade do vento

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) // mostra a img , comando setAtribut alterar a url junto a uma template string para alterar parte da url
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`; //altera o angulo da seta do vento

    document.querySelector('.resultado').style.display = 'block'; // mostra dos resultados sem o valores
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'; // função para limpar a tela ao trocar de cidade

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg; // função paara por o aviso de carregando quando o user faz uma busca
};