import { Render } from './render.js';
export class Game {
    constructor() {
        this.nextTime = 0;
        this.delay = Math.round(1000 / 24);
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
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
    }
    starGame() {
        console.log("Game Start");
        window.requestAnimationFrame(Game.instance.frameLoop);
    }
}
export var ePlayer;
(function (ePlayer) {
    ePlayer["white"] = "white";
    ePlayer["black"] = "black";
})(ePlayer || (ePlayer = {}));
//# sourceMappingURL=game.js.map