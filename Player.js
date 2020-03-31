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
        this.posx = 0.0;
        this.posy = 2.0;
    }
    update() {
        if (keys[3]) this.posx += 17 / 5000 * dt;
        if (keys[2]) this.posx -= 17 / 5000 * dt;
        if (this.posx > 17) this.posx = -1;
        if (this.posx < -1) this.posx = 17;
        
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
            var ny = -8 * this.jumpd ** 2 + 8 * this.jumpd + 2.0;
            this.posy = ny;
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
}
