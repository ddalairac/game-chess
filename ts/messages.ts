import { BoardSlot } from './board-slot.js';
import { Game } from './game.js';

export class Messages {
    constructor() {
        this.feedbackElement = document.getElementById("feedback")
        // this.totalTimeElement = document.getElementById("totalTime")
        this.blacksTimeElement = document.getElementById("blacksTime")
        this.whitesTimeElement = document.getElementById("whitesTime")
    }

    private feedbackElement: HTMLElement;
    // private totalTimeElement: HTMLElement;
    private blacksTimeElement: HTMLElement;
    private whitesTimeElement: HTMLElement;
    private timer: number;

    public setFeedbackTimeOut(message: string, time: number = 5000) {
        this.feedbackElement.innerHTML = message
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.displayPlayerTurn()
        }, 5000)
    }
    public setFeedback(message: string) {
        console.log(message)
        this.feedbackElement.innerHTML = message
    }

    public displayPlayerTurn() {
        if (!this.timer)
            this.setFeedback(this.capitalize(Game.instance.playerTurn + "'s turn to move"))
    }

    private capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    public setMoveMessages(isClick: boolean, slot: BoardSlot | undefined, isMoveValid: boolean | undefined = undefined): void {
        if (isClick) {
            // Click
            if (!slot) {
                Game.instance.messages.setFeedbackTimeOut("The pieces are on the board");
            } else if (!slot.piece) {
                Game.instance.messages.setFeedbackTimeOut("There is not a piece there");
            } else if (slot.piece && slot.piece.color != Game.instance.playerTurn) {
                Game.instance.messages.setFeedbackTimeOut("It is not the turn of " + slot.piece.color + "'s to move");
            } else if (slot.piece) {
                Game.instance.messages.setFeedbackTimeOut(this.capitalize(slot.piece.color) + " " + slot.piece.type + " is selected");
            }
        } else {
            //release
            if (!slot) {
                if (!slot && Game.instance.board.selectedPiece) {
                    Game.instance.messages.setFeedbackTimeOut("You can't just take the " + Game.instance.board.selectedPiece.type + " off the board");
                }
            } else if (slot.piece == Game.instance.board.selectedPiece) {
                Game.instance.messages.setFeedbackTimeOut("It seems you regretted that move");

            } else if (!isMoveValid && Game.instance.board.selectedPiece) {
                Game.instance.messages.setFeedbackTimeOut("You can't put it there");
            }
        }
    }

    public setTime(total: number, white: number, black: number) {
        // this.totalTimeElement.innerHTML = this.fotmatTime(total)
        this.blacksTimeElement.innerHTML = this.fotmatTime(black)
        this.whitesTimeElement.innerHTML = this.fotmatTime(white)
    }

    private fotmatTime(time): string {
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        let formattedTime = this.addLeftCero(hours) + ":" + this.addLeftCero(minutes) + ":" + this.addLeftCero(seconds)

        return formattedTime
    }

    private addLeftCero(time) {
        var timeString = time + "";
        if (timeString.length < 2) {
            return "0" + timeString;
        } else {
            return timeString;
        }
    }

}