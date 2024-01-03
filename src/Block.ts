import { renderer } from "./Renderer.ts"
import { $ } from "./util.ts"

export abstract class Item {
    abstract dom: SVGGraphicsElement
    abstract set x(x: number)
    abstract set y(y: number)
    abstract get width(): number
    render() {}
}

export abstract class SVGItem extends Item {
    get x() {
        return this.dom.transform.baseVal.getItem(0).matrix.e
    }
    set x(x: number) {
        this.dom.transform.baseVal.getItem(0).setTranslate(
            x,
            this.y,
        )
    }
    get y() {
        return this.dom.transform.baseVal.getItem(0).matrix.f
    }
    set y(y: number) {
        this.dom.transform.baseVal.getItem(0).setTranslate(
            this.x,
            y,
        )
    }
    get width() {
        return this.dom.getBBox().width
    }
}

export class Text extends SVGItem {
    dom
    constructor(text: string) {
        super()
        this.dom = $("text", {
            style: `
                dominant-baseline: central;
                user-select: none;
            `,
            transform: "translate(0 0)",
        })
        this.dom.append(text)
    }
}

export class InputBlock extends SVGItem {
    dom
    baseBlock
    constructor() {
        super()
        this.dom = $("g", {
            transform: "translate(0 0)",
        })
        this.baseBlock = $("path", {
            fill: "#ffef98",
        })
        this.dom.appendChild(this.baseBlock)
    }
    render() {
        this.baseBlock.setAttribute(
            "d",
            renderer.drawInnerBlock(20),
        )
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