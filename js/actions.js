import { eColor, Game } from './game.js';
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
        if (slot && slot.piece && slot.piece.color == Game.instance.playerTurn) {
            slot.piece.isSelected = true;
            Game.instance.board.selectedPiece = slot.piece;
            this.setValidMoves(slot, slot.piece);
        }
        Game.instance.messages.setMoveMessages(true, slot);
    }
    onRelease() {
        let slot = this.getSlotOnMousePosition();
        let slotsPosibles = this.getValidMoves();
        let isMoveValid = slotsPosibles.filter(s => s == slot).length > 0;
        if (slot && isMoveValid) {
            this.movePiece(slot, Game.instance.board.selectedPiece);
            this.playerTurnToogle();
        }
        else {
            Game.instance.messages.setMoveMessages(false, slot, isMoveValid);
        }
        this.resetValidMoves();
        if (Game.instance.board.selectedPiece)
            Game.instance.board.selectedPiece.isSelected = false;
        Game.instance.board.selectedPiece = null;
    }
    movePiece(slot, piece) {
        let previousSlot = Game.instance.board.slots.find(slot => slot.piece == piece);
        if (previousSlot != slot) {
            if (piece)
                piece.isFirstMove = false;
            slot.piece = piece;
            previousSlot.piece = null;
        }
    }
    playerTurnToogle() {
        Game.instance.playerTurn = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white;
        Game.instance.messages.setFeedback();
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
    getValidMoves() {
        return Game.instance.board.slots.filter(slot => slot.isValidMove);
    }
    setValidMoves(slotOrigen, piece) {
        let slotsPosibles = piece.getPosibleMoves(slotOrigen);
        slotsPosibles.map(slotDestiny => {
            slotDestiny.isValidMove = true;
        });
    }
    resetValidMoves() {
        Game.instance.board.slots.map(slot => {
            slot.isValidMove = false;
        });
    }
}
//# sourceMappingURL=actions.js.map