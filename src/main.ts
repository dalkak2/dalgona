import { $ } from "./util.ts"

import { Block, Text, InputBlock } from "./Block.ts"

const app = $("svg", {
    width: "100%",
    height: "100%",
})
document.body.appendChild(app)

const block = new Block([
    new Text("(10)번 반복하기"),
    new InputBlock(),
    new Text("(10)번 반복하기"),
])
app.appendChild(block.dom)
block.render()