import { Game } from './game.js';
import { Render } from './render.js';
export class EventHandler {
    constructor() {
        this.mouseIsDown = false;
        Render.instance.canvas.addEventListener("mousedown", this.onMouseDown, false);
        Render.instance.canvas.addEventListener('mouseup', this.onMouseUp, false);
        Render.instance.canvas.addEventListener('mousemove', this.onMouseMove, false);
        this.start = document.getElementById('newBTN');
        if (this.start)
            this.start.addEventListener('click', Game.instance.starGame);
    }
    onMouseDown(e) {
        this.mouseIsDown = true;
        Game.instance.mouse.x = e.clientX;
        Game.instance.mouse.y = e.clientY;
        Game.instance.actions.onClick();
    }
    onMouseUp(e) {
        this.mouseIsDown = false;
        Game.instance.actions.onRelease();
    }
    onMouseMove(e) {
        if (this.mouseIsDown) {
            Game.instance.mouse.x = e.clientX;
            Game.instance.mouse.y = e.clientY;
        }
    }
}
//# sourceMappingURL=event-handler.js.map