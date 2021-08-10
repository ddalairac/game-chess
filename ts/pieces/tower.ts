import { BoardSlot } from '../board-slot.js';
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Tower extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Tower)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): Array<BoardSlot> {
        let slots: Array<BoardSlot> = Game.instance.board.slots;
        let index: number = BoardSlot.getIndex(slotOrigen)
        let slotsPosibles: Array<BoardSlot> = []

        let leftLimit: number = slotOrigen.y * 8
        let rightLimit: number = slotOrigen.y * 8 + 8

        // to bottom
        for (let i = index + 8; i < 64; i += 8) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) break;
        }
        // to top
        for (let i = index - 8; i >= 0; i -= 8) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) break;
        }
        // to rigth
        for (let i = index + 1; i < rightLimit; i++) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) break;
        }
        // to left
        for (let i = index - 1; i >= leftLimit; i--) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) break;
        }
        // TODO enroque

        return slotsPosibles
    }

}