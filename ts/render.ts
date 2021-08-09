import { eColor, Game } from './game.js';

export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        // console.log("Render instance")
        Render._instance = this
        this.canvas = document.getElementById("stage") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.getImgs();

        // set Canvas Size
        this.rezize()
        window.onresize = function () {
            Render.instance.rezize()
        }
    }
    private static _instance: Render
    public static get instance() {
        return this._instance;
    }
    get stageLimitX() {
        return this.ctx.canvas.width
    }
    get stageLimitY() {
        return this.ctx.canvas.height
    }
    public ctx: CanvasRenderingContext2D
    public canvas: HTMLCanvasElement
    private imgs = {}
    public boarSize: number = 0
    public slotSize: number = 0
    public topMargin: number = 0
    public leftMargin: number = 0

    private rezize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.getBoarSizeAndMargin()
        this.draw()
    }

    // cache img element
    private getImgs() {
        this.imgs = {
            King_black: document.getElementById("King_black"),
            Queen_black: document.getElementById("Queen_black"),
            Bishop_black: document.getElementById("Bishop_black"),
            Horse_black: document.getElementById("Horse_black"),
            Tower_black: document.getElementById("Tower_black"),
            Pawn_black: document.getElementById("Pawn_black"),
            King_white: document.getElementById("King_white"),
            Queen_white: document.getElementById("Queen_white"),
            Bishop_white: document.getElementById("Bishop_white"),
            Horse_white: document.getElementById("Horse_white"),
            Tower_white: document.getElementById("Tower_white"),
            Pawn_white: document.getElementById("Pawn_white"),
        }
    }

    private drawScuare(x: number, y: number, color: eColor, size: number) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.fillStyle = (color == eColor.white) ? "#FFF" : "#666";
        this.ctx.fill();
    }

    public getBoarSizeAndMargin() {
        let boarSize = (this.canvas.width - this.canvas.height < 0) ? this.canvas.width : this.canvas.height;
        if (boarSize > 600) {
            boarSize = 600
        }
        this.boarSize = boarSize - 30;

        let xSpace = (this.stageLimitX - boarSize > 0) ? this.stageLimitX - boarSize : 0;
        let ySpace = (this.stageLimitY - boarSize > 0) ? this.stageLimitY - boarSize : 0;

        this.topMargin = (ySpace > 0) ? ySpace / 2 : 0;
        this.leftMargin = (xSpace > 0) ? xSpace / 2 : 0;
        this.slotSize = boarSize / 8;

        // return { boarSize, slotSize, topMargin, leftMargin }
    }


    private drawBoard() {
        if (Game.instance && Game.instance.board && Game.instance.board.slots) {
            Game.instance.board.slots.forEach(slot => {
                // Draw Board scuare
                let yPx = (slot.y * this.slotSize) + this.topMargin;
                let xPx = (slot.x * this.slotSize) + this.leftMargin;
                this.drawScuare(xPx, yPx, slot.color, this.slotSize)

                // Draw static pieces
                if (slot.piece) {
                    if (!slot.piece.isSelected) {
                        this.ctx.drawImage(this.imgs[slot.piece.img], xPx, yPx, this.slotSize, this.slotSize);
                    }
                }
            });
        }
    }
    private drawMovingPiece() {
        if (Game.instance && Game.instance.board && Game.instance.board.selectedPiece) {
            let Xmouse = Game.instance.mouse.x - (this.slotSize/2);
            let Ymouse = Game.instance.mouse.y - (this.slotSize/2);
            let piece = Game.instance.board.selectedPiece;
            this.ctx.drawImage(this.imgs[piece.img], Xmouse, Ymouse, this.slotSize, this.slotSize);
        }
    }
    public draw() {
        // borrar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar canvas
        this.drawBoard()
        this.drawMovingPiece()
    }
}