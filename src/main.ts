import { Renderer } from "./Renderer.ts"

const svgNS = "http://www.w3.org/2000/svg"

const renderer = new Renderer()

const $ =
    (tagName: string, attrs: Record<string, string | number> = {}) => {
        const elem = document.createElementNS(svgNS, tagName)
        Object.entries(attrs).forEach(([k, v]) => {
            elem.setAttribute(k, String(v))
        })
        return elem
    }

const app = $("svg")
const p = $("path", {
    d: renderer.drawBasic(100),
    fill: "#ffccdc",
})
app.appendChild(p)

document.body.appendChild(app)