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
            // TODO si esta en jaque, chequear que la proxima jugada no es en jaque
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
            if (!this.isSelfChek(slotDestiny)) {
                slotDestiny.isValidMove = true
            }
        })
    }

    private cleanPieceValidMovesAttr(): void {
        Game.instance.board.slots.map(slot => {
            slot.isValidMove = false
        })
        if (Game.instance.board.selectedPiece) Game.instance.board.selectedPiece.isSelected = false
        Game.instance.board.selectedPiece = null
    }

    private isSelfChek(slotDestiny: BoardSlot): boolean {
        let isSelfChek: boolean = false
        let selectedPiece = Game.instance.board.selectedPiece
        slotDestiny
        if (selectedPiece && selectedPiece.type == ePieceType.King) {
            if (selectedPiece.color == eColor.white) {
                let opponentMoves = Piece.getAllPlayerMoves(eColor.black);
                if (opponentMoves.find(slot => slot == slotDestiny)) {
                    isSelfChek = true
                }
            } else {
                let opponentMoves = Piece.getAllPlayerMoves(eColor.white);
                if (opponentMoves.find(slot => slot == slotDestiny)) {
                    isSelfChek = true

                }
            }
        }
        // console.log("isSelfChek",isSelfChek)
        return isSelfChek;
    }
    private playChekSlot(): BoardSlot | undefined {
        let playerPossibleMoves = Piece.getAllPlayerMoves(Game.instance.playerTurn);
        let opponentColor = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white
        let OpponentKingSlot = Game.instance.board.slots.find(slot => (slot.piece && slot.piece.type == ePieceType.King && slot.piece.color == opponentColor))
        let isCheck = !!playerPossibleMoves.find(slot => slot == OpponentKingSlot)
        // console.log("isPlayChek", isCheck)

        if (isCheck) {
            Game.instance.messages.setFeedbackTimeOut("Check. The king is in trouble, save the king!")
            return OpponentKingSlot;
        } 
        return undefined
    }

}