import { SVGElem } from "./SVGElem.ts"
import { distance } from "./util.ts"
import {
    Coord,
    add,
    sub,
} from "./util.ts"

type Magnet = Coord & {
    accept: string
    type: string
}

type MagnetInfo = {
    x: number | (() => number),
    y: number | (() => number),
    accept: string,
    type: string,
}

export abstract class Draggable extends SVGElem {
    
    abstract magnets: Magnet[]

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

                let targetPos = now
                this.root.children.find(target => {
                    if (
                        target instanceof Draggable
                        && target != this
                    ) {
                        return target.magnets.find(magnet1 => {
                            return this.magnets.find(magnet2 => {
                                const d = distance(
                                    add(target, magnet1),
                                    add(now, magnet2),
                                )
                                if (d < 20 && magnet1.accept == magnet2.type) {
                                    targetPos = sub(
                                        add(target, magnet1),
                                        magnet2
                                    )
                                    return true
                                }
                            })
                        })
                    }
                })
                this.x = targetPos.x
                this.y = targetPos.y
            }
            document.body.addEventListener("pointermove", onMove)
            this.dom.addEventListener("pointerup", e => {
                document.body.removeEventListener("pointermove", onMove)
            }, { once: true })
        })
    }
}