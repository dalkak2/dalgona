import { $ } from "./util.ts"

import { Block } from "./Block.ts"

const app = $("svg", {
    width: "100%",
    height: "100%",
})
const p = new Block("abcd")
app.appendChild(p.dom)
document.body.appendChild(app)
console.log(p.text.getBBox())