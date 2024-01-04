import { SVGElem } from "./SVGElem.ts"

// TODO: to decorator
export const makeDraggable = (target: SVGElem) => {
    target.dom.addEventListener("pointerdown", e => {
        e.stopPropagation()
        target.moveToTop()
        const start = {
            x: target.x,
            y: target.y,
        }
        const offset = {
            x: e.clientX - target.x,
            y: e.clientY - target.y,
        }
        const onMove = (e: PointerEvent) => {
            const now = {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            }

            const dx = now.x - start.x
            const dy = now.y - start.y
            const d = Math.sqrt(dx**2 + dy**2)
            if (d > 20) {
                target.x = now.x
                target.y = now.y
            } else {
                target.x = start.x
                target.y = start.y
            }
        }
        document.body.addEventListener("pointermove", onMove)
        target.dom.addEventListener("pointerup", e => {
            document.body.removeEventListener("pointermove", onMove)
        }, { once: true })
    })
}