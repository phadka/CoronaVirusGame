class Welt {
    constructor() {
        this.boden = new Block('boden');
        this.virus = new Block('cv');
        this.heart = new Block('heart');
        this.laser = new Block('laser');
        this.virusr = new Block('cvr');
        this.bg = new BG();
        this.player = new Player();
        this.virs = [];
        this.lasers = [];
        this.life = 5;
        this.nextsp = 0;
        this.nextsh = 0;
        points = 0;
        this.diff = 1;
        this.nextheart = 0;
        this.bheart = false;
        retry.onRetry = function() {
            welt = new Welt();
            mode = 'endless';
            points = 0;
        };
    }
    draw() {
        drawText('Punkte: ' + points + ' Schwierigkeit: ' + this.diff, 10, 880, 20, false);
        this.uBoden();
        this.uBG();
        this.uPlayer();
        this.uVirs();
        this.uNVirs();
        this.uDiff();
        this.uHeart();
        this.uLasers();
    }
    endGame() {
        mode = 'retry';
    }
    uLasers() {
        for (var i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update();
            this.laser.x = this.lasers[i].x;
            this.laser.y = this.lasers[i].y;
            this.laser.rotation = this.lasers[i].rotation / 3.14 * 360;
            this.laser.draw();

            if (this.lasers[i].x > 17 || this.lasers[i].x < -1 || this.lasers[i].y < -1 || this.lasers[i].y > 10) {
                this.lasers.splice(i, 1);
                i--;
                continue;
            }
            for (var k = 0; k < this.virs.length; k++) {
                if (this.lasers[i].x - this.virs[k].x < 1 && this.lasers[i].x - this.virs[k].x > -1 && this.lasers[i].y - this.virs[k].y < 0.8 && this.lasers[i].y - this.virs[k].y > -0.8 && !this.virs[k].red) {
                    this.lasers.splice(i, 1);
                    i--;
                    this.virs.splice(k, 1);
                    points++;
                    break;
                }
            }
        }
        this.nextsh -= dt;
        if (keys[4] && this.nextsh < 0.0) {
            var l = new Laser();
            l.x = this.player.x;
            if (this.player.small) l.y = this.player.y;
            else l.y = this.player.y + 1;
            l.rotation = Math.atan((mouseY - l.y * 100 - 50) / (mouseX - l.x * 100 - 50));
            if (mouseX < this.player.x * 100) l.rotation = l.rotation + 3.14;

            this.lasers.push(l);
            this.nextsh = 1000;
        }
    }
    uHeart() {
        if (this.bheart) {
            this.heart.draw();
        }
        this.nextheart -= dt;
        if (this.life < 5 && !this.bheart && this.nextheart < 0.0) {
            this.bheart = true;
            this.heart.x = Math.floor(Math.random() * 13);
            this.heart.y = 2;
        }
        if (this.bheart && this.player.x - this.heart.x < 1.0 && this.player.x - this.heart.x > -1.0 && this.player.y < 3.0) {
            this.life++;
            this.bheart = false;
            this.nextheart = 10000;
        }
    }
    uDiff() {
        this.diff = Math.floor(points / 20) + 1;
    }
    uBoden() {
        for (var i = 0; i < 2 * 16; i++) {
            this.boden.x = i % 16;
            this.boden.y = Math.floor(i / 16);
            this.boden.draw();
        }
    }
    uBG() {
        this.bg.x = 0;
        this.bg.y = 2;
        this.bg.draw();
    }
    uPlayer() {
        this.player.update();
        gl.uniform1f(gl.getUniformLocation(getProgram(), 'green'), (5 - this.life) * 0.2);
        if (this.player.small) this.player.draws();
        else this.player.draw();
        gl.uniform1f(gl.getUniformLocation(getProgram(), 'green'), 0);

    }
    uVirs() {
        for (var i = 0; i < this.virs.length; i++) {
            this.virs[i].update();
            if (this.virs[i].red) {
                this.virusr.x = this.virs[i].x;
                this.virusr.y = this.virs[i].y ;
                this.virusr.rotation = this.virs[i].rotation;
                this.virusr.draw();
            } else {
                this.virus.x = this.virs[i].x;
                this.virus.y = this.virs[i].y;
                this.virus.rotation = this.virs[i].rotation;
                this.virus.draw();
            }
            if (this.virs[i].fly) {
                if (this.virs[i].x - this.player.x < 1.0 && this.virs[i].x - this.player.x > -1.0) {
                    if (this.player.small && this.player.y > 2 && this.player.y < 4 || !this.player.small && this.player.y < 4) {
                        this.life--;
                        points++;
                        this.virs.splice(i, 1);
                        i--;
                        if (this.life <= 0) {
                            this.endGame();
                        }
                        continue;
                    }
                }
            } else {
                if (this.virs[i].x - this.player.x < 1.0 && this.virs[i].x - this.player.x > -1.0 && this.player.y < 3.0) {
                    this.life--;
                    points++;
                    this.virs.splice(i, 1);
                    i--;
                    if (this.life <= 0) {
                        this.endGame();
                    }
                    continue;
                }
            }
            if (this.virs[i].x < -1.0) {
                this.virs.splice(i, 1);
                i--;
                points++;
            }
        };
    }
    uNVirs() {
        this.nextsp -= dt;
        if (this.nextsp < 0.0) {
            for (var i = 0; i < dt * ((this.diff + 1) / 2); i++) {
                if (Math.random() > 0.9994) {
                    var fly;
                    var red;
                    if (Math.random() > 0.5) fly = true;
                    else fly = false;
                    if (Math.random() > 0.9) red = true;
                    else red = false;
                    var v = new Virus(fly, red);
                    v.x = 18;
                    this.virs.push(v);
                    this.nextsp = 250;
                    break;
                }
            }
        }
    }
}
