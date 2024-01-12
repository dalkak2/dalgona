import { $ } from "./util.ts"
import { Draggable } from "./Draggable.ts"
import { renderer } from "./Renderer.ts"
import { Block } from "./Block.ts"

export class BlockGroup extends Draggable {

    dom
    declare children: Block[]

    constructor(...children: Block[]) {
        super()
        this.dom = $("g", {
            transform: "translate(0 0)",
            style: `
                outline: solid 2px blue;
            `,
        })
        this.append(...children)
    }
    get magnets() {
        return [
            {
                x: 0,
                y: 0,
                type: "bottom",
                accept: "top",
            },
            {
                x: 0,
                y: this.bodyHeight,
                type: "top",
                accept: "bottom",
            },
        ]
    }
    render() {
        super.render()
        let accY = 0
        this.children.forEach(block => {
            block.y = accY
            block.render()
            accY += block.bodyHeight
        })
    }
    /**
     * Block height without notch
     */
    get bodyHeight() {
        return Math.max(
            this.height - renderer.notch.height,
            40,
        )
    }
}