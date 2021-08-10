import { eColor } from './game.js';
import { Piece } from './piece.js';

export class BoardSlot {
    public isValidMove: boolean;
    constructor(
        public y: number,
        public x: number,
        public color: eColor,
        public piece: Piece | null) {

        this.isValidMove = false
    }

    public static getIndex(slot: BoardSlot): number {
        return slot.y * 8 + slot.x;
    }
}