import { BoardSlot } from '../board-slot.js';
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Bishop extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Bishop)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): BoardSlot[] {
        return Bishop.getPosibleMoves(slotOrigen, this)
    }
    public static getPosibleMoves(slotOrigen: BoardSlot, piece: Piece): BoardSlot[] {
        let slots: BoardSlot[] = Game.instance.board.slots;
        let index: number = BoardSlot.getIndex(slotOrigen)
        let slotsPosibles: BoardSlot[] = []

        // to bottom right
        if (slotOrigen.x + 1 < 8) {
            for (let i = index + 9; i < 64; i += 9) {
                let slot: BoardSlot = slots[i]
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot)
                }
                if (slot.piece) break; // Don't jump over pieces

                // Next slot is part of the same diagonal
                let nextSlot: BoardSlot = slots[i + 1]
                if (nextSlot && nextSlot.x != slot.x + 1) break;
            }
        }

        // to bottom left
        if (slotOrigen.x - 1 >= 0) {
            for (let i = index + 7; i < 64; i += 7) {
                let slot: BoardSlot = slots[i]
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot)
                }
                if (slot.piece) { break; }// Don't jump over pieces

                let nextSlot: BoardSlot = slots[i - 1]
                if (nextSlot && nextSlot.x != slot.x - 1) { break }
            }
        }
        // to top right
        if (slotOrigen.x + 1 < 8) {
            for (let i = index - 9; i >= 0; i -= 9) {
                let slot: BoardSlot = slots[i]
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot)
                }
                if (slot.piece) break;// Don't jump over pieces

                // Next slot is part of the same diagonal
                let nextSlot: BoardSlot = slots[i - 1]
                if (nextSlot && nextSlot.x != slot.x - 1) break;
            }
        }
        // to top left
        if (slotOrigen.x - 1 >= 0) {
            for (let i = index - 7; i >= 0; i -= 7) {
                let slot: BoardSlot = slots[i]
                if (Piece.isEmptyOrCanBeEat(slot, piece)) {
                    slotsPosibles.push(slot)
                }
                if (slot.piece) { break; }// Don't jump over pieces

                // Next slot is part of the same diagonal
                let nextSlot: BoardSlot = slots[i + 1]
                if (nextSlot && nextSlot.x != slot.x + 1) { break }
            }
        }

        return slotsPosibles
    }
}