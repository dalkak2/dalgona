import { $ } from "../util.ts"
import { renderer } from "../Renderer.ts"
import { Text } from "./Text.ts"
import { Draggable } from "../Draggable.ts"

export class InputBlock extends Draggable {
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
    }
    render() {
        super.render()
        this.baseBlock.setAttribute(
            "d",
            renderer.drawInnerBlock(this.text.width),
        )
    }
}