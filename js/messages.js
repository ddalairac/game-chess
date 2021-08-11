import { Game } from './game.js';
export class Messages {
    constructor() {
        this.feedbackElement = document.getElementById("feedback");
        this.blacksTimeElement = document.getElementById("blacksTime");
        this.whitesTimeElement = document.getElementById("whitesTime");
    }
    setFeedbackTimeOut(message, time = 5000) {
        this.feedbackElement.innerHTML = message;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.feedbackElement.innerHTML = "";
        }, 5000);
    }
    setFeedback(message = this.displayPlayerTurn()) {
        this.feedbackElement.innerHTML = message;
    }
    displayPlayerTurn() {
        return this.capitalize(Game.instance.playerTurn + "'s turn to move");
    }
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    setMoveMessages(isClick, slot, isMoveValid = undefined) {
        if (isClick) {
            if (!slot) {
                Game.instance.messages.setFeedbackTimeOut("The pieces are on the board");
            }
            else if (!slot.piece) {
                Game.instance.messages.setFeedbackTimeOut("There is not a piece there");
            }
            else if (slot.piece && slot.piece.color != Game.instance.playerTurn) {
                Game.instance.messages.setFeedbackTimeOut("It is not the turn of " + slot.piece.color + "'s to move");
            }
            else if (slot.piece) {
                Game.instance.messages.setFeedbackTimeOut(this.capitalize(slot.piece.color) + " " + slot.piece.type + " is selected");
            }
        }
        else {
            if (!slot) {
                if (!slot && Game.instance.board.selectedPiece) {
                    Game.instance.messages.setFeedbackTimeOut("You can't just take the " + Game.instance.board.selectedPiece.type + " off the board");
                }
            }
            else if (slot.piece == Game.instance.board.selectedPiece) {
                Game.instance.messages.setFeedbackTimeOut("It seems you regretted that move");
            }
            else if (!isMoveValid && Game.instance.board.selectedPiece) {
                Game.instance.messages.setFeedbackTimeOut("You can't put it there");
            }
        }
    }
    setTime(total, white, black) {
        this.blacksTimeElement.innerHTML = this.fotmatTime(black);
        this.whitesTimeElement.innerHTML = this.fotmatTime(white);
    }
    fotmatTime(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        let formattedTime = this.addLeftCero(hours) + ":" + this.addLeftCero(minutes) + ":" + this.addLeftCero(seconds);
        return formattedTime;
    }
    addLeftCero(time) {
        var timeString = time + "";
        if (timeString.length < 2) {
            return "0" + timeString;
        }
        else {
            return timeString;
        }
    }
}
//# sourceMappingURL=messages.js.map