import { SVGElem } from "./SVGElem.ts"
import { distance } from "./util.ts"
import type { Coord } from "./util.ts"

type Magnet = Coord & {
    accept: string
    type: string
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
    
                const snapTarget = this.root.children.find(target => {
                    if (
                        target instanceof Draggable
                        && target != this
                    ) {
                        return target.magnets.find(magnet1 => {
                            return this.magnets.find(magnet2 => {
                                const d = distance(magnet1, magnet2)
                                return d < 20
                            })
                        })
                    }
                })
                console.log(snapTarget)
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