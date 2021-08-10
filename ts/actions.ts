import { BoardSlot } from './board-slot.js';
import { Game } from './game.js';
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
        if (slot && slot.piece) {
            slot.piece.isSelected = true
            Game.instance.board.selectedPiece = slot.piece
            this.setValidMoves(slot, slot.piece)
        }
    }
    public onRelease() {
        let slot: BoardSlot | undefined = this.getSlotOnMousePosition()
        if (slot) {
            // TODO validate move
            // TODO Render valid moves on board
            this.movePiece(slot, Game.instance.board.selectedPiece)
        }
        this.resetValidMoves()
        Game.instance.board.selectedPiece.isSelected = false
        Game.instance.board.selectedPiece = null
    }

    private movePiece(slot: BoardSlot, piece: Piece) {
        let previousSlot = Game.instance.board.slots.find(slot => slot.piece == piece)
        if (previousSlot != slot) {
            slot.piece = piece
            previousSlot.piece = null
        }
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

    private setValidMoves(slotOrigen: BoardSlot, piece: Piece) {
        Game.instance.board.slots.forEach(slotDestiny => {
            if (Piece.isMovePosible(slotOrigen, slotDestiny, piece) {
                slotDestiny.isValidMove = true
            }
        })
    }
    private resetValidMoves() {
        Game.instance.board.slots.forEach(slot => {
            slot.isValidMove = false
        })
    }
}