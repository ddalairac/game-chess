import { BoardSlot } from './board-slot.js';
import { eColor, Game } from './game.js';
export class Piece {
    constructor(color, type) {
        this._color = color;
        this._type = type;
        this.isSelected = false;
        this.isFirstMove = true;
    }
    get color() {
        return this._color;
    }
    get type() {
        return this._type;
    }
    get img() {
        return this._type + '_' + this._color;
    }
    get colorOponent() {
        return (this._color == eColor.white) ? eColor.black : eColor.white;
    }
    getPosibleMoves(slotOrigen) {
        let slots = Game.instance.board.slots;
        let index = BoardSlot.getIndex(slotOrigen);
        let direction = (slotOrigen.color === eColor.white) ? 1 : -1;
        let slotsPosibles = [];
        return slotsPosibles;
    }
}
export var ePieceType;
(function (ePieceType) {
    ePieceType["King"] = "King";
    ePieceType["Queen"] = "Queen";
    ePieceType["Horse"] = "Horse";
    ePieceType["Bishop"] = "Bishop";
    ePieceType["Tower"] = "Tower";
    ePieceType["Pawn"] = "Pawn";
})(ePieceType || (ePieceType = {}));
//# sourceMappingURL=piece.js.map