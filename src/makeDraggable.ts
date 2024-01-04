import { SVGElem } from "./SVGElem.ts"

export const snapTo =
(target: {x: number, y: number}) => ({
    move(now: {x: number, y: number}) {
        const dx = now.x - target.x
        const dy = now.y - target.y
        const d = Math.sqrt(dx**2 + dy**2)
        if (d > 10) {
            return now
        } else {
            return target
        }
    }
})

// TODO: to decorator
export const makeDraggable =
(
    hook: {
        move: (a: {x: number, y: number}) => {x: number, y: number},
    }
) =>
(target: SVGElem) => {
    target.dom.addEventListener("pointerdown", e => {
        e.stopPropagation()
        target.moveToTop()
        const offset = {
            x: e.clientX - target.x,
            y: e.clientY - target.y,
        }
        const onMove = (e: PointerEvent) => {
            const {x, y} = hook.move({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            })
            target.x = x
            target.y = y
        }
        document.body.addEventListener("pointermove", onMove)
        target.dom.addEventListener("pointerup", e => {
            document.body.removeEventListener("pointermove", onMove)
        }, { once: true })
    })
}