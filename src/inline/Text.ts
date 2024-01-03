import { SVGItem } from "./Item.ts"
import { $ } from "../util.ts"

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