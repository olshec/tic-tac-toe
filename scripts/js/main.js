
let game;





class Game 
{
    countStep;
    gameStatus;
    user;
    bot;
    activePlayer;
    
    constructor() {
        this.setCountStep(0);
        this.setGameStatus(GameStatus.NEW);
    }
    
    setCountStep(countStep) {
        this.countStep = countStep;
    }
    
    setGameStatus(gameStatus) {
        this.gameStatus = gameStatus;
    }
    
    setUser(user) {
        this.user = user;
    }
    
    setBot(bot) {
        this.bot = bot;
    }
    
    setActivePlayer(activePlayer) {
        this.activePlayer = activePlayer;
    }
    
    getCountStep() {
        return this.countStep;
    }
    
    getGameStatus() {
        return this.gameStatus;
    }
    
    getUser() {
        return this.user;
    }
    
    getBot() {
        return this.bot;
    }
    
    getActivePlayer() {
        return this.activePlayer;
    }
    
    addCountStep() {
        this.countStep++;
    }
    
    checkCells(cells, label) {
        let cl = [];
        for(let i = 0; i < cells.length; i++) {
            if(cells[i].childNodes.length == 1) {
                cl.push(cells[i].childNodes[0].nodeValue);
            } else {
                 cl.push('z');
            }
        }
        return this.checkList(cl, label);
        
    }
    
    checkList(cl, label) {
        if(cl[0] == label && cl[1] == label && cl[2] == label ||
           cl[3] == label && cl[4] == label && cl[5] == label ||
           cl[6] == label && cl[7] == label && cl[8] == label ||
           cl[0] == label && cl[3] == label && cl[6] == label ||
           cl[1] == label && cl[4] == label && cl[7] == label ||
           cl[2] == label && cl[5] == label && cl[8] == label ||
           cl[0] == label && cl[4] == label && cl[8] == label ||
           cl[2] == label && cl[4] == label && cl[6] == label   ){
            return true;
        }
        return false;
    }
    
    checkGame() {
        this.addCountStep();
        
        if(this.getCountStep() == 9) {
            this.setGameStatus(GameStatus.STOP);
        }
        
        let cells = document.getElementsByClassName('cell');
        let win = this.checkCells(cells, 'X');
        if(win == true) {
            this.setGameStatus(GameStatus.STOP);
            if(this.getUser().getLabel() == 'X') {
                this.printUserWin();
            } else {
                this.printBotWin();
            }
        } else {
            let win = this.checkCells(cells, 'O');
            if(win == true) {
                this.setGameStatus(GameStatus.STOP);
                if(this.getUser().getLabel() == 'O') {
                    this.printUserWin();
                } else {
                    this.printBotWin();
                }
            } else if (GameStatus.STOP == this.getGameStatus()) {
                this.printDraw();
            }
        }
    }
    
    printUserWin() {
        let messageResult = document.getElementsByClassName('message')[0];
        messageResult.childNodes[0].nodeValue = 'You win!';
        messageResult.hidden = false;
    }

    printBotWin() {
        let messageResult = document.getElementsByClassName('message')[0];
        messageResult.childNodes[0].nodeValue = 'You lose!';
        messageResult.hidden = false;
    }

    printDraw() {
        let messageResult = document.getElementsByClassName('message')[0];
        messageResult.childNodes[0].nodeValue = 'The draw!';
        messageResult.hidden = false;
    }

}

class GameStatus 
{
    static NEW = '1';
    static CONTINUE = '2';
    static STOP = '3';
}

class TypeLabel 
{
  static X = 'X';
  static O = 'O';
}

class Player 
{
    label;
    score;
    constructor(label) {
        this.setLabel(label);
        this.setScore(0);
    }
    
    getLabel() {
        return this.label;
    }
    
    getScore() {
        return this.score;
    }
    
    setLabel(label) {
        this.label = label;
    }
    
    setScore(score) {
        this.score = score;
    }
}

class Human extends Player
{
    
}

class Bot extends Player
{
    emptySymbol = 'z';
    
