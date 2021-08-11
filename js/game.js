import { Actions } from './actions.js';
import { Board } from './board.js';
import { Messages } from './messages.js';
import { Render } from './render.js';
export class Game {
    constructor() {
        this.nextTime = 0;
        this.delay = Math.round(1000 / 24);
        this.board = null;
        this.mouse = {
            x: 0,
            y: 0
        };
        this.gameOver = false;
        this.secondsTotal = 0;
        this.secondsWhite = 0;
        this.secondsBlack = 0;
        this.secondsInterval = 0;
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this;
        this.starGame();
    }
    static get instance() {
        return this._instance;
    }
    setTime() {
        Game.instance.secondsTotal++;
        if (Game.instance.playerTurn == eColor.white) {
            Game.instance.secondsWhite++;
        }
        else {
            Game.instance.secondsBlack++;
        }
        Game.instance.messages.setTime(Game.instance.secondsTotal, Game.instance.secondsWhite, Game.instance.secondsBlack);
    }
    frameLoop(time) {
        if (time < Game.instance.nextTime) {
            window.requestAnimationFrame(Game.instance.frameLoop);
            return;
        }
        Game.instance.nextTime = time + Game.instance.delay;
        Render.instance.draw();
        if (Game.instance.gameOver == false) {
            requestAnimationFrame(Game.instance.frameLoop);
        }
    }
    starGame() {
        Game.instance.board = new Board();
        Game.instance.playerTurn = eColor.white;
        Game.instance.actions = new Actions();
        Game.instance.messages = new Messages();
        Game.instance.messages.setFeedback();
        if (this.secondsInterval)
            clearInterval(this.secondsInterval);
        this.secondsInterval = setInterval(this.setTime, 1000);
        window.requestAnimationFrame(Game.instance.frameLoop);
    }
}
export var eColor;
(function (eColor) {
    eColor["white"] = "white";
    eColor["black"] = "black";
})(eColor || (eColor = {}));
//# sourceMappingURL=game.js.map