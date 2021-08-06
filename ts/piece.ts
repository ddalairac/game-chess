import { ePlayer } from './game.js';

export abstract class Piece {
    private _player: ePlayer;
    private _type: ePieceType

    constructor(player: ePlayer, type: ePieceType) {
        this._player = player;
        this._type = type;
    }

    get player() {
        return this._player
    }
    get type() {
        return this._type
    }
}

export enum ePieceType{
    King = "King",
    Queen = "Queen",
    Horse = "Horse",
    Bishop = "Bishop",
    Tower = "Tower",
    Pawn = "Pawn"
}