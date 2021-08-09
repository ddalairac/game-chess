import { Game } from './game.js'
import { Render } from './render.js'

export class EventHandler {
    constructor() {
        // console.log("EventHandler instance")
        Render.instance.canvas.addEventListener("mousedown", this.onMouseDown, false)
        Render.instance.canvas.addEventListener('mouseup', this.onMouseUp, false)
        Render.instance.canvas.addEventListener('mousemove', this.onMouseMove, false)
        this.start = document.getElementById('newBTN')
        if (this.start) this.start.addEventListener('click', Game.instance.starGame)
    }

    start: HTMLElement | null
    private mouseIsDown = false

    private onMouseDown(e: MouseEvent) {
        // console.log("onMouseDown", e)
        this.mouseIsDown = true;
        Game.instance.mouse.x = e.clientX;
        Game.instance.mouse.y = e.clientY;
        Game.instance.actions.onClick();
    }
    private onMouseUp(e: MouseEvent) {
        // console.log("onMouseUp", e)
        this.mouseIsDown = false;
        Game.instance.actions.onRelease();
    }

    private onMouseMove(e: MouseEvent) {
        // console.log("onMouseMove", e.clientX, e.clientY)
        if (this.mouseIsDown) {
            Game.instance.mouse.x = e.clientX;
            Game.instance.mouse.y = e.clientY;
        }
    }
}