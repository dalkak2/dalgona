export abstract class SVGElem {
    abstract dom: SVGGraphicsElement
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
}