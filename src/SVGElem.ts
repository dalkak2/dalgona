export abstract class SVGElem {
    abstract dom: SVGGraphicsElement
    parent?: SVGElem | null
    children: SVGElem[] = []
    append(...children: SVGElem[]) {
        children.forEach(child => {
            child.parent = this
            this.children.push(child)
            this.dom.append(child.dom)
        })
    }
    render() {}
    get x() {
        return this.dom.transform.baseVal.getItem(0).matrix.e
    }
    set x(x: number) {
        this.dom.transform.baseVal.getItem(0).setTranslate(
            x,
            this.y,
        )
    }
    get y() {
        return this.dom.transform.baseVal.getItem(0).matrix.f
    }
    set y(y: number) {
        this.dom.transform.baseVal.getItem(0).setTranslate(
            this.x,
            y,
        )
    }
    get width() {
        return this.dom.getBBox().width
    }
    get height() {
        return this.dom.getBBox().height
    }
    get absX(): number {
        return this.x + (this.parent?.absX || 0)
    }
    get absY(): number {
        return this.y + (this.parent?.absY || 0)
    }
    get root() {
        return this.dom.closest("svg")
    }
    moveToTop() {
        if (!this.root) throw new Error("")
        this.x = this.absX
        this.y = this.absY
        this.root.append(this.dom)
        this.parent = null
    }
}