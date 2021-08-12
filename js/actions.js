import { eColor, Game } from './game.js';
import { Render } from './render.js';
export class Actions {
    constructor() {
    }
    get moveParams() {
        let boarSize = Render.instance.boarSize;
        let slotSize = Render.instance.slotSize;
        let topMargin = Render.instance.topMargin;
        let leftMargin = Render.instance.leftMargin;
        let mouse = Game.instance.mouse;
        return { boarSize, slotSize, topMargin, leftMargin, mouse };
    }
    onClick() {
        let slot = this.getSlotOnMousePosition();
        if (slot && slot.piece && slot.piece.color == Game.instance.playerTurn) {
            this.setPieceValidMovesAttr(slot, slot.piece);
        }
        Game.instance.messages.setMoveMessages(true, slot);
    }
    onRelease() {
        let slot = this.getSlotOnMousePosition();
        let slotsPosibles = this.getPieceValidMoves();
        let isMoveValid = slotsPosibles.filter(s => s == slot).length > 0;
        this.getAllPlayersMoves();
        if (slot && isMoveValid) {
            this.movePiece(slot, Game.instance.board.selectedPiece);
            this.playerTurnToogle();
        }
        else {
            Game.instance.messages.setMoveMessages(false, slot, isMoveValid);
        }
        this.cleanPieceValidMovesAttr();
    }
    movePiece(slot, piece) {
        let previousSlot = Game.instance.board.slots.find(slot => slot.piece == piece);
        if (previousSlot != slot) {
            if (piece)
                piece.isFirstMove = false;
            slot.piece = piece;
            previousSlot.piece = null;
        }
    }
    playerTurnToogle() {
        Game.instance.playerTurn = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white;
        Game.instance.messages.displayPlayerTurn();
    }
    getSlotOnMousePosition() {
        const { slotSize, topMargin, leftMargin, mouse } = this.moveParams;
        return Game.instance.board.slots.find(slot => {
            let yPx = (slot.y * slotSize) + topMargin;
            let xPx = (slot.x * slotSize) + leftMargin;
            return (mouse.x >= xPx && mouse.x <= xPx + slotSize && mouse.y >= yPx && mouse.y <= yPx + slotSize);
        });
    }
    getPieceValidMoves() {
        return Game.instance.board.slots.filter(slot => slot.isValidMove);
    }
    setPieceValidMovesAttr(slotOrigen, piece) {
        slotOrigen.piece.isSelected = true;
        Game.instance.board.selectedPiece = slotOrigen.piece;
        Game.instance.board.selectedPieceOrigin = slotOrigen;
        let slotsPosibles = piece.getPosibleMoves(slotOrigen);
        slotsPosibles.map(slotDestiny => {
            slotDestiny.isValidMove = true;
        });
    }
    cleanPieceValidMovesAttr() {
        Game.instance.board.slots.map(slot => {
            slot.isValidMove = false;
        });
        if (Game.instance.board.selectedPiece)
            Game.instance.board.selectedPiece.isSelected = false;
        Game.instance.board.selectedPiece = null;
        Game.instance.board.selectedPieceOrigin = null;
    }
    isChek() {
        let { possibleWhitesMoves, possibleBlackMoves } = this.getAllPlayersMoves();
        let isChek = false;
        return isChek;
    }
    getAllPlayersMoves() {
        let possibleWhitesMoves = [];
        let possibleBlackMoves = [];
        Game.instance.board.slots.forEach(slot => {
            if (slot.piece) {
                if (slot.piece.color == eColor.white) {
                    possibleWhitesMoves = [...possibleWhitesMoves, ...slot.piece.getPosibleMoves(slot)];
                }
                else {
                    possibleBlackMoves = [...possibleBlackMoves, ...slot.piece.getPosibleMoves(slot)];
                }
            }
        });
        let playerSet = new Set(possibleWhitesMoves);
        let opponentSet = new Set(possibleBlackMoves);
        possibleWhitesMoves = [...playerSet];
        possibleBlackMoves = [...opponentSet];
        return { possibleWhitesMoves, possibleBlackMoves };
    }
}
//# sourceMappingURL=actions.js.map