    getEmptyCell(cl) {
        let indexCell = 0;
        for(let i = 0; i < cl.length; i++) {
            if(cl[i] == this.emptySymbol) {
                countEmptyCell++;
                indexCell = i;
            }
        }
        return indexCell;
    }
    
    cellsToList(cells) {
        let cl = [];
        for(let i = 0; i < cells.length; i++) {
            if(cells[i].childNodes.length == 1) {
                cl.push(cells[i].childNodes[0].nodeValue);
            } else {
                 cl.push(this.emptySymbol);
            }
        }
        return cl;
    }
    
    getCell(cells, game) {
        let cl = this.cellsToList(cells);
        let indexCell = this.getEmptyCell(cl);
        let countEmptyCell = 0;
        
        if(countEmptyCell == 1) {
            return indexCell;
        }
        
        for(let i = 0; i < cl.length; i++) {
            if(cl[i] == emptySymbol) {
                cl[i] = this.getLabel();
                let result = game.checkList(cl, this.getLabel());
                if(result == true) {
                    indexCell = i;
                    break;
                } else {
                    
  
                    indexCell = this.getCell(cl, game);
                    break;
                } 
            }
        }
        return indexCell;
    }
}




function startNewGame() {
    game = new Game();
    game.setGameStatus(GameStatus.NEW);
    
    let cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('checked', 'false');
        if(cells[i].childNodes.length == 1) {
            cells[i].childNodes[0].remove();
        }
    }
    document.getElementsByClassName('button-start')[0].classList.remove('red-btn');
    document.getElementsByClassName('button-X')[0].classList.remove('gray-btn');
    document.getElementsByClassName('button-O')[0].classList.remove('gray-btn');
    document.getElementsByClassName('message')[0].hidden = true;
}    



function afterPageLoad() {
    game = new Game();
    
    
    let buttonX = document.getElementsByClassName('button-X')[0];
    buttonX.addEventListener('click', function() {
        if(this.classList.contains('select-btn') == false) {
            this.classList.add('select-btn');
            let buttonO = document.getElementsByClassName('button-O')[0];
            buttonO.classList.remove('select-btn');
        }
    });
    
    let buttonO = document.getElementsByClassName('button-O')[0];
    buttonO.addEventListener('click', function() {
        if(this.classList.contains('select-btn') == false) {
            this.classList.add('select-btn');
            let buttonX = document.getElementsByClassName('button-X')[0];
            buttonX.classList.remove('select-btn');
        }
    });
    
    let buttonStart = document.getElementsByClassName('button-start')[0];
    buttonStart.addEventListener('click', function(){
        if(game.getGameStatus() == GameStatus.NEW) {
            
            this.childNodes[0].nodeValue = 'Start new game';
            
            let buttonX = document.getElementsByClassName('button-X')[0];
            if(buttonX.classList.contains('select-btn') == true) {
                game.setUser(new Human(TypeLabel.X));
                game.setBot(new Bot(TypeLabel.O));
            } else {
                game.setUser(new Human(TypeLabel.O));
                game.setBot(new Bot(TypeLabel.X));
            }
            
           this.classList.add('red-btn');
           document.getElementsByClassName('button-X')[0].classList.add('gray-btn');
           document.getElementsByClassName('button-O')[0].classList.add('gray-btn');
           game.setGameStatus(GameStatus.CONTINUE);
           game.setCountStep(0);
           if(game.getUser().getLabel() == TypeLabel.X) {
                game.setActivePlayer(game.getUser());
           } else {
                game.setActivePlayer(game.getBot());
           }
           
        } else {
            startNewGame();
        }
        

    });
    
    let cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('checked', 'false');
        cells[i].addEventListener('click', function() {
            if(game.getGameStatus() == GameStatus.CONTINUE) {
                if(cells[i].getAttribute('checked') == 'false') {
                    let lb = game.getActivePlayer().getLabel();
                    let node = document.createTextNode(lb);
                    this.appendChild(node);
                    this.setAttribute('checked', 'true');
                    if((game.getActivePlayer() instanceof Human)) {
                        game.setActivePlayer(game.getBot())
                    } else {
                        game.setActivePlayer(game.getUser())
                    }
                }
                 game.checkGame();
            }
        });
    }
};

afterPageLoad();


















