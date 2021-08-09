import { Game } from './game.js'
import { Render } from './render.js'

export class EventHandler {
    constructor() {
        Render.instance.canvas.addEventListener("mousedown", this.onMouseDown, false)
        Render.instance.canvas.addEventListener("touchstart", this.onTouchStart, false)

        Render.instance.canvas.addEventListener('mouseup', this.onMouseUp, false)
        Render.instance.canvas.addEventListener('touchend', this.onTouchEnd, false)

        Render.instance.canvas.addEventListener('mousemove', this.onMouseMove, false)
        Render.instance.canvas.addEventListener('touchmove', this.onTouchMove, false)
        this.start = document.getElementById('newGame')
        if (this.start) this.start.addEventListener('click', Game.instance.starGame)
    }

    private start: HTMLElement | null
    protected static mouseIsDown = false

    // ******* Actions ******* 
    protected static onPress(mouseX: number, mouseY: number) {
        EventHandler.mouseIsDown = true;
        Game.instance.mouse.x = mouseX;
        Game.instance.mouse.y = mouseY;
        Game.instance.actions.onClick();
    }
    protected static onRelease() {
        EventHandler.mouseIsDown = false;
        Game.instance.actions.onRelease();
    }

    protected static onMove(mouseX: number, mouseY: number) {
        if (EventHandler.mouseIsDown) {
            Game.instance.mouse.x = mouseX;
            Game.instance.mouse.y = mouseY;
        }
    }


    // ******* Mouse Events ******* 
    private onMouseDown(e: MouseEvent) {
        // console.log("onMouseDown", e)
        EventHandler.onPress(e.clientX, e.clientY)
    }
    private onMouseUp(e: MouseEvent) {
        // console.log("onMouseUp", e)
        EventHandler.onRelease();
    }

    private onMouseMove(e: MouseEvent) {
        // console.log("onMouseMove", e.clientX, e.clientY)
        EventHandler.onMove(e.clientX, e.clientY)
    }


    // ******* Touch Events ******* 
    private onTouchStart(e: TouchEvent) {
        e.preventDefault();
        console.log("onTouchStart", e)
        EventHandler.onPress(e.touches[0].clientX, e.touches[0].clientY)
    }
    private onTouchEnd(e: TouchEvent) {
        e.preventDefault();
        // console.log("onTouchEnd", e)
        EventHandler.onRelease();
    }
    private onTouchMove(e: TouchEvent) {
        e.preventDefault();
        console.log("onTouchMove", e)
        EventHandler.onMove(e.touches[0].clientX, e.touches[0].clientY)
    }
}