import { ePlayer } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Queen extends Piece {
    constructor(player: ePlayer){
        super(player, ePieceType.Queen)
    }

}