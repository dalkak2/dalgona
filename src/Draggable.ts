import { SVGElem } from "./SVGElem.ts"
import { distance } from "./util.ts"
import type { Coord } from "./util.ts"

type Magnet = Coord & {
    accept: string
    type: string
    elem: Draggable
}

export abstract class Draggable extends SVGElem {
    
    magnets: Magnet[] = []

    constructor() {
        super()
    }
    render() {
        super.render()
        this.makeDraggable()
    }

    private makeDraggable() {
        this.dom.addEventListener("pointerdown", e => {
            e.stopPropagation()
            this.moveToTop()
    
            const offset = {
                x: e.clientX - this.x,
                y: e.clientY - this.y,
            }
            const onMove = (e: PointerEvent) => {
                const now = {
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                }
    
                const snapTarget = this.root.children.find(snapTarget => {
                    if (snapTarget instanceof Draggable) {
                        const d = distance(snapTarget, now)
                        return d < 20 && snapTarget != this
                    }
                })
                if (snapTarget) {
                    this.x = snapTarget.x
                    this.y = snapTarget.y
                } else {
                    this.x = now.x
                    this.y = now.y
                }
            }
            document.body.addEventListener("pointermove", onMove)
            this.dom.addEventListener("pointerup", e => {
                document.body.removeEventListener("pointermove", onMove)
            }, { once: true })
        })
    }
}