import { renderer } from "./Renderer.ts"
import { $ } from "./util.ts"

export class Block {
    text
    baseBlock
    dom
    constructor(text: string) {
        this.text = $("text", {
            x: 0,
            y: 20,
        }) as SVGTextElement
        this.text.append(text)
        console.log(this.text.getBoundingClientRect())
        this.baseBlock = $("path", {
            d: renderer.drawBasic(this.text.getBBox().width),
            fill: "#ffccdc"
        })
        this.dom = $("g")
        this.dom.appendChild(this.baseBlock)
        this.dom.appendChild(this.text)
    }
}