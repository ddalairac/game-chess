import { BoardSlot } from './board-slot.js';
import { eColor } from './game.js';
import { Piece } from './piece.js';
import { Bishop } from './pieces/bishop.js';
import { Horse } from './pieces/horse.js';
import { King } from './pieces/king.js';
import { Pawn } from './pieces/pawn.js';
import { Queen } from './pieces/queen.js';
import { Tower } from './pieces/tower.js';

export class Board {
    constructor() {
        this.slots = this.resetBoard();
    }

    public slots: BoardSlot[] = []
    public selectedPiece: Piece | null = null
    public checkSlot: BoardSlot | undefined = undefined

    public resetBoard() {
        const slots: BoardSlot[] = []
        let even = true;
        for (let y = 0; y < 8; y++) {
            even = !even;
            for (let x = 0; x < 8; x++) {
                let color = even ? eColor.black : eColor.white;
                slots.push(new BoardSlot(y, x, color, null));
                even = !even;
            }
        }

        for (let i = 8; i < 16; i++) {
            slots[i].piece = new Pawn(eColor.black);
            slots[i + 40].piece = new Pawn(eColor.white);
        }
        slots[0].piece = new Tower(eColor.black);
        slots[7].piece = new Tower(eColor.black);
        slots[56].piece = new Tower(eColor.white);
        slots[63].piece = new Tower(eColor.white);

        slots[1].piece = new Horse(eColor.black);
        slots[6].piece = new Horse(eColor.black);
        slots[57].piece = new Horse(eColor.white);
        slots[62].piece = new Horse(eColor.white);

        slots[2].piece = new Bishop(eColor.black);
        slots[5].piece = new Bishop(eColor.black);
        slots[58].piece = new Bishop(eColor.white);
        slots[61].piece = new Bishop(eColor.white);

        slots[3].piece = new Queen(eColor.black);
        slots[4].piece = new King(eColor.black);

        slots[59].piece = new Queen(eColor.white);
        slots[60].piece = new King(eColor.white);

        return slots;
    }

    public get slotsWithoutSelected(): BoardSlot[] {
        let slotsWithoutSelected = [...this.slots]
        for (let index = 0; index < slotsWithoutSelected.length; index++) {
            const slot = slotsWithoutSelected[index];
            if (slot.piece && slot.piece.isSelected) {
                let {y,x,color} = slot
                slotsWithoutSelected[index] = new BoardSlot(y,x,color,null)
            }
        }
        return slotsWithoutSelected
    }

}