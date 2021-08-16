import { BoardSlot } from '../board-slot.js';
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Horse extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Horse)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): BoardSlot[] {
        let slots: BoardSlot[] = Game.instance.board.slotsWithoutSelected;
        let slotsPosibles: BoardSlot[] = []

        slotsPosibles = slots.filter(slot => {
            if (
                (slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y - 2) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y - 2) ||
                (slot.x == slotOrigen.x - 2 && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x + 2 && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y + 2) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y + 2) ||
                (slot.x == slotOrigen.x - 2 && slot.y == slotOrigen.y + 1) ||
                (slot.x == slotOrigen.x + 2 && slot.y == slotOrigen.y + 1)
            ) {
                if (Piece.isEmptyOrCanBeEat(slot,this)) {
                    return true
                }
            }
        })
        return slotsPosibles
    }
}