import { ePlayer } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Bishop extends Piece {
    constructor(player: ePlayer){
        super(player, ePieceType.Bishop)
    }

}