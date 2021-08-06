import { ePlayer } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class King extends Piece {
    constructor(player: ePlayer){
        super(player, ePieceType.King)
    }

}