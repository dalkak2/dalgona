const svgNS = "http://www.w3.org/2000/svg"

type TagMap = {
    svg: SVGSVGElement
    path: SVGPathElement
    g: SVGGElement
    text: SVGTextElement
}

type FromTagName<T extends keyof TagMap> = TagMap[T]

export const $ =
    <T extends keyof TagMap>
    (
        tagName: T,
        attrs: Record<string, string | number> = {},
    ) => {
        const elem = document.createElementNS(svgNS, tagName)
        Object.entries(attrs).forEach(([k, v]) => {
            elem.setAttribute(k, String(v))
        })
        return elem as FromTagName<T>
    }

export const split =
    <A, S extends A>
    (judge: (a: A) => a is S) =>
    (as: A[]) =>
    {
        const result: Exclude<A, S>[][] = [[]]
        as.forEach(a => {
            if (judge(a)) {
                result.push([])
            } else {
                result[result.length - 1].push(a as Exclude<A, S>)
            }
        })
        return result
    }

export type Coord = {x: number, y: number}

export const distance = (a: Coord, b: Coord) => {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.sqrt(dx**2 + dy**2)
}