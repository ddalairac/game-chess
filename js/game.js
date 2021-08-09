import { Board } from './board.js';
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
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        console.log("Game instance");
        Game._instance = this;
        this.starGame();
    }
    static get instance() {
        return this._instance;
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
        window.requestAnimationFrame(Game.instance.frameLoop);
    }
}
export var eColor;
(function (eColor) {
    eColor["white"] = "white";
    eColor["black"] = "black";
})(eColor || (eColor = {}));
//# sourceMappingURL=game.js.map