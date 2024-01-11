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
}