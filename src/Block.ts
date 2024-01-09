import { renderer } from "./Renderer.ts"
import { $, split } from "./util.ts"
import { Input, Text } from "./inline/mod.ts"
import { Draggable } from "./Draggable.ts"

type InlineItem = Input | Text
type Item = InlineItem | "statements"

export class Block extends Draggable {
    lines
    baseBlock
    dom
    constructor(items: Item[]) {
        super()
        this.lines = split(
            (x: Item): x is "statements" => x == "statements"
        )(items)
        this.baseBlock = $("path", {
            fill: "#ffccdc",
            stroke: "white",
            "stroke-width": 2,
        })
        this.dom = $("g", {
            transform: "translate(0 0)",
        })
        this.dom.appendChild(this.baseBlock)
        this.append(...this.lines.flat())

        /*
        const self = this
        addSnap({
            get x() {
                return self.x
            },
            get y() {
                return self.y
            },
            accept: "bottom",
            elem: this,
        })
        */
    }
    render() {
        super.render()
        let accX = renderer.notch.width - 5
        let accY = renderer.height / 2
        this.lines.forEach(items => {
            items.forEach(item => {
                item.render()
                item.x = accX
                accX += item.width + 5
                item.y = accY
            })
            accY += 40 + renderer.height
        })
        this.baseBlock.setAttribute(
            "d",
            renderer.drawBlock(
                accX - renderer.notch.width - 10,
                this.lines.toSpliced(0, 1).map(() => 40),
            ),
        )
    }
    /**
     * Block height without notch
     */
    get bodyHeight() {
        return this.height - renderer.notch.height
    }
}