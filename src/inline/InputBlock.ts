import { SVGElem } from "../SVGElem.ts"
import { $ } from "../util.ts"
import { renderer } from "../Renderer.ts"
import { Text } from "./Text.ts"
import { makeDraggable, snapTo } from "../makeDraggable.ts"

export class InputBlock extends SVGElem {
    dom
    text
    baseBlock
    constructor(text = "10") {
        super()
        this.dom = $("g", {
            transform: "translate(0 0)",
        })

        this.text = new Text(text)
        this.text.x = renderer.innerHeight / 2

        this.baseBlock = $("path", {
            fill: "#ffef98",
        })
        this.dom.appendChild(this.baseBlock)
        this.append(this.text)
        makeDraggable(snapTo({
            x: this.x,
            y: this.y,
        }))(this)
    }
    render() {
        this.baseBlock.setAttribute(
            "d",
            renderer.drawInnerBlock(this.text.width),
        )
    }
}