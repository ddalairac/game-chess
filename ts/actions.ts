import { BoardSlot } from './board-slot.js';
import { eColor, Game } from './game.js';
import { Piece } from './piece.js';
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
        const { boarSize, slotSize, topMargin, leftMargin, mouse } = this.moveParams
        // Game.instance.messages.setFeedback("some text")

        let slot: BoardSlot | undefined = this.getSlotOnMousePosition()
        if (slot && slot.piece && slot.piece.color == Game.instance.playerTurn) {
            slot.piece.isSelected = true
            Game.instance.board.selectedPiece = slot.piece
            this.setValidMoves(slot, slot.piece)
        
        }
        Game.instance.messages.setMoveMessages(true,slot);
    }
    public onRelease() {
        let slot: BoardSlot | undefined = this.getSlotOnMousePosition()
        let slotsPosibles: BoardSlot[] = this.getValidMoves();
        let isMoveValid:boolean = slotsPosibles.filter(s => s == slot).length > 0 // Slot is in the list of valid moves
        if (slot && isMoveValid) {
            this.movePiece(slot, Game.instance.board.selectedPiece)
            this.playerTurnToogle()
        } else {
            Game.instance.messages.setMoveMessages(false,slot,isMoveValid);
        }
        this.resetValidMoves()
        if (Game.instance.board.selectedPiece) Game.instance.board.selectedPiece.isSelected = false
        Game.instance.board.selectedPiece = null
    }

    private movePiece(slot: BoardSlot, piece: Piece) {
        let previousSlot = Game.instance.board.slots.find(slot => slot.piece == piece)
        if (previousSlot != slot) {
            if (piece) piece.isFirstMove = false
            slot.piece = piece
            previousSlot.piece = null
        }
    }
    playerTurnToogle(): void {
        Game.instance.playerTurn = (Game.instance.playerTurn == eColor.white) ? eColor.black : eColor.white;
        Game.instance.messages.setFeedback();
    }

    private getSlotOnMousePosition(): BoardSlot | undefined {
        const { boarSize, slotSize, topMargin, leftMargin, mouse } = this.moveParams

        return Game.instance.board.slots.find(slot => {
            let yPx = (slot.y * slotSize) + topMargin;
            let xPx = (slot.x * slotSize) + leftMargin;

            if (mouse.x >= xPx && mouse.x <= xPx + slotSize && mouse.y >= yPx && mouse.y <= yPx + slotSize) {

                return true
            }
        })
    }
    private getValidMoves(): BoardSlot[] {
        return Game.instance.board.slots.filter(slot => slot.isValidMove)
    }
    private setValidMoves(slotOrigen: BoardSlot, piece: Piece): void {
        let slotsPosibles: BoardSlot[] = piece.getPosibleMoves(slotOrigen)
        slotsPosibles.map(slotDestiny => {
            slotDestiny.isValidMove = true
        })
        // console.log("slotsPosibles", slotsPosibles)
    }
    private resetValidMoves(): void {
        Game.instance.board.slots.map(slot => {
            slot.isValidMove = false
        })
    }
}