import { Text, Input } from "./inline/mod.ts"
import { Block } from "./Block.ts"
import { App } from "./App.ts"
import { BlockGroup } from "./BlockGroup.ts"

const app = new App()
document.body.appendChild(app.dom)

const blockGroup = new BlockGroup(
    new Block([
        new Input(),
        new Text("번 반복하기"),
        new BlockGroup(
            new Block([
                new Input(),
                new Text("만큼 움직이기"),
            ]),
            new Block([
                new Input(),
                new Text("만큼 움직이기"),
            ]),
        ),
    ]),
)
app.append(blockGroup)
blockGroup.render()