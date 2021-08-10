import { BoardSlot } from './board-slot.js';
import { eColor, Game } from './game.js';

// SVG images: https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces
export abstract class Piece {
    private _color: eColor;
    private _type: ePieceType
    public isSelected: boolean
    public isFirstMove: boolean

    constructor(color: eColor, type: ePieceType) {
        this._color = color;
        this._type = type;
        this.isSelected = false
        this.isFirstMove = true
    }

    get color() {
        return this._color
    }
    get type() {
        return this._type
    }
    get img() {
        return this._type + '_' + this._color
    }
    get colorOponent() {
        return (this._color == eColor.white) ? eColor.black : eColor.white;
    }

    public getPosibleMoves(slotOrigen: BoardSlot): Array<BoardSlot> {
        let slots: Array<BoardSlot> = Game.instance.board.slots;
        let index: number = BoardSlot.getIndex(slotOrigen)
        let direction: number = (slotOrigen.color === eColor.white) ? 1 : -1;
        let slotsPosibles: Array<BoardSlot> = []

        return slotsPosibles
    }

}

export enum ePieceType {
    King = "King",
    Queen = "Queen",
    Horse = "Horse",
    Bishop = "Bishop",
    Tower = "Tower",
    Pawn = "Pawn"
}