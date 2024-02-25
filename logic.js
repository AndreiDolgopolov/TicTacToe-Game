let selectCountPlayers = document.querySelector('#selectCountPlayers');
let countPlayers = 0;
let inputSizeBoard = document.querySelector('#sizeBoard');
let movePlayer = document.querySelector('.move_player');
let templateNamePlayers = ['x', 'o', 'w', 'm']
let players = []; 
let board = [[]];
let activePlayer = 0;

function createBoard(size) {
    table = new Array(size);
    for (let i = 0; i < size; i++) {
        table[i] = new Array(size).fill('');
    }
    return table;
}

function chooseActivePlayer() {
    if (activePlayer === 0) {
        activePlayer = players[Math.floor(Math.random() * countPlayers)];
    } else {
        indexOfPlayer = players.indexOf(activePlayer);
        indexOfPlayer + 1 >= players.length
            ? activePlayer = players[0]
            : activePlayer = players[indexOfPlayer + 1];
    }
    movePlayer.innerText = `Ход игрока №${players.indexOf(activePlayer)+1} - "${activePlayer}"`;
}

function isWinner(row, column) {
    countRow = 0;
    countColumn = 0;
    countLeftDiag = 0;
    countRightDiag = 0;
    numberRow = Number(row);
    numberColumn = Number(column);
    let lengthBoard = board.length;
    for (let i = 0; i < lengthBoard; i++) {
        for (let j = 0; j < lengthBoard; j++) {
            if (activePlayer !== board[i][j]) {
                continue;
            }
            countRow += Number(i === numberRow);
            countColumn += Number(j === numberColumn);
            countLeftDiag += Number(i === j);
            countRightDiag += Number(i === lengthBoard - j - 1);
        }
    }
    if (countRow === lengthBoard || countColumn === lengthBoard || countLeftDiag === lengthBoard || countRightDiag === lengthBoard) {
        return true;
    }

    return false;
}
function startGame() {
    board = createBoard(Number(inputSizeBoard.value));
    renderBoard(board);

    countPlayers = Number(selectCountPlayers.value);
    players = templateNamePlayers.slice(0, countPlayers);
    chooseActivePlayer(countPlayers);
}

function click(row, column) {
    board[row][column] = activePlayer;
    renderBoard(board);
    //Если размер поля большой, уменьшим шрифт
    if (inputSizeBoard.value > 7) {
        let fields = document.querySelectorAll('.field');
        fields.forEach(field => {            
            field.classList.add('very_little_fonts');
        });
            
    } else if (inputSizeBoard.value > 4) {
        let fields = document.querySelectorAll('.field');
        fields.forEach(field => {            
            field.classList.add('little_fonts');
        });
            
    }
    let isPlayerWinner = isWinner(row, column);
    isPlayerWinner ? showWinner(players.indexOf(activePlayer)) : chooseActivePlayer();
}

selectCountPlayers.addEventListener("change", function () {
    startGame();
});

inputSizeBoard.addEventListener("change", function () {    
    startGame();
});



