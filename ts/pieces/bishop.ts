import { BoardSlot } from '../board-slot.js';
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Bishop extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Bishop)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): Array<BoardSlot> {
        let slots: Array<BoardSlot> = Game.instance.board.slots;
        let index: number = BoardSlot.getIndex(slotOrigen)
        let slotsPosibles: Array<BoardSlot> = []

        let topLeftLimit: number = slotOrigen.y * 8
        let topRightLimit: number = slotOrigen.y * 8 + 8
        let bottomLeftLimit: number = slotOrigen.y * 8
        let bottomRightLimit: number = slotOrigen.y * 8 + 8

        // to bottom right
        for (let i = index + 9; i < 64; i += 9) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) break;
            let nextSlot: BoardSlot = slots[i + 1]
            if (nextSlot.x != slot.x + 1) break;
        }

        // to bottom left
        for (let i = index + 7; i < 64; i += 7) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) { break; }
            let nextSlot: BoardSlot = slots[i - 1]
            if (nextSlot.x != slot.x - 1) { break }
        }
        // to top right
        for (let i = index - 9; i >= 0; i -= 9) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) break;
            let nextSlot: BoardSlot = slots[i - 1]
            if (nextSlot.x != slot.x - 1) break;
        }
        // to top left
        for (let i = index - 7; i >= 0; i -= 7) {
            let slot: BoardSlot = slots[i]
            if (!slot.piece || slot.piece.color != this.color) {
                slotsPosibles.push(slot)
            }
            if (slot.piece) { break; }
            let nextSlot: BoardSlot = slots[i + 1]
            if (nextSlot.x != slot.x + 1) { break }
        }

        return slotsPosibles
    }
}