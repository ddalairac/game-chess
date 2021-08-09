export class Piece {
    constructor(player, type, y, x) {
        this._player = player;
        this._type = type;
        this.y = y;
        this.x = x;
        this.isSelected = false;
    }
    get player() {
        return this._player;
    }
    get type() {
        return this._type;
    }
    get img() {
        return this._type + '_' + this._player;
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