import { BoardSlot } from '../board-slot.js';
import { Game } from '../game.js';
import { ePieceType, Piece } from '../piece.js';
export class Bishop extends Piece {
    constructor(player) {
        super(player, ePieceType.Bishop);
    }
    getPosibleMoves(slotOrigen) {
        let slots = Game.instance.board.slots;
        let index = BoardSlot.getIndex(slotOrigen);
        let slotsPosibles = [];
        let topLeftLimit = slotOrigen.y * 8;
        let topRightLimit = slotOrigen.y * 8 + 8;
        let bottomLeftLimit = slotOrigen.y * 8;
        let bottomRightLimit = slotOrigen.y * 8 + 8;
        for (let i = index + 9; i < 64; i += 9) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece)
                break;
            let nextSlot = slots[i + 1];
            if (nextSlot.x != slot.x + 1)
                break;
        }
        for (let i = index + 7; i < 64; i += 7) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece) {
                break;
            }
            let nextSlot = slots[i - 1];
            if (nextSlot.x != slot.x - 1) {
                break;
            }
        }
        for (let i = index - 9; i >= 0; i -= 9) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece)
                break;
            let nextSlot = slots[i - 1];
            if (nextSlot.x != slot.x - 1)
                break;
        }
        for (let i = index - 7; i >= 0; i -= 7) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece) {
                break;
            }
            let nextSlot = slots[i + 1];
            if (nextSlot.x != slot.x + 1) {
                break;
            }
        }
        return slotsPosibles;
    }
}
//# sourceMappingURL=bishop.js.map