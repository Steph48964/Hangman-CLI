function Letter (letter) {

    this.letter = letter;

    if (this.letter == " ") {
        this.letterDisplay = "  ";
        this.isLetterGuessed = true;
    } else {
        this.letterDisplay = "_";
        this.isLetterGuessed = false;
    }
};

Letter.prototype.GuessLetter = function(guess) {
    if (this.letter == guess) {
        this.isLetterGuessed = true;
        this.letterDisplay = this.letter;
        return true;
    } else {
        return false;
    }
};

module.exports = {
    Letter: Letter
};