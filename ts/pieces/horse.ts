import { ePlayer } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Horse extends Piece {
    constructor(player: ePlayer){
        super(player, ePieceType.Horse)
    }

}