import { BoardSlot } from '../board-slot.js';
import { Game } from '../game.js';
import { ePieceType, Piece } from '../piece.js';
export class Tower extends Piece {
    constructor(player) {
        super(player, ePieceType.Tower);
    }
    getPosibleMoves(slotOrigen) {
        let slots = Game.instance.board.slots;
        let index = BoardSlot.getIndex(slotOrigen);
        let slotsPosibles = [];
        let leftLimit = slotOrigen.y * 8;
        let rightLimit = slotOrigen.y * 8 + 8;
        for (let i = index + 8; i < 64; i += 8) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece)
                break;
        }
        for (let i = index - 8; i >= 0; i -= 8) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece)
                break;
        }
        for (let i = index + 1; i < rightLimit; i++) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece)
                break;
        }
        for (let i = index - 1; i >= leftLimit; i--) {
            let slot = slots[i];
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot);
            }
            if (slot.piece)
                break;
        }
        return slotsPosibles;
    }
}
//# sourceMappingURL=tower.js.map