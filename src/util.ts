const svgNS = "http://www.w3.org/2000/svg"

export const $ =
    (tagName: string, attrs: Record<string, string | number> = {}) => {
        const elem = document.createElementNS(svgNS, tagName)
        Object.entries(attrs).forEach(([k, v]) => {
            elem.setAttribute(k, String(v))
        })
        return elem
    }