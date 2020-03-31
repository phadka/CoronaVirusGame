class Laser {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
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
        this.x += 17.0 / 1000.0 * dt * Math.cos(this.rotation);
        this.y += 17.0 / 1000.0 * dt * Math.sin(this.rotation);
    }
}
