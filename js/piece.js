export class Piece {
    constructor(color, type) {
        this._color = color;
        this._type = type;
        this.isSelected = false;
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
    static isMovePosible(slotOrigen, slotDestiny, piece) {
        if (slotOrigen != slotDestiny) {
            return true;
        }
        return false;
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