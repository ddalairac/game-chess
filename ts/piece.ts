import { eColor } from './game.js';

// SVG images: https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces
export abstract class Piece {
    private _player: eColor;
    private _type: ePieceType
    public isSelected:boolean

    constructor(player: eColor, type: ePieceType) {
        this._player = player;
        this._type = type;
        this.isSelected = false
    }

    get player() {
        return this._player
    }
    get type() {
        return this._type
    }
    get img() {
        return this._type + '_' + this._player
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