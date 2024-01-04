import { $ } from "./util.ts"
import type { Block } from "./Block.ts"
import { SVGElem } from "./SVGElem.ts"

export class App extends SVGElem {
    dom
    constructor() {
        super()
        this.dom = $("svg", {
            width: "100%",
            height: "100%",
        })
    }
    addBlock(block: Block) {
        this.append(block)
        block.render()
    }
    addBlocks(...blocks: Block[]) {
        let accY = 0
        blocks.forEach(block => {
            block.y = accY
            this.addBlock(block)
            accY += block.bodyHeight
        })
    }
}