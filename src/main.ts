import { Text, InputBlock } from "./inline/mod.ts"
import { Block } from "./Block.ts"
import { App } from "./App.ts"

const app = new App()
document.body.appendChild(app.dom)

app.addBlocks(
    new Block([
        new InputBlock(),
        new Text("번 반복하기"),
    ]),
    new Block([
        new InputBlock(),
        new Text("만큼 움직이기"),
    ]),
)