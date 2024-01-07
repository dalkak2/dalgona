import { SVGElem } from "../SVGElem.ts"
import { $ } from "../util.ts"
import { renderer } from "../Renderer.ts"
import { Text } from "./Text.ts"

export class Input extends SVGElem {
    dom
    text
    baseBlock
    constructor(text = "") {
        super()
        this.dom = $("g", {
            transform: "translate(0 0)",
        })

        this.text = new Text(text)
        this.text.x = renderer.innerHeight / 2

        this.baseBlock = $("path", {
            fill: "#22222222",
        })
        this.dom.appendChild(this.baseBlock)
        this.append(this.text)
    }
    render() {
        this.baseBlock.setAttribute(
            "d",
            renderer.drawInnerBlock(this.text.width),
        )
    }
}