import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Queen extends Piece {
    constructor(player: eColor, y: number, x: number){
        super(player, ePieceType.Queen,y,x)
    }

}