var playerdata =
[
    0.0, 2.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.0, 2.0, 0.0, 0.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 2.0, 1.0, 0.0,
];
class Player extends TVBO {
    constructor() {
        super('player', playerdata);
        this.smallp = new Block('splayer');
        this.x = 0;
        this.y = 2;
        this.rotation = 0;
        this.small = false;
    }
    get small() {
        return this.bsmall;
    }
    set small(b) {
        this.bsmall = b;
    }
    update() {
        if (keys[3]) this.x += 17 / 5000 * dt;
        if (keys[2]) this.x -= 17 / 5000 * dt;
        if (keys[1]) this.small = true;
        else this.small = false;

        if (this.x > 15) this.x = 15;
        if (this.x < 0) this.x = 0;

        if (keys[0] && !this.jump && !this.djump) {
            this.jump = true;
            this.jumpd = 0.0;
        }
        if (this.jump && keys[0] && this.jumpd > 0.5) {
            this.djump = true;
            this.jump = false;
            this.djumpd = 0.0;
        }
        if (this.jump && !this.djump) {
            this.jumpd += dt / 1000;
            this.posy = -8 * this.jumpd ** 2 + 8 * this.jumpd + 2.0;
            if (this.posy < 2.0) {
                this.jump = false;
                this.posy = 2.0;
            }
        }
        if (this.djump) {
            this.djumpd += dt / 1000;
            var ny = -8 * this.jumpd ** 2 + 8 * this.jumpd + 2.0;
            ny += -8 * this.djumpd ** 2 + 8 * this.djumpd;
            this.posy = ny;
            if (this.posy < 2.0) {
                this.djump = false;
                this.posy = 2.0;
            }
        }
    }
    draws() {
        this.smallp.x = this.posx;
        this.smallp.y = this.posy;
        this.smallp.draw();
    }
}
