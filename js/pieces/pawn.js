import { BoardSlot } from '../board-slot.js';
import { eColor, Game } from '../game.js';
import { ePieceType, Piece } from '../piece.js';
export class Pawn extends Piece {
    constructor(player) {
        super(player, ePieceType.Pawn);
    }
    getPosibleMoves(slotOrigen) {
        let slots = Game.instance.board.slots;
        let index = BoardSlot.getIndex(slotOrigen);
        let direction = (this.color === eColor.black) ? 1 : -1;
        let slotsPosibles = [];
        let nextSlot = slots[index + (8 * direction)];
        let next2Slot = slots[index + (16 * direction)];
        let nextLeftSlot = slots[index + (7 * direction)];
        let nextRightSlot = slots[index + (9 * direction)];
        if (nextSlot && !nextSlot.piece) {
            slotsPosibles.push(nextSlot);
            if (this.isFirstMove && next2Slot && !next2Slot.piece) {
                slotsPosibles.push(next2Slot);
            }
        }
        if (Piece.hasAPieceAndCanBeEat(nextLeftSlot, this)) {
            slotsPosibles.push(nextLeftSlot);
        }
        if (Piece.hasAPieceAndCanBeEat(nextRightSlot, this)) {
            slotsPosibles.push(nextRightSlot);
        }
        return slotsPosibles;
    }
}
//# sourceMappingURL=pawn.js.map