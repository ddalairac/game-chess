import { Actions } from './actions.js';
import { Board } from './board.js';
import { Messages } from './messages.js';
import { Render } from './render.js';

export class Game {

    constructor() {
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
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
    public messages: Messages;
    public playerTurn: eColor
    public actions
    public mouse = {
        x: 0,
        y: 0
    }
    public gameOver: boolean = false

    private secondsTotal: number = 0
    private secondsWhite: number = 0
    private secondsBlack: number = 0
    private secondsInterval: number = 0

    private setTime() {
        let inst = Game.instance
        inst.secondsTotal++
        if(inst.playerTurn == eColor.white) {
            inst.secondsWhite++
        } else {
            inst.secondsBlack++
        }
        inst.messages.setTime(inst.secondsTotal, inst.secondsWhite, inst.secondsBlack);
    }
    private reSetTime(){
        console.log("resetTime")
        let inst = Game.instance
        if (inst.secondsInterval) clearInterval(inst.secondsInterval);

        inst.secondsTotal = 0
        inst.secondsWhite = 0
        inst.secondsBlack = 0
        inst.messages.setTime(inst.secondsTotal, inst.secondsWhite, inst.secondsBlack);
        inst.secondsInterval = setInterval(this.setTime, 1000);
    }

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
        Game.instance.actions = new Actions();
        Game.instance.messages = new Messages();
        Game.instance.messages.setFeedbackTimeOut("A new game begins");
        Game.instance.reSetTime();

        (window as any).requestAnimationFrame(Game.instance.frameLoop);
    }
}
export enum eColor {
    white = "white",
    black = "black"
}