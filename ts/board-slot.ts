import { eColor } from './game.js';
import { Piece } from './piece.js';

export class BoardSlot {
    public isValidMove: boolean;
    constructor(public y: number, public x: number, public color: eColor, public piece: Piece | null) {
        this.isValidMove = false
    }
}