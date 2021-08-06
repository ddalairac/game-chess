export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this;
        this.canvas = document.getElementById("stage");
        this.ctx = this.canvas.getContext("2d");
        this.rezize();
        window.onresize = function () {
            Render.instance.rezize();
        };
    }
    rezize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.draw();
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
    drawScuare(x, y, size, even) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.fillStyle = even ? "#FFF" : "#000";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.fill();
    }
    drawBoard() {
        let size = (this.stageLimitX - 10) / 8;
        let even = false;
        for (let indexRow = 0; indexRow < 8; indexRow++) {
            even = !even;
            for (let index = 0; index < 8; index++) {
                even = !even;
                even = even ? true : false;
                this.drawScuare((index * size) + 5, (indexRow * size) + 5, size, even);
            }
        }
    }
    draw() {
        this.drawBoard();
    }
}
//# sourceMappingURL=render.js.map