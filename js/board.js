import { BoardSlot } from './board-slot.js';
import { eColor } from './game.js';
import { Bishop } from './pieces/bishop.js';
import { Horse } from './pieces/horse.js';
import { King } from './pieces/king.js';
import { Pawn } from './pieces/pawn.js';
import { Queen } from './pieces/queen.js';
import { Tower } from './pieces/tower.js';
export class Board {
    constructor() {
        this.slots = [];
        this.slots = this.resetBoard();
    }
    resetBoard() {
        const slots = [];
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
            slots[i].piece = new Pawn(eColor.black, slots[i].y, slots[i].x);
            slots[i + 40].piece = new Pawn(eColor.white, slots[i + 40].y, slots[i + 40].x);
        }
        slots[0].piece = new Tower(eColor.black, slots[0].y, slots[0].x);
        slots[7].piece = new Tower(eColor.black, slots[7].y, slots[7].x);
        slots[56].piece = new Tower(eColor.white, slots[56].y, slots[56].x);
        slots[63].piece = new Tower(eColor.white, slots[63].y, slots[63].x);
        slots[1].piece = new Horse(eColor.black, slots[1].y, slots[1].x);
        slots[6].piece = new Horse(eColor.black, slots[6].y, slots[6].x);
        slots[57].piece = new Horse(eColor.white, slots[57].y, slots[57].x);
        slots[62].piece = new Horse(eColor.white, slots[62].y, slots[62].x);
        slots[2].piece = new Bishop(eColor.black, slots[2].y, slots[2].x);
        slots[5].piece = new Bishop(eColor.black, slots[5].y, slots[5].x);
        slots[58].piece = new Bishop(eColor.white, slots[58].y, slots[58].x);
        slots[61].piece = new Bishop(eColor.white, slots[61].y, slots[61].x);
        slots[3].piece = new Queen(eColor.black, slots[3].y, slots[3].x);
        slots[4].piece = new King(eColor.black, slots[4].y, slots[4].x);
        slots[59].piece = new Queen(eColor.white, slots[59].y, slots[59].x);
        slots[60].piece = new King(eColor.white, slots[60].y, slots[60].x);
        return slots;
    }
}
//# sourceMappingURL=board.js.map