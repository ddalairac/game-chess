import { eColor, Game } from './game.js';

export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this
        this.canvas = document.getElementById("stage") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.setImgCache();
        this.rezize()
        window.onresize = function () {
            Render.instance.rezize()
        }
    }

    private static _instance: Render
    public static get instance() {
        return this._instance;
    }

    private ctx: CanvasRenderingContext2D
    private imgs = {}

    public canvas: HTMLCanvasElement
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

    private setImgCache() {
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

    private getBoarSizeAndMargin() {
        let boarSize = (this.canvas.width - this.canvas.height < 0) ? this.canvas.width : this.canvas.height;
        if (boarSize > 600) {
            boarSize = 600
        }
        boarSize = boarSize - 30;
        this.boarSize = boarSize;

        let xSpace = (this.canvas.width - boarSize > 0) ? this.canvas.width - boarSize : 0;
        let ySpace = (this.canvas.height - boarSize > 0) ? this.canvas.height - boarSize : 0;

        this.topMargin = (ySpace > 0) ? ySpace / 2 : 0;
        this.leftMargin = (xSpace > 0) ? xSpace / 2 : 0;
        this.slotSize = boarSize / 8;
    }

    private drawScuare(x: number, y: number, color: eColor, size: number, isValidMove: boolean) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        if (isValidMove) {
            this.ctx.fillStyle = (color == eColor.white) ? "#d9ff8e" : "#a8d452";
        } else {
            this.ctx.fillStyle = (color == eColor.white) ? "#FFF" : "#999";
        }
        this.ctx.fill();


    }

    private drawBoard() {
        if (Game.instance && Game.instance.board && Game.instance.board.slots) {
            Game.instance.board.slots.forEach(slot => {
                // Draw Board scuare
                let yPx = (slot.y * this.slotSize) + this.topMargin;
                let xPx = (slot.x * this.slotSize) + this.leftMargin;
                this.drawScuare(xPx, yPx, slot.color, this.slotSize, slot.isValidMove)

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
            let Xmouse = Game.instance.mouse.x - (this.slotSize / 2);
            let Ymouse = Game.instance.mouse.y - (this.slotSize / 2);
            let piece = Game.instance.board.selectedPiece;
            this.ctx.drawImage(this.imgs[piece.img], Xmouse, Ymouse, this.slotSize, this.slotSize);
        }
    }

    public draw() {
        // Delete canvas elements
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw canvas
        this.drawBoard()
        this.drawMovingPiece()
    }
}