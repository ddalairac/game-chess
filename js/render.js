import { eColor, Game } from './game.js';
export class Render {
    constructor() {
        this.imgs = {};
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
    drawScuare(x, y, color, size) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.fillStyle = (color == eColor.white) ? "#FFF" : "#666";
        this.ctx.fill();
    }
    getBoarSizeAndMargin() {
        let boarSize = (this.canvas.width - this.canvas.height < 0) ? this.canvas.width : this.canvas.height;
        if (boarSize > 600) {
            boarSize = 600;
        }
        boarSize = boarSize - 30;
        let xSpace = (this.stageLimitX - boarSize > 0) ? this.stageLimitX - boarSize : 0;
        let ySpace = (this.stageLimitY - boarSize > 0) ? this.stageLimitY - boarSize : 0;
        let topMargin = (ySpace > 0) ? ySpace / 2 : 0;
        let leftMargin = (xSpace > 0) ? xSpace / 2 : 0;
        let slotSize = boarSize / 8;
        return { boarSize, slotSize, topMargin, leftMargin };
    }
    drawBoard() {
        const { boarSize, slotSize, topMargin, leftMargin } = this.getBoarSizeAndMargin();
        let size = boarSize / 8;
        if (Game.instance && Game.instance.board && Game.instance.board.slots) {
            Game.instance.board.slots.forEach(slot => {
                let yPx = (slot.y * slotSize) + topMargin;
                let xPx = (slot.x * slotSize) + leftMargin;
                this.drawScuare(xPx, yPx, slot.color, slotSize);
                if (slot.piece) {
                    if (!slot.piece.isSelected) {
                        this.ctx.drawImage(this.imgs[slot.piece.img], xPx, yPx, slotSize, slotSize);
                    }
                    else {
                    }
                }
            });
        }
    }
    draw() {
        this.drawBoard();
    }
}
//# sourceMappingURL=render.js.map