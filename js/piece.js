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
    static isEmptyOrCanBeEat(slotDestiny, piece) {
        return (!slotDestiny.piece || slotDestiny.piece.color != piece.color);
    }
    static hasAPieceAndCanBeEat(slotDestiny, piece) {
        return (slotDestiny && slotDestiny.piece && slotDestiny.piece.color == piece.colorOponent);
    }
    static getAllPlayerMoves(color) {
        let possibleMoves = [];
        Game.instance.board.slots.forEach(slot => {
            if (slot.piece) {
                if (slot.piece.color == color) {
                    possibleMoves = [...possibleMoves, ...slot.piece.getPosibleMoves(slot)];
                }
            }
        });
        return possibleMoves;
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