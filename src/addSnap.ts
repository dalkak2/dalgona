import type { Coord } from "./util.ts"

export const snapPoints: Coord[] = []

export const addSnap = (target: Coord) => {
    snapPoints.push(target)
}