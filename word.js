var _letter = require ("./Letter");

function Word(word) {
  
    this.word = word;
    this.letters = [];
    this.initialize();
};

Word.prototype.initialize = function() {
    for (var index = 0; index < this.word.length; index++) {
        var letterObj = new _letter.Letter(this.word.charAt(index));
        this.letters.push(letterObj);
    }
};

Word.prototype.isWordGuessed = function() {
    for (var index = 0; index < this.letters.length; index++) {
        var letterObj = this.letters[index];
        if (letterObj.isLetterGuessed == false) {
            return false;
        }
    }

    return true;
};

Word.prototype.guessLetter = function(guess) {
    var result = false;

    for (var index = 0; index < this.letters.length; index++) {
        var letterObj = this.letters[index];
        if (letterObj.GuessLetter(guess)) {
            result = true;
        }
    }

    return result;
};

Word.prototype.display = function() {
    var result = " ";

    for (var index = 0; index < this.letters.length; index++) {
        var letterObj = this.letters[index];
        result = result + " " + letterObj.letterDisplay; 
    }

    return result;
};

module.exports = {
    Word: Word
};
