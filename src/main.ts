import { $ } from "./util.ts"

import { Text, InputBlock } from "./inline/mod.ts"
import { Block } from "./Block.ts"

const app = $("svg", {
    width: "100%",
    height: "100%",
})
document.body.appendChild(app)

const block = new Block([
    new InputBlock(),
    new Text("번 반복하기"),
])
app.appendChild(block.dom)
block.render()