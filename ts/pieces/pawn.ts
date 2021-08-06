import { ePlayer } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Pawn extends Piece {
    constructor(player: ePlayer){
        super(player, ePieceType.Pawn)
    }

}