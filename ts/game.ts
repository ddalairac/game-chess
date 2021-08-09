import { Board } from './board.js';
import { Piece } from './piece.js';
import { Render } from './render.js';

export class Game {

    constructor() {
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        console.log("Game instance")
        Game._instance = this
        this.starGame()
    }
    private static _instance: Game
    public static get instance() {
        return this._instance;
    }

    private nextTime: number = 0
    private delay: number = Math.round(1000 / 24)
    public board: Board | null = null
    public playerTurn: eColor
    public mouse = {
        x: 0,
        y: 0
    }
    public gameOver: boolean = false

    private frameLoop(time: number) {
        if (time < Game.instance.nextTime) {
            (window as any).requestAnimationFrame(Game.instance.frameLoop);
            return;
        }
        Game.instance.nextTime = time + Game.instance.delay;
        Render.instance.draw()

        if (Game.instance.gameOver == false) {
            requestAnimationFrame(Game.instance.frameLoop);
        }
    }

    public starGame() {
        // console.log("Game Start");
        Game.instance.board = new Board();
        Game.instance.playerTurn = eColor.white;
        (window as any).requestAnimationFrame(Game.instance.frameLoop);
    }
}
export enum eColor {
    white = "white",
    black = "black"
}