export class Renderer {
    height = 40

    notchHeight = 20
    notchArc = 10
    get notch() {
        const height = this.notchHeight
        const arc = this.notchArc
        return {
            height,
            width: height + arc,
            arc,
            left: `
                l ${height} ${height}
                v -${height - arc}
                a ${arc} ${arc}
                0 0 1
                ${arc} -${arc}
            `,
            right: `
                a ${arc} ${arc}
                  0 0 0
                  -${arc} ${arc}
                v ${height - arc}
                l -${height} -${height}
            `,
        }
    }

    drawBasic(width: number) {
        return `
            M 0 0
            ${this.notch.left}
            h ${width}
            a ${this.height / 2} ${this.height / 2}
              0 0 1
              0 ${this.height}
            h ${-width}
            ${this.notch.right}
            z
        `
    }
}

export const renderer = new Renderer()