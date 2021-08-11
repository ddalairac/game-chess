import { Game } from '../game.js';
import { ePieceType, Piece } from '../piece.js';
export class Horse extends Piece {
    constructor(player) {
        super(player, ePieceType.Horse);
    }
    getPosibleMoves(slotOrigen) {
        let slots = Game.instance.board.slots;
        let slotsPosibles = [];
        slotsPosibles = slots.filter(slot => {
            if ((slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y - 2) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y - 2) ||
                (slot.x == slotOrigen.x - 2 && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x + 2 && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y + 2) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y + 2) ||
                (slot.x == slotOrigen.x - 2 && slot.y == slotOrigen.y + 1) ||
                (slot.x == slotOrigen.x + 2 && slot.y == slotOrigen.y + 1)) {
                if (Piece.isEmptyOrCanBeEat(slot, this)) {
                    return true;
                }
            }
        });
        return slotsPosibles;
    }
}
//# sourceMappingURL=horse.js.map