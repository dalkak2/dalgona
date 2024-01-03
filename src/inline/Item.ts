export abstract class Item {
    abstract dom: SVGGraphicsElement
    abstract set x(x: number)
    abstract set y(y: number)
    abstract get width(): number
    render() {}
}

export abstract class SVGItem extends Item {
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