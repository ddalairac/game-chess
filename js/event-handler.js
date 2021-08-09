import { Game } from './game.js';
import { Render } from './render.js';
export class EventHandler {
    constructor() {
        Render.instance.canvas.addEventListener("mousedown", this.onMouseDown, false);
        Render.instance.canvas.addEventListener('mouseup', this.onMouseUp, false);
        this.start = document.getElementById('newBTN');
        if (this.start)
            this.start.addEventListener('click', Game.instance.starGame);
    }
    onMouseDown(e) {
        const { slotSize, topMargin, leftMargin } = Render.instance.getBoarSizeAndMargin();
        Game.instance.board.slots.forEach(slot => {
            let yPx = (slot.y * slotSize) + topMargin;
            let xPx = (slot.x * slotSize) + leftMargin;
            if (e.clientX >= xPx && e.clientX <= xPx + slotSize && e.clientY >= yPx && e.clientY <= yPx + slotSize) {
                console.log("click:", slot, slot.piece);
                if (slot.piece) {
                    slot.piece.isSelected = true;
                }
            }
        });
    }
    onMouseUp(e) {
        Game.instance.board.slots.forEach(slot => {
            if (slot.piece) {
                slot.piece.isSelected = false;
            }
        });
    }
}
//# sourceMappingURL=event-handler.js.map