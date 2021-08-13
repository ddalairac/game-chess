import { BoardSlot } from '../board-slot.js';
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class King extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.King)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): BoardSlot[] {
        let slots: BoardSlot[] = Game.instance.board.slots;
        let slotsPosibles: BoardSlot[] = []

        slotsPosibles = slots.filter(slot => {
            if (
                (slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x     && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y - 1) ||

                (slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y ) ||
                // (slot.x == slotOrigen.x     && slot.y == slotOrigen.y - 1) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y ) ||
                
                (slot.x == slotOrigen.x - 1 && slot.y == slotOrigen.y + 1) ||
                (slot.x == slotOrigen.x     && slot.y == slotOrigen.y + 1) ||
                (slot.x == slotOrigen.x + 1 && slot.y == slotOrigen.y + 1) 
            ) {
                if (Piece.isEmptyOrCanBeEat(slot, this)) {
                    return true
                }
            }
        })

        // TODO enroque
        
        return slotsPosibles
    }
    
}