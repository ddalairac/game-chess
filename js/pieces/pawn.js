import { ePieceType, Piece } from '../piece.js';
export class Pawn extends Piece {
    constructor(player) {
        super(player, ePieceType.Pawn);
    }
    static isMovePosible(slotOrigen, slotDestiny, piece) {
        return false;
    }
}
//# sourceMappingURL=pawn.js.map