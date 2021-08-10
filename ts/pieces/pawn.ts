import { BoardSlot } from '../board-slot.js'
import { eColor, Game } from '../game.js'
import { ePieceType, Piece } from '../piece.js'

export class Pawn extends Piece {
    constructor(player: eColor) {
        super(player, ePieceType.Pawn)
    }

    public getPosibleMoves(slotOrigen: BoardSlot): Array<BoardSlot> {
        let slots: Array<BoardSlot> = Game.instance.board.slots;
        let index: number = BoardSlot.getIndex(slotOrigen)
        let direction: number = (this.color === eColor.black) ? 1 : -1;
        let slotsPosibles: Array<BoardSlot> = []
        console.log("direction:",direction)

        let nextSlot: BoardSlot | null = slots[index + (8 * direction)]
        let next2Slot: BoardSlot | null = slots[index + (16 * direction)]
        let nextLeftSlot: BoardSlot | null = slots[index + (7 * direction)]
        let nextRightSlot: BoardSlot | null = slots[index + (9 * direction)]

        console.log("\nnextSlot: ",nextSlot,"\nnext2Slot: ",next2Slot,"\nnextLeftSlot: ",nextLeftSlot,"\nnextRightSlot: ",nextRightSlot)

        if (nextSlot && !nextSlot.piece) {
            slotsPosibles.push(nextSlot)
            if (this.isFirstMove && next2Slot && !next2Slot.piece) {
                slotsPosibles.push(next2Slot)
            }
        }

        if(nextLeftSlot && nextLeftSlot.piece && nextLeftSlot.piece.color == this.colorOponent){
            slotsPosibles.push(nextLeftSlot)
        }

        if(nextRightSlot && nextRightSlot.piece && nextRightSlot.piece.color == this.colorOponent){
            slotsPosibles.push(nextRightSlot)
        }
        return slotsPosibles
    }
}