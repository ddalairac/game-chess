import { Game } from './game.js';
import { Render } from './render.js';
export class Actions {
    constructor() {
    }
    get moveParams() {
        let boarSize = Render.instance.boarSize;
        let slotSize = Render.instance.slotSize;
        let topMargin = Render.instance.topMargin;
        let leftMargin = Render.instance.leftMargin;
        let mouse = Game.instance.mouse;
        return { boarSize, slotSize, topMargin, leftMargin, mouse };
    }
    onClick() {
        const { boarSize, slotSize, topMargin, leftMargin, mouse } = this.moveParams;
        let slot = this.getSlotOnMousePosition();
        if (slot && slot.piece) {
            slot.piece.isSelected = true;
            Game.instance.board.selectedPiece = slot.piece;
        }
    }
    onRelease() {
        let slot = this.getSlotOnMousePosition();
        if (slot) {
            this.movePiece(slot, Game.instance.board.selectedPiece);
        }
        Game.instance.board.selectedPiece.isSelected = false;
        Game.instance.board.selectedPiece = null;
    }
    movePiece(slot, piece) {
        let previousSlot = Game.instance.board.slots.find(slot => slot.piece == piece);
        slot.piece = piece;
        previousSlot.piece = null;
    }
    getSlotOnMousePosition() {
        const { boarSize, slotSize, topMargin, leftMargin, mouse } = this.moveParams;
        return Game.instance.board.slots.find(slot => {
            let yPx = (slot.y * slotSize) + topMargin;
            let xPx = (slot.x * slotSize) + leftMargin;
            if (mouse.x >= xPx && mouse.x <= xPx + slotSize && mouse.y >= yPx && mouse.y <= yPx + slotSize) {
                return true;
            }
        });
    }
}
//# sourceMappingURL=actions.js.map