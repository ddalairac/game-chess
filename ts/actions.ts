import { BoardSlot } from './board-slot.js';
import { eColor, Game } from './game.js';
import { ePieceType, Piece } from './piece.js';
import { Render } from './render.js';

export class Actions {
    constructor() {

    }

    public get moveParams() {
        let boarSize = Render.instance.boarSize;
        let slotSize = Render.instance.slotSize
        let topMargin = Render.instance.topMargin
        let leftMargin = Render.instance.leftMargin;
        let mouse = Game.instance.mouse

        return { boarSize, slotSize, topMargin, leftMargin, mouse }
    }
    public onClick() {
        let slot: BoardSlot | undefined = this.getSlotOnMousePosition()

        if (slot && slot.piece
            && slot.piece.color == Game.instance.playerTurn
        ) {
            this.setPieceValidMovesAttr(slot, slot.piece)
        }
        Game.instance.messages.setMoveMessages(true, slot);
    }
    public onRelease() {
        let slot: BoardSlot | undefined = this.getSlotOnMousePosition()
        let slotsPosibles: BoardSlot[] = this.getPieceValidMoves();
        let isMoveValid: boolean = slotsPosibles.filter(s => s == slot).length > 0 // Slot is in the list of valid moves

        if (slot && isMoveValid) {
            if (!this.isSelfChek(slot)) {
                this.movePiece(slot, Game.instance.board.selectedPiece)
                Game.instance.board.checkSlot = this.playChekSlot()
                this.playerTurnToogle()
            }
        } else {
            Game.instance.messages.setMoveMessages(false, slot, isMoveValid);
        }
        this.cleanPieceValidMovesAttr()
    }

    private movePiece(slot: BoardSlot, piece: Piece) {
        let previousSlot = Game.instance.board.slots.find(slot => slot.piece == piece)
        if (previousSlot != slot) {
            if (piece) piece.isFirstMove = false
            slot.piece = piece
            previousSlot.piece = null
        }
    }

    private playerTurnToogle(): void {
        Game.instance.playerTurn = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white;
        Game.instance.messages.displayPlayerTurn();
    }

    private getSlotOnMousePosition(): BoardSlot | undefined {
        const { slotSize, topMargin, leftMargin, mouse } = this.moveParams
        return Game.instance.board.slots.find(slot => {
            let yPx = (slot.y * slotSize) + topMargin;
            let xPx = (slot.x * slotSize) + leftMargin;
            return (mouse.x >= xPx && mouse.x <= xPx + slotSize && mouse.y >= yPx && mouse.y <= yPx + slotSize)
        })
    }

    private getPieceValidMoves(): BoardSlot[] {
        return Game.instance.board.slots.filter(slot => slot.isValidMove)
    }

    private setPieceValidMovesAttr(slotOrigen: BoardSlot, piece: Piece): void {
        slotOrigen.piece.isSelected = true
        Game.instance.board.selectedPiece = slotOrigen.piece
        let slotsPosibles: BoardSlot[] = piece.getPosibleMoves(slotOrigen)
        slotsPosibles.map(slotDestiny => {
            // if (!this.isSelfChek()) {
            slotDestiny.isValidMove = true
            // }
        })
    }

    private cleanPieceValidMovesAttr(): void {
        Game.instance.board.slots.map(slot => {
            slot.isValidMove = false
        })
        if (Game.instance.board.selectedPiece) Game.instance.board.selectedPiece.isSelected = false
        Game.instance.board.selectedPiece = null
    }

    private isSelfChek(destinySlot: BoardSlot | undefined): boolean {
        let selfChek: boolean = false
        let selectedPiece = Game.instance.board.selectedPiece
        let checkSlot = Game.instance.board.checkSlot
        if (selectedPiece) {
            let playerColor = selectedPiece.color
            let playerKinkSlot = Game.instance.board.slots.find(slot => (slot.piece && slot.piece.type == ePieceType.King && slot.piece.color == playerColor))
            let opponentColor = (playerColor == eColor.white) ? eColor.black : eColor.white
            let opponentMoves: BoardSlot[] = Piece.getAllPlayerMoves(opponentColor);

            opponentMoves = opponentMoves.filter(slot => slot != destinySlot)

            // If the move leaves me in check
            if (opponentMoves.find(slot => slot == playerKinkSlot)) {
                selfChek = true
                Game.instance.messages.setFeedbackTimeOut("The move leaves me in check")
            }
            // If I'm already in check, my next move should get me out
            if (checkSlot && checkSlot.piece.color == playerColor) {
                if (opponentMoves.find(slot => slot == checkSlot)) {
                    selfChek = true
                    Game.instance.messages.setFeedbackTimeOut("I'm already in check, my next move should get me out")
                }
            }
        }
        return selfChek;
    }

    private playChekSlot(): BoardSlot | undefined {
        let playerPossibleMoves = Piece.getAllPlayerMoves(Game.instance.playerTurn);
        let opponentColor = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white
        let opponentKingSlot = Game.instance.board.slots.find(slot => (slot.piece && slot.piece.type == ePieceType.King && slot.piece.color == opponentColor))
        let isPlayChek = !!playerPossibleMoves.find(slot => slot == opponentKingSlot)
        console.log("isPlayChek", isPlayChek)

        if (isPlayChek) {
            Game.instance.messages.setFeedbackTimeOut("Check. The king is in trouble, save the king!")
            return opponentKingSlot;
        }
        return undefined
    }

}