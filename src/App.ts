import { $ } from "./util.ts"
import type { Block } from "./Block.ts"

export class App {
    dom
    constructor() {
        this.dom = $("svg", {
            width: "100%",
            height: "100%",
        })
    }
    addBlocks(...blocks: Block[]) {
        blocks.forEach(block => {
            this.dom.appendChild(block.dom)
            block.render()
        })
    }
}