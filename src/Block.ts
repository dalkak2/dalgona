import { renderer } from "./Renderer.ts"
import { $, split } from "./util.ts"
import { Input, Text } from "./inline/mod.ts"
import { Draggable } from "./Draggable.ts"
import { BlockGroup } from "./BlockGroup.ts"

type InlineItem = Input | Text
type Item = InlineItem | BlockGroup

const isStatement = (x: Item): x is BlockGroup => x instanceof BlockGroup

const statementOffsetX = renderer.notch.height

export class Block extends Draggable {
    lines
    statements
    baseBlock
    dom
    constructor(items: Item[]) {
        super()
        this.lines = split(isStatement)(items)
        this.statements = items.filter(isStatement)
        this.baseBlock = $("path", {
            fill: "#ffccdc",
            stroke: "white",
            "stroke-width": 2,
        })
        this.dom = $("g", {
            transform: "translate(0 0)",
            style: `
                outline: solid 1px red;
            `,
        })
        this.dom.appendChild(this.baseBlock)
        this.append(...items)
    }
    get magnets() {
        let accY = 0
        return [
            {
                x: 0,
                y: 0,
                type: "top",
                accept: "bottom",
            },
            ...this.statements.map(statement => [
                {
                    x: statementOffsetX,
                    y: accY += renderer.height,
                    type: "bottom",
                    accept: "top",
                },
                {
                    x: statementOffsetX,
                    y: accY += statement.bodyHeight,
                    type: "top",
                    accept: "bottom",
                },
            ]).flat(),
            {
                x: 0,
                y: this.bodyHeight,
                type: "bottom",
                accept: "top",
            },
        ]
    }
    render() {
        super.render()
        let accX = renderer.notch.width - 5
        let accY = renderer.height / 2
        this.lines.forEach((items, i) => {
            items.forEach(item => {
                item.render()
                item.x = accX
                accX += item.width + 5
                item.y = accY
            })
            accY += renderer.height / 2
            if (this.statements[i]) {
                this.statements[i].render()
                this.statements[i].x = statementOffsetX
                this.statements[i].y = accY
                accY += this.statements[i].bodyHeight
            }
            accY += renderer.height
        })
        this.baseBlock.setAttribute(
            "d",
            renderer.drawBlock(
                accX - renderer.notch.width - 10,
                this.statements.map(statement => statement.bodyHeight),
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