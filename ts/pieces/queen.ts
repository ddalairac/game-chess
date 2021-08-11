import { BoardSlot } from '../board-slot.js';
import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'
import { Bishop } from './bishop.js';
import { Tower } from './tower.js';

export class Queen extends Piece {
    constructor(player: eColor){
        super(player, ePieceType.Queen)
    }
    public getPosibleMoves(slotOrigen: BoardSlot): BoardSlot[] {
        return [...Bishop.getPosibleMoves(slotOrigen, this), ...Tower.getPosibleMoves(slotOrigen, this)]
    }

}