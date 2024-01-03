import { SVGElem } from "./SVGElem.ts"

// TODO: to decorator
export const makeDraggable = (target: SVGElem) => {
    const on = target.dom.addEventListener
    const off = target.dom.removeEventListener
    on("pointerdown", e => {
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
        on("pointermove", onMove)
        on("pointerup", e => {
            off("pointermove", onMove)
        }, { once: true })
    })
}