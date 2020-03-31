class Welt {
    constructor() {
        this.boden = new Block('boden');
        this.virus = new Block('cv');
        this.bg = new BG();
        this.player = new Player();
        this.virs = [];
        this.life = 5;
        this.nextsp = 0;
        this.points = 0;
    }
    draw() {
        this.uBoden();
        this.uBG();
        this.uPlayer();
        this.uVirs();
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
            this.virus.x = this.virs[i].x;
            this.virus.y = this.virs[i].y;
            this.virus.rotation = this.virs[i].rotation;
            this.virus.draw();
            
            if (this.virs[i].x - this.player.x < 1.0 && this.virs[i].x - this.player.x > -1.0 && this.player.y < 3.0) {
                this.life--;
                this.virs[i].y = 4;
                this.virs.splice(i, 1);
                i--;
                if (this.life <= 0) {
                    document.write("Spiel Verloren :(");
                    gameover = true;
                }
                continue;
            }
            if (this.virs[i].x < -1.0) {
                this.virs.splice(i, 1);
                i--;
                this.points++;
                document.getElementById('points').innerHTML = "Punkte: " + this.points;
            }
        };
        this.nextsp -= dt;
        if (this.nextsp < 0.0) {
            for (var i = 0; i < dt; i++) {
                if (Math.random() > 0.9994) {
                    var fly;
                    if (Math.random() > 0.5) fly = true;
                    else fly = false;
                    var v = new Virus(fly);
                    v.x = 18;
                    this.virs.push(v);
                    this.nextsp = 500;
                }
            }
        }
    }
}
