// Initial data
let currentQuestion = 0;
let corrrectAnswers = 0;

showQuestion();

// Functions
function showQuestion() { // Função para exibir a questão
    if(questions[currentQuestion]) { // Se questão for igual a primeira questão
        let q = questions[currentQuestion]; // Variavel para diminuir o codigo

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none'; // Muda o css da classe scoreArea
        document.querySelector('.questionArea').style.display = 'block'; // Muda o css da classe questionArea

        document.querySelector('.question').innerHTML = q.question; // Adicionar conteudo a classe question
        let optionsHtml = ''; // Monta a exibição das respotas
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; // parseInt = Tranforma string em number
        }
        document.querySelector('.options').innerHTML = optionsHtml; // Exibe as respostas na tela
    
        document.querySelectorAll('.options option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        // Acabaram as questoes
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        corrrectAnswers++;
    }
    
    currentQuestion++;
    showQuestion();

    
}