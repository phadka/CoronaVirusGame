class Virus {
    constructor(fly) {
        this.posx = 0;
        this.posy = 0;
        this.rot = 0;
        this.bfly = fly;
    }
    set fly (fly) {
        this.bfly = fly;
    }
    get fly() {
        return this.fly;
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
        if (this.bfly) this.posy = 3;
        else this.posy = 2;
    }
}
