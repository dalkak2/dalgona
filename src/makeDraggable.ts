import { SVGElem } from "./SVGElem.ts"
import { snapPoints } from "./addSnap.ts"
import { distance } from "./util.ts"

// TODO: to decorator
export const makeDraggable = (target: SVGElem) => {
    target.dom.addEventListener("pointerdown", e => {
        e.stopPropagation()
        target.moveToTop()

        const offset = {
            x: e.clientX - target.x,
            y: e.clientY - target.y,
        }
        const onMove = (e: PointerEvent) => {
            const now = {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            }

            const snapTarget = snapPoints.find(snapTarget => {
                const d = distance(snapTarget, now)
                return d < 20 && snapTarget.elem != target
            })
            if (snapTarget) {
                target.x = snapTarget.x
                target.y = snapTarget.y
            } else {
                target.x = now.x
                target.y = now.y
            }
        }
        document.body.addEventListener("pointermove", onMove)
        target.dom.addEventListener("pointerup", e => {
            document.body.removeEventListener("pointermove", onMove)
        }, { once: true })
    })
}