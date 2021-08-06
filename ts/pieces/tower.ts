import { ePlayer } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Tower extends Piece {
    constructor(player: ePlayer){
        super(player, ePieceType.Tower)
    }

}