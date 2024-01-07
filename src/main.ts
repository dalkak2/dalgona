import { Text, Input } from "./inline/mod.ts"
import { Block } from "./Block.ts"
import { App } from "./App.ts"

const app = new App()
document.body.appendChild(app.dom)

app.addBlocks(
    new Block([
        new Input(),
        new Text("번 반복하기"),
        "statements",
    ]),
    new Block([
        new Input(),
        new Text("만큼 움직이기"),
    ]),
)