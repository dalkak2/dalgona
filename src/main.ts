import { $ } from "./util.ts"

import { Block } from "./Block.ts"

const app = $("svg", {
    width: "100%",
    height: "100%",
})
document.body.appendChild(app)

const block = new Block("안녕, 세계")
app.appendChild(block.dom)
block.render()