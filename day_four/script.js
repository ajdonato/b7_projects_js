// Initial data
let board = {
    a1: '', a2:'', a3:'',
    b1: '', b2:'', b3:'',
    c1: '', c2:'', c3:''
};
let player = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset); // Command for reset the board
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick); // Add event click in all div item
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item'); // Know the house that was clicked
    if(playing && board[item] === '') {
        board[item] = player;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    warning = ''; // Clear warnings

    let random = Math.floor(Math.random() * 2); // Var create random number 0 or 1
    player = (random === 0) ? 'X' : 'O'; // If random for =O receive X, else receive O

    for(let i in board) {
        board[i] = ''; // Clear the board
    }

    playing = true;

    renderBoard();
    renderInfo();
}

function renderBoard(){
    for(let i in board) { // Get objects from board
        let item = document.querySelector(`div[data-item=${i}]`); // Get data-item fom HTML
        item.innerHTML = board[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player; // Add player
    document.querySelector('.resultado').innerHTML = warning;// Add result
} 

function togglePlayer() {
    player = (player === 'X') ? 'O' : 'X'; // If player is X insert O, else insert X
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('X')) {
        warning = 'O "X" venceu';
        playing = false;
    } else if(checkWinnerFor('O')) {
        warning = 'O "O" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    };
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); // Remove ',' from array
        let hasWin = pArray.every(option => board[option] === player);
        if(hasWin){
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in board) {
        if(board[i] === '') {
            return false;
        }
    }

    return true;
}