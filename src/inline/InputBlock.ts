import { SVGItem } from "./Item.ts"
import { $ } from "../util.ts"
import { renderer } from "../Renderer.ts"

export class InputBlock extends SVGItem {
    dom
    baseBlock
    constructor() {
        super()
        this.dom = $("g", {
            transform: "translate(0 0)",
        })
        this.baseBlock = $("path", {
            fill: "#ffef98",
        })
        this.dom.appendChild(this.baseBlock)
    }
    render() {
        this.baseBlock.setAttribute(
            "d",
            renderer.drawInnerBlock(20),
        )
    }
}