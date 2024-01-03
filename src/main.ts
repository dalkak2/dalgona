import { $ } from "./util.ts"

import { Block } from "./Block.ts"

const app = $("svg", {
    width: "100%",
    height: "100%",
})
const block = new Block("안녕")
app.appendChild(block.dom)
document.body.appendChild(app)
block.render()