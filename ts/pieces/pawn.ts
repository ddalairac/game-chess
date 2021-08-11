import { BoardSlot } from '../board-slot.js'
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Pawn extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Pawn)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): BoardSlot[] {
        let slots: BoardSlot[] = Game.instance.board.slots;
        let index: number = BoardSlot.getIndex(slotOrigen)
        let direction: number = (this.color === eColor.black) ? 1 : -1;
        let slotsPosibles: BoardSlot[] = []

        let nextSlot: BoardSlot | null = slots[index + (8 * direction)]
        let next2Slot: BoardSlot | null = slots[index + (16 * direction)]
        let nextLeftSlot: BoardSlot | null = slots[index + (7 * direction)]
        let nextRightSlot: BoardSlot | null = slots[index + (9 * direction)]

        if (nextSlot && !nextSlot.piece) {
            slotsPosibles.push(nextSlot)
            if (this.isFirstMove && next2Slot && !next2Slot.piece) {
                slotsPosibles.push(next2Slot)
            }
        }

        if(Piece.hasAPieceAndCanBeEat(nextLeftSlot,this)){
            slotsPosibles.push(nextLeftSlot)
        }

        if(Piece.hasAPieceAndCanBeEat(nextRightSlot,this)){
            slotsPosibles.push(nextRightSlot)
        }

        // TODO Promote pawn
        return slotsPosibles
    }


}