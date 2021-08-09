import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Pawn extends Piece {
    constructor(player: eColor){
        super(player, ePieceType.Pawn)
    }

}