import type { Coord } from "./util.ts"
import type { SVGElem } from "./SVGElem.ts"

type SnapInfo = Coord & {
    accept: string
    elem: SVGElem
}

export const snapPoints: SnapInfo[] = []

export const addSnap = (target: SnapInfo) => {
    snapPoints.push(target)
}