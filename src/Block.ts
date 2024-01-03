import { renderer } from "./Renderer.ts"
import { $ } from "./util.ts"
import { InputBlock, Text } from "./inline/mod.ts"
import { makeDraggable } from "./makeDraggable.ts"
import { SVGElem } from "./SVGElem.ts"

type InlineItem = InputBlock | Text

export class Block extends SVGElem {
    items
    baseBlock
    dom
    constructor(items: InlineItem[]) {
        super()
        this.items = items
        this.baseBlock = $("path", {
            fill: "#ffccdc",
        })
        this.dom = $("g", {
            transform: "translate(0 0)",
        })
        this.dom.appendChild(this.baseBlock)
        items.forEach(item => this.dom.appendChild(item.dom))
        makeDraggable(this)
    }
    render() {
        let accX = renderer.notch.width - 5
        this.items.forEach(item => {
            item.render()
            item.x = accX
            accX += item.width + 5
            item.y = renderer.height / 2
        })
        this.baseBlock.setAttribute(
            "d",
            renderer.drawBlock(
                accX - renderer.notch.width - 10,
                [
                    40,
                ]
            ),
        )
    }
}