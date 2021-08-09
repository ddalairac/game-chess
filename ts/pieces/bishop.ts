import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Bishop extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Bishop)
    }

}