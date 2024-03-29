export abstract class SVGElem {
    abstract dom: SVGGraphicsElement
    parent?: SVGElem
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
        if (this.dom.transform.baseVal.length == 0) return 0
        return this.dom.transform.baseVal.getItem(0).matrix.e
    }
    set x(x: number) {
        this.dom.transform.baseVal.getItem(0).setTranslate(
            x,
            this.y,
        )
    }
    get y() {
        if (this.dom.transform.baseVal.length == 0) return 0
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
    get root(): SVGElem {
        return this.parent?.root || this
    }
    moveToTop() {
        if (!this.root) throw new Error("")
        this.x = this.absX
        this.y = this.absY
        this.root.append(this)
    }
}