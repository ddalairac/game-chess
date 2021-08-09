import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Tower extends Piece {
    constructor(player: eColor){
        super(player, ePieceType.Tower)
    }

}