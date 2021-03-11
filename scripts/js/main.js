
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
            if (cells[i].childNodes.length == 1) {
                cl.push(cells[i].childNodes[0].nodeValue);
            } else {
                 cl.push('z');
            }
        }
        return this.checkList(cl, label);
        
    }
    
    checkList(cl, label) {
        if (cl[0] == label && cl[1] == label && cl[2] == label ||
           cl[3] == label && cl[4] == label && cl[5] == label ||
           cl[6] == label && cl[7] == label && cl[8] == label ||
           cl[0] == label && cl[3] == label && cl[6] == label ||
           cl[1] == label && cl[4] == label && cl[7] == label ||
           cl[2] == label && cl[5] == label && cl[8] == label ||
           cl[0] == label && cl[4] == label && cl[8] == label ||
           cl[2] == label && cl[4] == label && cl[6] == label   ) {
            return true;
        }
        return false;
    }
    
    checkGame() {
        this.addCountStep();
        
        if (this.getCountStep() == 9) {
            this.setGameStatus(GameStatus.STOP);
        }
        
        let cells = document.getElementsByClassName('cell');
        let win = this.checkCells(cells, TypeLabel.X);
        if (win == true) {
            this.setGameStatus(GameStatus.STOP);
            if (this.getUser().getLabel() == TypeLabel.X) {
                this.printUserWin();
            } else {
                this.printBotWin();
            }
        } else {
            let win = this.checkCells(cells, TypeLabel.O);
            if (win == true) {
                this.setGameStatus(GameStatus.STOP);
                if (this.getUser().getLabel() == TypeLabel.O) {
                    this.printUserWin();
                } else {
                    this.printBotWin();
                }
            } else if (this.getGameStatus() == GameStatus.STOP) {
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
        let indexCell = -1;
        for(let i = 0; i < cl.length; i++) {
            if (cl[i] == this.emptySymbol) {
                indexCell = i;
            }
        }
        return indexCell;
    }
    
    cellsToList(cells) {
        let cl = [];
        for(let i = 0; i < cells.length; i++) {
            if (cells[i].childNodes.length == 1) {
                cl.push(cells[i].childNodes[0].nodeValue);
            } else {
                 cl.push(this.emptySymbol);
            }
        }
        return cl;
    }
    
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    getCornerIndex(cl, game) {
        let userLabel = game.getUser().getLabel();
        if (cl[0] == userLabel) {
            return 2;
        } else if (cl[2] == userLabel) {
            return 8;
        } else if (cl[6] == userLabel) {
            return 0;
        } else if (cl[8] == userLabel) {
            return 6;
        }
        let rand = this.getRandomInt(4);
        if (rand == 0) {
            return 0;
        } else if (rand == 1) {
            return 2;
        } else if (rand == 2) {
            return 6;
        } else if (rand == 3) {
            return 8;
        }
    }
    
    ortogonalCorner(cl, game) {
        let userLabel = game.getUser().getLabel();
        if (cl[1] == userLabel) {
            if (cl[6] == this.emptySymbol) return 6;
            if (cl[8] == this.emptySymbol) return 8;
        } else if (cl[3] == userLabel) {
            if (cl[2] == this.emptySymbol) return 2;
            if (cl[8] == this.emptySymbol) return 8;
        } else if (cl[5] == userLabel) {
            if (cl[0] == this.emptySymbol) return 0;
            if (cl[6] == this.emptySymbol) return 6;
        } else if (cl[7] == userLabel) {
            if (cl[0] == this.emptySymbol) return 0;
            if (cl[2] == this.emptySymbol) return 2;
        }
        return -1;
    }
    
    getBestStep(cl, game) {
       for(let i = 0; i < cl.length; i++) {
            if (cl[i] == this.emptySymbol){
                cl[i] = this.getLabel();
                let result = game.checkList(cl, this.getLabel());
                cl[i] = this.emptySymbol;
                if (result == true) {
                    return i;
                }
            }
        }
        let userLabel = game.getUser().getLabel();
        for(let i = 0; i < cl.length; i++) {
            if (cl[i] == this.emptySymbol){
                cl[i] = userLabel;
                let result = game.checkList(cl, userLabel);
                cl[i] = this.emptySymbol;
                if (result == true) {
                    return i;
                }
            }
        }
        return -1;
    }
    
    getCell(cl, game) {
        
        let countStep = game.getCountStep();
        let label = this.getLabel();
        if (label == TypeLabel.X) {
            if (countStep == 0) {
                if (cl[4] == this.emptySymbol) {
                    return 4;
                } 
            } else if (countStep == 2) {
                return this.getCornerIndex(cl, game);
            } else {
                let bestStep = this.getBestStep(cl, game);
                if (bestStep != -1) {
                    return bestStep;
                }
                let ortogonalCorner = this.ortogonalCorner(cl, game);
                if (ortogonalCorner != -1) {
                    return ortogonalCorner;
                }
            }
        } else if (label == TypeLabel.O) {
            if (countStep == 1) {
                if (cl[4] == this.emptySymbol) {
                    return 4;
                } 
            } else if (countStep == 2) { 
                
            }
        }


        let indexCell = this.getEmptyCell(cl);
        return indexCell;
    }
}




function startNewGame() {
    game = new Game();
    game.setGameStatus(GameStatus.NEW);
    
    let cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('checked', 'false');
        if (cells[i].childNodes.length == 1) {
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
        if (this.classList.contains('select-btn') == false) {
            this.classList.add('select-btn');
            let buttonO = document.getElementsByClassName('button-O')[0];
            buttonO.classList.remove('select-btn');
        }
    });
    
    let buttonO = document.getElementsByClassName('button-O')[0];
    buttonO.addEventListener('click', function() {
        if (this.classList.contains('select-btn') == false) {
            this.classList.add('select-btn');
            let buttonX = document.getElementsByClassName('button-X')[0];
            buttonX.classList.remove('select-btn');
        }
    });
    
    let buttonStart = document.getElementsByClassName('button-start')[0];
    buttonStart.addEventListener('click', function(){
        if (game.getGameStatus() == GameStatus.NEW) {
            
            this.childNodes[0].nodeValue = 'Start new game';
            
            let buttonX = document.getElementsByClassName('button-X')[0];
            if (buttonX.classList.contains('select-btn') == true) {
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
           
           if (game.getUser().getLabel() == TypeLabel.O) {           
                if (game.getGameStatus() != GameStatus.STOP) {
                    let cells = document.getElementsByClassName('cell');
                    let cl = game.getBot().cellsToList(cells);
                    let indexCell = game.getBot().getCell(cl, game);
                    let lb = game.getBot().getLabel();
                    let node = document.createTextNode(lb);
                    cells[indexCell].appendChild(node);
                 }
                 game.checkGame();
           }
           
        } else {
            startNewGame();
        }
        

    });
    
    let cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('checked', 'false');
        cells[i].addEventListener('click', function() {
            if (game.getGameStatus() == GameStatus.CONTINUE) {
                if (cells[i].getAttribute('checked') == 'false') {
                    let lb = game.getUser().getLabel();
                    let node = document.createTextNode(lb);
                    this.appendChild(node);
                    this.setAttribute('checked', 'true');
                
                    game.checkGame();
                         
                    if (game.getGameStatus() != GameStatus.STOP) {
                        let cells = document.getElementsByClassName('cell');
                        let cl = game.getBot().cellsToList(cells);
                        let indexCell = game.getBot().getCell(cl, game);
                        let lb = game.getBot().getLabel();
                        let node = document.createTextNode(lb);
                        cells[indexCell].appendChild(node);
                    }
                    game.checkGame();
               }
            }
        });
    }
};

afterPageLoad();


















