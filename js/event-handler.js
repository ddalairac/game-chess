import { Game } from './game.js';
import { Render } from './render.js';
export class EventHandler {
    constructor() {
        Render.instance.canvas.addEventListener("mousedown", this.onMouseDown, false);
        Render.instance.canvas.addEventListener("touchstart", this.onTouchStart, false);
        Render.instance.canvas.addEventListener('mouseup', this.onMouseUp, false);
        Render.instance.canvas.addEventListener('touchend', this.onTouchEnd, false);
        Render.instance.canvas.addEventListener('mousemove', this.onMouseMove, false);
        Render.instance.canvas.addEventListener('touchmove', this.onTouchMove, false);
        this.start = document.getElementById('newGame');
        if (this.start)
            this.start.addEventListener('click', Game.instance.starGame);
    }
    static onPress(mouseX, mouseY) {
        EventHandler.mouseIsDown = true;
        Game.instance.mouse.x = mouseX;
        Game.instance.mouse.y = mouseY;
        Game.instance.actions.onClick();
    }
    static onRelease() {
        EventHandler.mouseIsDown = false;
        Game.instance.actions.onRelease();
    }
    static onMove(mouseX, mouseY) {
        if (EventHandler.mouseIsDown) {
            Game.instance.mouse.x = mouseX;
            Game.instance.mouse.y = mouseY;
        }
    }
    onMouseDown(e) {
        EventHandler.onPress(e.clientX, e.clientY);
    }
    onMouseUp(e) {
        EventHandler.onRelease();
    }
    onMouseMove(e) {
        EventHandler.onMove(e.clientX, e.clientY);
    }
    onTouchStart(e) {
        e.preventDefault();
        EventHandler.onPress(e.touches[0].clientX, e.touches[0].clientY);
    }
    onTouchEnd(e) {
        e.preventDefault();
        EventHandler.onRelease();
    }
    onTouchMove(e) {
        e.preventDefault();
        EventHandler.onMove(e.touches[0].clientX, e.touches[0].clientY);
    }
}
EventHandler.mouseIsDown = false;
//# sourceMappingURL=event-handler.js.map