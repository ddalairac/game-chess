import { ePieceType, Piece } from '../piece.js';
import { Bishop } from './bishop.js';
import { Tower } from './tower.js';
export class Queen extends Piece {
    constructor(player) {
        super(player, ePieceType.Queen);
    }
    getPosibleMoves(slotOrigen) {
        return [...Bishop.getPosibleMoves(slotOrigen, this), ...Tower.getPosibleMoves(slotOrigen, this)];
    }
}
//# sourceMappingURL=queen.js.map