import { SVGElem } from "../SVGElem.ts"
import { $ } from "../util.ts"

export class Text extends SVGElem {
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