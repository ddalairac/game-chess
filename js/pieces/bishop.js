import { BoardSlot } from '../board-slot.js';
import { Game } from '../game.js';
import { ePieceType, Piece } from '../piece.js';
export class Bishop extends Piece {
    constructor(player) {
        super(player, ePieceType.Bishop);
    }
    getPosibleMoves(slotOrigen) {
        return Bishop.getPosibleMoves(slotOrigen, this);
    }
    static getPosibleMoves(slotOrigen, piece) {
        let slots = Game.instance.board.slotsWithoutSelected;
        let index = BoardSlot.getIndex(slotOrigen);
        let slotsPosibles = [];
        if (slotOrigen.x + 1 < 8) {
            for (let i = index + 9; i < 64; i += 9) {
                let slot = slots[i];
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot);
                }
                if (slot.piece)
                    break;
                let nextSlot = slots[i + 1];
                if (nextSlot && nextSlot.x != slot.x + 1)
                    break;
            }
        }
        if (slotOrigen.x - 1 >= 0) {
            for (let i = index + 7; i < 64; i += 7) {
                let slot = slots[i];
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot);
                }
                if (slot.piece) {
                    break;
                }
                let nextSlot = slots[i - 1];
                if (nextSlot && nextSlot.x != slot.x - 1) {
                    break;
                }
            }
        }
        if (slotOrigen.x + 1 < 8) {
            for (let i = index - 9; i >= 0; i -= 9) {
                let slot = slots[i];
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot);
                }
                if (slot.piece)
                    break;
                let nextSlot = slots[i - 1];
                if (nextSlot && nextSlot.x != slot.x - 1)
                    break;
            }
        }
        if (slotOrigen.x - 1 >= 0) {
            for (let i = index - 7; i >= 0; i -= 7) {
                let slot = slots[i];
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot);
                }
                if (slot.piece) {
                    break;
                }
                let nextSlot = slots[i + 1];
                if (nextSlot && nextSlot.x != slot.x + 1) {
                    break;
                }
            }
        }
        return slotsPosibles;
    }
}
//# sourceMappingURL=bishop.js.map