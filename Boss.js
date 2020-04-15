var bossdata =
[
    0.0, 2.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
    2.0, 0.0, 1.0, 1.0,
    0.0, 2.0, 0.0, 0.0,
    2.0, 0.0, 1.0, 1.0,
    2.0, 2.0, 1.0, 0.0,
];
class Boss extends TVBO {
    constructor(welt) {
        super('cv', bossdata);
        this.welt = welt;
        this.x = 14;
        this.y = 2;
        this.nextjump = 10000;
        this.jump = false;
        this.left = false;
        this.nextsp = 250;
    }
    update() {
        this.nextjump -= dt;
        if (this.nextjump < 0 && !this.jump) {
            this.jump = true;
        }
        if (this.jump) {
            if (this.left) {
                this.x += dt * 14 / 2000;
                if (this.x > 14) {
                    this.jump = false;
                    this.x = 14;
                    this.left = false;
                    this.nextjump = 10000;
                }
            } else {
                this.x -= dt * 14 / 2000;
                if (this.x < 0) {
                    this.jump = false;
                    this.x = 0;
                    this.left = true;
                    this.nextjump = 10000;
                }
            }
        }
        if (!this.jump) this.uNVirs();
    }
    uNVirs() {
      this.nextsp -= dt;
      if (this.nextsp < 0.0) {
          for (var i = 0; i < dt * 1.5; i++) {
              if (Math.random() > 0.9994) {
                  var fly;
                  var red;
                  if (Math.random() > 0.5) fly = true;
                  else fly = false;
                  if (Math.random() > 0.9) red = true;
                  else red = false;
                  var v = new Virus(fly, red, !this.left);
                  v.x = this.x + 0.5;
                  this.welt.virs.push(v);
                  this.nextsp = 250;
                  break;
              }
          }
      }
    }
}
