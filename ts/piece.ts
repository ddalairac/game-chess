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

    public abstract getPosibleMoves(slotOrigen: BoardSlot): BoardSlot[] 

    public static isEmptyOrCanBeEat(slotDestiny: BoardSlot, piece: Piece): boolean {
        return (!slotDestiny.piece || slotDestiny.piece.color != piece.color)
    }

    public static hasAPieceAndCanBeEat(slotDestiny: BoardSlot, piece: Piece): boolean {
        return (slotDestiny && slotDestiny.piece && slotDestiny.piece.color == piece.colorOponent)
    }

    public static getAllPlayerMoves(color:eColor):  BoardSlot[] {
        let possibleMoves: BoardSlot[] = []
        Game.instance.board.slots.forEach(slot => {
            if (slot.piece) {
                if (slot.piece.color == color) {
                    possibleMoves = [...possibleMoves, ...slot.piece.getPosibleMoves(slot)]
                } 
            }
        })
        // let possibleMovesSet = new Set(possibleMoves)
        // possibleMoves = [...possibleMovesSet]

        return possibleMoves
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