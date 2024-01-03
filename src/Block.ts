import { renderer } from "./Renderer.ts"
import { $ } from "./util.ts"

export class Block {
    text
    baseBlock
    dom
    constructor(text: string) {
        this.text = $("text", {
            x: renderer.notch.width,
            y: renderer.height / 2,
            style: `
                dominant-baseline: central;
                user-select: none;
            `
        })
        this.text.append(text)
        this.baseBlock = $("path", {
            fill: "#ffccdc",
        })
        this.dom = $("g")
        this.dom.appendChild(this.baseBlock)
        this.dom.appendChild(this.text)
    }
    render() {
        this.baseBlock.setAttribute(
            "d",
            renderer.drawBlock(
                this.text.getBBox().width,
                [
                    40,
                    50,
                ]
            ),
        )
    }
}