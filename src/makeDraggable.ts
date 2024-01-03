import { SVGElem } from "./SVGElem.ts"

// TODO: to decorator
export const makeDraggable = (target: SVGElem) => {
    const on = target.dom.addEventListener
    const off = target.dom.removeEventListener
    on("pointerdown", e => {
        const offset = {
            x: e.clientX - target.x,
            y: e.clientY - target.y,
        }
        const onMove = (e: PointerEvent) => {
            target.x = e.clientX - offset.x
            target.y = e.clientY - offset.y
        }
        on("pointermove", onMove)
        on("pointerup", e => {
            off("pointermove", onMove)
        }, { once: true })
    })
}