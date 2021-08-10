export class BoardSlot {
    constructor(y, x, color, piece) {
        this.y = y;
        this.x = x;
        this.color = color;
        this.piece = piece;
        this.isValidMove = false;
    }
    static getIndex(slot) {
        return slot.y * 8 + slot.x;
    }
}
//# sourceMappingURL=board-slot.js.map