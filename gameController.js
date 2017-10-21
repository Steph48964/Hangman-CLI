var _inquirer = require ("inquirer");
var _word = require ("./Word");

function GameController() {
 
    this.wordList = [
        "celestial",
        "galaxy",
        "nebula",
        "quasars",
        "supernova"
    ];
 
    this.word;
    this.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

GameController.prototype.guesses = 6;

GameController.prototype.welcome = function() {
    console.log("Hi, welcome to the Hangman Game!");

    _inquirer.prompt([ 
        {
            type: "list",
            name: "welcome",
            message: "What would you like to do?",
            choices: [
                "Play",
                "Exit"
            ]
        }

    ]).then(function (answers) {
       
        if (answers.welcome == "Play")
        {
            this.play();
        } else {
            this.exit();
        }
    }.bind(this)); 
};

GameController.prototype.play = function() {
    var randomNumber = this.getRandomInt(0, this.wordList.length -1);
    var randomWordFromWordList = this.wordList[randomNumber];
    this.word = new _word.Word(randomWordFromWordList);
    this.guesses = GameController.prototype.guesses;

    console.log("The category is \"SPACE\".");
    this.guess();
};

GameController.prototype.guess = function() {
    var doneWithGame = false;

    console.log("-------------------------------------");
    console.log("WORD: ", this.word.display());
    console.log("You have ", this.guesses, " guesses remaining.");
    console.log("-------------------------------------");

    _inquirer.prompt([ 
        {
            type: "input",
            name: "guess",
            message: "Guess a letter."
        }

    ]).then(function (answers) {
 
        if (this.word.guessLetter(answers.guess) == false) {
            console.log("Nope, guess again.");
            this.guesses --;

            if (this.guesses == 0) {
                console.log("Sorry, you\'re out of guesses.");
                doneWithGame = true;
            }       
        } else {
            if (this.word.isWordGuessed()) {
                console.log("WORD: ", this.word.display());
                console.log("Yay, you guessed correctly!");
                doneWithGame = true;
            } 
        }

        if (doneWithGame == false) {
            this.guess();
        } else {

            _inquirer.prompt([ 
                {
                    type: "list",
                    name: "menu",
                    message: "What would you like to do?",
                    choices: [
                        "Play again",
                        "Exit"
                    ]
                }

            ]).then(function (answers) {
                if (answers.menu == "Play again") {
                    this.play();  
                    return;
                } else {
                    this.exit();
                    return; 
                }
            }.bind(this));
        }
    }.bind(this)); 
};

GameController.prototype.exit = function() {
    console.log("Thanks for playing!");
};


module.exports = {
    GameController: GameController
};
