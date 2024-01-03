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