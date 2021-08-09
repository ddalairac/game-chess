import { eColor } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Pawn extends Piece {
    constructor(player: eColor, y: number, x: number){
        super(player, ePieceType.Pawn,y,x)
    }

}