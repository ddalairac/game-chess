import { eColor } from './game.js';
import { Piece } from './piece.js';

export class BoardSlot{
    constructor(public y:number,public x:number,public color:eColor, public piece:Piece | null){}
}