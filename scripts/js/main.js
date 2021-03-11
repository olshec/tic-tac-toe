
let user;
let bot;
let gameStatus;
let activePlayer;
let countStep;

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
    
}

function printUserWin() {
    let messageResult = document.getElementsByClassName('message')[0];
    messageResult.hidden = false;
}

function printBotWin() {
    let messageResult = document.getElementsByClassName('message')[0];
    messageResult.childNodes[0].nodeValue = 'You lose!';
    messageResult.hidden = false;
}

function printDraw() {
    let messageResult = document.getElementsByClassName('message')[0];
    messageResult.childNodes[0].nodeValue = 'The draw!';
    messageResult.hidden = false;
}

function checkCells(cells, label) {
    let cl = [];
    for(let i = 0; i < cells.length; i++) {
        cl.push(cells[i].childNodes[0].nodeValue);
    }
    
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
    
function stopGame() {
    gameStatus = GameStatus.STOP;
    
    let cells = document.getElementsByClassName('cell');
    let win = this.checkCells(cells, 'X');
    if(win == true) {
        if(user.getLabel() == 'X') {
            printUserWin();
        } else {
            printBotWin();
        }
    } else {
        let win = this.checkCells(cells, 'O');
        if(win == true) {
            if(user.getLabel() == 'O') {
                printUserWin();
            } else {
                printBotWin();
            }
        } else {
            printDraw();
        }
    }
}


function afterPageLoad() {
    
    gameStatus = GameStatus.NEW;
    
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
        if(gameStatus == GameStatus.NEW) {
            let buttonX = document.getElementsByClassName('button-X')[0];
            if(buttonX.classList.contains('select-btn') == true) {
                user = new Human(TypeLabel.X);
                bot = new Bot(TypeLabel.O);
            } else {
                user = new Human(TypeLabel.O);
                bot = new Bot(TypeLabel.X);
            }
            
           this.style.background = 'rgb(110, 110, 110)';
           document.getElementsByClassName('button-X')[0].style.background = 
            'rgb(110, 110, 110)';
           document.getElementsByClassName('button-O')[0].style.background = 
            'rgb(110, 110, 110)';
           gameStatus = GameStatus.CONTINUE;
           countStep = 0;
           activePlayer = user;
        }

    });
    
    let cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('checked', 'false');
        cells[i].addEventListener('click', function() {
            if(gameStatus == GameStatus.CONTINUE) {
                if(cells[i].getAttribute('checked') == 'false') {
                    let lb = activePlayer.getLabel();
                    let node = document.createTextNode(lb);
                    this.appendChild(node);
                    this.setAttribute('checked', 'true');
                    if((activePlayer instanceof Human)) {
                        activePlayer = bot;
                    } else {
                        activePlayer = user;
                    }
                }
                countStep++;
                if(countStep == 9) {
                    stopGame();
                }
            }
        });
    }
};

afterPageLoad();


















