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
            toRight: `
                l ${height} ${height}
                v -${height - arc}
                a ${arc} ${arc}
                0 0 1
                ${arc} -${arc}
            `,
            toLeft: `
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
            ${this.notch.toRight}
            h ${width}
            a ${this.height / 2} ${this.height / 2}
              0 0 1
              0 ${this.height}
            h ${-width}
            ${this.notch.toLeft}
            z
        `
    }

    drawLoop(width: number) {
        const innerWidth = width - this.notch.width + this.notch.arc
        return `
            M 0 0
            ${this.notch.toRight}
            h ${width}
            a ${this.height / 2} ${this.height / 2}
              0 0 1
              0 ${this.height}
            h ${-innerWidth}
            ${this.notch.toLeft}
            v ${this.height}
            ${this.notch.toRight}
            h ${innerWidth}
            a ${this.height / 2} ${this.height / 2}
                0 0 1
                0 ${this.height}
            h ${-width}
            ${this.notch.toLeft}
            z
        `
    }
}

export const renderer = new Renderer()