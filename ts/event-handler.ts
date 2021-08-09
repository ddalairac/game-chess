import { Game } from './game.js'
import { Render } from './render.js'

export class EventHandler {
    constructor() {
        // console.log("EventHandler instance")
        Render.instance.canvas.addEventListener("mousedown", this.onMouseDown, false)
        Render.instance.canvas.addEventListener('mouseup', this.onMouseUp, false)
        Render.instance.canvas.addEventListener('mousemove', this.onMouseMove, false)
        this.start = document.getElementById('newBTN')
        if (this.start) this.start.addEventListener('click', Game.instance.starGame)
    }

    start: HTMLElement | null
    private mouseIsDown = false

    private onMouseDown(e: MouseEvent) {
        // console.log("onMouseDown", e)
        let slotSize = Render.instance.slotSize
        let topMargin = Render.instance.topMargin
        let leftMargin = Render.instance.leftMargin;

        Game.instance.board.slots.forEach(slot => {
            let yPx = (slot.y * slotSize) + topMargin;
            let xPx = (slot.x * slotSize) + leftMargin;

            if (e.clientX >= xPx && e.clientX <= xPx + slotSize && e.clientY >= yPx && e.clientY <= yPx + slotSize) {
                if (slot.piece) {
                    slot.piece.isSelected = true
                    Game.instance.board.selectedPiece = slot.piece
                }
                // console.log("click:", slot, slot.piece)
            }
        })

        Game.instance.mouse.x = e.clientX
        Game.instance.mouse.y = e.clientY
        this.mouseIsDown = true
    }
    private onMouseUp(e: MouseEvent) {
        // console.log("onMouseUp", e)

        this.mouseIsDown = false
        Game.instance.board.selectedPiece = null
        Game.instance.board.slots.forEach(slot => {
            if (slot.piece) {
                slot.piece.isSelected = false;
            }
        })
    }

    private onMouseMove(e: MouseEvent) {
        console.log("onMouseMove", e.clientX, e.clientY)
        if (this.mouseIsDown) {
            Game.instance.mouse.x = e.clientX
            Game.instance.mouse.y = e.clientY
        }
    }
}