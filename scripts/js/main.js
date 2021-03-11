
let user;
let bot;
let gameStatus;
let activePlayer;

class GameStatus 
{
    static NEW = '1';
    static CONTINUE = '2';
}

class TypeLabel 
{
  static X = 'X';
  static O = 'O';
}

class User 
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
         let buttonX = document.getElementsByClassName('button-X')[0];
         if(buttonX.classList.contains('select-btn') == true) {
            user = new User(TypeLabel.X);
            bot = new User(TypeLabel.O);
        } else {
            user = new User(TypeLabel.O);
            bot = new User(TypeLabel.X);
        }
        
       this.style.background = 'rgb(110, 110, 110)';
       gameStatus = GameStatus.CONTINUE;
       activePlayer = user;
    });
    
    let cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('checked', 'false');
        cells[i].addEventListener('click', function() {
            if(cells[i].getAttribute('checked') == 'false') {
                let lb = activePlayer.getLabel();
                let node = document.createTextNode(lb);
                this.appendChild(node);
                this.setAttribute('checked', 'true');
            }
        });
    }
};

afterPageLoad();


















