
export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this
        this.canvas = document.getElementById("stage") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;


        // set Canvas Size
        this.rezize()
        window.onresize = function () {
            Render.instance.rezize()
        }
    }
    rezize() {
        this.ctx.canvas.width = window.innerWidth ;
        this.ctx.canvas.height = window.innerHeight ;
        this.draw()
    }

    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement

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

    private drawScuare(x: number, y: number, size: number, even: boolean) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.fillStyle = even ? "#FFF" : "#000";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.fill();
    }

    private drawBoard() {
        let size = (this.stageLimitX - 10) / 8;
        let even = false;
        for (let indexRow = 0; indexRow < 8; indexRow++) {
            even = !even;
            for (let index = 0; index < 8; index++) {
                even = !even;
                even = even ? true : false;
                this.drawScuare((index * size) + 5, (indexRow * size) + 5, size, even)
            }
        }
    }
    public draw() {
        this.drawBoard()
    }
}