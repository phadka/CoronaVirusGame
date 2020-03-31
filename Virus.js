class Virus {
    constructor() {
        this.posx = 0;
        this.posy = 0;
        this.rot = 0;
    }
    set x(x) {
        this.posx = x;
    }
    get x() {
        return this.posx;
    }
    set y(y) {
        this.posy = y;
    }
    get y() {
        return this.posy;
    }
    set rotation(r) {
        this.rot = r;
    }
    get rotation() {
        return this.rot;
    }
    update() {
        this.posx -= 17.0 / 5000.0 * dt;
        this.rot += 0.3 * dt;
    }
}
