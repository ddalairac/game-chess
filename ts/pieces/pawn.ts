import { BoardSlot } from '../board-slot.js'
import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Pawn extends Piece {
    constructor(player: eColor){
        super(player, ePieceType.Pawn)
    }

    public static isMovePosible(slotOrigen: BoardSlot, slotDestiny: BoardSlot, piece: Piece):boolean{
        return false
    }
}