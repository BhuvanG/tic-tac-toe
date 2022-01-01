const gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }
    let x = [];
    let o = [];
    
    let createBoard = () => {
        let conatiner = document.querySelector('.container')
        let grid = document.createElement('div');
        grid.classList.add('grid');
        conatiner.appendChild(grid);

        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.classList.add('square')
            square.id = i;
            square.addEventListener("click", (e) => {
                if (board[e.target.id] == '') {
                    board[e.target.id] = game.currentPlayer.mark;
                    if (game.currentPlayer.mark == 'x') {
                        x.push(parseInt(e.target.id))
                    } else {
                        o.push(parseInt(e.target.id))
                    }
                    game.gameResult();
                    game.changePlayer();

                    displayMark();

                }
            })

            grid.appendChild(square);
        }
    }

    let displayMark = () => {
        let squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            let i = parseInt(square.id);
            square.textContent = board[i];

        })
    }
    

    return {
        createBoard,
        board,
        x,
        o
    }
})();

let players = (name, mark) => {
    return {
        name,
        mark
    }
};

let game = (() => {
   
    let player1 = players('player1', 'x');
    let player2 = players('player2', 'o');

    let currentPlayer = player1;



    let changePlayer = () => {
        if (game.currentPlayer.name === game.player1.name) {
            game.currentPlayer = game.player2
        } else {
            game.currentPlayer = game.player1
        }
    }
    let gameResult= () => {
        let win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        win.forEach(element => {
            if (element.every(val => gameBoard.x.includes(val))) {
                console.log("player 1")
            } 
            if (element.every(val => gameBoard.o.includes(val))) {
                console.log("player 2")
            } 
            
        })
        if(!gameBoard.board.includes('')){
            console.log("draw")
        }
    }
    return {
        player1,
        player2,
        currentPlayer,
        changePlayer,
        gameResult

    }
})();

gameBoard.createBoard();