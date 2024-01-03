import { renderer } from "./Renderer.ts"
import { $ } from "./util.ts"
import { Item } from "./inline/Item.ts"

export class Block {
    items
    baseBlock
    dom
    constructor(items: Item[]) {
        this.items = items
        this.baseBlock = $("path", {
            fill: "#ffccdc",
        })
        this.dom = $("g")
        this.dom.appendChild(this.baseBlock)
        items.forEach(item => this.dom.appendChild(item.dom))
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