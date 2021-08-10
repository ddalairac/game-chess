import { BoardSlot } from './board-slot.js';
import { eColor } from './game.js';

// SVG images: https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces
export abstract class Piece {
    private _color: eColor;
    private _type: ePieceType
    public isSelected:boolean

    constructor(color: eColor, type: ePieceType) {
        this._color = color;
        this._type = type;
        this.isSelected = false
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

    public static isMovePosible(slotOrigen: BoardSlot, slotDestiny: BoardSlot, piece: Piece):boolean{
        if(slotOrigen != slotDestiny){
            return true
        }
        return false
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