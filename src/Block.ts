import { renderer } from "./Renderer.ts"
import { $ } from "./util.ts"

export abstract class Item {
    abstract dom: SVGElement
    abstract set x(x: number)
    abstract set y(y: number)
    abstract get width(): number
}

export class Text extends Item {
    dom
    constructor(text: string) {
        super()
        this.dom = $("text", {
            x: renderer.notch.width,
            y: renderer.height / 2,
            style: `
                dominant-baseline: central;
                user-select: none;
            `
        })
        this.dom.append(text)
    }
    set x(x: number) {
        this.dom.setAttribute("x", String(x))
    }
    set y(y: number) {
        this.dom.setAttribute("y", String(y))
    }
    get width() {
        return this.dom.getBBox().width
    }
}

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
        let accX = renderer.notch.width
        this.items.forEach(item => {
            item.x = accX
            accX += item.width
            item.y = renderer.height / 2
        })
        this.baseBlock.setAttribute(
            "d",
            renderer.drawBlock(
                accX - renderer.notch.width,
                [
                    40,
                    50,
                ]
            ),
        )
    }
}