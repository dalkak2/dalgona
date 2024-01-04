import { $ } from "./util.ts"
import type { Block } from "./Block.ts"
import { renderer } from "./Renderer.ts"

export class App {
    dom
    constructor() {
        this.dom = $("svg", {
            width: "100%",
            height: "100%",
        })
    }
    addBlock(block: Block) {
        this.dom.appendChild(block.dom)
        block.render()
    }
    addBlocks(...blocks: Block[]) {
        let accY = 0
        blocks.forEach(block => {
            block.y = accY
            this.addBlock(block)
            accY += block.height - renderer.notch.height
        })
    }
}