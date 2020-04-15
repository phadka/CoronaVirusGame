class Virus {
    constructor(fly, red, left = true) {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.fly = fly;
        this.red = red;
        this.left = left;
    }
    set red(r) {
        this.bred = r;
    }
    get red() {
        return this.bred;
    }
    set fly (fly) {
        this.bfly = fly;
    }
    get fly() {
        return this.bfly;
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
        if (this.left) {
            this.x -= 17.0 / 5000.0 * dt;
            this.rotation += 0.3 * dt;
        } else {
            this.x += 17.0 / 5000.0 * dt;
            this.rotation -= 0.3 * dt;
        }
        if (this.fly) this.y = 3;
        else this.y = 2;
    }
}
