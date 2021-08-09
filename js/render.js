import { eColor, Game } from './game.js';
export class Render {
    constructor() {
        this.imgs = {};
        this.boarSize = 0;
        this.slotSize = 0;
        this.topMargin = 0;
        this.leftMargin = 0;
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this;
        this.canvas = document.getElementById("stage");
        this.ctx = this.canvas.getContext("2d");
        this.getImgs();
        this.rezize();
        window.onresize = function () {
            Render.instance.rezize();
        };
    }
    static get instance() {
        return this._instance;
    }
    get stageLimitX() {
        return this.ctx.canvas.width;
    }
    get stageLimitY() {
        return this.ctx.canvas.height;
    }
    rezize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.getBoarSizeAndMargin();
        this.draw();
    }
    getImgs() {
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
        };
    }
    getBoarSizeAndMargin() {
        let boarSize = (this.canvas.width - this.canvas.height < 0) ? this.canvas.width : this.canvas.height;
        if (boarSize > 600) {
            boarSize = 600;
        }
        boarSize = boarSize - 30;
        this.boarSize = boarSize;
        let xSpace = (this.canvas.width - boarSize > 0) ? this.canvas.width - boarSize : 0;
        let ySpace = (this.canvas.height - boarSize > 0) ? this.canvas.height - boarSize : 0;
        this.topMargin = (ySpace > 0) ? ySpace / 2 : 0;
        this.leftMargin = (xSpace > 0) ? xSpace / 2 : 0;
        this.slotSize = boarSize / 8;
    }
    drawScuare(x, y, color, size) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.fillStyle = (color == eColor.white) ? "#FFF" : "#666";
        this.ctx.fill();
    }
    drawBoard() {
        if (Game.instance && Game.instance.board && Game.instance.board.slots) {
            Game.instance.board.slots.forEach(slot => {
                let yPx = (slot.y * this.slotSize) + this.topMargin;
                let xPx = (slot.x * this.slotSize) + this.leftMargin;
                this.drawScuare(xPx, yPx, slot.color, this.slotSize);
                if (slot.piece) {
                    if (!slot.piece.isSelected) {
                        this.ctx.drawImage(this.imgs[slot.piece.img], xPx, yPx, this.slotSize, this.slotSize);
                    }
                }
            });
        }
    }
    drawMovingPiece() {
        if (Game.instance && Game.instance.board && Game.instance.board.selectedPiece) {
            let Xmouse = Game.instance.mouse.x - (this.slotSize / 2);
            let Ymouse = Game.instance.mouse.y - (this.slotSize / 2);
            let piece = Game.instance.board.selectedPiece;
            this.ctx.drawImage(this.imgs[piece.img], Xmouse, Ymouse, this.slotSize, this.slotSize);
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard();
        this.drawMovingPiece();
    }
}
//# sourceMappingURL=render.js.map