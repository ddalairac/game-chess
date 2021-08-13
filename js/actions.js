import { eColor, Game } from './game.js';
import { ePieceType, Piece } from './piece.js';
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
        if (slot && slot.piece
            && slot.piece.color == Game.instance.playerTurn) {
            this.setPieceValidMovesAttr(slot, slot.piece);
        }
        Game.instance.messages.setMoveMessages(true, slot);
    }
    onRelease() {
        let slot = this.getSlotOnMousePosition();
        let slotsPosibles = this.getPieceValidMoves();
        let isMoveValid = slotsPosibles.filter(s => s == slot).length > 0;
        if (slot && isMoveValid) {
            if (!this.isSelfChek(slot)) {
                this.movePiece(slot, Game.instance.board.selectedPiece);
                Game.instance.board.checkSlot = this.playChekSlot();
                this.playerTurnToogle();
            }
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
        let slotsPosibles = piece.getPosibleMoves(slotOrigen);
        slotsPosibles.map(slotDestiny => {
            if (!this.isSelfChek(slotDestiny)) {
                slotDestiny.isValidMove = true;
            }
        });
    }
    cleanPieceValidMovesAttr() {
        Game.instance.board.slots.map(slot => {
            slot.isValidMove = false;
        });
        if (Game.instance.board.selectedPiece)
            Game.instance.board.selectedPiece.isSelected = false;
        Game.instance.board.selectedPiece = null;
    }
    isSelfChek(slotDestiny) {
        let isSelfChek = false;
        let selectedPiece = Game.instance.board.selectedPiece;
        slotDestiny;
        if (selectedPiece && selectedPiece.type == ePieceType.King) {
            if (selectedPiece.color == eColor.white) {
                let opponentMoves = Piece.getAllPlayerMoves(eColor.black);
                if (opponentMoves.find(slot => slot == slotDestiny)) {
                    isSelfChek = true;
                }
            }
            else {
                let opponentMoves = Piece.getAllPlayerMoves(eColor.white);
                if (opponentMoves.find(slot => slot == slotDestiny)) {
                    isSelfChek = true;
                }
            }
        }
        return isSelfChek;
    }
    playChekSlot() {
        let playerPossibleMoves = Piece.getAllPlayerMoves(Game.instance.playerTurn);
        let opponentColor = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white;
        let OpponentKingSlot = Game.instance.board.slots.find(slot => (slot.piece && slot.piece.type == ePieceType.King && slot.piece.color == opponentColor));
        let isCheck = !!playerPossibleMoves.find(slot => slot == OpponentKingSlot);
        if (isCheck) {
            Game.instance.messages.setFeedbackTimeOut("Check. The king is in trouble, save the king!");
            return OpponentKingSlot;
        }
        return undefined;
    }
}
//# sourceMappingURL=actions.js.map